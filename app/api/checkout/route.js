import { NextResponse } from 'next/server'
import { HoodPayClient } from '@internal-labs/hoodpay'


// HoodPay Orders API integration: creates a payment via API and returns checkout URL.
// Env required in Vercel:
// - HOODPAY_API_KEY
// - HOODPAY_BUSINESS_ID
// - (optional) HOODPAY_API_BASE (default https://api.hoodpay.io/v1)
// - (optional) HOODPAY_SUCCESS_URL (default https://calcai.cc/success)
// - (optional) HOODPAY_CANCEL_URL (default https://calcai.cc/cart)
// - (optional) HOODPAY_CHECKOUT_URL fallback hosted link
export async function POST(request) {
  try {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://calcai.cc'
    const successUrl = process.env.HOODPAY_SUCCESS_URL || `${domain}/success`
    const cancelUrl = process.env.HOODPAY_CANCEL_URL || `${domain}/cart`

    const { cartItems, totalAmount, formData, preorder } = await request.json()

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

    // Compute amount (USD). Prefer dashboard price over client input.
    const basePrice = preorder
      ? (remoteSettings?.preorderPrice ?? 200.00)
      : (remoteSettings?.price ?? 174.99)

    // If cartItems provided, sum them; otherwise use basePrice for single unit.
    const itemsTotal = Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity || 1)), 0)
      : basePrice

    // Default shipping (UI currently shows FREE; set to 0.00 for alignment)
    const shipping = 0.00
    const amountUsd = (Number.isFinite(itemsTotal) ? itemsTotal : basePrice) + shipping
    const amountStr = amountUsd.toFixed(2)

    // HoodPay API config
    // SDK paths already include /v1, so base should be the API root without version suffix
    const API_BASE = (process.env.HOODPAY_API_BASE || 'https://api.hoodpay.io').replace(/\/$/, '')
    const API_KEY = process.env.HOODPAY_API_KEY
    const BUSINESS_ID = process.env.HOODPAY_BUSINESS_ID

    // If API credentials are missing, gracefully fall back to hosted checkout URL
    const fallbackUrl = process.env.HOODPAY_CHECKOUT_URL || process.env.NEXT_PUBLIC_HOODPAY_CHECKOUT_URL
    if (!API_KEY || !BUSINESS_ID) {
      if (fallbackUrl) return NextResponse.json({ url: fallbackUrl })
      return NextResponse.json({ error: 'HoodPay not configured. Set HOODPAY_API_KEY and HOODPAY_BUSINESS_ID.' }, { status: 500 })
    }

    // Create a unique process token to correlate in webhooks
    const processToken = `calcai_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`

    // Build payload based on HoodPay examples (Billgang docs)
    const notifyUrl = `${domain}/api/hoodpay/webhook`

    // Build a payload with multiple key variants to satisfy differing API shapes.
    const amountCents = Math.round(Number(amountUsd) * 100)
    const baseMetadata = {
      processToken,
      email: formData?.email || null,
      phone: formData?.phone || null,
      shippingAddress: {
        firstName: formData?.firstName || null,
        lastName: formData?.lastName || null,
        address1: formData?.address || null,
        address2: formData?.address2 || null,
        city: formData?.city || null,
        state: formData?.state || null,
        zipCode: formData?.zipCode || null,
        country: formData?.country || null
      },
      items: Array.isArray(cartItems) ? cartItems.map(({ id, name, quantity, price }) => ({ id, name, quantity, price })) : null
    }

    const orderName = preorder ? 'CalcAI Preorder' : 'CalcAI Order'
    const payload = {
      // Core fields
      currency: 'USD',
      amount: amountStr,            // e.g., "174.99"
      amount_usd: amountStr,        // snake_case variant
      amount_cents: amountCents,    // minor units variant
      name: orderName,              // per SDK examples
      title: orderName,             // alias
      description: `${orderName} – ${Array.isArray(cartItems) && cartItems.length > 0 ? cartItems.length : 1} item(s)`,
      businessId: BUSINESS_ID,      // some APIs expect this in body

      // Metadata
      metadata: baseMetadata,

      // Webhook/callback variants
      notifyUrl,
      webhookUrl: notifyUrl,
      webhook_url: notifyUrl,
      callback_url: notifyUrl,

      // Redirect variants
      successUrl,
      cancelUrl,
      returnUrl: successUrl,
      success_url: successUrl,
      cancel_url: cancelUrl,
      return_url: successUrl
    }

    // Use official HoodPay SDK
    const client = new HoodPayClient({
      apiKey: API_KEY,
      businessId: BUSINESS_ID,
      baseUrl: API_BASE
    })

    // Derive customer IP and User-Agent for better fraud signals
    const xfwd = request.headers.get('x-forwarded-for') || ''
    const customerIp = (xfwd.split(',')[0] || '').trim() || null
    const customerUserAgent = request.headers.get('user-agent') || null

    let checkoutUrl = null
    try {
      const hpRes = await client.payments.create({
        amount: Number(amountUsd),
        currency: 'USD',
        name: orderName,
        redirectUrl: successUrl,
        notifyUrl,
        customerEmail: formData?.email || undefined,
        metadata: baseMetadata
      })
      checkoutUrl = hpRes?.data?.url || null
    } catch (err) {
      const upstream = {
        message: err?.message || null,
        status: err?.response?.status || null,
        data: err?.response?.data || null,
        baseUrl: API_BASE,
        path: `/v1/businesses/${BUSINESS_ID}/payments`
      }
      console.error('HoodPay SDK create error:', upstream, err)
      // Return detailed error so the client can show it for fast debugging
      if (fallbackUrl) return NextResponse.json({ url: fallbackUrl, upstream })
      return NextResponse.json({ error: 'Failed to create HoodPay payment', upstream }, { status: 502 })
    }

    if (checkoutUrl) {
      return NextResponse.json({ url: checkoutUrl, processToken, sdk: true })
    }

    // Last-resort fallback
    if (fallbackUrl) return NextResponse.json({ url: fallbackUrl, sdk: true })
    return NextResponse.json({ error: 'Failed to create HoodPay payment', sdk: true }, { status: 502 })
  } catch (error) {
    console.error('Error creating HoodPay checkout:', error)
    return NextResponse.json(
      { error: 'Error creating checkout' },
      { status: 500 }
    )
  }
}
