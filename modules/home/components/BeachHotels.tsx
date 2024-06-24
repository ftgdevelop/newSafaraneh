import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Image from 'next/image';
import Slider from "react-slick";

import Rating from '../../shared/components/ui/Rating';
import { LeftCircle, RightCircle } from '@/modules/shared/components/ui/icons';

const BeachHotels: React.FC = () => {

    const { t: tHome } = useTranslation('home');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
    }[] = [
            {
                url: tHome("noor-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-noor-thumb.jpg",
                name: tHome('noor-hotel-beach-name'),
                rating: 4
            },
            {
                url: tHome("toranj-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-toranj-thumb.jpg",
                name: tHome('toranj-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("parsian-chalos-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-azadi-khazar-thumb.jpg",
                name: tHome('parsian-chalos-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("homa-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-homa-bandarabbas-thumb.jpg",
                name: tHome('homa-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("lipar-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-lipar-thumb.jpg",
                name: tHome('lipar-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("marina-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-marina-thumb.jpg",
                name: tHome('marina-hotel-beach-name'),
                rating: 5
            }


        ];

    const settings = {
        speed: 500,
        slidesToShow: 3,
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


    return (
        <Fragment>
            <h2 className='text-xl font-semibold my-4 md:mt-10'>
                هتل‌‌های ساحلی
            </h2>


                <Slider {...settings} className='gap-slider'>

                    {hotels.map(hotel => (
                        <a key={hotel.name} href={hotel.url} className='rtl:rtl outline-none block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
                            <Image
                                onContextMenu={e => { e.preventDefault() }}
                                src={hotel.imageUrl}
                                alt={`رزرو ${hotel.name}`}
                                width={376}
                                height={183}
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


        </Fragment>

    )
}

export default BeachHotels;