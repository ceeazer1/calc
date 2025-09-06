import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Download, Mail, Truck, MessageCircle } from 'lucide-react'

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
                width={120}
                height={120}
                className="w-32 h-32 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl"
              />
            </Link>


          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Order Confirmed</h1>
          <p className="text-base text-gray-600 mb-8 text-center">Thanks for your purchase. You’ll get a confirmation email shortly.</p>

          {/* Support / Next steps */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Need help or have questions?</h2>
            <p className="text-gray-600 mb-5">Join our Discord for support and updates.</p>
            <a
              href="https://discord.gg/83ZwJcPWJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Discord</span>
            </a>
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


        </div>
      </div>
    </div>
  )
}
