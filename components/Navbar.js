'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-media-modal-open') {
                    setIsModalOpen(document.documentElement.getAttribute('data-media-modal-open') === 'true')
                }
            })
        })
        observer.observe(document.documentElement, { attributes: true })
        setIsModalOpen(document.documentElement.getAttribute('data-media-modal-open') === 'true')
        return () => observer.disconnect()
    }, [])

    return (
        <nav className="absolute top-0 w-full z-50 transition-opacity duration-300 data-[modal-open=true]:opacity-0 data-[modal-open=true]:pointer-events-none"
            data-modal-open={isModalOpen}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-start h-24 gap-8 sm:gap-12">
                    {/* Logo on the left */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logo.png"
                            alt="CalcAI Logo"
                            width={160}
                            height={48}
                            className="h-4 sm:h-5 w-auto transform hover:scale-105 transition-transform duration-200"
                        />
                    </Link>

                    {/* Links right next to the logo */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        <Link href="https://discord.gg/83ZwJcPWJ6" target="_blank" className="text-[11px] sm:text-xs font-medium text-gray-300 hover:text-white transition cursor-pointer">
                            Community
                        </Link>
                        <Link href="https://hub.calcai.cc" target="_blank" className="text-[11px] sm:text-xs font-medium text-gray-300 hover:text-white transition cursor-pointer">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
