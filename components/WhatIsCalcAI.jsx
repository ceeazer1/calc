"use client"

import { motion } from "framer-motion"

export default function WhatIsCalcAI() {


  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
            What is CalcAI?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CalcAI is a TI‑84 Plus quietly upgraded to connect to the internet and modern AI services. It feels familiar,
            just way more helpful. Ask questions, snap a photo of a problem, and get clear answers right on the screen — no extra apps,
            no distractions.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

