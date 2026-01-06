import { sql } from '@vercel/postgres'

// Ensure this route is never statically cached by Next/Vercel.
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

async function ensureOrdersTable() {
  await sql`create table if not exists orders (
    id bigserial primary key,
    payment_id text unique not null,
    email text,
    phone text,
    first_name text,
    last_name text,
    address1 text,
    address2 text,
    city text,
    state text,
    zip text,
    country text,
    shipping_type text,
    cart_json jsonb,
    total_qty int,
    unit_price_usd numeric,
    shipping_usd numeric,
    total_usd numeric,
    status text not null default 'created',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  )`;
}

export async function POST(req) {
  try {
    const apiKey = (process.env.HOODPAY_API_KEY || '').trim()
    const businessId = (process.env.HOODPAY_BUSINESS_ID || '').trim()

    if (!apiKey || !businessId) {
      return new Response(
        JSON.stringify({
          error: 'Server not configured: missing HOODPAY_API_KEY / HOODPAY_BUSINESS_ID',
        }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      )
    }

    const { cart, customerEmail, shippingType, shipping } = await req.json()
    if (!Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    const ship = shipping && typeof shipping === 'object' ? shipping : {}
    const email = (typeof customerEmail === 'string' ? customerEmail : ship?.email || '').trim()
    const requiredShipFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country']
    for (const f of requiredShipFields) {
      const v = ship?.[f]
      if (typeof v !== 'string' || !v.trim()) {
        return new Response(JSON.stringify({ error: `Missing shipping field: ${f}` }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        })
      }
    }
    if (!email) {
      return new Response(JSON.stringify({ error: 'Missing customer email' }), {
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

    const standardRaw = process.env.CHECKOUT_SHIPPING_USD
    const expressRaw = process.env.CHECKOUT_SHIPPING_USD_EXPRESS
    const standardUsd = Number.isFinite(Number(standardRaw)) ? Number(standardRaw) : 15
    const expressUsd = Number.isFinite(Number(expressRaw)) ? Number(expressRaw) : 45
    const shippingUsd = String(shippingType || '').toLowerCase() === 'express' ? expressUsd : standardUsd

    const subtotal = Number(price) * totalQty
    const total = Math.round((subtotal + shippingUsd) * 100) / 100

    const hoodpayBody = {
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
    }

    // Call HoodPay API directly so we can surface useful error details to the client.
    const hoodpayBase = (process.env.HOODPAY_BASE_URL || 'https://api.hoodpay.io').trim().replace(/\/+$/, '')
    const hoodpayUrl = `${hoodpayBase}/v1/businesses/${encodeURIComponent(businessId)}/payments`

    const hpRes = await fetch(hoodpayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(hoodpayBody),
      cache: 'no-store',
    })

    const hpText = await hpRes.text()
    let hpJson = null
    try {
      hpJson = JSON.parse(hpText)
    } catch {}

    if (!hpRes.ok) {
      return new Response(
        JSON.stringify({
          error: `HoodPay request failed (status ${hpRes.status}): ${
            (hpJson && (hpJson.message || hpJson.error)) ||
            (typeof hpText === 'string' && hpText.trim() ? hpText.trim().slice(0, 120) : 'Unknown error')
          }`,
          upstreamStatus: hpRes.status,
          upstream: hpJson || (typeof hpText === 'string' ? hpText.slice(0, 1200) : null),
          sent: {
            amount: hoodpayBody.amount,
            currency: hoodpayBody.currency,
            name: hoodpayBody.name,
            description: hoodpayBody.description,
            redirectUrl: hoodpayBody.redirectUrl,
            notifyUrl: hoodpayBody.notifyUrl,
            hasCustomerEmail: !!hoodpayBody.customerEmail,
          },
        }),
        { status: 502, headers: { 'content-type': 'application/json' } }
      )
    }

    const payment = hpJson

    const checkoutUrl = payment?.data?.url
    const paymentId = payment?.data?.id

    if (!checkoutUrl || !paymentId) {
      throw new Error('HoodPay: missing payment url/id in response')
    }

    // Persist order + shipping details so you can fulfill physical shipments.
    try {
      await ensureOrdersTable()
      const totalQty = cart.reduce((t, it) => t + (Number(it?.quantity) || 1), 0)
      await sql`insert into orders (
        payment_id, email, phone, first_name, last_name,
        address1, address2, city, state, zip, country,
        shipping_type, cart_json, total_qty, unit_price_usd, shipping_usd, total_usd,
        status, created_at, updated_at
      ) values (
        ${paymentId}, ${email}, ${String(ship?.phone || '')},
        ${String(ship?.firstName || '')}, ${String(ship?.lastName || '')},
        ${String(ship?.address || '')}, ${String(ship?.address2 || '')},
        ${String(ship?.city || '')}, ${String(ship?.state || '')},
        ${String(ship?.zipCode || '')}, ${String(ship?.country || '')},
        ${String(shippingType || 'standard')},
        ${JSON.stringify(cart)}, ${totalQty}, ${price}, ${shippingUsd}, ${total},
        'created', now(), now()
      )
      on conflict (payment_id) do update set
        email = excluded.email,
        phone = excluded.phone,
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        address1 = excluded.address1,
        address2 = excluded.address2,
        city = excluded.city,
        state = excluded.state,
        zip = excluded.zip,
        country = excluded.country,
        shipping_type = excluded.shipping_type,
        cart_json = excluded.cart_json,
        total_qty = excluded.total_qty,
        unit_price_usd = excluded.unit_price_usd,
        shipping_usd = excluded.shipping_usd,
        total_usd = excluded.total_usd,
        updated_at = now()`
    } catch (e) {
      // If we can't store the shipping info, don't proceed with payment.
      console.error('Order DB insert failed', e)
      return new Response(JSON.stringify({ error: 'Unable to start checkout (order storage failed)' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
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


