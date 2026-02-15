"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertFileToBase64 } from "@/lib/utils";

export default function CreateBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    banner: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        alert(data.message || "Error creating blog");
        return;
      }

      router.push("/blogs");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-white tracking-tight">Write a New Story</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
          <input
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:border-white/20 focus:ring-0 transition-all"
            placeholder="Give your story a title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Cover Image</label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-all cursor-pointer"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 2 * 1024 * 1024) {
                    alert("File size must be less than 2MB");
                    return;
                  }
                  const base64 = await convertFileToBase64(file);
                  setForm({ ...form, banner: base64 });
                }
              }}
            />
          </div>
          {form.banner && (
            <div className="mt-4 relative rounded-xl overflow-hidden border border-zinc-800">
              <img src={form.banner} alt="Preview" className="w-full h-64 object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Content</label>
          <textarea
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:border-white/20 focus:ring-0 transition-all min-h-[300px] leading-relaxed"
            placeholder="Tell your story..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-zinc-200 transition-transform active:scale-95"
          >
            Publish Story
          </button>
        </div>
      </div>
    </div>
  );
}
