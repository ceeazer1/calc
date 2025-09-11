import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          </div>

          {/* Terms content goes here. Replace the placeholder text with the actual terms text. */}
          <article className="prose prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>These Terms of Service ("Terms") govern your access to and use of CalcAI products, services, and websites. By accessing or using CalcAI, you agree to be bound by these Terms.</p>

            <h2>Use of Service</h2>
            <p>You agree to use the Services only for lawful purposes and in compliance with applicable laws and regulations. You will not misuse or interfere with the proper functioning of the Services.</p>

            <h2>Purchases and Refunds</h2>
            <p>All purchases made through our website are subject to our refund and return policies as stated at the time of purchase. Shipping options and costs are presented during checkout.</p>

            <h2>Warranty</h2>
            <p>Products may include a limited warranty as described on the product page. Warranty does not cover misuse, unauthorized modifications, or damage caused by external factors.</p>

            <h2>Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, CalcAI is not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

            <h2>Privacy</h2>
            <p>Your use of the Services is also governed by our Privacy Policy.</p>

            <h2>Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.</p>

            <h2>Contact</h2>
            <p>For questions, please open a ticket in our Discord community.</p>
          </article>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
