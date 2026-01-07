import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CheckoutRoot() {
  // Generate a truly random session ID on every request
  const sessionId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)

  redirect(`/checkout/${sessionId}`)
}
