"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BlogListCard from "@/components/BlogListCard";

function BlogsContent() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch blogs", e);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUserId(data.id);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchUser();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 pt-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Latest Thoughts</h1>
          <p className="text-zinc-400">Insights, tutorials, and updates from the community.</p>
        </div>

        <Link href="/create" className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg shadow-white/10">
          + Create New
        </Link>
      </div>

      {/* Grid List Container */}
      <div className="w-full">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20 text-lg">
            No Blog on this you can write on this topic it's seems interesting
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="h-full">
                <BlogListCard blog={blog} userId={userId} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
      <BlogsContent />
    </Suspense>
  );
}
