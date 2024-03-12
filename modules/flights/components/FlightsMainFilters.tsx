import { useContext } from "react";
import { Plus, RightCaret } from "../../shared/components/ui/icons";
import FlightsFlightItem from "./flightItem/FlightFlightItem";
import { FlightsDataContext } from "@/pages/flights/[flights]";

const FlightFilters: React.FC = () => {
    const FlightsData = useContext(FlightsDataContext)   
    
    return (
        <>
        <hr className="w-full mt-4 max-sm:hidden"/>
        <div className="mt-3 flex justify-between items-center max-md:block max-md:space-y-5">
            <div className="inline-block">
                <h3 className="text-sm font-semibold">فیلتر های پیشنهادی :</h3>
                <div className="text-xs flex gap-1 mt-2 text-blue-700 shadow rounded-full justify-center shadow-blue-600 bg-blue-100/15 cursor-pointer">
                    <Plus className="w-4 rotate-45 fill-blue-700"/>
                    قبل از 6:00 صبح
                </div>
            </div>

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
                    <p className="bg-white border-1 text-sm text-blue-700 text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-lg
                    hover:border-blue-800 border-white duration-100 whitespace-nowrap">کمترین قیمت</p>
                    <p className="bg-white text-sm text-blue-700 text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-lg
                    hover:border-blue-800 border-white border-1 duration-100 whitespace-nowrap">بیشترین قیمت</p>
                    <p className="bg-white text-sm text-blue-700 text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-lg
                    hover:border-blue-800 border-white border-1 duration-100 whitespace-nowrap">زمان پرواز</p>
                </div>
            </div>

            {
                FlightsData?.map((flight : any) => 
                    <FlightsFlightItem flightData={flight} />
                )
            }
        </>    
    )
}

export default FlightFilters;