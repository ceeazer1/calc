import { NextResponse } from 'next/server'

// Ensure this route is never statically cached by Next/Vercel.
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Public proxy for website settings so the client page can fetch settings
// even if NEXT_PUBLIC_DASHBOARD_URL is not configured. This endpoint runs
// server-side and can read either DASHBOARD_URL or NEXT_PUBLIC_DASHBOARD_URL.
export async function GET() {
  try {
    const dashURLRaw = process.env.DASHBOARD_URL || process.env.NEXT_PUBLIC_DASHBOARD_URL
    const dashURL = (dashURLRaw || '').trim()
    if (!dashURL) {
      return NextResponse.json({ error: 'Dashboard URL not configured' }, { status: 500 })
    }
    const base = dashURL.replace(/\/+$/, '')
    // Add a cache-buster too, to avoid any intermediary caches.
    const r = await fetch(`${base}/api/website-public/settings?t=${Date.now()}`, { cache: 'no-store' })
    if (!r.ok) {
      return NextResponse.json({ error: 'Failed to load settings' }, { status: 502 })
    }
    const json = await r.json()
    const res = NextResponse.json(json)
    // Try hard to prevent CDN caching.
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    res.headers.set('CDN-Cache-Control', 'no-store')
    res.headers.set('Vercel-CDN-Cache-Control', 'no-store')
    res.headers.set('x-source', 'dashboard-proxy')
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

