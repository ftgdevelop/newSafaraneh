import { ShabCrm, ServerAddress } from "@/enum/url";
import axios from "axios";

export const getShabUser = async (params: { reserveId: string }, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.ShabCRM}${ShabCrm.getUser}?Id=${params.reserveId}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const shabReserve = async (params : {
    trackerId: string;
    username: string;
    reserveType:"HotelDomestic" | "FlightDomestic" | "Cip";
    id: number

} , acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.ShabCRM}${ShabCrm.reserve}`,
            params,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const shabGetReservedHotel = async (params: {
    TrackerId: string;
    SkipCount: string;
    MaxResultCount: string;
}, acceptLanguage: string = 'fa-IR') => {
    try {

        const queryString = new URLSearchParams(params).toString();

        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.ShabCRM}${ShabCrm.getReservedHotelList}?${queryString}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const shabGetReservedFlights = async (params: {
    TrackerId: string;
    SkipCount: string;
    MaxResultCount: string;
}, acceptLanguage: string = 'fa-IR') => {
    try {

        const queryString = new URLSearchParams(params).toString();

        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.ShabCRM}${ShabCrm.getReservedFlightList}?${queryString}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

