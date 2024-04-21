import { useRouter } from "next/router";
import { RightCaret } from "../../shared/components/ui/icons";
import FlightSidebarFilterResult from "./FlightSidebarFilterResult";
import { dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";

const FlightMainFilters: React.FC<any> = ({ changeSortFlights, sortFlights} : {changeSortFlights: any, sortFlights: string}) => {

    const SortItem = (value: string, sortValue: string) => {
        return (
            <button type="button" className={`border-1 text-sm text-blue-700 text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-md
             hover:border-blue-800 duration-100 whitespace-nowrap rounded-sm ${sortValue == sortFlights ?
             'bg-blue-100/20 border-blue-800 shadow-blue-700/30' : 'bg-white'}`}
             onClick={() => changeSortFlights(sortValue)}>
                {value}
            </button>
        )
    }
    
    const router = useRouter()
    const changeDate = (type: string) => {
        const queryDate: any = (router.query.departing as string).split('-')
        const today = dateFormat(new Date())
        if (type == 'tomorrow') {
            queryDate[2] = (+queryDate[2] + 1).toString()
            return queryDate.join('-')
        }
        else if (type == 'yesterday') {
            if (+today.split('-')[2] < +queryDate[2]) {
                queryDate[2] = (+queryDate[2] - 1).toString()
                return queryDate.join('-')
            }
            return today
        }
    }
    return (
        <>
        <hr className="w-full mt-4 max-sm:hidden"/>
            <div className="mt-3 flex gap-2 justify-between items-center max-md:block max-md:space-y-5">
               
                <FlightSidebarFilterResult />
                {
                    !router.query.returning && 
                        <div className="flex gap-3 bg-white w-fit text-sm text-gray-500 rounded
                                h-fit max-md:w-full justify-center max-md:justify-around shadow-md">
                            <button type="button" className="flex hover:bg-gray-100 duration-200 p-1 pl-2 pr-2 w-full justify-center items-center cursor-pointer whitespace-nowrap"
                            onClick={() => router.replace({query: {...router.query,departing:changeDate('yesterday')}})}>
                                <RightCaret className="w-5 fill-gray-400 ltr:rotate-180" />
                                روز قبل
                            </button>
                            <p className="pr-2 pl-2 p-1 w-full whitespace-nowrap text-center">{dateDiplayFormat({date:(router.query.departing as string), locale:'fa',format:'ddd dd mm'})}</p>
                            <button type="button" className="flex hover:bg-gray-100 duration-200 p-1 pr-2 pl-2 w-full justify-center items-center cursor-pointer whitespace-nowrap"
                            onClick={() => router.replace({query: {...router.query,departing:changeDate('tomorrow')}})}>
                                روز بعد
                                <RightCaret className="w-5 rtl:rotate-180 fill-gray-400"/>
                            </button>
                        </div>
                }
            </div>
                
                <div className="flex gap-4 mt-6 items-center">
                    <h5 className="font-semibold text-sm whitespace-nowrap max-lg:hidden">مرتب سازی بر اساس:</h5>
                    <div className="flex w-full gap-2">
                        {SortItem('کمترین قیمت', "LowestPrice")}
                        {SortItem('بیشترین قیمت', "HighestPrice")}
                        {SortItem('زمان پرواز', "Time")}
                    </div>
            </div>
        </>
    )
}

export default FlightMainFilters;