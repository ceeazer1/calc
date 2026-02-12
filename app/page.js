'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DarkVeil from '../components/DarkVeil'
import SpotlightSection from '../components/SpotlightSection'
import CountdownBanner from '../components/CountdownBanner'
import { ArrowRight, Instagram, Youtube, Maximize2, ChevronDown, Sparkles, Calculator, History, BookOpen, Zap } from 'lucide-react'
import { MediaModal } from '@/components/ui/media-modal';
import DisplayCards from '@/components/ui/display-cards';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
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
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    // Watch for modal open state on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-media-modal-open') {
          setIsModalOpen(document.documentElement.getAttribute('data-media-modal-open') === 'true')
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    // Initial check
    setIsModalOpen(document.documentElement.getAttribute('data-media-modal-open') === 'true')

    return () => {
      observer.disconnect()
    }
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
        <nav className="sticky top-0 w-full bg-[#0f172a]/0 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/20 z-50 border-b border-white/5 transition-opacity duration-300 data-[modal-open=true]:opacity-0 data-[modal-open=true]:pointer-events-none"
          data-modal-open={isModalOpen}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-14">
              {/* Left: Community, Specifications */}
              <div className="hidden md:flex items-center gap-8 justify-start">
                <Link href="https://discord.gg/83ZwJcPWJ6" target="_blank" className="text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer">
                  Community
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

              {/* Right: Socials, Cart, Button */}
              <div className="flex items-center gap-4 justify-end">

                <Link
                  href="/product"
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
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col items-center gap-6 group"
              >
                <h3 className="text-3xl font-semibold tracking-tight text-white">Camera</h3>
                <div className="h-[260px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <MediaModal
                    videoSrc="https://youtu.be/AERiTUVcT9A"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm text-center">
                  Snap a photo of any problem for instant solutions. Advanced OCR recognizes handwriting instantly.
                </p>
              </motion.div>

              {/* Text Feature - Video */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center gap-6 group"
              >
                <h3 className="text-3xl font-semibold tracking-tight text-white">Text</h3>
                <div className="h-[260px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <MediaModal
                    videoSrc="https://www.youtube.com/watch?v=If3FTHgoBYM"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-sm text-center">
                  Chat with AI to understand concepts deeply. Get instant, step-by-step explanations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dashboard Feature Snapshots */}
        <section id="showcase" className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                Dashboard features
              </h2>
            </motion.div>

            {/* Combined Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-6xl w-full border border-white/10 rounded-[3rem] bg-white/[0.01] backdrop-blur-sm overflow-hidden"
            >
              {/* Card Header/Navigation Bar Mockup */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <nav className="flex gap-6">
                    <span className="text-xs font-medium text-white/80">Dashboard</span>
                    <span className="text-xs font-medium text-white/30 hover:text-white/50 cursor-pointer transition-colors">History</span>
                    <span className="text-xs font-medium text-white/30 hover:text-white/50 cursor-pointer transition-colors">Settings</span>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-6 rounded-lg bg-white/5 border border-white/5" />
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 divide-x divide-white/5 h-full">
                {/* Left Side: Prompt History */}
                <div className="md:col-span-7 p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-white mb-2">Recent activity</h3>
                    <p className="text-xs text-white/40 font-light">
                      Syncing with your device...
                    </p>
                  </div>

                  <DisplayCards cards={[
                    {
                      model: "GPT 5 mini",
                      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
                      answer: "x = 7, y = -3",
                      date: "Just now",
                    },
                    {
                      model: "Gemini 3.5",
                      question: "Find the derivative of f(x) = 3x² + 2x - 5",
                      answer: "f'(x) = 6x + 2",
                      date: "2 mins ago",
                    },
                    {
                      model: "Gemini 4.0",
                      question: "What is the molecular formula of glucose?",
                      answer: "C₆H₁₂O₆",
                      date: "5 mins ago",
                    },
                  ]} />
                </div>

                {/* Right Side: Model Controls */}
                <div className="md:col-span-5 flex flex-col h-full">
                  <div className="p-8 border-b border-white/5">
                    <h3 className="text-xl font-medium text-white mb-2">Model controls</h3>
                    <p className="text-xs text-white/40 font-light italic">Powered by Advanced AI Engine</p>
                  </div>

                  <div className="relative z-10 divide-y divide-white/5 border-none h-full overflow-hidden">
                    {/* Feature Tile 1: AI Models */}
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="p-8 group/tile flex flex-col items-center text-center transition-colors px-10 h-1/3 justify-center"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Image src="/chatgpt-logo.svg" width={22} height={22} alt="GPT" className="invert opacity-95 group-hover/tile:opacity-100 transition-opacity" />
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-95 group-hover/tile:opacity-100 transition-opacity">
                          <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="#4285F4" />
                        </svg>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-3">Model Selection</p>

                      <p className="text-sm text-white/50 leading-relaxed max-w-[240px]">
                        Switch between <span className="text-white/90 font-medium">ChatGPT</span> and <span className="text-white/90 font-medium">Gemini</span> instantly.
                      </p>
                    </motion.div>

                    {/* Feature Tile 2: Prompt Presets */}
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="p-8 group/tile relative overflow-hidden flex flex-col items-center text-center transition-colors px-10 h-1/3 justify-center"
                    >
                      <Sparkles className="w-5 h-5 text-purple-400 mb-2 opacity-80 group-hover/tile:opacity-100 transition-opacity" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-3">Custom Presets</p>

                      <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
                        Save custom instructions or use <span className="text-white/90 font-medium">Built-in</span> presets.
                      </p>

                      {/* Animated Mockup */}
                      <div className="absolute bottom-4 right-4 opacity-10 group-hover/tile:opacity-30 transition-opacity pointer-events-none scale-75">
                        <div className="relative">
                          <div className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 flex items-center justify-between gap-3 w-32 backdrop-blur-md">
                            <span className="text-[9px] text-white/60 font-medium truncate italic">Math Solver</span>
                            <ChevronDown className="w-3 h-3 text-white/40" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Feature Tile 3: Depth Control */}
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="p-8 group/tile flex flex-col items-center text-center relative overflow-hidden transition-colors px-10 h-1/3 justify-center"
                    >
                      <Zap className="w-5 h-5 text-white mb-2 opacity-90 group-hover/tile:opacity-100 transition-opacity" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-3">Token Management</p>

                      <p className="text-sm text-white/50 leading-relaxed max-w-[240px]">
                        Adjust <span className="text-white/90 font-medium">Token limits</span> to your desired length.
                      </p>

                      {/* Slider Animation Mockup */}
                      <div className="mt-6 w-full max-w-[140px] opacity-30 group-hover/tile:opacity-60 transition-opacity">
                        <div className="h-1 w-full bg-white/10 rounded-full relative">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
                            animate={{ width: ["20%", "80%", "20%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)] border border-white/20 z-10"
                            animate={{ left: ["20%", "80%", "20%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{ x: "-50%" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>


            {/* Card 3: Notes (Centered below) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-12 relative py-12"
            >
              <div className="relative">
                <div className="text-center mb-12">
                  <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white inline-block">Notes</h3>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center max-w-6xl mx-auto px-4">
                    {/* Note box (left) */}
                    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-5 sm:p-8 shadow-2xl">
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-4">Note Content</div>
                      <textarea
                        readOnly
                        className="relative z-10 w-full min-h-[180px] bg-transparent px-0 py-0 text-sm sm:text-lg text-white/90 placeholder:text-white/30 focus:outline-none resize-none overflow-hidden font-mono leading-relaxed"
                        defaultValue={`Quiz 3 review:\n- Chain rule practice\n- Solve: 2x + 5 = 15\n- derivative of x^2 is 2x\n- ∫2x dx = x^2 + C`}
                      />
                      <div className="relative z-10 mt-6 flex items-center justify-end">
                        <button
                          type="button"
                          className="rounded-full border border-white/10 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 px-7 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                        >
                          Send to Device
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Arrow Flow */}
                    <div className="hidden lg:flex flex-col items-center justify-center text-blue-400/60 animate-pulse">
                      <div className="h-px w-20 bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                      <ArrowRight className="w-10 h-10 -mt-5 bg-black rounded-full p-2 border border-blue-400/20" />
                    </div>

                    {/* Calculator Display Image Only (right) */}
                    <div className="relative group flex items-center justify-center">
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-2 aspect-[3/4] w-[260px] mx-auto flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
                        <div className="relative z-10 w-[90%] h-[45%] bg-blue-500/10 border border-white/10 rounded-lg mb-4 flex flex-col p-4 overflow-hidden">
                          <div className="text-[8px] uppercase tracking-wider text-white/30 mb-2">Preview</div>
                          <div className="text-[7px] text-white/70 font-mono leading-tight whitespace-pre-wrap">
                            Quiz 3 review:
                            - Chain rule practice
                            - Solve: 2x + 5 = 15
                          </div>
                        </div>
                        <div className="text-white/20 text-sm font-medium uppercase tracking-[0.3em] text-center">
                          Calculator
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 text-center max-w-2xl mx-auto px-4">
                    <div className="text-base sm:text-lg text-white/50 font-light leading-relaxed">
                      Write formulas once on your dashboard and access them instantly on your CalcAI device.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FeaturesSectionWithHoverEffects />

        {/* CTA Section */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-3xl font-light tracking-tight mb-4 text-white">Ready to upgrade your calculator?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/product" className="btn-primary inline-flex items-center justify-center rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white px-8 py-3 transition-all tracking-tight shadow-none hover:shadow-none">
                Order Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/community" className="btn-secondary rounded-2xl border border-white/5 hover:bg-white/5 text-slate-300 px-8 py-3 transition-all tracking-tight">Join Community</Link>
            </div>
          </motion.div>
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
              <div className="text-center text-sm text-gray-400">© 2025 CalcAI. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div >
    </div >
  )
}
