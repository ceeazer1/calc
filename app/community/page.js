'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { ArrowRight, ShoppingCart, MessageCircle, Users, Video, Camera } from 'lucide-react'

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'] })

export default function Community() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalItems)
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  const socialLinks = [
    {
      name: 'Discord',
      url: 'https://discord.gg/83ZwJcPWJ6',
      icon: '/discord-logo.svg',
      iconBg: 'bg-[#5865F2]',
      ring: 'ring-[#5865F2]/30',
      description: 'Primary support'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@calc_ai',
      icon: '/tiktok-logo.svg',
      iconBg: 'bg-gradient-to-br from-[#25F4EE] to-[#FE2C55]',
      ring: 'ring-white/10',
      description: 'Short demos'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/calc.ai/',
      icon: '/instagram-logo.svg',
      iconBg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      ring: 'ring-white/10',
      description: 'Photos & updates'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@CalcAI1',
      icon: '/youtube-logo.svg',
      iconBg: 'bg-[#FF0000]',
      ring: 'ring-[#FF0000]/30',
      description: 'Tutorials'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`${poppins.className} fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-14">
            {/* Left: Community, Specifications */}
            <div className="hidden md:flex items-center gap-8 justify-start">
              <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
              <Link href="/#whats-inside" className="text-gray-300 hover:text-white text-sm font-medium">Specifications</Link>
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
              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-300 hover:text-white">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-white">
              Community
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Connect with other CalcAI users, get support, and stay updated with the latest news and features
            </p>
          </div>
        </div>
      </section>

      {/* Social Links Section - larger centered tiles (previous style) */}
      <section className="pt-4 pb-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 p-6 focus:outline-none focus:ring-2 focus:ring-white/20 ${social.ring || ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg grid place-items-center ${social.iconBg}`}>
                    <img
                      src={social.icon}
                      alt={`${social.name} Logo`}
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{social.name}</div>
                    <div className="text-sm text-gray-400">{social.description}</div>
                  </div>
                  <div className="hidden sm:flex items-center text-white/80 text-sm">
                    Visit <span className="ml-1">{social.name}</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-80" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={200}
                  height={60}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Multi-tool device for students
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#whats-inside" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Specifications
                  </Link>
                </li>
                <li>
                  <Link href="/#support" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 CalcAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
