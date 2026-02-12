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

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      const base = "The most advanced ";
      const mistake = "cheating";
      const correction = "AI calculator."; // Added period for impact

      const type = async (str, speed = 50) => {
        for (let i = 0; i <= str.length; i++) {
          if (!isMounted) return;
          setDisplayText(prev => str.slice(0, i));
          await new Promise(r => setTimeout(r, speed));
        }
      };

      const typeAppend = async (existing, str, speed = 50) => {
        for (let i = 0; i <= str.length; i++) {
          if (!isMounted) return;
          setDisplayText(existing + str.slice(0, i));
          await new Promise(r => setTimeout(r, speed + Math.random() * 30));
        }
      };

      const backspace = async (fromText, count, speed = 30) => {
        for (let i = 0; i < count; i++) {
          if (!isMounted) return;
          setDisplayText(fromText.slice(0, -(i + 1))); // Correct slicing
          await new Promise(r => setTimeout(r, speed));
        }
      };

      // 1. "The most advanced "
      await type(base, 40);

      // 2. "...cheating"
      await typeAppend(base, mistake, 60);

      // 3. Pause for realization
      await new Promise(r => setTimeout(r, 600));

      // 4. Delete "cheating"
      // we need to delete mistake.length characters
      // logic above for backspace is slightly off if I don't track full string correctly

      // Simpler logic:
      const fullMistake = base + mistake;
      for (let i = fullMistake.length; i >= base.length; i--) {
        if (!isMounted) return;
        setDisplayText(fullMistake.slice(0, i));
        await new Promise(r => setTimeout(r, 40));
      }

      // 5. Short Pause
      await new Promise(r => setTimeout(r, 200));

      // 6. "...AI calculator."
      await typeAppend(base, correction, 50);
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <span className="text-xl sm:text-2xl md:text-3xl font-light text-slate-200 tracking-tight min-h-[3rem] block py-2 text-center lg:text-left">
      {displayText}
      <span className="animate-pulse border-r-2 border-blue-400 ml-1 inline-block h-[1em] align-middle translate-y-[-2px]"></span>
    </span>
  );
};


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

            <div className="max-w-xl w-full text-center lg:text-left">
              <TypewriterText />
            </div>

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

        {/* Features Showcase */}
        <section className="mt-12 md:mt-24 py-4 mb-24 md:mb-32 bg-transparent z-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

            {/* 1. Camera Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text - Left on Desktop */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start gap-6 text-left order-2 md:order-1"
              >
                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white">Camera</h3>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-sm">
                  Snap a photo of any problem for instant solutions. Advanced OCR recognizes handwriting instantly.
                </p>
              </motion.div>

              {/* VISUAL - Right on Desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative order-1 md:order-2"
              >
                <img
                  src={`/cam-preview.gif?t=${Date.now()}`}
                  alt="Camera preview"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>

            {/* 2. Chat Feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* VISUAL - Left on Desktop */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
              >
                <img
                  src={`/typing-preview.gif?t=${Date.now()}`}
                  alt="Typing preview"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Text - Right on Desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start gap-6 text-left md:pl-10"
              >
                <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white">Chat</h3>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-md">
                  Type naturally to ask questions or get help with complex topics. The AI understands context and nuances.
                </p>
              </motion.div>
            </div>

            {/* 3. Dashboard Features */}
            <div className="pt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                  Manage and customize your calculator
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Activity Card - No Box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full p-4 sm:p-6 flex flex-col h-full min-h-[400px]"
                >
                  <div className="mb-6 px-2">
                    <h3 className="text-xl font-medium text-white mb-2">Prompt History</h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      View your complete query history and captured images, synced instantly.
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
                </motion.div>

                {/* Model Controls Card - No Box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative w-full p-4 sm:p-6 flex flex-col h-full min-h-[400px]"
                >
                  <div className="px-2 mb-6">
                    <h3 className="text-xl font-medium text-white mb-1">Model controls</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {/* Feature Tile 1: AI Models - Larger */}
                    <div
                      className="col-span-2 p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center justify-center group/tile"
                    >
                      <div className="flex items-center gap-6 mb-4">
                        <Image src="/chatgpt-logo.svg" width={40} height={40} alt="GPT" className="invert opacity-95 group-hover/tile:opacity-100 transition-opacity" />
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-95 group-hover/tile:opacity-100 transition-opacity">
                          <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="#4285F4" />
                        </svg>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">Model Selection</p>

                      <p className="text-sm text-white/50 leading-relaxed max-w-[250px]">
                        Switch between <span className="text-white/90 font-medium">ChatGPT</span> and <span className="text-white/90 font-medium">Gemini</span>.
                      </p>
                    </div>

                    {/* Feature Tile 2: Prompt Presets */}
                    <div
                      className="col-span-1 p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center justify-center group/tile"
                    >
                      <Sparkles className="w-5 h-5 text-purple-400 mb-3 opacity-80 group-hover/tile:opacity-100 transition-opacity" />
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">Presets</p>

                      <p className="text-xs text-white/50 leading-relaxed">
                        Instantly access your saved system instructions and favorite prompts for any subject.
                      </p>
                    </div>

                    {/* Feature Tile 3: Token Management + Slider Animation */}
                    <div
                      className="col-span-1 p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center justify-center group/tile relative overflow-hidden"
                    >
                      <Zap className="w-5 h-5 text-white mb-3 opacity-90 group-hover/tile:opacity-100 transition-opacity" />
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">Tokens</p>

                      <div className="w-16 h-1 bg-white/10 rounded-full mt-2 mb-4 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "0%" }}
                          transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                          className="h-full w-[70%] bg-blue-500 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Control response length and detail. Optimize for quick answers or deep explanations.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
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
