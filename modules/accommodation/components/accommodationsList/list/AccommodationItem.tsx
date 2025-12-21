import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { Bed3, Instant, LeftCaret, Location, RightCaret, Star, TimeSand, User3 } from "@/modules/shared/components/ui/icons";
import { useRouter } from "next/router";

type AccommodationItemProps = {
  title: string;
  location?: { province?: string; city?: string, village?: string } | null;
  photos?: { thumbnailAbsoluteUrl?: string }[] | null;
  salePrice: number;
  boardPrice: number;
  discountPercent?: number;
  discountPrice?: number;
  checkin?: string;
  checkout?: string;
  capacity?: string | number;
  reviews?: number;
  rank?: number;
  rooms: number;
  totalBeds: number;
  maxAccommodates: number;
  badges: string[];
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 right-3 z-10 bg-white/80 rounded-full p-1 shadow -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity"
      onClick={onClick}
      tabIndex={-1}
    >
      <RightCaret className="w-4 h-4 group-hover:w-4.5 group-hover:h-4.5 transition-all duration-100 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-3 z-10 bg-white/80 rounded-full p-1 shadow -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity"
      onClick={onClick}
      tabIndex={-1}
    >
      <LeftCaret className="w-4 h-4 group-hover:w-4.5 group-hover:h-4.5 transition-all duration-100 text-gray-700" />
    </button>
  );
}

export default function AccommodationItem({
  title,
  location,
  photos,
  salePrice,
  boardPrice,
  discountPercent,
  discountPrice,
  id,
  checkin,
  checkout,
  capacity,
  rooms,
  reviews,
  rank,
  totalBeds,
  maxAccommodates,
  badges
}: AccommodationItemProps & { id: number | string }) {
  const router = useRouter();
  const locale = router.locale || "fa";

  const detailUrl =
    `/${locale}/accommodation/${id}` +
    (checkin ? `/checkin-${checkin}` : "") +
    (checkout ? `/checkout-${checkout}` : "") +
    (capacity ? `/capacity-${capacity}` : "");

  const images = photos && photos.length > 0
    ? photos
    : [{ thumbnailAbsoluteUrl: undefined }];

  const sliderSettings = {
    infinite: images.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: images.length > 1,
    rtl: true,
  };

  return (
    <Link
      href={detailUrl}
      className="bg-white rounded-2xl group relative block overflow-hidden border border-neutral-200"
      title={title}
    >
      <div className="relative h-40 w-full">
        <Slider {...sliderSettings}>
          {images.map((img, idx) =>
            img.thumbnailAbsoluteUrl ? (
              <div
                key={idx}
                className="h-40 w-full overflow-hidden"
              >
                <Image
                  onContextMenu={(e) => e.preventDefault()}
                  src={img.thumbnailAbsoluteUrl}
                  alt={title}
                  width={600}
                  height={400}
                  className="h-40 w-full object-cover rounded-2xl px-2 pt-2"
                  priority={idx === 0}
                />
              </div>
            ) : (
              <div
                key={idx}
                className="h-40 w-full flex items-center justify-center bg-gray-200 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7M3 7l9 6 9-6M3 7l9 6 9-6M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7"
                  />
                </svg>
              </div>
            )
          )}
        </Slider>
      </div>

      <div className="p-3">
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
        <b className="font-bold mb-1 block text-md">{title}</b>
        <div className="flex items-center gap-1 my-2">
          <Location className="size-4 fill-neutral-600" />
          <span className="text-xs leading-4 text-neutral-500">{location?.province}، {location?.city}، {location?.village}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            {discountPrice && Math.abs(discountPrice) > 0 ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-end gap-2">
                  <span className="bg-green-700 text-white rounded-xl leading-7 text-xs px-1 py-0 select-none inline-block"> {discountPercent}% </span>
                  <div className="text-xs text-neutral-500 line-through whitespace-nowrap">
                    {salePrice.toLocaleString("fa-IR")} ریال
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {/* <div className="text-xs text-neutral-500 leading-4"></div> */}
                  <div className="text-xs font-bold text-red-600 whitespace-nowrap">
                    {boardPrice.toLocaleString("fa-IR")} ریال
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
                  {salePrice.toLocaleString("fa-IR")} ریال
                </div>
                <span className="text-[11px] text-gray-500">
                    (شروع قیمت هر شب)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="leading-6 text-2xs select-none flex gap-1 mt-2 grid grid-cols-5">
          {rooms > 0 ? (
            <div className="flex flex-row items-center gap-1 bg-neutral-50 text-neutral-700 px-1 md:px-2 py-1 rounded-md">
              {/* <Village className="w-3.5 h-3.5 inline-block" /> */}
              <span>{rooms > 0 ? `${rooms} اتاق` : null}</span>
            </div>
          ) : null}

          {totalBeds > 0 ? (
            <div className="flex flex-row items-center gap-1 bg-neutral-50 text-neutral-700 px-1 md:px-2 py-1 rounded-md col-span-2">
              <Bed3 className="h-4 md:w-5 h-4 md:h-5 inline-block" />
              <span>{totalBeds > 0 ? `${totalBeds} جای خواب` : null}</span>
            </div>
          ) : null}

          {maxAccommodates > 0 ? (
            <div className="flex flex-row items-center gap-1 bg-neutral-50 text-neutral-700 px-1 md:px-2 py-1 rounded-md col-span-2">
              <User3 className="h-4 md:w-5 h-4 md:h-5 inline-block" />
              <span>{maxAccommodates > 0 ? `تا ${maxAccommodates} مهمان` : null}</span>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-1">
          {badges.includes("is_instant") && (
            <span className="rounded-lg px-2 text-2xs bg-[#412691]/5 select-none mt-2 text-center">
              <Instant className="w-4 h-4 inline-block ml-1 fill-[#412691]" />
              <span className="text-[#412691]">رزرو آنی و قطعی</span>
            </span>
          )}
          {badges.includes("is_prime") && (
            <span className="rounded-lg px-2 text-2xs bg-[#412691]/5 select-none mt-2 text-center">
              {/* <TimeSand className="w-4 h-4 inline-block ml-1 fill-[#412691]" /> */}
              <span className="text-[#412691]">رزرو اولویت دار</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
