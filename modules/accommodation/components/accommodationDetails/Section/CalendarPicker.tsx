import React, { useEffect, useState } from "react";
import PriceCalendar from "./PriceCalendar";
import { Accommodation, ServerAddress } from "@/enum/url";

type CalendarPickerProps = {
  id: number;
  checkin: string;
  checkout: string;
};

const CalendarPicker: React.FC<CalendarPickerProps> = ({ id, checkin, checkout }) => {
  const [calendarData, setCalendarData] = useState<Record<string, any>>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([checkin, checkout]); // Initialize with checkin and checkout
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        // Calculate the range for the next two months starting from tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Set checkIn to tomorrow

        const twoMonthsFromTomorrow = new Date(tomorrow);
        twoMonthsFromTomorrow.setMonth(tomorrow.getMonth() + 2); // Set checkOut to two months from tomorrow

        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Calendar}`,
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              tenantId: "7",
              // apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              checkIn: `${tomorrow.toISOString().split("T")[0]}T00:00:00.000Z`, // Start from tomorrow
              checkOut: `${twoMonthsFromTomorrow.toISOString().split("T")[0]}T00:00:00.000Z`, // End two months from tomorrow
              id: id,
            }),
          }
        );

        const data = await response.json();

        if (data && data.result.calenders && data.result.calenders.calendar) {
          setCalendarData(data.result.calenders.calendar);
        } else {
          console.error("Invalid calendar data:", data);
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCalendarData();
  }, [id]);

  useEffect(() => {
    setSelectedDates([checkin, checkout]); // Update selected dates when props change
  }, [checkin, checkout]);

  // Process the calendar data into a flat structure
  const processedCalendar = Object.keys(calendarData).reduce((acc: any[], month) => {
    const days = calendarData[month];
    days.forEach((day: any) => {
      const date = `${month}-${String(day.day).padStart(2, "0")}`; // Format date as YYYY-MM-DD
      acc.push({
        date,
        price: day.price.salePrice, // Extract the sale price
        isBookable: day.isBookable,
      });
    });
    return acc;
  }, []);

  const handleDateSelect = (dates: { date: string; price: number | null }[]) => {
    setSelectedDates(dates.map((d) => d.date));
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="calendar-picker py-16">
      <h3 className="text-lg font-semibold mb-4">تقویم قیمتی</h3>
      <PriceCalendar
        calendar={processedCalendar}
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default CalendarPicker;