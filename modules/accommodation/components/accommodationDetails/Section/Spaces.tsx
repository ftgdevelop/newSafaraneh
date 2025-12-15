import { useState, useEffect } from "react";

type SpacesProps = {
  spaces: {
    bedSpace: number;
    singleBeds: number;
    doubleBeds: number;
    normalRooms: number;
    masterRooms: number;
    sofaBeds: number;
    floorSleepSets: number;
  };
};

function Spaces({ spaces }: SpacesProps) {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton loading placeholders
    return (
      <div className="py-16 border-b">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <ul className="grid grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="py-16 border-b">
      <h3 className="text-lg font-bold text-gray-800 mb-4">مشخصات کلی</h3>
      <ul className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        {spaces.bedSpace > 0 && (
          <li>
            <span className="font-bold">فضای خواب:</span> {spaces.bedSpace} نفر
          </li>
        )}
        {spaces.singleBeds > 0 && (
          <li>
            <span className="font-bold">تخت‌های تک‌نفره:</span> {spaces.singleBeds}
          </li>
        )}
        {spaces.doubleBeds > 0 && (
          <li>
            <span className="font-bold">تخت‌های دونفره:</span> {spaces.doubleBeds}
          </li>
        )}
        {spaces.normalRooms > 0 && (
          <li>
            <span className="font-bold">اتاق‌های معمولی:</span> {spaces.normalRooms}
          </li>
        )}
        {spaces.masterRooms > 0 && (
          <li>
            <span className="font-bold">اتاق‌های مستر:</span> {spaces.masterRooms}
          </li>
        )}
        {spaces.sofaBeds > 0 && (
          <li>
            <span className="font-bold">تخت‌های مبل:</span> {spaces.sofaBeds}
          </li>
        )}
        {spaces.floorSleepSets > 0 && (
          <li>
            <span className="font-bold">ست خواب روی زمین:</span> {spaces.floorSleepSets}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Spaces;