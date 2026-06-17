import { apiConnector } from "@/lib/apiConnector";
import { userAuth } from "../apis";

export const registerUser = async (
    name: string,
    email: string,
    mobile: string,
    password: string,
) => {
    try {
        const res = await apiConnector(
            "POST",
            userAuth.REGISTER,
            {
                name,
                email,
                mobile,
                password,
            },
            null,
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

export const login = async (
    email: string,
    password: string,
) => {
    try {
        const res = await apiConnector(
            "POST",
            userAuth.LOGIN,
            {
                email,
                password,
            },
            null,
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
