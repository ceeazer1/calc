'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HelioCheckout } from '@heliofi/checkout-react'

const SHIPPING_OPTIONS = [
  { id: 'priority', name: 'USPS Priority Mail', price: 13, eta: '2-3 business days' },
  { id: 'express', name: 'USPS Priority Mail Express', price: 40, eta: '1-2 business days' },
]

export default function Checkout() {
  const [selectedShipping, setSelectedShipping] = useState('priority')

  // TODO: Replace with your actual paylinkId from MoonPay Commerce dashboard
  const PAYLINK_ID = '695c788832b11192df738db4'

  const productPrice = 210
  const shippingPrice = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 13
  const totalPrice = productPrice + shippingPrice

  const helioConfig = useMemo(() => ({
    paylinkId: PAYLINK_ID,
    amount: totalPrice.toString(),
    theme: {
      themeMode: 'dark',
    },
    additionalJSON: {
      shippingMethod: selectedShipping,
      shippingPrice: shippingPrice,
      productPrice: productPrice,
    },
    onSuccess: (event) => {
      console.log('Payment successful:', event)
      window.location.href = '/success'
    },
    onError: (event) => {
      console.error('Payment error:', event)
    },
    onCancel: () => {
      console.log('Payment cancelled')
    },
  }), [totalPrice, selectedShipping, shippingPrice])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/cart" className="text-sm text-gray-300 hover:text-white transition">
            ← Back to Cart
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="CalcAI Logo"
              width={100}
              height={30}
              className="h-5 w-auto"
              priority
            />
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-gray-400">Secure crypto payment powered by MoonPay Commerce</p>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-300">CalcAI Calculator</span>
            <span className="font-semibold">${productPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-300">Shipping</span>
            <span className="font-semibold">${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Options */}
        <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
          <p className="text-xs text-gray-400 mb-4">US shipping only</p>
          <div className="space-y-3">
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedShipping === option.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 hover:border-white/20'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="w-4 h-4 text-blue-500 accent-blue-500"
                  />
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-400">{option.eta}</div>
                  </div>
                </div>
                <span className="font-semibold">${option.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6">
          <HelioCheckout config={helioConfig} />
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Payments are processed securely by MoonPay Commerce.
          We accept USDC, SOL, and 100+ cryptocurrencies.
        </p>
      </main>
    </div>
  )
}
