import React from "react";
import Link from "next/link";

export default function NewsletterSection() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[60px_60px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -z-10 opacity-40 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                    Join the Creator Network
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Connect with fellow writers, share your journey, and get inspired.
                    Be part of a growing community of creators.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
                    <Link
                        href="https://www.linkedin.com/in/priyanshi-goyal-397b682a2"
                        target="_blank"
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0A66C2] text-white font-bold rounded-full hover:bg-[#004182] transition-all active:scale-95 shadow-lg shadow-[#0A66C2]/20 w-full sm:w-auto min-w-[200px]"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Connect on LinkedIn</span>
                    </Link>
                </div>

                <p className="mt-12 text-sm text-zinc-600">
                    Be part of something bigger. Start your journey today.
                </p>
            </div>
        </section>
    );
}
