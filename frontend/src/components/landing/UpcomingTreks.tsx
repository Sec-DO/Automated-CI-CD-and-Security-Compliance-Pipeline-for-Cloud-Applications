"use client";

import { useEffect, useState } from "react";
import { getAllTreks } from "@/api/operations/trekAPIs";
import TrekCard from "../treks/TrekCard";
import { Trek } from "@/lib/dummyTreks";
// import { useAuthStore } from "@/stores/authStore";

export default function UpcomingTreks() {
    // const token = useAuthStore((state) => state.user?.token);
    const [upcomingTreks, setUpcomingTreks] = useState<Trek[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchTreks = async () => {
            setLoading(true);
            try {
                const response = await getAllTreks();
                const allTreks = response.data || [];
                setUpcomingTreks(
                    allTreks.filter(
                        (t: { thisTrekIs: string }) =>
                            t.thisTrekIs === "upcoming"
                    )
                );
            } catch (error) {
                console.error("Failed to fetch upcoming treks:", error);
                setUpcomingTreks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTreks();
    }, []);

    return (
        <section
            id="treks-section"
            className="relative bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-6 sm:py-8 lg:py-4 overflow-hidden"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-teal-400 rounded-full blur-3xl"></div>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header */}
                <div className="mb-12 sm:mb-16 lg:mb-10 text-center animate-fade-in-up">
                    <div className="inline-block">
                        <span className="text-sm font-medium tracking-widest text-emerald-600 uppercase mb-3 block">
                            Your Next Journey
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4">
                            <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Book Your Next
                            </span>
                            <span className="block bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                                Adventure
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                            Discover breathtaking trails and create
                            unforgettable memories with our curated trekking
                            experiences
                        </p>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-16 sm:py-20 animate-fade-in-up delay-300">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="text-emerald-700 font-medium mt-6 text-lg">
                            Loading amazing adventures...
                        </p>
                        <div className="flex space-x-1 mt-4">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                ) : upcomingTreks.length === 0 ? (
                    <div className="text-center py-16 sm:py-20 lg:py-24 animate-fade-in-up delay-300">
                        <div className="max-w-md mx-auto">
                            {/* Enhanced empty state icon */}
                            <div className="relative mb-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <svg
                                        className="w-12 h-12 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                New Adventures Coming Soon
                            </h3>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                We&apos;re planning amazing new treks for you.
                                <span className="block mt-2 text-emerald-700 font-medium">
                                    Check back soon for incredible journeys!
                                </span>
                            </p>

                            {/* Call to action */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Notify Me
                                        <svg
                                            className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 17h5l-5 5-5-5h5v-12"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                <button className="group px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-emerald-700 font-semibold rounded-full shadow-lg border border-emerald-200 hover:border-emerald-300 transform hover:scale-105 transition-all duration-300">
                                    <span className="flex items-center gap-2">
                                        Browse Past Treks
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in-up delay-300">
                        {/* Trek count indicator */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                {upcomingTreks.length} Adventure
                                {upcomingTreks.length !== 1 ? "s" : ""}{" "}
                                Available
                            </div>
                        </div>

                        {/* Enhanced grid */}
                        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {upcomingTreks.map((trek, index) => (
                                <div
                                    key={trek._id}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <TrekCard {...trek} />
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="text-center mt-12 sm:mt-16 animate-fade-in-up delay-700">
                            <p className="text-gray-600 mb-6 text-lg">
                                Can&apos;t find the perfect adventure?
                            </p>
                            <a href="tel:+919763810639">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Request for custom plan
                                        <svg
                                            className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                            />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                                </button>
                            </a>
                        </div>
                    </div>
                )}
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
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }

                .delay-700 {
                    animation-delay: 0.7s;
                }
            `}</style>
        </section>
    );
}
