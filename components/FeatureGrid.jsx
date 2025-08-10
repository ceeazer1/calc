"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const features = [
  {
    icon: "/chatgpt-logo.svg",
    title: "ChatGPT Integration",
    desc: "Instant AI assistance for math problems and studying.",
  },
  {
    icon: null,
    lucide: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v20" /><path d="M2 12h20" /></svg>
    ),
    title: "Hidden & Discreet",
    desc: "Looks and behaves like a normal TI-84.",
  },
  {
    icon: null,
    lucide: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    ),
    title: "Survives Resets",
    desc: "Remains installed even after RAM/factory resets.",
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10"
        >
          Why students choose CalcAI
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-6 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-300">
                  {f.icon ? (
                    <Image src={f.icon} alt={f.title} width={20} height={20} className="w-5 h-5" />
                  ) : (
                    <f.lucide className="w-5 h-5" />
                  )}
                </div>
                <h3 className="font-semibold">{f.title}</h3>
              </div>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

