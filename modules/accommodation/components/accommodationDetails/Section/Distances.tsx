import { Car, Walk } from "@/modules/shared/components/ui/icons";
import { useState, useEffect } from "react";

type DistanceRecord = {
  uid: string;
  destination: string;
  drivingTime: number;
  walkingTime: number;
};

type DistancesProps = {
  distances: {
    records: DistanceRecord[];
  };
};

function Distances({ distances }: DistancesProps) {
  const { records } = distances;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-16 border-b">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <ul className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="py-16 border-b">
        <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">فاصله‌ها</h2>
        <p className="text-sm text-gray-600">هیچ اطلاعاتی موجود نیست.</p>
      </div>
    );
  }

  return (
    <div className="py-16 border-b">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">فاصله‌ها</h2>
      <ul className="space-y-8">
        {records.map((record) => (
          <li key={record.uid} className="flex flex-col gap-1">
            <h4 className="text-md font-bold text-gray-700">{record.destination}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
              <div className="text-sm text-gray-600 flex flex-row items-center justify-between w-full p-1 md:p-2 rounded-xl bg-gray-50 border border-gray-100">
                <span>با ماشین {record.drivingTime} دقیقه</span>
                <Car className="inline w-8 h-8 ml-2 fill-gray-600" />
              </div>
              <div className="text-sm text-gray-600 flex flex-row items-center justify-between w-full p-1 md:p-2 rounded-xl bg-gray-50 border border-gray-100">
                <span>پیاده {record.walkingTime} دقیقه</span>
                <Walk className="inline w-8 h-8 ml-2 fill-gray-600" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Distances;