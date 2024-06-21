import { ArrowLeft } from "@/modules/shared/components/ui/icons";
import { useDispatch } from "react-redux";
import { setSearchChangeOn } from "../../stroe/busSlice";
import { dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";

const SearchData: React.FC<any> = ({ setShowSearch }) => {
    const today = dateFormat(new Date())
    const query = useRouter().query

    return (
            <div className="flex flex-wrap h-fit relative gap-10 max-lg:gap-8 max-md:gap-5 max-sm:gap-4 cursor-pointer
            max-sm:justify-around max-sm:border-1 max-sm:border-gray-200 max-sm:p-3 rounded w-full"
            onClick={() => null}>
            
            <p className="max-md:text-sm my-auto">تهران</p>
            <ArrowLeft className="w-5 max-sm:w-4 fill-gray-400 ltr:rotate-180" />
            <p className="max-md:text-sm my-auto">اصفهان</p>

            <span className="border-e-1 border-gray-200 h-14 max-sm:hidden"></span>
            
            <div>
                <p className="text-xs max-lg:text-4xs text-gray-400">تاریخ رفت</p>
                <p className="max-md:text-xs">{dateDiplayFormat({ date: (query.departureTime as string), locale: 'fa', format: 'ddd dd mm' }) ||
                        dateDiplayFormat({date:today, locale:'fa',format:'ddd dd mm'})}</p>
            </div>
                
            <button className="bg-blue-800 text-white text-sm max-md:text-xs rounded-md p-1 pl-2 pr-2 h-fit whitespace-nowrap 
                absolute rtl:left-0 ltr:right-0 max-sm:sticky max-sm:w-full hover:bg-blue-600 duration-300"
                type="button"
                onClick={()=> setShowSearch(true)}
            >
                    تغییر جستجو
            </button>
        </div>
    )
}

export default SearchData;