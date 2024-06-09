import axios from "axios"
import { AvailibilityParams } from "../types"
import { ServerAddress } from "@/enum/url"

const Headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json;charset=UTF-8',
    apikey: process.env.PROJECT_SERVER_APIKEY,
    "Accept-Language": 'fa-IR',
    Tenantid: process.env.PROJECT_SERVER_TENANTID,
} 
const url = "https://busdomestic.safaraneh.com"

export const GetAvailabilityKey = async (params: AvailibilityParams) => {
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

export const GetBusesSeat = async (BusToken: string) => {
    let encoded = encodeURIComponent(BusToken)
    try {
        const response = await axios.get(`${url}/api/services/app/BookingBus/GetBusSeat?DepartureKey=${encoded}`, {
            headers:Headers
        })
        return response
    } catch (error) {
        return error
    }
}