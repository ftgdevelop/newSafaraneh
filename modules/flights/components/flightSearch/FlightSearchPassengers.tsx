import { Minus, Plus } from "@/modules/shared/components/ui/icons";
import { setReduxNotification } from "@/modules/shared/store/notificationSlice";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SearchDataType } from "./FlightSearch";

const FlightSearchPassengers: React.FC<any> = ({SearchData, setSearchData}: {SearchData: SearchDataType, setSearchData: any}) => {
    const dispatch = useDispatch()

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [passengersOpen, setPassengersOpen] = useState(false)

    let router = useRouter()
    const [adult, setAdult] = useState<any>(+(router.query.adult as string) || 1)
    const [child, setChild] = useState<any>(+(router.query.child as string) || 0)
    const [infant, setInfant] = useState<any>(+(router.query.infant as string) || 0)
    const allPassengers = +adult + +child + +infant

    const adultHandle = (type: string) => {
        if (type == 'plus') {
            if (allPassengers < 9) {
                setAdult((prev: number) => prev+1)
            }
        }
        else if (type == 'minus' && adult > 1) {
            setAdult((prev: number) => prev-1)
            if (child+infant >= adult * 2) {
                if (infant) {
                    setChild((adult - 1) * 3 -1)
                }
                else setChild((adult - 1) * 3)
            }
            if (infant == adult) {
                if (infant == 2) setInfant(0)
                else setInfant(adult -1)
            }
        }
        if (type == 'minus' && adult == 1) dispatch(setReduxNotification({state:'error', message: 'تعداد بزرگسالان نمیتواند کمتر از 1 باشد',isVisible: true}))
        if (type == 'plus' && allPassengers == 9) dispatch(setReduxNotification({state:'error', message: 'حداکثر تعداد مسافران 9 نفر است',isVisible: true}))
    }

    const childHandle = (type: string) => {
        if (type == 'plus') {
            if (allPassengers < 9 && child+infant < adult * 3) {
                setChild((prev: number) => prev+1)
            }
            else {
                dispatch(setReduxNotification({state:'error', message: 'به ازای هر بزرگسال 3 کودک , یا 2 کودک 1 نوزاد',isVisible: true}))
            }
        }
        else if (type == 'minus' && child > 0) {
            setChild((prev: number) => prev-1)
        }
        if (type == 'plus' && allPassengers == 9) dispatch(setReduxNotification({state:'error', message: 'حداکثر تعداد مسافران 9 نفر است',isVisible: true}))

    }

    const infantHandle = (type: string) => {
        if (type == 'plus') {
            if (allPassengers < 9 && infant < adult && child+infant < adult * 3) {
                setInfant((prev: number) => prev+1)
            }
            else if (allPassengers < 9 && infant < adult && child+infant >= adult * 3){
                dispatch(setReduxNotification({state:'error', message: 'به ازای هر بزرگسال 3 کودک , یا 2 کودک 1 نوزاد',isVisible: true}))
            }
            else {
                dispatch(setReduxNotification({state:'error', message: 'تعداد نوزاد ها نمیتواند از تعداد بزرگسالان بیشتر باشد',isVisible: true}))
            }
        }
        else if (type == 'minus' && infant > 0) {
            setInfant((prev: number) => prev-1)
        }
        if (type == 'plus' && allPassengers == 9) dispatch(setReduxNotification({state:'error', message: 'حداکثر تعداد مسافران 9 نفر است',isVisible: true}))
    }

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setPassengersOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSearchData({...SearchData, adult})
    }, [adult])

    useEffect(() => {
        setSearchData({...SearchData, child})
    }, [child])

    useEffect(() => {
        setSearchData({...SearchData, infant})
    }, [infant])
    const passengersItem = (content: string, count: any, countHandel:any) => {
        return (
            <div className="flex text-sm justify-between">
                <p>{content}</p>
                <div className="flex">
                    <button type="button" onClick={() => countHandel('minus')} >
                        <Minus className="w-6 fill-white bg-gray-700 rounded-full m-auto" />
                    </button>
                    <span className="mr-3 ml-3">{count}</span>
                    <button type="button" onClick={() => countHandel('plus')}>
                        <Plus className="w-6 fill-white bg-gray-700 rounded-full m-auto"/>
                    </button>
                </div>
            </div>
    )
}

    return (
        <div ref={wrapperRef}>
            <button type="button" className={`bg-white h-12 p-2 m-1 flex items-center rounded text-blue-800 text-sm w-32 max-sm:w-26 relative
                before:w-2.5 before:h-2.5 before:inline-block border-1 border-gray-200 ${passengersOpen ? "before:-rotate-135" : "before:rotate-45"}  before:border-b-2 before:border-r-2 before:carret-down before:absolute before:border-neutral-500 rtl:before:left-3 ltr:before:right-3 before:top-1/2 before:-mt-1.5`}
                onClick={() => setPassengersOpen(true)}>
                <span className="ml-1 mr-1">{allPassengers}</span>
                مسافران
            </button>
            <div className={`bg-white text-gray-600 w-72 p-3 pt-5 pb-5 ${passengersOpen ? "visible opacity-100 mt-0" : "invisible opacity-0 mt-1"}
            absolute top-34 max-sm:top-42 left-6 max-sm:left-0 max-sm:right-1 space-y-5 rounded-sm duration-100 shadow-lg shadow-gray-600`}>
                {passengersItem('بزرگسال (+12 سال)', adult, adultHandle)}
                {passengersItem('کودک (2 تا 11 سال)', child, childHandle)}
                {passengersItem(' نوزاد (زیر 2 سال)', infant, infantHandle)}
            </div>
        </div>
    )
}

export default FlightSearchPassengers;