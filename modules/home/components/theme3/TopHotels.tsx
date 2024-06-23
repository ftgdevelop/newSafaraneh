import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const TopHotels: React.FC = () => {

    const { t:tHome } = useTranslation('home');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
        alt: string;
        city: string;
    }[] = [
            {
                url: "hotel/هتل-پارسیان-آزادی-تهران",
                imageUrl: "/images/home/theme3/hotels/azadi.jpg",
                name: tHome('azadi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل آزادی تهران",
                city: "تهران"
            },
            {
                url: "hotel/هتل-پارس-شیراز",
                imageUrl: "/images/home/theme3/hotels/pars.jpg",
                name: tHome('pars-hotel-name'),
                rating: 5,
                alt: "رزرو هتل پارس شیراز",
                city:"شیراز"
            },
            {
                url: "hotel/هتل-داد-یزد",
                imageUrl: "/images/home/theme3/hotels/dad.jpg",
                name: tHome('dad-hotel-name'),
                rating: 4,
                alt: "رزرو هتل داد یزد",
                city: "یزد"
            },
            {
                url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                imageUrl: "/images/home/theme3/hotels/kosar.jpg",
                name: tHome('kosar-hotel-name'),
                rating: 5,
                alt: "رزرو هتل کوثر اصفهان",
                city: "اصفهان"
            },
            {
                url: "hotel/هتل-پارسیان-استقلال-تهران",
                imageUrl: "/images/home/theme3/hotels/esteghlal.jpg",
                name: tHome('esteghlal-hotel-name'),
                rating: 5,
                alt: "رزرو هتل استقلال تهران",
                city: "تهران"
            },
            {
                url: "hotel/هتل-میراژ-کیش",
                imageUrl: "/images/home/theme3/hotels/mirazh.png",
                name: tHome('miraj-hotel-name'),
                rating: 5,
                alt: "رزرو هتل میراژ کیش",
                city: "کیش"
            }

        ]

    const settings = {
        speed: 500,
        slidesToShow: 4,
        infinite: false,
        slidesToScroll: 1,
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
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
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

    return (
        <section className="max-w-container m-auto px-3 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10" >
            
            <h2 className="font-semibold text-md md:text-2xl mb-2">
                هتل های برتر
            </h2>
            <p className="mb-8"> هتل های محبوب را در مقاصد برتر بررسی کنید </p>

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {hotels.map(hotel => {

                        let url = hotel.url;

                        if (process.env.LocaleInUrl === "off") {
                            url = url.replace("fa", "");
                        }

                        return (
                            <div key={hotel.name} className='sm:px-2 rtl:rtl'>
                                <Link
                                    href={url}
                                    className='rounded-2xl group relative block overflow-hidden'
                                    target='_blank'
                                    title={hotel.name}
                                >
                                    <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={hotel.imageUrl}
                                        alt={hotel.name}
                                        width={282}
                                        height={384}
                                        className='col-span-5 h-96 w-full object-cover group-hover:scale-105 transition-all duration-300'
                                    />
                                    <div className="absolute  bottom-0 left-0 right-0 text-white p-3 text-center leading-5 bg-gradient-to-t from-black/75 before:to-trabsparent">
                                        <b className='font-semibold mb-1 block text-lg'> {hotel.name} </b>
                                        <p className="text-sm pb-2"> {hotel.city} </p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                    )}

                </Slider>
            </div>



        </section>
    )
}

export default TopHotels;