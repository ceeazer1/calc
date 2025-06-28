'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

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
    return 129.99
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
      image: '/NEWTI84.png'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={120}
                  height={120}
                  className="w-32 h-32 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="/#support"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Support
                </a>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  FAQ
                </Link>
                <a
                  href="/#features"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Specifications
                </a>
              </div>

              {/* Cart Icon with Count */}
              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-blue-400 mb-8">
          <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
          <span className="text-slate-500">/</span>
          <span className="text-white font-medium">CalcAI TI-84 Plus</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
              <Image
                src="/NEWTI84.png"
                alt="TI-84 Plus Calculator with ChatGPT Integration"
                width={500}
                height={500}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 relative z-10"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-800/50 to-transparent p-6 rounded-2xl border border-slate-700">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3">
                CalcAI - TI-84 Plus with ChatGPT
              </h1>
              <p className="text-xl text-blue-200">
                TI-84 Plus calculator with discrete AI integration
              </p>
            </div>





            {/* Price */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg border border-blue-500 shadow-md">
              <div className="text-3xl font-bold text-white">$129.99</div>
              <div className="text-blue-200 text-sm">Free worldwide shipping included</div>
            </div>



            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-300">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-600 bg-gray-800 text-white rounded-md px-3 py-2"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-base border border-blue-500"
              >
                {addedToCart ? 'Added to Cart!' : `Add to Cart - $${getPrice()}`}
              </button>

              {addedToCart && (
                <div className="text-center">
                  <Link
                    href="/cart"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    View Cart & Checkout
                  </Link>
                </div>
              )}

              <div className="text-center text-sm text-gray-400 mt-2">
                <div className="flex items-center justify-center space-x-3 mb-2 flex-wrap">
                  <span className="text-gray-400">Cards</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">Cash App</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">Bank Transfer</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">Link</span>
                </div>
                <p>Secure payment powered by Stripe</p>
              </div>
            </div>

            {/* Guarantees */}
            <div className="border-t border-gray-700 pt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Free shipping worldwide</span>
              </div>

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
