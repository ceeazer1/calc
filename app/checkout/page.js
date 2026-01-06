'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AddressAutocomplete from '@/components/AddressAutocomplete'

const SHIPPING_OPTIONS = [
  { id: 'priority', name: 'USPS Priority Mail', price: 13, eta: '2-3 business days' },
  { id: 'express', name: 'USPS Priority Mail Express', price: 40, eta: '1-2 business days' },
]

export default function Checkout() {
  const [selectedShipping, setSelectedShipping] = useState('priority')
  const [loading, setLoading] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState(null)

  const productPrice = 210
  const shippingPrice = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 13
  const totalPrice = productPrice + shippingPrice

  const handlePaymentStart = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalPrice, // e.g. 223.00
          label: `CalcAI - ${selectedShipping === 'priority' ? 'Priority' : 'Express'} Shipping`
        })
      })

      const data = await res.json()

      if (data.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl)
      } else {
        console.error("No checkout URL returned", data)
        alert("Payment system is temporarily unavailable. Please try again.")
      }
    } catch (e) {
      console.error("Payment init error", e)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      {/* Left Column - Order Summary */}
      <div className="w-full lg:w-[480px] xl:w-[560px] bg-zinc-900 border-r border-white/10 p-6 sm:p-8 lg:p-12 xl:p-16 order-1 lg:order-1 h-auto lg:min-h-screen lg:sticky lg:top-0">
        <div className="max-w-xl mx-auto lg:mx-0">
          {/* Desktop Logo */}
          <div className="hidden lg:block mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CalcAI Logo" width={100} height={30} className="h-6 w-auto" />
            </Link>
          </div>

          <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {/* Placeholder for product image if not available */}
              <Image src="/Calc_Front_New.png" alt="CalcAI Calculator" fill className="object-cover" />
              {/* <Image src="/product.png" fill className="object-cover" /> */}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">CalcAI Calculator</h3>
              <p className="text-gray-400 text-sm">TI-84+ Edition</p>
            </div>
            <div className="font-semibold">${productPrice.toFixed(2)}</div>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${productPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4 mt-4">
              <span className="font-semibold text-lg text-white">Total</span>
              <div className="text-right">
                <div className="text-xs text-gray-500 font-normal mb-1">USD</div>
                <span className="font-bold text-2xl text-white">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form Fields */}
      <div className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-16 xl:px-24 order-2 lg:order-2">
        <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-2xl">
          {/* Header for Mobile (Logo) */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CalcAI Logo" width={100} height={30} className="h-5 w-auto" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/cart" className="hover:text-white transition">Cart</Link>
            <span>/</span>
            <span className="text-white">Checkout</span>
          </nav>

          <div className="space-y-10">
            {/* Contact Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </section>

            {/* Shipping Address Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Shipping address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div /* First Name */ className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div /* Last Name */ className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div /* Address Method */ className="md:col-span-2">
                  <AddressAutocomplete placeholder="Address" />
                </div>
                <div /* Apartment */ className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div /* City */ className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div /* Post Code */ className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="ZIP code"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Method Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Shipping method</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedShipping === option.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
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
                        <div className="font-medium text-sm sm:text-base">{option.name}</div>
                        <div className="text-xs sm:text-sm text-gray-400">{option.eta}</div>
                      </div>
                    </div>
                    <span className="font-medium text-sm sm:text-base">${option.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Payment Section - Embedded Zaprite Checkout */}
            {checkoutUrl ? (
              <section className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
                <div className="w-full h-[650px] rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                  <iframe
                    src={checkoutUrl}
                    className="w-full h-full"
                    title="Secure Payment"
                    allow="payment"
                  />
                </div>
                <button
                  onClick={() => setCheckoutUrl(null)}
                  className="mt-4 text-sm text-gray-500 hover:text-white transition"
                >
                  ← Cancel and change shipping
                </button>
              </section>
            ) : (
              /* Pay Button Action */
              <div className="mt-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Accepted methods</span>
                    <div className="flex gap-2">
                      {/* Payment Icons */}
                      <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center" title="Card">💳</div>
                      <div className="h-6 w-10 bg-[#F7931A]/20 text-[#F7931A] rounded flex items-center justify-center font-bold text-xs" title="Bitcoin">₿</div>
                      <div className="h-6 w-10 bg-[#7B1AF7]/20 text-[#7B1AF7] rounded flex items-center justify-center" title="Lightning">⚡</div>
                    </div>
                  </div>

                  <button
                    onClick={handlePaymentStart}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Proceed to Secure Checkout • $${totalPrice.toFixed(2)}`
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  Encrypted and secured by Zaprite.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
