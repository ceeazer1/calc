'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Add product to cart
    const product = {
      id: 'calcai-ti84',
      name: 'CalcAI - TI-84 Plus with ChatGPT',
      price: 129.99,
      quantity: quantity,
      image: '/84p.png'
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
    
    // Show success message
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={56}
                height={56}
                className="w-14 h-14 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl"
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <span>/</span>
          <span className="text-white">CalcAI TI-84 Plus</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-800">
              <Image
                src="/84p.png"
                alt="TI-84 Plus Calculator with ChatGPT Integration"
                width={500}
                height={500}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                CalcAI - TI-84 Plus with ChatGPT
              </h1>
              <p className="text-lg text-gray-300">
                The world\u2019s first calculator with discrete AI integration
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <Star className="w-5 h-5 text-yellow-400 fill-current opacity-50" />
              </div>
              <span className="text-gray-300">4.5 (23 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-white">$129.99</div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">What\u2019s Included:</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">ChatGPT Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Store Notes Feature</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Chat with Other Calculators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Discrete Method (Survives Factory Reset)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Detailed Video Guide Included</span>
                </div>
              </div>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart - $129.99'}
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
                  <span className="flex items-center space-x-1">
                    <span>💳</span>
                    <span>Cards</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>💰</span>
                    <span>Cash App</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🏦</span>
                    <span>Bank Transfer</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>⚡</span>
                    <span>Link</span>
                  </span>
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
                <RotateCcw className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">30-day money back guarantee</span>
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
