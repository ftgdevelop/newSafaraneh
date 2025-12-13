import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity"

import CustomToolbar from "./CustomToolbar";
import CustomHeaderPlugin from "./CustomHeaderRangePicker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import DateObject, { Locale } from "react-date-object";
import { DateFormat } from "../../helpers";


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

interface RangePicker2Props<TInputProps> {
  defaultValue: [DateObject | null, DateObject | null];
  onChange: (value: [DateObject | null, DateObject | null]) => void;
  inputProps?: TInputProps;
  Input: React.ComponentType<TInputProps & InternalInputProps>;
}


function RangePicker2<TInputProps>({
  defaultValue,
  onChange,
  Input,
  inputProps = {} as TInputProps,
}: RangePicker2Props<TInputProps>) {
  const [isFa, setIsFa] = useState(true);
  const [innerValue, setInnerValue] =
    useState<[DateObject | null, DateObject | null]>(defaultValue);

  const localeConfig = isFa ? calendars.fa : calendars.en;

  const [isMobile, setIsMobile] = useState(false);
  const pickerRef = useRef<any>(null);


  useEffect(() => {
    if (defaultValue[0] || defaultValue[1]) {
      onChange(defaultValue);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (dates: DateObject[]) => {
    const tuple: [DateObject | null, DateObject | null] = [
      dates[0] ?? null,
      dates[1] ?? null,
    ];
    
    setInnerValue(tuple);
    onChange(tuple);

    if (dates.length === 2 && dates[0] && dates[1]) {
      pickerRef.current?.closeCalendar();
    }
  };
  const handleToolbarChange = (
    value:
      | DateObject
      | DateObject[]
      | [DateObject | null, DateObject | null]
  ) => {
    if (Array.isArray(value)) {
      const tuple: [DateObject | null, DateObject | null] = [
        value[0] ?? null,
        value[1] ?? null,
      ];
      setInnerValue(tuple);
      onChange(tuple);
    }
  };

  return (
    <DatePicker
      ref={pickerRef}
      value={innerValue}
      range
      rangeHover
      calendar={localeConfig.calendar}
      locale={localeConfig.locale}
      format={localeConfig.format}
      weekStartDayIndex={localeConfig.weekStartDayIndex}
      numberOfMonths={isMobile ? 1 : 2}
      monthYearSeparator=""
      minDate={new Date()}
      onChange={handleChange}
      arrow={false}
      showOtherDays
      className="range-datepicker"
      portal
      animations={[
        opacity({ from: 0.1, to: 1, duration: 1000 })
      ]} 
      plugins={[
        <CustomToolbar
          key="toolbar"
          isFa={isFa}
          setIsFa={setIsFa}
          position="bottom"
          onChange={handleToolbarChange}
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
          values={innerValue}
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

export default RangePicker2;