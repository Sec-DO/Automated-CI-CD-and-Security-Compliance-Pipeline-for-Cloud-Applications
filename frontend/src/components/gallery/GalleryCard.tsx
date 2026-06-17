"use client";

import { useState } from "react";
import { TrekGalleryItem } from "../../lib/dummyGalleryTreks";
import { useRouter } from "next/navigation";
import { UploadCloud, Eye, Users, Calendar } from "lucide-react";
import Image from "next/image";

interface GalleryCardProps {
    trek: TrekGalleryItem;
    isMember: boolean;
}

export default function GalleryCard({ trek, isMember }: GalleryCardProps) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleViewPhotos = () => {
        router.push(`/gallery/${trek.id}`);
    };

    const handleUploadClick = () => {
        if (!isMember) {
            setShowModal(true);
        } else {
            alert("Open upload modal (you are a member)");
        }
    };

    const thumbnail = trek.images[0]?.url;
    const formattedDate = new Date(trek.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <>
            <div className="group relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={`Thumbnail for ${trek.title}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 30vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                            <div className="text-center text-emerald-600">
                                <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-medium">
                                    No Preview
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Member Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm border border-white/20 ${
                            isMember
                                ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                                : "bg-gradient-to-r from-gray-400 to-gray-600"
                        }`}
                    >
                        <Users className="w-3 h-3" />
                        <span>{isMember ? "Member" : "Visitor"}</span>
                    </div>
                </div>

                {/* Photos Count Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        {trek.images.length} Photos
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
                    <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors duration-300">
                            {trek.title}
                        </h3>

                        {/* Details */}
                        <div className="space-y-2">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                <span className="font-medium">
                                    {formattedDate}
                                </span>
                            </div>

                            {/* Members */}
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span className="font-medium">
                                    {trek.totalMembers} Members
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleViewPhotos}
                                className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                <span className="text-sm">View Photos</span>
                            </button>

                            <button
                                onClick={handleUploadClick}
                                className={`group/btn flex items-center justify-center gap-2 px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    isMember
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white"
                                        : "bg-white/90 hover:bg-white text-gray-700"
                                }`}
                            >
                                <UploadCloud className="w-4 h-4 group-hover/btn:translate-y-[-2px] transition-transform duration-300" />
                                <span className="text-sm">Upload</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300" />
            </div>

            {/* Enhanced Modal for non-member restriction */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-2xl transform animate-scale-in border border-gray-100">
                        {/* Modal Header */}
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <UploadCloud className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Upload Restricted
                            </h3>
                            <p className="text-gray-600">
                                Only trek participants can upload photos
                            </p>
                        </div>

                        {/* Trek Details */}
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-6 border border-red-100">
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {trek.title}
                            </h4>
                            <div className="flex justify-between items-center text-sm text-gray-600">
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

                        {/* Action Button */}
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

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
