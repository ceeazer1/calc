'use client'

import Link from 'next/link'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center space-y-2">
        <p className="text-lg">Checkout is temporarily unavailable</p>
        <p className="text-sm text-gray-400">We’re updating payment providers. Please check back soon.</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Link href="/cart" className="btn-secondary">Back to Cart</Link>
          <Link href="/product" className="btn-secondary">View Product</Link>
        </div>
      </div>
    </div>
  )
}


