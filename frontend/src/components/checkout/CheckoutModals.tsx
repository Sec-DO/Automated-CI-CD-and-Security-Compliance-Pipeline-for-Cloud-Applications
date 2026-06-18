import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trek } from "@/lib/dummyTreks";

interface CheckoutModalsProps {
    showSuccessModal: boolean;
    showErrorModal: boolean;
    showCancelModal: boolean;
    trekDetails: Trek;
    adults: number;
    children: number;
    totalAmount: number;
    onStayOnPage: () => void;
    onConfirmLeave: () => void;
    onRetryPayment: () => void;
    onCloseErrorModal: () => void;
}

export function CheckoutModals({
    showSuccessModal,
    showErrorModal,
    showCancelModal,
    trekDetails,
    adults,
    children,
    totalAmount,
    onStayOnPage,
    onConfirmLeave,
    onRetryPayment,
    onCloseErrorModal,
}: CheckoutModalsProps) {
    const router = useRouter();

    return (
        <>
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-emerald-600"
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
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Payment Successful!
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Your booking has been confirmed successfully.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                                <div className="flex items-center gap-3 mb-3">
                                    <Image
                                        src={trekDetails.imageUrls[0]}
                                        alt={trekDetails.title}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {trekDetails.title}
                                        </h4>
                                        <p className="text-xs text-gray-600">
                                            {adults} Adult
                                            {adults > 1 ? "s" : ""}
                                            {children > 0
                                                ? `, ${children} Child${
                                                      children > 1 ? "ren" : ""
                                                  }`
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Total Paid:
                                    </span>
                                    <span className="font-bold text-emerald-600">
                                        ₹{totalAmount}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push(`/my-bookings`)}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    View Booking Details
                                </button>
                                <button
                                    onClick={() => router.push(`/treks`)}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Continue Browsing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-emerald-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Payment Failed
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Payment verification failed. Please try again or
                                contact our support team.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={onRetryPayment}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Retry Payment
                                </button>
                                <button
                                    onClick={onCloseErrorModal}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-fade-in-up shadow-2xl">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                                <svg
                                    className="w-8 h-8 text-amber-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Leave Checkout?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to leave? Your booking
                                progress will be lost.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={onStayOnPage}
                                    className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Continue Booking
                                </button>
                                <button
                                    onClick={onConfirmLeave}
                                    className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                                >
                                    Leave Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
