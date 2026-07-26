"use client";

import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Eye, Mountain, LogIn } from "lucide-react";
import Modal from "../common/Modal";

type TrekCardProps = {
    _id: string;
    title: string;
    thumbnail: string;
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
};

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "from-green-400 to-emerald-500";
        case "moderate":
            return "from-yellow-400 to-orange-500";
        case "hard":
        case "difficult":
            return "from-red-400 to-red-600";
        default:
            return "from-emerald-400 to-teal-500";
    }
};

const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        case "moderate":
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        default:
            return (
                <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            );
    }
};

export default function TrekCard({
    _id,
    title,
    thumbnail,
    price,
    startDate,
    endDate,
    difficulty,
}: TrekCardProps) {
    const formattedDate = `${format(new Date(startDate), "dd MMM")} - ${format(
        new Date(endDate),
        "dd MMM yyyy"
    )}`;
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    // Get authentication state
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => !!state.user?.token);

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
        } else {
            setShowModal(true);
        }
    };

    const handleProceedToCheckout = () => {
        setShowModal(false);
        router.push(`/checkout/${_id}`);
    };

    const handleLoginRedirect = () => {
        setShowLoginPrompt(false);
        sessionStorage.setItem("redirectAfterLogin", `/checkout/${_id}`);
        router.push("/login");
    };

    return (
        <>
            <div className="group relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getDifficultyColor(
                            difficulty
                        )} shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                        {getDifficultyIcon(difficulty)}
                        <span className="capitalize">{difficulty}</span>
                    </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        ₹{parseInt(price).toLocaleString()}
                    </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
                    <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2 leading-tight group-hover:text-emerald-300 transition-colors duration-300">
                            {title}
                        </h3>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-white/90">
                            <svg
                                className="w-4 h-4 text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="font-medium">{formattedDate}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Link
                                href={`/treks/${_id}`}
                                className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-stone-50 to-stone-100 hover:bg-white text-emerald-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                            >
                                <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                <span className="text-sm">View Details</span>
                            </Link>

                            <button
                                onClick={handleBookingClick}
                                className="group/btn flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <span className="text-sm">Book</span>
                                <svg
                                    className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300" />
            </div>

            {/* Login Prompt Modal */}
            {showLoginPrompt && (
                <Modal onClose={() => setShowLoginPrompt(false)}>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Login Required
                        </h3>
                        <p className="text-gray-600">
                            Please login to book{" "}
                            <span className="font-semibold text-emerald-600">
                                {title}
                            </span>
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-center gap-2 items-center mb-2">
                            <span className="text-gray-700">
                                Starting Price:
                            </span>
                            <span className="text-xl font-bold text-emerald-600">
                                ₹{price}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            Sign in to continue with your booking
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Login to Continue
                            <LogIn className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setShowLoginPrompt(false)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                        >
                            Maybe Later
                        </button>
                    </div>
                </Modal>
            )}

            {/* Booking Modal - Only shown for authenticated users */}
            {showModal && isAuthenticated && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mountain className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Ready for Your Adventure?
                        </h3>
                        <p className="text-gray-600">
                            Welcome back, {user?.name || "Trekker"}! Let&apos;s
                            get you booked for{" "}
                            <span className="font-semibold text-emerald-600">
                                {title}
                            </span>
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-center gap-2 items-center mb-2">
                            <span className="text-gray-700">
                                Starting Price:
                            </span>
                            <span className="text-xl font-bold text-emerald-600">
                                ₹{price}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            Final price will be calculated based on group size
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout
                            <svg
                                className="w-5 h-5"
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
                        </button>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                        >
                            Maybe Later
                        </button>
                    </div>
                </Modal>
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
