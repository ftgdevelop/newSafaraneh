import React, { useState, useRef, useEffect } from "react";
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
import { RangeValue } from "../../types/common";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

const calendarSettings = {
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

type RangeCalendarProps = CalendarProps<false, true> & {
  value: RangeValue | null;
};

interface RangePicker2Props {
  value: RangeValue;
  onChange: (event: any) => void;
}

const RangePicker2 = ({ value, onChange }: RangePicker2Props) => {
  const [isFa, setIsFa] = useState(true);

  const settings = isFa ? calendarSettings.fa : calendarSettings.en;

  const [isMobile, setIsMobile] = useState(false);
  const [props, setProps] = useState<RangeCalendarProps>({
    value,
  });

  const pickerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <DatePicker
      {...props}
      ref={pickerRef}
      onPropsChange={(p) => setProps(p as RangeCalendarProps)}
      range
      calendar={settings.calendar}
      locale={settings.locale}
      format={settings.format}
      weekStartDayIndex={settings.weekStartDayIndex}
      numberOfMonths={isMobile ? 1 : 2}
      monthYearSeparator=""
      minDate={new Date()}
      onChange={(values) => {
        if (Array.isArray(values) && values[0] && values[1]) {
          pickerRef.current?.closeCalendar();
        }
        onChange(values);
      }}
      arrow={false}
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