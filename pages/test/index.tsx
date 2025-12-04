import CipDatePickerInput from '@/modules/shared/components/ui/CipDatePickerInput';
import DatePicker2 from '@/modules/shared/components/ui/DatePicker2'
import DomesticFlightDatePickerInput from '@/modules/shared/components/ui/DomesticFlightDatePickerInput';
import RangePicker2 from '@/modules/shared/components/ui/RangePicker2'
import { addSomeDays, dateDisplayFormat, dateFormat } from '@/modules/shared/helpers';
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
  const [simpleValues, setSimpleValues] = useState<{
    flightDate: DateObject | string;
  }>({
    flightDate: ''
  });

  const [datepicker2Values, setDatepicker2Values] = useState<{
    FromReturnTime: DateObject | string;
    ToReturnTime: DateObject | string;
  }>({
    FromReturnTime: '',
    ToReturnTime: ''
  });

  const [isFa, setIsFa] = useState(true);

   const dateChangeHandle = (value: any) => {

        if (value[0] && value[1]) {
            setDates(value)
        }
  } 
  const handleChangeSimple = (name: string, value: DateObject) => {
    setSimpleValues(prev => ({ ...prev, [name]: value }));
  }
  const handleChangeDatepicker2 = (name: string, value: DateObject) => {    
    setDatepicker2Values(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className='flex flex-col gap-8 max-w-xl m-auto mt-8'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <div>Simple Date picker</div>
          <DatePicker2
              name="flightDate"
              values={simpleValues}
              onChange={handleChangeSimple}
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
              values={datepicker2Values}
              onChange={handleChangeDatepicker2}
              isFa={isFa}
              setIsFa={setIsFa}
              Input={DomesticFlightDatePickerInput}
            />

            <DatePicker2
              name="ToReturnTime"
              values={datepicker2Values}
              onChange={handleChangeDatepicker2}
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