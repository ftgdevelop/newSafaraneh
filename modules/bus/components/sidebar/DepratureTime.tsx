import Checkbox from "@/modules/shared/components/ui/Checkbox";
import { RootState } from "@/modules/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../../stroe/busSlice";

const DepratureTime: React.FC = () => {
    const TimeFilter = useSelector((state: RootState) => state.busFilters.filterOption.time)
    const dispatch = useDispatch()
    const CheckboxOnchange = (checked: any, time: number[], filterName: string) => {
        if (checked) {
            dispatch(setTime(TimeFilter.concat({minTime: time[0], maxTime: time[1], filterName})))
        }
        else {
            dispatch(setTime(TimeFilter.filter((item:any) => item.filterName !== filterName)))
        }
    }

    const checkbox = (minTime: number, maxTime: number, filterName: string) => {
        return (
            <Checkbox
                label={<p className="text-xs">{filterName}</p>}
                onChange={(e) => CheckboxOnchange(e, [minTime,maxTime], filterName)}
                value=""
                checked={TimeFilter.find(item => item.filterName == filterName) ? true : false}
                />
        )
    }
    return (
        <div className="text-xs pt-2 pb-2">
            <div className="flex justify-between items-center">
                <h5 className="text-sm font-semibold mb-2">ساعت حرکت</h5>
                {
                TimeFilter.length ?         
                    <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                    onClick={() => dispatch(setTime([]))} 
                    >
                        حذف
                    </button> : 
                    <p></p>
                }    
            </div>    
            {checkbox(0, 6, 'قبل از 6:00 صبح')}
            {checkbox(6, 12, '۶:۰۰ صبح تا ۱۱:۵۹ ظهر')}
            {checkbox(12, 18, '۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر')}
            {checkbox(18, 24, 'بعد از ۱۸:۰۰ بعد از ظهر')}
        </div> 
    )
}

export default DepratureTime;