"use client";

import { useState } from "react";
import { dummyGalleryTreks } from "../../lib/dummyGalleryTreks";
import {
    Download,
    Upload,
    ArrowLeft,
    Users,
    Calendar,
    Image as ImageIcon,
    User,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrekGalleryPageProps {
    trekId: string;
}

export default function TrekGalleryPage({ trekId }: TrekGalleryPageProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const trek = dummyGalleryTreks.find((t) => t.id === trekId);
    const isMember = false; // You can make this dynamic

    if (!trek) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center text-center relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="relative z-10 bg-white rounded-2xl p-12 shadow-2xl border border-gray-100 max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Trek Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The requested trek gallery doesn&apos;t exist or has been
                        removed.
                    </p>
                    <Link href="/gallery">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Gallery
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleUploadClick = () => {
        if (!isMember) {
            setShowModal(true);
        } else {
            alert("Open upload modal (you are a member)");
        }
    };

    const formattedDate = new Date(trek.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <>
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

                <div className="relative z-10 py-8 px-4 md:px-8">
                    {/* Header Section */}
                    <div className="max-w-7xl mx-auto mb-12">
                        {/* Navigation & Title */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <Link href="/gallery">
                                    <button className="group flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white text-emerald-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-emerald-200">
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                                    </button>
                                </Link>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                                        {trek.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-emerald-500" />
                                            <span className="font-medium">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-emerald-500" />
                                            <span className="font-medium">
                                                {trek.totalMembers} Members
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ImageIcon className="w-4 h-4 text-emerald-500" />
                                            <span className="font-medium">
                                                {trek.images.length} Photos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleUploadClick}
                                className={`group flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    isMember
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                                        : "bg-white/90 hover:bg-white text-emerald-700 border border-emerald-200"
                                }`}
                            >
                                <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                <span>Upload Photo</span>
                            </button>
                        </div>

                        {/* Stats Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                                <div className="text-2xl font-bold text-emerald-600 mb-1">
                                    {trek.images.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    Total Photos
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                                <div className="text-2xl font-bold text-teal-600 mb-1">
                                    {
                                        new Set(
                                            trek.images.map(
                                                (img) => img.uploadedBy
                                            )
                                        ).size
                                    }
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    Contributors
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                                <div className="text-2xl font-bold text-cyan-600 mb-1">
                                    {trek.totalMembers}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    Members
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                                <div className="text-2xl font-bold text-indigo-600 mb-1">
                                    {Math.ceil(
                                        trek.images.length / trek.totalMembers
                                    )}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    Avg/Member
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {trek.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={img.url}
                                            alt={`Trek photo ${idx + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                                            onClick={() =>
                                                setSelectedImage(img.url)
                                            }
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                        {/* Download Button */}
                                        <a
                                            href={img.url}
                                            download
                                            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                                            title="Download"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>

                                        {/* Expand Button */}
                                        <button
                                            onClick={() =>
                                                setSelectedImage(img.url)
                                            }
                                            className="absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                                            title="View Full Size"
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                        </button>

                                        {/* Author Badge */}
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                                <User className="w-3 h-3" />
                                                <span className="font-medium">
                                                    {img.uploadedBy}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover effect border */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Full size preview"
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-scale-in"
                        />
                    </div>
                </div>
            )}

            {/* Upload Restriction Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-2xl transform animate-scale-in border border-gray-100">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Upload className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Upload Restricted
                            </h3>
                            <p className="text-gray-600">
                                Only trek participants can upload photos to this
                                album
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-6 border border-red-100">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                {trek.title}
                            </h4>
                            <div className="flex justify-center items-center text-sm text-gray-600 gap-4">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {trek.totalMembers} members
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

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

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </>
    );
}
