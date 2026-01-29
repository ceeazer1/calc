'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { isValidPhoneNumber } from 'libphonenumber-js'
import AddressAutocomplete from '@/components/AddressAutocomplete'

import { PhoneInput } from '@/components/ui/phone-input'

const SHIPPING_OPTIONS = [
  { id: 'usps_priority', name: 'USPS Priority Mail', price: 13, eta: '2-3 business days' },
  { id: 'usps_priority_express', name: 'USPS Priority Mail Express', price: 40, eta: '1-2 business days' },
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
  const [selectedShipping, setSelectedShipping] = useState('usps_priority')

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

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  // ... (omitting some lines for brevity in instruction, will provide full replacement below)

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
    <div className="min-h-screen bg-black text-white py-8 sm:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header / Logo - Always Centered at top */}
        <div className="flex justify-center mb-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="CalcAI Logo" width={110} height={32} className="h-7 w-auto" />
          </Link>
        </div>

        {/* Layout Container: Split on Desktop, Single on Mobile */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20 xl:gap-32">

          {/* Order Summary Column - No Box, Larger Branding */}
          <div className="w-full lg:w-[400px] xl:w-[450px] lg:sticky lg:top-12 order-1">
            <div className="py-2">
              <h2 className="text-2xl font-bold mb-10 tracking-tight">Order Summary</h2>

              <div className="flex gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="relative w-24 h-24 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image src="/Calc_Front_New.png" alt="CalcAI Calculator" fill className="object-cover" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-xl mb-1">CalcAI Calculator</h3>
                  <p className="text-gray-400 text-sm">TI-84+ Edition</p>
                </div>
                <div className="font-bold text-lg pt-2 text-white">${productPrice.toFixed(2)}</div>
              </div>

              <div className="space-y-4 text-base">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${productPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-8 mt-6">
                  <span className="font-bold text-white text-xl">Total Due</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-normal mb-1">USD</div>
                    <span className="font-black text-4xl text-white tracking-tighter">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thin Vertical Divider for Desktop */}
          <div className="hidden lg:block w-[1px] self-stretch bg-white/10" />

          {/* Form Fields Column */}
          <div className="flex-1 order-2 mt-8 lg:mt-0 max-w-2xl">
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-10">
              <div className="space-y-12 focus-within:scroll-smooth">
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

                {/* Payment Section - BTCPay Integration */}
                <section className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>

                  <div className="transition-all duration-300">
                    <button
                      onClick={async () => {
                        if (isProcessing) return;
                        if (!isFormValid) {
                          onDisabledPaymentClick();
                          return;
                        }

                        setIsProcessing(true);

                        // Prepare order data for dashboard
                        const orderData = {
                          order: {
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
                            shippingMethod: SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.name,
                            items: [{
                              description: 'CalcAI Calculator - TI-84+ Edition',
                              quantity: 1,
                              amount: Math.round(productPrice * 100)
                            }],
                            paymentMethod: 'BTC',
                            notes: `Shipping via ${SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.name}`
                          }
                        };

                        try {
                          // Send to dashboard to create order and get invoice
                          const rawDashboardUrl = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.calcai.cc').trim();
                          const dashboardUrl = rawDashboardUrl.endsWith('/') ? rawDashboardUrl.slice(0, -1) : rawDashboardUrl;

                          // Use the generic orders endpoint for now, expecting it to handle BTC method
                          const response = await fetch(`${dashboardUrl}/api/website/orders`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                              'Content-Type': 'application/json',
                              'x-api-key': process.env.NEXT_PUBLIC_WEBSITE_API_KEY || 'CALCAI_SECURE_PUSH_2026'
                            },
                            body: JSON.stringify(orderData)
                          });

                          const result = await response.json();

                          if (response.ok && result.ok) {
                            if (result.invoiceId) {
                              // Add listener for the payment event
                              const handleBtcPayMessage = (event) => {
                                if (event.data.status === 'confirmed' || event.data.status === 'complete' || event.data === 'btcpay.status.settled') {
                                  window.location.href = `/success/${result.orderId}`;
                                }
                              };
                              window.addEventListener('message', handleBtcPayMessage);

                              // Show the BTCPay Modal
                              window.btcpay.showInvoice(result.invoiceId);
                            } else {
                              // Instead of silent redirect, show error
                              alert("Error: Order was created but Bitcoin invoice failed (BTCPay Error). Please contact support.");
                              console.error("Missing invoiceId in result:", result);
                              setIsProcessing(false);
                            }
                          } else {
                            alert(result.error || "Failed to create order. Server responded with an error.");
                            setIsProcessing(false);
                          }
                        } catch (err) {
                          console.error("Order creation error:", err);
                          alert(`Connection Error: ${err.message || 'Unable to connect to server'}.`);
                          setIsProcessing(false);
                        }
                      }}
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 ${isFormValid
                        ? 'bg-[#F7931A] hover:bg-[#E88209] text-white'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                          </svg>
                          Pay with Bitcoin
                        </>
                      )}
                    </button>

                    {!isFormValid && (
                      <p className="text-center text-xs text-blue-400 mt-4 font-medium animate-pulse">
                        Please fill out all shipping details to enable payment.
                      </p>
                    )}

                    <p className="text-center text-xs text-gray-500 mt-6">
                      Secure payments via BTCPay Server.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://btc.calcai.cc/modal/btcpay.js" />
    </div>
  )
}
