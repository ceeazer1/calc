import { NextResponse } from 'next/server'
import stripe from '../../../lib/stripe'

export async function POST(request) {
  try {
    // Check if Stripe is properly configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Stripe configuration error: Missing secret key' },
        { status: 500 }
      )
    }

    // Determine our domain for success/cancel URLs
    let domain = process.env.NEXT_PUBLIC_DOMAIN
    if (!domain) {
      const proto = request.headers.get('x-forwarded-proto') || 'https'
      const host = request.headers.get('host')
      domain = host ? `${proto}://${host}` : 'http://localhost:3000'
    }

    const { cartItems, totalAmount, formData } = await request.json()

    console.log('Creating Stripe session with domain:', domain)

    // Fetch dynamic price/stock from dashboard (public endpoint)
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

    if (remoteSettings && remoteSettings.inStock === false) {
      return NextResponse.json({ error: 'Out of stock' }, { status: 400 })
    }

    const unitAmountCents = Math.round(((remoteSettings?.price ?? 174.99) * 100))

    // Convert cart items to Stripe line items (authoritative price from dashboard)
    const lineItems = cartItems && cartItems.length ? cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: 'The world\u2019s first calculator with discrete AI integration',
          images: [`${domain}${item.image}`],
        },
        unit_amount: unitAmountCents,
      },
      quantity: item.quantity,
    })) : [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CalcAI - TI-84 Plus with ChatGPT',
            description: 'The world\u2019s first calculator with discrete AI integration',
            images: [`${domain}/NEWTI84.png`],
          },
          unit_amount: unitAmountCents,
        },
        quantity: 1,
      }
    ]

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'cashapp',
        'us_bank_account',
        'link'
      ],
      automatic_tax: {
        enabled: false, // Set to true if you want automatic tax calculation
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      },
      // Offer three delivery options at Checkout
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1200, currency: 'usd' },
            display_name: 'Economy – USPS Ground Advantage',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 2000, currency: 'usd' },
            display_name: 'Fast – USPS Priority Mail',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 5500, currency: 'usd' },
            display_name: 'Express – Priority Mail Express',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      metadata: {
        order_type: 'calcai_purchase',
        total_items: cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 1,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
