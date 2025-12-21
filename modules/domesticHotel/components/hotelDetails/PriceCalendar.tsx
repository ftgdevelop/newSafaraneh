import MultiDatePicker from "@/modules/shared/components/ui/MultiDatePicker";
import { DomesticHotelRateItem } from "../../types/hotel";
import { dateFormat, getMultiDatePickerFormattedDate, numberWithCommas, persianNumbersToEnglish } from "@/modules/shared/helpers";
import MultiRangePicker from "@/modules/shared/components/ui/MultiRangePicker";
import CustomRangeInput from "@/modules/shared/components/ui/CustomRangeInput";
import MultiCalendar from "@/modules/shared/components/ui/MultiCalendar";

// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Datepicker as MobiscrollDatepicker, localeFa, MbscCalendarLabel } from '@mobiscroll/react';

type Props = {
    calendar?: DomesticHotelRateItem['calendar'];
    selectedDates: string[];
    roomName: string;
}

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

    let value : string[] = ['' , ''];

    if(props.selectedDates){
        value = [props.selectedDates[0], props.selectedDates[props.selectedDates.length - 1]]
    }

    let labels : any[] = [];

    if (calendarArray){
        labels = calendarArray.map(item => {
            
            let title = "قیمت نامشخص";
            let textColor = "#bbbbbb";

            if(item.amount){
                title = numberWithCommas(item.amount)?.toString();
                textColor = "#555"; 
            }

            if(item.type === "Completion"){
                title = "ظرفیت تکمیل";
                textColor = "red";
            }

            if(item.closeToDeparture){
                title = "محدودیت خروج";
                textColor = "orange";
            }
            
            if(item.closeToArrival){
                title = "محدودیت ورود";
                textColor = "orange";
            }

            return ({
                title: title,
                textColor: textColor,
                date: item.date
            })
        })
    }else{
        debugger;
    }
    const labelMap = new Map<
        string,
        { title: string; textColor: string }
    >();

    labels.forEach(item => {
        if (item.date) {
        labelMap.set(item.date, {
            title: item.title,
            textColor: item.textColor,
        });
        }
    });    
    
    const renderMapDays = ({ date, selectedDate,  isSameDate }: any) => {
        const formattedDate = persianNumbersToEnglish(getMultiDatePickerFormattedDate({
            date,
            format: 'YYYY-MM-DD',
        }))
        const label = labelMap.get(formattedDate);
        
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
            <div style={{ display: "flex", flexDirection: "column", }}>
                <div>{date.day}</div>

                    <div
                        className="label-price"
                        style={{
                            color: checkIsInBetween() ? 'black' : label.textColor,
                        }}
                >
                {label.title}
                </div>
            </div>
            ),
        };
    };

    return (
        <div className="flex-auto">
            <MultiCalendar
                onChange={(value: string[])=>console.log(value)}
                value={value}
                fullScreen
                mapDays={(date) => renderMapDays(date)}
                readonly
            />
        </div>
    
    );
}

export default PriceCalendar;