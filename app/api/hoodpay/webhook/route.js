import { NextResponse } from 'next/server'

// Ensure this route is never statically cached by Next/Vercel.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req) {
  try {
    // TODO: Verify webhook signature once HoodPay webhook signing details are confirmed.
    const bodyText = await req.text()
    let json = null
    try {
      json = JSON.parse(bodyText)
    } catch {}

    const type = json?.type || json?.event || json?.eventType || 'unknown'
    const paymentId = json?.data?.id || json?.payment?.id || json?.paymentId || null

    console.log('HoodPay webhook received', { type, paymentId })

    return NextResponse.json({ received: true })
  } catch (e) {
    return NextResponse.json({ received: true })
  }
}


