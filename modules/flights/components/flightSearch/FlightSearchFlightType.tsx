import Select from "@/modules/shared/components/ui/Select";
import { SearchDataType } from "./FlightSearch";
import { useRouter } from "next/router";

const FlightSearchFlightType: React.FC<any> = ({SearchData, setSearchData} : {SearchData: SearchDataType, setSearchData: any}) => {
    const flightTypeHandler = (e : any) => {
        setSearchData({...SearchData, flightType: e})
    }
    const router = useRouter().query
    return (
        <>
            <Select
                onChange={(e) => flightTypeHandler(e)}
                items={[{ label: 'همه', value: 'All' }, { label: 'اکونومی', value: 'Economy' }, { label: 'بیزنس', value: 'Business' }]}
                placeholder="همه"
                value={(router.flightType as string) || ''}
                className="text-blue-800 w-32 max-sm:w-26 m-1"
            />
        </>
    )
}

export default FlightSearchFlightType;