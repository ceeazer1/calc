'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react'
import { getStripe } from '../../lib/stripe'

export default function CartPage() {
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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      // Create checkout session with cart items
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
          totalAmount: Math.round(parseFloat(getTotalPrice()) * 100) // Convert to cents
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        console.error('Stripe error:', error)
        alert('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={100}
                height={100}
                className="w-24 h-24 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl"
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <ShoppingCart className="w-5 h-5" />
                <span>{getTotalItems()} items</span>
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

        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-300 mb-6">Add some products to get started!</p>
            <Link 
              href="/product"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-800">
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
              <div className="bg-gray-900 rounded-lg shadow-sm p-6 sticky top-8 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-semibold text-white">${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span className="font-semibold text-green-400">FREE</span>
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
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                    isProcessing
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Proceed to Secure Checkout'
                  )}
                </button>

                <Link
                  href="/product"
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-center block"
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
