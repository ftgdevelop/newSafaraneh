import { Button } from "@mobiscroll/react"

const PriceInfo: React.FC = () => {
    return (
        <div className="text-left p-3 bg-white w-1/5 max-sm:w-2/5 grid content-around">
                <div>
                    <p className="text-xl max-lg:text-lg max-sm:text-sm font-bold leading-5 max-sm:leading-4">
                    <span className="text-2xs max-sm:text-3xs font-bold block">ریال</span>
                    12000000
                    </p>
                    <Button
                    type="button"
                    onClick={() => null}
                    disabled={false}
                    color='primary'
                    className="px-5 w-full h-8 leading-6 text-sm mt-2 text-nowrap"
                    hasArrow
                    loading={true}
                >
                    انتخاب صندلی
                </Button>
            </div>
        </div>
    )
}

export default PriceInfo;