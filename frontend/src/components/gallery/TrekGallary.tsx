"use client";

import { dummyGalleryTreks } from "../../lib/dummyGalleryTreks";
import GalleryCard from "./GalleryCard";

export const metadata = {
    title: "Photo Gallery - Paaydal Trekkers",
    description:
        "Explore trek memories and shared moments from past adventures.",
};

export default function TrekGallery() {
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

            <div className="relative z-10 py-16 px-4 sm:px-8">
                {/* Hero Section */}
                <section className="text-center mb-16 max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-emerald-200">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Community Memories</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                        Trek Galleries
                    </h1>

                    {/* Subtitle with enhanced styling */}
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8 font-medium">
                        Explore amazing trek moments captured by our community.
                        <span className="text-emerald-600 font-semibold">
                            {" "}
                            View photos
                        </span>{" "}
                        or
                        <span className="text-teal-600 font-semibold">
                            {" "}
                            contribute your own!
                        </span>
                    </p>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 mb-1">
                                {dummyGalleryTreks.length}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                Trek Albums
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600 mb-1">
                                {dummyGalleryTreks.reduce(
                                    (total, trek) => total + trek.images.length,
                                    0
                                )}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                Total Photos
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-600 mb-1">
                                {dummyGalleryTreks.reduce(
                                    (total, trek) => total + trek.totalMembers,
                                    0
                                )}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                Contributors
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <svg
                                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>Upload Photos</span>
                        </button>
                        <button className="group flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white text-emerald-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-emerald-200">
                            <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span>Search Albums</span>
                        </button>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                Recent Adventures
                            </h2>
                            <p className="text-gray-600">
                                Latest photo collections from our trekking
                                community
                            </p>
                        </div>

                        {/* Filter/Sort Options */}
                        <div className="hidden md:flex items-center gap-3">
                            <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200">
                                <option>Recent First</option>
                                <option>Most Photos</option>
                                <option>Most Members</option>
                            </select>
                            <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <svg
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {dummyGalleryTreks.map((trek, index) => (
                            <div
                                key={trek.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <GalleryCard
                                    trek={trek}
                                    isMember={Math.random() > 0.5} // Random for demo
                                />
                            </div>
                        ))}
                    </div>

                    {/* Load More Section */}
                    <div className="text-center mt-16">
                        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <span>Load More Adventures</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </button>
                    </div>
                </section>
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
