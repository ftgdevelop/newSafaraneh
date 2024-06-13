import { useState } from "react";
import SeatInfo from "./SeatInfo";

const BusDeatil: React.FC<any> = ({busToken, busCapacity}) => {
    const [seatInfoOn, setSeatInfoOn] = useState(true)
    return (
        <div>
            <ul className="flex justify-between text-sm max-sm:text-xs py-2 px-4">
                <li className={`w-1/2 text-center border-b-2 p-1 cursor-pointer ${seatInfoOn ? ' border-blue-700' : 'border-gray-300'}`}
                onClick={() => setSeatInfoOn(true)}>اطلاعات سفر</li>
                <li className={`w-1/2 text-center border-b-2 p-1 cursor-pointer ${!seatInfoOn ? ' border-blue-700' : 'border-gray-300'}`}
                onClick={() => setSeatInfoOn(false)}>قوانین و استرداد</li>
            </ul>
            {
                seatInfoOn ? 
                    <SeatInfo busToken={busToken} busCapacity={busCapacity} /> :
                    <div className="p-5 space-y-3">
                        <div className="grid grid-cols-5 w-full text-xs">
                            <p className="bg-white p-2 max-sm:p-1 text-center">10% جریمه</p>
                            <p className="col-span-4 bg-blue-400 text-white p-2 max-sm:p-1">از زمان صدور تا یک ساعت قبل حرکت</p>
                        </div>
                        <div className="grid grid-cols-5 w-full text-xs">
                            <p className="bg-white p-2 max-sm:p-1 text-center">جریمه 50% حضوری</p>
                            <p className="col-span-4 bg-blue-800 text-white p-2 max-sm:p-1">امکان استرداد بلیط از یک ساعت قبل حرکت تا بعد از حرکت</p>
                        </div>
                    </div>
            }
        </div>
    )
}


export default BusDeatil;