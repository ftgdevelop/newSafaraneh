import React, { MutableRefObject } from "react";
import { DateObject, DatePickerRef } from "react-multi-date-picker";
import { CalendarToggle } from "./icons";
import { useTranslation } from "next-i18next";

interface CustomToolbarProps {
    isFa: boolean;
    setIsFa: React.Dispatch<React.SetStateAction<boolean>>;
    position: "top" | "bottom";
    state: any;
    handleChange: (value: any, state: any) => void;
    handleFocusedDate: (date?: any) => void;
    ref: MutableRefObject<any>
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
    isFa,
    setIsFa,
    state,
    handleChange,
    handleFocusedDate,
    ref
}) => {
    const { range, multiple } = state;
  const { t } = useTranslation("common");

    return (
        <div className="rmdp-toolbar text-sm bottom text-primary-700 flex justify-between px-3 py-2">

            <div
                onClick={() => setIsFa((p) => !p)}
                className="cursor-pointer flex items-center gap-2"
            >
                {isFa ? t("gregorianCalendar") : t("iranianCalendar")}
                <CalendarToggle className="w-4 h-4 text-primary-700" />
            </div>

            <div className="cursor-pointer " onClick={selectToday}>
                برو به امروز
            </div>


        </div>
    );

    function update(key : "month", value : number) {
    if (!ref?.current) return;
    let date = ref.current.date;
    ref.current.set(key, date[key] + value);
    return new DateObject(date);
    }

    function selectToday() {
        const { calendar, format, locale, selectedDate } = state;

        const today = new DateObject({ calendar, locale, format });

        let newSelection = selectedDate;

        const current = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;

        const yearDiff = today.year - current.year;
        const monthDiff = today.month.index - current.month.index;
        const totalMonthDiff = yearDiff * 12 + monthDiff;

        update("month", totalMonthDiff);

        if (range) {
            if (!newSelection || newSelection.length === 0) {
                newSelection = [today];
            } else if (newSelection.length === 2) {
                newSelection = [today];
            } else if (newSelection.length === 1) {
                newSelection = [newSelection[0], today].sort((a, b) => a - b);
            }
        } else if (multiple) {
            newSelection = [today];
        } else {
            newSelection = today;
        }
        
        handleChange(newSelection, { ...state, selectedDate: newSelection, focusedDate: today });
        handleFocusedDate(today);
    }
};

export default CustomToolbar;