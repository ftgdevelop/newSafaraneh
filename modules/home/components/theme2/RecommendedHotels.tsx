import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Slider from "react-slick";

type Props ={
    sectionTitle?: string;
    sectionSubtitle?: string;
}

const RecommendedHotels: React.FC<Props> = props => {

    const { t: tHome } = useTranslation('home');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
        alt: string;
        reviewRating: number;
        reviewCount: number;
        city: string;
    }[] = [
            {
                url: "hotel/هتل-پارسیان-آزادی-تهران",
                imageUrl: "/images/home/theme2/hotels/parsian-azadi.jpeg",
                name: tHome('azadi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل آزادی تهران",
                reviewCount: 160,
                reviewRating: 80,
                city: "تهران"
            },
            {
                url: "hotel/هتل-پارس-شیراز",
                imageUrl: "/images/home/theme2/hotels/pars-hotel-shiraz.jpeg",
                name: tHome('pars-hotel-name'),
                rating: 5,
                alt: "رزرو هتل پارس شیراز",
                reviewCount: 12,
                reviewRating: 75,
                city: "شیراز - فارس"
            },
            {
                url: "hotel/هتل-مجلل-درویشی-مشهد",
                imageUrl: "/images/home/theme2/hotels/darvishi-hotel-mashhad.jpg",
                name: tHome('darvishi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل مجلل درویشی مشهد",
                reviewCount: 25,
                reviewRating: 78,
                city: "مشهد - خراسان"
            },
            {
                url: "hotel/هتل-پارسیان-استقلال-تهران",
                imageUrl: "/images/home/theme2/hotels/esteghlal-hotel-tehran.jpg",
                name: tHome('esteghlal-hotel-name'),
                rating: 5,
                alt: "رزرو هتل استقلال تهران",
                reviewCount: 160,
                reviewRating: 77,
                city: "تهران"
            },
            {
                url: "hotel/هتل-اسپیناس-آستارا",
                imageUrl: "/images/home/theme2/hotels/espinas-hotel-astara.jpg",
                name: tHome('astara-hotel-name'),
                rating: 4,
                alt: "رزرو هتل اسپیناس آستارا",
                reviewCount: 2,
                reviewRating: 85,
                city: "آستارا - گیلان"
            },
            {
                url: "hotel/هتل-میراژ-کیش",
                imageUrl: "/images/home/theme2/hotels/mirage-hotel-kish.jpg",
                name: tHome('miraj-hotel-name'),
                rating: 5,
                alt: "رزرو هتل میراژ کیش",
                reviewCount: 5,
                reviewRating: 58,
                city: "کیش - هرمزگان"
            },
            {
                url: "hotel/هتل-داد-یزد",
                imageUrl: "/images/home/theme2/hotels/daad-hotel-yazd.jpg",
                name: tHome('dad-hotel-name'),
                rating: 4,
                alt: "رزرو هتل داد یزد",
                reviewCount: 11,
                reviewRating: 77,
                city: "یزد"
            },
            {
                url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                imageUrl: "/images/home/theme2/hotels/parsian-kowsar-hotel-isfahan.jpg",
                name: tHome('kosar-hotel-name'),
                rating: 5,
                alt: "رزرو هتل کوثر اصفهان",
                reviewCount: 3,
                reviewRating: 40,
                city: "اصفهان"
            }

        ]

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
            <h2 className="font-semibold text-md md:text-2xl mb-2">
                {props.sectionTitle}
            </h2>
            { props.sectionSubtitle && <p className="text-xs md:text-sm mb-3">
                {props.sectionSubtitle}
            </p>}

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {hotels.map(hotel => {

                        let tag = "معمولی";

                        if (hotel.reviewRating > 60) {
                            tag = "خوب";
                        }
                        if (hotel.reviewRating > 80) {
                            tag = "خیلی خوب";
                        }
                        if (hotel.reviewRating > 90) {
                            tag = "عالی";
                        }

                        return (
                            <div key={hotel.name} className='sm:px-2 rtl:rtl'>
                                <a
                                    href={hotel.url}
                                    className='rounded-2xl border border-neutral-200 bg-white relative block overflow-hidden'
                                    target='_blank'
                                    title={hotel.name}
                                >
                                    <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={hotel.imageUrl}
                                        alt={hotel.name}
                                        width={299}
                                        height={128}
                                        className='col-span-5 object-cover h-32 w-full'
                                    />
                                    <div className="p-3 text-sm">
                                        <b className='block font-semibold leading-5'> {hotel.name} </b>
                                        <p className="mb-2 text-xs"> {hotel.city} </p>
                                        <div className="flex">
                                            <b className="font-bold"> {hotel.reviewRating} از 100  </b>
                                            <span className="mx-2">
                                                {tag}
                                            </span>
                                            ({hotel.reviewCount})
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}

                </Slider>
            </div>

        </section>
    )
}

export default RecommendedHotels;