import { useRouter } from "next/router";
import { ArrowLeft } from "../../shared/components/ui/icons";
import { FlightType } from "../types/flights";

const FlightSearchData: React.FC<any> = ({FlightsData} : {FlightsData : FlightType[]}) => {
    const query: any = useRouter().query

    
    const departureCity = FlightsData.find(item => item.departureAirport?.city?.code == query.flights.split('-')[0])?.departureAirport?.city?.name
    const arrivalCity = FlightsData.find(item => item.arrivalAirport?.city?.code == query.flights.split('-')[1])?.arrivalAirport?.city?.name


    return (
        <div className="flex flex-wrap h-fit relative gap-10 max-md:gap-5 max-sm:gap-4 cursor-pointer
            max-sm:justify-around max-sm:border-1 max-sm:border-gray-200 max-sm:p-3 rounded">
                
                    <div>
                        <p className="text-sm max-md:text-2xs">{query.flights.split('-')[0]}</p>
                        <p className="text-gray-500 text-sm max-lg:text-xs max-md:text-3xs">{departureCity}</p>
                    </div>
                    <ArrowLeft className="w-5 max-sm:w-4 fill-gray-400 ltr:rotate-180" />
                    <div>
                        <p className="text-sm max-md:text-2xs">{query.flights.split('-')[1]}</p>
                        <p className="text-gray-500 text-sm max-lg:text-xs max-md:text-3xs">{arrivalCity}</p>
                    </div>

                    <span className="border-e-1 border-gray-200 h-14 max-sm:hidden"></span>
            
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">تاریخ رفت</p>
                        <p className="text-sm max-md:text-2xs">یکشنبه 13 اسفند</p>
                    </div>
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">مسافران</p>
                        <p className="text-sm max-md:text-2xs">{+query.adult + +query.child + +query.infant || 1}</p>
                    </div>
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">کابین</p>
                        <p className="text-sm max-md:text-2xs">اکونومی</p>
                    </div>
                
                    <button className="bg-blue-800 text-white text-sm max-md:text-xs rounded-md p-1 pl-2 pr-2 h-fit whitespace-nowrap mt-auto mb-auto
                    absolute rtl:left-0 ltr:right-0 max-sm:sticky max-sm:w-full hover:bg-blue-600 duration-300"
                        type="submit">
                        تغییر جستجو
                    </button>
            </div>
    )
}

export default FlightSearchData;