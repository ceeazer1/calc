'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, MessageCircle, Calculator } from 'lucide-react'

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
      image: '/newti84plus.png'
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
                  href="https://discord.gg/83ZwJcPWJ6"
                  target="_blank"
                  rel="noopener noreferrer"
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Images */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl shadow-2xl p-12 border border-slate-600 overflow-hidden group">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-xl"></div>

              {/* Product Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/newti84plus.png"
                  alt="TI-84 Plus Calculator with ChatGPT Integration"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-all duration-500 filter drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg rotate-12 opacity-20"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-30"></div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-800/60 to-slate-800/40 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/50 shadow-xl">
                <div className="space-y-4">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight">
                    CalcAI
                  </h1>
                  <h2 className="text-2xl font-light text-gray-300">
                    TI-84 Plus with ChatGPT
                  </h2>
                  <p className="text-lg text-blue-200/80 font-light">
                    TI-84 Plus calculator with discrete AI integration
                  </p>
                </div>
              </div>
            </div>





            {/* Price Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 rounded-2xl border border-blue-400/50 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">$129.99</div>
                  </div>
                  <div className="text-blue-200/60">
                    <Calculator className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>



            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50">
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-300">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-slate-500 bg-slate-700 text-white rounded-lg px-4 py-2 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={handleAddToCart}
                  className="relative w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-2xl border border-blue-400/50 transform hover:scale-[1.02] text-lg"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <ShoppingCart className="w-5 h-5" />
                    <span>{addedToCart ? 'Added to Cart!' : `Add to Cart - $${getPrice()}`}</span>
                  </div>
                </button>
              </div>

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
                <div className="flex items-center justify-center space-x-4 mb-2 flex-wrap">
                  <span className="text-gray-400">Cards</span>
                  <span className="text-gray-400">Cash App</span>
                  <span className="text-gray-400">Bank Transfer</span>
                  <span className="text-gray-400">Link</span>
                </div>
                <p>Secure payment powered by Stripe</p>
              </div>
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
