import GeneralData from "./GeneralData";
import PriceInfo from "./PriceInfo";

const BusItem: React.FC = () => {
    return (
        <div className="flex mt-5 border-1 shadow-sm border-gray-200">
            <GeneralData />
            <PriceInfo />
        </div>
    )
}

export default BusItem;