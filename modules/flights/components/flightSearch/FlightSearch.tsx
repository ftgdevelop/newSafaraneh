import Select from "@/modules/shared/components/ui/Select";
import { LeftCaret } from "@/modules/shared/components/ui/icons";
import FlightSearchPassengers from "./FlightSearchPassengers";
import { useState } from "react";

const FlightSearch: React.FC = () => {
    const [passengersOn, setPassengersOn] = useState(false)
    return (
        <>
            <div className="flex justify-between max-sm:block items-center space-y-9">
                <div className="flex">
                    <button type="button"
                        className="p-2 max-sm:p-1: text-blue-800 bg-blue-50 rounded-xl text-sm max-sm:text-xs cursor-pointer m-1">
                        یک طرفه
                    </button>
                    <button type="button"
                        className="p-2 max-sm:p-1: text-blue-800 bg-blue-50 rounded-xl text-sm max-sm:text-xs cursor-pointer m-1">
                        رفت و برگشت
                    </button>
                </div>
                <div className="flex content-center">
                    <button type="button" className="bg-white p-2 flex items-center rounded-sm text-blue-800 text-sm w-32 relative"
                     onClick={() => setPassengersOn(prev => !prev)}>
                        <span className="ml-1 mr-1">8</span>
                        مسافران
                        <LeftCaret className="w-7 fill-gray-500 -rotate-90 absolute left-1 top-3"/>
                    </button>
                    <Select
                        onChange={() => null}
                        items={[{ label: 'همه', value: 'all' }, { label: 'اکونومی', value: 'economy' }, { label: 'بیزنس', value: 'bussines' }]}
                        placeholder="همه"
                        value="i"
                        className="text-blue-800 w-32"
                    />
                </div>
            </div>    
            <FlightSearchPassengers passengersOn={passengersOn} />
        </>
    )
}

export default FlightSearch;