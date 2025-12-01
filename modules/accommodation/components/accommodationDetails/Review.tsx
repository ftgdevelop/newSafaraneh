import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ServerAddress, Accommodation } from "@/enum/url";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";

function Review({ id }: { id: number }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Review}`,
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              tenantId: id.toString(),
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              perPage: 5,
              page: 1,
            }),
          }
        );

        const data = await response.json();
        const filteredReviews = (data.result.reviews || []).filter(
          (review: any) => review.comment && review.comment.trim() !== ""
        );
        setReviews(filteredReviews);
        setTotalRows(data.result.totalRows || 0);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const NextArrow = (props: any) => {
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
  };

  const PrevArrow = (props: any) => {
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
  };

  const sliderSettings = {
    dots: false,
    infinite: reviews.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1, // Show 1 item per slide
        },
      },
    ],
  };

  return (
    <div className="py-16 border-b">
      <h2 className="font-bold text-lg mb-4">نظرات کاربران</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : reviews.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            تعداد کل نظرات: {totalRows} نظر
          </p>
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div className="px-2" key={index}>
                <div className="p-10 flex flex-col text-right border rounded-xl bg-white">
                  <p className="text-sm font-bold text-gray-800">
                    {review.user?.name || "کاربر ناشناس"}
                  </p>
                  <p className="text-xs text-gray-500">
                    تاریخ: {review.createdAt || "نامشخص"}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {review.comment}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                    <span>نظافت: {review.cleanliness || "-"}</span>
                    <span>دقت: {review.accuracy || "-"}</span>
                    <span>کیفیت: {review.quality || "-"}</span>
                    <span>موقعیت: {review.location || "-"}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <p className="text-red-500">هیچ نظری یافت نشد.</p>
      )}
    </div>
  );
}

export default Review;