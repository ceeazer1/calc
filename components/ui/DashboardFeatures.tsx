"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import DisplayCards from '@/components/ui/display-cards'

export function DashboardFeatures() {
    return (
        <section className="py-16 md:py-32 relative z-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid gap-0.5 sm:grid-cols-5 bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                    {/* Card 1: Prompt History (Large Top Left) */}
                    <Card className="group overflow-hidden border-none bg-black/40 backdrop-blur-xl sm:col-span-3 rounded-none">
                        <CardHeader className="p-8 pb-0">
                            <p className="text-xl font-medium text-white">Prompt History</p>
                            <p className="text-white/50 mt-2 max-w-sm text-sm font-light leading-relaxed">View your complete query history and captured images, synced instantly.</p>
                        </CardHeader>

                        <div className="relative h-fit pt-4 overflow-hidden">
                            {/* Applying the same gradient mask as the original template */}
                            <div className="absolute -inset-6 [background:radial-gradient(75%_95%_at_50%_0%,transparent,black_100%)] pointer-events-none z-10"></div>

                            <div className="bg-transparent pl-4 pt-4">
                                <DisplayCards cards={[
                                    {
                                        model: "GPT 5 mini",
                                        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
                                        answer: "x = 7, y = -3",
                                        date: "Just now",
                                    },
                                    {
                                        model: "Gemini 3.5",
                                        question: "Find the derivative of f(x) = 3x² + 2x - 5",
                                        answer: "f'(x) = 6x + 2",
                                        date: "2 mins ago",
                                    },
                                    {
                                        model: "Gemini 4.0",
                                        question: "What is the molecular formula of glucose?",
                                        answer: "C₆H₁₂O₆",
                                        date: "5 mins ago",
                                    },
                                ]} />
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: Model Selection (Top Right) */}
                    <Card className="group overflow-hidden border-none bg-black/40 backdrop-blur-xl sm:col-span-2 rounded-none flex flex-col">
                        <CardHeader className="p-8">
                            <p className="text-xl font-medium text-white">Model Selection</p>
                            <p className="text-white/50 mt-2 text-sm font-light leading-relaxed">Switch between ChatGPT and Gemini.</p>
                        </CardHeader>

                        <CardContent className="flex-1 flex items-center justify-center p-8 pt-0">
                            <div className="relative flex items-center gap-12 justify-center w-full">
                                <div className="absolute -inset-10 [background:radial-gradient(50%_75%_at_50%_50%,transparent,black_100%)] pointer-events-none"></div>
                                <div className="flex flex-col items-center gap-4 z-10">
                                    <Image src="/chatgpt-logo.svg" width={56} height={56} alt="GPT" className="invert opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                                    <span className="text-[10px] text-white/30 font-bold tracking-[0.2em] uppercase">ChatGPT</span>
                                </div>
                                <div className="flex flex-col items-center gap-4 z-10">
                                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="#4285F4" />
                                    </svg>
                                    <span className="text-[10px] text-white/30 font-bold tracking-[0.2em] uppercase">Gemini</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3: Presets (Bottom Left) */}
                    <Card className="group p-8 border-none bg-black/40 backdrop-blur-xl sm:col-span-2 rounded-none flex flex-col">
                        <div className="mb-4">
                            <p className="text-xl font-medium text-white">Presets</p>
                            <p className="text-white/50 mt-2 text-sm font-light leading-relaxed">Instantly access your saved system instructions and favorite prompts for any subject.</p>
                        </div>

                        <div className="mt-auto flex justify-center py-6">
                            <div className="bg-white/5 relative flex aspect-square size-24 items-center justify-center rounded-2xl border border-white/10 shadow-2xl group-hover:bg-white/10 transition-all duration-500 group-hover:scale-110">
                                <Sparkles className="size-10 text-purple-400 transition-transform duration-500 group-hover:rotate-12" />
                                <div className="absolute -inset-4 bg-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 4: Tokens (Bottom Right) */}
                    <Card className="group relative border-none bg-black/40 backdrop-blur-xl sm:col-span-3 rounded-none flex flex-col">
                        <CardHeader className="p-8">
                            <p className="text-xl font-medium text-white">Tokens</p>
                            <p className="text-white/50 mt-2 text-sm font-light leading-relaxed">Control response length and detail. Optimize for quick answers or deep explanations.</p>
                        </CardHeader>
                        <CardContent className="mt-auto p-8 pt-0">
                            <div className="flex flex-col items-center gap-8 mb-4">
                                <Zap className="size-10 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                <div className="w-full max-w-sm h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "0%" }}
                                        transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                                        className="h-full w-[70%] bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
