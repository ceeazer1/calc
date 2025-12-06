import { NextResponse } from 'next/server'

// Poof Checkout integration: creates a Poof checkout session and returns the URL.
// Env (Vercel):
// - NEXT_PUBLIC_DOMAIN (optional; default https://calcai.cc)
// - POOF_SUCCESS_URL, POOF_CANCEL_URL (optional overrides)
// - POOF_USERNAME or NEXT_PUBLIC_POOF_USERNAME (your Poof username)
// - (optional) POOF_PRODUCT_ID, POOF_PRODUCT_QTY (if you want to show a product)
export async function POST(request) {
  try {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://calcai.cc'
    const successUrl = process.env.POOF_SUCCESS_URL || `${domain}/success`
    const cancelUrl = process.env.POOF_CANCEL_URL || `${domain}/cart`
    const poofUsername = process.env.NEXT_PUBLIC_POOF_USERNAME || process.env.POOF_USERNAME || 'Poof'

    const { cartItems, totalAmount, formData, preorder, shippingType } = await request.json()

    // Load live settings from dashboard (authoritative pricing/stock)
    let remoteSettings = null
    try {
      const dashURL = process.env.DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL
      if (dashURL) {
        const base = dashURL.replace(/\/+$/, '')
        const r = await fetch(`${base}/api/website-public/settings`, { cache: 'no-store' })
        if (r.ok) remoteSettings = await r.json()
      }
    } catch (e) {
      console.warn('Could not load dashboard settings:', e?.message || e)
    }

    const stockCountNum = remoteSettings && remoteSettings.stockCount !== undefined && remoteSettings.stockCount !== null
      ? Number(remoteSettings.stockCount) : undefined

    const preorderAllowed = !!(remoteSettings && remoteSettings.preorderEnabled === true)
    if (preorder && !preorderAllowed) {
      return NextResponse.json({ error: 'Preorders are currently disabled' }, { status: 400 })
    }

    if (!preorder && remoteSettings && (remoteSettings.inStock === false || (Number.isFinite(stockCountNum) && stockCountNum <= 0))) {
      return NextResponse.json({ error: 'Out of stock' }, { status: 400 })
    }

    // Compute authoritative amount (USD)
    const basePrice = preorder
      ? (remoteSettings?.preorderPrice ?? 200.00)
      : (remoteSettings?.price ?? 174.99)

    const itemsTotal = Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity || 1)), 0)
      : basePrice

    const sType = 'standard' // US-only flat shipping
    const shipping = 13.00
    const amountUsd = (Number.isFinite(itemsTotal) ? itemsTotal : basePrice) + shipping
    const amountStr = amountUsd.toFixed(2)

    // Create a unique process token to correlate with webhooks
    const processToken = `calcai_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`

    // Build Poof Checkout payload (no auth required for /api/v1/checkout)
    const payload = {
      username: poofUsername,
      amount: amountStr,
      success_url: successUrl,
      redirect: cancelUrl,
      default: {
        name: `${formData?.firstName || ''} ${formData?.lastName || ''}`.trim(),
        email: formData?.email || undefined,
        phone: formData?.phone || undefined,
        address: formData?.address || undefined,
        address2: formData?.address2 || undefined,
        city: formData?.city || undefined,
        state: formData?.state || undefined,
        zip: formData?.zipCode || undefined,
        country: formData?.country || "US"
      },
      metadata: {
        processToken,
        usOnly: true,
        shippingType: sType,
        shippingCost: shipping,
        items: Array.isArray(cartItems)
          ? cartItems.map(({ id, name, quantity, price }) => ({ id, name, quantity, price }))
          : [{ id: 'calcai', name: preorder ? 'CalcAI Preorder' : 'CalcAI', quantity: 1, price: amountStr }]
      }
    }

    if (process.env.POOF_PRODUCT_ID) {
      payload.product_id = process.env.POOF_PRODUCT_ID
      if (process.env.POOF_PRODUCT_QTY) payload.product_quantity = String(process.env.POOF_PRODUCT_QTY)
    }

    // Call Poof to create a checkout link
    const res = await fetch('https://www.poof.io/api/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const text = await res.text()

    // Poof returns a plain checkout URL string on success
    if (res.ok && typeof text === 'string' && /^https?:\/\//i.test(text.trim())) {
      return NextResponse.json({ url: text.trim(), processToken, provider: 'poof' })
    }

    // Try to parse if JSON
    let json
    try { json = JSON.parse(text) } catch {}
    if (json && (json.url || json.payment_link)) {
      return NextResponse.json({ url: json.url || json.payment_link, processToken, provider: 'poof' })
    }

    console.error('Poof checkout creation failed', { status: res.status, body: text?.slice?.(0, 500) })
    return NextResponse.json({ error: 'Failed to create Poof checkout', status: res.status, body: text?.slice?.(0, 500) }, { status: 502 })
  } catch (error) {
    console.error('Error creating Poof checkout:', error)
    return NextResponse.json({ error: 'Error creating checkout' }, { status: 500 })
  }
}
