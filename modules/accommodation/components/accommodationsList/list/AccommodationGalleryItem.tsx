import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";
import { useRouter } from "next/router";

type AccommodationGalleryItemProps = {
  id: number | string;
  title: string;
  location?: { province?: string; city?: string } | null;
  photos?: { thumbnailAbsoluteUrl?: string }[] | null;
  salePrice: number;
  boardPrice: number;
  discountPercent?: number;
  discountPrice?: number;
  checkin?: string;
  checkout?: string;
  capacity?: string | number;
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 right-2 z-10 bg-white/80 rounded-full p-1 shadow -translate-y-1/2"
      onClick={onClick}
      tabIndex={-1}
    >
      <ArrowRight className="w-4 h-4 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="absolute top-1/2 left-2 z-10 bg-white/80 rounded-full p-1 shadow -translate-y-1/2"
      onClick={onClick}
      tabIndex={-1}
    >
      <ArrowLeft className="w-4 h-4 text-gray-700" />
    </button>
  );
}

export default function AccommodationGalleryItem({
  id,
  title,
  location,
  photos,
  salePrice,
  boardPrice,
  discountPercent,
  discountPrice,
  checkin,
  checkout,
  capacity,
}: AccommodationGalleryItemProps) {
  const router = useRouter();
  const locale = router.locale || "fa";

  // Build the detail URL
  const detailUrl =
    `/${locale}/accommodation/${id}` +
    (checkin ? `/checkin-${checkin}` : "") +
    (checkout ? `/checkout-${checkout}` : "") +
    (capacity ? `/capacity-${capacity}` : "");

  const images = photos && photos.length > 0
    ? photos
    : [{ thumbnailAbsoluteUrl: "/placeholder.jpg" }];

  const sliderSettings = {
    dots: false,
    infinite: images.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: images.length > 1,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: Math.min(images.length, 4),
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  return (
    <Link
      href={detailUrl}
      className="bg-white rounded-2xl group relative block overflow-hidden border border-neutral-200"
      title={title}
    >
      <div className="relative">
        {/* Main Slider */}
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <div key={idx} className="h-40 w-full overflow-hidden">
              <Image
                onContextMenu={(e) => e.preventDefault()}
                src={img.thumbnailAbsoluteUrl || "/placeholder.jpg"}
                alt={title}
                width={600}
                height={400}
                className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105"
                priority={idx === 0}
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail Gallery */}
        <div className="mt-2">
          <Slider {...thumbnailSettings}>
            {images.map((img, idx) => (
              <div key={idx} className="h-16 w-16 p-1">
                <Image
                  src={img.thumbnailAbsoluteUrl || "/placeholder.jpg"}
                  alt={`Thumbnail ${idx}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="p-3">
        <b className="font-bold mb-1 block text-md">{title}</b>
        <span className="text-xs leading-4 mb-2 text-neutral-500">
          {location?.province}، {location?.city}
        </span>
        <div className="flex flex-col items-end justify-end mt-2">
          <div className="flex flex-col items-end gap-1 mb-2">
            {discountPrice && Math.abs(discountPrice) > 0 ? (
              <>
                <span className="bg-green-700 text-white rounded-xl leading-7 text-xs px-1 py-0 select-none">
                  {discountPercent}% تخفیف
                </span>
                <div className="flex flex-row items-end">
                  <div className="text-xs text-neutral-500 line-through whitespace-nowrap">
                    {boardPrice.toLocaleString("fa-IR")} ریال
                  </div>
                  <div className="text-xs font-bold text-green-600 whitespace-nowrap">
                    {salePrice.toLocaleString("fa-IR")} ریال
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs font-bold text-green-600 whitespace-nowrap">
                {salePrice.toLocaleString("fa-IR")} ریال
              </div>
            )}
          </div>
          <div className="text-xs text-neutral-500 leading-4">شروع قیمت برای 1 شب</div>
        </div>
      </div>
    </Link>
  );
}