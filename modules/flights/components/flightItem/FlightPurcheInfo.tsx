import { RightCaret } from "@/modules/shared/components/ui/icons";
import { FlightType } from "../../types/flights";

const FlightPurcheInfo: React.FC<any> = ({flightData , detail} : {flightData : FlightType, detail: boolean}) => {
    return (
        <div className="text-left p-3 bg-white w-1/5 max-sm:w-2/6 grid content-around">
            <div>
            {
                flightData?.capacity ? 
                <p className="text-xl max-lg:text-lg max-sm:text-sm font-bold leading-5 max-sm:leading-4">
                <span className="text-2xs max-sm:text-3xs font-bold block">ریال</span>
                {flightData?.adultPrice}
                </p> :
                <p className="text-xs max-md:text-2xs font-semibold text-gray-400">ظرفیت تکمیل است</p>
            }
            {
                flightData?.capacity ?
                    <button type="submit" className={`flex w-full justify-center bg-blue-800
                    duration-200 text-white p-1 font-semibold max-md:pr-2 max-md:pl-2 rounded-lg text-sm mt-2 whitespace-nowrap  hover:bg-blue-600 max-md:text-xs`}>
                        انتخاب پرواز
                    <RightCaret className="w-5 fill-white my-auto rtl:rotate-180 max-sm:hidden" />
                    </button> :
                    <button type="submit" className={`flex w-full justify-center bg-gray-400 cursor-not-allowed
                    duration-200 text-white p-1 font-semibold max-md:pr-2 max-md:pl-2 rounded-lg text-sm mt-2 whitespace-nowrap`}>
                        انتخاب پرواز
                    <RightCaret className="w-5 fill-white my-auto rtl:rotate-180 max-sm:hidden " />
                    </button>
            }
            {
                flightData?.capacity < 10 && flightData?.capacity !== 0 &&
                <p className="text-3xs text-red-600">{flightData.capacity} صندلی باقیمانده</p>
            }
            </div>    
            {
                detail &&
                <div className="text-3xs max-md:text-4xs text-gray-400 max-lg:text-black">
                    <div className="flex justify-between max-sm:block">
                        <p>بزرگسال (2)</p>
                        <p>{2 * flightData.adultPrice} ریال</p>
                    </div>
                    <div className="flex justify-between max-sm:block">
                        <p>کودک (2)</p>
                        <p>{2 * flightData.adultPrice} ریال</p>
                    </div>
                    <div className="flex justify-between max-sm:block">
                        <p>نوزاد (2)</p>
                        <p>{2 * flightData.adultPrice} ریال</p>
                    </div>
                    <div className="flex justify-between text-sm max-sm:text-xs text-black font-semibold max-sm:block">
                        <p>مجموع</p>
                        <p>{Math.round(2 * flightData.adultPrice + 2 * flightData.adultPrice + 2 * flightData.adultPrice)} ریال</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default FlightPurcheInfo;