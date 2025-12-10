import React, { ChangeEvent } from "react";
import { DateObject } from "react-multi-date-picker";
import { Locale } from "react-date-object";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import Toolbar from "react-multi-date-picker/plugins/toolbar";
import CustomToolbar from "./CustomToolbar";

import {  DateFormat } from "../../helpers";
export const calendars: Record<
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

interface DatePicker2Props<TInputProps> {
  name: string;
  value: DateObject | null;
  onChange: (name: string, value: DateObject) => void;
  isFa: boolean;
  setIsFa: (x: boolean) => void;
  minDate?: DateObject | Date;
  Input: React.ComponentType<TInputProps & InternalInputProps>;
  inputProps?: TInputProps;
  className?: string;
}

function DatePicker2<TInputProps>({
  name,
  value,
  onChange,
  isFa,
  setIsFa,
  minDate,
  Input,
  inputProps = {} as TInputProps,
  className
}: DatePicker2Props<TInputProps>) {
  const localeKey = isFa ? "fa" : "en";

  const localeConfig = calendars[localeKey];

  const handleChange = (v: DateObject) => {
    onChange(
      name,
      v
    );
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      calendar={localeConfig.calendar}
      locale={localeConfig.locale}
      format={localeConfig.format}
      weekStartDayIndex={localeConfig.weekStartDayIndex}
      numberOfMonths={1}
      minDate={minDate}
      arrow={false}
      monthYearSeparator=""
      className={`${className} [&_.rmdp-week-day]:text-black`}
      plugins={[
        <CustomToolbar
          key="custom-toolbar"
          isFa={isFa}
          setIsFa={setIsFa}
          position="bottom"
        />,
        <Toolbar
          key="toolbar"
          position="top"
          sort={["close", "deselect", "today"]}
          names={{
            today: "امروز",
            deselect: "انصراف",
            close: "تایید",
          }}
          className=" lg:!hidden
            bg-[#f7f7f7]
            [&>div]:!bg-transparent
            [&>div]:!text-[#007aff]
            [&>div:nth-child(3)]:hidden
          "
        />,
      ]}
      render={(pickerValue, openCalendar, handleValueChange, loc, sep) => (
        <Input
          {...inputProps}
          value={pickerValue}
          openCalendar={openCalendar}
          handleValueChange={handleValueChange}
          locale={loc}
          separator={sep}
          isFa={isFa}
        />
      )}
    />
  );
}

export default DatePicker2;