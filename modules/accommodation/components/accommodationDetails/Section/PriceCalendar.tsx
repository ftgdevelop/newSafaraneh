import React from "react";
import { dateFormat, numberWithCommas } from "@/modules/shared/helpers";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker as MobiscrollDatepicker, localeFa, MbscCalendarLabel } from "@mobiscroll/react";

type Props = {
  calendar: { date: string; price: number; isBookable: boolean }[];
  selectedDates: string[];
  onDateSelect?: (dates: { date: string; price: number | null }[]) => void;
};

// Helper function to convert Jalali date to Gregorian
const convertJalaliToGregorian = (jalaliDate: string): string => {
  const [jy, jm, jd] = jalaliDate.split("-").map(Number);

  // Basic Jalali-to-Gregorian conversion logic
  const gy = jy + 621;
  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // Jalali months
  let dayOfYear = jd;

  for (let i = 0; i < jm - 1; i++) {
    dayOfYear += daysInMonth[i];
  }

  const gregorianStart = new Date(gy, 2, 20); // Approximate start of Jalali year in Gregorian
  const gregorianDate = new Date(gregorianStart.getTime() + (dayOfYear - 1) * 86400000);

  const gYear = gregorianDate.getFullYear();
  const gMonth = String(gregorianDate.getMonth() + 1).padStart(2, "0");
  const gDay = String(gregorianDate.getDate()).padStart(2, "0");

  return `${gYear}-${gMonth}-${gDay}`;
};

const PriceCalendar: React.FC<Props> = ({ calendar, selectedDates, onDateSelect }) => {
  let value: (string | undefined)[] = [undefined, undefined];

  // Ensure selectedDates are used to set the value
  if (selectedDates && selectedDates.length === 2) {
    value = [selectedDates[0], selectedDates[1]];
  }

  // Convert Jalali dates to Gregorian and generate labels
  const labels: MbscCalendarLabel[] = calendar.map((item) => ({
    title: item.isBookable ? `${numberWithCommas(item.price)}` : "غیرقابل رزرو", // Only show the price
    textColor: item.isBookable ? "#555" : "red",
    date: convertJalaliToGregorian(item.date), // Convert Jalali to Gregorian
  }));

  const handleDateChange = (selectedRange: string[]) => {
    if (onDateSelect) {
      const selectedWithPrices = calendar
        .filter((item) => selectedRange.includes(convertJalaliToGregorian(item.date))) // Match Gregorian dates
        .map((item) => ({
          date: item.date,
          price: item.isBookable ? item.price : null,
        }));

      onDateSelect(selectedWithPrices);
    }
  };

  return (
    <MobiscrollDatepicker
      cssClass="price-calendar"
      display="inline"
      touchUi={false}
      locale={localeFa}
      labels={labels}
      select="range"
      value={value}
      showRangeLabels={false}
      min={dateFormat(new Date())}
      onSet={(event: { value: string[] }) => handleDateChange(event.value)}
    />
  );
};

export default PriceCalendar;