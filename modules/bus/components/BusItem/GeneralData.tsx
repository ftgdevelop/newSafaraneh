import { Airpalne, RightCaret } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import Image from "next/image";

const GeneralData: React.FC = () => {
    const today = dateFormat(new Date())

    return (
        <div className="w-4/5 border-e-1 border-gray-300 border-dashed relative">
            <span className="w-6 h-6 bg-body-background rounded-full absolute -left-3 -top-2"></span>
            <div className="grid grid-cols-5 bg-white items-center p-6 max-md:pl-2 max-md:pr-2 max-sm:p-3 max-sm:grid-cols-3 max-sm:justify-items-center"
            onClick={e => null}>
                <div className="grid max-sm:flex max-sm:col-span-3 max-sm:justify-self-start max-sm:pb-3">
                    <Image src=''
                        alt=''
                        width={50} height={30} className={`w-12 h-12 max-sm:w-8 max-sm:h-8`} />
                    <span className="mr-1 ml-1 text-3xs max-sm:text-4xs leading-5 text-center">
                        شرکت همسفر چابکسواران اصفهان پایانه صفه
                        <span className="bg-gray-200 px-1 rounded-sm block">
                            vip مشترک با کاوه
                        </span>
                    </span>
                </div>

                <p className="text-lg max-sm:text-sm font-bold text-center">
                     تهران
                </p>
                <div className="text-center max-sm:hidden col-span-2">
                    <p className="text-xs text-gray-500">{dateDiplayFormat({ date: today, locale: 'fa', format: 'ddd dd mm' }) || 
                    dateDiplayFormat({ date: today, locale: 'fa', format: 'ddd dd mm' })}</p>
                    <span className="border-t-1 border-gray-200 block m-3 ml-5 mr-5 border-dashed h-1 relative">
                        <Airpalne className="w-12 fill-gray-200 -rotate-90 ltr:rotate-90 absolute -left-7 -bottom-1 ltr:right-0 ltr:-top-2" />
                    </span>    
                    <span className="pl-2 pr-2 text-gray-800 border-1 border-gray-300 text-xs rounded-sm">
                        ساعت حرکت 15:00
                    </span>
                </div>
                <Airpalne className="w-14 relative bottom-5 left-3 fill-gray-300 hidden max-sm:inline -rotate-90 ltr:rotate-90" />        
                <p className="text-lg max-sm:text-sm font-bold text-center">
                    تهران
                </p>
                <span className="w-6 h-6 bg-body-background rounded-full absolute -left-3 -bottom-2"></span>
            </div>
                
                    
                <button type="submit" className="text-xs max-sm:text-2xs bg-gray-100 text-gray-500 flex w-full justify-center"
                    onClick={e => null}>
                     جزئیات پرواز
                    <span><RightCaret className={`w-5 mt-1 fill-gray-500 rotate-90`} /></span>
                </button>
        </div>
    )
}

export default GeneralData;