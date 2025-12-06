import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasDomain: !!process.env.NEXT_PUBLIC_DOMAIN,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  })
}
