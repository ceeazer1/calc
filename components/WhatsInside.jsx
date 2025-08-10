"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const componentsData = [
  { image: "/pcb.png", title: "Custom PCB", desc: "Purpose-built board for stability and integration." },
  { image: "/esp32.png", title: "ESP32-C3 Chip", desc: "Built-in WiFi, fast and efficient." },
  { image: "/cam.png", title: "Camera Module", desc: "High-quality image capture." },
]

export default function WhatsInside() {
  return (
    <section id="whats-inside" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          What’s inside
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {componentsData.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 text-center hover:border-white/20"
            >
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-800 flex items-center justify-center mb-4">
                <Image src={c.image} alt={c.title} width={48} height={48} className="w-12 h-12 object-contain" />
              </div>
              <div className="font-semibold">{c.title}</div>
              <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

