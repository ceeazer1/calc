"use client"

import Link from 'next/link'

export default function PayPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/cart" className="text-sm text-gray-300 hover:text-white">Back to Cart</Link>
          <div className="font-semibold">Checkout</div>
          <div />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Checkout temporarily unavailable</h1>
          <p className="text-gray-300 mb-6">We’re switching payment providers right now. Please check back soon.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/product" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all">Continue Shopping</Link>
            <Link href="/cart" className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-semibold transition-all">Back to Cart</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

