import { NextResponse } from 'next/server'

export async function GET() {
  const allEnvVars = Object.keys(process.env).filter(key =>
    key.includes('HOODPAY') || key.includes('DOMAIN')
  )

  return NextResponse.json({
    hasApiKey: !!process.env.HOODPAY_API_KEY,
    hasBusinessId: !!process.env.HOODPAY_BUSINESS_ID,
    hasWebhookSecret: !!process.env.HOODPAY_WEBHOOK_SECRET,
    hasCheckoutUrl: !!process.env.HOODPAY_CHECKOUT_URL || !!process.env.NEXT_PUBLIC_HOODPAY_CHECKOUT_URL,
    apiBase: process.env.HOODPAY_API_BASE || 'https://api.hoodpay.io/v1',
    successUrl: process.env.HOODPAY_SUCCESS_URL,
    cancelUrl: process.env.HOODPAY_CANCEL_URL,
    hasDomain: !!process.env.NEXT_PUBLIC_DOMAIN,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    allHoodPayEnvVars: allEnvVars,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  })
}
