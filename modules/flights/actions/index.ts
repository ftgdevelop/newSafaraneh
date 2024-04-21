import { Flight, ServerAddress } from "@/enum/url"
import axios from "axios"
import { AvailibilityParams, FlightPrereserveFormValue } from "../types/flights";

export const GetAirportsByCode = async (codes: string[], acceptLanguage: string = 'fa-IR') => {
    try {
        const parameters = codes.map(code =>`Codes=${code}`).join("&");
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.GetAirportsByCode}?${parameters}&AirportTypes=Main`,
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

export const GetAvailabilityKey = async (params: AvailibilityParams, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.Availability}`,
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


export const GetFlightList = async (params:{key: string, currency: "IRR"|"USD"},  acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.GetAvailability}?&key=${params.key}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID,
                    Currency: params.currency || "IRR"
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const FlightGetValidate = async (params:{key: string,token?:string}, acceptLanguage: string = 'fa-IR') => {
    try {
        
        let Headers;
        if (params.token){
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage,
                Authorization: `Bearer ${params.token}`
            }
        }else{
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage
            } 
        }

        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.GetValidate}?preReserveKey=${params.key}`,
            {
                headers: Headers
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getAllCountries = async (acceptLanguage: string = 'fa-IR') => {
    try {        
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.GetAllCountries}?MaxResultCount=300`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const FlightPreReserve = async (values:{params: FlightPrereserveFormValue, token:string}, acceptLanguage: string = 'fa-IR') => {
    try {

        let Headers;
        if (values.token){
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage,
                Authorization: `Bearer ${values.token}`
            }
        }else{
            Headers = {
                'Content-Type': 'application/json',
                apikey: process.env.PROJECT_SERVER_APIKEY,
                'Accept-Language': acceptLanguage
            } 
        }


        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Flight}${Flight.PreReserve}`,
            values.params,
            {
                headers: Headers,
            },
        )
        return response
    } catch (error) {
        return error
    }
}





// export const GetFlights = async (key: string) => {
//     try {
//         const response = await axios.get(`${ServerAddress.Type}${Flight.getFlights}${key}`,
//             {
//                 headers: {
//                     "Content-Type": "appliction/json",
//                     "TenantId": "1040",
//                     "Accept-Language": "fa-IR"
//                 }
//             }
//         )
//         return response
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const GetAvailability = async (FlightData:
//     { departureCode: string, returnCode: string, departureTime: string, adult: number, child: number, infant: number }) => {
//     try {
//         const response = axios.post(`${ServerAddress.Type}${Flight.getAvailability}`,
//             FlightData,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "TenantId": "1040",
//                     "Accept-Language": "fa-IR",
//                 }
//             }
//             )
//             return response
//     } catch (error) {
//         console.log(error)
//     }
// }