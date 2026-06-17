import { Trek } from "@/lib/dummyTreks";

interface PricingSidebarProps {
    trekDetails: Trek;
    adults: number;
    children: number;
    coupon: string;
    setCoupon: (value: string) => void;
    discount: number;
    onCouponApply: () => void;
    totalAmount: number;
    groupType: string;
    isProcessing: boolean;
    onPayment: () => void;
}

export function PricingSidebar({
    trekDetails,
    adults,
    children,
    coupon,
    setCoupon,
    discount,
    onCouponApply,
    totalAmount,
    groupType,
    isProcessing,
    onPayment,
}: PricingSidebarProps) {
    return (
        <div className="lg:col-span-1 space-y-6">
            {/* Coupon Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Promo Code
                </h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    />
                    <button
                        onClick={onCouponApply}
                        className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
                        type="button"
                    >
                        Apply Code
                    </button>
                </div>

                {discount > 0 && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-emerald-700 font-medium flex items-center gap-2 text-sm">
                            <svg
                                className="w-4 h-4 flex-shrink-0"
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
                            Discount of ₹{discount} applied!
                        </p>
                    </div>
                )}
            </div>

            {/* Price Summary Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Booking Summary
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm">
                            Base Price (per adult)
                        </span>
                        <span className="text-gray-900 font-semibold">
                            ₹{Number(trekDetails.price).toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 text-sm">
                            Adults × {adults}
                        </span>
                        <span className="text-gray-900">
                            ₹
                            {(
                                adults * Number(trekDetails.price)
                            ).toLocaleString()}
                        </span>
                    </div>

                    {children > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm">
                                Children × {children} (40% off)
                            </span>
                            <span className="text-gray-900">
                                ₹
                                {(
                                    children *
                                    Number(trekDetails.price) *
                                    0.6
                                ).toLocaleString()}
                            </span>
                        </div>
                    )}

                    {discount > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-emerald-600 text-sm">
                                Discount Applied
                            </span>
                            <span className="text-emerald-600 font-medium">
                                -₹{discount.toLocaleString()}
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
                        <span className="text-lg font-semibold text-gray-900">
                            Total Amount
                        </span>
                        <span className="text-2xl font-bold text-emerald-600">
                            ₹{totalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onPayment}
                    disabled={isProcessing || !groupType || totalAmount <= 0}
                    className="group relative w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isProcessing ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                Proceed to Pay ₹{totalAmount.toLocaleString()}
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
                            </>
                        )}
                    </span>
                </button>

                {!groupType && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                        Please select a group type
                    </p>
                )}
            </div>
        </div>
    );
}
