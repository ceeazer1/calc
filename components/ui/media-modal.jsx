import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import Image from "next/image";

export const MediaModal = ({ imgSrc, videoSrc, className, videoClassName, badgeText }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Helper to check if a source is a YouTube link
    const isYouTube = (src) => {
        return src?.includes("youtube.com") || src?.includes("youtu.be");
    };

    // Extract YouTube ID
    const getYouTubeId = (src) => {
        if (!src) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = src.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = isYouTube(videoSrc) ? getYouTubeId(videoSrc) : null;

    useEffect(() => {
        if (isOpen) {
            document.documentElement.setAttribute('data-media-modal-open', 'true');
        } else {
            document.documentElement.removeAttribute('data-media-modal-open');
        }
        return () => {
            document.documentElement.removeAttribute('data-media-modal-open');
        };
    }, [isOpen]);

    return (
        <>
            <motion.div
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center group w-full h-full min-h-[200px] ${imgSrc || videoSrc ? "cursor-pointer" : "cursor-default"} ${className || ""}`}
                onClick={() => (imgSrc || videoSrc) && setIsOpen(true)}
            >
                {badgeText && (
                    <div className={`${imgSrc || videoSrc ? "absolute top-4 left-4" : "relative"} z-20 px-4 py-1.5 bg-blue-600/80 backdrop-blur-md rounded-full border border-blue-400/30 text-[11px] uppercase tracking-[0.2em] font-bold text-white shadow-lg`}>
                        {badgeText}
                    </div>
                )}
                {imgSrc && (
                    <Image
                        src={imgSrc}
                        alt="Media"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
                {videoSrc && !imgSrc && (
                    <div className="relative h-full w-full">
                        {youtubeId ? (
                            <Image
                                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                                alt="Video Thumbnail"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <video
                                src={videoSrc}
                                className={`h-full w-full object-cover ${videoClassName || ""}`}
                                muted
                                loop
                                playsInline
                                autoPlay
                            />
                        )}
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
                            className="absolute inset-0 bg-black/95"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative z-10 w-full max-w-5xl aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
                            transition={{ type: "tween", duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="absolute top-4 right-4 z-30 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 backdrop-blur-md border border-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {imgSrc && (
                                <Image
                                    src={imgSrc}
                                    alt="Media Full"
                                    fill
                                    className="object-contain bg-black"
                                    sizes="100vw"
                                />
                            )}
                            {videoSrc && !imgSrc && (
                                <div className="relative w-full h-full flex items-center justify-center bg-black">
                                    {youtubeId ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    ) : (
                                        <video
                                            src={videoSrc}
                                            className={`w-full max-h-[85vh] ${videoClassName || ""}`}
                                            controls
                                            autoPlay
                                            playsInline
                                        />
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
