import { Accessibility, Accuracy, Cleanliness, Gewel, Host, Star } from "@/modules/shared/components/ui/icons";

type RatesProps = {
  rates: {
    cleanliness?: number;
    value?: number;
    accuracy?: number;
    accessibility?: number;
    host?: number;
    rank?: number;
  };
};

function Rates({ rates }: RatesProps) {
  const ratesList = [
    { label: "نظافت", value: rates?.cleanliness, icon: <Cleanliness className="w-12 h-12 mb-2 text-blue-500" /> },
    { label: "ارزش", value: rates?.value, icon: <Gewel className="w-12 h-12 mb-2 text-blue-500" /> },
    { label: "دقت", value: rates?.accuracy, icon: <Accuracy className="w-12 h-12 mb-2 text-blue-500" /> },
    { label: "دسترسی", value: rates?.accessibility, icon: <Accessibility className="w-12 h-12 mb-2 text-blue-500" /> },
    { label: "میزبان", value: rates?.host, icon: <Host className="w-12 h-12 mb-2 text-blue-500" /> },
    { label: "رتبه کلی", value: rates?.rank, icon: <Star className="w-12 h-12 mb-2 fill-amber-400" /> },
  ];

  return (
    <div className="pt-16">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">امتیازات</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        {ratesList.map((rate, index) => {
          const isRank = rate.label === "رتبه کلی";
          return (
            <li
              key={index}
              className={`flex flex-row justify-between items-center p-3 rounded-xl border ${
                isRank ? "bg-amber-50 border-amber-300" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex flex-col justify-between w-full">
                <span className={`text-sm ${isRank ? "text-amber-500" : "text-gray-600"}`}>{rate.label}</span>
                <span className={`text-md font-bold ${isRank ? "text-amber-500" : "text-gray-800"}`}>
                  {rate?.value?.toFixed(2)}
                </span>
              </div>
              {rate.icon}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Rates;