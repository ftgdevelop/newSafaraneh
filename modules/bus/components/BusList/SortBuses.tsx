type Props = {
    sortBus: string,
    changeSortBus: any
}

const SortBuses: React.FC<Props> = (props) => {
    const {sortBus, changeSortBus} = props
    const SortItem = (value: string, sortValue: string) => {
        return (
            <button type="button" className={`border-1 text-sm text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-md
             hover:border-blue-800 ${sortBus == sortValue ? 'border-blue-800 shadow-blue bg-blue-100/50 text-blue-900' : 'bg-white text-blue-700'}
              duration-100 whitespace-nowrap rounded-sm`}
                onClick={() => changeSortBus(sortValue)}>
                {value}
            </button>
        )
    }
    return (
            <div className="flex gap-4 mt-6 items-center">
                <h5 className="font-semibold text-sm whitespace-nowrap max-lg:hidden">مرتب سازی بر اساس:</h5>
                <div className="flex w-full gap-2">
                    {SortItem('کمترین قیمت', "LowestPrice")}
                    {SortItem('بیشترین قیمت', "HighestPrice")}
                    {SortItem('زمان پرواز', "Time")}
                </div>
            </div>
    )
}

export default SortBuses;