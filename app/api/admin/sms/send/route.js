import { NextResponse } from 'next/server'

function normalizePhone(input){
  if (!input) return null;
  let s = String(input).trim();
  s = s.replace(/[\s\-\.\(\)]/g, '');
  if (!s) return null;
  if (s.startsWith('+')){
    const digits = s.slice(1);
    if (!/^\d{10,15}$/.test(digits)) return null;
    return s;
  }
  if (/^1\d{10}$/.test(s)) return `+${s}`;
  if (/^\d{10}$/.test(s)) return `+1${s}`;
  return null;
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
    const { to, body } = await req.json();
    const phone = normalizePhone(to);
    const text = String(body||'').trim();
    if (!phone) return NextResponse.json({ ok:false, error:'invalid_phone' }, { status: 400 });
    if (!text) return NextResponse.json({ ok:false, error:'empty_body' }, { status: 400 });

    const r = await sendViaTwilio({ to: phone, body: text });
    if (!r.ok) return NextResponse.json(r, { status: 502 });
    return NextResponse.json({ ok:true, sid: r.sid });
  }catch(e){
    return NextResponse.json({ ok:false, error:'server_error' }, { status: 500 });
  }
}

