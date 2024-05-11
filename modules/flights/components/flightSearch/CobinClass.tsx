import Select from "@/modules/shared/components/ui/Select";
import { SearchDataType } from "./FlightSearch";
import { useRouter } from "next/router";

type Props = {
    flightType: 'All' | 'Economy' | 'Business',
    setFlightType: any
}
const CobinClass: React.FC<Props> = props => {
    const {flightType, setFlightType} = props
    const flightTypeHandler = (e : any) => {
        setFlightType(e)
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

export default CobinClass;