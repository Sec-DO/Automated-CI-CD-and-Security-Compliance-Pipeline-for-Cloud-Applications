"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/bookings/BookingCard";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-hot-toast";
import { cancelBooking, getUserBookings } from "@/api/operations/bookingAPIs";
import {
    Calendar,
    MapPin,
} from "lucide-react";
import Link from "next/link";

interface Booking {
    _id: string;
    trekId: {
        _id: string;
        title: string;
        thumbnail: string;
        price: string;
        startDate: string;
    };
    amountPaid: number;
    paymentStatus: string;
    bookingStatus: string;
    createdAt: string;
    groupType: string;
    adultCount: number;
    childCount: number;
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.user?.token);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token) {
                toast.loading("Fetching bookings...");
                setLoading(false);
                return;
            }
            try {
                const res = await getUserBookings(token || "");
                const bookingsData = res.data.bookings || [];
                setBookings(bookingsData);
                toast.dismiss();
                toast.success("Bookings fetched successfully");
                setFilteredBookings(bookingsData);
            } catch (err) {
                toast.error("Failed to fetch bookings");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [token]);

    const handleCancelBooking = async (bookingId: string) => {
        if (!token || !bookingId) {
            toast.error("You need to be logged in to cancel bookings");
            return;
        }

        try {
            await cancelBooking(token, bookingId);
            toast.success("Booking cancelled successfully");
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, status: "cancelled" }
                        : booking
                )
            );
        } catch (err) {
            toast.error("Cancellation failed");
            console.error(err);
        }
    };

    // Loading Component
    const LoadingCard = () => (
        <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="flex gap-3 pt-4">
                    <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                </div>
            </div>
        </div>
    );

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

            <div className="relative z-10 py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-emerald-200">
                            <Calendar className="w-4 h-4" />
                            <span>Your Adventures</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                            My Bookings
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8 font-medium">
                            Track and manage your trek bookings.
                            <span className="text-emerald-600 font-semibold">
                                {" "}
                                View details
                            </span>
                            ,
                            <span className="text-teal-600 font-semibold">
                                {" "}
                                check status
                            </span>
                            , or
                            <span className="text-cyan-600 font-semibold">
                                {" "}
                                modify reservations
                            </span>
                            .
                        </p>
                    </div>

                    {/* Content Section */}
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <LoadingCard key={i} />
                            ))}
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-16 max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Calendar className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {bookings.length === 0
                                    ? "No Bookings Yet"
                                    : "No Matching Bookings"}
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {bookings.length === 0
                                    ? "Start your adventure journey by booking your first trek with us!"
                                    : "Try adjusting your search or filter criteria to find your bookings."}
                            </p>
                            {bookings.length === 0 && (
                                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <MapPin className="w-5 h-5" />
                                    <Link href="/treks">Explore Treks</Link>
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Results Count */}
                            <div className="mb-6 text-center">
                                <p className="text-gray-600 font-medium">
                                    Showing {filteredBookings.length} of{" "}
                                    {bookings.length} bookings
                                </p>
                            </div>

                            {/* Bookings Grid */}
                            <div className="grid gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredBookings.map((booking, index) => (
                                    <div
                                        key={booking._id}
                                        className="animate-fade-in-up"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <BookingCard
                                            booking={booking}
                                            onCancel={handleCancelBooking}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
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
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </main>
    );
}
