'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
  Calculator,
  Brain,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Lock,
  Users,
  MessageCircle,
  ShoppingCart,
  Cpu,
  Camera,
  Battery,
  Video,
  Instagram,
  Youtube
} from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3)
    }, 3000)

    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalItems)
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  const features = [
    {
      icon: <div className="flex items-center justify-center w-6 h-6">
        <Image
          src="/chatgpt-logo.svg"
          alt="ChatGPT"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>,
      title: "ChatGPT Integration",
      description: "Powered by OpenAI's ChatGPT. Get instant AI assistance with any math problem or calculation."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Completely Hidden",
      description: "Looks exactly like a regular TI-84. Teachers, proctors, nobody will know."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Survives Resets",
      description: "RAM clear, factory reset, doesn't matter. The mod stays installed."
    }
  ]

  const components = [
    {
      image: "/esp32.png",
      title: "ESP32-C3 Chip",
      description: "Powerful microcontroller with built-in WiFi for AI processing"
    },
    {
      image: "/voltagelvl.png",
      title: "Voltage Level Shifter",
      description: "Ensures safe communication between components"
    },
    {
      image: "/cam.png",
      title: "Camera Module",
      description: "High-resolution camera for advanced functionality"
    },
    {
      image: "/84p.png",
      title: "Modified TI-84 Plus",
      description: "Original calculator with seamless AI integration"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={80}
                height={80}
                className="w-20 h-20 transform hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Community
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  FAQ
                </Link>
                <a
                  href="#whats-inside"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Specifications
                </a>
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

              {/* Buy Now Button */}
              <Link href="/product" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm">
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, #1e40af 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, #2563eb 0%, transparent 50%)`,
            backgroundSize: '150px 150px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center min-h-[70vh] flex flex-col justify-start">
            {/* Logo */}
            <div className={`mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="flex justify-center mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"></div>
                  <Image
                    src="/logo.png"
                    alt="CalcAI Logo"
                    width={240}
                    height={240}
                    className="w-56 h-56 relative z-10 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
              <h2 className="text-xl lg:text-2xl font-light text-gray-300 mb-6 -mt-12">
                Smart Calculator for Students
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                CalcAI is an advanced calculator for students in a familiar TI-84 body. It features discrete AI integration, enhanced functionality, and maintains full calculator compatibility.
              </p>
            </div>

            {/* Calculator Image */}
            <div className={`mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs">
                  <Image
                    src="/ti84.png"
                    alt="CalcAI - TI-84 Plus with AI Integration"
                    width={240}
                    height={360}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <Link href="/product" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-base flex items-center justify-center">
                Buy Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a href="#features" className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-base inline-flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 bg-gray-900" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Features list */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Advanced calculator for students
                </h2>
                <p className="text-lg text-gray-400">
                  CalcAI combines the familiar TI-84 Plus interface with advanced AI capabilities, creating the perfect tool for modern students.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Calculator showcase */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-lg">
                <Image
                  src="/Calcimg.png"
                  alt="Modified TI-84 Plus with AI Integration"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What's Inside Section */}
      <section className="py-20 bg-black" id="whats-inside">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What&apos;s inside
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {components.map((component, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center transition-all duration-300 hover:bg-gray-800 border border-gray-800 hover:border-gray-700"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Image
                      src={component.image}
                      alt={component.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {component.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to upgrade your calculator?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of students who have already enhanced their academic toolkit with CalcAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
            >
              Order Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/community"
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
            >
              Join Community
            </Link>
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
                  <a href="#whats-inside" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Specifications
                  </a>
                </li>
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-sm">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Get Help
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

          {/* Social Media Icons */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://discord.gg/83ZwJcPWJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Image
                  src="/discord-logo.svg"
                  alt="Discord"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.tiktok.com/@calc_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Image
                  src="/tiktok-logo.svg"
                  alt="TikTok"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.instagram.com/calc.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@CalcAI1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="text-center text-sm text-gray-400">
              © 2024 CalcAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
