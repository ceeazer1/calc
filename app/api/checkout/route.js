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

    // Force stable domain for success/cancel URLs so Stripe "Back/Cancel" always returns to cart
    // Always use primary production domain.
    const domain = 'https://calcai.cc'

    const { cartItems, totalAmount, formData, preorder } = await request.json()

    console.log('Creating Stripe session with domain:', domain, 'preorder:', preorder === true)

    // Fetch dynamic price/stock and preorder controls from dashboard (public endpoint)
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

    // Price: preorder from dashboard or fallback, otherwise use dashboard price (or fallback)
    const unitAmountCents = preorder
      ? Math.round(((remoteSettings?.preorderPrice ?? 200.00) * 100))
      : Math.round(((remoteSettings?.price ?? 174.99) * 100))

    // Convert cart items to Stripe line items (authoritative price from dashboard)
    const shipDate = (remoteSettings?.preorderShipDate && typeof remoteSettings.preorderShipDate === 'string') ? remoteSettings.preorderShipDate : ''
    const nameSuffix = preorder ? (` \u2014 Preorder${shipDate ? ` (Ships ${shipDate})` : ''}`) : ''
    const lineItems = cartItems && cartItems.length ? cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: (item.name || 'CalcAI - TI-84 Plus with ChatGPT') + nameSuffix,
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
            name: 'CalcAI - TI-84 Plus with ChatGPT' + nameSuffix,
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
      // Offer two delivery options at Checkout
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'usd' },
            display_name: 'USPS Priority Mail',
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
            display_name: 'Priority Mail Express',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      metadata: {
        order_type: preorder ? 'calcai_preorder' : 'calcai_purchase',
        preorder: preorder ? 'true' : 'false',
        ship_after: preorder ? (shipDate || 'N/A') : 'N/A',
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
