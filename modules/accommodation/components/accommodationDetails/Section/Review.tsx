import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ServerAddress, Accommodation } from "@/enum/url";
import { ArrowLeft, ArrowRight, LeftCaret, RightCaret, User2 } from "@/modules/shared/components/ui/icons";

const COMMENT_MAX_LENGTH = 180;

function formatJalaliDate(jalaliDate: string): string {
  if (!jalaliDate) return "";
  const [year, month, day] = jalaliDate.split("-");
  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  const monthName = monthNames[parseInt(month, 10) - 1] || "";
  return `${parseInt(day, 10)} ${monthName} ${year}`;
}

function Review({ id }: { id: number }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

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
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            } as HeadersInit,
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

  const toggleExpand = (idx: number) => {
    setExpandedIndexes(prev =>
      prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

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
    nextArrow: <RightCaret />,
    prevArrow: <LeftCaret />,
    className: "accommodation-categorylist-slider",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 border-b">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">نظرات کاربران</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : reviews.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            تعداد کل نظرات: {totalRows} نظر
          </p>
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => {
              const isLong = review.comment && review.comment.length > COMMENT_MAX_LENGTH;
              const shortComment = isLong ? review.comment.slice(0, COMMENT_MAX_LENGTH) + "..." : review.comment;
              const expanded = expandedIndexes.includes(index);

              return (
                <div className="px-2" key={index}>
                  <div className="p-6 flex flex-col text-right bg-gray-50 border border-gray-100 rounded-xl min-h-[320px]">
                    <div className="flex items-center mb-2 gap-4" dir="rtl">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                        <User2 className="w-8 h-8 text-gray-400 inline-block" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800">
                          {review.user?.name || "کاربر ناشناس"}
                        </div>
                        <div className="text-xs text-gray-500" dir="rtl">
                          {formatJalaliDate(review.createdAt)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2" dir="rtl">
                      {expanded || !isLong ? review.comment : shortComment}
                    </p>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-1 text-blue-500 text-xs mt-1 focus:outline-none justify-end mb-4"
                      >
                        {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
                      </button>
                    )}
                    <div className="flex flex-wrap justify-end gap-2 mt-2 text-xs text-gray-600">
                      {review.cleanliness && <span className="bg-white px-2 rounded-full border border-gray-100 text-gray-500">نظافت: <b>{review.cleanliness || ""}</b></span>}
                      {review.accuracy && <span className="bg-white px-2 rounded-full border border-gray-100 text-gray-500">دقت: <b>{review.accuracy || ""}</b></span>}
                      {review.quality && <span className="bg-white px-2 rounded-full border border-gray-100 text-gray-500">کیفیت: <b>{review.quality || ""}</b></span>}
                      {review.location && <span className="bg-white px-2 rounded-full border border-gray-100 text-gray-500">موقعیت: <b>{review.location || " "}</b></span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </>
      ) : (
        <p className="text-red-500">هیچ نظری یافت نشد.</p>
      )}
    </div>
  );
}

export default Review;