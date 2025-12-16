import React from "react";

// type Props = {
//   calendar: { date: string; price: number; isBookable: boolean }[];
//   selectedDates: string[];
//   onDateSelect?: (dates: { date: string; price: number | null }[]) => void;
// };

type CalendarDay = { date: string; price: number; isBookable: boolean; isInstant?: boolean };
type Props = {
  calendar: CalendarDay[];
  selectedDates: string[];
  onDateSelect?: (dates: { date: string; price: number | null }[]) => void;
};

const convertJalaliToGregorian = (jalaliDate: string): string => {
  const [jy, jm, jd] = jalaliDate.split("-").map(Number);
  const gy = jy + 621;
  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let dayOfYear = jd;

  for (let i = 0; i < jm - 1; i++) {
    dayOfYear += daysInMonth[i];
  }

  const gregorianStart = new Date(gy, 2, 20);
  const gregorianDate = new Date(gregorianStart.getTime() + (dayOfYear - 1) * 86400000);

  const gYear = gregorianDate.getFullYear();
  const gMonth = String(gregorianDate.getMonth() + 1).padStart(2, "0");
  const gDay = String(gregorianDate.getDate()).padStart(2, "0");

  return `${gYear}-${gMonth}-${gDay}`;
};

const PriceCalendar: React.FC<Props> = ({ calendar, selectedDates, onDateSelect }) => {
  let value: (string | undefined)[] = [undefined, undefined];

  if (selectedDates && selectedDates.length === 2) {
    value = [selectedDates[0], selectedDates[1]];
  }

  // const labels: MbscCalendarLabel[] = calendar.map((item) => ({
  //   title: item.isBookable ? `${numberWithCommas(item.price)}` : "غیرقابل رزرو",
  //   textColor: item.isBookable ? "#555" : "red",
  //   date: convertJalaliToGregorian(item.date),
  // }));

  // const labels: MbscCalendarLabel[] = calendar.map((item) => ({
  //   title: item.isBookable
  //     ? `${numberWithCommas(item.price)}${item.isInstant ? ' ⚡️' : ''}`
  //     : "غیرقابل رزرو",
  //   textColor: item.isBookable ? "#555" : "red",
  //   date: convertJalaliToGregorian(item.date),
  // }));

  const handleDateChange = (selectedRange: string[]) => {
    if (onDateSelect) {
      const selectedWithPrices = calendar
        .filter((item) => selectedRange.includes(convertJalaliToGregorian(item.date)))
        .map((item) => ({
          date: item.date,
          price: item.isBookable ? item.price : null,
        }));

      onDateSelect(selectedWithPrices);
    }
  };

  return 'PriceCalendar'
  // !this return must be 
    // <MultiDatePicker
    //   cssClass="price-calendar"
    //   display="inline"
    //   touchUi={false}
    //   locale={localeFa}
    //   labels={labels}
    //   select="range"
    //   value={value}
    //   showRangeLabels={false}
    //   min={dateFormat(new Date())}
    //   onSet={(event: { value: string[] }) => handleDateChange(event.value)}
    // />
  
};

export default PriceCalendar;