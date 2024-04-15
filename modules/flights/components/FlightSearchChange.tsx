import { RootState } from "@/modules/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchChangeOn } from "../store/flightsSlice";
import FlightSearch from "./flightSearch/FlightSearch";

const FlightsSearchChange: React.FC = () => {
    const SearchChangeOn = useSelector((state: RootState) => state.flightFilters.SearchChangeOn)
    const dispatch = useDispatch()
    return (
        <>
        <div className={`z-30 bg-black/75 absolute top-0 right-0 left-0 ml-5 mr-5 max-xl:m-0 p-4
        ${!SearchChangeOn ? 'hidden' : ''}`}>
                <div className="flex justify-between">
                    <h3 className="max-sm:text-sm text-white">تغییر جستجو</h3>
                        <button type="submit" className="border-1 border-white pl-10 pr-10 rounded-sm max-sm:text-sm text-white"
                            onClick={() => dispatch(setSearchChangeOn(false))}>
                            بستن
                        </button>
                </div>
                <FlightSearch className="pl-4 pr-4 max-sm:p-0" />
        </div>

        <div className={`z-20 fixed top-0 left-0 bg-black/30 backdrop-blur-sm ${!SearchChangeOn ? 'hidden' : 'w-full h-full'}`}
            onClick={() => dispatch(setSearchChangeOn(false))}>
        </div>
        </>
    )
}

export default FlightsSearchChange;