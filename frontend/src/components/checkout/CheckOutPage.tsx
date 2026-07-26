/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
"use client";
import { useEffect, useState } from "react";
import { Trek } from "@/lib/dummyTreks";
import { getTrekById } from "@/api/operations/trekAPIs";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { createOrder, verifyPayment } from "@/api/operations/paymentsAPIs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { TrekDetailsCard } from "./TrekDetailsCard";
import { GroupSelectionCard } from "./GroupSelectionCard";
import { PricingSidebar } from "./PricingSidebar";
import { CheckoutModals } from "./CheckoutModals";

// Extend Window interface to include Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage({ trekId }: { trekId: string }) {
    const [trekDetails, setTrekDetails] = useState<Trek | null>(null);
    const [groupType, setGroupType] = useState("Solo");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.user?.token);
    const router = useRouter();

    const handleBackClick = () => setShowCancelModal(true);
    const handleConfirmLeave = () => {
        setShowCancelModal(false);
        router.push("/treks");
    };
    const handleStayOnPage = () => setShowCancelModal(false);
    const handleSuccessRedirect = () => setShowSuccessModal(true);
    const handleRetryPayment = () => {
        setShowErrorModal(false);
        handlePayment();
    };

   useEffect(() => {
       if (!token || !user) {
           sessionStorage.setItem("redirectAfterLogin", `/checkout/${trekId}`);
           router.push("/login");
       }
   }, [router, token, user, trekId]);

    useEffect(() => {
        if (!trekId) {
            setIsLoading(false);
            setError("Missing trek ID or authentication token");
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await getTrekById(trekId);
                setTrekDetails(res.data);
            } catch (err) {
                console.error("Error fetching trek:", err);
                setError("Failed to load trek details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [trekId, token]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading trek details...</p>
                </div>
            </div>
        );
    }

    if (error || !trekDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        {error || "Trek not found"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const calculateTotal = () => {
        const adultCost = adults * Number(trekDetails.price);
        const childCost = children * Number(trekDetails.price) * 0.6;
        const subtotal = adultCost + childCost;
        return Number(Math.max(0, subtotal - discount));
    };

    const handleCouponApply = () => {
        const upperCaseCoupon = coupon.trim().toUpperCase();
        if (upperCaseCoupon === "PAAYDAL100") {
            setDiscount(100);
        } else if (upperCaseCoupon === "") {
            setDiscount(0);
        } else {
            setDiscount(0);
            alert("Invalid coupon code");
        }
    };

    const handlePayment = async () => {
        if (!token || !user || !groupType || adults < 1) {
            toast.error("Please complete all required fields");
            return;
        }

        const totalAmount = calculateTotal();
        if (totalAmount <= 0) {
            toast.error("Invalid total amount");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await createOrder(token, totalAmount);
            if (!response?.data?.id) {
                throw new Error("Order creation failed");
            }

            const data = response.data;
            const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            if (!razorpayKeyId || typeof window.Razorpay === "undefined") {
                throw new Error("Razorpay not configured properly");
            }

            const options = {
                key: razorpayKeyId,
                amount: data.amount,
                currency: data.currency || "INR",
                name: "Foxtrail India Adventures",
                description: `Trek Booking - ${trekDetails.title}`,
                order_id: data.id,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await verifyPayment(
                            token,
                            response.razorpay_payment_id,
                            response.razorpay_order_id,
                            response.razorpay_signature,
                            trekId,
                            totalAmount,
                            groupType,
                            adults,
                            children,
                        );

                        if (verifyRes?.data?.status === "success") {
                            handleSuccessRedirect();
                        } else {
                            setShowErrorModal(true);
                        }
                    } catch (verifyError) {
                        console.error("Verification error:", verifyError);
                        alert(
                            "Payment completed but verification failed. Please contact support."
                        );
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                },
                theme: {
                    color: "#10b981",
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", function (response: any) {
                console.error("Payment failed:", response.error);
                alert(
                    `Payment failed: ${
                        response.error.description || "Unknown error"
                    }`
                );
                setIsProcessing(false);
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert(
                `Payment failed: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            setIsProcessing(false);
        }
    };

    const totalAmount = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="relative text-center mb-8 animate-fade-in-up">
                    <button
                        className="group absolute left-0 top-0 flex items-center justify-center w-12 h-12 bg-white/90 hover:bg-white text-emerald-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm border border-emerald-200"
                        onClick={handleBackClick}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>

                    <div>
                        <span className="text-sm font-medium tracking-widest text-emerald-600 uppercase mb-2 block">
                            Complete Your Adventure
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Trek Checkout
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Secure your spot on this incredible journey
                        </p>
                    </div>
                </div>

                {/* Main Container */}
                <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up delay-300">
                    <div className="grid lg:grid-cols-3 gap-8 h-full">
                        {/* Left Column - Trek Details and Group Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            <TrekDetailsCard trekDetails={trekDetails} />
                            <GroupSelectionCard
                                groupType={groupType}
                                setGroupType={setGroupType}
                                adults={adults}
                                setAdults={setAdults}
                                children={children}
                                setChildren={setChildren}
                            />
                        </div>

                        {/* Right Column - Pricing Sidebar */}
                        <PricingSidebar
                            trekDetails={trekDetails}
                            adults={adults}
                            children={children}
                            coupon={coupon}
                            setCoupon={setCoupon}
                            discount={discount}
                            onCouponApply={handleCouponApply}
                            totalAmount={totalAmount}
                            groupType={groupType}
                            isProcessing={isProcessing}
                            onPayment={handlePayment}
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CheckoutModals
                showSuccessModal={showSuccessModal}
                showErrorModal={showErrorModal}
                showCancelModal={showCancelModal}
                trekDetails={trekDetails}
                adults={adults}
                children={children}
                totalAmount={totalAmount}
                onStayOnPage={handleStayOnPage}
                onConfirmLeave={handleConfirmLeave}
                onRetryPayment={handleRetryPayment}
                onCloseErrorModal={() => setShowErrorModal(false)}
            />

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
            `}</style>
        </div>
    );
}
