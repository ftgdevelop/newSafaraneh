import { Accommodation, ServerAddress } from "@/enum/url";
import axios from "axios";

export const confirmAccommodation = async (params:{userName:string, reserveId: string, token:string}, acceptLanguage: string = 'fa-IR') => {
    try {

        let Headers;
        if (params.token){
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage,
                Tenantid: process.env.PROJECT_SERVER_TENANTID,
                Authorization: `Bearer ${params.token}`
            }
        }else{
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage,
                Tenantid: process.env.PROJECT_SERVER_TENANTID
            } 
        }

        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Confirm}`,
            {userName:params.userName, reserveId: params.reserveId},
            {headers:Headers}
        )
        return response
    } catch (error) {
        return error
    }
}