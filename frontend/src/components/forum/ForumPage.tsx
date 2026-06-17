"use client";

import { dummyForumPosts } from "@/lib/dummyForumPosts";
import PostCard from "./PostCard";
import { useState } from "react";
import {
    MessageSquare,
    TrendingUp,
    Camera,
    Tag,
    Send,
    User,
} from "lucide-react";

export default function ForumPage() {
    // Mock auth flag (replace with real session later)
    const isAuthenticated = true;

    // Posts state
    const [posts, setPosts] = useState(dummyForumPosts);
    const [newPostContent, setNewPostContent] = useState("");
    const [newTrekTag, setNewTrekTag] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    // Handle new post
    const handleNewPost = async () => {
        if (!newPostContent.trim()) return;

        setIsPosting(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newPost = {
            id: `post-${Date.now()}`,
            user: {
                id: "user-you",
                name: "You",
                profilePic: "/users/you.jpg",
            },
            trek: newTrekTag || "General Discussion",
            content: newPostContent,
            imageUrl: newImageUrl || undefined,
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString(),
        };

        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setNewImageUrl("");
        setNewTrekTag("");
        setIsPosting(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-2000" />

            <div className="relative z-10 py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-emerald-200">
                            <MessageSquare className="w-4 h-4" />
                            <span>Community Discussion</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                            Community Forum
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8 font-medium">
                            Share your trekking adventures, connect with fellow
                            explorers, and
                            <span className="text-emerald-600 font-semibold">
                                {" "}
                                discover new trails
                            </span>{" "}
                            through our community experiences.
                        </p>
                    </div>

                    {/* New Post Form */}
                    {isAuthenticated ? (
                        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 shadow-lg">
                            <div className="flex gap-4 items-start">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    {/* Main Text Area */}
                                    <div className="relative">
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm"
                                            placeholder="Share your trekking experience, ask questions, or start a discussion..."
                                            value={newPostContent}
                                            onChange={(e) =>
                                                setNewPostContent(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                            {newPostContent.length}/500
                                        </div>
                                    </div>

                                    {/* Input Row */}
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="relative">
                                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Trek name or tag (optional)"
                                                value={newTrekTag}
                                                onChange={(e) =>
                                                    setNewTrekTag(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Image URL (optional)"
                                                value={newImageUrl}
                                                onChange={(e) =>
                                                    setNewImageUrl(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Row */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                Public post
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleNewPost}
                                            disabled={
                                                !newPostContent.trim() ||
                                                isPosting
                                            }
                                            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                                        >
                                            {isPosting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Posting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                    <span>Share Post</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8 shadow-lg text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <MessageSquare className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Join the Conversation
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Sign in to share your trekking experiences and
                                connect with the community.
                            </p>
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </button>
                        </div>
                    )}

                    {/* Posts List */}
                    <div className="space-y-6">
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <PostCard
                                    post={post}
                                    isAuthenticated={isAuthenticated}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Load More Section */}
                    <div className="text-center mt-12">
                        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <span>Load More Posts</span>
                            <TrendingUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </main>
    );
}
