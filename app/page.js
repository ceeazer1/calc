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
import { DashboardFeatures } from '@/components/ui/DashboardFeatures';
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
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      const base = "The most advanced ";
      const mistake = "cheating";
      const correction = "AI calculator.";

      const type = async (str, speed = 50) => {
        for (let i = 0; i <= str.length; i++) {
          if (!isMounted) return;
          setDisplayText(str.slice(0, i));
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

      // 1. "The most advanced "
      await type(base, 40);

      // 2. "...cheating"
      await typeAppend(base, mistake, 60);

      // 3. Pause
      await new Promise(r => setTimeout(r, 600));

      // 4. Delete "cheating"
      const fullMistake = base + mistake;
      for (let i = fullMistake.length; i >= base.length; i--) {
        if (!isMounted) return;
        setDisplayText(fullMistake.slice(0, i));
        await new Promise(r => setTimeout(r, 40));
      }

      await new Promise(r => setTimeout(r, 200));

      // 5. "...AI calculator."
      await typeAppend(base, correction, 50);
      setIsFinished(true);
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  const renderHighlightedText = (text) => {
    if (!text.includes("AI")) return text;
    const parts = text.split("AI");
    return (
      <>
        {parts[0]}
        <span className="text-blue-400 font-medium drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">AI</span>
        {parts[1]}
      </>
    );
  };

  return (
    <span className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight min-h-[4rem] block py-4 text-center leading-tight">
      {renderHighlightedText(displayText)}
      {!isFinished && (
        <span className="animate-pulse border-r-2 border-blue-400 ml-1 inline-block h-[0.8em] align-middle translate-y-[-2px]"></span>
      )}
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
      {/* Full-Width Radial Glow Background */}
      <div
        className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.2) 0%, rgba(0, 0, 0, 0) 80%)',
        }}
      />

      {/* Hero Content Wrapper */}
      <section className="relative w-full pt-20 pb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-8 mb-16 max-w-4xl"
        >
          <div className="w-full">
            <TypewriterText />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/product" className="rounded-full border border-white/10 px-8 py-3 text-sm font-light tracking-tight transition-all duration-300 bg-blue-600/10 text-blue-50 backdrop-blur-sm hover:bg-blue-600/20">
              Buy Now
            </Link>
            <Link href="#showcase" className="rounded-full border border-white/5 px-8 py-3 text-sm font-light tracking-tight transition-all duration-300 text-slate-300 hover:bg-white/5">
              View showcase
            </Link>
          </div>
        </motion.div>

        {/* Centered Calculator Image - Keyboard Masked */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 w-full max-w-[450px] sm:max-w-[600px] lg:max-w-[750px] aspect-[4/5]"
        >
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="w-full h-full relative"
          >
            <Image
              src="/calcai-new.png"
              alt="CalcAI Calculator"
              fill
              className="object-contain drop-shadow-[0_0_120px_rgba(37,99,235,0.1)]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)',
                maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)',
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section className="mt-8 md:mt-12 py-4 mb-24 md:mb-32 bg-transparent z-20 relative">
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
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative order-1 md:order-2 bg-zinc-900"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/AERiTUVcT9A"
                title="Camera Feature"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>

          {/* 2. Typing Feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* VISUAL - Left on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative bg-zinc-900"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/If3FTHgoBYM?start=65"
                title="Typing Feature"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>

            {/* Text - Right on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start gap-6 text-left md:pl-10"
            >
              <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white">Typing</h3>
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

            <DashboardFeatures />
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
  )
}
