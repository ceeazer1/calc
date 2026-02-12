'use client'

import { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FAQs from '../../components/FAQs'
import { Input as NumberInput } from '../../components/ui/number-input'
import { PhoneInput } from '../../components/ui/phone-input'
import { Shield, Truck, Lock } from 'lucide-react'

// Country list (dial codes); patterns kept light — we can switch to libphonenumber-js formatting next
const COUNTRIES = [
  { code: 'US', name: 'United States', dial: '1', nsn: [10], pattern: [3, 3, 4], placeholder: '(555) 123-4567' },
  { code: 'CA', name: 'Canada', dial: '1', nsn: [10], pattern: [3, 3, 4], placeholder: '(555) 123-4567' },
  { code: 'MX', name: 'Mexico', dial: '52', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'BR', name: 'Brazil', dial: '55', nsn: [10, 11], pattern: [], placeholder: 'Phone number' },
  { code: 'AR', name: 'Argentina', dial: '54', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'GB', name: 'United Kingdom', dial: '44', nsn: [9, 10], pattern: [4, 3, 3], placeholder: '7123 456 789' },
  { code: 'IE', name: 'Ireland', dial: '353', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'FR', name: 'France', dial: '33', nsn: [9], pattern: [2, 2, 2, 3], placeholder: '6 12 34 567' },
  { code: 'DE', name: 'Germany', dial: '49', nsn: [10, 11], pattern: [3, 3, 4], placeholder: '151 234 5678' },
  { code: 'ES', name: 'Spain', dial: '34', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'IT', name: 'Italy', dial: '39', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'NL', name: 'Netherlands', dial: '31', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'BE', name: 'Belgium', dial: '32', nsn: [8, 9], pattern: [], placeholder: 'Phone number' },
  { code: 'SE', name: 'Sweden', dial: '46', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'NO', name: 'Norway', dial: '47', nsn: [8], pattern: [], placeholder: 'Phone number' },
  { code: 'DK', name: 'Denmark', dial: '45', nsn: [8], pattern: [], placeholder: 'Phone number' },
  { code: 'FI', name: 'Finland', dial: '358', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'PT', name: 'Portugal', dial: '351', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'CH', name: 'Switzerland', dial: '41', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'AT', name: 'Austria', dial: '43', nsn: [10, 11], pattern: [], placeholder: 'Phone number' },
  { code: 'PL', name: 'Poland', dial: '48', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'CZ', name: 'Czechia', dial: '420', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'SK', name: 'Slovakia', dial: '421', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'HU', name: 'Hungary', dial: '36', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'RO', name: 'Romania', dial: '40', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'GR', name: 'Greece', dial: '30', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'TR', name: 'Türkiye', dial: '90', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'IL', name: 'Israel', dial: '972', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'AE', name: 'United Arab Emirates', dial: '971', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'SA', name: 'Saudi Arabia', dial: '966', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'ZA', name: 'South Africa', dial: '27', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'EG', name: 'Egypt', dial: '20', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'MA', name: 'Morocco', dial: '212', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'NG', name: 'Nigeria', dial: '234', nsn: [8, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'KE', name: 'Kenya', dial: '254', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'GH', name: 'Ghana', dial: '233', nsn: [9], pattern: [], placeholder: 'Phone number' },
  { code: 'IN', name: 'India', dial: '91', nsn: [10], pattern: [5, 5], placeholder: '98765 43210' },
  { code: 'PK', name: 'Pakistan', dial: '92', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'BD', name: 'Bangladesh', dial: '880', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'SG', name: 'Singapore', dial: '65', nsn: [8], pattern: [], placeholder: 'Phone number' },
  { code: 'MY', name: 'Malaysia', dial: '60', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'ID', name: 'Indonesia', dial: '62', nsn: [9, 10, 11], pattern: [], placeholder: 'Phone number' },
  { code: 'PH', name: 'Philippines', dial: '63', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'TH', name: 'Thailand', dial: '66', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'VN', name: 'Vietnam', dial: '84', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'KR', name: 'South Korea', dial: '82', nsn: [9, 10], pattern: [], placeholder: 'Phone number' },
  { code: 'JP', name: 'Japan', dial: '81', nsn: [10], pattern: [], placeholder: 'Phone number' },
  { code: 'AU', name: 'Australia', dial: '61', nsn: [9], pattern: [4, 3, 2], placeholder: '4123 456 78' },
  { code: 'NZ', name: 'New Zealand', dial: '64', nsn: [8, 9], pattern: [], placeholder: 'Phone number' },
]

const PRODUCT_IMAGES = ['/Calc_Front_New.png', '/Calc_Back_New.png']
const PRODUCT_FALLBACK_IMAGE = '/84p.png'

const onlyDigits = (s) => String(s || '').replace(/\D/g, '')
const nsnMax = (c) => Math.max(...c.nsn)
const nsnMin = (c) => Math.min(...c.nsn)
function formatNational(c, digits) {
  const d = onlyDigits(digits).slice(0, nsnMax(c))
  // Special US/CA formatting
  if ((c.code === 'US' || c.code === 'CA')) {
    const a = d.slice(0, 3), b = d.slice(3, 6), x = d.slice(6, 10)
    if (d.length <= 3) return a
    if (d.length <= 6) return `(${a}) ${b}`
    return `(${a}) ${b}-${x}`
  }
  const p = c.pattern || []
  if (!p.length) return d.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
  let res = '', i = 0
  for (const g of p) {
    if (i >= d.length) break
    const nxt = d.slice(i, i + g)
    if (!nxt) break
    res += (res ? ' ' : '') + nxt
    i += g
  }
  if (i < d.length) res += ' ' + d.slice(i)
  return res
}

const ProductImages = memo(function ProductImages() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative">
      {/* Main Product Image with hover flip */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden group"
        role="img"
        aria-label="Calculator images"
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Front image - fades out on hover */}
          <Image
            src={imgError ? PRODUCT_FALLBACK_IMAGE : PRODUCT_IMAGES[0]}
            alt="CalcAI Calculator - Front"
            width={800}
            height={800}
            className="absolute inset-0 w-full h-full object-contain transform scale-110 group-hover:scale-[1.15] transition-all duration-700 group-hover:opacity-0"
            priority
            onError={() => setImgError(true)}
          />
          {/* Back image - fades in on hover */}
          <Image
            src={imgError ? PRODUCT_FALLBACK_IMAGE : PRODUCT_IMAGES[1]}
            alt="CalcAI Calculator - Back"
            width={800}
            height={800}
            className="absolute inset-0 w-full h-full object-contain transform scale-110 group-hover:scale-[1.15] transition-all duration-700 opacity-0 group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-3">
        <p className="text-xs text-gray-500">Hover over to view back</p>
      </div>
    </div>
  )
})

