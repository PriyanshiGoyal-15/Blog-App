"use client";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentSection({ blogId }: { blogId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch comments and user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [commentsRes, userRes] = await Promise.all([
                    fetch(`/api/comments?blogId=${blogId}`),
                    fetch("/api/auth/me")
                ]);

                if (commentsRes.ok) {
                    setComments(await commentsRes.json());
                }
                if (userRes.ok) {
                    setCurrentUser(await userRes.json());
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [blogId]);

    const handleNewComment = (newComment: any) => {
        setComments(prev => [newComment, ...prev]);
    };

    const rootComments = comments.filter(c => !c.parentId);

    if (loading) return <div className="text-zinc-500 text-sm mt-8">Loading comments...</div>;

    return (
        <div className="mt-16 max-w-3xl mx-auto border-t border-zinc-900 pt-10">
            <h3 className="text-xl font-bold text-white mb-6">Comments ({comments.length})</h3>

            {/* Create New Comment */}
            {currentUser ? (
                <CommentForm blogId={blogId} onCommentPosted={handleNewComment} />
            ) : (
                <div className="bg-zinc-900/50 p-4 rounded-lg mb-8 text-center border border-zinc-800 text-sm text-zinc-400">
                    Please <a href="/login" className="text-white underline">login</a> to leave a comment.
                </div>
            )}

            {/* Comment List */}
            <div className="space-y-4">
                {rootComments.length === 0 ? (
                    <p className="text-zinc-500 text-sm text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    rootComments.map(comment => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            replies={comments.filter(c => c.parentId === comment._id)}
                            blogId={blogId}
                            currentUserId={currentUser?.id}
                            onReplyPosted={handleNewComment}
                            allComments={comments}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
