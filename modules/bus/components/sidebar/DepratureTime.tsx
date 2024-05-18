import Checkbox from "@/modules/shared/components/ui/Checkbox";

const DepratureTime: React.FC = () => {

    const checkbox = (minTime: number, maxTime: number, filterName: string) => {
        return (
            <Checkbox
                label={<p className="text-xs">{filterName}</p>}
                onChange={() => null}
                value=""
                checked={undefined}
                />
        )
    }
    return (
        <div className="text-xs pt-2 pb-2">
            <div className="flex justify-between items-center">
                <h5 className="text-sm font-semibold mb-2">ساعت حرکت</h5>
                <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                    onClick={() => null} 
                >
                    حذف
                </button>
            </div>    
            {checkbox(0, 6, 'قبل از 6:00 صبح')}
            {checkbox(6, 12, '۶:۰۰ صبح تا ۱۱:۵۹ ظهر')}
            {checkbox(12, 18, '۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر')}
            {checkbox(18, 24, 'بعد از ۱۸:۰۰ بعد از ظهر')}
        </div> 
    )
}

export default DepratureTime;