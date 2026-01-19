'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Headphones } from 'lucide-react';

export default function SpotlightSection() {
    const features = [
        {
            title: 'OTA updates',
            icon: <Zap className="w-12 h-12 text-blue-200 mb-4 mx-auto" />,
            description: 'Receive the latest features and improvements instantly over the air.',
        },
        {
            title: 'Free unlimited support',
            icon: <Headphones className="w-12 h-12 text-blue-200 mb-4 mx-auto" />,
            description: 'Get help whenever you need it from our dedicated support team.',
        },
        {
            title: '2 week warranty',
            icon: <ShieldCheck className="w-12 h-12 text-blue-200 mb-4 mx-auto" />,
            description: 'Enjoy peace of mind with our comprehensive 2-week warranty coverage.',
        },
    ];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <section className="py-20 bg-transparent">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="h-full col-span-1"
                        >
                            <div
                                className="card-spotlight w-full h-full"
                                onMouseMove={handleMouseMove}
                                tabIndex={0}
                            >
                                <div className="relative z-10 grid place-content-center h-full w-full text-center">

                                    {feature.icon}

                                    <h1 className="text-center text-2xl font-semibold tracking-tight text-white mb-2">
                                        {feature.title}
                                    </h1>
                                    <p className="text-center text-gray-400 text-sm font-medium leading-relaxed tracking-tight">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
