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
            <h2 className="text-3xl font-bold mb-4">AI features built in</h2>
            <p className="text-gray-300 mb-6">
              Powered by the latest GPT model, <span className="font-semibold">gpt5-io</span>. Type a question and read the answer on the calculator. Prefer not to type?
              Open the back camera, take a quick photo, and let it solve or explain the steps for you.
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


        </div>
      </div>
    </section>
  )
}

