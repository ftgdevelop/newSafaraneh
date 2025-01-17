import { useState } from "react";

type Props = {
    onChanage: (value:number) => void;
    wrapperClassName?: string;
    defaultValue?: number;
};

const RateInput : React.FC<Props> = props => {
    
    const [value, setValue] = useState<number>(props.defaultValue || 9);

    return(
        <div className={`flex gap-2 justify-between ${props.wrapperClassName || ""}`}>
        {[1,2,3,4,5,6,7,8,9,10].map(item => (
            <button 
                key={item}
                type="button"
                className={`text-lg select-none cursor-pointer border flex items-center justify-center rounded h-8 w-8 sm:h-10 sm:w-10 ${value === item ? "bg-blue-600 text-white border-blue-600" : "hover:bg-sky-50 border-neutral-400"}`}
                onClick={() => {
                    setValue(item);
                    props.onChanage(item);
                }}
            >
                {item}
            </button>
        ))}
    </div>
    )
}

export default RateInput;