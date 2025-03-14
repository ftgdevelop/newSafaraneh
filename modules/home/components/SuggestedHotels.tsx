import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Slider from "react-slick";

import Rating from '../../shared/components/ui/Rating';
import { LeftCircle, RightCircle } from '@/modules/shared/components/ui/icons';
import { ServerAddress } from '@/enum/url';

type Props = {
    strapiData?: {
        Title?: string;
        Items?: {
            Description?: string;
            Title?: string;
            Url: string;
            ImageAlternative?: string;
            ImageTitle?: string;
            Image?: {
                data?: {
                    attributes?: {
                        url?: string;
                    }
                }
            }
        }[]
    }
}


const SuggestedHotels: React.FC<Props> = props => {

    const { t: tHome } = useTranslation('home');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
        alt: string;
    }[] = props.strapiData?.Items?.length ?
            props.strapiData?.Items.map(item => ({
                name: item.Title || "",
                url: item.Url.replace("/fa/","") || "",
                rating: +(item.Description || 0),
                imageUrl: item.Image?.data?.attributes?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.Image.data.attributes.url}` : "",
                alt: item.ImageAlternative || ""
            }))
            :
            [
                {
                    url: "hotel/هتل-پارسیان-آزادی-تهران",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-azadi-thumb.jpg",
                    name: tHome('azadi-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل آزادی تهران"
                },
                {
                    url: "hotel/هتل-پارس-شیراز",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-pars-thumb.jpg",
                    name: tHome('pars-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل پارس شیراز"
                },
                {
                    url: "hotel/هتل-مجلل-درویشی-مشهد",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-darvishi-thumb.jpg",
                    name: tHome('darvishi-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل مجلل درویشی مشهد"
                },
                {
                    url: "hotel/هتل-پارسیان-استقلال-تهران",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-esteghlal-thumb.jpg",
                    name: tHome('esteghlal-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل استقلال تهران"
                },
                {
                    url: "hotel/هتل-اسپیناس-آستارا",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-espinas-thumb.jpg",
                    name: tHome('astara-hotel-name'),
                    rating: 4,
                    alt: "رزرو هتل اسپیناس آستارا"
                },
                {
                    url: "hotel/هتل-میراژ-کیش",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-miraj-thumb.jpg",
                    name: tHome('miraj-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل میراژ کیش"
                },
                {
                    url: "hotel/هتل-داد-یزد",
                    imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-dad-thumb.jpg",
                    name: tHome('dad-hotel-name'),
                    rating: 4,
                    alt: "رزرو هتل داد یزد"
                },
                {
                    url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                    imageUrl: "/images/hotel-kowsar-thumb.jpg",
                    name: tHome('kosar-hotel-name'),
                    rating: 5,
                    alt: "رزرو هتل کوثر اصفهان"
                }

            ]

    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <RightCircle />,
        prevArrow: <LeftCircle />,
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

    const LocaleInUrl = process.env.LocaleInUrl !== "off";

    return (
        <>
            <h2 className='text-xl font-semibold mb-4'>
                {props.strapiData?.Title || tHome('suggested-hotels')}
            </h2>

            <Slider {...settings} className='gap-slider'>
                {hotels.map(hotel => (

                    <a key={hotel.name} href={(LocaleInUrl ? "/fa/" : "/") + hotel.url} className='rtl:rtl block bg-white rounded-lg overflow-hidden' target='_blank'>
                        <Image
                            onContextMenu={e => { e.preventDefault() }}
                            src={hotel.imageUrl}
                            alt={hotel.alt}
                            width={272}
                            height={142}
                            className='w-full h-auto'
                        />
                        <div className='p-3'>
                            <h2 className='mb-1 text-sm font-semibold'>
                                {hotel.name}
                            </h2>
                            {!!hotel.rating && <Rating number={hotel.rating} minimal />}
                        </div>

                    </a>

                ))}
            </Slider>
        </>

    )
}

export default SuggestedHotels;