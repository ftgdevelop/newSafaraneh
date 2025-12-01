import React from "react";
import { Locale } from "react-date-object";
import { Calendar } from "./icons";

interface CipDatePickerInputProps {
  label: string;
  value?: any;
  openCalendar: () => void;
  locale: Locale;
  separator: string;
  isFa: boolean;

  errorText?: string;
  isTouched?: boolean;
  fieldClassName?: string;
  id: string;
  name: string;

  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const CipDatePickerInput: React.FC<CipDatePickerInputProps> = ({
  label,
  value,
  openCalendar,
  errorText,
  isTouched,
  fieldClassName = "",
  id,
  name,
}) => {
  const fieldValue = value ? (Array.isArray(value) ? value[0] : value) : "";

  return (
    <div className="relative w-full">

      <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />

      <label
        htmlFor={id}
        className={`absolute select-none rtl:right-10 transition-all pointer-events-none
          ${fieldValue ? "top-1.5 text-4xs" : "top-1/2 -translate-y-1/2 text-sm"}
        `}
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        readOnly
        onClick={openCalendar}
        value={fieldValue}
        className={`w-full h-12 text-xs rtl:rounded-lg rtl:pr-10 ltr:pl-10 
          border border-neutral-400 pt-5 leading-4 ${fieldClassName}
        `}
      />

      {isTouched && errorText && (
        <div className="text-xs text-red-500 mt-1">{errorText}</div>
      )}
    </div>
  );
};

export default CipDatePickerInput;