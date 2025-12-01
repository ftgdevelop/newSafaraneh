import { Car, Walk } from "@/modules/shared/components/ui/icons";

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

  if (!records || records.length === 0) {
    return (
      <div className="py-16 border-b">
        <h3 className="text-lg font-bold text-gray-800 mb-4">فاصله‌ها</h3>
        <p className="text-sm text-gray-600">هیچ اطلاعاتی موجود نیست.</p>
      </div>
    );
  }

  return (
    <div className="py-16 border-b">
      <h3 className="text-lg font-bold text-gray-800 mb-4">فاصله‌ها</h3>
      <ul className="space-y-4">
        {records.map((record) => (
          <li key={record.uid} className="flex flex-col gap-1">
            <h4 className="text-md font-bold text-gray-700">{record.destination}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="text-sm text-gray-600">
                    <Car className="inline w-6 h-6 ml-2 fill-gray-600" />
                    <span>با ماشین {record.drivingTime} دقیقه</span>
                </div>
                <div className="text-sm text-gray-600">
                    <Walk className="inline w-6 h-6 ml-2 fill-gray-600" />
                    <span>پیاده {record.walkingTime} دقیقه</span>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Distances;