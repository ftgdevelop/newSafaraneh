const SortBuses: React.FC = () => {
    const SortItem = (value: string, sortValue: string) => {
        return (
            <button type="button" className={`border-1 text-sm text-blue-700 text-center h-fit w-full p-1 cursor-pointer max-sm:text-2xs shadow-md
             hover:border-blue-800 duration-100 whitespace-nowrap rounded-sm bg-white`}
                onClick={() => null}>
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