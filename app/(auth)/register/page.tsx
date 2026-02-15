"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none opacity-20" />

      <form onSubmit={handleSubmit} className="p-8 bg-zinc-900/50 border border-white/5 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-white text-center tracking-tight">Create Account</h2>
        <p className="text-zinc-400 text-center mb-8 text-sm">Join the community and start writing.</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-white/20 focus:ring-0 transition-all"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-white/20 focus:ring-0 transition-all"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-white/20 focus:ring-0 transition-all"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="mt-8 bg-white text-black font-bold px-4 py-3 w-full rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
          Create Account
        </button>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Already have an account? <a href="/login" className="text-white hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
