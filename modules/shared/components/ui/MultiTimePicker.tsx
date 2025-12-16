
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface MultiTimePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    labelIsSimple?: boolean;
    errorText?: string;
    isTouched?: boolean;
    name?: string;
    id?: string;
    validateFunction?: (value: string) => void;
    fieldClassName?: string;
}

export const MultiTimePicker = ({ value, onChange , label = '', labelIsSimple = false, errorText = '', isTouched = false, name, id, validateFunction, fieldClassName, }: MultiTimePickerProps) => {
   
    const handleChange = (v: DateObject) => {
        const date = v ? v.format("HH:mm") : '';
        onChange(date);
    }
    
    const theme2 = process.env.THEME === "THEME2";

    const labelClassNames : string[] = ["pointer-events-none leading-4 px-2 absolute rtl:right-1 ltr:left-1 z-[1] -translate-y-1/2 bg-white"];

    if(value){
        labelClassNames.push(`${theme2?"top-3.5 text-2xs":"top-0 text-xs"}`);
    }else{
        labelClassNames.push("top-1/2 text-sm");
    }
    
    return (
        <div
            className={`${errorText && isTouched ? "border-red-500 rtl:pr-5 ltr:pl-5" : ""}`}
        >
            <div className="relative">
                {label && (
                    <label
                        className={labelClassNames.join(" ")}
                    >
                        {label}
                    </label>
                )}
                <DatePicker
                    value={value}
                    onChange={handleChange}
                    disableDayPicker
                    format="HH:mm"
                    plugins={[
                        <TimePicker key="time-picker" hideSeconds />
                    ]} 
                    render={(pickerValue, openCalendar, handleValueChange, loc, sep) =>
                        <input
                            
                            id={id}
                            name={name}
                            readOnly
                            onClick={openCalendar}
                            placeholder={label}
                            value={pickerValue}
                            className={`w-full h-12 text-xs rtl:rounded-lg 
                            border border-neutral-400  leading-4 ${fieldClassName}
                            ${value ? "pt-5 rtl:pr-10 ltr:pl-10" : 'py-5 placeholder:text-black rtl:pr-10 ltr:pl-5'}
                            ${isTouched && validateFunction?.(value) ? "border-red-500 rtl:pr-5 ltr:pl-5" : ""}

                            `}
                        />}
                />
            </div>
            
            {isTouched && validateFunction && (
                <div className="text-xs text-red-500 mt-1">{validateFunction?.(value) ?? errorText}</div>
            )}
        </div>
    )
}
