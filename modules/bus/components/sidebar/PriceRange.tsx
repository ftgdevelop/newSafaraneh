import Select from "@/modules/shared/components/ui/Select";

const PriceRange: React.FC = () => {
    return (
        <div className="text-xs pt-2 pb-2 space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold mb-2">مبلغ</h2>
                <button type="button" className="text-3xs bg-red-500 text-white pl-2 pr-2 rounded"
                    onClick={() => null}>
                    حذف
                </button>
            </div>
            <div className="grid grid-cols-2 text-xs w-full content-center">
                <p>حداقل</p>
                <Select
                    items={[{label: '120000', value:'1000000'}]}
                    placeholder="حداقل"
                    value={'0'}
                    onChange={e => null}
                    className="col-span-2 text-xs whitespace-nowrap h-fit p-1" />
            </div>

            <div className="grid grid-cols-2 text-xs w-full content-center">
                <p>حداکثر</p>
                <Select
                    items={[{label: '120000', value:'1000000'}]}
                    placeholder="حداکثر"
                    value={'0'}
                    onChange={e => null}
                    className="col-span-2 text-xs whitespace-nowrap h-fit p-1" />
            </div>
        </div>
    )
}

export default PriceRange;