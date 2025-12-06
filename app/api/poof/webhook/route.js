import { NextResponse } from 'next/server'

// Poof webhook receiver
// Configure this URL in the Poof dashboard. If Poof later documents
// a signature scheme, add verification using their recommended method.
export async function POST(request) {
  let text
  try {
    text = await request.text()
  } catch (_) {
    text = ''
  }

  let body
  try {
    body = JSON.parse(text)
  } catch (_) {
    body = { raw: text }
  }

  const id = body?.id || body?.payment_id || null
  const type = body?.type || null
  const state = body?.state || body?.status || null
  const amount = body?.amount || body?.amount_usd || body?.amount_cents || null
  const currency = body?.currency || 'USD'
  const method = body?.method || body?.payment_method || null
  const processToken = body?.metadata?.processToken || body?.default?.metadata?.processToken || null

  // Best-effort headers that Poof might provide in the future
  const signature = request.headers.get('poof-signature') || request.headers.get('x-poof-signature') || null

  // TODO: persist to a datastore; for now we just log
  try {
    console.log('Poof webhook event', {
      id, type, state, amount, currency, method, processToken,
      signaturePresent: !!signature,
    })
  } catch (_) {}

  // Always acknowledge to prevent retries; add validation and idempotency as needed
  return NextResponse.json({ ok: true })
}

