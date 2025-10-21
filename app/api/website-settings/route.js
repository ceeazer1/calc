import { NextResponse } from 'next/server'

// Public proxy for website settings so the client page can fetch settings
// even if NEXT_PUBLIC_DASHBOARD_URL is not configured. This endpoint runs
// server-side and can read either DASHBOARD_URL or NEXT_PUBLIC_DASHBOARD_URL.
export async function GET() {
  try {
    const dashURL = process.env.DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL
    if (!dashURL) {
      return NextResponse.json({ error: 'Dashboard URL not configured' }, { status: 500 })
    }
    const base = dashURL.replace(/\/+$/, '')
    const r = await fetch(`${base}/api/website-public/settings`, { cache: 'no-store' })
    if (!r.ok) {
      return NextResponse.json({ error: 'Failed to load settings' }, { status: 502 })
    }
    const json = await r.json()
    const res = NextResponse.json(json)
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

