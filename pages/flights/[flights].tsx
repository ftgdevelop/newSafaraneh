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

const Flights: NextPage<any> = ({ FlightsData } : {FlightsData : FlightType[]}) => {
    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    let [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>(FlightsData)
    let [sortFlights, setSortFlights] = useState('LowestPrice')
    console.log(FlightsData);
    
    useEffect(() => {
        SidebarFilterChange(FlightsData, SidebarFilter, setFlightsInFilter)
        if (sortFlights == 'HighestPrice') setFlightsInFilter(prev => prev.sort(SortHightestPrice))
        if (sortFlights == 'Time') setFlightsInFilter(prev => prev.sort(SortTime))
        if (sortFlights == 'LowestPrice') setFlightsInFilter(prev => prev.sort(SortLowestPrice))
    }, [SidebarFilter])

    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightSidebarFilters FlightsData={FlightsData} flightsInFilterLengths={flightsInFilter?.length} />
            <div className="w-3/4 max-lg:w-full">
                <FlightSearchData FlightsData={FlightsData} />
                <FlightMainFilters sortFlights={sortFlights} changeSortFlights={(e: string) => setSortFlights(e)} />
                {
                    flightsInFilter?.sort((a: FlightType,b:FlightType) :any => {
                        if (sortFlights == "LowestPrice") return SortLowestPrice(a,b)
                        if (sortFlights == "HighestPrice") return SortHightestPrice(a,b)
                        if (sortFlights == "Time") return SortTime(a,b)
                        return SortLowestPrice
                        }).map((flight : FlightType) => 
                            <FlightsFlightItem flightData={flight} key={flight.flightKey} />
                        )
                }
            </div>
        </div>
    )
}

export default Flights;

export async function getServerSideProps(context: any) {
    let getDate = new Date();
    const date = `${getDate.getFullYear()}-0${getDate.getMonth() + 1}-${getDate.getDay() + 25}`
    
    context.query = {
            ...context.query,
            adult: 1,
            child: 0,
            infant: 0,
            departing: '2024-03-27'
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