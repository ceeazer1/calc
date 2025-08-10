'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingCart, MessageCircle, Users, Video, Camera } from 'lucide-react'

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
      name: "Discord",
      description: "Join our Discord server for instant support, community discussions, and the latest updates",
      url: "https://discord.gg/83ZwJcPWJ6",
      icon: "/discord-logo.svg",
      color: "bg-indigo-600 hover:bg-indigo-700",
      primary: true
    },
    {
      name: "TikTok",
      description: "Follow us on TikTok for quick demos, tips, and behind-the-scenes content",
      url: "https://www.tiktok.com/@calc_ai",
      icon: <Video className="w-8 h-8" />,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "Instagram",
      description: "See product photos, user stories, and updates on Instagram",
      url: "https://www.instagram.com/calc.ai/",
      icon: <Camera className="w-8 h-8" />,
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      name: "YouTube",
      description: "Watch detailed tutorials, reviews, and product demonstrations",
      url: "https://www.youtube.com/@CalcAI1",
      icon: <Video className="w-8 h-8" />,
      color: "bg-red-600 hover:bg-red-700"
    }
  ]

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
                  className="w-20 h-20 transform hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/#support"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Support
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  FAQ
                </Link>
                <Link
                  href="/#whats-inside"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Specifications
                </Link>
                <Link
                  href="/community"
                  className="text-white transition-colors duration-200 text-sm font-medium"
                >
                  Community
                </Link>
              </div>

              {/* Cart Icon */}
              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Preorder Button */}
              <Link href="/product" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm shadow-md">
                Preorder Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
              Community
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Connect with other CalcAI users, get support, and stay updated with the latest news and features
            </p>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 hover:border-white/20 transition-all duration-300 ${social.primary ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${social.color}`}>
                      {typeof social.icon === 'string' ? (
                        <Image
                          src={social.icon}
                          alt={`${social.name} Logo`}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      ) : (
                        <div className="text-white">{social.icon}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {social.name}
                      {social.primary && (
                        <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                          Primary Support
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {social.description}
                    </p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm ${social.color}`}
                    >
                      Visit {social.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
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
                  width={60}
                  height={60}
                  className="w-16 h-16"
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
