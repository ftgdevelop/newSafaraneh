import { useEffect, useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject  from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { Field } from "formik";
import { useTranslation } from "next-i18next";
import { CalendarToggle } from "./icons";
import { dateDiplayFormat } from "../../helpers";

type Props = {
    onChange?: (args: any, inst: any) => void;
    rtl?: boolean;
    setFieldValue: any;
    locale?: "fa" | "en";
    initialvalue?: string;
    min?: string;
    label?: string;
    labelIsSimple?: boolean;
    errorText?: string;
    isTouched?: boolean;
    name?: string;
    id?: string;
    fieldClassName?: string;
    validateFunction?: (value: string) => void;
    inputStyle?: string;
    onChangeLocale?: React.Dispatch<React.SetStateAction<"fa" | "en">>;
    value?: unknown
};
type AnimationProps = {
    opacity: number;
};

const fade = ({ opacity }: AnimationProps) => ({
    opacity,
    transform: `translateY(${(1 - opacity) * 10}px)`
});
const DatePicker2: React.FC<Props> = (props) => {
    const theme2 = process.env.THEME === "THEME2";
    const { t } = useTranslation("common");

    // locale state: "fa" or "en"
    const [locale, setLocale] = useState<"fa" | "en">(props.locale || "fa");

    const [value, setValue] = useState<string | undefined>(props.initialvalue);

    useEffect(() => {
        if (props.locale) setLocale(props.locale);
    }, [props.locale]);

    // marked dates (converted for react-multi-date-picker)
    const fridays = [
        "2023-11-24",
        "2023-12-01",
        "2023-12-08",
        "2023-12-15",
        "2023-12-17",
        "2023-12-22",
        "2023-12-29",
        "2024-01-05",
        "2024-01-12",
        "2024-01-19",
        "2024-01-25",
        "2024-01-26",
    ];

    const marked = fridays.map((d) => new DateObject({ date: d }));

    // computed display value for visible text input
    const dateValue = value
        ? dateDiplayFormat({
              date: value,
              format: "yyyy/mm/dd",
              locale: locale === "fa" ? "fa" : "en",
          })
        : "";

    useEffect(() => {
        if (value) props.setFieldValue(props.name, value, true);
    }, [value]);

    const calendar = locale === "fa" ? persian : gregorian;
    const localeObj = locale === "fa" ? persian_fa : gregorian_en;

    const toggleCalendar = () => {
        setLocale((prev) => (prev === "fa" ? "en" : "fa"));
    };

    const goToday = () => {
        setValue(new Date().toISOString());
    };

    const labelClassNames: string[] = ["z-10 select-none pointer-events-none block leading-4"];
    if (props.labelIsSimple) {
        labelClassNames.push("mb-3 text-base");
    } else {
        labelClassNames.push(
            "absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 rtl:right-1 ltr:left-1"
        );
        if (value) {
            labelClassNames.push(theme2 ? "top-3.5 text-2xs" : "top-0 text-xs");
        } else {
            labelClassNames.push("top-1/2 text-sm");
        }
    }

    return (
        <div
            className={`${locale === "fa" ? "persian-datepicker-wrapper" : ""} relative text-xs`}
        >
            <div className="relative">
                {!!props.label && (
                    <label htmlFor={props.id} className={labelClassNames.join(" ")}>
                        {props.label}
                    </label>
                )}

                <Field
                    id={props.id}
                    name={props.name}
                    validate={props.validateFunction}
                    value={dateValue}
                    autoComplete="off"
                    readOnly
                    className={`${props.fieldClassName || ""} ${
                        theme2 ? "h-13 pt-4.5" : "h-10"
                    } px-3 bg-white border ${
                        props.errorText && props.isTouched
                            ? "border-red-500"
                            : theme2
                            ? "border-neutral-400 focus:border-2 focus:border-blue-500"
                            : "border-neutral-300 focus:border-blue-500"
                    } outline-none rounded-md w-full`}
                />
            </div>

            <div className="absolute inset-0 opacity-0 pointer-events-auto">
                <DatePicker
                    value={
                        value
                            ? new DateObject({
                                  date: value,
                                  calendar,
                                  locale: localeObj,
                              })
                            : null
                    }
                    onChange={(d: any) => {
                        const iso = d ? d.toDate().toISOString() : "";
                        setValue(iso);
                    }}
                    calendar={calendar}
                    locale={localeObj}
                    minDate={
                        props.min
                            ? new DateObject({
                                  date: props.min,
                                  calendar,
                                  locale: localeObj,
                              })
                            : undefined
                    }
                    mapDays={({ date }) => {
                        if (marked.some((m) => m.toUnix() === date.toUnix())) {
                            return { className: "red" };
                        }
                    }}
                    render={<></>}
                    style={{ display: "none" }} // hide the picker inline
                    portal
                    animations={[fade]}
                />
            </div>

            {/* Custom footer */}
            <div
                className={`direction-root ${
                    theme2 ? "font-iranyekan" : "font-samim"
                } mobi-date-picker-footer flex justify-center gap-5 md:justify-between items-center px-5 py-4 border-t border-neutral-300`}
            >
                <button type="button" onClick={goToday} className="text-primary-700 text-sm">
                    {t("goToToday")}
                </button>

                <button
                    type="button"
                    className="text-primary-700 text-sm flex gap-2 items-center"
                    onClick={toggleCalendar}
                >
                    <CalendarToggle className="w-5 h-5 fill-current" />{" "}
                    {locale === "fa" ? t("gregorianCalendar") : t("iranianCalendar")}
                </button>
            </div>

            {props.errorText && props.isTouched && (
                <div className="text-red-500 text-xs">{props.errorText}</div>
            )}
        </div>
    );
};

export default DatePicker2;