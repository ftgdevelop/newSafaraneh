import React, { useMemo } from "react";
import { Locale } from "react-date-object";
import { Calendar, CalendarFill, Minus } from "./icons";
import { useTranslation } from "next-i18next";
import { FormikErrors } from "formik";
import { FlightSeachFormValue } from "@/modules/flights/types/flights";

interface CustomDatePickerInputProps {
  values: {
    departureDate: string;
    returnDate: string;
    airTripType: 'RoundTrip' | "OneWay";
  };

  value?: any;
  openCalendar: () => void;
  handleValueChange: (e: any) => void;
  locale: Locale;
  separator: string;
  isFa: boolean;

  show?: boolean;
  tripType: "departureDate" | "returnDate";

  errors?: FormikErrors<FlightSeachFormValue>;
  touched?: Record<string, any>;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

function DomesticFlightDatePickerInput({
  values,
  errors = {},
  touched = {},
  setFieldValue,
  value,
  openCalendar,
  handleValueChange,
  locale,
  separator,
  isFa,
  show = true,
  tripType,
}: CustomDatePickerInputProps) {
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";
  const { t } = useTranslation("common");

  const isDeparture = tripType === "departureDate";
  const label = isDeparture ? "تاریخ رفت" : "تاریخ برگشت";

  const fieldName = isDeparture ? "departureDate" : "returnDate";
  const fieldError = errors[fieldName];
  const fieldTouched = touched[fieldName];

  const fieldValue =  value ? Array.isArray(value) ? value[0]: value : ''

const isRoundTrip = values.airTripType === "RoundTrip";
    

  const handleClick = () => {
    if (!isDeparture) {
        if (!isRoundTrip && setFieldValue) { 
            console.log('64');
            
        setFieldValue("airTripType", "RoundTrip", true);
      }
    }
    openCalendar();
  };
    
    const handleDateChange = (field: string, date: string) => {
        if (!setFieldValue) return;

        setFieldValue(field, date);

        if (field === "departureDate" && values.returnDate) {
            const dep = new Date(date);
            const ret = new Date(values.returnDate);

            if (dep > ret) {
            const nextDay = new Date(dep);
            nextDay.setDate(dep.getDate() + 1);

            setFieldValue("returnDate", nextDay.toISOString().slice(0, 10));
            }
        }
    };
    

  return (
    <div className="relative w-full">
      {theme2 ? (
        <CalendarFill className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />
      ) : (
        <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute pointer-events-none" />
      )}

      {!theme3 && (
        <label
          className={`absolute leading-5 rtl:right-10 pointer-events-none transition-all
            ${fieldValue ? "top-1.5 text-4xs" : "top-1/2 -translate-y-1/2 text-sm"}
          `}
        >
        {label}
        </label>
      )}

      <input
        readOnly
        onClick={handleClick}
        value={fieldValue}
        id={`${fieldName}_input`}
        name={fieldName}
        className={`w-full h-12 text-xs rtl:rounded-lg rtl:pr-10 ltr:pl-10 
            ${theme3 ? "bg-neutral-200 pt-5" : "border border-neutral-400 pt-5 leading-4"}
        `}
        />
        {
        !isDeparture && !isRoundTrip && <div className='p-1 border border-neutral-300 rounded bg-neutral-600 top-1/2 -mt-3 absolute left-3'>
            <Minus className='w-4 h-4 fill-white' />
        </div>                

        }
      {fieldTouched && fieldError && (
        <div className="text-xs text-red-500 mt-1">{fieldError}</div>
      )}
    </div>
  );
}

export default DomesticFlightDatePickerInput;
