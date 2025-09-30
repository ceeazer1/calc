"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 1, y: 16, scale: 1.06 }}
            animate={{ opacity: 1, y: [-4, -14], scale: [1.06, 1] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="mx-auto w-36 sm:w-44 md:w-48 relative z-10"
          >
            <Image src="/logo.png" alt="CalcAI" width={240} height={72} className="w-full h-auto" priority />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-lg text-gray-300"
          >
            Smart calculator. Minimal, fast, to the point.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/product" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
              Buy
            </Link>
            <a href="#hardware" className="text-white/80 hover:text-white font-semibold py-3 px-6">
              Learn more
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 mx-auto max-w-[200px] sm:max-w-[260px] md:max-w-[320px]"
        >
          <Image src="/ti84.png" alt="CalcAI TI-84" width={1200} height={1600} className="w-full h-auto object-contain" priority />
        </motion.div>
      </div>
    </section>
  )
}

