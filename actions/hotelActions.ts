import axios from 'axios';

import { Header,ServerAddress, Hotel } from "../enum/url";

export const getDomesticHotelDetailById = async (id: number, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetHotelById}?hotelId=${id}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getDomesticHotelDetailByUrl = async (url: string, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetHotelByUrl}?url=${url}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getScore = async (hotelId: number, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetScore}?pageId=${hotelId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getAccommodationById = async (hotelId: number, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetAccommodationData}?Id=${hotelId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
