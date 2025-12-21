import Link from "next/link";
import Image from "next/image";
import { Location, Star } from "@/modules/shared/components/ui/icons";

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
  rank,
  reviews,
}: SimilarAccommodationItemProps) {
  const imageUrl = coverPhoto?.thumbnailAbsoluteUrl || "/placeholder.jpg";

  const detailUrl =
    `/accommodation/${id}` +
    (checkin ? `/checkin-${checkin}` : "") +
    (checkout ? `/checkout-${checkout}` : "") +
    (capacity ? `/capacity-${capacity}` : "");

  return (
    <Link
      href={detailUrl}
      className="bg-white rounded-2xl group relative block overflow-hidden border border-neutral-200"
      dir="rtl"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="h-40 w-full object-cover rounded-2xl px-2 pt-2"
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
            {rank ? (
              <div className="text-sm text-yellow-500 flex gap-1 items-center">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs">{rank.toFixed(1)}</span>
              </div>
            ) : null}
            {reviews ? (
              <span className="text-[11px] text-gray-500">
                ({reviews} دیدگاه)
              </span>
            ) : null}
          </div>
        <h3 className="font-bold mb-1 block text-sm line-clamp-1 min-h-14">
          {title}
        </h3>
        <div className="flex items-center gap-1 my-2">
          <Location className="size-4 fill-neutral-600" />
          <span className="text-xs leading-4 text-neutral-500">
            {location?.province}، {location?.city}
          </span>
        </div>

        {/* <div className="flex flex-col items-start justify-end mt-2">
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
        </div> */}

        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            {pricing?.discountPrice && Math.abs(pricing?.discountPrice) > 0 ? (
              <div className="flex flex-col gap-2">
                {/* <div className="flex flex-row items-end gap-2">
                  <span className="bg-green-700 text-white rounded-xl leading-7 text-xs px-1 py-0 select-none inline-block"> {pricing?.discountPercent}% </span>
                  <div className="text-xs text-neutral-500 line-through whitespace-nowrap">
                    {pricing?.salePrice.toLocaleString("fa-IR")} ریال
                  </div>
                </div> */}
                <div className="flex flex-row items-center gap-2">
                  {/* <div className="text-xs text-neutral-500 leading-4"></div> */}
                  <div className="text-xs font-bold text-red-600 whitespace-nowrap">
                    {pricing?.boardPrice.toLocaleString("fa-IR")} ریال
                  </div>
                  <span className="text-[11px] text-gray-500">
                    (شروع قیمت هر شب)
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
                {/* <div className="text-xs text-neutral-500 leading-4">شروع قیمت هر شب از</div> */}
                <div className="text-xs font-bold text-red-600 whitespace-nowrap">
                  {pricing?.salePrice.toLocaleString("fa-IR")} ریال
                </div>
                <span className="text-[11px] text-gray-500">
                    (شروع قیمت هر شب)
                </span>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </Link>
  );
}

export default SimilarAccommodationItem;