import CipDatePickerInput from '@/modules/shared/components/ui/CipDatePickerInput';
import DatePicker2 from '@/modules/shared/components/ui/DatePicker2'
import DomesticFlightDatePickerInput from '@/modules/shared/components/ui/DomesticFlightDatePickerInput';
import RangePicker2 from '@/modules/shared/components/ui/RangePicker2'
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import { RangeValue } from '@/modules/shared/types/common';
import React, { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import english from "react-date-object/locales/gregorian_en";

  const today = new DateObject({
    date: new Date(),
    format: "YYYY/MM/DD",
    calendar: persian,
    locale: persian_fa,
  });

  const tomorrow = new DateObject({
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    format: "YYYY/MM/DD",
    calendar: persian,
    locale: persian_fa,
  });


  const domesticHotelDefaultDates: RangeValue = [today, tomorrow];

const TestPage = () => {

  const [dates, setDates] = useState<RangeValue>(domesticHotelDefaultDates);
  const [simpleValues, setSimpleValues] = useState({
    flightDate: ''
  });

  const [datepicker2Values, setDatepicker2Values] = useState({
    FromReturnTime: '',
    ToReturnTime: ''
  });

  const [isFa, setIsFa] = useState(true);

   const dateChangeHandle = (value: any) => {

        if (value[0] && value[1]) {
            setDates(value)
        }
  } 
  console.log(dates && {v1:new DateObject({
                  date: dates[0],
                  format: "YYYY/MM/DD",
                  calendar: gregorian,
                  locale: english,
              }).convert(gregorian, english).format('YYYY MM DD'), v2:new DateObject({
                  date: dates[1],
                  format: "YYYY/MM/DD",
                  calendar: gregorian,
                  locale: english,
              }).convert(gregorian, english).format('YYYY MM DD')});
  
  return (
    <div className='flex flex-col gap-8 max-w-xl m-auto mt-8'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <div>Simple Date picker</div>
          <DatePicker2
              name="flightDate"
              value={simpleValues.flightDate}
              values={simpleValues}
          setFieldValue={(n, v) =>
            console.log({
              n,
              v: new DateObject({
                  date: v,
                  format: "YYYY/MM/DD",
                  calendar: gregorian,
                  locale: english,
              }).convert(gregorian, english).format('YYYY MM DD')
            }
              , "Simple Date picker")}
              isFa={isFa}
              setIsFa={setIsFa}
              Input={CipDatePickerInput}
          />
      </div>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <div>2 Date picker</div>
              <div className='flex gap-2 items-center justify-center'>

          <DatePicker2
                name="FromReturnTime"
                value={datepicker2Values.FromReturnTime}
                values={datepicker2Values}
                setFieldValue={(n, v)=>console.log({n, v: new DateObject({
                  date: v,
                  format: "YYYY/MM/DD",
                  calendar: gregorian,
                  locale: english,
              }).convert(gregorian, english).format('YYYY MM DD')}, "2 Date picker")}
                isFa={isFa}
                setIsFa={setIsFa}
                Input={DomesticFlightDatePickerInput}
            />

            <DatePicker2
                name="ToReturnTime"
                value={datepicker2Values.ToReturnTime}
                values={datepicker2Values}
                setFieldValue={(n, v)=>console.log({n, v: new DateObject({
                  date: v,
                  format: "YYYY/MM/DD",
                  calendar: gregorian,
                  locale: english,
              }).convert(gregorian, english).format('YYYY MM DD')}, "2 Date picker")}
                isFa={isFa}
                setIsFa={setIsFa}
                Input={DomesticFlightDatePickerInput}
          />
          </div>
      </div>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <div>
          Range Picker
        </div>
          <RangePicker2
                value={dates}
                onChange={dateChangeHandle}
            />
      </div>
      
    </div>
  )
}

export default TestPage