"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Keyboard, Camera, Bot } from "lucide-react"

export default function AIFeatures() {
  return (
    <section id="ai-features" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">AI features built‑in</h2>
            <p className="text-gray-300 mb-6">
              CalcAI includes ChatGPT out of the box. Type a question and get the answer right on the calculator. Don’t feel like typing?
              Use the discreet camera on the back — take a picture of a problem and let ChatGPT analyze and respond seamlessly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Type to ask</div>
                </div>
                <p className="text-sm text-gray-300">Enter prompts and questions directly on the TI‑84 keypad.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Snap to solve</div>
                </div>
                <p className="text-sm text-gray-300">Open the back case to access the camera and capture problems to analyze.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Multiple models</div>
                </div>
                <p className="text-sm text-gray-300">Supports integrations with ChatGPT, DeepSeek, and more via APIs.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="absolute -inset-8 bg-gradient-to-tr from-blue-600/20 via-purple-600/10 to-sky-500/20 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
              <Image src="/Calcimg.png" alt="CalcAI camera and AI" width={480} height={480} className="w-full h-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

