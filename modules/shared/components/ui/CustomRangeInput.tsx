import React, { ChangeEvent } from "react";
import { Locale } from "react-date-object";

import { Calendar, CalendarFill } from "./icons";
import { useTranslation } from "next-i18next";
import { dateDisplayFormat, persianNumbersToEnglish } from "../../helpers";

export interface OuterProps {
    show?: boolean;
    isTouched?: boolean;
    validateFunction?: (value: any) => string | undefined;
}

interface CustomRangeInputProps {
    value?: string | string[];
    openCalendar?: () => void;
    handleValueChange?: (e: ChangeEvent) => void;
    locale?: Locale;
    separator?: string;
    isFa?: boolean;
}

type Props = CustomRangeInputProps & OuterProps;

function CustomRangeInput({
    value = "",
    openCalendar = () => {},
    separator = "~",
    isFa = false,
    show = true,
    validateFunction,
    isTouched
}: Props) {

    const values = value ?  value instanceof Array ? value[0].split(separator)  : value.split(separator)  : [];

    let startValue = "";
    let endValue = "";

    const { t } = useTranslation("common");

    let startFormatted = t("checkin-date");
    let endFormatted = t("checkout-date");

    if (values) {
        startValue = values[0] ?? ''

        endValue = values[1] ?? ''
    }

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    return (
        <div className={`${show ? "grid w-full grid-cols-2" : "hidden"} ${theme3 ? "gap-x-1" : ""}`}>
            {theme3 && (
                <>
                    <label htmlFor="checkin_date" className="text-sm">
                        {startFormatted}
                    </label>
                    <label htmlFor="checkout_date" className="text-sm">
                        {endFormatted}
                    </label>
                </>
            )}

            <div>
                <div className="relative" onClick={openCalendar}>
                {!theme3 && (
                    <label
                        htmlFor="checkin_date"
                        className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                    >
                        {startFormatted}
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
                        } ${!isFa ? "font-sans" : ""}
                     ${isTouched && !startValue && validateFunction && validateFunction(startValue) && 'border border-red-500'}
`}
                    value={isFa ? startValue : persianNumbersToEnglish(startValue)}
                    readOnly
                />

                </div>
                {
                    isTouched && !startValue &&  <div className="text-xs text-red-500 h-7">
                    { validateFunction && validateFunction(startValue)}
                    </div>
                }


                </div>
            <div>
            <div className="relative" onClick={openCalendar}>
                    {!theme3 && (
                        <label
                            htmlFor="checkout_date"
                            className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                        >
                            {endFormatted}
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
                            theme3 ? "bg-neutral-200" : "border-y border-l border-neutral-400 pt-5 leading-4"
                            }
                        ${isTouched && !endValue && validateFunction && validateFunction(endValue) && 'border border-red-500'}
                            `}
                        value={isFa ? endValue : persianNumbersToEnglish(endValue)}
                        readOnly
                    />
                </div>
                {
                    isTouched && !endValue &&  <div className="text-xs text-red-500 h-7">
                    { validateFunction && validateFunction(endValue)}
                    </div>
                }

            </div>

        </div>
    );
}

export default CustomRangeInput;