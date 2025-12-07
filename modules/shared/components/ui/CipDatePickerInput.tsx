import React from "react";
import { Locale } from "react-date-object";
import { Calendar } from "./icons";

export interface CipInputProps {
  id: string;
  name: string;
  fieldClassName?: string;
  errorText?: string;
  isTouched?: boolean;
  label: string;
}

interface InternalInputProps {
  value: string;
  openCalendar: () => void;
  handleValueChange: (e: React.ChangeEvent<Element>) => void;
  locale: Locale;
  separator: string;
}

type Props = CipInputProps & InternalInputProps;

export default function CipDatePickerInput({
  id,
  name,
  value,
  openCalendar,
  errorText,
  isTouched,
  fieldClassName = "",
  label,
}: Props) {
  return (
    <div className="relative w-full">
      <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />

      <label
        htmlFor={id}
        className={`absolute select-none rtl:right-10 transition-all pointer-events-none
          ${value ? "top-1.5 text-4xs" : "top-1/2 -translate-y-1/2 text-sm"}
        `}
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        readOnly
        onClick={openCalendar}
        value={value}
        className={`w-full h-12 text-xs rtl:rounded-lg rtl:pr-10 ltr:pl-10 
          border border-neutral-400 pt-5 leading-4 ${fieldClassName}
        `}
      />

      {isTouched && errorText && (
        <div className="text-xs text-red-500 mt-1">{errorText}</div>
      )}
    </div>
  );
}