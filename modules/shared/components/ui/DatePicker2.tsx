import React, { useEffect, useRef, useState } from "react";
import DatePicker, { Value, DateObject } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import Toolbar from "react-multi-date-picker/plugins/toolbar";
import CustomToolbar from "./CustomToolbar"; 

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
  locale = "fa",
  onChange,
  Input,
}) => {
  const [isFa, setIsFa] = useState<boolean>(locale === "fa");

  const [pickerLocaleConfig, setPickerLocaleConfig] = useState<any>(
    isFa ? calendars.fa : calendars.en
  );

  const pickerRef = useRef<any>(null);

  useEffect(() => {
    setPickerLocaleConfig(isFa ? calendars.fa : calendars.en);
  }, [isFa]);

  const minDate =
    name === "returnDate" && values?.departureDate
      ? new Date(values.departureDate)
      : new Date();

  function formatForOutput(v: Value, useLocaleIsFa: boolean) {
    if (v == null) return "";

    let candidate: any = Array.isArray(v) ? (v as any[])[0] : v;

    if (candidate && typeof candidate === "object" && "toDate" in candidate) {
      try {
        const formatted = dateDisplayFormat({
          date: candidate.toString(), 
          format: "dddd dd MMMM",
          locale: useLocaleIsFa ? "fa" : "en",
        });
        return formatted;
      } catch (e) {
        return candidate.toString();
      }
    }

    if (typeof candidate === "string") return candidate;
    if (candidate instanceof Date) return candidate.toISOString();

    return String(candidate);
  }

  function handleChange(v: Value | null) {
    const output = v ? formatForOutput(v as Value, isFa) : "";

    setFieldValue(name, v ?? "", true);

    if (onChange) {
      onChange(output);
    }
  }

  return (
    <DatePicker
      ref={pickerRef}
      value={value ?? null}
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
          key="builtin-toolbar"
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