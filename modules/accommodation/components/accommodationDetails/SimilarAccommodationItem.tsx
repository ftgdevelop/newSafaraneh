import Link from "next/link";
import Image from "next/image";

type SimilarAccommodationItemProps = {
  id: number | string;
  title: string;
  location?: { province?: string; city?: string } | null;
  coverPhoto?: { thumbnailAbsoluteUrl?: string } | null;
  pricing?: {
    boardPrice: number;
    salePrice: number;
    discountPercent: number;
    discountPrice: number;
  };
  rank?: number;
  reviews?: number;
  maxAccommodates?: number;
  checkin?: string;
  checkout?: string;
  capacity?: string | number;
};

function SimilarAccommodationItem({
  id,
  title,
  location,
  coverPhoto,
  pricing,
  checkin,
  checkout,
  capacity,
}: SimilarAccommodationItemProps) {
  const imageUrl = coverPhoto?.thumbnailAbsoluteUrl || "/placeholder.jpg";

  // Build the detail URL with checkin, checkout, and capacity
  const detailUrl =
    `/accommodation/${id}` +
    (checkin ? `/checkin-${checkin}` : "") +
    (checkout ? `/checkout-${checkout}` : "") +
    (capacity ? `/capacity-${capacity}` : "");

  return (
    <Link
      href={detailUrl}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      {/* Cover Photo */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover"
          priority={false}
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 truncate text-right">
          {title}
        </h3>
        <div className="text-xs leading-4 mb-2 text-neutral-500 text-right">
          {location?.province}، {location?.city}
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-start justify-end mt-2">
          <div className="flex flex-col items-end gap-1 mb-2">
            {pricing?.discountPrice && Math.abs(pricing?.discountPrice) > 0 ? (
              <>
                <span className="bg-green-700 text-white rounded-xl leading-7 text-xs px-1 py-0 select-none">
                  {pricing?.discountPercent}% تخفیف
                </span>
                <div className="flex flex-row items-end">
                  <div className="text-xs text-neutral-500 line-through whitespace-nowrap">
                    {pricing?.boardPrice?.toLocaleString("fa-IR")} ریال
                  </div>
                  <div className="text-xs font-bold text-green-600 whitespace-nowrap">
                    {pricing?.salePrice?.toLocaleString("fa-IR")} ریال
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs font-bold text-green-600 whitespace-nowrap">
                {pricing?.salePrice?.toLocaleString("fa-IR")} ریال
              </div>
            )}
          </div>
          <div className="text-xs text-neutral-500 leading-4">
            شروع قیمت برای 1 شب
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SimilarAccommodationItem;