/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiConnector } from "@/lib/apiConnector";
import { profileAPIs } from "../apis";

export const getUserProfile = async (
    token: string,
) => {
    try {
        const res = await apiConnector(
            "GET",
            profileAPIs.GET_USER_PROFILE,
            null,
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

export const updateUserProfile = async (
    token: string,
    profileData: any,
) => {
    try {
         console.log("Saving user profile with data:", profileData);
        const res = await apiConnector(
            "POST",
            profileAPIs.UPDATE_USER_PROFILE,
            profileData,
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
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
};