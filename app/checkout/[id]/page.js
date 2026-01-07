'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isValidPhoneNumber } from 'libphonenumber-js'
import AddressAutocomplete from '@/components/AddressAutocomplete'
import SquarePaymentForm from '@/components/SquarePaymentForm'
import { PhoneInput } from '@/components/ui/phone-input'

const SHIPPING_OPTIONS = [
  { id: 'priority', name: 'USPS Priority Mail', price: 13, eta: '2-3 business days' },
  { id: 'express', name: 'USPS Priority Mail Express', price: 40, eta: '1-2 business days' },
]

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
]

export default function Checkout() {
  const [selectedShipping, setSelectedShipping] = useState('priority')

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    zip: '',
    state: ''
  })

  const [touched, setTouched] = useState({})

  const fieldRefs = {
    email: useRef(null),
    phone: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    address: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zip: useRef(null),
  }

  const productPrice = 210
  const shippingPrice = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 13
  const totalPrice = productPrice + shippingPrice

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleAddressSelect = (details) => {
    // Helper to convert full state names to codes if needed
    let stateCode = details.state || ''
    if (stateCode.length > 2) {
      const stateMatch = US_STATES.find(s =>
        s.name.toLowerCase() === stateCode.toLowerCase()
      )
      if (stateMatch) stateCode = stateMatch.code
    }

    setFormData(prev => ({
      ...prev,
      address: details.address,
      city: details.city || prev.city,
      zip: details.zip || prev.zip,
      state: stateCode || prev.state
    }))
    setTouched(prev => ({ ...prev, address: true, city: true, zip: true, state: true }))
  }

  // Validation Rules
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPhoneValid = (phone) => {
    try {
      return isValidPhoneNumber(phone, 'US')
    } catch (e) {
      return false
    }
  }

  const errors = {
    email: !isValidEmail(formData.email),
    phone: !isPhoneValid(formData.phone),
    firstName: !formData.firstName.trim(),
    lastName: !formData.lastName.trim(),
    address: !formData.address.trim(),
    city: !formData.city.trim(),
    state: !formData.state.trim(),
    zip: !formData.zip.trim() || formData.zip.length < 5,
  }

  const isFormValid = !Object.values(errors).some(v => v)

  const onDisabledPaymentClick = () => {
    // Find first error and scroll to it
    const order = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'state', 'zip']
    const firstError = order.find(field => errors[field])

    if (firstError) {
      setTouched(prev => {
        const allTouched = {}
        order.forEach(f => { allTouched[f] = true })
        return allTouched
      })

      const element = fieldRefs[firstError].current
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const getInputClass = (name) => {
    const base = "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition"
    if (touched[name] && errors[name]) {
      return `${base} border-red-500 focus:border-red-500 ring-1 ring-red-500/50`
    }
    return `${base} border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
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

          <div className="space-y-10 focus-within:scroll-smooth">
            {/* Contact Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Contact <span className="text-red-500">*</span></h2>
              <div className="space-y-4">
                <div>
                  <input
                    ref={fieldRefs.email}
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="Email address"
                    className={getInputClass('email')}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">Please enter a valid email address.</p>
                  )}
                </div>
                <div>
                  <PhoneInput
                    ref={fieldRefs.phone}
                    value={formData.phone}
                    onChange={(national) => {
                      setFormData(prev => ({ ...prev, phone: national }))
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                    defaultCountry="US"
                    placeholder="Phone number"
                    className={errors.phone && touched.phone ? "border-red-500" : ""}
                    size="lg"
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1 animate-in fade-in slide-in-from-top-1">Please enter a valid phone number.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Shipping Address Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Shipping address <span className="text-red-500">*</span></h2>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">US Shipping Only</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <input
                    ref={fieldRefs.firstName}
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="First name"
                    className={getInputClass('firstName')}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">First name is required.</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <input
                    ref={fieldRefs.lastName}
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Last name"
                    className={getInputClass('lastName')}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">Last name is required.</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <AddressAutocomplete
                    ref={fieldRefs.address}
                    value={formData.address}
                    onSelect={handleAddressSelect}
                    onChange={(val) => {
                      setFormData(prev => ({ ...prev, address: val }))
                      if (val.length === 0) setTouched(prev => ({ ...prev, address: true }))
                    }}
                    placeholder="Address"
                  />
                  {touched.address && errors.address && (
                    <p className="text-red-500 text-xs mt-1">Please select a valid address.</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div className="md:col-span-1">
                  <input
                    ref={fieldRefs.city}
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="City"
                    className={getInputClass('city')}
                  />
                  {touched.city && errors.city && (
                    <p className="text-red-500 text-xs mt-1">City is required.</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <div className="relative">
                    <select
                      ref={fieldRefs.state}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`${getInputClass('state')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-zinc-900">Select State</option>
                      {US_STATES.map(s => (
                        <option key={s.code} value={s.code} className="bg-zinc-900">{s.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 4.5L6 8L9.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {touched.state && errors.state && (
                    <p className="text-red-500 text-xs mt-1">State is required.</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    ref={fieldRefs.zip}
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="ZIP code"
                    className={getInputClass('zip')}
                  />
                  {touched.zip && errors.zip && (
                    <p className="text-red-500 text-xs mt-1">Valid ZIP code is required.</p>
                  )}
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

              <div className="transition-all duration-300">
                <SquarePaymentForm
                  amount={totalPrice}
                  isFormValid={isFormValid}
                  onDisabledClick={onDisabledPaymentClick}
                  onPaymentSuccess={async (token) => {
                    console.log("Success:", token)

                    // Prepare order data for your admin dashboard
                    const orderData = {
                      order: {
                        id: token.token, // Square payment token as unique ID
                        amount: Math.round(totalPrice * 100),
                        currency: 'usd',
                        customerEmail: formData.email,
                        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
                        customerPhone: formData.phone,
                        shippingAddress: {
                          line1: formData.address,
                          line2: formData.apartment || undefined,
                          city: formData.city,
                          state: formData.state,
                          postal_code: formData.zip,
                          country: 'US'
                        },
                        items: [{
                          description: 'CalcAI Calculator - TI-84+ Edition',
                          quantity: 1,
                          amount: Math.round(productPrice * 100)
                        }],
                        paymentMethod: token.card_brand || 'Square',
                        notes: `Shipping via ${SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.name}`
                      }
                    };

                    try {
                      // Push to admin dashboard
                      const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.calcai.cc';
                      await fetch(`${dashboardUrl}/api/website/orders`, {
                        method: 'POST',
                        mode: 'cors', // Enable cors for cross-domain push
                        headers: {
                          'Content-Type': 'application/json',
                          'x-api-key': process.env.NEXT_PUBLIC_WEBSITE_API_KEY || 'CALCAI_SECURE_PUSH_2026'
                        },
                        body: JSON.stringify(orderData)
                      });
                    } catch (err) {
                      console.error("Dashboard push error:", err);
                    }

                    // Redirect to unique success page with payment token
                    window.location.href = `/success/${token.token}`
                  }}
                  onPaymentError={(err) => console.error("Payment Error:", err)}
                />

                {!isFormValid && (
                  <p className="text-center text-xs text-blue-400 mt-4 font-medium animate-pulse">
                    Please fill out all shipping details to enable payment.
                  </p>
                )}

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
