"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export const MediaModal = ({ imgSrc, videoSrc, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                layoutId={`media-${imgSrc || videoSrc}`}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur cursor-pointer group w-full h-full min-h-[200px] ${className || ""}`}
                onClick={() => setIsOpen(true)}
            >
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="Media"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {videoSrc && (
                    <div className="relative h-full w-full">
                        <video
                            src={videoSrc}
                            className="h-full w-full object-cover"
                            muted
                            loop
                            playsInline
                        // autoPlay // Optional: autoplay on hover or always
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <div className="rounded-full bg-white/10 p-3 backdrop-blur-md border border-white/20">
                                <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            layoutId={`media-${imgSrc || videoSrc}`}
                            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 backdrop-blur-md border border-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {imgSrc && (
                                <img
                                    src={imgSrc}
                                    alt="Media Full"
                                    className="w-full max-h-[85vh] object-contain bg-black"
                                />
                            )}
                            {videoSrc && (
                                <video
                                    src={videoSrc}
                                    className="w-full max-h-[85vh] bg-black"
                                    controls
                                    autoPlay
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
