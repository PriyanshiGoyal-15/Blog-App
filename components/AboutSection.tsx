import React from "react";

export default function AboutSection() {
    return (
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-500">
                        About Our Mission
                    </h2>
                    <p className="text-xl text-zinc-400 leading-relaxed mb-6">
                        We believe that every story deserves to be heard. Our platform is designed to strip away the noise and focus on what truly matters: your words.
                    </p>
                    <p className="text-zinc-500 leading-relaxed">
                        Whether you're a seasoned writer or just starting out, we provide the tools you need to express yourself freely and connect with a like-minded community. Join us in building a space where creativity thrives properly.
                    </p>
                </div>

                <div className="relative h-[300px] md:h-[400px] flex items-center justify-center perspective-1000">
                    {/* Core Sphere */}
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-600 to-purple-600 opacity-40 animate-spin-slow duration-[10s]"></div>
                        <div className="absolute inset-2 rounded-full border border-blue-400/30"></div>

                        {/* Inner Grid/Network Lines */}
                        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="absolute inset-0 border border-white/20 rounded-full transform" style={{ transform: `rotate(${i * 30}deg)` }}></div>
                            ))}
                        </div>

                        {/* Central Logo/Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl">🌍</span>
                        </div>
                    </div>

                    {/* Orbiting Elements */}
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="absolute inset-0 animate-spin-slow" style={{ animationDuration: `${15 + i * 5}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}>
                            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ transform: `scale(${1 + i * 0.4}) rotate(${i * 45}deg)` }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 rounded-full bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                            </div>
                        </div>
                    ))}

                    {/* Floating Labels */}
                    <div className="absolute top-4 right-4 md:top-10 md:right-10 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-blue-300 shadow-lg animate-bounce delay-700">
                        Total Reach: 150+ Countries
                    </div>
                    <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-purple-300 shadow-lg animate-bounce duration-3000">
                        Avg. Response: 2m
                    </div>
                </div>
            </div>
        </section>
    );
}
