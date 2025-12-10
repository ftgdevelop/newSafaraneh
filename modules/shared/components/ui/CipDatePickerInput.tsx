import React from "react";
import { Locale } from "react-date-object";
import { Calendar } from "./icons";
import FormikField from "./FormikField";
import { Field } from "formik";

export interface CipInputProps {
  id: string;
  name: string;
  fieldClassName?: string;
  errorText?: string;
  isTouched?: boolean;
  label: string;
  validateFunction?: (value: any) => string | undefined;
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
  validateFunction
}: Props) {

  console.log(value)
  return (
    <div className="relative ">
      {
        !validateFunction?.(value) &&       <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />

      }

      <label
        htmlFor={id}
        className={`absolute select-none rtl:right-10 transition-all pointer-events-none
          ${value ? "top-0 text-4xs " : "hidden"}
        `}
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        readOnly
        onClick={openCalendar}
        placeholder={label}
        value={value}
        className={`w-full h-12 text-xs rtl:rounded-lg 
          border border-neutral-400  leading-4 ${fieldClassName}
          ${isTouched && validateFunction?.(value) ? "border-red-500" : ""}
          ${value ? "pt-5 rtl:pr-10 ltr:pl-10" : 'py-5 placeholder:text-black rtl:pr-5 ltr:pl-5'}
        `}
      />

      {isTouched && validateFunction?.(value) && (
        <div className="text-xs text-red-500 mt-1">{validateFunction?.(value)}</div>
      )}
    </div>
  );
}