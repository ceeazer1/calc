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
      icon: <Brain className="w-6 h-6" />,
      title: "AI Assistant",
      description: "ChatGPT built into the hardware. Get instant help with any math problem."
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
                Buy Now - $84.99
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-black text-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  CalcAI
                </h1>
                <h2 className="text-2xl lg:text-3xl font-light text-gray-300">
                  Multi-tool Device for Students
                </h2>
              </div>

              {/* Description */}
              <div className="max-w-lg">
                <p className="text-lg text-gray-400 leading-relaxed">
                  CalcAI is a portable multi-tool for students in a familiar TI-84 body. It features discrete AI integration, advanced functionality, and maintains full calculator compatibility.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/product" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-base flex items-center justify-center w-fit">
                  Buy Now - $84.99
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a href="#features" className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-base w-fit inline-flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </div>

            {/* Calculator Image */}
            <div className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="relative mx-auto w-full max-w-xs">
                <div className="relative w-full">
                  <Image
                    src="/84p.png"
                    alt="CalcAI - TI-84 Plus with AI Integration"
                    width={240}
                    height={360}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
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
                  Portable multi-tool for students
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
              <div className="relative mx-auto w-full max-w-md">
                <Image
                  src="/Calcimg.png"
                  alt="Modified TI-84 Plus with AI Integration"
                  width={320}
                  height={400}
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

      {/* Showcase */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            See It In Action
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="bg-gray-800 p-6 text-center rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Product Demo Video</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-gray-500">[VIDEO]</div>
                  <div className="text-base font-medium text-gray-300">Coming Soon</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Watch CalcAI in action
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div className="bg-gray-800 p-6 text-center rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Product Gallery</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-gray-500">[PHOTOS]</div>
                  <div className="text-base font-medium text-gray-300">Coming Soon</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Detailed product photos
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              High-quality videos and photos showcasing CalcAI features will be available soon.
            </p>
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
              Order Now - $84.99
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
