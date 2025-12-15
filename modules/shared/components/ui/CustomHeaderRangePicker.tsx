import { normalizeToDateObject } from "../../helpers";
import { ArrowLeft } from "./icons";

export default function CustomHeaderPlugin({
  values,
  isFa,
  position,
}: {
  values?: string[];
  isFa: boolean;
  position: "top" | "bottom";
}) {
  const formatValue = (value?: string) => {
    if (!value) return null;
    return normalizeToDateObject(value, { localeKey: isFa ? "fa" : "en" })?.format("YYYY/MM/DD");
  };

  const startValue = formatValue(values?.[0]);
  const endValue = formatValue(values?.[1]);


  
  return (
    <header className="mobi-date-picker-header max-md:hidden px-5 py-3 border-b border-neutral-300 flex max-md:justify-center justify-end items-center gap-5 text-sm h-12">
      <div
        className={`font-semibold text-sm border-b-2 border-transparent ${
          values && values[0] && !values[1] ? "border-blue-600" : ""
        }`}
      >
        {endValue || "تاریخ خروج"}
      </div>

      <ArrowLeft className="w-6 h-6 fill-current" />

      <div
        className={`font-semibold text-sm border-b-2 border-transparent ${
          values && values[0] && !values[1] ? "border-blue-600" : ""
        }`}
      >
        {startValue || "تاریخ ورود"}
      </div>
    </header>
  );
}