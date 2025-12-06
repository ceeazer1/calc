import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

// Square SDK v43+ exports SquareClient and SquareEnvironment
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

function getSiteUrl() {
  // Prefer explicit site URL; fallback to Vercel URL
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_DOMAIN
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''
  return fromEnv || vercelUrl || ''
}
// Env helpers for "theme" and checkout controls
function envBool(name, def = false) {
  const v = (process.env[name] ?? '').toString().trim().toLowerCase()
  if (!v) return def
  return v === '1' || v === 'true' || v === 'yes' || v === 'on'
}
function envInt(name, def) {
  const v = parseInt(process.env[name] ?? '', 10)
  return Number.isFinite(v) ? v : def
}
function envStr(name, def = '') {
  return process.env[name] ?? def
}


export async function POST(request) {
  try {
    const { cartItems = [], customer = {} } = await request.json()

    const locationId = process.env.SQUARE_LOCATION_ID
    if (!locationId) {
      return NextResponse.json({ error: 'Missing SQUARE_LOCATION_ID' }, { status: 500 })
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Build Square order line items from cart
    const lineItems = cartItems.map((item) => {
      const qty = Math.max(1, Number(item.quantity || 1))
      const price = Number(item.price || 0)
      const amountCents = Math.round(price * 100) // cents
      return {
        name: String(item.name || 'Item'),
        quantity: String(qty),
        basePriceMoney: { amount: BigInt(amountCents), currency: 'USD' }
      }
    })


    const client = await getSquareClient()

    const idempotencyKey = crypto.randomUUID()
    const siteUrl = getSiteUrl()

    const redirectPath = envStr('CHECKOUT_REDIRECT_PATH', '/success')
    const allowTipping = envBool('CHECKOUT_ALLOW_TIPPING', false)
    const enableCoupon = envBool('CHECKOUT_ENABLE_COUPON', false)
    const enableLoyalty = envBool('CHECKOUT_ENABLE_LOYALTY', false)
    const supportEmail = envStr('CHECKOUT_SUPPORT_EMAIL', '')
    const applePay = envBool('CHECKOUT_PAYMENT_APPLE_PAY', true)
    const cashAppPay = envBool('CHECKOUT_PAYMENT_CASH_APP_PAY', true)
    const googlePay = envBool('CHECKOUT_PAYMENT_GOOGLE_PAY', false)
    const afterpayClearpay = envBool('CHECKOUT_PAYMENT_AFTERPAY', false)
    const description = envStr('CHECKOUT_DESCRIPTION', 'CalcAI for TI‑84 Plus')
    const customFieldTitle = envStr('CHECKOUT_CUSTOM_FIELD_TITLE', '')
    const shippingFeeCents = envInt('CHECKOUT_SHIPPING_FEE_CENTS', 1300)

    const body = {
      idempotencyKey,
      description,
      paymentNote: 'calcai.cc web order',
      order: {
        locationId,
        lineItems
        // Optionally, you can include fulfillments to signal shipping
        // fulfillments: [{ type: 'SHIPMENT' }]
      },
      checkoutOptions: {
        askForShippingAddress: true,
        allowTipping: allowTipping || undefined,
        acceptedPaymentMethods: { applePay, googlePay, cashAppPay, afterpayClearpay },
        merchantSupportEmail: supportEmail || undefined,
        enableCoupon: enableCoupon || undefined,
        enableLoyalty: enableLoyalty || undefined,
        shippingFee: { name: 'Shipping', charge: { amount: BigInt(shippingFeeCents), currency: 'USD' } },
        customFields: customFieldTitle ? [{ title: customFieldTitle }] : undefined,
        redirectUrl: siteUrl ? `${siteUrl}${redirectPath}` : undefined
      },
      prePopulatedData: {
        buyerEmail: customer.email || undefined,
        buyerPhoneNumber: customer.phone || undefined
      }
    }

    const result = await client.checkout.paymentLinks.create(body)
    const url = result?.paymentLink?.url
    if (!url) {
      return NextResponse.json({ error: 'Failed to create checkout link' }, { status: 502 })
    }

    return NextResponse.json({ url })
  } catch (err) {
    console.error('Square checkout error:', err)
    const message = err?.errors?.[0]?.detail || err?.message || 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
