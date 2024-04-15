import Select from "@/modules/shared/components/ui/Select";
import { RootState } from "@/modules/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../store/flightsSlice";

const FlightSearchFlightType: React.FC = () => {
    const searchData = useSelector((state: RootState) => state.flightFilters.SearchData)
    const dispatch = useDispatch()

    const flightTypeHandler = (e : any) => {
        dispatch(setSearchData({...searchData, flightType: e}))
    }
    return (
        <>
            <Select
                onChange={(e) => flightTypeHandler(e)}
                items={[{ label: 'همه', value: 'All' }, { label: 'اکونومی', value: 'Economy' }, { label: 'بیزنس', value: 'Bussines' }]}
                placeholder="همه"
                value="i"
                className="text-blue-800 w-32 max-sm:w-26 m-1"
            />
        </>
    )
}

export default FlightSearchFlightType;