import { ArrowLeft, RightCaret } from "@/modules/shared/components/ui/icons"
import Image from "next/image"
import FlightDetailItem from "./FlightDetail"
import { FlightType } from "../../types/flights"

const FlightDataItem: React.FC<any> = ({flightData , detail , changeOpenDetail} : {flightData : FlightType, detail : any, changeOpenDetail : any}) => {

    const arrivalTime = flightData?.arrivalTime?.split('T')[1].split(":").slice(0,2).join(":")
    const departureTime = flightData?.departureTime?.split('T')[1].split(":").slice(0, 2).join(":")
    
    
    return (
        <div className="w-4/5 border-e-2 border-gray-300 border-dashed relative">
            <span className="w-6 h-6 bg-slate-100 rounded-full absolute -left-3 -top-2"></span>    
            <div className="grid grid-cols-5 bg-white items-center p-6 max-md:pl-2 max-md:pr-2 max-sm:p-3 max-sm:grid-cols-3 max-sm:justify-items-center"
            onClick={e => changeOpenDetail(!detail)}>
                <div className="flex text-3xs max-sm:text-4xs leading-5 max-sm:col-span-3 max-sm:justify-self-start max-sm:pb-3">
                    <Image src={flightData?.airline?.picture?.path || ''}
                        alt={flightData?.airline?.picture?.altAttribute || ''}
                        width={50} height={30} className={`w-12 h-12 max-sm:w-8 max-sm:h-8 ${!flightData?.capacity ? 'grayscale' : ''}`} />
                    <span className="mr-1 ml-1">
                        {flightData?.airline?.name} <br/>
                        {flightData?.airCraft.name}
                    </span>
                </div>

                <p className="text-lg max-sm:text-sm font-bold text-center">
                    {flightData?.departureAirport?.city?.name} <br />
                    {departureTime}
                </p>
                <div className="text-center max-sm:hidden col-span-2">
                    <p className="text-xs text-gray-400">یکشنبه 13 اسفند</p>
                    <ArrowLeft className="w-4 fill-gray-400 mx-auto mt-2 mb-2 ltr:rotate-180" />
                    <span className="pl-2 pr-2 text-gray-400 border-1 border-gray-200 text-2xs ">
                        {
                             flightData?.flightType == 'System' ? 'سیستمی' :'چارتری'
                        }            
                    </span>
                </div>
                <ArrowLeft className="w-4 fill-gray-400 m-auto hidden max-sm:inline ltr:rotate-180" />        
                <p className="text-lg max-sm:text-sm font-bold text-center">
                    {flightData.arrivalAirport?.city?.name} <br />
                    {arrivalTime}
                </p>
                <span className="w-6 h-6 bg-slate-100 rounded-full absolute -left-3 -bottom-2"></span>           
            </div>
                  
                    {detail && <FlightDetailItem FlightsData={flightData} />}
                    
                    <button type="submit" className="text-xs max-sm:text-2xs bg-gray-100 text-gray-500 flex w-full justify-center"
                    onClick={e => changeOpenDetail(!detail)}>
                    {!detail ? 'جزییات پرواز' : 'بستن جزییات پرواز'}
                    <span><RightCaret className={`w-5 mt-1 ${detail ? '-rotate-90' : 'rotate-90'} fill-gray-500`} /></span>
                </button>
                </div>
    )
}

export default FlightDataItem;