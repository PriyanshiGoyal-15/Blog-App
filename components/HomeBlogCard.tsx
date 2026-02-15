"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface HomeBlogCardProps {
    blog: any;
    index: number;
}

export default function HomeBlogCard({ blog, index }: HomeBlogCardProps) {
    const defaultGradient = "linear-gradient(135deg, #18181b 0%, #09090b 100%)";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group h-full"
        >
            <Link href={`/blogs/${blog._id}`} className="block h-full">
                <div className="relative h-full flex flex-col bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-zinc-800/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60" />

                        {blog.banner ? (
                            <img
                                src={blog.banner}
                                alt={blog.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                                <span className="text-4xl font-bold opacity-20">{blog.title?.[0]}</span>
                            </div>
                        )}

                        {/* Category badge (optional/mock) */}
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10 shadow-lg">
                                Article
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col relative z-20">
                        <h3 className="text-xl font-bold text-zinc-100 mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                            {blog.title}
                        </h3>

                        <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                            {blog.content}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                    {blog.author?.name?.[0] || "A"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-zinc-300">
                                        {blog.author?.name || "Author"}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <span className="text-purple-400 text-xs font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                Read More
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
