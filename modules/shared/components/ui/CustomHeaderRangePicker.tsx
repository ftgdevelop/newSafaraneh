import { ArrowLeft } from "./icons";

export default function CustomHeaderPlugin({ values, isFa, position }: { values?: any, isFa: Boolean , position: 'top' | 'bottom'}) {

  const startValue = values?.[0] && values?.[0].format(isFa ? "YYYY/MM/DD" : "MM/DD/YYYY" )
  const endValue = values?.[1] && values?.[1].format(isFa ? "YYYY/MM/DD" : "MM/DD/YYYY")
  
  return <header className="mobi-date-picker-header px-5 py-3 border-b border-neutral-300 flex max-md:justify-center justify-end items-center gap-5 text-sm h-12">

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