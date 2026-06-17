"use client";

import Image from "next/image";
import { Leader } from "../../lib/dummyLeaders";
import {
    Mountain,
    Star,
    Award,
    MapPin,
} from "lucide-react";
import { useState } from "react";

interface LeaderCardProps {
    leader: Leader;
}

const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
        case "lead guide":
        case "senior guide":
            return "from-emerald-400 to-emerald-600";
        case "trek leader":
            return "from-blue-400 to-blue-600";
        case "mountain guide":
            return "from-purple-400 to-purple-600";
        case "adventure guide":
            return "from-orange-400 to-orange-600";
        default:
            return "from-gray-400 to-gray-600";
    }
};

const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
        case "lead guide":
        case "senior guide":
            return <Award className="w-3 h-3" />;
        case "trek leader":
            return <Mountain className="w-3 h-3" />;
        case "mountain guide":
            return <MapPin className="w-3 h-3" />;
        default:
            return <Star className="w-3 h-3" />;
    }
};

export default function LeaderCard({ leader }: LeaderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group relative w-full max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {/* Enhanced Image Section */}
            <div className="relative w-full h-80 overflow-hidden">
                <Image
                    src={leader.imageUrl}
                    alt={leader.name}
                    fill
                    className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Loading placeholder */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                        <Mountain className="w-12 h-12 text-gray-400" />
                    </div>
                )}

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {/* Enhanced Role Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRoleColor(
                            leader.role
                        )} shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                        {getRoleIcon(leader.role)}
                        <span className="capitalize">{leader.role}</span>
                    </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
                        {leader.treksLed}+ Treks
                    </div>
                </div>

                {/* Bottom overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                        {leader.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium">
                            Adventure Leader
                        </span>
                    </div>
                </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="p-6 space-y-5">
                {/* Bio Section */}
                <div className="space-y-3">
                    <p
                        className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                            isExpanded ? "" : "line-clamp-3"
                        }`}
                    >
                        {leader.bio}
                    </p>

                    {leader.bio.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-emerald-600 hover:text-emerald-700 text-xs font-medium transition-colors duration-200"
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>

                {/* Enhanced Stats Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 space-y-4">
                    {/* Trek Stats */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                <Mountain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Treks Completed
                                </p>
                                <p className="font-bold text-emerald-700 text-lg">
                                    {leader.treksLed}+
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300 pointer-events-none" />
        </div>
    );
}
