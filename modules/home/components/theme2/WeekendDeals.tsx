import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import { addSomeDays, dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { AvailabilityByHotelId } from "@/modules/domesticHotel/actions";
import WeekendHotelItem from "./WeekendHotelItem";

type PricesResponseItem = {
    id: number;
    salePrice: number;
    boardPrice: number;
}
type Hotels = {
    hotelId: number;
    imageUrl: string;
    name: string;
    url: string;
    rating: number;
    alt: string;
    reviewRating: number;
    reviewCount: number;
    city: string;
    boardPrice?: number;
    salePrice?: number;
}

const WeekendDeals: React.FC = () => {

    const { t: tHome } = useTranslation('home');

    const [pricesData, setPricesData] = useState<PricesResponseItem[] | undefined>();
    const [pricesLoading, setPricesLoading] = useState<boolean>(false);

    const hotels: Hotels[] = [
        {
            url: "hotel/هتل-پارسیان-آزادی-تهران",
            imageUrl: "/images/home/theme2/hotels/parsian-azadi.jpeg",
            name: tHome('azadi-hotel-name'),
            rating: 5,
            alt: "رزرو هتل آزادی تهران",
            reviewCount: 160,
            reviewRating: 80,
            city: "تهران",
            hotelId: 243
        },
        {
            url: "hotel/هتل-پارس-شیراز",
            imageUrl: "/images/home/theme2/hotels/pars-hotel-shiraz.jpeg",
            name: tHome('pars-hotel-name'),
            rating: 5,
            alt: "رزرو هتل پارس شیراز",
            reviewCount: 12,
            reviewRating: 75,
            city: "شیراز - فارس",
            hotelId: 272
        },
        {
            url: "hotel/هتل-مجلل-درویشی-مشهد",
            imageUrl: "/images/home/theme2/hotels/darvishi-hotel-mashhad.jpg",
            name: tHome('darvishi-hotel-name'),
            rating: 5,
            alt: "رزرو هتل مجلل درویشی مشهد",
            reviewCount: 25,
            reviewRating: 78,
            city: "مشهد - خراسان",
            hotelId: 523
        },
        {
            url: "hotel/هتل-پارسیان-استقلال-تهران",
            imageUrl: "/images/home/theme2/hotels/esteghlal-hotel-tehran.jpg",
            name: tHome('esteghlal-hotel-name'),
            rating: 5,
            alt: "رزرو هتل استقلال تهران",
            reviewCount: 160,
            reviewRating: 77,
            city: "تهران",
            hotelId: 245
        },
        {
            url: "hotel/هتل-اسپیناس-آستارا",
            imageUrl: "/images/home/theme2/hotels/espinas-hotel-astara.jpg",
            name: tHome('astara-hotel-name'),
            rating: 4,
            alt: "رزرو هتل اسپیناس آستارا",
            reviewCount: 2,
            reviewRating: 85,
            city: "آستارا - گیلان",
            hotelId: 5213
        },
        {
            url: "hotel/هتل-میراژ-کیش",
            imageUrl: "/images/home/theme2/hotels/mirage-hotel-kish.jpg",
            name: tHome('miraj-hotel-name'),
            rating: 5,
            alt: "رزرو هتل میراژ کیش",
            reviewCount: 5,
            reviewRating: 58,
            city: "کیش - هرمزگان",
            hotelId: 21032
        },
        {
            url: "hotel/هتل-داد-یزد",
            imageUrl: "/images/home/theme2/hotels/daad-hotel-yazd.jpg",
            name: tHome('dad-hotel-name'),
            rating: 4,
            alt: "رزرو هتل داد یزد",
            reviewCount: 11,
            reviewRating: 77,
            city: "یزد",
            hotelId: 636
        },
        {
            url: "hotel/هتل-پارسیان-کوثر-اصفهان",
            imageUrl: "/images/home/theme2/hotels/parsian-kowsar-hotel-isfahan.jpg",
            name: tHome('kosar-hotel-name'),
            rating: 5,
            alt: "رزرو هتل کوثر اصفهان",
            reviewCount: 3,
            reviewRating: 40,
            city: "اصفهان",
            hotelId: 203
        }

    ];

    const today = new Date();

    let daysToNextWednesday: number;

    switch (today.getDay()) {
        case (6):
            daysToNextWednesday = 4;
            break;
        case (7):
            daysToNextWednesday = 3;
            break;
        case (1):
            daysToNextWednesday = 2;
            break;
        case (2):
            daysToNextWednesday = 1;
            break;
        case (3):
            daysToNextWednesday = 0;
            break;
        case (4):
            daysToNextWednesday = 6;
            break;
        case (5):
            daysToNextWednesday = 5;
            break;
        default:
            daysToNextWednesday = 0;
    }

    const checkinDate = addSomeDays(today, daysToNextWednesday);
    const checkoutDate = addSomeDays(checkinDate, 2);

    const checkin = dateFormat(checkinDate);
    const checkout = dateFormat(checkoutDate);


    useEffect(() => {

        const ids = hotels.map(hotel => hotel.hotelId);


        const fetchPrices = async () => {
            setPricesLoading(true);
            setPricesData(undefined);
            const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: ids as number[] }, "fa-IR");

            if (pricesResponse.data?.result?.hotels) {

                setPricesData(pricesResponse.data.result.hotels);

            }
            setPricesLoading(false);
        }

        fetchPrices();


    }, [checkin, checkout]);

    const pricedHotels: Hotels[] = hotels.map(hotel => {

        const hotelPriceData = pricesData?.find(item => item.id === hotel.hotelId);

        return ({
            ...hotel,
            boardPrice: hotelPriceData?.boardPrice || undefined,
            salePrice: hotelPriceData?.salePrice || undefined
        })
    })

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
                رزرو لحظه آخری برای آخر هفته
            </h2>
            <p className="text-xs md:text-sm mb-3">
                برای تاریخ:  {dateDiplayFormat({ date: checkin, format: "dd mm", locale: "fa" })} تا {dateDiplayFormat({ date: checkout, format: "dd mm", locale: "fa" })}
            </p>

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {pricedHotels.filter(hotel => hotel.salePrice || pricesLoading).map(hotel => (
                        <WeekendHotelItem
                            key={hotel.hotelId}
                            hotel={hotel}
                            priceLoading={pricesLoading}
                            checkin={checkin}
                            checkout={checkout}
                        />
                    ))}

                </Slider>
            </div>



        </section>
    )
}

export default WeekendDeals;