import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import DatePicker, {
} from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import CustomToolbar from "./CustomToolbar";
import CustomHeaderPlugin from "./CustomHeaderRangePicker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { DateFormat } from "../../helpers";
import DateObject, { Locale } from "react-date-object";

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


interface RangePicker2Props<TInputProps>{
  defaultValue:[DateObject | null, DateObject | null];
  onChange: (defaultValue: [DateObject | null, DateObject | null]) => void;
  inputProps?: TInputProps;
    Input: React.ComponentType<TInputProps & InternalInputProps>;
  
}

function RangePicker2<TInputProps>({ defaultValue, onChange, Input, inputProps = {} as TInputProps,
}: RangePicker2Props<TInputProps>){
  const [isFa, setIsFa] = useState(true);
  const [innerValue, setInnerValue] = useState(defaultValue);

  const localeConfig = isFa ? calendars.fa : calendars.en;

  const [isMobile, setIsMobile] = useState(false);

  const pickerRef = useRef<any>(null);

  useEffect(() => {
    if (defaultValue.length > 0 && (defaultValue[0] || defaultValue[1])) {
      onChange(defaultValue)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
    const handleChange = (
      dates: DateObject[],
    ) => {
      const tuple: [DateObject | null, DateObject | null] = [
        dates[0] ?? null,
        dates[1] ?? null,
      ];

      setInnerValue(tuple);
      onChange(tuple);
    };


  return (
    <DatePicker
      value={innerValue}
      ref={pickerRef}
      range
      calendar={localeConfig.calendar}
      locale={localeConfig.locale}
      format={localeConfig.format}
      weekStartDayIndex={localeConfig.weekStartDayIndex}
      numberOfMonths={isMobile ? 1 : 2}
      monthYearSeparator=""
      minDate={new Date()}
      onChange={handleChange}
      rangeHover
      arrow={false}
      plugins={[
        <CustomToolbar
          key="toolbar"
          isFa={isFa}
          setIsFa={setIsFa}
          position="bottom"
        />,
        <Toolbar
          key='top-toolbar'  
          position="top" 
          sort={["close","deselect",  "today"]} 
          className="md:!hidden"
          names={ {
            today: "امروز", 
            deselect: "انصراف", 
            close: "تایید" 
          }}
          
        />,
        <CustomHeaderPlugin
          key="header"
          position="top"
          isFa={isFa}
          values={innerValue}
        />,

      ]}

      render={(val, openCalendar, handleValueChange, locale, separator) => (

        <Input
          {...inputProps}
          value={val}
          openCalendar={openCalendar}
          handleValueChange={handleValueChange}
          locale={locale}
          separator={separator}
          isFa={isFa}
        />
      )}

      //!! this part is for adding price can be useful
      // mapDays={({ date, currentMonth }) => {
      //   if (date.monthIndex !== currentMonth.index) {
      //     return {}
      //   }
      //   return {
      //     children: (
      //       <div
      //         style={{
      //           display: "flex",
      //           flexDirection: "column",
      //           padding: "0 10px",
      //           fontSize: "11px",
      //           gap: "10px",
      //           height: "30px",
      //         }}
      //       >
      //         <div style={{ textAlign: "center" }}>{date.format("D")}</div>
      //         {
      //           date.format("D") &&  <div style={{ textAlign: "center", fontSize: "8px" }}>قیمت</div>
      //         }
      //       </div>
      //     ),
      //   };
      // }}
    />
  );
};

export default RangePicker2;