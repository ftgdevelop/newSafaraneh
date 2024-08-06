import { DomesticHotelRateItem } from "../../types/hotel";
import { dateDiplayFormat, numberWithCommas } from "@/modules/shared/helpers";

type Props = {
    calendar?: DomesticHotelRateItem['calendar']
}

type CalendarArrayItemType = {
    date?: string;
    day?: number;
    month?: string;
    weekDayindex?: string;
    amount?: number;
    board?: number;
    type?: "Completion" | "Online" | "Offline" | "Request" | null;
};

const PriceCalendar: React.FC<Props> = props => {

    const { calendar } = props;

    let calendarArray: CalendarArrayItemType[] = [];

    if (calendar) {
        calendarArray = Object.keys(calendar).map((key) => ({
            date: key,
            ...calendar[key]
        }));
    }

    type PersianNumber = "۰۱" | "۰۲" | "۰۳" | "۰۴" | "۰۵" | "۰۶" | "۰۷" | "۰۸" | "۰۹" | "۱۰" | "۱۱" | "۱۲" | "۱۳" | "۱۴" | "۱۵" | "۱۶" | "۱۷" | "۱۸" | "۱۹" | "۲۰" | "۲۱" | "۲۲" | "۲۳" | "۲۴" | "۲۵" | "۲۶" | "۲۷" | "۲۸" | "۲۹" | "۳۰" | "۳۱";


    const dayIndex = (day: PersianNumber) => {
        const persianDayNumbers: PersianNumber[] = [
            "۰۱",
            "۰۲",
            "۰۳",
            "۰۴",
            "۰۵",
            "۰۶",
            "۰۷",
            "۰۸",
            "۰۹",
            "۱۰",
            "۱۱",
            "۱۲",
            "۱۳",
            "۱۴",
            "۱۵",
            "۱۶",
            "۱۷",
            "۱۸",
            "۱۹",
            "۲۰",
            "۲۱",
            "۲۲",
            "۲۳",
            "۲۴",
            "۲۵",
            "۲۶",
            "۲۷",
            "۲۸",
            "۲۹",
            "۳۰",
            "۳۱"
        ];
        return persianDayNumbers.findIndex(i => i === day) + 1;
    }

    const persianCalendarArray = calendarArray.map(item => {

        let day: number | undefined = undefined;
        if (item.date) {
            const d = dateDiplayFormat({
                date: item.date,
                format: "d",
                locale: "fa"
            });

            day = dayIndex(d as PersianNumber);
        }

        return ({
            ...item,
            date: item.date ? dateDiplayFormat({
                date: item.date,
                format: "ddd dd mm",
                locale: "fa"
            }) : undefined,
            day: day,
            weekDayindex: item.date ? dateDiplayFormat({
                date: item.date,
                format: "weekDayNumber",
                locale: "fa"
            }) : undefined,
            month: item.date ? dateDiplayFormat({
                date: item.date,
                format: "m",
                locale: "fa"
            }) : undefined
        })
    });


    const month1 = persianCalendarArray[0].month;
    const month1Array: CalendarArrayItemType[] = [];
    const month2Array: CalendarArrayItemType[] = [];

    for (let i = 0; i < persianCalendarArray.length; i++) {
        if (persianCalendarArray[i].month === month1) {
            month1Array.push(persianCalendarArray[i]);
        } else {
            month2Array.push(persianCalendarArray[i]);
        }
    }



    const firstDay = persianCalendarArray[0].day!;

    for (let j = firstDay - 1; j > 0; j--) {
        month1Array.unshift({
            amount: 0,
            board: 0,
            date: "",
            day: j
        });
    }

    console.log(month1Array)

    const weekDays = [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه"
    ]
    return (
        <>
            <div className="text-center font-semibold text-lg mb-6"> {month1} </div>
            <div className="grid grid-cols-7">
                {weekDays.map(d => (
                    <div key={d} className="text-center text-xs text-neutral-400 mb-6">
                        {d}
                    </div>
                ))}

                {month1Array.map(x => {
                    return (<div className="text-center leading-4 p-2 h-16">
                        <div className="text-lg">
                            {x.day}
                        </div>
                        {x.amount ? <div className="text-2xs whitespace-nowrap">
                            {numberWithCommas(x.amount)}
                        </div> : <div />}
                    </div>)
                })}
                <br />
            </div>

            {/* 
            {month2Array.map(x => <div>
                {x.date} : {x.amount} ----- {x.month}
            </div>
            )} */}


        </>
    )
}

export default PriceCalendar;