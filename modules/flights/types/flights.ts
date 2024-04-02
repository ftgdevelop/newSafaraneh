export interface FlightType {
    adultPrice: number;
    country?: {
        name?: string;
    }
    airline?: {
        name?: string;
        picture?: {
            path?: string;
            altAttribute?: string;
        }
    }
    airCraft: {
        name: string;
    }
    arrivalAirport?: {
        city?: {
            name?: string;
            code?: string;
        }
        country?: {
            name?: string;
        }
        name?: string;
        cobinClass?: {
            name?: string;
        }
        flightType?: string;
    }
    departureAirport?: {
        city?: {
            name?: string;
            code?: string;
        }
        country?: {
            name?: string;
        }
        name?: string;
        cobinClass?: {
            name?: string;
        }
        flightType?: string;
    }
    cabinClass: {
        name: string;
    }
    id?: number;
    departureTime?: string;
    arrivalTime?: string;
    capacity: number;
    flightType: string;
    maxAllowedBaggage: number;
    flightNumber: string;
    flightKey: string;
}