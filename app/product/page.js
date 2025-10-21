'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingCart, ArrowLeft, ArrowRight, Shield, Truck, RotateCcw, MessageCircle, Calculator } from 'lucide-react'
import { getStripe } from '../../lib/stripe'

export default function ProductPage() {

  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [price, setPrice] = useState(174.99)
  const [compareAt, setCompareAt] = useState(199.99)
  const [inStock, setInStock] = useState(true)
  const [stockCount, setStockCount] = useState(null)
  // Preorder controls (from dashboard)
  const [preorderEnabled, setPreorderEnabled] = useState(false)
  const [preorderPrice, setPreorderPrice] = useState(200.00)
  const [preorderShipDate, setPreorderShipDate] = useState("")
  const [loaded, setLoaded] = useState(false)
  // Product image carousel
  const images = ['/Calc_Front.jpg', '/Calc_Back.jpg']
  const fallbackImage = '/84p.png'
  const [imgIndex, setImgIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % images.length)
      setImgError(false)
    }, 15000)
    return () => clearInterval(id)
  }, [])

  // Update cart count on component mount and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalItems)
    }

    updateCartCount()

    // Listen for storage changes (when cart is updated from other tabs/components)
    window.addEventListener('storage', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  const getPrice = () => {
    return price
  }

  const getProductName = () => {
    return 'CalcAI - TI-84 Plus with ChatGPT'
  }

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')

    // Add product to cart
    const product = {
      id: 'calcai-ti84',
      name: getProductName(),
      price: getPrice(),
      quantity: quantity,
      image: '/ti84.png'
    }

    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(item => item.id === product.id)

    if (existingProductIndex >= 0) {
      // Update quantity if product exists
      existingCart[existingProductIndex].quantity += quantity
    } else {
      // Add new product to cart
      existingCart.push(product)
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // Update cart count
    const totalItems = existingCart.reduce((total, item) => total + item.quantity, 0)
    setCartItemCount(totalItems)

    // Show success message
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  // Load price/stock from dashboard (via public env or local proxy) then mark loaded
  useEffect(() => {
    const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
    const doApply = (j) => {
      if (!j) return
      if (typeof j.price === 'number') setPrice(Number(j.price))
      if (typeof j.compareAt === 'number') setCompareAt(Number(j.compareAt))
      if (typeof j.inStock === 'boolean') setInStock(j.inStock)
      if (typeof j.stockCount === 'number') setStockCount(Number(j.stockCount))
      if (typeof j.preorderEnabled === 'boolean') setPreorderEnabled(j.preorderEnabled)
      if (typeof j.preorderPrice === 'number') setPreorderPrice(Number(j.preorderPrice))
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

    ;(async () => {
      let j = null
      if (DASHBOARD_URL) j = await fetchDirect()
      if (!j) j = await fetchViaProxy()
      doApply(j)
      setLoaded(true)
    })()
  }, [])
  const handlePreorderCheckout = async () => {
    try {
      const stripe = await getStripe()
      const label = getProductName() + ' — Preorder' + (preorderShipDate ? ` (Ships ${preorderShipDate})` : '')
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preorder: true,
          cartItems: [{
            id: 'calcai-ti84-preorder',
            name: label,
            price: preorderPrice,
            quantity,
            image: '/ti84.png'
          }]
        })
      })
      const data = await response.json()
      if (!response.ok || !data.sessionId) throw new Error(data.error || 'Checkout error')
      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (e) {
      alert('Could not start preorder checkout. Please try again or contact support.')
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
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
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Community
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  FAQ
                </Link>
                <Link
                  href="/#whats-inside"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Specifications
                </Link>
              </div>

              {/* Cart Icon with Count */}
              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">CalcAI TI-84 Plus</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="relative">
            {/* Main Product Image with carousel */}
            <div
              className="relative aspect-square rounded-lg overflow-hidden group border border-white/10 bg-gray-900/40 cursor-pointer"
              onClick={() => { setImgIndex((imgIndex + 1) % images.length); setImgError(false) }}
              role="button"
              aria-label="Next image"
              title="Next image"
            >
              {/* Visible arrows */}
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 border border-white/20 p-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex - 1 + images.length) % images.length); setImgError(false) }}
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 border border-white/20 p-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); setImgIndex((imgIndex + 1) % images.length); setImgError(false) }}
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src={imgError ? fallbackImage : images[imgIndex]}
                  alt={imgIndex === 0 ? 'CalcAI Calculator - Front' : 'CalcAI Calculator - Back'}
                  width={600}
                  height={600}
                  className="w-4/5 h-4/5 object-contain transform group-hover:scale-105 transition-all duration-300"
                  priority
                  onError={() => setImgError(true)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setImgIndex(i); setImgError(false) }}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-500'}`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
                CalcAI
              </h1>
              <h2 className="text-xl text-gray-300">
                TI-84 Plus with AI Integration
              </h2>
              <p className="text-gray-400">
                Multi-tool device for students in a familiar TI-84 body
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">What&apos;s included</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>CalcAI TI-84 Plus with integrated PCB</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Built-in camera module</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>2-week free warranty</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Free unlimited support</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>Batteries not included</span>
                </li>
              </ul>
            </div>




            {/* Price Section */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="text-2xl font-bold text-white flex items-center gap-3">
                  {compareAt && compareAt > price ? (
                    <>
                      <span className="text-gray-400 line-through">${compareAt.toFixed(2)}</span>
                      <span>${price.toFixed(2)}</span>
                      <span className="text-xs font-semibold text-green-300 bg-green-500/10 border border-green-400/20 rounded-full px-2 py-0.5">On Sale</span>
                    </>
                  ) : (
                    <span>${price.toFixed(2)}</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-400/20 rounded-full px-2 py-0.5">Sells out fast</span>
              </div>
              <div className="text-xs mt-2">
                {loaded ? (
                  <span className={inStock && (stockCount === null || stockCount > 0) ? 'text-green-300' : 'text-red-300'}>
                    {inStock && (stockCount === null || stockCount > 0)
                      ? `In stock${typeof stockCount === 'number' ? `: ${stockCount}` : ''}`
                      : 'Out of stock'}
                  </span>
                ) : (
                  <span className="text-gray-400">Checking availability…</span>
                )}
                <span className="text-gray-400"> • Shipping: see options at checkout</span>
              </div>
              {preorderEnabled && (preorderPrice || preorderShipDate) ? (
                <div className="mt-2 text-xs text-gray-400">
                  <span>
                    Preorder{preorderPrice ? ` price: $${preorderPrice.toFixed(2)}` : ''}{preorderShipDate ? ` • Ships ${preorderShipDate}` : ''}
                  </span>
                </div>
              ) : null}
              <div className="mt-2 text-xs text-blue-300">
                Live stock updates on Discord: <a href="https://discord.gg/83ZwJcPWJ6" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">discord.gg/83ZwJcPWJ6</a>
              </div>
            </div>



            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-700 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CTAs: Add to Cart + Preorder (optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!loaded || !inStock || (typeof stockCount === 'number' && stockCount <= 0)}
                  className={`w-full ${loaded && inStock && !(typeof stockCount === 'number' && stockCount <= 0) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'} text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 text-sm`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{loaded ? (inStock ? (addedToCart ? 'Added to Cart!' : `Add to Cart - $${getPrice().toFixed(2)}`) : 'Out of Stock') : 'Loading...'}</span>
                  </div>
                </button>

                {preorderEnabled ? (
                  <button
                    onClick={handlePreorderCheckout}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    {`Preorder - $${preorderPrice.toFixed(2)}${preorderShipDate ? ` • Ships ${preorderShipDate}` : ''}`}
                  </button>
                ) : null}
              </div>

              {addedToCart && (
                <div className="text-center">
                  <Link
                    href="/cart"
                    className="text-blue-400 hover:text-blue-300 underline text-sm"
                  >
                    View Cart & Checkout
                  </Link>
                </div>
              )}

              <div className="text-center text-xs text-gray-400 mt-2">
                <p>Secure payment powered by Stripe</p>
              </div>

              <div className="text-center text-xs text-gray-500 mt-1">SMS in-stock alerts: coming soon</div>
            </div>

            {/* Guarantees */}
            <div className="border-t border-gray-700 pt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
