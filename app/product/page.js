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
                  width={80}
                  height={80}
                  className="w-20 h-20 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
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
            {/* Main Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden group">
              {/* Product Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/84p.png"
                  alt="CalcAI - TI-84 Plus with AI Integration"
                  width={300}
                  height={300}
                  className="w-4/5 h-4/5 object-contain transform group-hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
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
              <div className="text-2xl font-bold text-white">$129.99</div>
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

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addedToCart ? 'Added to Cart!' : `Add to Cart - $${getPrice()}`}</span>
                </div>
              </button>

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
