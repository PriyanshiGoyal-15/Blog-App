"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (e) { }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`/blogs?${params.toString()}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/5 px-6 py-4 mb-8">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md -z-10" />

        <div className="flex items-center justify-between relative z-20">
          {/* Left: Logo */}
          <Link href="/" className="font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity">
            MyApp<span className="text-zinc-500">.</span>
          </Link>

          {/* Desktop: Navigation Links */}
          <div className="hidden md:flex justify-center gap-8 text-sm font-medium text-zinc-400 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/my-blogs" className="hover:text-white transition-colors">Your Blog</Link>
          </div>

          {/* Desktop: Right Side (Search & Auth) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700 w-40 lg:w-48 transition-all"
              />
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-zinc-400 text-sm font-medium hidden lg:inline">Hi, {user.name}</span>
                <button
                  onClick={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" });
                      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                      // Force a hard reload or redirect to clear state
                      window.location.href = "/login";
                    } catch (err) {
                      console.error("Logout failed", err);
                    }
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 text-sm font-medium">
                <Link href="/login" className="px-4 py-2 hover:text-white transition-colors">Login</Link>
                <Link href="/register" className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile: Hamburger Button */}
          <button
            className="md:hidden z-50 relative p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile: Menu Overlay (Outside nav structure visually, but inside logically. Position fixed should work better now) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col pt-32 px-6 md:hidden overflow-y-auto">
          {/* Close button area is handled by the nav button which is z-50.
                 Wait, if overlay is z-60, it covers the nav button (z-50).
                 We need the button to be clickable. */}

          {/* Re-render close button inside overlay for better UX or ensure nav button is higher.
                 Let's make Nav button z-[70]. */}

          <div className="flex flex-col gap-8 text-2xl font-bold text-zinc-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
            <Link href="/blogs" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Blog</Link>
            <Link href="/my-blogs" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Your Blog</Link>

            <div className="w-full h-px bg-white/10 my-2" />

            {/* Search in Mobile Menu */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={handleSearch}
                className="bg-zinc-900 border border-zinc-800 rounded-full pl-12 pr-6 py-4 text-lg text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700 w-full"
              />
            </div>

            <div className="flex flex-col gap-6 mt-4">
              {user ? (
                <>
                  <div className="text-zinc-400 text-lg font-medium">Hi, {user.name}</div>
                  <button
                    onClick={async () => {
                      try {
                        await fetch("/api/auth/logout", { method: "POST" });
                        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                        window.location.href = "/login";
                      } catch (e) { }
                    }}
                    className="text-red-400 text-left hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-zinc-300 transition-colors">Login</Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="bg-white text-black px-6 py-4 rounded-full text-center font-bold hover:bg-zinc-200 transition-colors">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
