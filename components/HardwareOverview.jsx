"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Cpu, Camera, Signal } from "lucide-react"

export default function HardwareOverview() {
  const bullets = [
    {
      icon: Cpu,
      title: "Custom PCB, purpose‑built",
      desc: "A compact, custom PCB integrates the core components for a reliable, ready‑to‑go device designed to avoid glitches and bugs.",
    },
    {
      icon: Signal,
      title: "ESP32‑S3 Sense at the core",
      desc: "The main brain handles camera control, Wi‑Fi connectivity, and communication between the calculator and the PCB.",
    },
    {
      icon: Camera,
      title: "Discrete camera integration",
      desc: "A small camera blends into the back case. Pop it open when needed to capture problems discreetly.",
    },
  ]


  return (
    <section id="hardware" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Hardware platform</h2>
            <p className="text-gray-300 mb-6">
              CalcAI uses a custom PCB built for stability and seamless integration with the TI‑84 Plus. While the full stack is proprietary,
              the core is the ESP32‑S3 Sense, enabling the camera and reliable communication between the calculator and the board.
            </p>
            <div className="grid gap-4">
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-300">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{b.title}</div>
                      <div className="text-sm text-gray-300">{b.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              <div className="text-sm text-gray-300 mb-3">Custom PCB</div>
              <Image src='/pcb.png' alt='CalcAI PCB' width={480} height={480} className="w-full h-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

