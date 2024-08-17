import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type Props = {
    sectionTitle?: string;
    items?: {
        imageUrl: string;
        imageAlt?: string;
        imageTitle?: string;
        url: string;
        name: string;
    }[]
}

const BeyondTypicalStays: React.FC<Props> = props => {

    const cities = props.items;

    if (!cities?.length) {
        return null;
    }

    if (cities.length < 3) {
        return (
            <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-10" >
                <h2 className="font-semibold text-md md:text-2xl mb-5">
                    {props.sectionTitle}
                </h2>
                <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {props.items?.map(city => {

                        let url = city.url;

                        if (process.env.LocaleInUrl === "off") {
                            url = url.replace("fa", "");
                        }

                        return (
                            <Link
                                href={url}
                                className='rounded-2xl relative block overflow-hidden before:absolute before:bg-gradient-to-t from-black/75 before:to-trabsparent before:h-24 before:left-0 before:right-0 before:bottom-0'
                                target='_blank'
                                title={city.name}
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={city.imageUrl}
                                    alt={city.imageAlt || city.name}
                                    title={city.imageTitle || city.name}
                                    width={232}
                                    height={314}
                                    className='col-span-5 h-80 w-full object-cover'
                                />
                                <b className='absolute bottom-0 font-bold text-white p-3 leading-5'> {city.name} </b>
                            </Link>
                        )
                    })}
                </div>
            </section>
        )
    }

    const settings = {
        speed: 500,
        slidesToShow: cities.length > 5 ? 5 : cities.length,
        slidesToScroll: cities.length > 5 ? 5 : 1,
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
                    slidesToShow: cities.length > 4 ? 4 : cities.length,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: cities.length > 3 ? 3 : cities.length,
                    slidesToScroll: cities.length > 3 ? 3 : 1,
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
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-10" >
            <h2 className="font-semibold text-md md:text-2xl mb-5">
                {props.sectionTitle}
            </h2>

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {props.items?.map(city => {

                        let url = city.url;

                        if (process.env.LocaleInUrl === "off") {
                            url = url.replace("fa", "");
                        }

                        return (
                            <div key={city.name} className='sm:px-2 rtl:rtl'>
                                <Link
                                    href={url}
                                    className='rounded-2xl relative block overflow-hidden before:absolute before:bg-gradient-to-t from-black/75 before:to-trabsparent before:h-24 before:left-0 before:right-0 before:bottom-0'
                                    target='_blank'
                                    title={city.name}
                                >
                                    <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={city.imageUrl}
                                        alt={city.imageAlt || city.name}
                                        title={city.imageTitle || city.name}
                                        width={232}
                                        height={314}
                                        className='col-span-5 h-80 w-full object-cover'
                                    />
                                    <b className='absolute bottom-0 font-bold text-white p-3 leading-5'> {city.name} </b>
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

export default BeyondTypicalStays;