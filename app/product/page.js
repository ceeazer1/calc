'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [condition, setCondition] = useState('new') // 'new' or 'used'

  const getPrice = () => {
    return condition === 'new' ? 129.99 : 84.99
  }

  const getProductName = () => {
    return condition === 'new'
      ? 'CalcAI - TI-84 Plus with ChatGPT (Brand New)'
      : 'CalcAI - TI-84 Plus with ChatGPT (Used - Good Condition)'
  }

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')

    // Add product to cart
    const product = {
      id: `calcai-ti84-${condition}`,
      name: getProductName(),
      price: getPrice(),
      quantity: quantity,
      image: '/NEWTI84.png',
      condition: condition
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md shadow-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={120}
                height={120}
                className="w-32 h-32 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl"
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/+48P4V5dL5ShmYTQx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support</span>
              </a>
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
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                AI MODDED
              </div>
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
              <div className="mt-3">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  condition === 'new'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}>
                  {condition === 'new' ? 'Brand New' : 'Used - Good Condition'}
                </span>
              </div>
            </div>



            {/* Condition Selection */}
            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-xl font-semibold text-white">Choose Condition:</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCondition('new')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    condition === 'new'
                      ? 'border-green-500 bg-gradient-to-br from-green-500/20 to-green-600/10 text-white shadow-lg shadow-green-500/20'
                      : 'border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-gray-300 hover:border-slate-500 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold text-lg">Brand New</div>
                    <div className="text-2xl font-bold mt-1">$129.99</div>
                    <div className="text-sm mt-1">Factory sealed</div>
                  </div>
                </button>

                <button
                  onClick={() => setCondition('used')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    condition === 'used'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-white shadow-lg shadow-blue-500/20'
                      : 'border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-gray-300 hover:border-slate-500 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold text-lg">Used</div>
                    <div className="text-2xl font-bold mt-1">$84.99</div>
                    <div className="text-sm mt-1">Good condition</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl border border-blue-500 shadow-lg shadow-blue-500/20">
              <div className="text-5xl font-bold text-white">${getPrice()}</div>
              <div className="text-blue-200 text-lg">Free worldwide shipping included</div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">What&apos;s Included:</h3>
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
                {condition === 'used' && (
                  <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                    <h4 className="text-blue-300 font-medium mb-2">Used Condition Details:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Fully tested and working perfectly</li>
                      <li>• Minor cosmetic wear (scratches/scuffs)</li>
                      <li>• All AI features pre-installed and verified</li>
                      <li>• Same functionality as brand new</li>

                    </ul>
                  </div>
                )}
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 text-lg border border-blue-500"
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
