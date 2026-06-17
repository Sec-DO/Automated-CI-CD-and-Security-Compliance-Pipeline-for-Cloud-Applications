"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Plus,
    Image as ImageIcon,
    MapPin,
    X,
    Camera,
    Upload,
} from "lucide-react";
import { ForumPost } from "@/lib/dummyForumPosts";

interface PostFormProps {
    onCreate: (newPost: ForumPost) => void;
}

export default function PostForm({ onCreate }: PostFormProps) {
    const [newPostContent, setNewPostContent] = useState("");
    const [newTrekTag, setNewTrekTag] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [showImagePreview, setShowImagePreview] = useState(false);

    const handlePost = async () => {
        if (!newPostContent.trim()) return;

        setIsPosting(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newPost: ForumPost = {
            id: `post-${Date.now()}`,
            user: {
                id: "user-you",
                name: "You",
                profilePic: "/users/you.jpg",
            },
            trek: newTrekTag || "Other",
            content: newPostContent,
            imageUrl: newImageUrl || undefined,
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString(),
        };

        onCreate(newPost);
        setNewPostContent("");
        setNewTrekTag("");
        setNewImageUrl("");
        setIsExpanded(false);
        setShowImagePreview(false);
        setIsPosting(false);
    };

    const handleImageUrlChange = (value: string) => {
        setNewImageUrl(value);
        setShowImagePreview(!!value);
    };

    const removeImage = () => {
        setNewImageUrl("");
        setShowImagePreview(false);
    };

    const suggestedTreks = [
        "Annapurna Circuit",
        "Everest Base Camp",
        "Kilimanjaro",
        "Inca Trail",
        "Mont Blanc",
        "K2 Base Camp",
    ];

    return (
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden mb-8">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-5">
                    {/* Enhanced Profile Picture */}
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg">
                            <Image
                                src="/users/you.jpg"
                                alt="Your profile"
                                width={56}
                                height={56}
                                className="w-full h-full rounded-full object-cover bg-white"
                            />
                        </div>
                        {/* Add post indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                            Share Your Adventure
                        </h3>
                        <p className="text-sm text-gray-500">
                            Tell the community about your trekking experience
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-4">
                    {/* Enhanced Textarea */}
                    <div className="relative">
                        <textarea
                            rows={isExpanded ? 5 : 3}
                            className="w-full border-2 border-gray-200 rounded-xl p-4 text-base resize-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 placeholder-gray-400 bg-gray-50/50 focus:bg-white"
                            placeholder="What's your latest adventure? Share your trekking story, tips, or experiences..."
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                        />

                        {/* Character count */}
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                            {newPostContent.length}/500
                        </div>
                    </div>

                    {/* Expanded Options */}
                    {isExpanded && (
                        <div className="space-y-4 animate-fade-in">
                            {/* Trek Tag Input */}
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    <label className="text-sm font-medium text-gray-700">
                                        Trek Location
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Which trek are you sharing about?"
                                    value={newTrekTag}
                                    onChange={(e) =>
                                        setNewTrekTag(e.target.value)
                                    }
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-gray-50/50 focus:bg-white"
                                />

                                {/* Suggested treks */}
                                {newTrekTag && (
                                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-10 max-h-32 overflow-y-auto">
                                        {suggestedTreks
                                            .filter((trek) =>
                                                trek
                                                    .toLowerCase()
                                                    .includes(
                                                        newTrekTag.toLowerCase()
                                                    )
                                            )
                                            .map((trek, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setNewTrekTag(trek)
                                                    }
                                                    className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-sm transition-colors duration-200"
                                                >
                                                    {trek}
                                                </button>
                                            ))}
                                    </div>
                                )}
                            </div>

                            {/* Image URL Input */}
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                                    <label className="text-sm font-medium text-gray-700">
                                        Add Photo
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Paste image URL or upload from device"
                                        value={newImageUrl}
                                        onChange={(e) =>
                                            handleImageUrlChange(e.target.value)
                                        }
                                        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-gray-50/50 focus:bg-white"
                                    />
                                    <button className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        <Upload className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Image Preview */}
                            {showImagePreview && newImageUrl && (
                                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 animate-scale-in">
                                    <Image
                                        src={newImageUrl}
                                        alt="Preview"
                                        width={400}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                        onError={() =>
                                            setShowImagePreview(false)
                                        }
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    {/* Image overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            {!isExpanded && (
                                <>
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300 text-sm"
                                    >
                                        <Camera className="w-4 h-4" />
                                        <span>Photo</span>
                                    </button>
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300 text-sm"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        <span>Location</span>
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {isExpanded && (
                                <button
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setNewPostContent("");
                                        setNewTrekTag("");
                                        setNewImageUrl("");
                                        setShowImagePreview(false);
                                    }}
                                    className="px-4 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                onClick={handlePost}
                                disabled={!newPostContent.trim() || isPosting}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none"
                            >
                                {isPosting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Posting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        <span>Share Post</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/30 transition-all duration-300 pointer-events-none" />

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
