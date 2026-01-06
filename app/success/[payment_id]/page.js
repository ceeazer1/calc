import { HoodPayClient } from '@internal-labs/hoodpay'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

function isPaidStatus(status) {
  const s = String(status || '').toLowerCase()
  return (
    s === 'paid' ||
    s === 'completed' ||
    s === 'complete' ||
    s === 'confirmed' ||
    s === 'success' ||
    s === 'succeeded' ||
    s.includes('paid') ||
    s.includes('complete') ||
    s.includes('confirm')
  )
}

export default async function SuccessPaymentPage({ params }) {
  const paymentId = params?.payment_id
  if (!paymentId || typeof paymentId !== 'string') notFound()

  const apiKey = process.env.HOODPAY_API_KEY
  const businessId = process.env.HOODPAY_BUSINESS_ID

  if (!apiKey || !businessId) {
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
            This site isn&apos;t configured for HoodPay on the server yet.
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

  const client = new HoodPayClient({ apiKey, businessId })

  let paymentRes = null
  try {
    paymentRes = await client.payments.get(paymentId)
  } catch {
    notFound()
  }

  const status = paymentRes?.data?.status
  const isPaid = isPaidStatus(status)

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

        <p className="mt-3 text-white/70">Check your email (and spam) for the order confirmation.</p>

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
          Confirmation ID: {paymentId.slice(0, 10)}…{paymentId.slice(-6)}
        </p>
      </main>
    </div>
  )
}


