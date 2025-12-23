import { ArrowLeft, LeftCaret, Location, RightCaret, Star } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type Category = {
    imageUrl: string;
    title: string;
    id: number;
    city?: string;
    url: string;
    reviewCount?: number;
    price?: number;
    rank?: number;
};

type Props = {
    title: string;
    categories: Category[];
    titleColor?: string;
    citySlug: string;
    loading?: boolean;
};

const AccommodationCategoryList: React.FC<Props> = ({ title, categories, titleColor, citySlug, loading }) => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    function formatDate(date: Date) {
      return date.toISOString().slice(0, 10);
    }

    const checkin = formatDate(today);
    const checkout = formatDate(tomorrow);

    const settings = {
        speed: 500,
        slidesToShow: 4.5,
        infinite: true,
        slidesToScroll: 1,
        nextArrow: <RightCaret />,
        prevArrow: <LeftCaret />,
        className: "accommodation-categorylist-slider",
        customPaging: function () {
            return (
                <a className='w-2 h-2 bg-neutral-200 inline-block rounded-full' />
            );
        },
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    // dots: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    const skeletonArray = Array.from({ length: 4 });

    return (
        <section className="max-w-container m-auto px-5 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10" >

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 h-10">
                    {/* <span className="block w-3 h-full bg-[#402594]  rounded-br-xl rounded-tl-xl"/> */}
                    <h2 className={`text-xl md:text-2xl text-center font-bold ${titleColor ? titleColor : "text-[#1d274b]"}`}>
                        {title}
                    </h2>
                    <Link
                        href={`/fa/accommodations/${citySlug}/checkin-${checkin}/checkout-${checkout}`}
                        className="flex items-center text-sm bg-[#ece9f2] hover:bg-[#ece9f2]/70 transition rounded-full p-1.5 font-semibold cursor-pointer mr-0"
                    >
                        <ArrowLeft className="size-4 text-[#1d274b]" />
                    </Link>
                </div>
            </div>

            <div className="-mx-2" dir="rtl">
                <Slider {...settings}>
                    {loading
                      ? skeletonArray.map((_, idx) => (
                          <div key={idx} className="p-2" dir="rtl">
                            <div className="animate-pulse bg-gray-200 h-40 w-full rounded-2xl mb-3" />
                            <div className="animate-pulse bg-gray-200 h-6 w-3/4 rounded mb-2" />
                            <div className="animate-pulse bg-gray-100 h-4 w-1/2 rounded" />
                          </div>
                        ))
                      : Array.isArray(categories) && categories.map(category => (
                          <div key={category.id}>
                              <Link
                                  href={`/fa/accommodation/${category.id}/checkin-${checkin}/checkout-${checkout}/capacity-1`}
                                  className="bg-white group relative block overflow-hidden"
                                  target="_blank"
                                  title={category.title}
                              >
                                  <div className="relative h-40 w-full">
                                      <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={category.imageUrl}
                                        alt={category.title}
                                        width={600}
                                        height={400}
                                        className="h-40 w-full object-cover rounded-2xl px-2 pt-2"
                                        priority
                                      />
                                  </div>
                                  <div className="p-3">
                                      <div className="flex items-center gap-2" dir="rtl">
                                        <div className="text-sm text-yellow-500 flex gap-1 items-center">
                                          <Star className="w-4 h-4 fill-amber-400" />
                                          <span className="text-xs">{category.rank || "?"}</span>
                                        </div>
                                        <span className="text-[11px] text-gray-500">
                                          ({category.reviewCount || 0} دیدگاه)
                                        </span>
                                      </div>
                                      <b className="font-bold mb-1 block text-md text-right h-14">{category.title}</b>
                                      <div className="flex items-center justify-end gap-1 my-2 ">
                                        <span className="text-xs leading-4 text-neutral-500">{category.city}</span>
                                        <Location className="size-4 fill-neutral-600" />
                                      </div>
                                      <div className="flex flex-col items-end gap-2">
                                        <div className="flex flex-row items-center gap-2" dir="rtl">
                                          <div className="text-xs font-bold text-red-600 whitespace-nowrap">
                                            {category.price ? `${category.price.toLocaleString()} ریال` : "-"}
                                          </div>
                                          <span className="text-[11px] text-gray-500">
                                            (شروع قیمت هر شب)
                                          </span>
                                        </div>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      ))}
                </Slider>
            </div>

        </section>
    )
}

export default AccommodationCategoryList;