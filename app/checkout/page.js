'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calculator,
  ArrowLeft,
  Shield,
  Truck,
  CheckCircle,
  CreditCard,
  Lock,
  Star,
  MessageCircle
} from 'lucide-react'

export default function Checkout() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  const [shippingType, setShippingType] = useState('standard')
  const shippingPrices = { standard: 0, express: 24.99 }
  const subtotal = 129.99
  const shippingAmount = shippingPrices[shippingType] ?? 0
  const total = (subtotal + shippingAmount).toFixed(2)

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  useEffect(() => {
    setIsProcessing(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert('Checkout is temporarily unavailable while we switch payment providers.')
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your CalcAI will be shipped within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600">Order Number</div>
            <div className="font-mono text-lg">#CALCAI-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
          </div>
          <Link href="/" className="btn-primary w-full text-center block">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-white/60 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-lg">Checkout is currently unavailable</p>
          <p className="text-sm text-gray-400">We’re switching payment providers. Please try again later.</p>
        </div>
      </div>
    )
  }
  // Fallback: if not processing and we haven't redirected, show dark handoff with retry
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center space-y-2">
        <p className="text-lg">Checkout is currently unavailable</p>
        <p className="text-sm text-gray-400">We’re switching payment providers. Please check back soon.</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Link href="/cart" className="btn-secondary">Back to Cart</Link>
        </div>
      </div>
    </div>
  )



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/cart" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Cart</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 drop-shadow-xl"
                />
                <span className="text-lg font-bold text-gray-900">Checkout</span>
              </div>
              <a
                href="https://discord.gg/83ZwJcPWJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Hero Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <Image
                  src="/ti84.png"
                  alt="TI-84 Plus Calculator with ChatGPT Integration"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ChatGPT Enhanced
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  CalcAI - TI-84 Plus with ChatGPT
                </h1>
                <p className="text-lg text-gray-600">
                  The world\u2019s first calculator with discrete AI integration
                </p>
              </div>



              <div className="text-4xl font-bold text-gray-900">$129.99</div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>ChatGPT Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Store Notes Feature</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Chat with Other Calculators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Discrete Method (Survives Factory Reset)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Detailed Video Guide Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src="/ti84.png"
                    alt="TI-84 Plus Calculator"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">CalcAI - TI-84 Plus with ChatGPT</h3>
                  <p className="text-sm text-gray-600">Discrete AI-powered calculator</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}

                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping ({shippingType === 'express' ? 'Express' : 'Standard'})</span>
                  <span className="font-semibold">{shippingAmount === 0 ? 'FREE' : `$${shippingAmount.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${total}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span>Free worldwide shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apt, Suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Apt 2B"
                  />
                </div>


                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>

                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipping Method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingType === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="shippingType"
                        value="standard"
                        checked={shippingType === 'standard'}
                        onChange={() => setShippingType('standard')}
                        className="form-radio text-blue-600"
                      />
                      <span className="font-medium text-gray-900">Standard (5-7 business days)</span>
                    </div>
                    <span className="text-gray-900 font-semibold">FREE</span>
                  </label>
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingType === 'express' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="shippingType"
                        value="express"
                        checked={shippingType === 'express'}
                        onChange={() => setShippingType('express')}
                        className="form-radio text-blue-600"
                      />
                      <span className="font-medium text-gray-900">Express (2 business days)</span>
                    </div>
                    <span className="text-gray-900 font-semibold">$24.99</span>
                  </label>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment</h3>
                <p className="text-gray-600">
                  Checkout is currently unavailable while we switch payment providers.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm font-medium">Secure checkout</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    We never store your card or wallet details.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 transform hover:scale-105'
                } text-white shadow-lg`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Redirecting to Secure Payment...</span>
                  </div>
                ) : (
                  'Proceed to Secure Payment'
                )}
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                By completing your order, you agree to our Terms of Service and Privacy Policy.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
