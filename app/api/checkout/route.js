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

    if (!process.env.NEXT_PUBLIC_DOMAIN) {
      console.error('NEXT_PUBLIC_DOMAIN is not set')
      return NextResponse.json(
        { error: 'Configuration error: Missing domain' },
        { status: 500 }
      )
    }

    const { cartItems, totalAmount, formData } = await request.json()

    console.log('Creating Stripe session with domain:', process.env.NEXT_PUBLIC_DOMAIN)

    // Convert cart items to Stripe line items
    const lineItems = cartItems ? cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: 'The world\u2019s first calculator with discrete AI integration',
          images: [`${process.env.NEXT_PUBLIC_DOMAIN}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })) : [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CalcAI - TI-84 Plus with ChatGPT',
            description: 'The world\u2019s first calculator with discrete AI integration',
            images: [`${process.env.NEXT_PUBLIC_DOMAIN}/new image.png`],
          },
          unit_amount: 12999, // $129.99 in cents
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
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      },
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
