"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
// import { toast } from "react-hot-toast";
import {
    X,
    Eye,
    Calendar,
    IndianRupee,
    CreditCard,
    AlertCircle,
    CheckCircle,
    Clock,
    User,
    Users,
} from "lucide-react";
import Modal from "../common/Modal";

interface BookingCardProps {
    booking: {
        _id: string;
        trekId: {
            _id: string;
            title: string;
            thumbnail: string;
            price: string;
            startDate: string;
        };
        amountPaid: number;
        groupType: string;
        adultCount: number;
        childCount: number;
        paymentStatus: string;
        bookingStatus: string;
        createdAt: string;
    };
    onCancel: (bookingId: string) => void;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "confirmed": 
            return "from-emerald-500 to-teal-600";
        case "cancelled":
            return "from-red-500 to-red-600";
    }
};

const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case "confirmed":
            return <CheckCircle className="w-4 h-4" />;
        case "cancelled":
            return <X className="w-4 h-4" />;
        default:
            return <AlertCircle className="w-4 h-4" />;
    }
};

const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus.toLowerCase()) {
        case "paid":
            return "text-emerald-600 bg-emerald-50";
        case "cancelled":
            return "text-red-600 bg-red-50";
        default:
            return "text-gray-600 bg-gray-50";
    }
};

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const router = useRouter();

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        setIsCancelling(true);
        try {
            await onCancel(booking._id);
            setShowCancelModal(false);
        } catch (error) {
            console.error("Cancel error:", error);
        } finally {
            setIsCancelling(false);
        }
    };

    const handleViewDetails = () => {
        router.push(`/treks/${booking.trekId._id}`);
    };

    const formattedTrekDate = format(
        new Date(booking.trekId.startDate),
        "dd MMM yyyy"
    );
    const formattedBookingDate = format(
        new Date(booking.createdAt),
        "dd MMM yyyy"
    );

    return (
        <>
            <div className="group relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={booking.trekId.thumbnail}
                        alt={booking.trekId.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300 pointer-events-none" />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(
                            booking.bookingStatus
                        )} shadow-lg backdrop-blur-sm border border-white/20`}
                    >
                        {getStatusIcon(booking.bookingStatus)}
                        <span className="capitalize">{booking.bookingStatus}</span>
                    </div>
                </div>

                {/* Amount Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        ₹{booking.amountPaid.toLocaleString()}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                        {booking.trekId.title}
                    </h3>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Trek Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    Trek Date
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {formattedTrekDate}
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <IndianRupee className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    Amount Paid
                                </div>
                                <div className="font-semibold text-gray-900">
                                    ₹{booking.amountPaid.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    Payment status
                                </div>
                                <div
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                                        booking.paymentStatus
                                    )}`}
                                >
                                    {booking.paymentStatus}
                                </div>
                            </div>
                        </div>

                        {/* Booking Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    Booked On
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {formattedBookingDate}
                                </div>
                            </div>
                        </div>

                        {/* No. of Adults */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    No. of Adults
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {booking.adultCount}
                                </div>
                            </div>
                        </div>

                        {/* No. of Children */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="font-medium text-gray-500 text-xs">
                                    No. of Children
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {booking.childCount || 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleViewDetails}
                            className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-stone-50 to-stone-100 hover:bg-white/50 text-emerald-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                            <span>View Details</span>
                        </button>

                        {booking.bookingStatus.toLowerCase() !== "cancelled" && (
                            <button
                                onClick={handleCancelClick}
                                className="group/btn flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <X className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                                <span>Cancel</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <Modal onClose={() => setShowCancelModal(false)}>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Cancel Booking?
                        </h3>
                        <p className="text-gray-600">
                            Are you sure you want to cancel this trek booking?
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-6 border border-red-100">
                        <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                            {booking.trekId.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-center">
                                <div className="text-gray-500 text-xs">
                                    Trek Date
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {formattedTrekDate}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-500 text-xs">
                                    Amount
                                </div>
                                <div className="font-semibold text-red-600">
                                    ₹{booking.amountPaid.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
                        <p className="text-amber-800 text-sm font-medium">
                            ⚠️ Cancellation may incur charges as per our policy
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowCancelModal(false)}
                            disabled={isCancelling}
                            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
                        >
                            Keep Booking
                        </button>
                        <button
                            onClick={handleConfirmCancel}
                            disabled={isCancelling}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isCancelling ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Cancelling...</span>
                                </>
                            ) : (
                                <>
                                    <X className="w-4 h-4" />
                                    <span>Yes, Cancel</span>
                                </>
                            )}
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
