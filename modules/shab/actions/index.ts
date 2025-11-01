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

export const shabReserve = async (params: {
    TrackerId: string;
    Username: string;
    ReserveType: "HotelDomestic" | "FlightDomestic" | "Cip";
    Id: string;
}, acceptLanguage: string = 'fa-IR') => {
    try {

        const queryString = new URLSearchParams(params).toString();

        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.ShabCRM}${ShabCrm.reserve}?${queryString}`,
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

