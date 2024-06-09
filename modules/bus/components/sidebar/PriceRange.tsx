import Select from "@/modules/shared/components/ui/Select";
import { RootState } from "@/modules/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { BusItemType } from "../../types";
import { setPriceRange } from "../../stroe/busSlice";
type Props = {
    busData: BusItemType[] | undefined
}
const PriceRange: React.FC<Props> = props => {
    const {busData} = props
    const PriceRangeFilter = useSelector((state: RootState) => state.busFilters.filterOption.priceRange)
    const dispatch = useDispatch()

    const MaxPrice = busData ? Math.max(...busData.map(item => item.boardPrice)) : 0
    const MinPrice = busData ?  Math.min(...busData.map(item => (item.boardPrice !== 0 ? item.boardPrice : MaxPrice))) : 0
    const MaxMinDiffrence = Math.ceil(MaxPrice - MinPrice)
    
    const PriceItems = [
        MinPrice,
        MinPrice !== 0 ? Math.ceil(MinPrice + MaxMinDiffrence / 4) : '',
        MinPrice !== 0 ? Math.ceil(MinPrice + MaxMinDiffrence / 2) : '',
        MaxPrice !== 0 ? Math.ceil(MaxPrice - MaxMinDiffrence / 4) : '',
        MaxPrice
    ]

    if(!MinPrice || !MaxPrice || MinPrice === MaxPrice){
        return null;
    }

    return (
        <>
            {
                busData ?
                    <div className="text-xs pt-2 pb-2 space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-semibold mb-2">مبلغ</h2>
                            {
                                PriceRangeFilter?.max || PriceRangeFilter?.min ?
                                    <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                                        onClick={() => null}
                                    >
                                        حذف
                                    </button> :
                                    <p></p>
                            }
                        </div>
                        <div className="grid grid-cols-2 text-xs w-full content-center">
                            <p>حداقل</p>
                            <Select
                                items={PriceItems.map(item => ({ label: `${item.toLocaleString()} ریال`, value: item.toString() }))}
                                placeholder="حداقل"
                                value={PriceRangeFilter?.min?.toString() || '0'}
                                onChange={e => null}
                                className="col-span-2 text-xs whitespace-nowrap h-fit p-1" />
                        </div>

                        <div className="grid grid-cols-2 text-xs w-full content-center">
                            <p>حداکثر</p>
                            <Select
                                items={PriceItems.map(item => ({ label: `${item.toLocaleString()} ریال`, value: item.toString() }))}
                                placeholder="حداکثر"
                                value={PriceRangeFilter?.max?.toString() || '0'}
                                onChange={e => dispatch(setPriceRange({ min: +e, max: PriceRangeFilter?.max }))}
                                className="col-span-2 text-xs whitespace-nowrap h-fit p-1" />
                        </div> 
                    </div>:
                <p></p>
    }
        </>    
    )
}

export default PriceRange;