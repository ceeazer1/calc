import { redirect } from 'next/navigation'

export default function CheckoutRoot() {
  // Generate a unique session ID for this checkout attempt
  const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  redirect(`/checkout/${sessionId}`)
}
