import Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SuccessSessionPage({ params }) {
  const sessionId = params?.session_id
  if (!sessionId || typeof sessionId !== 'string') notFound()

  if (!process.env.STRIPE_SECRET_KEY) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={200}
                height={60}
                className="h-5 w-auto"
                priority
              />
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight">Unable to load order</h1>
          <p className="mt-3 text-white/70">
            This site isn&apos;t configured for Stripe on the server yet.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let session = null
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    })
  } catch {
    notFound()
  }

  const isPaid = session?.payment_status === 'paid' || session?.payment_status === 'no_payment_required'

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="CalcAI Logo"
              width={200}
              height={60}
              className="h-5 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isPaid ? 'Order confirmed' : 'Order received'}
        </h1>

        <p className="mt-3 text-white/70">
          Check your email (and spam) for the order confirmation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Return to Home
          </Link>

          <Link
            href="/help"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Need help?
          </Link>
        </div>

        <p className="mt-10 text-xs text-white/40">
          Confirmation ID: {sessionId.slice(0, 10)}…{sessionId.slice(-6)}
        </p>
      </main>
    </div>
  )
}



