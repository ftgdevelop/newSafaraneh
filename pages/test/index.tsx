import CipDatePickerInput, { CipInputProps } from "@/modules/shared/components/ui/CipDatePickerInput";

import DatePicker2, { calendars } from "@/modules/shared/components/ui/DatePicker2";

import DomesticFlightDatePickerInput, { DomesticFlightInputProps } from "@/modules/shared/components/ui/DomesticFlightDatePickerInput";

import RangePicker2 from "@/modules/shared/components/ui/RangePicker2";
import { RangeValue } from "@/modules/shared/types/common";

import React, { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button from "@/modules/shared/components/ui/Button";
import { addSomeDays, dateDisplayFormat } from "@/modules/shared/helpers";
import TestOne from "@/modules/shared/components/test/test1";
import TestTow from "@/modules/shared/components/test/test2";
import TestThree from "@/modules/shared/components/test/test3";

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
  const [dates, setDates] = useState<Record<"rangeData", string[]>>({
    rangeData: ["", ""],
  });

  const [simpleValues, setSimpleValues] = useState<{
    flightDate: DateObject | null;
  }>({
    flightDate: null,
  });

  const [datepicker2Values, setDatepicker2Values] = useState<{
    FromReturnTime: DateObject | null;
    ToReturnTime: DateObject | null;
  }>({
    FromReturnTime: null,
    ToReturnTime: null,
  });

  const [isFa, setIsFa] = useState(true);
  const [isDisabledDomesticFlight, setIsDisabledDomesticFlight] = useState(true);
  const [minDateEndDate2Values, setMinDateEnd2Values] = useState<DateObject | Date>(new Date());

  const handleChangeRange = (value: string[]) => {
    setDates({ rangeData: value });
  };


  const handleChangeDatepicker2 = (name: string, value: DateObject) => {
    setDatepicker2Values((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisabled = () => setIsDisabledDomesticFlight(p => !p);

  const handleRoundTrip = () => {
    if (!isDisabledDomesticFlight) {
        setDatepicker2Values(p => (
        {
          ...p,
          ToReturnTime: null,
        }
    ))
    }
  }

  useEffect(() => {
    let startDate
    let endDate
    const localeKey = isFa ? "fa" : "en";
    
    const localeConfig = calendars[localeKey];
    
    Object.values(datepicker2Values).map((value, index) => {
      if (index === 0) {
        startDate = new DateObject({
          date: value as DateObject,
          format: 'YYYY/MM/DD',
          locale: localeConfig.locale
        })
      } else {
        endDate = new DateObject({
          date: value as DateObject,
          format: 'YYYY/MM/DD',
          locale: localeConfig.locale
        })
      }

    })
      if (startDate && endDate && startDate > endDate ) {
      
        const newDate = addSomeDays(startDate, 1);

        const adjusted = new DateObject({
          date: newDate,
          calendar: localeConfig.calendar,
          locale: localeConfig.locale,
        });
        setMinDateEnd2Values(adjusted);
        if (!isDisabledDomesticFlight) {          
          handleChangeDatepicker2(Object.keys(datepicker2Values)[1],adjusted);
        }
        return;
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datepicker2Values]);

  const acceptedBackendFormatted = (
    v: Record<string, DateObject | null>
  ) => {
    const fixDate = (d: DateObject) =>
      dateDisplayFormat({
        date: d,
        locale: "en",
      });

    return Object.values(v).map((item) =>
      item ? fixDate(item) : null
    );
  };



  return (
    <div className="flex flex-col gap-8 px-8 mt-8">
      {/* SIMPLE DATE PICKER */}
      <div className="flex flex-col gap-2 items-center justify-center">
      <TestOne wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
      <TestTow wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
      <TestThree wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>
      {/* TWO DATE PICKERS */}
      {/* <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex justify-center items-center gap-2">
          Two-Date Picker
          <Button className="p-2" onClick={() => {
            handleDisabled();
            handleRoundTrip()
          }}>
            {isDisabledDomesticFlight ? 'یک طرفه': 'دوطرفه'}
          </Button>
        </div>


        <div className="flex gap-2 items-center justify-center">
          <DatePicker2<DomesticFlightInputProps>
            name="FromReturnTime"
            value={datepicker2Values.FromReturnTime}
            onChange={handleChangeDatepicker2}
            isFa={isFa}
            setIsFa={setIsFa}
            minDate={new Date()}
            Input={DomesticFlightDatePickerInput}
            inputProps={{
              isEnd: false,
              isDisabled: false,
              label: 'تاریخ رفت'
            }}
          />

          <DatePicker2<DomesticFlightInputProps>
            name="ToReturnTime"
            value={datepicker2Values.ToReturnTime}
            onChange={handleChangeDatepicker2}
            isFa={isFa}
            setIsFa={setIsFa}
            minDate={minDateEndDate2Values}
            Input={DomesticFlightDatePickerInput}
            inputProps={{
              isEnd: true,
              isDisabled: isDisabledDomesticFlight,
              handleRoundTrip: handleRoundTrip,
              label: 'تاریخ برگشت'
            }}
          />
        </div>
      </div> */}

      {/* RANGE PICKER */}
      {/* <div className="flex flex-col gap-2 items-center justify-center">
        <div>Range Picker</div>

        <RangePicker2
          defaultValue={domesticHotelDefaultDates}
          onChange={handleChangeRange}
        />
      </div> */}
    </div>
  );
};

export default TestPage;