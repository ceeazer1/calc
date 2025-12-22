"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Manrope } from "next/font/google"

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'] })

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 text-white overflow-hidden min-h-[110vh]" style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 72%, rgba(255,255,255,0.35) 88%, rgba(255,255,255,0) 98%)', maskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 72%, rgba(255,255,255,0.35) 88%, rgba(255,255,255,0) 98%)' }}>
      {/* Dark blue gradient background */}


      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Headline and actions (centered) */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${manrope.className} text-5xl sm:text-6xl font-normal max-w-4xl`}
          >
            Calculator, but with AI
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <Link href="/product" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm sm:text-base px-5 py-2.5">
              Buy
            </Link>
            <a href="#hardware" className="text-white/80 hover:text-white font-semibold py-3 px-6">
              Learn more
            </a>
          </motion.div>

          {/* Centered calculator image, positioned lower-middle */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full flex justify-center"
          >
            <div className="mx-auto max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[500px] mt-16 sm:mt-20 md:mt-24 lg:mt-28"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 52%, rgba(255,255,255,0) 92%, rgba(255,255,255,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 52%, rgba(255,255,255,0) 92%, rgba(255,255,255,0) 100%)'
              }}>
              <Image src="/calcai-new.png" alt="CalcAI TI-84" width={1200} height={1600} className="w-full h-auto object-contain" priority />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
