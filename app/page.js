'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DarkVeil from '../components/DarkVeil'
import SpotlightSection from '../components/SpotlightSection'
import CountdownBanner from '../components/CountdownBanner'
import { ShoppingCart, ArrowRight, Instagram, Youtube, Maximize2 } from 'lucide-react'
import { MediaModal } from '@/components/ui/media-modal';
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
    <div className="min-h-screen bg-black relative overflow-hidden tracking-tight">
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

        {/* Media Feature Showcase */}
        <section className="mt-12 md:mt-24 py-4 mb-24 md:mb-32 bg-transparent z-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Camera Feature - Image */}
              <div className="flex flex-col items-center gap-6 group">
                <h3 className="text-3xl font-semibold tracking-tight text-white">Camera</h3>
                <div className="h-[260px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <MediaModal
                    imgSrc="https://images.unsplash.com/photo-1726824766931-4bd8b59af37c?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm text-center">
                  Snap a photo of any math problem for instant solutions. Advanced OCR recognizes handwriting instantly.
                </p>
              </div>

              {/* Text Feature - Video */}
              <div className="flex flex-col items-center gap-6 group">
                <h3 className="text-3xl font-semibold tracking-tight text-white">Text</h3>
                <div className="h-[260px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <MediaModal
                    videoSrc="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                    className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm text-center">
                  Chat with AI to understand concepts deeply. Ask follow-up questions and get step-by-step explanations.
                </p>
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Card 1: Model Controls */}
              <div className="md:col-span-7 group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.55)] min-h-[400px]">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-500/5 to-transparent" />
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-500/18 blur-3xl" />

                <div className="absolute inset-0 z-10 p-8">
                  {/* Title on top-left */}
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Model controls</h3>

                  {/* Description on the side (right) */}
                  <div className="absolute top-1/2 right-8 -translate-y-1/2 max-w-[180px] text-right z-10">
                    <div className="flex flex-col gap-3">
                      <div className="text-lg font-medium leading-tight text-white/90">
                        Pick your GPT model and max tokens.
                      </div>
                      <div className="text-sm text-white/60 leading-snug">
                        Adjust speed, accuracy, and answer length anytime.
                      </div>
                    </div>
                  </div>

                  {/* Controls faded at the bottom */}
                  <div
                    className="absolute bottom-6 left-6 w-fit rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-4 z-20"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                    }}
                  >
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

                    <div className="relative flex flex-col items-center">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4 min-w-[130px]">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">GPT Model</div>
                          <div className="flex flex-col gap-2">
                            {[
                              { name: "GPT 5.2", desc: "Accuracy", selected: true },
                              { name: "GPT 5.1", desc: "Balanced", selected: false },
                              { name: "GPT 5 mini", desc: "Fast", selected: false, skeleton: true },
                              { name: "GPT 5 nano", desc: "Ultra fast", selected: false, skeleton: true },
                            ].map((m) => (
                              <button
                                key={m.name}
                                type="button"
                                className={
                                  "w-full rounded-xl border px-3 py-2 text-left transition-all duration-300 " +
                                  (m.selected
                                    ? "border-blue-400/40 bg-blue-500/10 text-blue-100 ring-1 ring-blue-400/20"
                                    : m.skeleton
                                      ? "border-white/5 bg-white/[0.02] text-white/40"
                                      : "border-white/5 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/10")
                                }
                              >
                                <div className="text-[11px] font-semibold leading-none">{m.name}</div>
                                <div className={"mt-1 text-[10px] leading-none " + (m.selected ? "text-blue-100/70" : "text-white/40")}>
                                  {m.desc}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Max Tokens</div>
                          <div className="flex flex-col gap-2">
                            {[
                              { name: "1k", desc: "Quick", selected: false },
                              { name: "2k", desc: "Balanced", selected: true },
                              { name: "4k", desc: "Long", selected: false },
                              { name: "8k", desc: "Full steps", selected: false },
                            ].map((t) => (
                              <button
                                key={t.name}
                                type="button"
                                className={
                                  "w-full rounded-xl border px-3 py-2 text-left transition-all duration-300 " +
                                  (t.selected
                                    ? "border-blue-400/40 bg-blue-500/10 text-blue-100 ring-1 ring-blue-400/20"
                                    : "border-white/5 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/10")
                                }
                              >
                                <div className="text-[11px] font-semibold leading-none">{t.name}</div>
                                <div className={"mt-1 text-[10px] leading-none " + (t.selected ? "text-blue-100/70" : "text-white/40")}>
                                  {t.desc}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Prompt History */}
              <div className="md:col-span-5 md:row-span-2 group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/18 via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/18 blur-3xl" />

                <div className="relative p-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Prompt history</h3>
                  <p className="mt-1.5 text-sm text-white/70 font-light tracking-tight">
                    Recent questions & answers at a glance.
                  </p>

                  <div className="relative mt-8 h-[550px] px-2">
                    {[0, 1].map((idx) => {
                      const items = [
                        {
                          type: 'image',
                          p: "Find the value of x",
                          image: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&q=80&w=200&h=100",
                          a: "Using the Pythagorean theorem:\nx² + 12² = 13²\nx² + 144 = 169\nx² = 25\nx = 5",
                          loading: true
                        },
                        {
                          type: 'text',
                          p: "Integrate: ∫(2x + 1) dx",
                          a: "x² + x + C"
                        },
                      ];
                      const row = items[idx];

                      return (
                        <div
                          key={idx}
                          className="absolute inset-x-0 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 shadow-xl transition-all duration-500"
                          style={{
                            top: `${idx * 160}px`,
                            zIndex: 20 + idx,
                            transform: 'scale(1)',
                            opacity: 1
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-[9px] text-blue-400/60 font-bold uppercase tracking-widest">Entry #{2 - idx}</div>
                            <div className="text-[9px] text-white/20 font-mono">14:2{idx} PM</div>
                          </div>

                          {/* Render Image or Text Prompt */}
                          <div className="flex gap-3 mb-3">
                            {row.type === 'image' && (
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                <img src={row.image} alt="Problem" className="object-cover w-full h-full opacity-80" />
                              </div>
                            )}
                            <div className="text-sm text-white/90 font-medium self-center">{row.p}</div>
                          </div>

                          <div className="h-px w-full bg-white/5 mb-3" />
                          <div className="text-[9px] text-white/40 mb-1 font-bold uppercase tracking-widest">Answer</div>
                          {row.loading ? (
                            <div className="mt-0.5">
                              {/* Show first line of text */}
                              <div className="text-sm text-blue-300 font-mono tracking-tight mb-2">
                                {row.a.split('\n')[0]}
                              </div>
                              {/* Skeleton for the rest */}
                              <div className="space-y-2">
                                <div className="h-3 w-3/4 rounded bg-white/10 animate-pulse" />
                                <div className="h-3 w-2/3 rounded bg-white/10 animate-pulse" />
                                <div className="h-3 w-1/2 rounded bg-white/10 animate-pulse" />
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-blue-300 font-mono tracking-tight whitespace-pre-wrap">{row.a}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card 3: Notes → Calculator */}
              <div className="md:col-span-7 group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/14 via-transparent to-transparent" />
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-500/14 blur-3xl" />

                <div className="relative p-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Notes</h3>

                  <div className="mt-5 flex flex-col items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                      {/* Note box (left) */}
                      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-4">
                        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
                        <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">Note Content</div>
                        <textarea
                          readOnly
                          className="relative z-10 w-full min-h-[140px] bg-transparent px-0 py-0 text-sm text-white/90 placeholder:text-white/30 focus:outline-none resize-none overflow-hidden font-mono"
                          defaultValue={`Quiz 3 review:\n- Chain rule practice\n- Solve: 2x + 5 = 15\n- derivative of x^2 is 2x\n- ∫2x dx = x^2 + C`}
                        />
                        <div className="relative z-10 mt-4 flex items-center justify-end">
                          <button
                            type="button"
                            className="rounded-full border border-white/10 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                          >
                            Send to Device
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Arrow Flow */}
                      <div className="hidden lg:flex flex-col items-center justify-center text-blue-400 animate-pulse">
                        <div className="h-px w-12 bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                        <ArrowRight className="w-6 h-6 -mt-3 bg-black rounded-full p-1" />
                      </div>

                      {/* Calculator Display Image Only (right) */}
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-1 aspect-[3/4] w-[180px] mx-auto flex flex-col items-center justify-center">
                          {/* Placeholder for Calculator Image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
                          <div className="relative z-10 w-[90%] h-[40%] bg-blue-500/10 border border-white/10 rounded mb-2 flex flex-col p-2 overflow-hidden">
                            <div className="text-[6px] uppercase tracking-wider text-white/30 mb-1">Preview</div>
                            <div className="text-[5px] text-white/70 font-mono leading-tight whitespace-pre-wrap">
                              Quiz 3 review:
                              - Chain rule practice
                              - Solve: 2x + 5 = 15
                            </div>
                          </div>
                          <div className="text-white/20 text-[10px] font-medium uppercase tracking-widest text-center">
                            Calculator
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center max-w-xl">
                      <div className="text-xl sm:text-2xl font-semibold tracking-tight text-white/90 italic">
                        "Your notes, synced instantly."
                      </div>
                      <div className="mt-2 text-sm sm:text-base text-white/70">
                        Write formulas once on your dashboard and access them instantly on your CalcAI device.
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
