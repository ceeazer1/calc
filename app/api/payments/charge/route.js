import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

// Square SDK v43+ exports
async function getSquareExports() {
  const mod = await import('square')
  const SquareClient = mod?.SquareClient || mod?.default?.SquareClient
  const SquareEnvironment = mod?.SquareEnvironment || mod?.default?.SquareEnvironment
  return { SquareClient, SquareEnvironment }
}

async function getSquareClient() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const envVar = (process.env.SQUARE_ENV || '').toLowerCase()
  const { SquareClient, SquareEnvironment } = await getSquareExports()
  if (!SquareClient) throw new Error('Square SDK not loaded: SquareClient missing')
  if (!accessToken) throw new Error('Missing SQUARE_ACCESS_TOKEN')
  const environment = envVar === 'production'
    ? (SquareEnvironment?.Production ?? 'https://connect.squareup.com')
    : (SquareEnvironment?.Sandbox ?? 'https://connect.squareupsandbox.com')
  return new SquareClient({ token: accessToken, environment })
}

export async function POST(request) {
  try {
    const { token, cartItems = [] } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Missing payment token' }, { status: 400 })
    }

    const locationId = process.env.SQUARE_LOCATION_ID
    if (!locationId) {
      return NextResponse.json({ error: 'Missing SQUARE_LOCATION_ID' }, { status: 500 })
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Build line items (and include shipping as a line item for simplicity)
    const lineItems = cartItems.map((item) => {
      const qty = Math.max(1, Number(item.quantity || 1))
      const price = Number(item.price || 0)
      const amountCents = Math.round(price * 100)
      return {
        name: String(item.name || 'Item'),
        quantity: String(qty),
        basePriceMoney: { amount: BigInt(amountCents), currency: 'USD' }
      }
    })

    const SHIPPING_FEE_CENTS = 1300
    lineItems.push({
      name: 'Shipping',
      quantity: '1',
      basePriceMoney: { amount: BigInt(SHIPPING_FEE_CENTS), currency: 'USD' }
    })

    const totalCents = lineItems.reduce(
      (sum, li) => sum + Number(li.basePriceMoney.amount) * Number(li.quantity || '1'),
      0
    )

    const client = await getSquareClient()
    const idempotencyKey = crypto.randomUUID()

    // Create an order for itemization (optional but recommended)
    const orderRes = await client.orders.createOrder({
      idempotencyKey,
      order: {
        locationId,
        lineItems
      }
    })

    const orderId = orderRes?.order?.id

    // Take the payment
    const paymentRes = await client.payments.createPayment({
      idempotencyKey: crypto.randomUUID(),
      sourceId: token,
      locationId,
      amountMoney: { amount: BigInt(totalCents), currency: 'USD' },
      orderId,
      autocomplete: true
    })

    const payment = paymentRes?.payment
    if (!payment?.id) {
      return NextResponse.json({ error: 'Payment failed' }, { status: 502 })
    }

    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      receiptUrl: payment.receiptUrl || null
    })
  } catch (err) {
    console.error('Square payment error:', err)
    const message = err?.errors?.[0]?.detail || err?.message || 'Payment failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

