import { useMemo } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

import { DomesticHotelRateItem } from "../../types/hotel";
import { dateFormat, numberWithCommas } from "@/modules/shared/helpers";

type Props = {
    calendar?: DomesticHotelRateItem["calendar"];
    selectedDates: string[];
    roomName: string;
};

type CalendarArrayItem = {
    date: string;
    day?: number;
    month?: string;
    weekDayindex?: string;
    amount?: number;
    board?: number;
    type?: "Completion" | "Online" | "Offline" | "Request" | null;
    closeToArrival?: boolean;
    closeToDeparture?: boolean;
};

const PriceCalendar: React.FC<Props> = ({ calendar, selectedDates }) => {
    // ---------------------------------------
    // Convert calendar object to array
    // ---------------------------------------
    const calendarArray: CalendarArrayItem[] = useMemo(() => {
        if (!calendar) return [];
        return Object.keys(calendar).map((key) => ({
            date: key,
            ...calendar[key],
        }));
    }, [calendar]);

    // ---------------------------------------
    // Date range from props
    // ---------------------------------------
    const value = useMemo(() => {
        if (!selectedDates || selectedDates.length === 0) return [];
        return [selectedDates[0], selectedDates[selectedDates.length - 1]];
    }, [selectedDates]);

    // ---------------------------------------
    // Convert calendar metadata to a lookup map
    // ---------------------------------------
    const calendarMap = useMemo(() => {
        const map = new Map<string, CalendarArrayItem>();
        calendarArray.forEach((item) => map.set(item.date, item));
        return map;
    }, [calendarArray]);

    // ---------------------------------------
    // Map price + restrictions to day cells
    // ---------------------------------------
    const mapDays = ({ date }: { date: DateObject }) => {
        const iso = date.format("YYYY-MM-DD");
        const item = calendarMap.get(iso);

        if (!item) {
            return {
                children: (
                    <div className="flex flex-col items-center text-gray-300">
                        <span>{date.day}</span>
                        <span className="text-2xs">—</span>
                    </div>
                ),
            };
        }

        // Price
        let title = "قیمت نامشخص";
        let color = "#bbb";

        if (item.amount) {
            title = numberWithCommas(item.amount)?.toString() ?? "—";
            color = "#444";
        }

        // Special Types
        if (item.type === "Completion") {
            title = "ظرفیت تکمیل";
            color = "red";
        }

        if (item.closeToArrival) {
            title = "محدودیت ورود";
            color = "orange";
        }

        if (item.closeToDeparture) {
            title = "محدودیت خروج";
            color = "orange";
        }

        return {
            children: (
                <div className="flex flex-col items-center text-center">
                    <span style={{ color }}>{date.day}</span>
                    <span style={{ color }} className="text-2xs">
                        {title}
                    </span>
                </div>
            ),
        };
    };

    return (
        <div className="price-calendar-wrapper">
            <DatePicker
                value={value}
                range
                onChange={() => {}}
                calendar={persian}
                locale={persianFa}
                mapDays={mapDays}
                numberOfMonths={2}
                disableMonthPicker
                disableYearPicker
                className="price-calendar"
                minDate={dateFormat(new Date())}
                calendarPosition="bottom-center"
                readOnly
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default PriceCalendar;