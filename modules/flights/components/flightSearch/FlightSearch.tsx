import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setReduxNotification } from "@/modules/shared/store/notificationSlice";
import { setSearchChangeOn } from "../../store/flightsSlice";
import DirectionType from "./DirectionType";
import Passengers from "./Passengers";
import FlightDate from "./FlightDate";
import Direction from "./Direction";
import CobinClass from "./CobinClass";

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
    const [submitLoading, setSubmitLoading] = useState(false)


    const [direction, setDirection] = useState < { origin:string| null,destination: string| null}>({
        origin:(query.flights as string)?.split('-')[0] || null,
        destination:(query.flights as string)?.split('-')[1] || null
    })
    const [passengers, setPassengers] = useState<{ adult: any, child: any, infant: any }>({
        adult: query.adult || 1,
        child: query.child || 0,
        infant: query.infant || 0
    })
    const [flightDate, setFlightDate] = useState<{ departing: string|null, returning: string|null }>({
        departing: (query.departing as string) || null,
        returning: (query.returning as string) || null
    })
    const [flightType, setFlightType] = useState<'Business' | 'Economy' | 'All'>((query.flightType as 'Business' | 'Economy' | 'All') || 'All')
    const [hasReturn, setHasReturn] = useState<boolean>(false)

    const router = useRouter()
    const submitHandler = (e: any) => {
        e.preventDefault()
        const search: any = {}
        search.adult = passengers.adult
        search.child = passengers.child
        search.infant = passengers.infant
        search.departing = flightDate.departing
        if (hasReturn) search.returning = flightDate?.returning
        if (flightType !== "All") search.flightType = flightType

        if (direction.origin && direction.destination) {
            setSubmitLoading(true)
            router.push({ pathname: `/flights/${direction.origin}-${direction.destination}`, query: search })
            .then(() => { dispatch(setSearchChangeOn(false)),
             setSubmitLoading(false) })
        }
        else {
            dispatch(setReduxNotification({state:'error', message: 'لطفا مبدا و مقصد حرکت را وارد کنید',isVisible: true}))
        }
        
    } 

    return (
        <form onSubmit={submitHandler} className={`${className ? className : ''}`}>
            <div className="flex justify-between max-sm:block items-baseline mt-4 relative z-20">
                <DirectionType hasReturn={hasReturn} setHasReturn={(e: boolean) => setHasReturn(e)} />
                <div className="flex content-center">
                    <Passengers passengers={passengers} setPassengers={(e:any) => setPassengers(e)} />
                    <CobinClass flightType={flightType} setFlightType={(e: any) => setFlightType(e)} />
                </div>
            </div>
            <div className="grid grid-cols-3 max-lg:block max-lg:space-y-3 gap-2 mt-4 relative z-10">
                <Direction className={'col-span-2'} airports={airports} direction={direction} setDirection={(e: any) => setDirection(e)}/>
                <FlightDate flightDate={flightDate} setFlightDate={(e:any) => setFlightDate(e)} hasReturn={hasReturn} setHasReturn={(e:any) => setHasReturn(e)} />
            </div>
            <div className="w-full text-center">
            <button type="submit" className="p-2 pl-14 pr-14 bg-blue-700 hover:bg-blue-600 duration-200 rounded-md text-white mt-5">
                {submitLoading? 'در حال جستجو...' : 'جستجو'}
            </button>
        </div>
        </form>
    )
}

export default FlightSearch;