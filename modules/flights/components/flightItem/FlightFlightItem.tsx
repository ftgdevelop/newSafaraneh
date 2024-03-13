import { FlightType } from "../../types/flights";
import { useState } from "react";
import FlightDataItem from "./FlightGeneralData";
import FlightPurcheInfo from "./FlightPurcheInfo";

const FlightsFlightItem: React.FC<any> = ({ flightData } : {flightData : FlightType}) => {
    
    const [OpenDetail, setOpenDetail] = useState<boolean>(false)
    return (
        <>
            <div className="flex mt-6 border-1 shadow-sm border-gray-200">
                <FlightDataItem flightData={flightData} detail={OpenDetail} changeOpenDetail={(parametr : boolean) => setOpenDetail(parametr) } />
                <FlightPurcheInfo flightData={flightData} detail={OpenDetail} />
            </div>
        </>
    )
}

export default FlightsFlightItem;