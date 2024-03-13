import { GetAvailability, GetFlights } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/FlightSidebarFilters";
import FlightsMain from "@/modules/flights/components/FlightsMain";
import { FlightType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createContext } from "react";

export const FlightsDataContext = createContext<any>('')

const Flights: NextPage<any> = ({ FlightsData } : {FlightsData : FlightType[]}) => {
    console.log(FlightsData);
    let a = new Date();
    console.log(`${a.getFullYear()}-${a.getMonth()}-${a.getDay()}`);
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightsDataContext.Provider value={FlightsData}>
                <FlightSidebarFilters />
                <FlightsMain />
            </FlightsDataContext.Provider>
        </div>
    )
}

export default Flights;


export async function getServerSideProps(context: any) {
    
    context.query = {
            ...context.query,
            adult: 1,
            child: 0,
            infant: 0,
            departing: '2024-03-15'
    }

    let flyRoute = context.query.flights.split('-')
    const GetKey = await GetAvailability(
        {
            adult: 1,
            child: 0,
            departureCode: flyRoute[0],
            departureTime: context.query.departing,
            infant: +context.query.infant,
            returnCode: flyRoute[1]
        }
    )

    const key = GetKey?.data
    const FlightsData = await GetFlights(key.result)

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                FlightsData: FlightsData?.data.result?.departureFlights || null
            },

        }
    )

}