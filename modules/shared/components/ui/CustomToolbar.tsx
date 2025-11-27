import React from "react";
import { DateObject } from "react-multi-date-picker";
import { CalendarToggle } from "./icons";
import { useTranslation } from "next-i18next";

interface CustomToolbarProps {
    isFa: boolean;
    setIsFa: React.Dispatch<React.SetStateAction<boolean>>;
    position: "top" | "bottom";
    state: any;
    handleChange: (value: any, state: any) => void;
    handleFocusedDate: (date?: any) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
    isFa,
    setIsFa,
    state,
    handleChange,
    handleFocusedDate,
}) => {
    const { range, multiple } = state;
  const { t } = useTranslation("common");

    return (
        <div className="rmdp-toolbar bottom text-primary-700 flex justify-between px-3 py-2">

            <div
                onClick={() => setIsFa((p) => !p)}
                className="cursor-pointer flex items-center gap-2"
            >
                {isFa ? t("gregorianCalendar") : t("iranianCalendar")}
                <CalendarToggle className="w-4 h-4 text-white" />
            </div>

            <div className="cursor-pointer" onClick={selectToday}>
                {isFa ? "برو به امروز" : "Today"}
            </div>


        </div>
    );


    function selectToday() {
        const { calendar, format, locale, selectedDate } = state;

        const today = new DateObject({ calendar, locale, format });

        let newSelection = selectedDate;

        if (range) {
            if (!newSelection || newSelection.length === 0) {
                newSelection = [today];
            } else if (newSelection.length === 2) {
                newSelection = [today];
            } else if (newSelection.length === 1) {
                newSelection = [newSelection[0], today].sort((a, b) => a - b);
            }
        } else if (multiple) {
            newSelection = [today, undefined];
        } else {
            newSelection = today;
        }

        handleChange(newSelection, { ...state, selectedDate: newSelection, focusedDate: today });
        handleFocusedDate(today);
    }
};

export default CustomToolbar;