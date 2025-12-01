type RatesProps = {
  rates: {
    cleanliness: number;
    value: number;
    accuracy: number;
    accessibility: number;
    host: number;
    rank: number;
  };
};

function Rates({ rates }: RatesProps) {
  const ratesList = [
    { label: "نظافت", value: rates.cleanliness },
    { label: "ارزش", value: rates.value },
    { label: "دقت", value: rates.accuracy },
    { label: "دسترسی", value: rates.accessibility },
    { label: "میزبان", value: rates.host },
    { label: "رتبه کلی", value: rates.rank },
  ];

  return (
    <div className="pt-16">
      <h3 className="text-lg font-bold text-gray-800 mb-4">امتیازات</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {ratesList.map((rate, index) => (
          <li key={index} className="flex flex-col items-center bg-gray-50 p-3 m-1 rounded-xl">
            <span className="text-sm text-gray-600">{rate.label}</span>
            <span className="text-sm font-bold text-gray-800">{rate.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rates;