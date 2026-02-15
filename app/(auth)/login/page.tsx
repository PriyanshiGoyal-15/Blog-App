"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }

      if (data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none opacity-20" />

      <form onSubmit={handleSubmit} className="p-8 bg-zinc-900/50 border border-white/5 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-white text-center tracking-tight">Welcome Back</h2>
        <p className="text-zinc-400 text-center mb-8 text-sm">Sign in to continue to your account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-white/20 focus:ring-0 transition-all"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-white/20 focus:ring-0 transition-all"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <button disabled={loading} className="mt-8 bg-white text-black font-bold px-4 py-3 w-full rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Don't have an account? <a href="/register" className="text-white hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
}
