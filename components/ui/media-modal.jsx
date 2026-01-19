import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import Image from "next/image";

const VideoPreview = ({ videoSrc, videoClassName }) => {
    const videoRef = useRef(null);
    const loopStartTime = 0;
    const loopEndTime = 4;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force fragment buffering optimization
        video.src = `${videoSrc}#t=${loopStartTime},${loopEndTime}`;
        video.load();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [videoSrc]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video && video.currentTime >= loopEndTime) {
            video.currentTime = loopStartTime;
            video.play().catch(() => { });
        }
    };

    return (
        <video
            ref={videoRef}
            className={`h-full w-full object-cover transform-gpu ${videoClassName || ""}`}
            onTimeUpdate={handleTimeUpdate}
            muted
            playsInline
            preload="metadata"
        />
    );
};

const MediaModalContent = ({ isOpen, setIsOpen, imgSrc, videoSrc, videoClassName }) => {
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const timeDisplayRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.setAttribute('data-media-modal-open', 'true');
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(e => console.log("Auto-play blocked", e));
                setIsPlaying(true);
            }
        } else {
            document.documentElement.removeAttribute('data-media-modal-open');
        }
        return () => {
            document.documentElement.removeAttribute('data-media-modal-open');
        };
    }, [isOpen]);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && progressBarRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            progressBarRef.current.style.width = `${progress}%`;

            if (timeDisplayRef.current) {
                timeDisplayRef.current.innerText = `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration)}`;
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            if (timeDisplayRef.current) {
                timeDisplayRef.current.innerText = `0:00 / ${formatTime(videoRef.current.duration)}`;
            }
        }
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressClick = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            videoRef.current.currentTime = pos * videoRef.current.duration;
            // Immediate UI update for snappiness
            handleTimeUpdate();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
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
                <img
                    src={imgSrc}
                    alt="Media Full"
                    className="w-full max-h-[85vh] object-contain bg-black"
                />
            )}
            {videoSrc && (
                <div className="relative group/modal flex items-center justify-center bg-black">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className={`w-full max-h-[85vh] transform-gpu will-change-transform ${videoClassName || ""}`}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onClick={togglePlay}
                        playsInline
                        loop
                        muted
                        preload="auto"
                    />

                    {/* Custom Controls Overlay */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300">
                        <div className="flex flex-col gap-4">
                            {/* Progress Bar */}
                            <div
                                className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer group/progress"
                                onClick={handleProgressClick}
                            >
                                <div
                                    ref={progressBarRef}
                                    className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-[width] duration-75 ease-out"
                                    style={{ width: "0%" }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={togglePlay}
                                        className="text-white hover:text-blue-400 transition-colors"
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                                    </button>
                                    <div
                                        ref={timeDisplayRef}
                                        className="text-[12px] font-mono text-white/70 tracking-wider"
                                    >
                                        0:00 / 0:00
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.currentTime = 0; }}
                                    className="text-white/50 hover:text-white transition-colors"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Big Center Play Button (only when paused) */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="rounded-full bg-white/10 p-6 backdrop-blur-md border border-white/20">
                                <Play className="w-12 h-12 text-white fill-white" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export const MediaModal = ({ imgSrc, videoSrc, className, videoClassName, badgeText }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                {videoSrc && (
                    <div className="relative h-full w-full">
                        <VideoPreview
                            videoSrc={videoSrc}
                            videoClassName={videoClassName}
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
                            className="absolute inset-0 bg-black/95"
                            onClick={() => setIsOpen(false)}
                        />
                        <MediaModalContent
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            imgSrc={imgSrc}
                            videoSrc={videoSrc}
                            videoClassName={videoClassName}
                        />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
