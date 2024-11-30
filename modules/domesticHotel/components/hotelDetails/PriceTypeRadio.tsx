import { toPersianDigits } from "@/modules/shared/helpers";

type Props = {
    priceType: "total" | "average";
    onChangeType: (type: "total" | "average") => void;
    nights: number;
}

const PriceTypeRadio: React.FC<Props> = props => {

    if (!props.nights || props.nights < 2) {
        return null;
    }

    return (
        <div className="flex gap-3 flex-wrap" >
            <label className='inline-flex items-center gap-1 text-xs cursor-pointer'>
                <input
                    name="price-type"
                    type="radio"
                    onChange={() => { props.onChangeType("total") }}
                    checked={props.priceType === "total"}
                />
                قیمت برای {toPersianDigits(props.nights.toString())} شب
            </label>
            <label className='inline-flex items-center gap-1 text-xs cursor-pointer'>
                <input
                    name="price-type"
                    type="radio"
                    className="text-xs"
                    onChange={() => { props.onChangeType("average") }}
                    checked={props.priceType === "average"}
                />
                میانگین قیمت هر شب
            </label>
        </div>
    )
}

export default PriceTypeRadio;