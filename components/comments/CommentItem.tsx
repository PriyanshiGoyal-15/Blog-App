"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface CommentItemProps {
    comment: any;
    replies: any[];
    blogId: string;
    currentUserId: string | null;
    onReplyPosted: (comment: any) => void;
    allComments: any[]; // Passed down to find recursive replies
}

export default function CommentItem({ comment, replies, blogId, currentUserId, onReplyPosted, allComments }: CommentItemProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [liked, setLiked] = useState(comment.likes.includes(currentUserId));
    const [likesCount, setLikesCount] = useState(comment.likes.length);

    const handleLike = async () => {
        if (!currentUserId) return; // Prevent action if not logged in

        // Optimistic update
        setLiked(!liked);
        setLikesCount((prev: number) => liked ? prev - 1 : prev + 1);

        try {
            await fetch(`/api/comments/${comment._id}/like`, { method: "POST" });
        } catch (err) {
            // Revert if error
            setLiked(!liked);
            setLikesCount((prev: number) => liked ? prev + 1 : prev - 1);
        }
    };

    return (
        <div className="mb-4">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-zinc-200 text-sm">
                        {comment.author?.name || "Unknown User"}
                    </span>
                    <span className="text-xs text-zinc-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <p className="text-zinc-300 text-sm mb-3 leading-relaxed">
                    {comment.content}
                </p>

                <div className="flex gap-4 items-center">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${liked ? "text-red-400" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        <span>{liked ? "Liked" : "Like"}</span>
                        {likesCount > 0 && <span>({likesCount})</span>}
                    </button>

                    {/* Reply Button */}
                    {currentUserId && (
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="text-xs text-zinc-500 hover:text-white transition-colors"
                        >
                            Reply
                        </button>
                    )}
                </div>
            </div>

            {/* Reply Form */}
            {isReplying && (
                <div className="ml-4 pl-4 border-l border-zinc-800">
                    <CommentForm
                        blogId={blogId}
                        parentId={comment._id}
                        onCommentPosted={(newReply) => {
                            onReplyPosted(newReply);
                            setIsReplying(false);
                            setShowReplies(true); // Auto-show replies on new post
                        }}
                        onCancel={() => setIsReplying(false)}
                    />
                </div>
            )}

            {/* Replies List */}
            {replies.length > 0 && (
                <div className="ml-4 mt-2">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 mb-2"
                    >
                        {showReplies ? "Hide" : "Show"} {replies.length} repl{replies.length > 1 ? "ies" : "y"}
                    </button>

                    {showReplies && (
                        <div className="pl-4 border-l border-zinc-800 space-y-2">
                            {replies.map(reply => (
                                <CommentItem
                                    key={reply._id}
                                    comment={reply}
                                    replies={allComments.filter(c => c.parentId === reply._id)}
                                    blogId={blogId}
                                    currentUserId={currentUserId}
                                    onReplyPosted={onReplyPosted}
                                    allComments={allComments}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
