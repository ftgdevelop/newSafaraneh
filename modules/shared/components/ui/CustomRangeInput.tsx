import React, { ChangeEvent } from "react";
import { Locale } from "react-date-object";
import { Calendar, CalendarFill } from "./icons";
import { useTranslation } from "next-i18next";
import { dateDisplayFormat } from "../../helpers";


interface CustomRangeInputProps {
    value: string;
    openCalendar: () => void;
    handleValueChange: (e: ChangeEvent) => void;
    locale: Locale;
    separator: string;
    isFa: Boolean;
}

function CustomRangeInput({
    value,
    openCalendar,
    separator,
    isFa
}: CustomRangeInputProps) {
    const values = value?.split(String(separator)) || [];
    let startValue 
    let endValue 

    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";
    const { t } = useTranslation("common");

    let startFormated = t('checkin-date');
    let endFormated = t('checkout-date');
    
    if (values ) {
        startValue = values[0] ?  dateDisplayFormat({ date: values[0], format: theme3 ? "yyyy/mm/dd" : "dddd dd MMMM", locale: isFa ? "fa" : "en" }) : '';
        endValue = values[1] ? dateDisplayFormat({ date: values[1], format: theme3 ? "yyyy/mm/dd" : "dddd dd MMMM", locale: isFa ? "fa" : "en" }) : '';     
    }

  return   <div className={`grid w-full grid-cols-2 ${theme3 ? "gap-x-1" : ""}`}>
                {theme3 && (
                    <>
                        <label htmlFor="checkin_date" className="text-sm">
                            {startFormated}
                        </label>
                        <label htmlFor="checkout_date" className="text-sm">
                           {endFormated}
                        </label>
                    </>
                )}

                <div className="relative" onClick={openCalendar}>
                    {!theme3 && (
                        <label
                            htmlFor="checkin_date"
                            className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                        >
                            {startFormated}
                        </label>
                    )}

                    {theme2 ? (
                        <CalendarFill className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    ) : (
                        <Calendar className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    )}

                    <input
                        id="checkin_date"
                        className={`w-full h-12 text-xs rtl:rounded-r-lg ltr:rounded-l-lg rtl:pr-10 ltr:pl-10 ${
                            theme3 ? "bg-neutral-200" : "border border-neutral-400 pt-5 leading-4"
                        } ${!isFa ? "font-sans" : ""}`}
                        value={startValue}
                        readOnly
                    />
                </div>

                <div className="relative" onClick={openCalendar}>
                    {!theme3 && (
                        <label
                            htmlFor="checkout_date"
                            className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                        >
                            {endFormated}
                        </label>
                    )}

                    {theme2 ? (
                        <CalendarFill className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    ) : (
                        <Calendar className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    )}

                    <input
                        id="checkout_date"
                        className={`w-full h-12 text-xs rtl:rounded-l-lg ltr:rounded-r-lg rtl:pr-10 ltr:pl-10 ${
                            theme3 ? "bg-neutral-200" : "border border-neutral-400 pt-5 leading-4"
                        }`}
                        value={endValue}
                        readOnly
                    />
                </div>
            </div>

}

export default CustomRangeInput;