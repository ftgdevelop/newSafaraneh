import MultiCalendar from "@/modules/shared/components/ui/MultiCalendar";
import { getMultiDatePickerFormattedDate, numberWithCommas, persianNumbersToEnglish } from "@/modules/shared/helpers";
import { DomesticHotelRateItem } from "@/modules/domesticHotel/types/hotel";

type Props = {
  calendar?: DomesticHotelRateItem['calendar'];
  selectedDates: string[];
  roomName: string;
  isInstant?: boolean;
};

type CalendarArrayItemType = {
  date?: string;
  day?: number;
  month?: string;
  weekDayindex?: string;
  amount?: number;
  board?: number;
  type?: "Completion" | "Online" | "Offline" | "Request" | null;
  closeToArrival?: boolean;
  closeToDeparture?: boolean;
  isInstant?: boolean;
};

const PriceCalendar: React.FC<Props> = ({ calendar = {}, selectedDates }) => {
  let calendarArray: CalendarArrayItemType[] = [];

  if (calendar) {
    calendarArray = Object.keys(calendar).map((key) => ({
      date: key, // میلادی
      ...calendar[key]
    }));
  }


  const calendarKeys = Object.keys(calendar);
  let value: string[] = ['', ''];
  if (
    selectedDates &&
    selectedDates.length > 1 &&
    calendarKeys.includes(selectedDates[0]) &&
    calendarKeys.includes(selectedDates[selectedDates.length - 1])
  ) {
    value = [selectedDates[0], selectedDates[selectedDates.length - 1]];
  } else {
    // نمایش پیام یا مقدار value را خالی بگذار
    return <div>تاریخ انتخاب‌شده در بازه تقویم نیست یا داده‌ای وجود ندارد.</div>;
  }

  // Generate labels for each date
  const labels = calendarArray.map(item => {
    let title = "قیمت نامشخص";
    let textColor = "#bbbbbb";

    if (item.amount) {
      title = numberWithCommas(item.amount)?.toString();
      textColor = "#555";
    }
    if (item.type === "Completion") {
      title = "ظرفیت تکمیل";
      textColor = "red";
    }
    if (item.closeToDeparture) {
      title = "محدودیت خروج";
      textColor = "orange";
    }
    if (item.closeToArrival) {
      title = "محدودیت ورود";
      textColor = "orange";
    }

    return {
      title,
      textColor,
      date: item.date, // میلادی
      isInstant: item.isInstant,
    };
  });

  const labelMap = new Map<string, { title: string; textColor: string; isInstant?: boolean }>();
  labels.forEach(item => {
    if (item.date) {
      labelMap.set(item.date, {
        title: item.title,
        textColor: item.textColor,
        isInstant: item?.isInstant,
      });
    }
  });

  const renderMapDays = ({ date, selectedDate }: any) => {
    const formattedDate = persianNumbersToEnglish(getMultiDatePickerFormattedDate({
      date,
      format: 'YYYY-MM-DD',
    }));
    const label = labelMap.get(formattedDate);
    const dayData = calendar[formattedDate];

    if (!label) return;

    const checkIsInBetween = () => {
      if (!selectedDate || !selectedDate[0]) return false;
      const [start, end] = selectedDate[0];
      if (!start || !end) return false;
      const dateTime = date.toDate().getTime();
      const startTime = start.toDate().getTime();
      const endTime = end.toDate().getTime();
      return dateTime >= startTime && dateTime <= endTime;
    };

    return {
      children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{date.day}</div>
          <div
            className="label-price flex items-center justify-center gap-1"
            style={{color: checkIsInBetween() ? 'black' : label.textColor,}}
          >
            {label.title}
            {label?.isInstant && (<div className="text-[#f59e42]">⚡️</div>)}
          </div>
        </div>
      ),
    };
  };

  const lastItem = labels[labels.length - 1];
  const lastItemMiladi = lastItem?.date;

  return (
    <div className="flex-auto">
      <MultiCalendar
        onChange={(value: string[]) => console.log(value)}
        value={value}
        fullScreen
        mapDays={renderMapDays}
        readonly
        maxDate={lastItemMiladi}
      />
    </div>
  );
};

export default PriceCalendar;