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
      title: "ChatGPT Integration",
      description: "Advanced AI assistance built right into your calculator for instant problem solving"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Store Notes",
      description: "Save important formulas and notes directly on your calculator for easy access"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Chat with Other Calculators",
      description: "Connect and communicate with other CalcAI users for collaborative problem solving"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Discrete Method",
      description: "Looks like a normal calculator from outside. Program survives RAM clear and factory reset"
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
            <div className="flex items-center space-x-4">
              <a
                href="https://t.me/+48P4V5dL5ShmYTQx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support</span>
              </a>
              <Link href="/product" className="btn-primary">
                Buy Now - $84.99
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-accent-200">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">Revolutionary Technology</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  TI-84 Plus with
                  <span className="text-accent-300"> ChatGPT</span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  The world\u2019s first calculator with discrete AI integration.
                  Get advanced problem-solving assistance that\u2019s completely undetectable.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/product" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Buy Now - $84.99
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free Shipping</span>
                </div>

                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Lifetime Support</span>
                </div>
              </div>
            </div>

            {/* Calculator Image */}
            <div className={`relative ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/NEWTI84.png"
                    alt="TI-84 Plus Calculator with ChatGPT Integration"
                    width={320}
                    height={480}
                    className="w-full h-auto object-contain"
                    priority
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                    ChatGPT Enhanced
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why CalcAI Changes Everything
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the perfect fusion of traditional calculator functionality
              with cutting-edge AI assistance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card p-6 text-center transition-all duration-500 ${
                  currentFeature === index ? 'ring-2 ring-primary-500 scale-105' : ''
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
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Showcase
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="card p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Product Demo Video</h3>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎥</div>
                  <div className="text-lg font-medium text-gray-300">Coming Soon</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Watch CalcAI in action
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div className="card p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Product Gallery</h3>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                <div className="text-center">
                  <div className="text-4xl mb-4">📸</div>
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

      {/* Final CTA */}
      <section className="py-20 gradient-bg text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Academic Performance?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Experience the future of calculator technology with discrete AI integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/product" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Buy Now - $84.99
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-300">
            ✓ Free worldwide shipping ✓ Lifetime support
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
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
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Features</li>
                <li>Specifications</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@calcai.com</li>
                <li>1-800-CALC-AI</li>
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
