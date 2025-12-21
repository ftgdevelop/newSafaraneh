import React, { useRef } from 'react'
import { Calendar,  MapDaysProps } from 'react-multi-date-picker'
import { totoLocalizedGregorianMDPDateObject } from '../../helpers';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";



interface MultiCalendarProps{
  value: string[];
  onChange: (v: string[]) => void;
  fullScreen?: boolean;
  readonly?: boolean;
  mapDays?: (
    props: MapDaysProps<true, true>
  ) =>
    | (React.HTMLAttributes<HTMLSpanElement> & {
        disabled?: boolean;
        hidden?: boolean;
      })
    | void;
}


const MultiCalendar = ({ value, onChange, fullScreen, readonly = false, mapDays }: MultiCalendarProps) => {
  const pickerRef = useRef<any>(null);
  

    const start = totoLocalizedGregorianMDPDateObject(value[0]);
    const end = totoLocalizedGregorianMDPDateObject(value[1]);

    const normalizedValue = start && end ? [[start, end]] : [];
  
  
  return (
    <Calendar
        headerOrder={[ "MONTH_YEAR","LEFT_BUTTON", "RIGHT_BUTTON"]} 
        ref={pickerRef}
        value={normalizedValue}
        showOtherDays
        multiple
        range
        highlightToday={false}
      monthYearSeparator=' '
        className={`${fullScreen ? "calendar-fullScreen" : ''}`}
        readOnly={readonly}
        minDate={new Date()}
        calendar={persian}
        locale={persian_fa}
        mapDays={mapDays}
      />
  )
}

export default MultiCalendar