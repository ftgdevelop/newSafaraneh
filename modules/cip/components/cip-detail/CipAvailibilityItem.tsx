import Button from "@/modules/shared/components/ui/Button";
import { CipAvailabilityItemType } from "../../types/cip";

type Props = {
    item:CipAvailabilityItemType;
    setSelectedAvailability:(availibility : CipAvailabilityItemType ) => void;
}

const CipAvailibilityItem : React.FC<Props> = props => {
    const {item} = props;
    return(
        <div className='bg-white rounded-lg border border-neutral-300 p-5 mt-5'>
            <strong className="font-semibold text-md md:text-xl">
                {item.name}
            </strong>
            <div className="grid md:grid-cols-2">
                <div className="md:order-1">
                    <button type="button">
                        سرویس های مازاد
                    </button>
                    <button type="button">
                        جزئیات قیمت
                    </button>
                </div>
                <div className="md:order-3 md:col-span-2">
                    details
                </div>
                <div className="text-left flex justify-end gap-3 md:order-2">
                    
                    <span>
                        125000000 ریال
                    </span>

                    <Button 
                        type="button"
                        className="h-10 px-5"
                    >
                        رزرو آنلاین
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default CipAvailibilityItem;