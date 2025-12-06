import { NextResponse } from 'next/server'

export async function GET() {
  const allEnvVars = Object.keys(process.env).filter(key =>
    key.includes('POOF') || key.includes('DOMAIN')
  )

  return NextResponse.json({
    hasPoofUsername: !!process.env.POOF_USERNAME || !!process.env.NEXT_PUBLIC_POOF_USERNAME,
    hasPoofApiKey: !!process.env.POOF_API_KEY,
    successUrl: process.env.POOF_SUCCESS_URL,
    cancelUrl: process.env.POOF_CANCEL_URL,
    hasDomain: !!process.env.NEXT_PUBLIC_DOMAIN,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    poofEnvVars: allEnvVars,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  })
}
