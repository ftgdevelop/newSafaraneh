import { FlightType } from "../../types/flights";
import { useState } from "react";
import FlightDataItem from "./FlightGeneralData";
import FlightPurcheInfo from "./FlightPurcheInfo";

type PassengersType = {
    adults:number;
    children:number;
    infants:number;
}
const FlightsFlightItem: React.FC<any> = ({ flightData,passengers } : {flightData : FlightType , passengers: PassengersType}) => {
    
    const [OpenDetail, setOpenDetail] = useState<boolean>(false)
    return (
        <>
            <div className="flex mt-5 border-1 shadow-sm border-gray-200">
                <FlightDataItem flightData={flightData} detail={OpenDetail} changeOpenDetail={(open : boolean) => setOpenDetail(open) } />
                <FlightPurcheInfo flightData={flightData} detail={OpenDetail} passengers={passengers} />
            </div>
        </>
    )
}

export default FlightsFlightItem;