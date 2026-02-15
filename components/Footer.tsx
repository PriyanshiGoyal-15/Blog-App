"use client"

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [stars, setStars] = React.useState<any[]>([]);
    const [shootingStars, setShootingStars] = React.useState<any[]>([]);

    React.useEffect(() => {
        const generatedStars = [...Array(20)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 5
        }));
        setStars(generatedStars);

        const generatedShootingStars = [...Array(3)].map((_, i) => ({
            id: i,
            delay: Math.random() * 10,
            repeatDelay: 5 + Math.random() * 10
        }));
        setShootingStars(generatedShootingStars);
    }, []);

    return (
        <footer className="bg-zinc-950 pt-10 pb-8 border-t border-white/5 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[60px_60px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-zinc-900/50 to-transparent -z-10 pointer-events-none" />

            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        initial={{ opacity: 0.1, scale: 0.5 }}
                        animate={{
                            opacity: [0.1, 0.5, 0.1],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay
                        }}
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                        }}
                    />
                ))}
            </div>

            {/* Shooting Stars */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {shootingStars.map((star) => (
                    <motion.div
                        key={`shooting-${star.id}`}
                        className="absolute h-px bg-linear-to-r from-transparent via-white to-transparent"
                        initial={{ top: -10, left: '100%', width: 50, opacity: 0 }}
                        animate={{
                            top: '100%',
                            left: '-10%',
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: star.repeatDelay,
                            ease: "linear",
                            delay: star.delay
                        }}
                        style={{ transform: 'rotate(45deg)' }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8 text-sm font-medium tracking-wide uppercase text-zinc-400">
                    <Link href="/" className="hover:text-white transition-colors hover:underline decoration-1 underline-offset-4">Home</Link>
                    <Link href="/blogs" className="hover:text-white transition-colors hover:underline decoration-1 underline-offset-4">Read</Link>
                    <Link href="/create" className="hover:text-white transition-colors hover:underline decoration-1 underline-offset-4">Write</Link>
                </nav>

                {/* Massive Brand Text */}
                <div className="relative group cursor-default select-none mb-8">
                    <h1 className="text-[12vw] leading-none font-black text-white tracking-tighter opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out">
                        MyApp.
                    </h1>
                    <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10" />
                </div>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-4 border-t border-white/5 text-xs text-zinc-600 gap-4">
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
                    </div>

                    <p>&copy; {new Date().getFullYear()} MyApp. Crafted for creators.</p>

                    <div className="flex gap-4">
                        <Link href="https://twitter.com" target="_blank" className="hover:text-zinc-400 transition-colors">Twitter/X</Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-zinc-400 transition-colors">LinkedIn</Link>
                        <Link href="https://github.com" target="_blank" className="hover:text-zinc-400 transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
