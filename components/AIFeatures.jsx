"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Keyboard, Camera, Bot } from "lucide-react"

export default function AIFeatures() {
  return (
    <section id="ai-features" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">AI features built in</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Keyboard className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-lg">Type to ask</div>
                </div>
                <p className="text-base text-gray-300">Type on the TI‑84.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-lg">Snap to solve</div>
                </div>
                <p className="text-base text-gray-300">Take a photo. Get steps.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-lg">ChatGPT</div>
                </div>
                <p className="text-base text-gray-300">Built on ChatGPT.</p>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}

