'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DarkVeil from '../components/DarkVeil'
import SpotlightSection from '../components/SpotlightSection'
import CountdownBanner from '../components/CountdownBanner'
import { ShoppingCart, ArrowRight, Instagram, Youtube, Maximize2 } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '../components/Dialog'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* DarkVeil background (site-wide on the homepage) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0vh, rgba(255,255,255,1) 55vh, rgba(255,255,255,0.55) 80vh, rgba(255,255,255,0.2) 100vh, rgba(255,255,255,0) 120vh)',
          maskImage:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0vh, rgba(255,255,255,1) 55vh, rgba(255,255,255,0.55) 80vh, rgba(255,255,255,0.2) 100vh, rgba(255,255,255,0) 120vh)',
        }}
      >
        {/* Veil texture */}
        <div className="absolute inset-0 opacity-[0.9]">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.02}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0.3}
            resolutionScale={1}
            tint="#1e40af"
            tintStrength={0.95}
            tintBoost={1.9}
            tintGamma={0.72}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 w-full bg-[#0f172a]/0 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/20 z-50 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-14">
              {/* Left: Community, Specifications */}
              <div className="hidden md:flex items-center gap-8 justify-start">
                <Link href="https://discord.gg" target="_blank" className="text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer">
                  Community
                </Link>
                <Link href="/specs" className="text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer">
                  Specifications
                </Link>
              </div>

              {/* Mobile Menu Icon (Left) */}
              <div className="md:hidden flex justify-start">
                <button className="text-gray-300 hover:text-white">
                  <span className="sr-only">Open menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Center: Logo */}
              <div className="flex justify-center">
                <Link href="/" className="text-xl font-bold tracking-tight text-white">
                  CalcAI
                </Link>
              </div>

              {/* Right: Socials, Cart, Button */}
              <div className="flex items-center gap-4 justify-end">
                <Link href="/cart" className="relative text-gray-300 hover:text-white transition">
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/products/calcai"
                  className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition hidden sm:block"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Manual Hero Section */}
        <section className="relative w-full pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 z-10 w-full"
          >


            <h1 className="text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              CalcAI
            </h1>

            <p className="max-w-xl text-base font-light leading-relaxed tracking-tight text-slate-300/80 sm:text-lg">
              The world&apos;s most advanced AI calculator. Experience the future of mathematics with generative surfaces and neural precision.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/product" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 duration-300 bg-blue-600/10 text-blue-50 backdrop-blur-sm hover:bg-blue-600/20 shadow-none hover:shadow-none">
                Buy Now
              </Link>
              <Link href="#showcase" className="rounded-2xl border border-white/5 px-5 py-3 text-sm font-light tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-white/10 duration-300 text-slate-300 hover:bg-white/5">
                View showcase
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Calculator Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full flex justify-center lg:justify-end relative z-10"
          >
            {/* Added Perspective to container */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="relative w-[320px] sm:w-[550px] lg:w-[750px] h-[450px] sm:h-[700px] lg:h-[850px] perspective-[1000px]"
            >
              {/* Image with 3D Tilt and Aggressive Fade to hide Keys */}
              <Image
                src="/calcai-new.png"
                alt="CalcAI Calculator"
                fill
                className="object-contain drop-shadow-2xl z-10 [transform:rotateY(-12deg)_rotateX(6deg)]"
                style={{
                  // Bottom-heavy fade (solid through the top, then fade out toward the bottom)
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0) 100%)',
                  maskImage:
                    'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0) 100%)',
                }}
                priority
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Preview Tiles */}
        <section className="-mt-32 py-4 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Camera Feature',
                  id: 'camera',
                  desc: 'Snap a photo of any math problem for instant solutions.',
                  detail: 'Our advanced OCR technology recognizes handwriting and printed text instantly.'
                },
                {
                  title: 'Text Feature',
                  id: 'text',
                  desc: 'Chat with AI to understand concepts deeply.',
                  detail: 'Ask follow-up questions and get step-by-step explanations like a real tutor.'
                },
                {
                  title: 'Note Feature',
                  id: 'note',
                  desc: 'Keep your study notes organized and accessible.',
                  detail: 'Save your calculations and chats to review later. creating a personal knowledge base.'
                }
              ].map((feature) => (
                <Dialog key={feature.id} transition={{ type: 'spring', bounce: 0.3 }}>
                  <DialogTrigger>
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/20 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-slate-900/40 transition-all duration-500 cursor-pointer h-full min-h-[200px]">
                      <div className="w-full flex justify-between items-start mb-4">
                        <Maximize2 className="w-5 h-5 text-blue-200/40" />
                      </div>
                      <div className="mt-auto w-full">
                        <h3 className="text-xl font-light tracking-tight mb-2 text-slate-200">{feature.title}</h3>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContainer>
                    <DialogContent className="relative flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">
                      <DialogClose />
                      <DialogTitle className="text-3xl font-light tracking-tight text-white mb-4">
                        {feature.title}
                      </DialogTitle>
                      {/* Blank image as requested */}
                      <div className="w-full h-[400px] bg-zinc-800 rounded-xl mb-8 flex items-center justify-center text-zinc-500">
                        Image Placeholder
                      </div>
                      <DialogDescription className="text-zinc-400 text-center text-lg font-light tracking-tight max-w-2xl mb-6">
                        {feature.detail}
                      </DialogDescription>
                    </DialogContent>
                  </DialogContainer>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Feature Snapshots */}
        <section id="showcase" className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                Dashboard features
              </h2>
              <p className="mt-3 text-slate-400 font-light tracking-tight max-w-2xl mx-auto">
                Manage your calculator how you want to
              </p>
            </div>

            {/* Dashboard feature tiles (screenshot-inspired marketing cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Model Controls */}
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-indigo-600/90 shadow-[0_30px_90px_rgba(0,0,0,0.45)] flex flex-col">
                <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />

                <div className="relative p-8 pb-6">
                  <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Model controls</h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80 font-light tracking-tight">
                    Choose the GPT model and max tokens for your calculator.
                  </p>
                </div>

                <div className="relative px-8 pb-8 flex-1">
                  <div className="h-full rounded-3xl border border-white/15 bg-black/25 backdrop-blur p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-white/60 mb-2">GPT Model</div>
                        <div className="space-y-2">
                          {[
                            { name: "GPT 5.2", desc: "Best accuracy" },
                            { name: "GPT 5.1", desc: "Balanced" },
                            { name: "GPT 5 mini", desc: "Fastest" },
                          ].map((m, i) => (
                            <div
                              key={m.name}
                              className={
                                "flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 " +
                                (i === 0
                                  ? "border-white/25 bg-white/10 text-white"
                                  : "border-white/15 bg-white/5 text-white/90")
                              }
                            >
                              <div className="text-sm font-medium">{m.name}</div>
                              <div className={"text-xs text-right " + (i === 0 ? "text-white/75" : "text-white/60")}>
                                {m.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-white/60 mb-2">Max Tokens</div>
                        <div className="space-y-2">
                          {[
                            { name: "1k", desc: "Quick" },
                            { name: "2k", desc: "Balanced" },
                            { name: "4k", desc: "Long answers" },
                            { name: "8k", desc: "Full steps" },
                          ].map((t, i) => (
                            <div
                              key={t.name}
                              className={
                                "flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 " +
                                (i === 1
                                  ? "border-white/25 bg-white/10 text-white"
                                  : "border-white/15 bg-white/5 text-white/90")
                              }
                            >
                              <div className="text-sm font-medium">{t.name}</div>
                              <div className={"text-xs text-right " + (i === 1 ? "text-white/75" : "text-white/60")}>
                                {t.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Prompt History */}
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#F3F6FF] shadow-[0_30px_90px_rgba(0,0,0,0.35)] flex flex-col">
                <div className="p-8 pb-6">
                  <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Prompt history</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 font-light tracking-tight">
                    Review recent questions and answers at a glance.
                  </p>
                </div>

                <div className="px-8 pb-8 flex-1">
                  <div className="h-full rounded-3xl border border-black/10 bg-white p-5">
                    <div className="space-y-3">
                      {[
                        { p: "Differentiate: x² + 3x − 5", a: "2x + 3" },
                        { p: "Solve: 2x + 5 = 15", a: "x = 5" },
                        { p: "Factor: x² − 9", a: "(x − 3)(x + 3)" },
                      ].map((row) => (
                        <div key={row.p} className="rounded-2xl border border-black/10 bg-[#F6F8FF] p-4">
                          <div className="text-[11px] text-slate-500 mb-1">Prompt</div>
                          <div className="text-sm text-slate-900 font-medium">{row.p}</div>
                          <div className="mt-2 text-[11px] text-slate-500 mb-1">Answer</div>
                          <div className="text-sm text-slate-700">{row.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Notes → Calculator */}
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#F3F6FF] shadow-[0_30px_90px_rgba(0,0,0,0.35)] flex flex-col">
                <div className="p-8 pb-6">
                  <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Notes → calculator</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 font-light tracking-tight">
                    Send study notes straight to CalcAI so they&apos;re always on hand.
                  </p>
                </div>

                <div className="px-8 pb-8 flex-1">
                  <div className="h-full rounded-3xl border border-black/10 bg-white p-5 flex flex-col">
                    <textarea
                      readOnly
                      className="w-full flex-1 min-h-[180px] rounded-2xl border border-black/10 bg-[#F6F8FF] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
                      defaultValue={`Quiz 3 review:\n- Chain rule practice (sec 2.4)\n- Solve: 2x + 5 = 15\n- Remember: derivative of x^2 is 2x`}
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Target: <span className="text-slate-700">CalcAI</span>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-black/10 bg-slate-900 text-white px-4 py-1.5 text-xs font-medium hover:bg-slate-800 transition-colors"
                      >
                        Send note
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Pair & Devices */}
              <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#F3F6FF] shadow-[0_30px_90px_rgba(0,0,0,0.35)] flex flex-col">
                <div className="p-8 pb-6">
                  <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Pair & devices</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 font-light tracking-tight">
                    Connect your calculator and manage it from the dashboard.
                  </p>
                </div>

                <div className="px-8 pb-8 flex-1">
                  <div className="h-full rounded-3xl border border-black/10 bg-white p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-black/10 bg-[#F6F8FF] p-4">
                        <div className="text-[11px] text-slate-500 mb-1">Pairing code</div>
                        <div className="font-mono text-2xl tracking-widest text-slate-900">482‑193</div>
                        <div className="mt-2 text-xs text-slate-600">Enter this on your CalcAI to connect.</div>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-[#F6F8FF] p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] text-slate-500">Device</div>
                          <span className="text-[11px] px-2 py-0.5 rounded-full border border-black/10 bg-white text-slate-700">
                            Connected
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-slate-900">CalcAI • Desk unit</div>
                        <div className="mt-2 text-xs text-slate-600">Last sync: 12s ago</div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <div className="text-xs text-slate-600">Online</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-slate-500">Secure pairing • One device at a time</div>
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-700">
                        Manage <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spotlight Features */}
        <SpotlightSection />




        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-light tracking-tight mb-4 text-white">Ready to upgrade your calculator?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/product" className="btn-primary inline-flex items-center justify-center rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white px-8 py-3 transition-all tracking-tight shadow-none hover:shadow-none">
                Order Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/community" className="btn-secondary rounded-2xl border border-white/5 hover:bg-white/5 text-slate-300 px-8 py-3 transition-all tracking-tight">Join Community</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-3">
                  <Image src="/logo.png" alt="CalcAI Logo" width={200} height={60} className="h-10 w-auto" />
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
    </div>
  )
}
