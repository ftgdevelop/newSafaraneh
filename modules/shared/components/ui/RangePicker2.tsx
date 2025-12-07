import React, { useState, useRef, useEffect } from "react";
import DatePicker, {
  CalendarProps,
} from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

import CustomToolbar from "./CustomToolbar";
import CustomHeaderPlugin from "./CustomHeaderRangePicker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import CustomRangeInput from "./CustomRangeInput";
import { dateDisplayFormat, DateFormat } from "../../helpers";
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

interface RangePicker2Props {
  defaultValue: DateObject[];
  onChange: ( defaultValue: string[]) => void
}

const RangePicker2 = ({ defaultValue, onChange }: RangePicker2Props) => {
  const [isFa, setIsFa] = useState(true);
  const [value, setValue] = useState(defaultValue);

  const localeConfig = isFa ? calendars.fa : calendars.en;

  const [isMobile, setIsMobile] = useState(false);

  const pickerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleChange = (values: DateObject[]) => {
    
        if (Array.isArray(values) && values[0] && values[1]) {
          pickerRef.current?.closeCalendar();
        }
        const [startDate, endDate] = values;
        const adjustedStartDate = dateDisplayFormat({
          date: startDate,
          format: 'YYYY/MM/DD',
          locale: 'en',
        });
        const adjustedEndDate = dateDisplayFormat({
          date: endDate,
          format: 'YYYY/MM/DD',
          locale: 'en',
        });
        setValue(values)
        onChange([adjustedStartDate, adjustedEndDate]);
      }

  return (
    <DatePicker
      value={value}
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
          values={value}
        />,

      ]}

      render={(val, openCalendar, handleValueChange, locale, separator) => (
        <CustomRangeInput
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