import Select from "@/modules/shared/components/ui/Select";
import FlightSearchPassengers from "./FlightSearchPassengers";
import FlightSearchDirection from "./FlightSearchDirection";


const FlightSearch: React.FC = () => {

    return (
        <div>
            <div className="flex justify-between max-sm:block items-baseline space-y-9">
                <div className="flex">
                    <button type="button"
                        className="p-2 max-sm:p-1: text-blue-800 bg-blue-50 rounded-xl text-sm max-sm:text-xs cursor-pointer m-1">
                        یک طرفه
                    </button>
                    <button type="button"
                        className="p-2 max-sm:p-1: text-gray-400 rounded-xl text-sm max-sm:text-xs cursor-pointer m-1">
                        رفت و برگشت
                    </button>
                </div>
                <div className="flex content-center">
                    <FlightSearchPassengers/>
                    <Select
                        onChange={() => null}
                        items={[{ label: 'همه', value: 'all' }, { label: 'اکونومی', value: 'economy' }, { label: 'بیزنس', value: 'bussines' }]}
                        placeholder="همه"
                        value="i"
                        className="text-blue-800 w-32 m-1"
                    />
                </div>
            </div>
            <FlightSearchDirection />
        </div>
    )
}

export default FlightSearch;