"use client";

import { ForumPost } from "@/lib/dummyForumPosts";
import { useState } from "react";
import Image from "next/image";
import {
    MessageCircle,
    Heart,
    MapPin,
    Clock,
    Share2,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";
import CommentSection from "./CommentSection";

interface PostCardProps {
    post: ForumPost;
    isAuthenticated: boolean;
}

export default function PostCard({ post, isAuthenticated }: PostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleLike = () => {
        if (!isAuthenticated) {
            alert("Please sign in to like this post.");
            return;
        }

        setIsLiked(!isLiked);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleBookmark = () => {
        if (!isAuthenticated) {
            alert("Please sign in to bookmark this post.");
            return;
        }
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${post.user.name}'s trek experience`,
                text: post.content,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    // const formatTimeAgo = () => {
    //     return "2h ago";
    // };

    return (
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6 space-y-5">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Enhanced Profile Picture */}
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg">
                                <Image
                                    src={post.user.profilePic}
                                    alt={`${post.user.name} profile`}
                                    width={56}
                                    height={56}
                                    className="w-full h-full rounded-full object-cover bg-white"
                                />
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900 hover:text-emerald-600 transition-colors duration-300 cursor-pointer">
                                    {post.user.name}
                                </h3>
                                {/* Verified badge */}
                                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-1">
                                {/* Trek location */}
                                <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                                    <MapPin className="w-3 h-3" />
                                    <span>{post.trek}</span>
                                </div>

                                {/* Time ago */}
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    {/* <span>{formatTimeAgo(post.id)}</span> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Options Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>

                        {showOptions && (
                            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 w-48 z-20 animate-scale-in">
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    Report Post
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    Hide Post
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    Follow User
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                    <div className="text-gray-800 leading-relaxed text-base">
                        {post.content}
                    </div>

                    {/* Enhanced Image Display */}
                    {post.imageUrl && (
                        <div className="relative group/image rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={post.imageUrl}
                                alt="Post photo"
                                width={800}
                                height={500}
                                className="w-full h-auto object-cover group-hover/image:scale-105 transition-transform duration-700"
                            />

                            {/* Image overlay with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/image:translate-x-[100%] transition-transform duration-1000" />
                        </div>
                    )}
                </div>

                {/* Enhanced Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className={`group/like flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                isLiked
                                    ? "bg-red-50 text-red-600"
                                    : "hover:bg-red-50 text-gray-600 hover:text-red-500"
                            }`}
                        >
                            <Heart
                                className={`w-5 h-5 transition-all duration-300 ${
                                    isLiked
                                        ? "fill-current scale-110"
                                        : "group-hover/like:scale-110"
                                }`}
                            />
                            <span className="font-semibold text-sm">
                                {likes} {likes === 1 ? "Like" : "Likes"}
                            </span>
                        </button>

                        {/* Comment Button */}
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className={`group/comment flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                showComments
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "hover:bg-emerald-50 text-gray-600 hover:text-emerald-600"
                            }`}
                        >
                            <MessageCircle className="w-5 h-5 group-hover/comment:scale-110 transition-transform duration-300" />
                            <span className="font-semibold text-sm">
                                {post.comments.length}{" "}
                                {post.comments.length === 1
                                    ? "Comment"
                                    : "Comments"}
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="group/share p-2 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            <Share2 className="w-5 h-5 group-hover/share:scale-110 transition-transform duration-300" />
                        </button>

                        {/* Bookmark Button */}
                        <button
                            onClick={handleBookmark}
                            className={`group/bookmark p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                isBookmarked
                                    ? "bg-yellow-50 text-yellow-600"
                                    : "hover:bg-yellow-50 text-gray-600 hover:text-yellow-600"
                            }`}
                        >
                            <Bookmark
                                className={`w-5 h-5 transition-all duration-300 ${
                                    isBookmarked
                                        ? "fill-current scale-110"
                                        : "group-hover/bookmark:scale-110"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Enhanced Comment Section */}
                {showComments && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in">
                        <CommentSection
                            postId={post.id}
                            comments={post.comments}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>
                )}
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/30 transition-all duration-300 pointer-events-none" />

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

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
