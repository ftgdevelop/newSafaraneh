import DatePickerModern from "@/modules/shared/components/ui/DatePickerModern";
import { addSomeDays, checkDateIsAfterDate, dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Calendar, Minus } from "@/modules/shared/components/ui/icons";
import { SearchDataType } from "./FlightSearch";

const FlightSearchDate: React.FC<any> = ({SearchData, setSearchData}: {SearchData: SearchDataType, setSearchData: any}) => {

    const onChangeCheckout = (d:string) => {
        setDates(prevState => {
            if (!d) {return prevState;}
            const prevCheckin = prevState?.length ? prevState[0] : "";
            return ( [prevCheckin, d])
        })
    }
    let router = useRouter()
    const today = dateFormat(new Date())
    let passed = router.query.deprating || today
    const [dates, setDates] = useState<[any, any]>([passed, router.query.returning || null]);
    
    useEffect(() => {
        if (dates[0]) setSearchData({...SearchData, departing: dates[0]})
        if (dates[1]) setSearchData({...SearchData, returning: dates[1]})
    } ,[dates])
    useEffect(() => {
        if (SearchData?.BackForth && !dates[1]) {
            let minimumDestination = dates ? dateFormat(addSomeDays(new Date(dates[0]))) : dateFormat(addSomeDays(new Date()))
            setDates([dates[0], minimumDestination])
            setSearchData({...SearchData, returning: minimumDestination})
        }
        else {
            setDates([dates[0], null])
            setSearchData({...SearchData, returning: null})
        }
    } ,[SearchData?.BackForth])

    const onChangeCheckin = (d:string) => {
        setDates(prevState => {
            if (!d) {return prevState;}
            const prevCheckout = prevState?.length ? prevState[1] : "";
            if (prevCheckout){
                const isAfter  = checkDateIsAfterDate(new Date(d), new Date(prevCheckout));
                if (isAfter) {
                    const firstAvailableCheckout = dateFormat(addSomeDays(new Date(d)));
                    return ([d, firstAvailableCheckout]);
                }
            }
            return ( [d, prevCheckout])
        })
    }
    const [locale, setLocale] = useState<"fa" | "en">("fa");

    const deleteReturnDate = () => {
        if (dates[1]) {
            setDates([dates[0], null])
            setSearchData({ ...SearchData, BackForth: false})
        }
        
    }

    return (
        <div className="modernCalendar-dates-wrapper grid grid-cols-2 gap-2">
            <div className="relative modernDatePicker-checkin">
                <DatePickerModern
                wrapperClassName="block"
                minimumDate={dateDiplayFormat({date:new Date().toISOString(), locale:'en',format:"YYYY-MM-DD" })}
                inputPlaceholder="ورود"
                inputClassName="border border-neutral-400 h-12 rounded-lg focus:border-neutral-900 outline-none pt-7 text-xs w-full pr-10"
                inputName="checkin"
                toggleLocale={()=>{setLocale(prevState => prevState === 'fa'? "en":"fa")}}
                locale={locale}
                onChange={(v:string) => {onChangeCheckin(v)}}
                value={dates[0] ? dates[0] : undefined}
            />
            <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -mt-2.5 right-3 absolute z-[100] select-none pointer-events-none" />
            <label className="absolute top-1.5 leading-5 rtl:right-10 text-4xs z-[100] select-none pointer-events-none">
                تاریخ رفت
            </label>
        </div>
        <div className="relative modernDatePicker-checkout">
            <DatePickerModern
                wrapperClassName="block"
                minimumDate={dateDiplayFormat({date:dates ? dateFormat(addSomeDays(new Date(dates[0]))) : dateFormat(addSomeDays(new Date())) , locale:'en',format:"YYYY-MM-DD" })}
                inputPlaceholder="ورود"
                inputClassName="border border-neutral-400 h-12 rounded-lg focus:border-neutral-900 outline-none pt-7 text-xs w-full pr-10"
                inputName="checkin"
                toggleLocale={()=>{setLocale(prevState => prevState === 'fa'? "en":"fa")}}
                locale={locale}
                onChange={(v:string) => {onChangeCheckout(v)}}
                value={dates[1] ? dates[1] : undefined}
            />
            <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -mt-2.5 right-3 absolute z-[100] select-none pointer-events-none" />
            <label className="absolute top-1.5 leading-5 rtl:right-10 text-4xs z-[100] select-none pointer-events-none">
                تاریخ یرگشت
            </label>
            <button type="button" onClick={deleteReturnDate} className={`bg-gray-600 rounded-sm top-1/2 cursor-pointer -mt-2.5 absolute z-[100] left-2
            ${dates[1] == null ? 'hidden' : ''}`}>        
                <Minus className='w-6 h-6 fill-white'/>
            </button>
            </div>
        </div>
    )
}

export default FlightSearchDate;