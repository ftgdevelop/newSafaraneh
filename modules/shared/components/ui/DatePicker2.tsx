import React, { useEffect, useRef, useState } from "react";
import DatePicker, { Value } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import Toolbar from "react-multi-date-picker/plugins/toolbar";
import CustomToolbar from "./CustomToolbar";

import { addSomeDays, dateDisplayFormat, DateFormat } from "../../helpers";
import DateObject from "react-date-object";

const calendars: Record<"fa" | "en", {
  calendar: any;
  locale: any;
  format: DateFormat;
  weekStartDayIndex: number;
}> = {
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

type Props = {
  name: string;
  value?: Value;
  values?: any;
  setFieldValue: (field: string, value: any) => void;

  onChange?: (x: string) => void;

  isFa: boolean;
  setIsFa: React.Dispatch<React.SetStateAction<boolean>>;

  Input: React.ComponentType<any>;
};

const DatePicker2: React.FC<Props> = ({
  name,
  value,
  values,
  setFieldValue,
  onChange,
  isFa,
  setIsFa,
  Input,
}) => {
  const [pickerLocaleConfig, setPickerLocaleConfig] = useState(
    isFa ? calendars.fa : calendars.en
  );

  useEffect(() => {
    setPickerLocaleConfig(isFa ? calendars.fa : calendars.en);
  }, [isFa]);

  const minDate =
    name === "returnDate" && values?.departureDate
      ? new Date(values.departureDate)
      : new Date();
  
    useEffect(() => {
      if (name === "returnDate") {
        if (values?.departureDate && values?.returnDate) {

          const dep = new Date(values.departureDate);
          const ret = new Date(values.returnDate);

          if (dep > ret) {
            const newDate = addSomeDays(dep);

            const dateObj = new DateObject({
              date: newDate,
              calendar: isFa ? persian : gregorian,
              locale: isFa ? persian_fa : gregorian_en,
            });

            handleChange(dateObj);
          }
        }
      }
    }, [name, values, isFa]);

  function formatForOutput(v: Value, fa: boolean) {
    if (!v) return "";    
    try {
      const str = dateDisplayFormat({
        date: v.toString(),
        format: calendars[fa ? "fa" : "en"].format,
        locale: fa ? "fa" : "en",
      });
      
      return str;
    } catch {
      return v.toString();
    }
  }

  function handleChange(v: Value | null) {
    const formatted = v ? formatForOutput(v, isFa) : "";

    setFieldValue(name, v);
    if (onChange) onChange(formatted);
  }

  return (
    <DatePicker
      value={value || null}
      onChange={handleChange}
      calendar={pickerLocaleConfig.calendar}
      locale={pickerLocaleConfig.locale}
      format={pickerLocaleConfig.format}
      weekStartDayIndex={pickerLocaleConfig.weekStartDayIndex}
      numberOfMonths={1}
      minDate={minDate}
      arrow={false}
      monthYearSeparator=""
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
        />,
      ]}
      render={(pickerValue, openCalendar, handleValueChange, loc, sep) => (
        <Input
          values={values}
          value={pickerValue}
          openCalendar={openCalendar}
          handleValueChange={handleValueChange}
          locale={loc}
          separator={sep}
          isFa={isFa}
          setFieldValue={setFieldValue}
          tripType={name}
        />
      )}
    />
  );
};

export default DatePicker2;