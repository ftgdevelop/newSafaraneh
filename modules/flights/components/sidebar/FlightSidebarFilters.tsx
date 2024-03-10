import { useContext, useEffect, useState } from "react";
import { FlightsDataContext } from "@/pages/flights/[flights]";
import FlightSidebarAirlines from "./FlightSidebarAirlines";
import FlightSidebarHours from "./FlightSidebarHours";
import FlightSidebarPriceRange from "./FlightSidebarPriceRange";
import FlightSidebarFlightType from "./FlightSidebarFlightType";

const FlightSidebarFilters: React.FC = () => {
    const FlightsData = useContext(FlightsDataContext)   
    const [OpenSide, setOpenSide] = useState<boolean>(false)
    
    useEffect(() => {
        if (OpenSide) {
            document.getElementById('main')?.setAttribute('style', 'z-index:50')
            document.body?.setAttribute('style', 'overflow: hidden')
        }
        else {
            document.getElementById('main')?.setAttribute('style', '')
            document.body?.setAttribute('style', '')
        }
    },[OpenSide])

    return (
        <>
            <div className={`w-1/4 h-fit shadow max-lg:fixed max-lg:top-0 max-lg:-right-1 max-lg:overflow-y-auto p-4 pt-2 divide-y space-y-2 max-lg:w-2/5 max-md:w-3/5
            max-sm:w-10/12 max-lg:h-screen bg-white border-1 border-gray-200 rounded max-lg:rounded-none z-20 duration-300 max-lg:border-0
            ${OpenSide ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'}`}
            >
                <div>
                    <h3 className="font-semibold">نتیجه جستجوی شما</h3>
                    <p className="text-2xs">{FlightsData?.length} پرواز پیدا شد</p>
                </div>
                <FlightSidebarAirlines FlightsData={FlightsData} />            
                <FlightSidebarHours />
                <FlightSidebarPriceRange />
                <FlightSidebarFlightType />
                </div>
 
            <div className={`bg-black/75 z-10 fixed top-0 left-0 backdrop-blur contrast-100 ${!OpenSide ? 'hidden' : 'max-lg:w-full h-full'}`}
                onClick={e => setOpenSide(prevState => !prevState)}>
            </div>

            <button
                className={`bg-blue-600 p-2 pl-4 pr-4 rounded-xl z-10 hidden text-white fixed bottom-4 left-1/2 -translate-x-1/2
                ${OpenSide ? 'hidden' : 'max-lg:inline-block'}`}
                type="submit"
                onClick={e => setOpenSide(prevState => !prevState)}>
                فیلتر
            </button>
               
            </>
    )
}

export default FlightSidebarFilters;