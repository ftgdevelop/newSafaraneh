import { GetAvailability, GetFlights } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/FlightSidebarFilters";
import { FlightType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import FlightSearchData from "@/modules/flights/components/FlightSearchData";
import FlightMainFilters from "@/modules/flights/components/FlightsMainFilters";
import FlightsFlightItem from "@/modules/flights/components/flightItem/FlightFlightItem";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/shared/store";
import { SidebarFilterChange } from "@/modules/flights/templates/SidebarFilterChange";
import { SortHightestPrice, SortLowestPrice, SortTime } from "@/modules/flights/templates/SortFlightItem";
import FlightsSearchChange from "@/modules/flights/components/FlightSearchChange";

const Flights: NextPage<any> = ({ FlightsData } : {FlightsData : FlightType[]}) => {
    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    let [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>()
    let [sortFlights, setSortFlights] = useState('LowestPrice')
    
    useEffect(() => {
        SidebarFilterChange(FlightsData, SidebarFilter, setFlightsInFilter)
    }, [SidebarFilter])

    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5 relative">
            <FlightSidebarFilters FlightsData={FlightsData} flightsInFilterLengths={flightsInFilter?.length} />
            <div className="w-3/4 max-lg:w-full">
                <FlightSearchData FlightsData={FlightsData} />
                <FlightMainFilters sortFlights={sortFlights} changeSortFlights={(e: string) => setSortFlights(e)} />
                {
                    flightsInFilter?.sort((a: FlightType, b: FlightType): any => {
                        if (sortFlights == "HighestPrice") return SortHightestPrice(a,b)
                        else if (sortFlights == "Time") return SortTime(a, b)
                        return SortLowestPrice(a,b)
                        }).map((flight : FlightType) => 
                            <FlightsFlightItem flightData={flight} key={flight.flightKey} />
                        )
                }
            </div>
            <FlightsSearchChange />
        </div>
    )
}

export default Flights;

export async function getServerSideProps(context: any) {
    let getDate: any = new Date().toLocaleDateString()
    context.query = {
            ...context.query,
            adult: 1,
            child: 0,
            infant: 0,
            departing: '2024-04-14'
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
                ...await serverSideTranslations(context.locale),
                FlightsData: FlightsData?.data.result?.departureFlights || null
            },

        }
    )

}