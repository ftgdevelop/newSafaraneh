import { RootState } from "@/modules/shared/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SearchDataType } from "./FlightSearch";

const FlightSearchButton: React.FC<any> = ({SearchData}: {SearchData: SearchDataType}) => {
    const router = useRouter()
    const searchButtonHandler = () => {
        const search: any = {}
        search.flights=`${SearchData.origin}-${SearchData.destination}`
        search.adult = SearchData.adult
        search.child = SearchData.child
        search.infant = SearchData.infant
        search.departing = SearchData.departing
        if (SearchData?.returning) search.returning = SearchData?.returning
        if (SearchData?.flightType !== "All") search.flightType = SearchData?.flightType
    
        if (SearchData.origin && SearchData.destination) router.replace({ query: search })
    }
    
    return (
        <div className="w-full text-center">
            <button type="submit" className="p-2 pl-14 pr-14 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md text-white mt-5"
            onClick={searchButtonHandler}>جستجو</button>
        </div>
    )
}

export default FlightSearchButton;