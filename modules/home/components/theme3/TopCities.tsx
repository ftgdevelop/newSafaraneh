import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const TopCities: React.FC = () => {

    const cities: {
        imageUrl: string;
        title: string;
        subtitle: string;
        url: string;
    }[] = [
            {
                title: "هتل های تهران",
                url: "/hotels/هتل-های-تهران",
                imageUrl: "/images/home/theme3/cities/tehran.jpg",
                subtitle: "122 هتل"
            },
            {
                title: "هتل های اصفهان",
                url: "/hotels/هتل-های-اصفهان",
                imageUrl: "/images/home/theme3/cities/isfahan.jpg",
                subtitle: "89 هتل"
            },
            {
                title: "هتل های مشهد",
                url: "/hotels/هتل-های-مشهد",
                imageUrl: "/images/home/theme3/cities/mashad.jpg",
                subtitle: "190 هتل"
            },
            {
                title: "هتل های شیراز",
                url: "/hotels/هتل-های-شیراز",
                imageUrl: "/images/home/theme3/cities/shiraz.jpg",
                subtitle: "102 هتل"
            },
            {
                title: "هتل های کیش",
                url: "/hotels/هتل-های-جزیره-کیش",
                imageUrl: "/images/home/theme3/cities/kish.jpg",
                subtitle: "80 هتل"
            },
            {
                title: "هتل های تبریز",
                url: "/hotels/هتل-های-تبریز",
                imageUrl: "/images/home/theme3/cities/tabriz.jpg",
                subtitle: "72 هتل"
            },
            {
                title: "هتل های قشم",
                url: "/hotels/هتل-های-جزیره-قشم",
                imageUrl: "/images/home/theme3/cities/qeshm.jpg",
                subtitle: "75 هتل"
            }
        ]

    const settings = {
        speed: 500,
        slidesToShow: 5,
        infinite: true,
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

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-2 h-10">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    شهرهای محبوب
                </span>
            </h2>
            <p className="mb-8 pr-6"> شهرهای محبوب، جایی که تاریخ، فرهنگ و زندگی در هم می‌آمیزند </p>

            <div className="-mx-2" dir="ltr">
                <Slider
                    {...settings}
                >

                    {cities.map(city => {

                        let url = city.url;

                        if (process.env.LocaleInUrl === "off") {
                            url = url.replace("fa/", "");
                        }

                        return (
                            <div key={city.title} className='sm:px-2 rtl:rtl'>
                                <Link
                                    href={url}
                                    className='rounded-2xl group relative block overflow-hidden'
                                    target='_blank'
                                    title={city.title}
                                >
                                    <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={city.imageUrl}
                                        alt={city.title}
                                        width={282}
                                        height={384}
                                        className='col-span-5 h-80 w-full object-cover group-hover:scale-105 transition-all duration-300'
                                    />
                                    <div className="absolute  bottom-0 left-0 right-0 text-white p-3 text-center leading-5 bg-gradient-to-t from-black/90 to-trabsparent">
                                        <b className='font-semibold mb-1 block text-lg'> {city.title} </b>
                                        <p className="text-sm pb-2"> {city.subtitle} </p>
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

export default TopCities;