import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Gate the entire site behind /maintenance when settings enable it.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow these paths
  const allowedPrefixes = [
    '/maintenance',
    '/api/website-settings',
    '/api/test-env',
    '/_next',
  ]
  if (allowedPrefixes.some((p) => pathname.startsWith(p))) {
    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'no-store')
    res.headers.set('x-maintenance', 'allowed')
    return res
  }

  // Allow common static assets
  const staticAsset = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map|txt|woff2?|ttf|otf)$/i
  if (staticAsset.test(pathname) || pathname === '/favicon.ico') {
    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'no-store')
    res.headers.set('x-maintenance', 'static')
    return res
  }

  let maintenanceEnabled = false
  try {
    // 1) Preferred: fetch dashboard public endpoint directly from Edge using NEXT_PUBLIC_DASHBOARD_URL
    const dash = (process.env.NEXT_PUBLIC_DASHBOARD_URL || '').trim()
    let r: Response | null = null
    if (dash) {
      const base = dash.replace(/\/+$/, '')
      r = await fetch(`${base}/api/website-public/settings`, { cache: 'no-store' })
    }

    // 2) Fallback: internal proxy (node env can read DASHBOARD_URL)
    if (!r || !r.ok) {
      const url = new URL('/api/website-settings', req.url)
      r = await fetch(url.toString(), { cache: 'no-store' })
    }

    if (r && r.ok) {
      const data = await r.json()
      // Be tolerant to different shapes coming from the dashboard
      const m = (data?.maintenance ?? data) || {}
      const raw = (m.enabled ?? data?.maintenanceEnabled ?? data?.enabled ?? false)
      // Robust boolean coercion: handle booleans, strings ("true"/"false"), numbers (1/0)
      if (typeof raw === 'boolean') maintenanceEnabled = raw
      else if (typeof raw === 'string') maintenanceEnabled = /^(true|1|yes)$/i.test(raw.trim())
      else if (typeof raw === 'number') maintenanceEnabled = raw === 1
      else maintenanceEnabled = false
    }
  } catch {
    // If settings fail to load, default to site being open
  }

  if (maintenanceEnabled) {
    const target = new URL('/maintenance', req.url)
    const res = NextResponse.rewrite(target)
    res.headers.set('Cache-Control', 'no-store')
    res.headers.set('x-maintenance', 'on')
    return res
  }

  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'no-store')
  res.headers.set('x-maintenance', 'off')
  return res
}

export const config = {
  // Match all paths; filtering happens in code above
  matcher: '/:path*',
}

