import { Accommodation, ServerAddress } from "@/enum/url";
import axios from "axios";

export const confirmAccommodation = async (
    params: { userName: string; reserveId: string; token?: string },
    acceptLanguage: string = "fa-IR"
): Promise<any> => {
    try {
        let Headers;

        if (params.token) {
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY || "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
                'Accept-Language': acceptLanguage,
                Tenantid: process.env.PROJECT_SERVER_TENANTID || 7,
                Authorization: `Bearer ${params.token}`,
                currency: "EUR",
            };
        } else {
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY || "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
                'Accept-Language': acceptLanguage,
                Tenantid: process.env.PROJECT_SERVER_TENANTID || 7,
                currency: "EUR",
            };
        }

        const response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Confirm}`,
            { userName: params.userName, reserveId: params.reserveId },
            { headers: Headers }
        );

        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Server Error:", error.response.data);
            return error.response.data;
        } else if (error.request) {
            console.error("Request Error:", error.request);
            throw new Error("No response received from the server.");
        } else {
            console.error("Unexpected Error:", error.message);
            throw new Error(error.message);
        }
    }
};