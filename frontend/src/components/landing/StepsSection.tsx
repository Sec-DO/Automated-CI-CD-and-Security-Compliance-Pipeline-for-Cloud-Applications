"use client";
import { Compass, FilePlus, Mountain } from "lucide-react";
import Link from "next/link";

export default function StepsSection() {
    const steps = [
        {
            icon: (
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
            ),
            title: "Plan Your Trek",
            desc: "Browse our list of carefully curated treks and choose one that fits your vibe and schedule.",
            number: "01",
        },
        {
            // Changed from amber to teal
            icon: (
                <FilePlus className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500" />
            ),
            title: "Register Online",
            desc: "Sign up, provide your details, and complete the booking through our secure payment portal.",
            number: "02",
        },
        {
            // Changed from sky to emerald/teal emphasis
            icon: (
                <Mountain className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
            ),
            title: "Explore the Wild",
            desc: "Pack your bags and get ready to explore breathtaking trails with certified trek leaders.",
            number: "03",
        },
    ];

    return (
        <section className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 py-16 sm:py-10 lg:py-12 overflow-hidden">
            {/* Background Elements - Similar to AboutSection */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
            </div>

            {/* Floating particles - Similar to AboutSection */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-700"></div>
                <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Aligned with AboutSection h2 style */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                        <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            How It Works
                        </span>
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Simple steps to get started on your thrilling trekking
                        adventure.
                    </p>
                </div>

                {/* Steps Grid - Enhanced cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 hover:bg-white/80 hover:border-emerald-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
                            style={{ animationDelay: `${0.1 * index + 0.3}s` }} // Adjusted delay
                        >
                            {/* Step Number - Large, subtle, and gradient */}
                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                <span className="text-5xl sm:text-6xl font-extrabold opacity-10 bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:opacity-20 transition-opacity duration-300">
                                    {step.number}
                                </span>
                            </div>

                            <div className="relative z-10 text-center">
                                {/* Icon Container - Gradient background, scaled on hover */}
                                <div className="mb-6 sm:mb-8 flex justify-center">
                                    <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Title - Gradient on hover */}
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-emerald-700 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Connecting Line - Styled similarly, removed from individual cards (will add globally if needed) */}
                            {/* For a connecting line between cards in a grid, it's often done with pseudo-elements or a separate structure */}
                        </div>
                    ))}
                </div>

                {/* Call to Action - Consistent with the AboutSection button */}
                <div className="mt-16 animate-fade-in-up delay-1000 flex justify-center">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                        <Link 
                        href="/treks"
                        className="relative z-10 flex items-center gap-2">
                            Browse Our Treks
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                        </Link>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </button>
                </div>
            </div>

            {/* Re-include the style block for animations, as it's a shared utility */}
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

                @keyframes bounce-subtle {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .delay-600 {
                    animation-delay: 0.6s;
                }
                .delay-700 {
                    animation-delay: 0.7s;
                }
                .delay-800 {
                    animation-delay: 0.8s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}
