import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import transition from "react-element-popper/animations/transition";

import CustomToolbar, { PickerValue } from "./CustomToolbar";
import CustomHeaderPlugin from "./CustomHeaderRangePicker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import DateObject, { Locale } from "react-date-object";
import { getMultiDatePickerFormattedDate,  DateFormat, totoLocalizedGregorianMDPDateObject, persianNumbersToEnglish } from "../../helpers";


const calendars: Record<
  "fa" | "en",
  {
    calendar: any;
    locale: any;
    format: DateFormat;
    weekStartDayIndex: number;
  }
> = {
  fa: {
    calendar: persian,
    locale: persian_fa,
    format: "YYYY/MM/DD",
    weekStartDayIndex: 7,
  },
  en: {
    calendar: gregorian,
    locale: gregorian_en,
    format: "MM/DD/YYYY",
    weekStartDayIndex: 0,
  },
};

export interface InternalInputProps {
  value: string;
  openCalendar: () => void;
  handleValueChange: (e: ChangeEvent<Element>) => void;
  locale: Locale;
  separator: string;
}

interface MultiRangePickerProps<TInputProps> {
  initialValue?: string[];
  value: string[];
  onChange: (value: string[]) => void;
  inputProps?: TInputProps;
  Input: React.ComponentType<TInputProps & InternalInputProps>;
}


function MultiRangePicker<TInputProps>({
  initialValue,
  value,
  onChange,
  Input,
  inputProps = {} as TInputProps,
}: MultiRangePickerProps<TInputProps>) {
  const [isFa, setIsFa] = useState(true);

  const localeConfig = isFa ? calendars.fa : calendars.en;
  const localeKey = isFa ? "fa" : "en";


  const [isMobile, setIsMobile] = useState(false);
  const pickerRef = useRef<any>(null);


  useEffect(() => {
    if (initialValue && initialValue.length > 0 && (initialValue[0] || initialValue[1])) {
      onChange(initialValue)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (dates: PickerValue) => {
    if (dates instanceof Array) {

      const tupleString : string[] = [
         dates[0]? persianNumbersToEnglish(getMultiDatePickerFormattedDate({
                date: dates[0],
              })) : '',
          dates[1] ? persianNumbersToEnglish(getMultiDatePickerFormattedDate({
                date: dates[1],
              })) : '',
      ];
      
      onChange(tupleString);

      if (dates.length === 2 && dates[0] && dates[1]) {
        pickerRef.current?.closeCalendar();
      }
    }

  };
const propsAnimations = isMobile
  ? {}
  : {
      animations: [
        transition({
          from: 40,
          to: 0,
          property: "translateY",
          transition: "all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        }),
      ],
    };
  const normalizedValue =   [totoLocalizedGregorianMDPDateObject(value[0]),totoLocalizedGregorianMDPDateObject(value[1])];
    const WEEK_DAYS_MAP: Record<'fa' | 'en', string[]> = {
    fa: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
    en: ["S", "M", "T", "W", "T", "F", "S"],
  };

  const weekDays = WEEK_DAYS_MAP[localeKey];
  return (
        <DatePicker
        ref={pickerRef}
        value={normalizedValue}
        range
        rangeHover
        calendar={localeConfig.calendar}
        locale={localeConfig.locale}
        format={localeConfig.format}
        weekStartDayIndex={localeConfig.weekStartDayIndex}
        numberOfMonths={isMobile ? 1 : 2}
        monthYearSeparator=" "
        minDate={new DateObject({ date: new Date() })}
        onChange={handleChange}
        arrow={false}
        showOtherDays
        weekDays={weekDays}
        className={`range-datepicker custom-selected ${isFa ? 'font-fa' : 'font-en'}`}
        // portal
        {...propsAnimations}
        plugins={[
          <CustomToolbar
            key="toolbar"
            isFa={isFa}
            setIsFa={setIsFa}
            position="bottom"
            onChange={handleChange}
          />,
          <Toolbar
            key="top-toolbar"
            position="top"
            sort={["close", "deselect", "today"]}
            className="md:!hidden"
            names={{
              today: "امروز",
              deselect: "انصراف",
              close: "تایید",
            }}
          />,
          <CustomHeaderPlugin
            key="header"
            position="top"
            isFa={isFa}
            values={value}
          />,
        ]}
        render={(value, openCalendar, handleValueChange, locale, separator) => (
          <Input
            {...inputProps}
            value={value}
            openCalendar={openCalendar}
            handleValueChange={handleValueChange}
            locale={locale}
            separator={separator}
            isFa={isFa}
          />
        )}
        />
  );
}

export default MultiRangePicker;