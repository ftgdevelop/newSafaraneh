import React from "react";
import { DateObject } from "react-multi-date-picker";
import { CalendarToggle } from "./icons";
import { useTranslation } from "next-i18next";


export type PickerValue =
  | DateObject
  | [DateObject | null, DateObject | null]
  | DateObject[];

interface CustomToolbarProps {
  isFa: boolean;
  setIsFa: (v: boolean) => void;
  position?: "top" | "bottom";
  onChange: (value: PickerValue) => void;
  state?: {
    range?: boolean;
    multiple?: boolean;
    selectedDate?: any;
    calendar?: any;
    locale?: any;
    format?: string;
    focusedDate?: DateObject;
  };
  handleChange?: (value: PickerValue, state?: any) => void;
  handleFocusedDate?: (date?: DateObject) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  isFa,
  setIsFa,
  state,
  onChange,
  handleChange,
  handleFocusedDate,
}) => {
  const { t } = useTranslation("common");

  const safeState = state ?? {};
  const {
    range,
    multiple,
    selectedDate,
    calendar,
    locale,
    format,
  } = safeState;

  function selectToday() {
    const today = new DateObject({date : new Date, calendar, locale, format });
console.log(today);

    if (range) {
      onChange([today, null]);
    } else {
      onChange(today);
    }

    let newSelection: PickerValue;

    if (range) {
      if (!selectedDate || selectedDate.length === 0) {
        newSelection = [today];
      } else if (selectedDate.length === 1) {
        newSelection = [selectedDate[0], today].sort(
          (a: DateObject, b: DateObject) => +a - +b
        );
      } else {
        newSelection = [today];
      }
    } else if (multiple) {
      newSelection = [today];
    } else {
      newSelection = today;
    }

    handleChange?.(newSelection, {
      ...safeState,
      selectedDate: newSelection,
      focusedDate: today,
    });

    handleFocusedDate?.(today);
  }

  return (
    <div className="text-sm text-primary-700 flex justify-between px-3 py-3">
      <div
        onClick={() => setIsFa(!isFa)}
        className="cursor-pointer flex items-center gap-2"
      >
        {isFa ? t("gregorianCalendar") : t("iranianCalendar")}
        <CalendarToggle className="w-4 h-4 fill-primary-700" />
      </div>

      <div className="cursor-pointer" onClick={selectToday}>
        برو به امروز
      </div>
    </div>
  );
};

export default CustomToolbar;