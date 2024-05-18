import axios from "axios"

export const GetBusesByCode = async () => {
    try {
        const response = await axios.get('https://busdomestic.safaraneh.com/api/services/app/BookingBus/Availability')
        return response
    } catch (error) {
        return error
    }
}

