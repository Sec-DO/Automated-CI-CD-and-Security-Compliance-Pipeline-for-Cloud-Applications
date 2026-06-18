"use client";

import { getAllTreks } from "@/api/operations/trekAPIs";
import TrekCard from "./TrekCard";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

type Trek = {
    _id: string;
    title: string;
    thumbnail: string;
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
    thisTrekIs: string;
};

export default function TreksPage() {
    const token = useAuthStore((state) => state.user?.token);
    const [upcomingTreks, setUpcomingTreks] = useState<Trek[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const fetchTreks = async () => {
            if (!token) {
                console.error("No authentication token found.");
                setLoading(false);
                return;
            }
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
                console.error("Error fetching treks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTreks();
    }, [token]);

    const SectionHeader = ({
        title,
        subtitle,
        delay = 0,
    }: {
        title: string;
        subtitle?: string;
        delay?: number;
    }) => (
        <div
            className={`text-center mb-12 animate-fade-in-up`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="inline-block">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                    {title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
                {subtitle && (
                    <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );

    const EmptyState = ({
        title,
        subtitle,
        delay = 0,
    }: {
        title: string;
        subtitle: string;
        delay?: number;
    }) => (
        <div
            className={`text-center py-16 animate-fade-in-up`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative inline-block">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl scale-150"></div>

                {/* Mountain icon */}
                <div className="relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full flex items-center justify-center border border-emerald-100/50">
                    <svg
                        className="w-12 h-12 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 3L12 10L19 3"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 21h18"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 15l4-6 4 6"
                        />
                    </svg>
                </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">{subtitle}</p>
        </div>
    );

    const LoadingState = () => (
        <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">
                Loading amazing treks...
            </p>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <LoadingState />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
            {/* Hero Section */}
            <section className="relative py-8 lg:py-10 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-2xl"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-200/40 to-emerald-200/40 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full blur-xl"></div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in-up">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-semibold rounded-full mb-6 border border-emerald-200/50">
                            Explore Amazing Adventures
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent mb-6 leading-tight">
                            Discover Your Next
                            <span className="block">Trek Adventure</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            From challenging mountain peaks to serene forest
                            trails, find the perfect trek that matches your
                            adventure spirit
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Treks */}
            <section className="py-4 lg:py-6">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="Upcoming Treks"
                        subtitle="Join us on these exciting upcoming adventures and create memories that will last a lifetime"
                        delay={200}
                    />

                    {upcomingTreks.length === 0 ? (
                        <EmptyState
                            title="No upcoming treks at the moment"
                            subtitle="Check back soon for new adventures! We're constantly planning exciting new treks for you."
                            delay={400}
                        />
                    ) : (
                        <div className="grid gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {upcomingTreks.map((trek, index) => (
                                <div
                                    key={trek._id}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${
                                            400 + index * 100
                                        }ms`,
                                    }}
                                >
                                    <TrekCard {...trek} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 lg:py-20 mt-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-300 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-300 rounded-full blur-xl"></div>
                </div>

                <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready for Your Next Adventure?
                        </h2>
                        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Don&apos;t see the perfect trek? Contact us to
                            create a custom adventure tailored just for you and
                            your group.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="tel:+919763810639">
                                <button className="group px-8 py-4 bg-emerald-800/50 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-emerald-800/70 transition-all duration-300 min-w-[200px]">
                                    <span className="flex items-center justify-center gap-2">
                                        Contact Us
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
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Styles */}
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

                .delay-100 {
                    animation-delay: 0.1s;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
            `}</style>
        </div>
    );
}
