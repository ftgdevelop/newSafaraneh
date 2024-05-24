import Checkbox from "@/modules/shared/components/ui/Checkbox";
import Image from "next/image";
import { BusItemType } from "../../types";

type Props = {
    busData: BusItemType[] | undefined
}
const BusComponies: React.FC<Props> = props => {
    const { busData } = props
    const busComponies: BusItemType[] = []
    busData?.map((bus) => {
        if (!busComponies.find(i => i.office.id == bus.office.id)) {
            busComponies.push(bus)
        }
    })
    console.log(busComponies)
    
    return (
        <div className="pt-2 pb-2 overflow-hidden">
        <div className="flex justify-between items-center">
            <h5 className="text-sm font-semibold mb-2">شرکت های اتوبوسرانی</h5>
                <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                onClick={() => null} 
                >
                    حذف
                </button>
        </div> 
            {
                busComponies?.map(item => 
                    <Checkbox
                        label={
                        (<div className="flex w-full">
                            <div className="flex gap-1">
                                <Image
                                    src={item.office.picture.path}
                                    alt=""
                                    height={30} width={30} className={`w-6 h-6`}/>
                            </div>
                            <p className="text-2xs truncate whitespace-nowrap">{item.office.name}</p>
                        </div>
                        )}
                        onChange={() => null}
                        value={''}
                        checked={undefined}
                        className="w-fit"
                    />
                )
            }
    </div>
    )
}

export default BusComponies;