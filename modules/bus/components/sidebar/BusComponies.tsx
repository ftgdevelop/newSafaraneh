import Checkbox from "@/modules/shared/components/ui/Checkbox";
import Image from "next/image";
import { BusItemType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/shared/store";
import { setBusComponies } from "../../stroe/busSlice";

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
    const BusComponiesFliter = useSelector((state: RootState) => state.busFilters.filterOption.busComponies)
    const dispatch = useDispatch()

    const checkboxOnchange = (checked: boolean, componyName:string) => {
        if (checked) {
            dispatch(setBusComponies(BusComponiesFliter.concat(componyName)))
        }
        else {
            dispatch(setBusComponies(BusComponiesFliter.filter(item => item !== componyName)))
        }
    }
    return (
        <div className="pt-2 pb-2 overflow-hidden">
        <div className="flex justify-between items-center">
            <h5 className="text-sm font-semibold mb-2">شرکت های اتوبوسرانی</h5>
            {
                BusComponiesFliter.length ?         
                    <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                    onClick={() => dispatch(setBusComponies([]))} 
                    >
                        حذف
                    </button> : 
                    <p></p>
            }    
        </div> 
            {
                busComponies?.map(item => 
                    <Checkbox
                        label={
                        (<div className="flex w-full">
                            <div className="flex gap-1">
                                <Image
                                    src={item.office.picture.path}
                                    alt={item.office.code}
                                    height={30} width={30} className={`w-6 h-6`}/>
                            </div>
                            <p className="text-2xs truncate whitespace-nowrap">{item.office.name}</p>
                        </div>
                        )}
                        onChange={(e) => checkboxOnchange(e, item.office.name)}
                        value={item.office.name}
                        checked={BusComponiesFliter.includes(item.office.name) ? true : false}
                        className="w-fit"
                    />
                )
            }
    </div>
    )
}

export default BusComponies;