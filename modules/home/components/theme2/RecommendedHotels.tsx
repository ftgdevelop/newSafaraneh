import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type Props = {
    sectionTitle?: string;
    sectionSubtitle?: string;
    hotels?: {
        url?: string;
        name?: string;
        imageUrl?: string;
        alt?: string;
        imageTitle?: string;
        description?: string;
    }[]
}

const RecommendedHotels: React.FC<Props> = props => {

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

    if(!props.hotels?.length){
        return null;
    }

    if (props.hotels?.length < 3) {
        return (
            <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-10" >
                <h2 className="font-semibold text-md md:text-2xl mb-5">
                    {props.sectionTitle}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {props.hotels?.map(hotel => {

                        let url = hotel.url;

                        if (process.env.LocaleInUrl === "off") {
                            url = url?.replace("fa", "");
                        }

                        return (
                            <Link
                                href={hotel.url || ""}
                                className='rounded-2xl border border-neutral-200 bg-white relative block overflow-hidden'
                                target='_blank'
                                title={hotel.name}
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={hotel.imageUrl || ""}
                                    alt={hotel.alt || ""}
                                    title={hotel.imageTitle || ""}
                                    width={299}
                                    height={128}
                                    className='col-span-5 object-cover h-32 w-full'
                                />
                                <div className="p-3 text-sm">
                                    <b className='block font-semibold leading-5'> {hotel.name} </b>
                                    <p className="mt-1 text-xs"> {hotel.description} </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        )
    }

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12" >
            <h2 className="font-semibold text-md md:text-2xl mb-2">
                {props.sectionTitle}
            </h2>
            {props.sectionSubtitle && <p className="text-xs md:text-sm mb-3">
                {props.sectionSubtitle}
            </p>}

            <div className="-mx-2">
                <Slider
                    {...settings}
                >

                    {props.hotels?.map(hotel =>
                        <div key={hotel.name} className='sm:px-2 rtl:rtl'>
                            <Link
                                href={hotel.url || ""}
                                className='rounded-2xl border border-neutral-200 bg-white relative block overflow-hidden'
                                target='_blank'
                                title={hotel.name}
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={hotel.imageUrl || ""}
                                    alt={hotel.alt || ""}
                                    title={hotel.imageTitle || ""}
                                    width={299}
                                    height={128}
                                    className='col-span-5 object-cover h-32 w-full'
                                />
                                <div className="p-3 text-sm">
                                    <b className='block font-semibold leading-5'> {hotel.name} </b>
                                    <p className="mt-1 text-xs"> {hotel.description} </p>
                                </div>
                            </Link>
                        </div>
                    )}

                </Slider>
            </div>

        </section>
    )
}

export default RecommendedHotels;