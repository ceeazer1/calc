import { NextResponse } from 'next/server'
import stripe from '../../../lib/stripe'

export async function POST(request) {
  try {
    const { formData } = await request.json()

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CalcAI - TI-84 Plus with ChatGPT',
              description: 'The world\u2019s first calculator with discrete AI integration',
              images: [`${process.env.NEXT_PUBLIC_DOMAIN}/84p.png`],
            },
            unit_amount: 12999, // $129.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout`,
      customer_email: formData.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      },
      metadata: {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
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
