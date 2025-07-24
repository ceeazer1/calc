import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
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
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Coming soon - We&apos;re preparing comprehensive terms to protect both you and CalcAI
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Under Construction
            </h2>
            <p className="text-gray-300 mb-8">
              We&apos;re working on creating clear and fair terms of service for CalcAI users.
              Our legal team is ensuring everything is transparent and user-friendly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#support" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25"
              >
                Contact Support
              </Link>
              <Link 
                href="/" 
                className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
