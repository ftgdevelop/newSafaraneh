import { Location, Star } from "@/modules/shared/components/ui/icons";
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
};

function AccommodationName({ title, location, rank, reviews }: AccommodationNameProps) {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton loading placeholders
    return (
      <div className="animate-pulse space-y-4 pt-18">
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl pt-18">
      <div className="lg:col-span-2">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        {/* Location */}
        {location && (
          <div className="text-sm text-gray-500">
            <Location className="w-4 h-4 fill-current inline-block align-middle" /> {location.province || "نامشخص"}، {location.city || "نامشخص"}، {location.village || "نامشخص"}
          </div>
        )}

        {/* Rank and Reviews */}
        <div className="flex items-center gap-2 mt-2">
          {rank && (
            <span className="text-sm text-yellow-500">
              <Star className="w-4.5 h-4.5 fill-amber-400" /> {rank.toFixed(1)}
            </span>
          )}
          {reviews && (
            <span className="text-sm text-gray-500">
              ({reviews} نظر)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccommodationName;