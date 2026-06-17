"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
    {
        name: "Anita Sharma",
        location: "Manali, HP",
        photo: "/landing/testimonials/anita.jpg",
        quote: "Foxtrail made my first Himalayan trek safe and unforgettable. The guides were amazing!",
    },
    {
        name: "Rohit Deshmukh",
        location: "Pune, MH",
        photo: "/landing/testimonials/rohit.jpg",
        quote: "A seamless booking experience and top-notch support. Can’t wait for my next trek!",
    },
    {
        name: "Priya Singh",
        location: "Rishikesh, UK",
        photo: "/landing/testimonials/priya.jpg",
        quote: "The community forum helped me prepare well. Friendly people and breathtaking trails!",
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0); // For quote animation

    function prev() {
        setIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
        setAnimationKey((prev) => prev + 1);
    }

    function next() {
        setIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setAnimationKey((prev) => prev + 1);
    }

    const { name, location, photo, quote } = testimonials[index];

    return (
        <section className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 py-6 sm:py-8 lg:py-10 overflow-hidden">
            {" "}
            {/* Reduced py */}
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
            </div>
            {/* Floating particles */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-700"></div>
                <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-500"></div>
            </div>
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Header */}
                <div className="mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up">
                    {" "}
                    {/* Reduced mb */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            What Our Trekkers Say
                        </span>
                    </h2>
                </div>

                {/* Testimonial Card with Navigation Wrapper */}
                <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-6">
                    {" "}
                    {/* Flex container for layout */}
                    {/* Previous Button */}
                    <button
                        aria-label="Previous testimonial"
                        onClick={prev}
                        className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 flex-shrink-0"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    {/* Testimonial Card */}
                    <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-4 lg:p-8 shadow-xl border border-emerald-100/50 animate-fade-in-up delay-200 w-full sm:w-[120%]">
                        <div className="flex flex-col items-center space-y-5 sm:space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0 text-left">
                            <div className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-2 border-emerald-300 group">
                                <Image
                                    width={128}
                                    height={128}
                                    src={photo}
                                    alt={`${name} photo`}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent"></div>
                            </div>

                            <div className="flex flex-col items-center md:items-start space-y-2 sm:space-y-2 flex-grow">
                                <p
                                    key={animationKey}
                                    className="text-gray-700 italic text-lg sm:text-xl max-w-xl leading-relaxed animate-fade-in text-center md:text-left"
                                >
                                    “{quote}”
                                </p>
                                <p className="font-semibold text-lg sm:text-xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                                    {name}
                                </p>
                                <p className="text-gray-600 text-sm sm:text-base font-light">
                                    {location}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Next Button */}
                    <button
                        aria-label="Next testimonial"
                        onClick={next}
                        className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 flex-shrink-0"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Style block for animations */}
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

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
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
