import { apiConnector } from "@/lib/apiConnector";
import { leaderTrek, userTrek } from "../apis";

interface CreateTrekPayload {
    title: string;
    thumbnail: string;
    imageUrls: string[];
    price: string;
    startDate: string;
    endDate: string;
    difficulty: string;
    seatsAvailable: number;
    commute: string;
    locationsToView: string[];
    aboutDestination: string;
    whoCanCome: string;
    stops: string[];
    schedule: string[];
    foodStops?: string[];
    highlights?: string[];
    description: string;
    suitableFor?: string;
    preparationTips?: string[];
    leaders?: {
        name: string;
        photo: string;
        experience: string;
    }[];
    facilities?: string[];
}

export const createNewTrek = async (
    trekData: CreateTrekPayload,
    token: string
) => {
    try {
        const response = await apiConnector(
            "POST",
            leaderTrek.CREATE_NEW_TREK,
            trekData,
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            null,
            "json"
        );

        return response;
    } catch (error: unknown) {
        console.error("❌ Failed to create trek:", error);
        throw error;
    }
};

export const getAllTreks = async (
) => {
    try {
        const response = await apiConnector(
            "GET",
            userTrek.GET_ALL_TREKS,
            null,
            null,
            null,
            "json"
        );

        return response;
    } catch (error: unknown) {
        console.error("❌ Failed to fetch all treks:", error);
        throw error;
    }
}

export const getTrekById = async (
    trekId: string,
) => {
    try {
        const response = await apiConnector(
            "GET",
            userTrek.GET_TREK_BY_ID(trekId),
            null,
            null,
            null,
            "json"
        );

        return response;
    } catch (error: unknown) {
        console.error("❌ Failed to fetch trek by ID:", error);
        throw error;
    }
}