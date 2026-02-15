"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/comments/CommentSection";

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setBlog(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!blog) return <div className="p-8">Blog not found</div>;

    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <Link href="/blogs" className="text-zinc-500 text-sm mb-8 inline-block hover:text-white transition-colors">
                &larr; Back to Blogs
            </Link>

            {blog.banner && (
                <div className="w-full aspect-video mb-10 relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <img
                        src={blog.banner}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">{blog.title}</h1>

            <div className="flex items-center gap-4 text-zinc-400 text-sm mb-12 pb-8 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300">
                        {blog.author?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span>By <span className="text-zinc-200">{blog.author?.name || "Unknown"}</span></span>
                </div>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap break-words text-zinc-300 leading-relaxed">
                {blog.content}
            </div>

            <div className="mt-16 pt-10 border-t border-zinc-900">
                <CommentSection blogId={id} />
            </div>
        </div>
    );
}
