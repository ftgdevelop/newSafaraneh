import React from "react";
import { Locale } from "react-date-object";
import { Calendar } from "./icons";

export interface CipDatePickerInputSinglePageProps {
  id: string;
  name: string;
  fieldClassName?: string;
  errorText?: string;
  isTouched?: boolean;
  label: string;
  validateFunction?: () => string | undefined;
}

interface InternalInputProps {
  value: string;
  openCalendar: () => void;
  handleValueChange: (e: React.ChangeEvent<Element>) => void;
  locale: Locale;
  separator: string;
  isFa: boolean;
}

type Props = CipDatePickerInputSinglePageProps & InternalInputProps;

export default function CipDatePickerInputSinglePage({
  id,
  name,
  value = "",
  openCalendar,
  errorText,
  isTouched,
  fieldClassName = "",
  label,
  isFa,
  validateFunction
}: Props) {
  
  
  return (
    <div className={`relative ${isFa ? 'font-vazir': 'font-sans'}`}>

      <input
        id={id}
        name={name}
        readOnly
        onClick={openCalendar}
        placeholder={label}
        value={value}
        className={`w-full h-12 text-xs rtl:rounded-lg 
          border border-neutral-400 py-5  leading-4 ${fieldClassName}
          ${value ? "rtl:pr-5 ltr:pl-5" : ' placeholder:text-black rtl:pr-5 ltr:pl-5'}
          ${isTouched && validateFunction?.() ? "border-red-500 rtl:pr-5 ltr:pl-5" : ""}

        `}
      />

      {isTouched && validateFunction?.() && (
        <div className="text-xs text-red-500 mt-1">{validateFunction?.()}</div>
      )}
    </div>
  );
}