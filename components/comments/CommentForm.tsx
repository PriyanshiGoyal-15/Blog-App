"use client";
import { useState } from "react";

interface CommentFormProps {
    blogId: string;
    parentId?: string | null;
    onCommentPosted: (comment: any) => void;
    onCancel?: () => void;
}

export default function CommentForm({ blogId, parentId = null, onCommentPosted, onCancel }: CommentFormProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, blogId, parentId }),
            });

            if (res.ok) {
                const newComment = await res.json();
                onCommentPosted(newComment);
                setContent("");
                if (onCancel) onCancel();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 mb-6">
            <textarea
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                rows={3}
                placeholder={parentId ? "Write a reply..." : "Write a comment..."}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="px-6 py-2 bg-white text-black font-semibold rounded-full text-sm hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                >
                    {loading ? "Posting..." : parentId ? "Reply" : "Post Comment"}
                </button>
            </div>
        </form>
    );
}
