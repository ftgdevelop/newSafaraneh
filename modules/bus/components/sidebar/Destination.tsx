import Checkbox from "@/modules/shared/components/ui/Checkbox";

const Destination: React.FC = () => {

    const checkbox = (filterName: string) => {
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
                <h5 className="text-sm font-semibold mb-2">پایانه</h5>
                <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                    onClick={() => null} 
                >
                    حذف
                </button>
            </div>
            {checkbox('پایانه غرب')}
            {checkbox('پایانه شرق')}
            {checkbox('پایانه جنوب')}
            {checkbox('پایانه بیهقی')}
        </div>
    )
}

export default Destination;