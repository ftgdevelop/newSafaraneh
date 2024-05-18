import { FlightType } from "../../types/flights";
import { useState } from "react";
import PriceInfo from "./PriceInfo";
import GeneralData from './GeneralData'

type PassengersType = {
    adults:number;
    children:number;
    infants:number;
}
const FlightItem: React.FC<any> = ({ flightData,passengers } : {flightData : FlightType , passengers: PassengersType}) => {
    
    const [OpenDetail, setOpenDetail] = useState<boolean>(false)
    return (
        <>
            <div className="flex mt-5 border-1 shadow-sm border-gray-200">
                <GeneralData flightData={flightData} detail={OpenDetail} changeOpenDetail={(open : boolean) => setOpenDetail(open) } />
                <PriceInfo flightData={flightData} detail={OpenDetail} passengers={passengers} />
            </div>
        </>
    )
}

export default FlightItem;