'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '../components/Hero'
import FeatureGrid from '../components/FeatureGrid'
import WhatsInside from '../components/WhatsInside'
import WhatIsCalcAI from '../components/WhatIsCalcAI'
import HardwareOverview from '../components/HardwareOverview'
import AIFeatures from '../components/AIFeatures'
import WifiUpdates from '../components/WifiUpdates'
import { ShoppingCart, ArrowRight, Instagram, Youtube } from 'lucide-react'

export default function Home() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalItems)
    }
    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Image src="/logo.png" alt="CalcAI Logo" width={80} height={80} className="w-20 h-20" />
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
                <Link href="/faq" className="text-gray-300 hover:text-white text-sm font-medium">FAQ</Link>
                <a href="#whats-inside" className="text-gray-300 hover:text-white text-sm font-medium">Specifications</a>
              </div>
              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-300 hover:text-white">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link href="/product" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md">Order Now</Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Global Sale Banner */}
      <div className="sticky top-14 z-40 border-y border-yellow-400/30 bg-gradient-to-r from-yellow-500/15 via-orange-500/10 to-pink-500/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 text-center">
            <div className="text-lg sm:text-2xl font-extrabold text-yellow-200 tracking-wide">BACK TO SCHOOL SALE</div>
            <div className="text-xs sm:text-sm text-yellow-300/90">Limited time only • Limited stock</div>
          </div>
        </div>
      </div>


      <Hero />
      <WhatIsCalcAI />
      <HardwareOverview />
      <AIFeatures />
      <FeatureGrid />
      <WhatsInside />
      <WifiUpdates />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to upgrade your calculator?</h2>
          <p className="text-lg text-gray-300 mb-8">Join thousands of students who have enhanced their toolkit with CalcAI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/product" className="btn-primary inline-flex items-center justify-center">
              Order Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/community" className="btn-secondary">Join Community</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <Image src="/logo.png" alt="CalcAI Logo" width={60} height={60} className="w-16 h-16" />
              </div>
              <p className="text-gray-300 text-sm">Multi-tool device for students</p>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-sm">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#whats-inside" className="text-gray-300 hover:text-white">Specifications</a></li>
                <li><Link href="/community" className="text-gray-300 hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-sm">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/community" className="text-gray-300 hover:text-white">Get Help</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://discord.gg/83ZwJcPWJ6" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Image src="/discord-logo.svg" alt="Discord" width={24} height={24} className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@calc_ai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Image src="/tiktok-logo.svg" alt="TikTok" width={24} height={24} className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/calc.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@CalcAI1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="text-center text-sm text-gray-400">© 2024 CalcAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
