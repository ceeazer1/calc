import Stripe from 'stripe'

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: 'Server not configured: missing STRIPE_SECRET_KEY' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    const { cart } = await req.json()
    if (!Array.isArray(cart) || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    // Fetch authoritative pricing and stock from dashboard via internal proxy
    const settingsRes = await fetch(new URL('/api/website-settings', req.url).toString(), { cache: 'no-store' })
    let settings = null
    if (settingsRes.ok) {
      try { settings = await settingsRes.json() } catch {}
    }
    const price = Number(settings?.price)
    const inStock = Boolean(settings?.inStock)
    const stockCount = typeof settings?.stockCount === 'number' ? settings.stockCount : null

    if (!Number.isFinite(price) || price <= 0) {
      return new Response(
        JSON.stringify({ error: 'Server not configured: price missing' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    if (!inStock || (typeof stockCount === 'number' && stockCount <= 0)) {
      return new Response(
        JSON.stringify({ error: 'Out of stock' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    const totalQty = Array.isArray(cart) ? cart.reduce((t, it) => t + (Number(it.quantity) || 1), 0) : 1
    if (typeof stockCount === 'number' && totalQty > stockCount) {
      return new Response(
        JSON.stringify({ error: 'Insufficient stock for requested quantity' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }


    // Instantiate Stripe lazily after confirming the secret exists
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const line_items = cart.map((item) => {
      const unitAmount = Math.max(0, Math.round(Number(price) * 100))
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: String(item.name || 'Item'),
            images: item.image ? [new URL(item.image, origin).toString()] : undefined,
          },
          unit_amount: unitAmount,
        },
        quantity: Number(item.quantity) || 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'USPS Priority Mail',
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'usd' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            display_name: 'USPS Priority Mail Express®',
            type: 'fixed_amount',
            fixed_amount: { amount: 4500, currency: 'usd' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cart`,
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    )
  } catch (err) {
    console.error('Stripe checkout error', err)
    return new Response(
      JSON.stringify({ error: 'Unable to create checkout session' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}

