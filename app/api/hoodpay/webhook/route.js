import { NextResponse } from 'next/server'
import crypto from 'crypto'

function constantTimeEqual(a, b) {
  if (!a || !b) return false
  try {
    const ab = Buffer.from(String(a))
    const bb = Buffer.from(String(b))
    if (ab.length !== bb.length) return false
    return crypto.timingSafeEqual(ab, bb)
  } catch { return false }
}

function matchesDigest(rawBody, header, secret) {
  if (!header || !secret) return false
  const hex = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  // Accept a few common formats: plain hex, sha256=hex, or comma list like v1=hex
  const normalized = header.trim()
  if (constantTimeEqual(normalized, hex)) return true
  if (constantTimeEqual(normalized, `sha256=${hex}`)) return true
  // v1=... style
  const parts = normalized.split(',').map(s => s.trim())
  for (const p of parts) {
    const [k, v] = p.split('=')
    if ((k === 'v1' || k === 'sha256') && constantTimeEqual(v, hex)) return true
  }
  return false
}

export async function POST(request) {
  try {
    const rawBody = await request.text()
    const sig = request.headers.get('hoodpay-signature') || request.headers.get('x-hoodpay-signature') || ''
    const secret = process.env.HOODPAY_WEBHOOK_SECRET

    let verified = false
    if (secret) verified = matchesDigest(rawBody, sig, secret)

    let event
    try { event = JSON.parse(rawBody) } catch {}

    if (!verified) {
      console.warn('[HoodPay webhook] signature not verified; processing best-effort')
    }

    // Minimal event handling: look for payment status and processToken
    const data = event?.data || event || {}
    const processToken = data.processToken || data.metadata?.processToken || data?.payment?.metadata?.processToken
    const status = data.status || data.paymentStatus || data.event || data?.payment?.status

    console.log('[HoodPay webhook] received', { verified, status, processToken })

    // TODO: Persist order status (e.g., to dashboard store) if needed.

    return NextResponse.json({ received: true, verified })
  } catch (e) {
    console.error('HoodPay webhook error:', e)
    return NextResponse.json({ error: 'Webhook handling failed' }, { status: 500 })
  }
}
