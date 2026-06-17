import { apiConnector } from "@/lib/apiConnector";
import { paymentAPIs } from "../apis";

export const createOrder = async (
    token: string,
    amount: number,
    
) => {
    try {
        const response = await apiConnector(
            "POST",
            paymentAPIs.CREATE_ORDER,
            {
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            null,
            null
        );

        return response;
    } catch (error: unknown) {
        console.error("❌ Failed to create order:", error);
        throw error;
    }
}

export const verifyPayment = async (
    token: string,
    paymentId: string,
    orderId: string,
    signature: string,
    trekId: string,
    totalAmount: number,
    groupType: string,
    adults: number,
    children: number
) => {
    try {
        const response = await apiConnector(
            "POST",
            paymentAPIs.VERYFY_PAYMENT,
            {
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
                trekId,
                totalAmount,
                groupType,
                adultCount : adults,
                childCount: children,
            },
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            null,
            null
        );

        return response;
    } catch (error: unknown) {
        console.error("❌ Failed to verify payment:", error);
        throw error;
    }
};