import { RootState } from "@/modules/shared/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const FlightSearchButton: React.FC = () => {
    const searchData:any = useSelector((state: RootState) => state.flightFilters.SearchData)
    const router = useRouter()
    const searchButtonHandler = () => {
        const search: any = {}
        search.flights=`${searchData.origin}-${searchData.destination}`
        search.adult = searchData.adult
        search.child = searchData.child
        search.infant = searchData.infant
        search.depatrting = searchData.depatrting
        if (searchData?.returning) search.returning = searchData?.returning
        if (searchData?.flightType !== "All") search.flightType = searchData?.flightType
        
        router.replace( {query :search})
        
    }
    
    return (
        <div className="w-full text-center">
            <button type="submit" className="p-2 pl-14 pr-14 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md text-white mt-5"
            onClick={searchButtonHandler}>جستجو</button>
        </div>
    )
}

export default FlightSearchButton;