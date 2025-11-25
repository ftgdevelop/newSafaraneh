import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTranslation } from "next-i18next";
import { Calendar, CalendarFill, CalendarToggle } from "./icons";
import { dateDiplayFormat } from "../../helpers";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
// TYPES

type Props = {
    onChange: (args: any, inst: any) => void;
    rtl?: boolean;
    locale?: "fa" | "en";
    value?: [string | null, string | null];
};

const RangePicker2: React.FC<Props> = (props) => {
    const { t } = useTranslation("common");

    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    const [isFa, setIsFa] = useState<boolean>(props.locale === "fa");
	
    const [values, setValues] = useState<(DateObject | null)[]>([
        props.value?.[0] ? new DateObject(props.value[0]) : null,
        props.value?.[1] ? new DateObject(props.value[1]) : null,
    ]);

    useEffect(() => {
        setIsFa(props.locale === "fa");
    }, [props.locale]);

    const handleChange = (val: any) => {
        setValues(val);

        const formatted: [string | null, string | null] = [
            val?.[0] ? val[0].format("YYYY-MM-DD") : null,
            val?.[1] ? val[1].format("YYYY-MM-DD") : null,
        ];

        props.onChange({ value: formatted, valueText: "" }, null);
    };

    const startValue = values[0]
        ? dateDiplayFormat({
              date: values[0].format("YYYY-MM-DD"),
              format: theme3 ? "yyyy/mm/dd" : "ddd dd mm",
              locale: isFa ? "fa" : "en",
          })
        : "";

    const endValue = values[1]
        ? dateDiplayFormat({
              date: values[1].format("YYYY-MM-DD"),
              format: theme3 ? "yyyy/mm/dd" : "ddd dd mm",
              locale: isFa ? "fa" : "en",
          })
        : "";

    return (
        <div
            className={`relative text-xs ${theme3 ? "w-full" : ""} ${
                isFa ? "persian-datepicker-wrapper" : ""
            }`}
        >
            <div className={`grid grid-cols-2 ${theme3 ? "gap-x-1" : ""}`}>
                {theme3 && (
                    <>
                        <label htmlFor="checkin_date" className="text-sm">
                            {t("checkin-date")}
                        </label>
                        <label htmlFor="checkout_date" className="text-sm">
                            {t("checkout-date")}
                        </label>
                    </>
                )}

                {/* START DATE */}
                <div className="relative">
                    {!theme3 && (
                        <label
                            htmlFor="checkin_date"
                            className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                        >
                            {t("checkin-date")}
                        </label>
                    )}

                    {theme2 ? (
                        <CalendarFill className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    ) : (
                        <Calendar className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    )}

                    <input
                        id="checkin_date"
                        className={`w-full h-12 rtl:rounded-r-lg ltr:rounded-l-lg rtl:pr-10 ltr:pl-10 ${
                            theme3 ? "bg-neutral-200" : "border border-neutral-400 pt-5 leading-4"
                        } ${!isFa ? "font-sans" : ""}`}
                        value={startValue}
                        readOnly
                    />
                </div>

                {/* END DATE */}
                <div className="relative">
                    {!theme3 && (
                        <label
                            htmlFor="checkout_date"
                            className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none"
                        >
                            {t("checkout-date")}
                        </label>
                    )}

                    {theme2 ? (
                        <CalendarFill className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    ) : (
                        <Calendar className="w-5 h-5 absolute rtl:right-2 ltr:left-2 top-1/2 -mt-2.5 z-10" />
                    )}

                    <input
                        id="checkout_date"
                        className={`w-full h-12 rtl:rounded-l-lg ltr:rounded-r-lg rtl:pr-10 ltr:pl-10 ${
                            theme3 ? "bg-neutral-200" : "border border-neutral-400 pt-5 leading-4"
                        }`}
                        value={endValue}
                        readOnly
                    />
                </div>
            </div>

            {/* DATE PICKER */}
            <div className="absolute top-12 left-0 right-0 z-50">
                <DatePicker
                    value={values}
                    onChange={handleChange}
                    range
                    numberOfMonths={2}
                    minDate={new Date()}
                    calendar={isFa ? persian : gregorian}
                    locale={isFa ? persian_fa : gregorian_en}
                    arrow={false}
                    className="custom-range-picker"
                    portal
                    weekStartDayIndex={isFa ? 6 : 0}
                />

                <div className="flex justify-between items-center mt-3 px-2">
                    <button
                        type="button"
                        onClick={() => handleChange([new DateObject(), new DateObject()])}
                        className="text-primary-700 text-sm"
                    >
                        {t("goToToday")}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsFa((prev) => !prev)}
                        className="text-primary-700 text-sm flex gap-2 items-center"
                    >
                        <CalendarToggle className="w-5 h-5" />
                        {isFa ? t("gregorianCalendar") : t("iranianCalendar")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RangePicker2;