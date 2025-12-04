import React, {  useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";

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
const directionToFields = ["returnDate", "ToReturnTime"];
type Props = {
  name: string;
  values?: any;
  label?: string;
  isFa: boolean;
  setIsFa: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  Input: React.ComponentType<any>;
};

const DatePicker2: React.FC<Props> = ({
  name,
  values,
  onChange,
  isFa,
  setIsFa,
  Input,
  label
}) => {
  const [minDate, setMinDate] = useState<Date | DateObject>(new Date());
  const [value, setValue] = useState<DateObject | null>(null)
  const localeKey = isFa ? "fa" : "en";

  const localeConfig = calendars[localeKey];


  useEffect(() => {
    let dep
    let ret
    setMinDate(new Date());
    Object.values(values).map((value, index) => {
      if (index === 0) {
        dep = new DateObject({
          date: value as DateObject,
          format: 'YYYY/MM/DD',
          locale: localeConfig.locale
        })
      } else {
        ret = new DateObject({
          date: value as DateObject,
          format: 'YYYY/MM/DD',
          locale: localeConfig.locale
        })
      }
    })
    
    if (dep && ret && dep > ret && directionToFields.includes(name)) {
      
        const newDate = addSomeDays(dep, 1);

        const adjusted = new DateObject({
          date: newDate,
          calendar: localeConfig.calendar,
          locale: localeConfig.locale,
        });
        setMinDate(adjusted);
        handleChange(adjusted);
        return;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (v: DateObject) => {
    setValue(v)
    onChange(
      name,
      dateDisplayFormat({
        date: v,
        format: 'YYYY/MM/DD',
        locale: 'en',
      })
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
          className="
            bg-[#f7f7f7]
            [&>div]:!bg-transparent
            [&>div]:!text-[#007aff]
            [&>div:nth-child(3)]:hidden
          "
        />,
      ]}
      // className="rounded-lg"
      render={(pickerValue, openCalendar, handleValueChange, loc, sep) => (
        <Input
          values={values}
          value={pickerValue}
          openCalendar={openCalendar}
          handleValueChange={handleValueChange}
          locale={loc}
          separator={sep}
          isFa={isFa}
          tripType={name}
          label={label}
        />
      )}
    />
  );
};

export default DatePicker2;