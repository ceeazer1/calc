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
  MessageCircle
} from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Assistant",
      description: "ChatGPT built into the hardware. Get instant help with any math problem."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Completely Hidden",
      description: "Looks exactly like a regular TI-84. Teachers, proctors, nobody will know."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Survives Resets",
      description: "RAM clear, factory reset, doesn't matter. The mod stays installed."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "No Internet Needed",
      description: "Works offline during tests. All the AI power without any connectivity."
    }
  ]

  const benefits = [
    "Solve complex problems with AI assistance",
    "Get step-by-step explanations",
    "Works in any testing environment",
    "Completely undetectable",
    "No internet required during use",
    "Full TI-84 Plus functionality preserved"
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={120}
                height={120}
                className="w-32 h-32 transform hover:scale-110 transition-transform duration-200 drop-shadow-xl"
              />
            </div>
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#support"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Support
                </a>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  FAQ
                </Link>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Specifications
                </a>
              </div>

              {/* Buy Now Button */}
              <Link href="/product" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-sm sm:text-base">
                Buy Now - $84.99
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900/30 to-black/60"></div>
        <div className="absolute inset-0 tech-grid opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-8">
                {/* Logo and Title */}
                <div className="flex flex-col items-start space-y-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/logo.png"
                      alt="CalcAI Logo"
                      width={80}
                      height={80}
                      className="w-20 h-20 drop-shadow-2xl"
                    />
                    <div>
                      <h1 className="text-6xl lg:text-7xl font-black tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">
                          TI-84 Plus
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="max-w-2xl">
                  <p className="text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed tracking-wide">
                    Normal calculator with <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI assistance</span>
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/product" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 text-base flex items-center justify-center border border-blue-400 w-fit">
                  Buy Now - $84.99
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a href="#features" className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-base w-fit inline-flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </div>

            {/* Calculator Image */}
            <div className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="relative mx-auto w-full max-w-xs">
                <div className="relative w-full transform rotate-3 hover:rotate-0 transition-transform duration-500 drop-shadow-2xl">
                  <Image
                    src="/NEWTI84.png"
                    alt="TI-84 Plus Calculator with ChatGPT Integration"
                    width={280}
                    height={420}
                    className="w-full h-auto object-contain"
                    priority
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 text-black px-4 py-2 rounded-full text-sm font-black shadow-2xl animate-pulse border-2 border-green-300 backdrop-blur-sm">
                    AI MODDED
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Makes This Different
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              It&apos;s not just a calculator with AI slapped on. This is a carefully modded TI-84 Plus
              that looks and feels exactly like the original.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl text-center transition-all duration-500 hover:shadow-2xl hover:scale-110 border border-slate-600 hover:border-blue-500 ${
                  currentFeature === index ? 'ring-2 ring-blue-500 scale-110 shadow-2xl shadow-blue-500/20' : 'shadow-xl'
                }`}
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Showcase */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            See It In Action
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="card p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Product Demo Video</h3>
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                <div className="text-center">
                  <div className="text-4xl mb-4 text-gray-500">[VIDEO]</div>
                  <div className="text-lg font-medium text-gray-300">Coming Soon</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Watch CalcAI in action
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div className="card p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Product Gallery</h3>
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                <div className="text-center">
                  <div className="text-4xl mb-4 text-gray-500">[PHOTOS]</div>
                  <div className="text-lg font-medium text-gray-300">Coming Soon</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Detailed product photos
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              High-quality videos and photos showcasing CalcAI features will be available soon.
            </p>
          </div>
        </div>
      </section>

      {/* Support/Contact Section */}
      <section className="py-24 bg-slate-800" id="support">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Need Support?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get help with your CalcAI device, ask questions, or connect with our community
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Discord Support */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-slate-600 hover:border-blue-500">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/discord-logo.svg"
                  alt="Discord Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Discord Community
              </h3>
              <p className="text-gray-300 mb-6">
                Join our Discord server for instant support, community discussions, and the latest updates
              </p>
              <a
                href="https://discord.gg/83ZwJcPWJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 inline-flex items-center"
              >
                Join Discord
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">
              Our community is here to help you get the most out of your CalcAI device
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={100}
                  height={100}
                  className="w-24 h-24 drop-shadow-xl"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionary calculator technology for the modern student.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Specifications
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 CalcAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
