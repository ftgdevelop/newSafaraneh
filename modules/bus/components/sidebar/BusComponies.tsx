import Checkbox from "@/modules/shared/components/ui/Checkbox";
import Image from "next/image";

const BusComponies: React.FC = () => {
    return (
        <div className="pt-2 pb-2">
        <div className="flex justify-between items-center">
            <h5 className="text-sm font-semibold mb-2">شرکت های اتوبوسرانی</h5>
                <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                onClick={() => null} 
                >
                    حذف
                </button>
        </div> 
        <Checkbox
            label={
           (<div className="flex w-full">
                <div className="flex gap-1">
                    <Image
                        src={''}
                        alt=""
                        height={30} width={30} className={`w-6 h-6`}/>
                </div>
                <p className="text-xs">شرکت تعاونی اتوبوس ترمینال جنوب</p>
            </div>
            )}
            onChange={() => null}
            value={''}
            checked={undefined}
            />
    </div>
    )
}

export default BusComponies;