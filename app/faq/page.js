import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function FAQ() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={200}
                  height={60}
                  className="h-5 sm:h-6 w-auto transform hover:scale-105 transition-transform duration-200 cursor-pointer"
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
      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400">
              Coming soon - We&apos;re preparing comprehensive answers to help you get the most out of CalcAI
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-12 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold text-white mb-3">
              Under Construction
            </h2>
            <p className="text-gray-400 mb-6">
              We&apos;re working on creating detailed FAQ content to address all your questions about CalcAI.
              In the meantime, feel free to reach out to our support team on Discord.
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
