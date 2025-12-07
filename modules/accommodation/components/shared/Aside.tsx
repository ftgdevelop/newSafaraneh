function AccommodationAside({ }) {
  return (
    <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-3 gap-4 items-start">
            Accommodation Details
        </div>
        <hr className="pt-4" />
        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">شروع قیمت از</span>
            <span className="text-md font-bold">
                2,990,000 تومان / هر شب
            </span>
        </div>
        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">کارمزد خدمات پلتفرم</span>
            <span className="text-md font-bold">
                ۲۹.۰۰۰ تومان
            </span>
        </div>

        <hr className="pt-4 border-dashed" />

        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500 font-bold">جمع مبلغ قابل پرداخت</span>
            <span className="text-lg font-bold">
                2,990,000 تومان
            </span>
        </div>
    </div>
  );
}

export default AccommodationAside;