import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export const runtime = 'nodejs'

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
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const msgSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!sid || !token || !msgSid){
    return { ok:false, error:'twilio_not_configured' };
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const form = new URLSearchParams();
  form.set('To', to);
  form.set('MessagingServiceSid', msgSid);
  form.set('Body', body);
  const r = await fetch(url, { method:'POST', headers:{ Authorization:`Basic ${auth}` }, body: form });
  const text = await r.text();
  if (!r.ok) return { ok:false, error:'twilio_send_failed', status:r.status, body:text };
  try { const j = JSON.parse(text); return { ok:true, sid:j.sid || null }; } catch { return { ok:true, sid:null }; }
}

export async function POST(req){
  try{
    const tokenHeader = req.headers.get('x-admin-token') || '';
    const required = process.env.ADMIN_API_TOKEN || '';
    if (required && tokenHeader !== required){
      return NextResponse.json({ ok:false, error:'unauthorized' }, { status: 401 });
    }

    const { body } = await req.json();
    const text = String(body||'').trim();
    if (!text) return NextResponse.json({ ok:false, error:'empty_body' }, { status: 400 });

    await ensureTable();

    // Fetch all subscribed numbers
    const result = await sql`select phone from sms_subscribers where status = 'subscribed' order by phone`;
    const phones = (result.rows || []).map(r => r.phone).filter(Boolean);

    if (phones.length === 0){
      return NextResponse.json({ ok:true, sent:0, failed:0, message:'No subscribers' });
    }

    let sent = 0;
    let failed = 0;

    // Send to all subscribers with rate limiting (1 per 100ms to respect Twilio limits)
    for (const phone of phones){
      try{
        const r = await sendViaTwilio({ to: phone, body: text });
        if (r.ok) sent++;
        else failed++;
      }catch(e){
        failed++;
      }
      // Rate limit: wait 100ms between sends (max 10/sec)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return NextResponse.json({ ok:true, sent, failed, total: phones.length });
  }catch(e){
    console.error('[broadcast] Error:', e);
    return NextResponse.json({ ok:false, error:'server_error' }, { status: 500 });
  }
}

