import React, { useState, useRef, ChangeEvent } from "react";
import DatePicker from "react-multi-date-picker";
import Settings from "react-multi-date-picker/plugins/settings";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import CustomToolbar from "./CustomToolbar";
import { useTranslation } from "next-i18next";
import CustomRangeInput from "./CustomRangeInput";




const RangePicker2 = () => {
  const [isFa, setIsFa] = useState(true);
  const [props, setProps] = useState({
    locale: "fa",
  });

  const { t } = useTranslation("common");
  const pickerRef = useRef<any>(null);

  return (
  <DatePicker
    {...props}
    ref={pickerRef}
    onPropsChange={setProps}
    range
    calendar={isFa ? persian : gregorian}
    locale={isFa ? persian_fa : gregorian_en}
    numberOfMonths={2}
    weekStartDayIndex={isFa ? 7 : 0}
    format={isFa ? "YYYY/MM/DD" : "MM/DD/YYYY"}
      onChange={(values) => {
      
      if (Array.isArray(values) && values.length === 2 && values[0] && values[1]) {
        pickerRef.current?.closeCalendar();
      }
    }}
    plugins={[
      <CustomToolbar
        key="custom_toolbar"
        isFa={isFa}
        setIsFa={setIsFa}
        position="bottom"
        state={pickerRef.current?.state}
        handleChange={pickerRef.current?.handleChange}
        handleFocusedDate={pickerRef.current?.handleFocusedDate}
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
    minDate={new Date()}
  />
  );
};

export default RangePicker2;