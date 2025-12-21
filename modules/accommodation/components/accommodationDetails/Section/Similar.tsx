import { useEffect, useState } from "react";
import Slider from "react-slick";
import SimilarAccommodationItem from "./SimilarAccommodationItem";
import { ServerAddress, Accommodation } from "@/enum/url";
import { ArrowLeft, ArrowRight, LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";

type SimilarProps = {
  id: number;
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

function Similar({ id, checkin, checkout, capacity }: SimilarProps) {
  const [similarItems, setSimilarItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchSimilarAccommodations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Similer}`,
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            } as HeadersInit,
            body: JSON.stringify({
              id,
              checkin,
              checkout,
              capacity,
            }),
          }
        );

        const data = await response.json();
        setSimilarItems(data.result.similers || []);
      } catch (error) {
        console.error("Error fetching similar accommodations:", error);
        setSimilarItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarAccommodations();
  }, [id, checkin, checkout, capacity]);

  const sliderSettings = {
    infinite: similarItems.length > 4,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "accommodation-categorylist-slider",
    customPaging: function () {
          return (
              <a className='w-2 h-2 bg-neutral-200 inline-block rounded-full' />
          );
      },
    dots: true,
    nextArrow: <RightCaret />,
    prevArrow: <LeftCaret />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-8 md:py-16">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">اقامتگاه‌های مشابه</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : similarItems.length > 0 ? (
        <Slider {...sliderSettings}>
          {similarItems.map((item: any) => (
            <div key={item.id} className="p-1">
              <SimilarAccommodationItem
                id={item.id}
                title={item.title || "بدون عنوان"}
                rank={item.rank}
                reviews={item.reviews}
                location={item.location}
                coverPhoto={item.coverPhoto}
                pricing={item.pricing?.priceWithDiscount || item.pricing?.price}
                checkin={checkin}
                checkout={checkout}
                capacity={capacity}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-red-500">هیچ اقامتگاه مشابهی یافت نشد.</p>
      )}
    </div>
  );
}

export default Similar;