"use client";

import Image from "next/image";
import {
    ArrowLeft,
    Calendar,
    Users,
    Mountain,
    MapPin,
    Clock,
    Star,
    Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTrekById } from "@/api/operations/trekAPIs";
// import { useAuthStore } from "@/stores/authStore";
// import toast from "react-hot-toast";
// import { userTrekBooking } from "@/api/operations/bookingAPIs";

interface Leader {
    name: string;
    photo: string;
    experience?: string;
    treksLed?: number;
    bio?: string;
}

export interface Trek {
    _id: string;
    title: string;
    imageUrls: string[];
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
    seatsAvailable: number;
    description: string;
    commute: string;
    stops: string[];
    schedule: string[];
    foodStops?: string[];
    locationsToView?: string[];
    aboutDestination?: string;
    whoCanCome: string;
    preparationTips?: string[];
    leaders?: Leader[];
    facilities?: string[];
}

export default function TrekDetails({ trekId }: { trekId: string }) {
    const router = useRouter();
    // const carouselRef = useRef<HTMLDivElement | null>(null);
    const [trek, setTrek] = useState<Trek | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const token = useAuthStore((state) => state.user?.token);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {

        const fetchTrek = async () => {
            try {
                const response = await getTrekById(trekId);
                setTrek(response.data);
                console.log("Fetched trek data:", response.data);
            } catch (err) {
                console.error("Error fetching trek:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrek();
    }, [trekId]);

    useEffect(() => {
        if (!trek?.imageUrls?.length) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % trek.imageUrls.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [trek?.imageUrls?.length]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "text-green-600 bg-green-100";
            case "moderate":
                return "text-yellow-600 bg-yellow-100";
            case "hard":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const InfoCard = ({
        icon: Icon,
        title,
        content,
        className = "",
    }: {
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        title: string;
        content: string | number;
        className?: string;
    }) => (
        <div
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
        >
            <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600 ml-13">{content}</p>
        </div>
    );

    const SectionCard = ({
        title,
        children,
        className = "",
    }: {
        title: string;
        children: React.ReactNode;
        className?: string;
    }) => (
        <div
            className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-6 flex items-center">
                {title}
            </h2>
            {children}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <p className="text-gray-600 font-medium">
                        Loading trek details...
                    </p>
                </div>
            </div>
        );
    }

    if (!trek) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Mountain className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Trek Not Found
                    </h2>
                    <p className="text-gray-600">
                        The trek you&apos;re looking for doesn&apos;t exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
            {/* Hero Section with Image Carousel */}
            <div className="relative h-[70vh] overflow-hidden">
                {/* Image Carousel */}
                <div className="relative h-full">
                    {trek.imageUrls.map((src, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                idx === currentImageIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <Image
                                src={src}
                                alt={`${trek.title} - View ${idx + 1}`}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex space-x-2">
                        {trek.imageUrls.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-4">
                            <span
                                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(
                                    trek.difficulty
                                )}`}
                            >
                                {trek.difficulty} Trek
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            {trek.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-lg">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5" />
                                <span>
                                    {new Date(
                                        trek.startDate
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                        trek.endDate
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5" />
                                <span>{trek.seatsAvailable} seats left</span>
                            </div>
                            <div className="flex items-center space-x-2 text-2xl font-bold text-emerald-300">
                                <span>₹{trek.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <InfoCard
                                icon={Calendar}
                                title="Duration"
                                content={`${Math.ceil(
                                    (new Date(trek.endDate).getTime() -
                                        new Date(trek.startDate).getTime()) /
                                        (1000 * 60 * 60 * 24)
                                )} days`}
                            />
                            <InfoCard
                                icon={Users}
                                title="Available Seats"
                                content={trek.seatsAvailable}
                                className={
                                    trek.seatsAvailable <= 5
                                        ? "ring-2 ring-red-200"
                                        : ""
                                }
                            />
                        </div>

                        {/* Description */}
                        {trek.description && (
                            <SectionCard title="About This Trek">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {trek.description}
                                </p>
                            </SectionCard>
                        )}

                        {/* About Destination */}
                        {trek.aboutDestination && (
                            <SectionCard title="About The Destination">
                                <p className="text-gray-700 leading-relaxed">
                                    {trek.aboutDestination}
                                </p>
                            </SectionCard>
                        )}

                        {/* Commute Route */}
                        <SectionCard title="🚌 Commute Route">
                            <p className="text-gray-700 leading-relaxed">
                                {trek.commute}
                            </p>
                        </SectionCard>

                        {/* Stops & Schedule Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <SectionCard title="📍 Stops">
                                <ul className="space-y-3">
                                    {trek.stops.map((stop, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                                                {idx + 1}
                                            </div>
                                            <span className="text-gray-700">
                                                {stop}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard title="⏰ Schedule">
                                <ul className="space-y-3">
                                    {trek.schedule.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start space-x-3"
                                        >
                                            <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>
                        </div>

                        {/* Additional Sections */}
                        {trek.locationsToView && (
                            <SectionCard title="🏔️ Scenic Locations">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {trek.locationsToView.map(
                                        (location, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center space-x-3 p-3 bg-emerald-50/50 rounded-xl"
                                            >
                                                <MapPin className="w-5 h-5 text-emerald-600" />
                                                <span className="text-gray-700">
                                                    {location}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </SectionCard>
                        )}

                        {trek.foodStops && (
                            <SectionCard title="🍽️ Food Stops">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {trek.foodStops.map((stop, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-xl"
                                        >
                                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                🍽️
                                            </div>
                                            <span className="text-gray-700">
                                                {stop}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {/* Preparation Tips */}
                        {trek.preparationTips && (
                            <SectionCard title="💡 Preparation Tips">
                                <div className="grid gap-4">
                                    {trek.preparationTips.map((tip, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50"
                                        >
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                                                💡
                                            </div>
                                            <span className="text-gray-700">
                                                {tip}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {/* Who Can Come */}
                        <SectionCard title="👥 Who Can Join">
                            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                <p className="text-gray-700 leading-relaxed">
                                    {trek.whoCanCome}
                                </p>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Booking Card */}
                        <div className="sticky top-8">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100/50 shadow-2xl">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                        ₹{trek.price}
                                    </div>
                                    <p className="text-gray-600">per person</p>
                                </div>

                                <button
                                    onClick={() => setShowModal(true)}
                                    disabled={trek.seatsAvailable <= 0}
                                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                        trek.seatsAvailable <= 0
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40"
                                    }`}
                                >
                                    {trek.seatsAvailable <= 0
                                        ? "Fully Booked"
                                        : "Book This Adventure"}
                                </button>

                                {trek.seatsAvailable <= 5 &&
                                    trek.seatsAvailable > 0 && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                                            <p className="text-red-700 text-sm font-medium text-center">
                                                ⚠️ Only {trek.seatsAvailable}{" "}
                                                seats left!
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Trek Leaders */}
                        {trek.leaders && (
                            <SectionCard title="🏔️ Your Trek Leaders">
                                <div className="space-y-4">
                                    {trek.leaders.map((leader, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100/50"
                                        >
                                            <div className="relative">
                                                <Image
                                                    src={leader.photo}
                                                    alt={leader.name}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-full object-cover w-[60px] h-[60px] border-2 border-emerald-200"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                    <Star className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800 mb-1">
                                                    {leader.name}
                                                </h3>
                                                {leader.treksLed && (
                                                    <p className="text-sm text-emerald-600 font-medium mb-1">
                                                        {leader.treksLed} treks
                                                        led
                                                    </p>
                                                )}
                                                {leader.bio && (
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {leader.bio}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {/* Facilities */}
                        {trek.facilities && (
                            <SectionCard title="🛡️ What's Included">
                                <div className="space-y-3">
                                    {trek.facilities.map((facility, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-xl"
                                        >
                                            <Shield className="w-5 h-5 text-green-600" />
                                            <span className="text-gray-700">
                                                {facility}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-scale-up">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mountain className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Ready for Your Adventure?
                            </h3>
                            <p className="text-gray-600">
                                Let&apos;s get you booked for{" "}
                                <span className="font-semibold text-emerald-600">
                                    {trek.title}
                                </span>
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex justify-center gap-2 items-center mb-2">
                                <span className="text-gray-700">
                                    Starting Price:
                                </span>
                                <span className="text-xl font-bold text-emerald-600">
                                    ₹{trek.price}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Final price will be calculated based on group
                                size
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    // Close modal first
                                    setShowModal(false);

                                    // Redirect to checkout page with trek ID
                                    router.push(`/checkout/${trek._id}`);
                                }}
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
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes scale-up {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-scale-up {
                    animation: scale-up 0.3s ease-out forwards;
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
