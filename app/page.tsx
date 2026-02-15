"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroScene from "@/components/HeroScene";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterSection from "@/components/NewsletterSection";
import HomeBlogCard from "@/components/HomeBlogCard";

export default function Home() {
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLatestBlogs(data.slice(0, 4));
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] relative isolate">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none opacity-20" />

        <div className="text-center px-6 max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
            Share Your Story.
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            A minimal, distraction-free platform for writers and thinkers. Join a community of creators and start publishing your ideas today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/create"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 w-full sm:w-auto shadow-lg shadow-white/10"
            >
              + Create Blog
            </Link>

            <Link
              href="/blogs"
              className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:bg-zinc-800 transition-all w-full sm:w-auto"
            >
              Read Blogs
            </Link>
          </div>
        </div>

        {/* Footer/Bottom Text */}
        <div className="absolute bottom-8 text-zinc-600 text-sm">
          © {new Date().getFullYear()} MyApp. Crafted for creators.
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

      {/* Latest Blogs Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full">
        <h2 className="text-3xl font-bold mb-8 text-zinc-200 tracking-tight">Latest from the Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog, index) => (
            <HomeBlogCard key={blog._id} blog={blog} index={index} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
