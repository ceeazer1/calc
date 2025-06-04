'use client'

import Image from 'next/image'

export default function InteractiveCalculator() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Calculator Body - Just the Image */}
      <div className="relative w-full">
        {/* Background Image */}
        <Image
          src="/84p.png"
          alt="TI-84 Plus Calculator with ChatGPT Integration"
          width={320}
          height={480}
          className="w-full h-auto object-contain"
          priority
        />

        {/* AI Enhancement Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
          ChatGPT Enhanced
        </div>
      </div>
    </div>
  )
}
