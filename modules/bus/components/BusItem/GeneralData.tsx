import { Airpalne, RightCaret } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import Image from "next/image";
import { BusItemType } from "../../types";
import { useState } from "react";
import SeatInfo from "./SeatInfo";
import BusDeatil from "./BusDetail";
import { useRouter } from "next/router";

type Props = {
    busData: BusItemType
}
const GeneralData: React.FC<Props> = props => {
    const today = dateFormat(new Date())
    const { busData } = props
    const [detailOpen, setDetailOpen] = useState(false)   
    const query = useRouter().query
    
    const depratureTime = busData.departureDateTime.split('T')[1].split(':').slice(0,2).join(':')
    return (
        <div className="w-4/5 border-e-1 border-gray-300 border-dashed relative">
            <span className="w-6 h-6 bg-body-background rounded-full absolute -left-3 -top-2"></span>
            <div className="grid grid-cols-5 bg-white items-center p-6 max-md:pl-2 max-md:pr-2 max-sm:p-3 max-sm:grid-cols-3 max-sm:justify-items-center"
            onClick={e => null}>
                <div className="grid max-sm:flex max-sm:col-span-3 max-sm:justify-self-start max-sm:pb-3">
                    <Image src={busData.office.picture.path}
                        alt=''
                        width={50} height={30} className={`w-12 h-12 max-sm:w-8 max-sm:h-8 m-auto`} />
                    <span className="mr-1 ml-1 text-3xs max-sm:text-4xs leading-5 text-center">
                        {busData.office.nameLong}
                        <span className="bg-gray-200 px-1 rounded-sm block w-fit mx-auto max-sm:mx-0">
                            {busData.carrier.name}
                        </span>
                    </span>
                </div>
                <div className="text-center ">
                    <p className="text-lg max-sm:text-sm font-bold text-center">
                     {busData.source.city.name || busData.source.province.name}
                    </p>
                    <span className="text-2xs">{busData.source.name}</span>
                </div>    
                <div className="text-center max-sm:hidden col-span-2">
                    <p className="text-xs text-gray-500">{dateDiplayFormat({ date: (query.departureTime as string), locale: 'fa', format: 'ddd dd mm' }) || 
                    dateDiplayFormat({ date: today, locale: 'fa', format: 'ddd dd mm' })}</p>
                    <span className="border-t-1 border-gray-200 block m-3 ml-5 mr-5 border-dashed h-1 relative">
                        <Airpalne className="w-12 fill-gray-200 -rotate-90 ltr:rotate-90 absolute -left-7 -bottom-1 ltr:right-0 ltr:-top-2" />
                    </span>    
                    <span className="pl-2 pr-2 text-gray-800 border-1 border-gray-300 text-xs rounded-sm">
                        ساعت حرکت {depratureTime}
                    </span>
                </div>
                <Airpalne className="w-14 relative bottom-5 left-3 fill-gray-300 hidden max-sm:inline -rotate-90 ltr:rotate-90" />  
                <div className="text-center">
                    <p className="text-lg max-sm:text-sm font-bold text-center">
                        {busData.destination.city.name || busData.destination.province.name}
                    </p>
                    <span className="text-2xs">{busData.destination.name}</span>
                </div>
                <span className="w-6 h-6 bg-body-background rounded-full absolute -left-3 -bottom-2"></span>
            </div>
                
                {
                detailOpen && <BusDeatil busToken={busData.token} busCapacity={busData.capacity} />
                }
                    
                <button type="submit" className="text-xs max-sm:text-2xs bg-gray-100 text-gray-500 flex w-full justify-center"
                    onClick={e => setDetailOpen(prev => !prev)}>
                     {!detailOpen ? 'اطلاعات بیشتر' : 'بستن اطلاعات بیشتر'}
                    <span><RightCaret className={`w-5 mt-1 fill-gray-500  ${detailOpen ? '-rotate-90' : 'rotate-90'}`} /></span>
                </button>
        </div>
    )
}

export default GeneralData;