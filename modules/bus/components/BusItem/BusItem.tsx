import { BusItemType } from "../../types";
import GeneralData from "./GeneralData";
import PriceInfo from "./PriceInfo";

type Props = {
    busData: BusItemType
}
const BusItem: React.FC<Props> = props => {
    return (
        <div className="flex mt-5 border-1 shadow-sm border-gray-200">
            <GeneralData busData={props.busData} />
            <PriceInfo busData={props.busData}/>
        </div>
    )
}

export default BusItem;