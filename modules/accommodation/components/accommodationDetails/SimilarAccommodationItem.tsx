import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";

type SimilarAccommodationItemProps = {
  id: number | string;
  title: string;
  location?: { province?: string; city?: string } | null;
  photos?: { thumbnailAbsoluteUrl?: string }[] | null;
  salePrice?: number;
  boardPrice?: number;
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
    >
      <ArrowLeft className="w-4 h-4 text-gray-700" />
    </button>
  );
}

function SimilarAccommodationItem({
  id,
  title,
  location,
  photos,
  salePrice,
  boardPrice,
  discountPercent,
}: SimilarAccommodationItemProps) {
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

  return (
    <Link
      href={`/accommodation/${id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      {/* Image Gallery Section */}
      <div className="relative">
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <div key={idx} className="h-40 w-full overflow-hidden rounded-t-lg">
              <Image
                src={img.thumbnailAbsoluteUrl || "/placeholder.jpg"}
                alt={title}
                width={600}
                height={400}
                className="h-full w-full object-cover hover:scale-105 transition-transform"
                priority={idx === 0}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 truncate">{title}</h3>

        {/* Location */}
        <p className="text-xs text-gray-500">
          {location?.province || "نامشخص"}، {location?.city || "نامشخص"}
        </p>

        {/* Pricing */}
        <div className="mt-2">
          {discountPercent && discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              {/* Original Price */}
              <span className="text-xs text-gray-500 line-through">
                {boardPrice?.toLocaleString("fa-IR") || "0"} ریال
              </span>
              {/* Sale Price */}
              <span className="text-sm font-bold text-green-600">
                {salePrice?.toLocaleString("fa-IR") || "0"} ریال
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-gray-800">
              {boardPrice?.toLocaleString("fa-IR") || "0"} ریال
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default SimilarAccommodationItem;