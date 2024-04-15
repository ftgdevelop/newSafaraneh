import { RootState } from "@/modules/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../store/flightsSlice";

const FlightDirectionType: React.FC = () => {
    const searchData = useSelector((state: RootState) => state.flightFilters.SearchData)
    const dispatch = useDispatch()

    const DirectionTypeHandle = (type : string) => {
        if (type == 'BackForth') {
            dispatch(setSearchData({...searchData, BackForth: true}))
        }
        else if (type == 'OneWay') {
            dispatch(setSearchData({...searchData, BackForth: false}))
        }
    }
    
    return (
        <>
            <div className="flex">
                <button type="button"
                    className={`p-2 max-sm:p-1 ${!searchData?.BackForth ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('OneWay')}>
                    یک طرفه
                </button>
                <button type="button"
                    className={`p-2 max-sm:p-1 ${searchData?.BackForth ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('BackForth')}>
                    رفت و برگشت
                </button>
            </div>
        </>
    )
}

export default FlightDirectionType;