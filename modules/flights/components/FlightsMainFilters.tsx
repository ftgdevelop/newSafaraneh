import { RightCaret } from "../../shared/components/ui/icons";
import { FlightType } from "../types/flights";
import FlightSidebarFilterResult from "./FlightSidebarFilterResult";


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

    return (
        <>
        <hr className="w-full mt-4 max-sm:hidden"/>
            <div className="mt-3 flex gap-2 justify-between items-center max-md:block max-md:space-y-5">
               
                <FlightSidebarFilterResult />
                <div className="flex gap-3 bg-white w-fit text-sm text-gray-500 rounded
                        h-fit max-md:w-full justify-center max-md:justify-around shadow-md">
                    <p className="flex hover:bg-gray-100 duration-200 p-1 pl-2 pr-2 w-full justify-center cursor-pointer whitespace-nowrap">
                        <RightCaret className="w-5 fill-gray-400 ltr:rotate-180" />
                        روز قبل
                    </p>
                    <p className="pr-2 pl-2 p-1 w-full whitespace-nowrap text-center">5 اسفند 1402</p>
                    <p className="flex hover:bg-gray-100 duration-200 p-1 pr-2 pl-2 w-full justify-center cursor-pointer whitespace-nowrap">
                        روز بعد
                        <RightCaret className="w-5 rtl:rotate-180 fill-gray-400"/>
                    </p>
                </div>
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