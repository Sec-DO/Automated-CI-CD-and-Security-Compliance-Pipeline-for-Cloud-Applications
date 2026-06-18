import { BASE_URL } from "@/lib/apiConnection";

export const userAuth = {
    LOGIN: `${BASE_URL}api/auth/login`,
    REGISTER: `${BASE_URL}api/auth/register`,
};

export const leaderTrek = {
    CREATE_NEW_TREK: `${BASE_URL}api/leader/treks/create-trek`,
    UPDATE_TREK: (trekId: string) => `${BASE_URL}api/leader/treks/update-trek/${trekId}`,
    DELETE_TREK: (trekId: string) => `${BASE_URL}api/leader/treks/delete-trek/${trekId}`,
};

export const userTrek = {
    GET_ALL_TREKS: `${BASE_URL}api/user/treks/get-all-treks`,
    GET_TREK_BY_ID: (trekId: string) => `${BASE_URL}api/user/treks/get-trek/${trekId}`,
    BOOK_TREK: (trekId: string) => `${BASE_URL}api/user/treks/book-trek/${trekId}`,
};

export const trekBookings = {
    CREATE_BOOKING: `${BASE_URL}api/bookings/book-trek`,
    GET_USER_BOOKINGS: `${BASE_URL}api/bookings/my-bookings`,
    CANCEL_BOOKING: (bookingId: string) => `${BASE_URL}api/bookings/cancel-booking/${bookingId}`,
};

export const paymentAPIs = {
    CREATE_ORDER: `${BASE_URL}api/payments/create-order`,
    VERYFY_PAYMENT: `${BASE_URL}api/payments/verify-payment`,
}

export const profileAPIs = {
    GET_USER_PROFILE: `${BASE_URL}api/profile/get-user-profile`,
    UPDATE_USER_PROFILE: `${BASE_URL}api/profile/update-user-profile`,
}