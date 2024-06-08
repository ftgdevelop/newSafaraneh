import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Slider from "react-slick";

const TrendingDestinations: React.FC = () => {

    const cities: {
        imageUrl: string;
        url: string;
        name: string;
        description: string;
    }[] = [
            {
                imageUrl: "/images/home/theme2/trending/1.jpg",
                url: "/",
                name: "ونکوور",
                description: "بریتیش کلمبیا، کانادا"
            },
            {
                imageUrl: "/images/home/theme2/trending/2.jpg",
                url: "/",
                name: "کینگستون",
                description: "انتاریو، کانادا"
            },
            {
                imageUrl: "/images/home/theme2/trending/3.jpg",
                url: "/",
                name: "کوالالامپور",
                description: "قلمرو فدرال کوالالامپور، مالزی"
            },
            {
                imageUrl: "/images/home/theme2/trending/4.jpg",
                url: "/",
                name: "کمر",
                description: "منطقه آنتالیا، ترکیه"
            },
            {
                imageUrl: "/images/home/theme2/trending/5.jpg",
                url: "/",
                name: "میلان",
                description: "لمباردی، ایتالیا"
            },

        ];

    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <RightCaret />,
        prevArrow: <LeftCaret />,
        customPaging: function () {
            return (
                <a className='w-3.5 h-3.5 border-2 border-neutral-500 inline-block rounded-full' />
            );
        },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12" >
            <h2 className="font-semibold text-md md:text-2xl mb-4">
                جستجوی هتل در شهرهای پرطرفدار
            </h2>

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {cities.map(city => (
                        <div key={city.name} className='sm:px-2 rtl:rtl'>
                            <a
                                href={city.url}
                                className='rounded-2xl border border-neutral-200 bg-white relative block overflow-hidden'
                                target='_blank'
                                title={city.name}
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={city.imageUrl}
                                    alt={city.name}
                                    width={299}
                                    height={128}
                                    className='col-span-5 object-cover h-32 w-full'
                                />
                                <div className="p-3 text-sm">
                                    <b className='block font-semibold leading-5'> {city.name} </b>
                                    <p className="text-xs"> {city.description} </p>
                                </div>
                            </a>
                        </div>
                    ))}

                </Slider>
            </div>


        </section>
    )
}

export default TrendingDestinations;