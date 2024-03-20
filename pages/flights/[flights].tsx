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

const Flights: NextPage<any> = ({ FlightsData } : {FlightsData : FlightType[]}) => {
    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    const [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>()

    useEffect(() => {
        let list = FlightsData
        if (SidebarFilter.airlineOption.length) {
            list = list.filter((item: any) => SidebarFilter.airlineOption.includes(item.airline?.name))
        }
        if (SidebarFilter.flightHoursOption.length) {
            list = list.filter((item: any) => {
                let time = item.departureTime?.split('T')[1].split(':')[0]
                if (time.split('')[0] == 0) {
                    time = +time.split('')[1]
                }
                else time = +time
                let itemOnFilterTime = SidebarFilter.flightHoursOption.map(i => time >= i.minTime && time < i.maxTime).find(a => a == true)
                return itemOnFilterTime
            })
        }
        if (SidebarFilter.cabinClassOption.length) {
            list = list.filter(item => SidebarFilter.cabinClassOption.includes(item.cabinClass.name))
        }
        if (SidebarFilter.ticketTypeOption.length) {
            list = list.filter(item => SidebarFilter.ticketTypeOption.includes(item.flightType))
        }
        setFlightsInFilter(list)
    },[SidebarFilter])
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightSidebarFilters FlightsData={FlightsData} flightsInFilterLengths={flightsInFilter?.length} />
            <div className="w-3/4 max-lg:w-full">
                <FlightSearchData FlightsData={FlightsData} />
                <FlightMainFilters />
                    {
                        flightsInFilter?.map((flight : FlightType, index) => 
                            <FlightsFlightItem flightData={flight} key={index} />
                        )
                    }
                </div>
        </div>
    )
}

export default Flights;

export async function getServerSideProps(context: any) {
    let a = new Date();
    const date = `${a.getFullYear()}-0${a.getMonth() + 2}-${a.getDay() + 9}`
    context.query = {
            ...context.query,
            adult: 1,
            child: 0,
            infant: 0,
            departing: '2024-03-25'
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