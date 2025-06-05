import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasDomain: !!process.env.NEXT_PUBLIC_DOMAIN,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    publishableKeyPrefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10) + '...',
  })
}
