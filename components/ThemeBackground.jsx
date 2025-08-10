"use client"

import { motion } from "framer-motion"

export default function ThemeBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center center",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(30, 64, 175, 0.35), transparent 40%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25), transparent 35%), radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.25), transparent 35%)",
        }}
      />

      {/* Animated gradient blobs (OrbAI style, but dark) */}
      <motion.div
        className="absolute -top-40 -left-40 h-[45rem] w-[45rem] rounded-full blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.35), transparent 70%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.35), transparent 70%)",
        }}
        animate={{ x: [0, -30, 10, 0], y: [0, -10, 25, 0], scale: [1, 0.96, 1.03, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-10rem] left-1/3 h-[36rem] w-[36rem] rounded-full blur-3xl mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.30), transparent 70%)",
        }}
        animate={{ x: [0, 15, -10, 0], y: [0, -25, 5, 0], scale: [1, 1.02, 0.99, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top gradient glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,58,138,0.6), rgba(0,0,0,0))",
        }}
      />
    </div>
  )
}

