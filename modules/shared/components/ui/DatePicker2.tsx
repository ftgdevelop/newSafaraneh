import React, { useState, useRef, useCallback, useEffect } from "react";
import DatePicker, { Value } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import CustomToolbar from "./CustomToolbar";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import { dateDisplayFormat } from "../../helpers";

type Props = {
  name: string;
  value?: Value;
  setFieldValue: (field: string, value: any, validate?: boolean) => void;
  values?: any;

  onChange?: (formattedLabel: string) => void;
  errorText?: any;
  touched?: any;

  locale?: "fa" | "en";
  Input: React.ComponentType<any>;

};

const calendars = {
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

const DatePicker2: React.FC<Props> = ({
  name,
  value,
  values,
  setFieldValue,
  errorText,
  touched,
  locale,
  onChange,
  Input,
}) => {
  const [isFa, setIsFa] = useState(locale === "fa");
  const [props, setProps] = useState<any>({
    value,
    locale
  });
  
  const settings = isFa ? calendars.fa : calendars.en;

  const pickerRef = useRef<any>();

  useEffect(() => {
    setProps((p: any) =>({...p , locale:isFa ? persian : gregorian_en}))
  },[isFa])

  // const handleChange = useCallback((v: Value | null) => {   
  //   console.log({v});
  
  //   if (v) pickerRef.current?.closeCalendar();

  //   if (onChange && v && typeof v === "object" && "toDate" in v) {
  //     const formatted = dateDisplayFormat({
  //       date: v.toString(),  
  //       format: "dddd dd MMMM",
  //       locale: isFa ? "fa" : "en",
  //     });
  //     onChange(formatted);
  //     setFieldValue(name, formatted || "", true);

  //   }
  // }, [isFa, locale])
  
  const minDate = name === 'returnDate' && values.departureDate ? new Date(values.departureDate) : new Date()
  console.log({minDate});
  

  return (
    <DatePicker
      {...props}
      ref={pickerRef}
      onPropsChange={(p) => setProps(p)}
      value={value || null}
      onChange={(v) => {
        console.log({v});
        
      }}
      calendar={settings.calendar}
      locale={settings.locale}
      format={settings.format}
      weekStartDayIndex={settings.weekStartDayIndex}
      numberOfMonths={1}
      minDate={minDate}
      arrow={false}
      monthYearSeparator=""
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
        <Toolbar
          key="toolbar"
          position="top"
          sort={["close", "deselect", "today"]}
          className="md:!hidden"
          names={{
            today: "امروز",
            deselect: "انصراف",
            close: "تایید",
          }}
        />,
      ]}
      render={(pickerValue, openCalendar, handleValueChange, loc, separator) => (
        <Input
          values={values}
          value={pickerValue}
          openCalendar={openCalendar}
          handleValueChange={handleValueChange}
          locale={loc}
          separator={separator}
          isFa={isFa}
          errors={errorText?.[name]}          
          touched={touched?.[name]}           
          setFieldValue={setFieldValue}
          tripType={name}
        />
      )}
    />
  );
};

export default DatePicker2;