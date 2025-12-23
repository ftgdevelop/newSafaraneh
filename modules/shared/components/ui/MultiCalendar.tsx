import React, { useMemo, useRef } from "react";
import { Calendar, MapDaysProps } from "react-multi-date-picker";
import DateObject, { Calendar as CalendarType } from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

import { totoLocalizedGregorianMDPDateObject } from "../../helpers";

export interface MultiCalendarProps {
  value: string[];
  onChange: (value: string[]) => void;
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
  maxDate?: string; // YYYY-MM-DD
}

const WEEK_DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const;

const MultiCalendar: React.FC<MultiCalendarProps> = ({
  value,
  onChange,
  maxDate,
  fullScreen,
  readonly = false,
  mapDays,
}) => {
  const pickerRef = useRef<CalendarType | null>(null);

  const normalizedValue = useMemo(() => {
    const start = value?.[0]
      ? totoLocalizedGregorianMDPDateObject(value[0])
      : null;
    const end = value?.[1]
      ? totoLocalizedGregorianMDPDateObject(value[1])
      : null;

    return start && end ? [[start, end]] : [];
  }, [value]);

  const normalizedMaxDate = useMemo<DateObject | undefined>(() => {
    if (!maxDate) return undefined;
    return totoLocalizedGregorianMDPDateObject(maxDate) ?? undefined;
  }, [maxDate]);

  return (
    <Calendar
      ref={pickerRef}
      headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
      value={normalizedValue}
      multiple
      range
      showOtherDays
      highlightToday={false}
      monthYearSeparator=" "
      weekDays={WEEK_DAYS as unknown as string[]}
      className={fullScreen ? "calendar-fullScreen" : ''}
      readOnly={readonly}
      minDate={new Date()}
      maxDate={normalizedMaxDate}
      calendar={persian}
      locale={persianFa}
      mapDays={mapDays}
    />
  );
};

export default MultiCalendar;