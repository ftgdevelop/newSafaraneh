import React from "react";
import { DateObject } from "react-multi-date-picker";
import { CalendarToggle } from "./icons";
import { useTranslation } from "next-i18next";

interface CustomToolbarProps {
  isFa: boolean;
  setIsFa:  (v: boolean) => void;
  position?: "top" | "bottom";

  state?: any;
  handleChange?: (value: any, state?: any) => void;
  handleFocusedDate?: (date?: any) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  isFa,
  setIsFa,
  state,
  handleChange,
  handleFocusedDate,
}) => {
  const { t } = useTranslation('common');

  const safeState = state || {};
  const { range, multiple, selectedDate, calendar, locale, format, focusedDate } =
    safeState;


  function selectToday() {
    if (!safeState) return;

    const today = new DateObject({ calendar, locale, format });

    let newSelection;

    if (range) {
      if (!selectedDate || selectedDate.length === 0) {
        newSelection = [today];
      } else if (selectedDate.length === 1) {
        newSelection = [selectedDate[0], today].sort((a, b) => a - b);
      } else {
        newSelection = [today];
      }
    } else if (multiple) {
      newSelection = [today];
    } else {
      newSelection = today;
    }

    if (handleChange) {
      handleChange(newSelection, {
        ...safeState,
        selectedDate: newSelection,
        focusedDate: today,
      });
    }

    if (handleFocusedDate) handleFocusedDate(today);
  }

  return (
    <div className="text-sm text-primary-700 flex justify-between px-3 py-2">
      <div
        onClick={() => setIsFa(!isFa)}
        className="cursor-pointer flex items-center gap-2"
      >
        {isFa ? t("gregorianCalendar") : t("iranianCalendar")}
        <CalendarToggle className="w-4 h-4 text-primary-700" />
      </div>

      <div className="cursor-pointer" onClick={selectToday}>
        برو به امروز
      </div>
    </div>
  );
};

export default CustomToolbar;