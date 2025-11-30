import { useEffect, useState } from "react";
import Slider from "react-slick";
import SimilarAccommodationItem from "./SimilarAccommodationItem";
import { ServerAddress, Accommodation } from "@/enum/url";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";

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
              tenantId: "7",
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
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
  }, [id]);

  const sliderSettings = {
    dots: false,
    infinite: similarItems.length > 4,
    speed: 500,
    slidesToShow: 4, // Default for desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-lg font-bold mb-4">اقامتگاه‌های مشابه</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : similarItems.length > 0 ? (
        <Slider {...sliderSettings}>
          {similarItems.map((item: any) => (
            <div key={item.id} className="px-2">
              <SimilarAccommodationItem
                id={item.id}
                title={item.title || "بدون عنوان"}
                location={item.location || { province: "نامشخص", city: "نامشخص" }}
                photos={item.with?.photos || []}
                salePrice={item.salePrice || 0}
                boardPrice={item.boardPrice || 0}
                discountPercent={item.discountPercent || 0}
                discountPrice={item.discountPrice}
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