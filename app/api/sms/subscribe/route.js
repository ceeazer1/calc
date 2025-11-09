import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

function normalizePhone(input){
  if (!input) return null
  let s = String(input).trim()
  s = s.replace(/[\s\-\.\(\)]/g, '')
  if (!s) return null
  if (s.startsWith('+')){
    const digits = s.slice(1)
    if (!/^\d{10,15}$/.test(digits)) return null
    return s
  }
  if (/^1\d{10}$/.test(s)) return `+${s}`
  if (/^\d{10}$/.test(s)) return `+1${s}`
  return null
}

async function ensureTable(){
  await sql`create table if not exists sms_subscribers (
    id bigserial primary key,
    phone text unique not null,
    status text not null default 'subscribed',
    consent_ts timestamptz not null default now(),
    consent_ip text,
    source text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;
}

async function sendViaTwilio({ to, body }){
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const msgSid = process.env.TWILIO_MESSAGING_SERVICE_SID
  if (!sid || !token || !msgSid){
    return { ok:false, error:'twilio_not_configured' }
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`
  const auth = Buffer.from(`${sid}:${token}`).toString('base64')
  const form = new URLSearchParams()
  form.set('To', to)
  form.set('MessagingServiceSid', msgSid)
  form.set('Body', body)
  const r = await fetch(url, { method:'POST', headers:{ Authorization:`Basic ${auth}` }, body: form })
  const text = await r.text()
  if (!r.ok) return { ok:false, error:'twilio_send_failed', status:r.status, body:text }
  try { const j = JSON.parse(text); return { ok:true, sid:j.sid || null } } catch { return { ok:true, sid:null } }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const rawPhone = String(body?.phone || '').trim()
    const consent = body?.consent === true || String(body?.consent||'').toLowerCase() === 'true'
    const source = String(body?.source || 'product')
    if (!rawPhone) return NextResponse.json({ ok:false, error:'missing_phone' }, { status: 400 })
    if (!consent) return NextResponse.json({ ok:false, error:'consent_required' }, { status: 400 })

    const phone = normalizePhone(rawPhone)
    if (!phone) return NextResponse.json({ ok:false, error:'invalid_phone' }, { status: 400 })

    const confirmText = 'CalcAI: You are subscribed for restock alerts. Reply STOP to opt out. HELP for help.'
    const sent = await sendViaTwilio({ to: phone, body: confirmText })
    if (!sent.ok){
      return NextResponse.json(sent, { status: 502 })
    }

    // Upsert into Vercel Postgres (no Fly)
    await ensureTable()
    const fwdIp = req.headers.get('x-forwarded-for') || ''
    await sql`insert into sms_subscribers (phone, status, consent_ts, consent_ip, source, created_at, updated_at)
      values (${phone}, 'subscribed', now(), ${fwdIp}, ${source}, now(), now())
      on conflict (phone) do update set
        status = 'subscribed',
        consent_ts = now(),
        consent_ip = excluded.consent_ip,
        source = coalesce(excluded.source, sms_subscribers.source),
        updated_at = now()`

    return NextResponse.json({ ok:true })
  } catch (e) {
    return NextResponse.json({ ok:false, error: 'server_error' }, { status: 500 })
  }
}

