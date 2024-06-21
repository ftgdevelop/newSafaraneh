import { RightCaret } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import SearchBus from "../../shared/searchForm/SearchBus";
import { useRouter } from "next/router";

const ChangeDay: React.FC = () => {
    const today = dateFormat(new Date())
    const query = useRouter().query

    return (
        <>
            <hr className="w-full mt-4 max-sm:hidden"/>   
            <div className="mt-3 flex gap-2 justify-between items-center max-md:block max-md:space-y-5">
                <div className="flex gap-3 bg-white w-fit text-sm text-gray-500 rounded
                    h-fit max-md:w-full justify-center max-md:justify-around shadow-md">
                    <button type="button" className="flex hover:bg-gray-100 duration-200 p-1 pl-2 pr-2 w-full justify-center items-center cursor-pointer whitespace-nowrap"
                    onClick={() => null}>
                    <RightCaret className="w-5 fill-gray-400 ltr:rotate-180" />
                        روز قبل
                    </button>
                    <p className="pr-2 pl-2 p-1 w-full whitespace-nowrap text-center">{dateDiplayFormat({ date: (query.departureTime as string), locale: 'fa', format: 'ddd dd mm' }) ||
                        dateDiplayFormat({date:today, locale:'fa',format:'ddd dd mm'})}</p>
                    <button type="button" className="flex hover:bg-gray-100 duration-200 p-1 pr-2 pl-2 w-full justify-center items-center cursor-pointer whitespace-nowrap"
                       onClick={() => null}>
                            روز بعد
                        <RightCaret className="w-5 rtl:rotate-180 fill-gray-400"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChangeDay;