import React, { useState, useRef } from "react";
import DatePicker, {
  CalendarProps,
  Value,
  DateObject as MultiDateObject,
} from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import CustomToolbar from "./CustomToolbar";
import CustomRangeInput from "./CustomRangeInput";
import CustomHeaderPlugin from "./CustomHeaderRangePicker";
import DateObject from "react-date-object";
import { RangeValue } from "@/modules/date/types";


type RangeCalendarProps = CalendarProps<false, true> & {
  value: RangeValue | null;
};

interface RangePicker2Props {
  value: RangeValue,
  onChange: (event: any) => void
}


const RangePicker2 = ({value}:RangeCalendarProps) => {
  const [isFa, setIsFa] = useState(true);

  const [props, setProps] = useState<RangeCalendarProps>({
    value, 
    locale: persian_fa,
  });

const pickerRef = useRef<any>(null);
  return (
    <DatePicker
      {...props}
      ref={pickerRef}
      onPropsChange={(p) => setProps(p as RangeCalendarProps)}
      range
      calendar={isFa ? persian : gregorian}
      locale={isFa ? persian_fa : gregorian_en}
      numberOfMonths={2}
      weekStartDayIndex={isFa ? 7 : 0}
      format={isFa ? "YYYY/MM/DD" : "MM/DD/YYYY"}
      monthYearSeparator=""
      minDate={new Date()}

      onChange={(values) => {
        if (Array.isArray(values) && values[0] && values[1]) {
          pickerRef.current?.closeCalendar();
        }
      }}

      plugins={[
        <CustomToolbar
          key="toolbar"
          isFa={isFa}
          setIsFa={setIsFa}
          position="bottom"
          state={pickerRef.current?.state}
          handleChange={pickerRef.current?.handleChange}
          handleFocusedDate={pickerRef.current?.handleFocusedDate}
          ref={pickerRef}
        />,
        <CustomHeaderPlugin
          key="header"
          position="top"
          isFa={isFa}
          values={props.value}
        />,
      ]}

      render={(value, openCalendar, handleValueChange, locale, separator) => (
        <CustomRangeInput
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
};

export default RangePicker2;