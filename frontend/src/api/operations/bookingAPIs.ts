import { apiConnector } from "@/lib/apiConnector";
import { trekBookings } from "../apis";

export const userTrekBooking = async (
    token: string,
    trekId: string,
    amountPaid: number,
) => {
    try {
        const res = await apiConnector(
            "POST",
            trekBookings.CREATE_BOOKING,
            {
                trekId,
                amountPaid,
            },
            {
                Authorization: `Bearer ${token}`,
            },
            null,
            null,
        );
        const response = res;
        return response;
    } catch (error: unknown) {
        console.log("Some error occured : ", error);
        throw error;
    }
}

export const getUserBookings = async (
    token: string,
) => {
    try {
        const res = await apiConnector(
            "GET",
            trekBookings.GET_USER_BOOKINGS,
            {},
            {
                Authorization: `Bearer ${token}`,
            },
            null,
            null
        );
        const response = res;
        return response;
    } catch (error: unknown) {
        console.log("Some error occured : ", error);
        throw error;
    }
};

export const cancelBooking = async (
    token: string,
    bookingId: string,
) => {
    try {
        const res = await apiConnector(
            "PATCH",
            trekBookings.CANCEL_BOOKING(bookingId),
            {},
            {
                Authorization: `Bearer ${token}`,
            },
            null,
            null
        );
        const response = res;
        return response;
    } catch (error: unknown) {
        console.log("Some error occured : ", error);
        throw error;
    }
};