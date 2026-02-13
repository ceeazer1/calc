import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Order confirmation</h1>
        <p className="mt-3 text-white/70">
          If you just checked out, check your email (and spam) for the order confirmation.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
