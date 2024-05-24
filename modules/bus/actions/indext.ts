import axios from "axios"
import { AvailibilityParams } from "../types"

export const GetAvailabilityKey = async (params: AvailibilityParams) => {

    const Headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json;charset=UTF-8',
        apikey: process.env.PROJECT_SERVER_APIKEY,
        "Accept-Language": 'fa-IR',
        Tenantid: process.env.PROJECT_SERVER_TENANTID,
    } 
    try {
        const response = await axios.post('https://busdomestic.safaraneh.com/api/services/app/BookingBus/Availability', params,{
            headers: Headers
        })
        return response
    } catch (error) {
        return error
    }
}

export const GetBusList = async (key: string) => {
    const Headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json;charset=UTF-8',
        apikey: process.env.PROJECT_SERVER_APIKEY,
        "Accept-Language": 'fa-IR',
        Tenantid: process.env.PROJECT_SERVER_TENANTID,
    } 
    try {
        const response = await axios.get(`https://busdomestic.safaraneh.com/api/services/app/BookingBus/GetAvailability?key=${key}`, 
            {
               headers: Headers 
            }
        )
        return response
    } catch (error) {
        return error
    }
}