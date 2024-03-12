import { Flight, ServerAddress } from "@/enum/url"
import axios from "axios"

export const GetFlights = async (key: string) => {
    try {
        const response = await axios.get(`${ServerAddress.Type}${Flight.getFlights}${key}`,
            {
                headers: {
                    "Content-Type": "appliction/json",
                    "TenantId": "1040",
                    "Accept-Language": "fa-IR"
                }
            }
        )
        return response
    } catch (error) {
        console.log(error)
    }
}
export const GetAvailability = async (FlightData:
    { departureCode: string, returnCode: string, departureTime: string, adult: number, child: number, infant: number }) => {
    try {
        const response = axios.post(`${ServerAddress.Type}${Flight.getAvailability}`,
            FlightData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "TenantId": "1040",
                    "Accept-Language": "fa-IR",
                }
            }
            )
            return response
    } catch (error) {
        console.log(error)
    }
}