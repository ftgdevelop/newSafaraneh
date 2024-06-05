import { LeftCaret, RightCaret} from "@/modules/shared/components/ui/icons";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Slider from "react-slick";

const BeyondTypicalStays : React.FC = () => {

    const { t: tHome } = useTranslation('home');

    const cities: {
        imageUrl: string;
        url: string;
        name: string;
    }[] = [
            {
                imageUrl: "/images/home/theme2/isfahan.jpg",
                url: tHome('esfahan-city-link'),
                name: "اصفهان"
            },
            {
                imageUrl: "/images/home/theme2/kish.jpg",
                url: tHome('kish-city-link'),
                name: "کیش"
            },
            {
                imageUrl: "/images/home/theme2/shiraz.jpg",
                url: tHome('shiraz-city-link'),
                name: "شیراز"
            },
            {
                imageUrl: "/images/home/theme2/mashad.jpg",
                url: tHome('mashhad-city-link'),
                name: "مشهد"
            },
            {
                imageUrl: "/images/home/theme2/tehran.jpg",
                url: tHome('tehran-city-link'),
                name: "تهران"
            }

        ];

    const settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
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

    return(
        <section className="max-w-container m-auto px-3 max-xl:p-5" >
            <h2 className="font-semibold text-md md:text-2xl mb-5">
                فراتر از اقامت معمولی خود بروید
            </h2>


                <Slider {...settings}>

                    {cities.map(city => (
                        <div key={city.name} className='sm:px-2 rtl:rtl'>
                            <a 
                                href={city.url} 
                                className='rounded-2xl relative block overflow-hidden before:absolute before:bg-gradient-to-t from-black/75 before:to-trabsparent before:h-24 before:left-0 before:right-0 before:bottom-0' 
                                target='_blank' 
                                title={city.name}
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={city.imageUrl}
                                    alt={city.name}
                                    width={232}
                                    height={314}
                                    className='col-span-5 h-80'
                                />
                                <b className='absolute bottom-0 font-bold text-white p-3 leading-5'> {city.name} </b>
                            </a>
                        </div>

                    ))}

                </Slider>

        </section>
    )
}

export default BeyondTypicalStays;