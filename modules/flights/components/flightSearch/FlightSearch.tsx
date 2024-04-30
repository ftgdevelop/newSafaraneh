import FlightSearchPassengers from "./FlightSearchPassengers";
import FlightSearchDirection from "./FlightSearchDirection";
import FlightSearchDate from "./FlightSearchDate";
import FlightDirectionType from "./FlightDirectionType";
import FlightSearchButton from "./FlightSearchButton";
import FlightSearchFlightType from "./FlightSearchFlightType";
import { useRouter } from "next/router";
import { useState } from "react";
import { dateFormat } from "@/modules/shared/helpers";

export type SearchDataType = {
        destination: string | null,
        origin: string | null,
        adult: any,
        child: any,
        infant: any,
        departing: string | null,
        returning?: string | null,
        flightType?:'Business'| 'Economy'| 'All',
        BackForth: boolean
}

const FlightSearch: React.FC<any> = ({ className, airports }: { className: string, airports: any }) => {
    const query = useRouter().query
    const [SearchData, setSearchData] = useState<SearchDataType>({
        destination: (query.flights as string)?.split('-')[0] || null,
        origin: (query.flights as string)?.split('-')[1] || null,
        adult: query.adult || 1,
        child: query.child || 0,
        infant: query.infant || 0,
        departing: (query.departing as string) || null,
        returning: (query.returning as string) || null,
        flightType: (query.flightType as 'Business' | 'Economy' | 'All') || 'All',
        BackForth: query.returning ? true: false
    })
    return (
        <div className={`${className ? className : ''}`}>
            <div className="flex justify-between max-sm:block items-baseline mt-4 relative z-20">
                <FlightDirectionType SearchData={SearchData} setSearchData={(e: SearchDataType) => setSearchData(e)} />
                <div className="flex content-center">
                    <FlightSearchPassengers SearchData={SearchData} setSearchData={(e: SearchDataType) => setSearchData(e)} />
                    <FlightSearchFlightType SearchData={SearchData} setSearchData={(e: SearchDataType) => setSearchData(e)}/>
                </div>
            </div>
            <div className="grid grid-cols-3 max-lg:block max-lg:space-y-3 gap-2 mt-4 relative z-10">
                <FlightSearchDirection className={'col-span-2'} airports={airports} SearchData={SearchData} setSearchData={(e: SearchDataType) => setSearchData(e)}/>
                <FlightSearchDate SearchData={SearchData} setSearchData={(e: SearchDataType) => setSearchData(e)} />
            </div>
            <FlightSearchButton SearchData={SearchData}/>
        </div>
    )
}

export default FlightSearch;