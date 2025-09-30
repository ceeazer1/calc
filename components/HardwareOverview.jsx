"use client"

import Image from "next/image"

export default function HardwareOverview() {


  return (
    <section id="hardware" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">PCB overview</h2>
          <p className="text-sm text-gray-400 mt-1">Labels on the image highlight the main functions.</p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40">
          <Image src="/New_PCB.png" alt="CalcAI PCB overview" width={1600} height={1000} className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}

