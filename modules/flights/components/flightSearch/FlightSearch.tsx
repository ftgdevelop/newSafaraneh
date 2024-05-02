import FlightSearchPassengers from "./FlightSearchPassengers";
import FlightSearchDirection from "./FlightSearchDirection";
import FlightSearchDate from "./FlightSearchDate";
import FlightDirectionType from "./FlightDirectionType";
import FlightSearchFlightType from "./FlightSearchFlightType";
import { useRouter } from "next/router";
import { useState } from "react";
import { dateFormat } from "@/modules/shared/helpers";
import { useDispatch } from "react-redux";
import { setReduxNotification } from "@/modules/shared/store/notificationSlice";
import { setSearchChangeOn } from "../../store/flightsSlice";

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
    const dispatch = useDispatch()
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
    const router = useRouter()
    const submitHandler = (e: any) => {
        e.preventDefault()
        const search: any = {}
        search.adult = SearchData.adult
        search.child = SearchData.child
        search.infant = SearchData.infant
        search.departing = SearchData.departing
        if (SearchData?.returning) search.returning = SearchData?.returning
        if (SearchData?.flightType !== "All") search.flightType = SearchData?.flightType
    
        if (SearchData.origin && SearchData.destination) {
            router.push( {pathname: `/flights/${SearchData.origin}-${SearchData.destination}`,query: search})
            .then(() => dispatch(setSearchChangeOn(false)))
        }
        else {
            dispatch(setReduxNotification({state:'error', message: 'لطفا مبدا و مقصد حرکت را وارد کنید',isVisible: true}))
        }
        
    } 
    return (
        <form onSubmit={submitHandler} className={`${className ? className : ''}`}>
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
            <div className="w-full text-center">
            <button type="submit" className="p-2 pl-14 pr-14 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md text-white mt-5">
                جستجو
            </button>
        </div>
        </form>
    )
}

export default FlightSearch;