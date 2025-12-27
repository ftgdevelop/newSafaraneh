import { Bed, Bed2, Bed4, BedSpace, DoubleBeds, FloorSleepSets, MasterRooms, NormalRooms, SingleBed, SofaBeds } from "@/modules/shared/components/ui/icons";
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
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">مشخصات کلی</h2>
      <ul className="grid grid-cols-1 gap-4 text-sm text-gray-600">
        {spaces?.bedSpace > 0 && (
          <li className="flex items-center max-md:justify-between gap-4">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <BedSpace className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>فضای خواب</span> {spaces?.bedSpace} نفر
            </div>
          </li>
        )}
        {spaces?.singleBeds > 0 && (
          <li className="flex items-center max-md:justify-between gap-4">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <SingleBed className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>تخت‌های تک‌نفره</span> {spaces?.singleBeds} عدد
            </div>
          </li>
        )}

        {spaces?.doubleBeds > 0 && (
          <li className="flex items-center max-md:justify-between gap-4">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <DoubleBeds className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>تخت‌های دونفره</span> {spaces?.doubleBeds} عدد
            </div>
          </li>
        )}

        {spaces?.normalRooms > 0 && (
          <li className="flex items-center gap-4 max-md:justify-between">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <NormalRooms className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>اتاق‌های معمولی</span> {spaces?.normalRooms} عدد
            </div>
          </li>
        )}
        {spaces?.masterRooms > 0 && (
          <li className="flex items-center gap-4 max-md:justify-between">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <MasterRooms className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>اتاق‌ مستر</span> {spaces?.masterRooms} عدد
            </div>
          </li>
        )}
        {spaces?.sofaBeds > 0 && (
          <li className="flex items-center gap-4 max-md:justify-between">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <SofaBeds className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>مبل تخت خوابشو</span> {spaces?.sofaBeds} عدد
            </div>
          </li>
        )}
        {spaces?.floorSleepSets > 0 && (
          <li className="flex items-center gap-4 max-md:justify-between">
            <div className="bg-[#ece9f2]/70 rounded-full p-2 max-md:order-2">
              <FloorSleepSets className="w-8 h-8 sm:w-10 sm:h-10 inline-block ml-1 fill-current" />
            </div>
            <div className="flex items-center gap-2 max-md:order-1">
              <span>ست خواب روی زمین</span> {spaces?.floorSleepSets} عدد
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Spaces;