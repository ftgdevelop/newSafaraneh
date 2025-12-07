import React from "react";
import { Locale } from "react-date-object";
import { Calendar, CalendarFill, Minus } from "./icons";
import { useTranslation } from "next-i18next";

export interface DomesticFlightInputProps {
  isEnd?: boolean;
  isDisabled?: boolean;
  handleRoundTrip?: () => void;
  label: string;
}

interface InternalInputProps {
  value: string;
  openCalendar: () => void;
  locale: Locale;
  separator: string;
}

type Props = DomesticFlightInputProps & InternalInputProps;

export default function DomesticFlightDatePickerInput({
  value,
  openCalendar,
  isEnd = false,
  isDisabled = false,
  label,
  ...props
}: Props) {
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";

  const handleOpenCalendar = () => {     
    props?.handleRoundTrip?.();
    if (!isDisabled) {      
      openCalendar()
    }
  }
console.log({label});

  return (
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
        className={`w-full h-12 text-xs rtl:rounded-lg rtl:pr-10 ltr:pl-10 
          ${theme3 ? "bg-neutral-200 pt-5" : "border border-neutral-400 pt-5 leading-4"}
        `}
      />

      {isEnd && isDisabled && (
        <div className="p-1 border border-neutral-300 rounded bg-neutral-600 top-1/2 -mt-3 absolute left-3">
          <Minus className="w-4 h-4 fill-white" />
        </div>
      )}
    </div>
  );
};