import { Instant, Location, Star } from "@/modules/shared/components/ui/icons";
import Rating from "@/modules/shared/components/ui/Rating";
import { useState, useEffect } from "react";

type AccommodationNameProps = {
  title: string;
  location?: {
    province?: string;
    city?: string;
    village?: string;
  };
  rank?: number;
  reviews?: number;
  isInstant?: boolean;
};

function AccommodationName({ title, location, rank, reviews, isInstant }: AccommodationNameProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 pt-18">
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl pt-8">
      <div className="lg:col-span-3">
        <div className="flex flex-col md:flex-row items-start md:justify-between w-full gap-2 md:gap-3 mb-2">
          <h2 className="text-xl sm:text-3xl xl:text-4xl font-bold text-gray-800 mb-2">{title}</h2>

          {isInstant && (
            <div className="rounded-lg px-2 bg-[#412691]/5 select-none text-center inline-block mb-2 md:mb-4">
              <Instant className="w-4 sm:w-5 h-4 sm:h-5 inline-block ml-1 fill-[#412691]" />
              <span className="text-[#412691] text-sm">رزرو آنی و قطعی</span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4">
          <div className="flex items-center gap-2">
            {rank && (
              <div className="text-sm text-yellow-500 flex gap-1 items-center">
                <Star className="w-4 h-4 fill-amber-400 mb-1" />
                <span className="text-sm sm:text-md font-semibold">{rank.toFixed(1)}</span>
              </div>
            )}
            {reviews && (
              <span className="text-xs sm:text-sm text-gray-500">
                ({reviews} نظر)
              </span>
            )}
          </div>
          {location && (
            <div className="text-xs sm:text-sm text-gray-500">
              <Location className="w-4 h-4 fill-current inline-block align-middle" /> {location.province || "نامشخص"}، {location.city || "نامشخص"}، {location.village || "نامشخص"}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AccommodationName;