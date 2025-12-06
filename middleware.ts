import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Gate the entire site behind /maintenance when settings enable it.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow these paths
  const allowedPrefixes = [
    '/maintenance',
    '/api/website-settings',
    '/_next',
  ]
  if (allowedPrefixes.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Allow common static assets
  const staticAsset = /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map|txt|woff2?|ttf|otf)$/i
  if (staticAsset.test(pathname) || pathname === '/favicon.ico') {
    return NextResponse.next()
  }

  let maintenanceEnabled = false
  try {
    const url = new URL('/api/website-settings', req.url)
    const r = await fetch(url.toString(), { cache: 'no-store' })
    if (r.ok) {
      const data = await r.json()
      // Be tolerant to different shapes coming from the dashboard
      const m = (data?.maintenance ?? data) || {}
      maintenanceEnabled = Boolean(
        m.enabled ?? data?.maintenanceEnabled ?? data?.enabled ?? false
      )
    }
  } catch {
    // If settings fail to load, default to site being open
  }

  if (maintenanceEnabled) {
    const target = new URL('/maintenance', req.url)
    return NextResponse.rewrite(target)
  }

  return NextResponse.next()
}

export const config = {
  // Match all paths; filtering happens in code above
  matcher: '/:path*',
}

