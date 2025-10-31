export const runtime = 'edge'

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const q = url.searchParams.get('question') ?? url.searchParams.get('q') ?? ''
    const base = (process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || 'https://calcai-server.fly.dev').replace(/\/+$/, '')
    const upstream = await fetch(`${base}/gpt/ask-stream?question=${encodeURIComponent(q)}`, {
      method: 'GET',
      headers: {
        'x-device-id': req.headers.get('x-device-id') || '',
        'x-device-mac': req.headers.get('x-device-mac') || ''
      },
      cache: 'no-store'
    })
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      }
    })
  } catch (e) {
    return new Response('server_error', { status: 500, headers: { 'Content-Type': 'text/plain' } })
  }
}

