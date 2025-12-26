import React, { useEffect, useState } from "react";
import PriceCalendar from "./PriceCalendar";
import { Accommodation, ServerAddress } from "@/enum/url";
import DateObject from "react-date-object";

type CalendarPickerProps = {
  id: number;
  checkin: string;
  checkout: string;
};

// تابع تبدیل شمسی به میلادی (خروجی: YYYY-MM-DD)
function shamsiToGregorian(jy: number, jm: number, jd: number): string {
  // الگوریتم تبدیل جلالی به میلادی
  let gy, gm, gd;
  let sal_a = [0,31,59,90,120,151,181,212,243,273,304,334];
  jy += 1595;
  let days = -355668 + (365 * jy) + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4)
    + jd + sal_a[jm - 1];
  gy = 400 * Math.floor(days / 146097);
  days = days % 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days = days % 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days = days % 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let gd_ = days + 1;
  let kab = ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 1 : 0;
  let sal_a2 = [0,31, (kab ? 29 : 28),31,30,31,30,31,31,30,31,30,31];
  gm = 0;
  for (let i = 0; i < 13; i++) {
    let v = sal_a2[i];
    if (gd_ <= v) {
      gm = i;
      gd = gd_;
      break;
    }
    gd_ -= v;
  }
  // خروجی با فرمت YYYY-MM-DD
  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ id, checkin, checkout }) => {
  const [calendarData, setCalendarData] = useState<Record<string, any>>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([checkin, checkout]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);

        // Calculate the range for the next two months starting from tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const twoMonthsFromTomorrow = new Date(tomorrow);
        twoMonthsFromTomorrow.setMonth(tomorrow.getMonth() + 2);

        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Calendar}`,
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            } as HeadersInit,
            body: JSON.stringify({
              checkIn: `${tomorrow.toISOString().split("T")[0]}T00:00:00.000Z`,
              checkOut: `${twoMonthsFromTomorrow.toISOString().split("T")[0]}T00:00:00.000Z`,
              id: id,
            }),
          }
        );

        const data = await response.json();

        const calendarObj: Record<string, any> = {};
        Object.keys(data.result.calenders.calendar).forEach((month) => {
          const days = data.result.calenders.calendar[month];
          days.forEach((day: any) => {
            // month: "1404-10"  day.day: 5
            const [jy, jm] = month.split("-").map(Number);
            const jd = Number(day.day);
            const miladiDate = shamsiToGregorian(jy, jm, jd);
            calendarObj[miladiDate] = {
              ...day,
              date: miladiDate,
              amount: day.price?.salePrice,
            };
          });
        });
        setCalendarData(calendarObj);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [id]);

  useEffect(() => {
    setSelectedDates([checkin, checkout]);
  }, [checkin, checkout]);

  // هندل انتخاب تاریخ جدید
  const handleDateSelect = (dates: string[]) => {
    setSelectedDates(dates);
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="calendar-picker py-16">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">تقویم قیمتی</h2>
      <PriceCalendar
        calendar={calendarData}
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        roomName=""
      />
    </div>
  );
};

export default CalendarPicker;