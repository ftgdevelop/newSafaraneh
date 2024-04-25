import { AirportSearchResponseItem } from "../../types/flights"

interface listType {
    value: string,
    label: string,
    values: {
        name: string,
        city: {
            name: any,
            code: any,
        },
        country?: {
            name: string,
            code: string,
        },
        latitude?: string,
        longitude?: string,
        code: string,
        airportType: "Main" | "Subsidiary"| "City"
    },
}
const list: listType[]= [
        {
          value: "THR",
          label: "تهران",
          values: {
            name: "تهران",
            city: {
              name: null,
              code: null,
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "THR",
            airportType: "City",
          },
        },
        {
          value: "AWZ",
          label: "اهواز",
          values: {
            name: "فرودگاه اهواز",
            city: {
              name: "اهواز",
              code: "AWZ",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "AWZ",
            airportType: "Main",
          },
        },
        {
          value: "SYZ",
          label: "شیراز",
          values: {
            name: "فرودگاه شهید دستغیب شیراز",
            city: {
              name: "شيراز",
              code: "SYZ",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "SYZ",
            airportType: "Main",
          },
        },
        {
          value: "MHD",
          label: "مشهد",
          values: {
            name: "فرودگاه شهید هاشمی نژاد مشهد",
            city: {
              name: "مشهد",
              code: "MHD",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "MHD",
            airportType: "Main",
          },
        },
        {
          value: "BND",
          label: "بندرعباس",
          values: {
            name: "فرودگاه بندرعباس",
            city: {
              name: "بندرعباس",
              code: "BND",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "BND",
            airportType: "Main",
          },
        },
        {
          value: "IFN",
          label: "اصفهان",
          values: {
            name: "فرودگاه شهید بهشتی اصفهان",
            city: {
              name: "اصفهان",
              code: "IFN",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "IFN",
            airportType: "Main",
          },
        },
        {
          value: "TBZ",
          label: "تبریز",
          values: {
            name: "فرودگاه شهید مدنی تبریز",
            city: {
              name: "تبريز",
              code: "TBZ",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "TBZ",
            latitude: "38.133899688720703",
            longitude: "46.235000610351499",
            airportType: "Main",
          },
        },
        {
          value: "KIH",
          label: "کیش",
          values: {
            name: "فرودگاه خلیج فارس کیش",
            city: {
              name: "کيش",
              code: "KIH",
            },
            country: {
              name: "ایران",
              code: "IR",
            },
            code: "KIH",
            airportType: "Main",
          },
        },
]

export const defaultAirportOption: AirportSearchResponseItem[] = list.map(item => {
    return ({
        name: item.label,
        city: {
            name: item.values.city.name,
            code: item.values.city.code
        },
        code: item.value,
        airportType: item.values.airportType
    })
})