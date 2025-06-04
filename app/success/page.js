import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Download, Mail, Truck } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for purchasing CalcAI! Your order has been successfully processed.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">1. Confirmation Email</h3>
                  <p className="text-gray-600">You'll receive an order confirmation email within 5 minutes with your receipt and order details.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">2. Video Guide Access</h3>
                  <p className="text-gray-600">Download link for the detailed installation video guide will be sent to your email immediately.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">3. Fast Shipping</h3>
                  <p className="text-gray-600">Your CalcAI will be carefully packaged and shipped within 24 hours. Free worldwide shipping included!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src="/84p.png"
                  alt="CalcAI TI-84 Plus"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900">CalcAI - TI-84 Plus</h4>
                <p className="text-gray-600">with ChatGPT Integration</p>
                <p className="font-bold text-gray-900">$129.99</p>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help with installation, setup, or any questions you might have.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> support@calcai.com</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
              <p><strong>Warranty:</strong> 30-day money-back guarantee</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Return to Home
            </Link>
            <a 
              href="mailto:support@calcai.com?subject=CalcAI Order Support"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Contact Support
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join 23+ satisfied customers!</p>
            <div className="flex justify-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
              <span className="text-yellow-400 text-xl opacity-50">⭐</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">4.5/5 average rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}
