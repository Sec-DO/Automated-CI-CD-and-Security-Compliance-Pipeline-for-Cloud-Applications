"use client";

import { Comment } from "@/lib/dummyForumPosts";
import { useState } from "react";
import Image from "next/image";
import { Send, Heart, Reply, MoreHorizontal, Clock } from "lucide-react";

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    isAuthenticated: boolean;
}

export default function CommentSection({
    // postId,
    comments,
    isAuthenticated,
}: CommentSectionProps) {
    const [commentList, setCommentList] = useState(comments);
    const [newComment, setNewComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handleAddComment = async () => {
        if (!newComment.trim() || isPosting) return;

        setIsPosting(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newCommentObj: Comment = {
            id: `comment-${Date.now()}`,
            user: {
                id: "current-user-id",
                name: "You",
                profilePic: "/forum/you.jpg",
            },
            message: newComment.trim(),
            createdAt: new Date().toISOString(),
        };

        setCommentList((prev) => [...prev, newCommentObj]);
        setNewComment("");
        setIsPosting(false);
    };

    const handleLikeComment = (commentId: string) => {
        if (!isAuthenticated) {
            alert("Please sign in to like comments.");
            return;
        }

        setLikedComments((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    // const formatTimeAgo = (timestamp: string) => {
    //     // Mock time formatting - replace with actual date logic
    //     const options = ["Just now", "2m ago", "5m ago", "1h ago", "3h ago"];
    //     return options[Math.floor(Math.random() * options.length)];
    // };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleAddComment();
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Comment Section */}
            {isAuthenticated ? (
                <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl p-4 border border-gray-100">
                    <div className="flex gap-4">
                        {/* Enhanced Profile Picture */}
                        <div className="relative flex-shrink-0">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg">
                                <Image
                                    src="/forum/you.jpg"
                                    alt="Your profile"
                                    width={44}
                                    height={44}
                                    className="w-full h-full rounded-full object-cover bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-3">
                            {/* Enhanced Textarea */}
                            <div className="relative">
                                <textarea
                                    rows={2}
                                    className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm resize-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 placeholder-gray-400 bg-white/80 focus:bg-white"
                                    placeholder="Share your thoughts on this adventure..."
                                    value={newComment}
                                    onChange={(e) =>
                                        setNewComment(e.target.value)
                                    }
                                    onKeyDown={handleKeyPress}
                                />

                                {/* Character count */}
                                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                    {newComment.length}/200
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                    Press Cmd+Enter to post quickly
                                </div>

                                <button
                                    onClick={handleAddComment}
                                    disabled={!newComment.trim() || isPosting}
                                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-gray-300 disabled:to-gray-400 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
                                >
                                    {isPosting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Posting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Comment</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">
                        Join the conversation!
                    </p>
                    <p className="text-sm text-gray-600">
                        Sign in to share your thoughts and connect with fellow
                        adventurers.
                    </p>
                </div>
            )}

            {/* Comments Header */}
            {commentList.length > 0 && (
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">
                        {commentList.length}{" "}
                        {commentList.length === 1 ? "Comment" : "Comments"}
                    </h4>
                    <div className="text-sm text-gray-500">Most recent</div>
                </div>
            )}

            {/* Empty State */}
            {commentList.length === 0 && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.452L3 21l1.452-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium mb-1">
                        No comments yet
                    </p>
                    <p className="text-sm text-gray-400">
                        Be the first to share your thoughts!
                    </p>
                </div>
            )}

            {/* Enhanced Comment List */}
            <div className="space-y-4">
                {commentList.map((comment, index) => (
                    <div
                        key={comment.id}
                        className="group animate-fade-in bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex gap-3">
                            {/* Enhanced Profile Picture */}
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-md">
                                    <Image
                                        src={comment.user.profilePic}
                                        alt={comment.user.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full rounded-full object-cover bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                {/* Comment Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h5 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors cursor-pointer">
                                            {comment.user.name}
                                        </h5>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            {/* <span>
                                                {formatTimeAgo(
                                                    comment.createdAt
                                                )}
                                            </span> */}
                                        </div>
                                    </div>

                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-full transition-all duration-200">
                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>

                                {/* Comment Content */}
                                <p className="text-gray-800 leading-relaxed mb-3">
                                    {comment.message}
                                </p>

                                {/* Comment Actions */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            handleLikeComment(comment.id)
                                        }
                                        className={`group/like flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                            likedComments.has(comment.id)
                                                ? "text-red-600 bg-red-50"
                                                : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                                        }`}
                                    >
                                        <Heart
                                            className={`w-3 h-3 transition-all duration-300 ${
                                                likedComments.has(comment.id)
                                                    ? "fill-current scale-110"
                                                    : "group-hover/like:scale-110"
                                            }`}
                                        />
                                        <span>Like</span>
                                    </button>

                                    <button
                                        onClick={() =>
                                            setReplyingTo(
                                                replyingTo === comment.id
                                                    ? null
                                                    : comment.id
                                            )
                                        }
                                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                                    >
                                        <Reply className="w-3 h-3" />
                                        <span>Reply</span>
                                    </button>
                                </div>

                                {/* Reply Input */}
                                {replyingTo === comment.id && (
                                    <div className="mt-3 pl-4 border-l-2 border-emerald-200 animate-fade-in">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-sm">
                                                <Image
                                                    src="/forum/you.jpg"
                                                    alt="Your profile"
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full rounded-full object-cover bg-white"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    rows={2}
                                                    className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-300"
                                                    placeholder={`Reply to ${comment.user.name}...`}
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-500 transition-colors">
                                                        Reply
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setReplyingTo(null)
                                                        }
                                                        className="px-3 py-1 text-gray-600 text-xs hover:text-gray-800 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
