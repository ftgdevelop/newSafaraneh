import React, { useEffect, useMemo, useState } from "react";
import DatePicker, { Value } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import Toolbar from "react-multi-date-picker/plugins/toolbar";
import CustomToolbar from "./CustomToolbar";

import { addSomeDays, dateDisplayFormat, DateFormat } from "../../helpers";
import DateObject from "react-date-object";

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

const directionToFields = ["returnDate", "ToReturnTime"] as const;

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
  const localeKey = isFa ? "fa" : "en";

  const localeConfig = calendars[localeKey];

  const minDate = useMemo(() => {
    if (directionToFields.includes(name as any) && values?.departureDate) {
      return new Date(values.departureDate);
    }
    return new Date();
  }, [name, values]);

  useEffect(() => {
    if (!directionToFields.includes(name as any)) return;

    const dep = values?.departureDate ? new Date(values.departureDate) : null;
    const ret = values?.returnDate ? new Date(values.returnDate) : null;

    if (dep && ret && dep > ret) {
      const newDate = addSomeDays(dep);

      const adjusted = new DateObject({
        date: newDate,
        calendar: localeConfig.calendar,
        locale: localeConfig.locale,
      });

      handleChange(adjusted);
    }
  }, [name, values, localeConfig]);

  const formatForOutput = (v: Value) => {
    if (!v) return "";
    try {
      return dateDisplayFormat({
        date: v.toString(),
        format: localeConfig.format,
        locale: localeKey,
      });
    } catch {
      return v.toString();
    }
  };

  const handleChange = (v: Value | null) => {
    const formatted = v ? formatForOutput(v) : "";
    setFieldValue(name, v);
    if (onChange) onChange(formatted);
  };

  return (
    <DatePicker
      value={value || null}
      onChange={handleChange}
      calendar={localeConfig.calendar}
      locale={localeConfig.locale}
      format={localeConfig.format}
      weekStartDayIndex={localeConfig.weekStartDayIndex}
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