

import React from "react";
import TestOne from "@/modules/shared/components/test/test1";
import TestTow from "@/modules/shared/components/test/test2";
import TestThree from "@/modules/shared/components/test/test3";


const TestPage = () => {

  // ! use this useEffect for handling minDate for endDate
  // useEffect(() => {
  //   let startDate
  //   let endDate
  //   const localeKey = isFa ? "fa" : "en";
    
  //   const localeConfig = calendars[localeKey];
    
  //   Object.values(datepicker2Values).map((value, index) => {
  //     if (index === 0) {
  //       startDate = new DateObject({
  //         date: value as DateObject,
  //         format: 'YYYY/MM/DD',
  //         locale: localeConfig.locale
  //       })
  //     } else {
  //       endDate = new DateObject({
  //         date: value as DateObject,
  //         format: 'YYYY/MM/DD',
  //         locale: localeConfig.locale
  //       })
  //     }

  //   })
  //     if (startDate && endDate && startDate > endDate ) {
      
  //       const newDate = addSomeDays(startDate, 1);

  //       const adjusted = new DateObject({
  //         date: newDate,
  //         calendar: localeConfig.calendar,
  //         locale: localeConfig.locale,
  //       });
  //       setMinDateEnd2Values(adjusted);
  //       if (!isDisabledDomesticFlight) {          
  //         handleChangeDatepicker2(Object.keys(datepicker2Values)[1],adjusted);
  //       }
  //       return;
  //     }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [datepicker2Values]);

  return (
    <div className="flex flex-col gap-8 px-8 mt-8">

      <div className="flex flex-col gap-2 items-center justify-center">
      <TestOne wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
      <TestTow wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
      <TestThree wrapperClassName="bg-white p-4 w-full rounded-lg border border-neutral-200"/>
      </div>

    </div>
  );
};

export default TestPage;