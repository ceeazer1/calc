"use client"

import { motion } from "framer-motion"
import { Wifi, Settings, RefreshCcw } from "lucide-react"

export default function WifiUpdates() {
  return (
    <section id="wifi-updates" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-3">Wi‑Fi and updates</h2>
              <p className="text-gray-300">
                Connect your TI‑84 Plus through the configuration portal in Settings. Once connected, you can get
                feature updates and new capabilities over Wi‑Fi — quickly and wirelessly.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300"><Wifi className="w-4 h-4" /> Wi‑Fi portal</div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><Settings className="w-4 h-4" /> Easy setup</div>
                <div className="flex items-center gap-2 text-sm text-gray-300"><RefreshCcw className="w-4 h-4" /> OTA updates</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Tip: Keep your device connected to receive feature drops.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

