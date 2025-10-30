import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const phone = String(body?.phone || '').trim()
    const consent = body?.consent === true || String(body?.consent||'').toLowerCase() === 'true'
    if (!phone) return NextResponse.json({ ok:false, error:'missing_phone' }, { status: 400 })
    if (!consent) return NextResponse.json({ ok:false, error:'consent_required' }, { status: 400 })

    const base = (process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://calcai-server.fly.dev').replace(/\/+$/, '')
    const r = await fetch(`${base}/api/sms/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ phone, consent: true, source: 'product' })
    })
    const j = await r.json().catch(() => ({}))
    return NextResponse.json(j, { status: r.status })
  } catch (e) {
    return NextResponse.json({ ok:false, error: 'server_error' }, { status: 500 })
  }
}

