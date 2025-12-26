import React from "react";
import { Locale } from "react-date-object";
import { Calendar, CalendarFill, Minus } from "./icons";

export interface BookingInputProps {
  isEnd?: boolean;
  isDisabled?: boolean;
  handleRoundTrip?: () => void;
  label: string;
  isTouched?: boolean;
  errors?: string;
    heightClassName?: string;
    fieldClassName?: string;
    groupStart?:boolean;
    labelIsSimple?: boolean;
}

interface InternalInputProps {
  value: string;
  openCalendar: () => void;
  locale: Locale;
  separator: string;
  isFa: boolean;
}

type Props = BookingInputProps & InternalInputProps;

export default function BookingInput({
    value,
    openCalendar,
    isEnd = false,
    isDisabled = false,
    label,
    isTouched,
    errors,
    isFa,
    heightClassName,
    fieldClassName,
    groupStart,
    labelIsSimple = false,
  ...props
}: Props) {
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";

  const handleOpenCalendar = () => {     
    props?.handleRoundTrip?.();
    openCalendar()
  }
    const inputClassNames : string[] = ["w-full px-9 bg-white border outline-none"];
    
    if(heightClassName){
        inputClassNames.push(heightClassName);
    } else if(theme2){
        inputClassNames.push(`h-13`);
    }else if (theme3){
        inputClassNames.push(`h-12`);
    }else{
        inputClassNames.push("h-10");
    }
    
    if(!labelIsSimple){
        inputClassNames.push(`leading-4 ${theme2?"pt-4":"pt-0"}`);
    }

    if(errors && isTouched){
        inputClassNames.push(`border-red-500 ${theme2?"border-2":""}`);
    }else{
        inputClassNames.push(`${theme2?"border-neutral-400 focus:border-2":"border-neutral-300"} focus:border-blue-500`);
    }

    if (groupStart){
        inputClassNames.push("rtl:rounded-r-md ltr:rounded-l-md");
    }else{
        inputClassNames.push("rounded-md")
    }

    if(fieldClassName){
        inputClassNames.push(fieldClassName);
    }

  return (
    <>
      {theme3 && label && (
        <label
          className={'text-sm '}
        >
          {label}
        </label>
      )}
          <div className="relative w-full">
      
      {theme2 ? (
        <CalendarFill className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />
      ) : (
        <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />
      )}



      {!theme3 && label && (
        <label
          className={`absolute leading-5 rtl:right-10 pointer-events-none transition-all
            ${value ? "top-1.5 text-4xs" : "top-1/2 -translate-y-1/2 text-sm"}
          `}
        >
          {label}
        </label>
      )}

      <input
        readOnly
        onClick={handleOpenCalendar}
        value={value}
        className={inputClassNames.join(" ")}

      />
        {isTouched && errors && <div className='text-xs text-red-500'> {errors as string}</div>}
        {isEnd && isDisabled && (
          <div className="p-1 border border-neutral-300 rounded bg-neutral-600 top-1/2 -mt-3 absolute left-3">
            <Minus className="w-4 h-4 fill-white" />
          </div>
        )}
    </div>
    </>

  );
};