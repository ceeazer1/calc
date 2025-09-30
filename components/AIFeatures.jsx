"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Keyboard } from "lucide-react"

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

            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {/* Type */}
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                  <Keyboard className="w-7 h-7" />
                </div>
                <div className="font-semibold text-lg">Type to ask</div>
                <p className="text-base text-gray-300">Type on the TI‑84.</p>
              </div>

              {/* Camera */}
              <div className="space-y-2">
                <Image src="/cam.png" alt="Camera module" width={96} height={96} className="mx-auto w-16 h-16 object-contain" />
                <div className="font-semibold text-lg">Camera</div>
                <p className="text-base text-gray-300">Autofocus camera. HD quality.</p>
              </div>

              {/* ChatGPT */}
              <div className="space-y-2">
                <Image src="/chatgpt-logo.svg" alt="ChatGPT" width={48} height={48} className="mx-auto w-12 h-12" />
                <div className="font-semibold text-lg">ChatGPT</div>
                <p className="text-base text-gray-300">Uses GPT‑5 Mini.</p>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}

