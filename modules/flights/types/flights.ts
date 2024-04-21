export interface FlightType {
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
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

export interface AirportSearchResponseItem  {
    name?: string;
    city: {
        name?: string;
        code?: string;
    };
    // country: {
    //   name: "string",
    //   code: "string"
    // },
    code: string;
    // latitude: "string",
    // longitude: "string",
    airportType: "Main" | "Subsidiary"| "City"
  }

  export type AvailibilityParams = {
    departureCode: string;
    returnCode: string;
    departureTime: string;
    adult: number;
    child: number;
    infant: number;
}

export type AirportType = {
    name?: string;
    code?: string;
    terminalId?: string;
    city: {
      name?: string;
      code?: string;
    };
    country: {
      name?: string;
      code?: string;
    };
    latitude?: string;
    longitude?: string;
}

export interface FlightGetValidateDataType {
    preReserveKey?: string;
    departureTime: string;
    arrivalTime?: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    "creationTime": "2024-04-10T11:45:24.052Z",
    "adultTotalPrice": 0,
    "childTotalPrice": 0,
    "infantTotalPrice": 0,
    captchaLink?: string;
    departureFlight: {
        flightType: "System" | "Charter";
        flightNumber: string;
        departureTime: string;
        arrivalTime?: string;
        isForeign: boolean;
        adultPrice:number;
        childPrice:number;
        infantPrice:number;
      //   "maxAllowedBaggage": 0,
      //   "capacity": 0,
      //   "manufacturer": "string",
      //   "description": "string",
        cabinClass: {
          code?: string;
          type?: string;
          name?: string;
        };
        departureAirport:AirportType;
        arrivalAirport:AirportType;
        airCraft: {
          code?: string;
          name?: string;
          manufacturer?: string;
        };
        airline: {
          code?: string;
          name?: string;
          picture: {
            path?: string;
            altAttribute?: string;
            titleAttribute?: string;
          }
        };
      //   "refundRule": {
      //     "rows": [
      //       {
      //         "key": 0,
      //         "value": "string"
      //       }
      //     ],
      //     "items": [
      //       {
      //         "value": 0,
      //         "fromMinutes": 0,
      //         "fromTime": "string",
      //         "toMinutes": 0,
      //         "toTime": "string",
      //         "description": "string",
      //         "id": 0
      //       }
      //     ]
      //   },
      //   "pnrCode": "string",
      //   "id": 0
      }











    returnFlight?: {
      flightType: "System" | "Charter";
      flightNumber: string;
      departureTime: string;
      arrivalTime?: string;
      isForeign: boolean;
      adultPrice:number;
      childPrice:number;
      infantPrice:number;
    //   "maxAllowedBaggage": 0,
    //   "capacity": 0,
    //   "manufacturer": "string",
    //   "description": "string",
      cabinClass: {
        code?: string;
        type?: string;
        name?: string;
      };
      departureAirport:AirportType;
      arrivalAirport:AirportType;
      airCraft: {
        code?: string;
        name?: string;
        manufacturer?: string;
      };
      airline: {
        code?: string;
        name?: string;
        picture: {
          path?: string;
          altAttribute?: string;
          titleAttribute?: string;
        }
      };
    //   "refundRule": {
    //     "rows": [
    //       {
    //         "key": 0,
    //         "value": "string"
    //       }
    //     ],
    //     "items": [
    //       {
    //         "value": 0,
    //         "fromMinutes": 0,
    //         "fromTime": "string",
    //         "toMinutes": 0,
    //         "toTime": "string",
    //         "description": "string",
    //         "id": 0
    //       }
    //     ]
    //   },
    //   "pnrCode": "string",
    //   "id": 0
    }
  }


  export interface FlightPrereserveFormValue {
    reserver: {
      gender: boolean;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      userName?:string;
  };
  passengers: {
    gender: boolean;
    firstName: string;
    lastName: string;
    persianFirstName: string;
    persianLastName: string;
    nationalId: string;
    birthDate: string;
    passportNumber: string | null;
    passportExpireDate: string | null;
    passengerType: "ADT"|"CHD"|"INF"
    nationality: string | null;
  }[];
    captchaCode: string;
    preReserveKey?:string;
  }