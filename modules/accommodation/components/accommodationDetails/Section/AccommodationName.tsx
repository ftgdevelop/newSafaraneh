import { Location, Star } from "@/modules/shared/components/ui/icons";
import Rating from "@/modules/shared/components/ui/Rating";

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl">
      <div className="lg:col-span-2 pt-8">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        {/* Location */}
        {location && (
          <div className="text-sm text-gray-500">
            <Location className="w-4 h-4 fill-current inline-block align-middle" /> {location.province || "نامشخص"}، {location.city || "نامشخص"}، {location.village || "نامشخص"}
          </div>
        )}

        {/* 

        <HotelScore
            reviews={120}
            score={8.7}
            className="text-md lg:text-lg font-semibold"
            max={10}
        />
         */}

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
  )
}

export default AccommodationName;