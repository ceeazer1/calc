import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import stripe from '../../../lib/stripe'

export async function POST(request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      
      // Here you would typically:
      // 1. Save the order to your database
      // 2. Send confirmation email
      // 3. Update inventory
      // 4. Trigger fulfillment process
      
      console.log('Payment successful:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata
      })
      
      // Example: Send confirmation email (you'd implement this)
      // await sendOrderConfirmationEmail(session)
      
      break
    
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object
      console.log('Payment failed:', paymentIntent.id)
      break
    
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
