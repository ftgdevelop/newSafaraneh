import { dateDisplayFormat } from "../../helpers";
import { ArrowLeft } from "./icons";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function CustomHeaderPlugin({ values, isFa, position }: { values?: any, isFa: Boolean , position: 'top' | 'bottom'}) {

  const startValue = values?.[0] && dateDisplayFormat({
    date: values?.[0],
    format: "YYYY/MM/DD",
    locale: isFa ? "fa" : 'en'
  })
    
  const endValue = values?.[1] && dateDisplayFormat({
    date: values?.[1],
    format: "YYYY/MM/DD",
    locale: isFa ? "fa" : 'en'
  })  
  
  return <header className="mobi-date-picker-header max-md:hidden px-5 py-3 border-b border-neutral-300 flex max-md:justify-center justify-end items-center gap-5 text-sm h-12">

        <div
          className={`font-semibold text-sm border-b-2 border-transparent ${
            values && values[0] && !values[1] ? "border-blue-600" : ""
          }`}
        >
          {endValue ? endValue :" تاریخ خروج"}
        </div>
        <ArrowLeft className="w-6 h-6 fill-current" />
        <div
          className={`font-semibold text-sm border-b-2 border-transparent ${
            values && values[0] && !values[1] ? "border-blue-600" : ""
          }`}
        >
          {startValue ? startValue: 'تاریخ ورود'}
          
        </div>

      </header>
}