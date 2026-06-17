"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const heroImages = [
    "/landing/hero-carausel-1.jpeg",
    "/landing/hero-carausel-2.jpeg",
    "/landing/hero-carausel-3.jpeg",
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change image every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[93vh] flex items-center justify-center text-white overflow-hidden">
            {/* Background Image with smooth transition */}
            <div className="absolute inset-0">
                {heroImages.map((image, index) => (
                    <Image
                        key={image}
                        src={image}
                        alt="Trekking in the mountains"
                        fill
                        className={`object-cover transition-opacity duration-1000 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                        priority={index === 0}
                    />
                ))}
            </div>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-emerald-900/40 z-0" />

            {/* Subtle animated particles effect */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Main Heading with enhanced typography */}
                <div className="mb-4">
                    <div className="inline-block">
                        <span className="text-sm font-medium tracking-widest text-emerald-300 uppercase mb-2 block animate-fade-in-up">
                            From Sahyadri&apos;s to Himalayas
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in-up delay-300">
                            Discover
                            <span className="block text-4xl md:text-6xl mt-1">
                                Breathtaking
                            </span>
                            <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                                Treks in India
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Enhanced Description */}
                <div className="mb-6 animate-fade-in-up delay-500">
                    <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-100 font-light">
                        Join{" "}
                        <span className="font-semibold text-emerald-300">
                            Foxtrail India
                        </span>{" "}
                        and explore the wild like never before.
                    </p>
                    <p className="text-base md:text-lg mt-2 max-w-3xl mx-auto text-gray-300 font-light">
                        From serene trails to adventurous climbs, discover your
                        next unforgettable journey.
                    </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-700">
                    <a href="#treks-section">
                        <button className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-base min-w-[180px]">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View Treks
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
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                        </button>
                    </a>

                    <Link href="/forum">
                        <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full shadow-2xl border border-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-300 text-base min-w-[180px]">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Join Community
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
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </span>
                        </button>
                    </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 animate-fade-in-up delay-1000">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span>500+ Happy Trekkers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span>50+ Destinations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span>Expert Guides</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-3">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-emerald-400 scale-125"
                                    : "bg-white/50 hover:bg-white/70"
                            }`}
                        />
                    ))}
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
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }

                .delay-500 {
                    animation-delay: 0.5s;
                }

                .delay-700 {
                    animation-delay: 0.7s;
                }

                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}
