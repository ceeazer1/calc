'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'

import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, MessageCircle } from 'lucide-react'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
    setLoading(false)
  }, [])

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }
  // Shipping is handled at checkout (US only)

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    router.push('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className={`${poppins.className} bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-14">
            {/* Left: Community, Specifications */}
            <div className="hidden md:flex items-center gap-8 justify-start">
              <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
            </div>
            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={200}
                  height={60}
                  className="h-5 sm:h-6 w-auto transform hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>
            {/* Right: FAQ, Cart */}
            <div className="flex items-center gap-8 justify-end">
              <Link href="/faq" className="text-gray-300 hover:text-white text-sm font-medium">FAQ</Link>
              <div className="flex items-center space-x-2 text-gray-300">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">{getTotalItems()} items</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <span>/</span>
          <span className="text-white">Shopping Cart</span>
        </div>

        <h1 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-300 mb-6">Add some products to get started!</p>
            <Link
              href="/product"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 inline-block text-sm sm:text-base shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-gray-300">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 text-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 text-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                <p className="text-xs text-gray-400 mb-3">Shipping calculated at checkout (US only)</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-semibold text-white">${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax</span>
                    <span className="font-semibold text-white">$0.00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between text-lg">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-white">${getTotalPrice()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || cart.length === 0}
                  className={`w-full py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 transform text-sm sm:text-base text-white text-center block ${isProcessing || cart.length === 0
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                >
                  {isProcessing ? 'Redirecting…' : 'Proceed to Checkout'}
                </button>

                <Link
                  href="/product"
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-center block text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
