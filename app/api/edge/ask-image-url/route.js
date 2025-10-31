export const runtime = 'edge'

export async function POST(req) {
  try {
    const body = await req.json()
    const base = (process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || 'https://calcai-server.fly.dev').replace(/\/+$/, '')
    const upstream = await fetch(`${base}/gpt/ask-image-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(body || {})
    })
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    })
  } catch (e) {
    return new Response('server_error', { status: 500, headers: { 'Content-Type': 'text/plain' } })
  }
}

