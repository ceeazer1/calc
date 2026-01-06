import { HoodPayClient } from '@internal-labs/hoodpay'

// Ensure this route is never statically cached by Next/Vercel.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req) {
  try {
    const apiKey = process.env.HOODPAY_API_KEY
    const businessId = process.env.HOODPAY_BUSINESS_ID

    if (!apiKey || !businessId) {
      return new Response(
        JSON.stringify({
          error: 'Server not configured: missing HOODPAY_API_KEY / HOODPAY_BUSINESS_ID',
        }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    const { cart, customerEmail } = await req.json()
    if (!Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'

    // Fetch authoritative pricing/stock: prefer dashboard public endpoint, fallback to internal proxy
    const dashURLRaw = process.env.DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL
    const dashBase = (dashURLRaw || '').trim().replace(/\/+$/, '')

    let settings = null
    let settingsSource = 'none'
    if (dashBase) {
      try {
        const r = await fetch(`${dashBase}/api/website-public/settings`, { cache: 'no-store' })
        if (r.ok) {
          settings = await r.json()
          settingsSource = 'dashboard-direct'
        }
      } catch {}
    }
    if (!settings) {
      try {
        const r2 = await fetch(new URL('/api/website-settings', req.url).toString(), { cache: 'no-store' })
        if (r2.ok) {
          settings = await r2.json()
          settingsSource = 'proxy'
        }
      } catch {}
    }

    const rawPrice = settings?.price
    const price = Number(rawPrice)

    const rawInStock = settings?.inStock ?? settings?.available ?? settings?.stock?.available ?? false
    let inStock = false
    if (typeof rawInStock === 'boolean') inStock = rawInStock
    else if (typeof rawInStock === 'string') inStock = /^(true|1|yes)$/i.test(rawInStock.trim())
    else if (typeof rawInStock === 'number') inStock = rawInStock === 1

    const rawStock = settings?.stockCount
    // Optional informational/limit field: only treat as an enforceable limit if it's > 0.
    const parsedStock = Number.isFinite(Number(rawStock)) ? Number(rawStock) : null
    const stockCount = typeof parsedStock === 'number' && parsedStock > 0 ? parsedStock : null

    if (!Number.isFinite(price) || price <= 0) {
      const res = new Response(JSON.stringify({ error: 'Server not configured: price missing' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
      res.headers.set('Cache-Control', 'no-store')
      res.headers.set('x-settings-source', settingsSource)
      return res
    }

    if (!inStock) {
      const res = new Response(JSON.stringify({ error: 'Out of stock' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
      res.headers.set('Cache-Control', 'no-store')
      res.headers.set('x-settings-source', settingsSource)
      return res
    }

    const totalQty = cart.reduce((t, it) => t + (Number(it.quantity) || 1), 0)
    if (typeof stockCount === 'number' && totalQty > stockCount) {
      const res = new Response(JSON.stringify({ error: 'Insufficient stock for requested quantity' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
      res.headers.set('Cache-Control', 'no-store')
      res.headers.set('x-settings-source', settingsSource)
      return res
    }

    // HoodPay does not provide built-in shipping-rate selection. For now we include a flat shipping amount.
    const shippingRaw = process.env.CHECKOUT_SHIPPING_USD
    const shippingUsd = Number.isFinite(Number(shippingRaw)) ? Number(shippingRaw) : 15

    const subtotal = Number(price) * totalQty
    const total = Math.round((subtotal + shippingUsd) * 100) / 100

    const client = new HoodPayClient({ apiKey, businessId })
    const payment = await client.payments.create({
      amount: total,
      currency: 'USD',
      name: `CalcAI — ${totalQty}x`,
      description:
        shippingUsd > 0
          ? `CalcAI calculator x${totalQty} (includes $${shippingUsd.toFixed(2)} shipping).`
          : `CalcAI calculator x${totalQty}.`,
      redirectUrl: `${origin}/success`,
      notifyUrl: `${origin}/api/hoodpay/webhook`,
      customerEmail: typeof customerEmail === 'string' && customerEmail.trim() ? customerEmail.trim() : undefined,
      metadata: {
        source: 'website',
        totalQty,
        unitPriceUsd: price,
        shippingUsd,
        settingsSource,
        items: cart.map((it) => ({
          id: it?.id,
          name: it?.name,
          quantity: Number(it?.quantity) || 1,
        })),
      },
    })

    const checkoutUrl = payment?.data?.url
    const paymentId = payment?.data?.id

    if (!checkoutUrl || !paymentId) {
      throw new Error('HoodPay: missing payment url/id in response')
    }

    const res = new Response(JSON.stringify({ url: checkoutUrl, paymentId }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
    res.headers.set('Cache-Control', 'no-store')
    res.headers.set('x-settings-source', settingsSource)
    return res
  } catch (err) {
    console.error('HoodPay checkout error', err)
    return new Response(JSON.stringify({ error: 'Unable to create checkout' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}