export default function ProductPage() {

  const [quantity, setQuantity] = useState(1)

  const [price, setPrice] = useState(null)
  const [compareAt, setCompareAt] = useState(null)
  const [inStock, setInStock] = useState(null)
  const [stockCount, setStockCount] = useState(null)
  const router = useRouter()
  // Preorder controls (from dashboard)
  const [preorderEnabled, setPreorderEnabled] = useState(false)
  const [preorderPrice, setPreorderPrice] = useState(200.00)
  const [preorderShipDate, setPreorderShipDate] = useState("")
  const [loaded, setLoaded] = useState(false)

  // SMS restock notify form
  const [smsPhone, setSmsPhone] = useState('')
  const [smsConsent, setSmsConsent] = useState(false)
  const [smsSubmitting, setSmsSubmitting] = useState(false)
  const [smsResult, setSmsResult] = useState(null) // { ok, error }
  const [smsCountry, setSmsCountry] = useState(COUNTRIES[0])
  const [smsNational, setSmsNational] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)


  async function handleSmsSubscribe(e) {
    e.preventDefault()
    if (!smsPhone.trim() || smsSubmitting) return
    setSmsSubmitting(true)
    setSmsResult(null)
    try {
      const r = await fetch('/api/sms/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: smsPhone, consent: true })
      })
      let j = null
      try { j = await r.json() } catch { }
      const ok = r.ok && (j?.ok !== false)
      if (ok) {
        setSmsResult({ ok: true })
        setSmsPhone('')
        setSmsNational('')
      } else {
        setSmsResult({ ok: false, error: j?.error || 'subscribe_failed' })
      }
    } catch (e) {
      setSmsResult({ ok: false, error: 'network_error' })
    } finally {
      setSmsSubmitting(false)
    }
  }



  const getPrice = () => {
    return price
  }

  const getProductName = () => {
    return 'CalcAI - TI-84 Plus with ChatGPT'
  }

  const handleBuyNow = () => {
    router.push('/checkout')
  }

  // Load price/stock from dashboard (via public env or local proxy) then mark loaded
  useEffect(() => {
    const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    const doApply = (j) => {
      if (!j) return
      if (typeof j.price === 'number') setPrice(Number(j.price))
      // allow clearing compareAt by sending null
      if (typeof j.compareAt === 'number') setCompareAt(Number(j.compareAt))
      else if (j.compareAt === null) setCompareAt(null)
      if (typeof j.inStock === 'boolean') setInStock(j.inStock)
      // allow clearing stockCount by sending null
      if (typeof j.stockCount === 'number') setStockCount(Number(j.stockCount))
      else if (j.stockCount === null) setStockCount(null)
      if (typeof j.preorderEnabled === 'boolean') setPreorderEnabled(j.preorderEnabled)
      // allow clearing preorderPrice by sending null
      if (typeof j.preorderPrice === 'number') setPreorderPrice(Number(j.preorderPrice))
      else if (j.preorderPrice === null) setPreorderPrice(null)
      if (typeof j.preorderShipDate === 'string') setPreorderShipDate(j.preorderShipDate)
    }

    const fetchDirect = async () => {
      try {
        const base = DASHBOARD_URL.replace(/\/+$/, '')
        const r = await fetch(`${base}/api/website-public/settings`, { cache: 'no-store' })
        return r.ok ? await r.json() : null
      } catch { return null }
    }
    const fetchViaProxy = async () => {
      try {
        const r = await fetch('/api/website-settings', { cache: 'no-store' })
        return r.ok ? await r.json() : null
      } catch { return null }
    }

      ; (async () => {
        let j = null
        if (DASHBOARD_URL) j = await fetchDirect()
        if (!j) j = await fetchViaProxy()

        if (j) {
          doApply(j)
        } else {
          // No fallback prices, let dashboard decide
          setInStock(false)
        }
        setLoaded(true)
      })()
  }, [])
  const handlePreorderCheckout = async () => {
    router.push('/checkout')
  }

  // Availability is controlled by the dashboard's inStock flag.
  // stockCount is optional (display-only / informational).
  const soldOut = loaded && !inStock
  const canPurchase = loaded && !soldOut

  return (
    <div className="min-h-screen bg-black text-white">


      {/* Navigation */}
      <nav className={`sticky top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-14">
            {/* Left: Community, Specifications */}
            <div className="hidden md:flex items-center gap-8 justify-start">
              <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
            </div>
            {/* Center: Logo */}
            <div className="col-start-2 flex items-center justify-center md:col-start-auto">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={200}
                  height={60}
                  className="h-5 sm:h-6 w-auto transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </Link>
            </div>
            {/* Right: FAQ, Cart */}
            <div className="col-start-3 flex items-center gap-8 justify-end md:col-start-auto">
              <Link href="/faq" className="text-gray-300 hover:text-white text-sm font-medium">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-10 sm:mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">CalcAI TI-84 Plus</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Product Images */}
          <ProductImages />

          {/* Product Info */}
          <div className="space-y-10 lg:space-y-12">
            {/* Header Section */}
            <div className="space-y-3">
              <h1 className="text-5xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
                CalcAI
              </h1>
              <p className="text-sm sm:text-base font-light tracking-tight text-slate-300/80 max-w-xl">
                TI‑84 Plus with discreet ChatGPT integration.
              </p>
            </div>






            {/* Price Section */}
            <div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="text-2xl font-bold text-white flex items-center gap-3">
                  {loaded ? (
                    price !== null ? (
                      <>
                        {compareAt && compareAt > price ? (
                          <>
                            <span className="text-gray-400 line-through">${compareAt.toFixed(2)}</span>
                            <span>${price.toFixed(2)}</span>
                            <span className="text-xs font-semibold text-green-300 bg-green-500/10 border border-green-400/20 rounded-full px-2 py-0.5">On Sale</span>
                          </>
                        ) : (
                          <span>${price.toFixed(2)}</span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-500 text-lg uppercase tracking-wider">Unavailable</span>
                    )
                  ) : (
                    <div className="h-8 w-32 rounded bg-white/10 animate-pulse" />
                  )}
                </div>

              </div>
              <div className="text-xs mt-2">
                {loaded ? (
                  price !== null ? (
                    <span className={inStock ? 'text-green-300' : 'text-red-300'}>
                      {inStock
                        ? `In stock${typeof stockCount === 'number' && stockCount > 0 ? `: ${stockCount}` : ''}`
                        : 'Out of stock'}
                    </span>
                  ) : (
                    <span className="text-gray-500 italic">Please check back soon</span>
                  )
                ) : (
                  <span className="text-gray-400">Checking availability…</span>
                )}
              </div>
              {preorderEnabled && (preorderPrice || preorderShipDate) ? (
                <div className="mt-2 text-xs text-gray-400">
                  <span>
                    Preorder{preorderPrice ? ` price: $${preorderPrice.toFixed(2)}` : ''}{preorderShipDate ? ` • Ships ${preorderShipDate}` : ''}
                  </span>
                </div>
              ) : null}

            </div>



            {/* Purchase */}
            <div className="space-y-6">
              {soldOut ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 max-w-full sm:max-w-[340px]">
                  <h3 className="text-sm font-medium text-white mb-2">Out of stock</h3>
                  <p className="text-xs text-gray-400 mb-4">Enter your phone number for a restock text.</p>

                  {smsResult?.ok ? (
                    <div className="text-green-400 text-xs">✓ You&apos;re subscribed. We&apos;ll text you when CalcAI is back in stock.</div>
                  ) : (
                    <form onSubmit={handleSmsSubscribe} className="space-y-3">
                      <PhoneInput
                        value={smsPhone}
                        onChange={(raw, formatted) => setSmsPhone(formatted)}
                        placeholder="Enter your phone number"
                        defaultCountry="US"
                        disabled={smsSubmitting}
                        size="sm"
                        className="bg-gray-900 border-gray-800 rounded-lg w-full"
                      />
                      {smsResult?.error && (
                        <div className="text-red-400 text-xs">
                          {smsResult.error === 'invalid_phone' ? 'Please enter a valid phone number' : 'Could not subscribe. Try again.'}
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={!smsPhone || smsSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        {smsSubmitting ? 'Subscribing…' : 'Notify me by SMS'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 max-w-full sm:max-w-[340px]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-medium tracking-tight text-gray-300">Quantity</div>
                    </div>
                    <NumberInput
                      value={quantity}
                      min={1}
                      max={5}
                      onChange={(val) => setQuantity(val)}
                      size="sm"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <button
                      onClick={handleBuyNow}
                      disabled={!canPurchase}
                      className={`w-full rounded-2xl border px-6 py-3 text-sm font-light tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 ${canPurchase ? 'border-white/10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus:ring-white/20' : 'border-gray-700 bg-gray-700/50 text-gray-400 cursor-not-allowed backdrop-blur-sm'}`}
                    >
                      Continue to checkout
                    </button>

                    {preorderEnabled ? (
                      <button
                        onClick={handlePreorderCheckout}
                        className="w-full rounded-2xl border border-white/10 bg-purple-600/10 text-purple-50 backdrop-blur-sm hover:bg-purple-600/20 px-6 py-3 font-light tracking-tight transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                      >
                        {`Preorder${typeof preorderPrice === 'number' ? ` - $${preorderPrice.toFixed(2)}` : ''}${preorderShipDate ? ` • Ships ${preorderShipDate}` : ''}`}
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <Truck className="w-4 h-4 text-blue-200/60" />
                      <span>Shipping: US only</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <Shield className="w-4 h-4 text-blue-200/60" />
                      <span>2‑week warranty</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <Lock className="w-4 h-4 text-blue-200/60" />
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 border-t border-white/5 pt-8">
        <FAQs />
      </div>
    </div>
  )
}
