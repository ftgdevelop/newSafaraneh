import { LeftCircle, RightCircle } from '@/modules/shared/components/ui/icons';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Slider from "react-slick";

const PopularCities: React.FC = () => {

    const { t: tHome } = useTranslation('home');

    const cities: {
        imageUrl: string;
        url: string;
        quantity: number;
        name: string;
        title: string;
    }[] = [
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/esfahancityhome.jpg",
                url: tHome('esfahan-city-link'),
                title: tHome('esfahan-city-name'),
                quantity: 115,
                name: "اصفهان"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/kishcityhome.jpg",
                url: tHome('kish-city-link'),
                title: tHome('kish-city-name'),
                quantity: 50,
                name: "کیش"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/shirazcityhome.jpg",
                url: tHome('shiraz-city-link'),
                title: tHome('shiraz-city-name'),
                quantity: 50,
                name: "شیراز"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/mashhadcityhome.jpg",
                url: tHome('mashhad-city-link'),
                title: tHome('mashhad-city-name'),
                quantity: 75,
                name: "مشهد"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/tehrancityhome.jpg",
                url: tHome('tehran-city-link'),
                title: tHome('tehran-city-name'),
                quantity: 90,
                name: "تهران"
            }

        ];


    const settings = {
        speed: 500,
        slidesToShow: 5,
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
                    slidesToShow: 4,
                    slidesToScroll: 1,
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


    return (
        <>

            <h2 className='text-xl font-semibold my-4 md:mt-10'>
                شهرهای محبوب
            </h2>


                <Slider {...settings}>

                    {cities.map(city => (
                        <div key={city.name} className='sm:px-2 rtl:rtl'>
                            <a href={city.url} className='grid grid-cols-9 bg-white rounded-lg overflow-hidden' target='_blank' title={city.name}>
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={city.imageUrl}
                                    alt={city.title}
                                    width={272}
                                    height={142}
                                    className='col-span-5 h-auto'
                                />
                                <div className="col-span-4 p-2 text-xs">
                                        رزرو هتل در
                                        <b className='text-sm'> {city.name} </b>
                                    <small className='text-3xs block mt-3'>بیش از {city.quantity} هتل</small>
                                </div>
                            </a>
                        </div>

                    ))}

                </Slider>

        </>

    )
}

export default PopularCities;