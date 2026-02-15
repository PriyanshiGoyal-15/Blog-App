"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogListCardProps {
    blog: any;
    userId: string | null;
    onDelete: (id: string) => void;
    style?: React.CSSProperties;
}

export default function BlogListCard({ blog, userId, onDelete, style }: BlogListCardProps) {
    return (
        <div style={style} className="p-2">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-zinc-900 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-xl"
            >
                <Link href={`/blogs/${blog._id}`} className="block relative overflow-hidden h-48 sm:h-56">
                    {blog.banner ? (
                        <img
                            src={blog.banner}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700">
                            <span className="text-sm font-medium">No Image</span>
                        </div>
                    )}

                    {/* Category Badge overlay */}
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white rounded-md border border-white/10 uppercase tracking-wider">
                            Read
                        </span>
                    </div>
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                    <Link href={`/blogs/${blog._id}`}>
                        <h2 className="text-lg font-bold mb-2 text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                            {blog.title}
                        </h2>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold shadow-md">
                            {blog.author?.name?.[0]?.toUpperCase() || "A"}
                        </div>
                        <span className="text-xs text-zinc-400 font-medium">
                            {blog.author?.name || "Author"}
                        </span>
                        <span className="text-[10px] text-zinc-600">•</span>
                        <span className="text-[10px] text-zinc-500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                        {blog.content}
                    </p>

                    <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                        <Link
                            href={`/blogs/${blog._id}`}
                            className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1"
                        >
                            Read Article
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>

                        {userId === blog.author?._id && (
                            <div className="flex gap-3 text-xs font-medium">
                                <Link
                                    href={`/edit/${blog._id}`}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => onDelete(blog._id)}
                                    className="text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
