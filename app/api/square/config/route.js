import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID || 'sq0idp-mbYDoi4ZGh17ygvb8LM6oQ'
    const locationId = process.env.SQUARE_LOCATION_ID || ''

    if (!appId || !locationId) {
      return NextResponse.json({ error: 'Square config missing' }, { status: 500 })
    }

    return NextResponse.json({ appId, locationId })
  } catch (err) {
    console.error('Square config error:', err)
    return NextResponse.json({ error: 'Failed to load Square config' }, { status: 500 })
  }
}

