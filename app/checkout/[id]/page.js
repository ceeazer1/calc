'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { isValidPhoneNumber } from 'libphonenumber-js'
import AddressAutocomplete from '@/components/AddressAutocomplete'

import { PhoneInput } from '@/components/ui/phone-input'
import { X, CheckCircle2, Search, Loader2 } from 'lucide-react'

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

  // Emergency Manual Payment States
  const [isManualPayment, setIsManualPayment] = useState(false)
  const [btcAmount, setBtcAmount] = useState(0)
  const [paymentDetected, setPaymentDetected] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)

  const BTC_ADDRESS = "bc1qy9npd3kmezwm5vhjuxvaauxlns9tcpag44847n"

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

  // Blockchain Payment Watcher (Emergency Flow)
  useEffect(() => {
    let interval;
    if (isManualPayment && !paymentDetected) {
      interval = setInterval(async () => {
        try {
          // Check for transactions at the specific address
          const res = await fetch(`https://mempool.space/api/address/${BTC_ADDRESS}/txs`);
          const txs = await res.json();

          if (txs && txs.length > 0) {
            // Check if there's any transaction (confirmed or unconfirmed) 
            // Better: Check if the newest TX is within the last 5 minutes
            const latestTx = txs[0];
            const now = Math.floor(Date.now() / 1000);

            // If TX is very recent (within last 15 mins), we treat it as the order payment
            if (latestTx.status.confirmed === false || (now - latestTx.status.block_time < 900)) {
              setPaymentDetected(true);

              // Tell the dashboard the payment was confirmed so it can send the email
              try {
                const rawDashboardUrl = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.calcai.cc').trim();
                const dashboardUrl = rawDashboardUrl.endsWith('/') ? rawDashboardUrl.slice(0, -1) : rawDashboardUrl;

                await fetch(`${dashboardUrl}/api/website/confirm-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.NEXT_PUBLIC_WEBSITE_API_KEY || 'CALCAI_SECURE_PUSH_2026'
                  },
                  body: JSON.stringify({
                    orderId: currentOrderId,
                    txId: latestTx.txid
                  })
                });
              } catch (confirmErr) {
                console.error("Dashboard confirm error:", confirmErr);
              }

              setTimeout(() => {
                window.location.href = `/success/${currentOrderId}`;
              }, 4000);
            }
          }
        } catch (e) {
          console.error("Blockchain Watcher Error:", e);
        }
      }, 8000); // Check every 8 seconds
    }
    return () => clearInterval(interval);
  }, [isManualPayment, paymentDetected, currentOrderId]);

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
    const order = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zip']
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
                        placeholder="Phone number (optional)"
                        size="lg"
                      />
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
                            setCurrentOrderId(result.orderId);

                            if (result.invoiceId) {
                              // Standard BTCPay Flow
                              const handleBtcPayMessage = (event) => {
                                if (event.data.status === 'confirmed' || event.data.status === 'complete' || event.data === 'btcpay.status.settled') {
                                  window.location.href = `/success/${result.orderId}`;
                                }
                              };
                              window.addEventListener('message', handleBtcPayMessage);
                              window.btcpay.showInvoice(result.invoiceId);
                            } else {
                              // ENTER EMERGENCY MANUAL FLOW
                              console.log("BTCPay Server offline - switching to manual flow");

                              // Fetch BTC price to show correct amount
                              try {
                                const priceRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                                const priceData = await priceRes.json();
                                const price = priceData.bitcoin.usd;
                                setBtcAmount((totalPrice / price).toFixed(8));
                              } catch (e) {
                                // Fallback price if API fails
                                setBtcAmount((totalPrice / 95000).toFixed(8));
                              }

                              setIsManualPayment(true);
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
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 bg-[#F7931A] hover:bg-[#E88209] text-white`}
                    >
                      {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.638 14.904c-1.391-5.589-5.188-7.899-10.707-8.381l1.109-4.453-2.71-.675-1.08 4.331c-.712-.178-1.442-.345-2.167-.508l1.087-4.364-2.709-.676-1.109 4.452c-.59-.134-1.17-.265-1.742-.403l.003-.012-3.74-.933-.721 2.895s2.012.461 1.97.489c1.098.274 1.296 1 .1.265l-1.265 5.074c.076.019.231.057.436.104l-1.272 5.105c-.15.374-.529.935-1.383.722.03.044-1.97-.492-1.97-.492l-1.346 3.104 3.529.88c.657.164 1.303.336 1.938.501l-1.121 4.501 2.709.676 1.109-4.453c.739.2 1.458.388 2.16.568l-1.1 4.415 2.709.676 1.121-4.501c4.629.876 8.114.523 9.584-3.665.1.185-5.91-.708-3.045 1.185-.724-4.821.445-6.394 3.109-5.975.212-3.149-1.291-4.832-3.708-5.98 1.761-.406 3.085-1.564 3.439-3.951zm-6.173 8.636c-.84 3.37-6.524 1.549-8.361 1.091l1.492-5.984c1.838.459 7.749 1.365 6.869 4.893zm1.101-8.731c-.766 3.072-5.503 1.513-7.032 1.13l1.353-5.433c1.529.381 6.474 1.095 5.679 4.303z" />
                          </svg>
                          PAY NOW WITH BITCOIN
                        </>
                      )}
                    </button>

                    {/* Validation message removed */}

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

      {/* Manual Payment Overlay (Emergency Flow) */}
      {isManualPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !paymentDetected && setIsManualPayment(false)} />

          <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden glassmorphism">
            {/* Close Button */}
            {!paymentDetected && (
              <button
                onClick={() => setIsManualPayment(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors z-[110]"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F7931A]/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#F7931A]/10 blur-3xl rounded-full" />

            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#F7931A] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(247,147,26,0.3)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M23.638 14.904c-1.391-5.589-5.188-7.899-10.707-8.381l1.109-4.453-2.71-.675-1.08 4.331c-.712-.178-1.442-.345-2.167-.508l1.087-4.364-2.709-.676-1.109 4.452c-.59-.134-1.17-.265-1.742-.403l.003-.012-3.74-.933-.721 2.895s2.012.461 1.97.489c1.098.274 1.296 1 .1.265l-1.265 5.074c.076.019.231.057.436.104l-1.272 5.105c-.15.374-.529.935-1.383.722.03.044-1.97-.492-1.97-.492l-1.346 3.104 3.529.88c.657.164 1.303.336 1.938.501l-1.121 4.501 2.709.676 1.109-4.453c.739.2 1.458.388 2.16.568l-1.1 4.415 2.709.676 1.121-4.501c4.629.876 8.114.523 9.584-3.665.1.185-5.91-.708-3.045 1.185-.724-4.821.445-6.394 3.109-5.975.212-3.149-1.291-4.832-3.708-5.98 1.761-.406 3.085-1.564 3.439-3.951zm-6.173 8.636c-.84 3.37-6.524 1.549-8.361 1.091l1.492-5.984c1.838.459 7.749 1.365 6.869 4.893zm1.101-8.731c-.766 3.072-5.503 1.513-7.032 1.13l1.353-5.433c1.529.381 6.474 1.095 5.679 4.303z" />
                </svg>
              </div>

              {paymentDetected ? (
                <div className="animate-in zoom-in duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Detected!</h3>
                  <p className="text-zinc-400 mb-8">Redirecting you to the success page...</p>
                  <div className="w-12 h-12 border-4 border-[#F7931A] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-6">Complete Payment</h3>

                  {/* Multi-step Status Tracker */}
                  <div className="w-full flex items-center justify-between mb-8 px-2 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 z-0" />

                    {/* Step 1: Scan */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${!paymentDetected ? 'bg-[#F7931A] border-[#F7931A] text-white' : 'bg-green-500 border-green-500 text-white'}`}>
                        <Search className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] mt-2 text-zinc-500 font-bold uppercase tracking-tighter">Scanning</span>
                    </div>

                    {/* Step 2: Confirmation */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${paymentDetected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-zinc-800 border-white/10 text-zinc-600'}`}>
                        {paymentDetected ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                      </div>
                      <span className="text-[10px] mt-2 text-zinc-500 font-bold uppercase tracking-tighter">Confirming</span>
                    </div>

                    {/* Step 3: Success */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border bg-zinc-800 border-white/10 text-zinc-600`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] mt-2 text-zinc-500 font-bold uppercase tracking-tighter">Success</span>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-4 rounded-2xl mb-6 shadow-xl border-4 border-zinc-800">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${BTC_ADDRESS}?amount=${btcAmount}`}
                      alt="Payment QR Code"
                      className="w-[180px] h-[180px]"
                    />
                  </div>

                  {/* Payment Details */}
                  <div className="w-full space-y-3 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Amount to send</span>
                      <span className="text-xl font-mono font-bold text-[#F7931A]">{btcAmount} BTC</span>
                      <span className="text-[10px] text-zinc-400 mt-1">(${(productPrice + shippingPrice).toFixed(2)} USD)</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1 text-center">Your Bitcoin Address</span>
                      <span className="text-[10px] font-mono break-all text-white bg-black/30 p-2 rounded border border-white/5 select-all">
                        {BTC_ADDRESS}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(BTC_ADDRESS)}
                        className="text-[10px] text-[#F7931A] font-bold mt-2 hover:underline uppercase tracking-wider"
                      >
                        Copy Address
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator Removal and Progress logic has been integrated into the tracker above */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
