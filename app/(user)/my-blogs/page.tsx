"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                // First get user
                const userRes = await fetch("/api/auth/me");
                if (!userRes.ok) return;
                const userData = await userRes.json();

                // Then fetch all blogs and filter (or use a dedicated query parameter if API supported it)
                // Ideally backend should have /api/blogs/mine, but filtering client side for now as per existing patterns
                const res = await fetch("/api/blogs");
                const data = await res.json();

                const myBlogs = data.filter((blog: any) => blog.author?._id === userData.id || blog.author === userData.id);
                setBlogs(myBlogs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBlogs();
    }, []);

    if (loading) return <div className="text-center text-white p-10">Loading your stories...</div>;

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Your Stories</h1>
                    <p className="text-zinc-400">Manage and edit your published posts.</p>
                </div>
                <Link
                    href="/create"
                    className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10"
                >
                    + Create New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.length === 0 ? (
                    <p className="col-span-full text-center text-zinc-500 text-lg">You haven't written any blogs yet.</p>
                ) : (
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-zinc-900 transition-all duration-300 flex flex-col h-full"
                        >
                            <Link href={`/blogs/${blog._id}`} className="block relative overflow-hidden h-56">
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
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <Link href={`/blogs/${blog._id}`}>
                                    <h2 className="text-xl font-bold mb-3 text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs text-zinc-500 font-medium">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex gap-4 text-sm">
                                    <Link
                                        href={`/edit/${blog._id}`}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-zinc-400 hover:text-red-400 transition-colors"
                                        onClick={async () => {
                                            if (confirm("Are you sure?")) {
                                                await fetch(`/api/blogs/${blog._id}`, { method: "DELETE" });
                                                setBlogs(blogs.filter(b => b._id !== blog._id));
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
