'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AddressAutocomplete from '@/components/AddressAutocomplete'
import SquarePaymentForm from '@/components/SquarePaymentForm'

const SHIPPING_OPTIONS = [
  { id: 'priority', name: 'USPS Priority Mail', price: 13, eta: '2-3 business days' },
  { id: 'express', name: 'USPS Priority Mail Express', price: 40, eta: '1-2 business days' },
]

export default function Checkout() {
  const [selectedShipping, setSelectedShipping] = useState('priority')

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    zip: '',
    state: '' // Assuming we might want to store state even if not explicitly shown/editable or just for validation
  })

  const productPrice = 210
  const shippingPrice = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 13
  const totalPrice = productPrice + shippingPrice

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddressSelect = (details) => {
    setFormData(prev => ({
      ...prev,
      address: details.address,
      city: details.city || prev.city,
      zip: details.zip || prev.zip,
      state: details.state || prev.state
    }))
  }

  const isFormValid = formData.email && formData.firstName && formData.lastName && formData.address && formData.city && formData.zip

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
              <div className="relative">
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none">*</span>
              </div>
            </section>

            {/* Shipping Address Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Shipping address</h2>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">US Shipping Only</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div /* First Name */ className="md:col-span-1 relative">
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="First name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none">*</span>
                </div>
                <div /* Last Name */ className="md:col-span-1 relative">
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Last name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none">*</span>
                </div>
                <div /* Address Method */ className="md:col-span-2 relative">
                  <AddressAutocomplete
                    value={formData.address}
                    onSelect={handleAddressSelect}
                    onChange={(val) => setFormData(prev => ({ ...prev, address: val }))}
                    placeholder="Address"
                  />
                  {/* AddressAutocomplete handles its own input, but we can try to overlay the star if needed, or assume the placeholder change is enough.
                      However user asked for red star. We'll wrap the autocomplete in a relative div in the loop above?
                      Actually AddressAutocomplete has its own styles. Let's add the star here absolutely. */}
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none pointer-events-none z-10">*</span>
                </div>
                <div /* Apartment */ className="md:col-span-2">
                  <input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div /* City */ className="md:col-span-1 relative">
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="City"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none">*</span>
                </div>
                <div /* Post Code */ className="md:col-span-1 relative">
                  <input
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ZIP code"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg leading-none">*</span>
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

            {/* Payment Section - Embedded Square Checkout */}
            <section className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

              <div className={`transition-all duration-500 ${!isFormValid ? 'opacity-50 grayscale blur-sm pointer-events-none select-none' : ''}`}>
                {/* 
                            IMPORTANT: You must replace the Application ID and Location ID 
                            in `components/SquarePaymentForm.jsx` for this to work.
                        */}
                <SquarePaymentForm
                  amount={totalPrice}
                  onPaymentSuccess={(token) => {
                    console.log("Success:", token)
                    // Here you would normally verify the payment on your backend
                    window.location.href = '/success'
                  }}
                  onPaymentError={(err) => console.error("Payment Error:", err)}
                />
                <p className="text-center text-xs text-gray-500 mt-6">
                  Payments secured by Square. We do not store your card details.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
