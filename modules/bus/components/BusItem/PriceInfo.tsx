
const PriceInfo: React.FC = () => {
    return (
        <div className="text-left p-3 bg-white w-1/5 max-sm:w-2/5 grid content-around">
                <div>
                    <p className="text-xl max-lg:text-lg max-sm:text-sm font-bold leading-5 max-sm:leading-4">
                    <span className="text-2xs max-sm:text-3xs font-bold block">ریال</span>
                    12000000
                    </p>
                <button
                    type="button"
                    className="px-5 w-full h-8 leading-6 text-sm mt-2 text-nowrap bg-blue-700 text-white rounded"
                    
                >
                    انتخاب صندلی
                </button>
                <p className="text-3xs text-red-600">4 صندلی باقیمانده</p>
            </div>
        </div>
    )
}

export default PriceInfo;