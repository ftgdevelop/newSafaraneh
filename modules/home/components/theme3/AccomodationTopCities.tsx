import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const AccomodationTopCities: React.FC = () => {

    const categories: {
        imageUrl: string;
        title: string;
        url: string;
    }[] = [
            {
                title: "تهران",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/tehran.avif",
            },
            {
                title: "کردان",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/kordan.avif",
            },
            {
                title: "رامسر",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/ramsar.avif",
            },
            {
                title: "چالوس",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/chalous.avif",
            },
            {
                title: "ماسال",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/masal.avif",
            },
            {
                title: "رشت",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/rasht.avif",
            },
            {
                title: "بندر انزلی",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/bandaranzali.avif",
            },
            {
                title: "متل قو",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/motelqu.avif",
            },
            {
                title: "بابلسر",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/babolsar.avif",
            },
            {
                title: "سوادکوه",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/savadkuh.avif",
            },
            {
                title: "تالش",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/talesh.avif",
            },
            {
                title: "کرج",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/karaj.avif",
            },
            {
                title: "شهریار",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/shahriyar.avif",
            },
            {
                title: "مشهد",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/mashhad.avif",
            },
            {
                title: "اصفهان",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/isfahan.avif",
            },
            {
                title: "شیراز",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/shiraz.avif",
            },
            {
                title: "کاشان",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/kashan.avif",
            },
            {
                title: "کیش",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/kish.avif",
            },
            {
                title: "قشم",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/cities/qeshm.avif",
            },
        ]

    const settings = {
        speed: 500,
        slidesToShow: 7,
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
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4.3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            }
        ]
    };

    return (
        <section className="max-w-container m-auto px-5 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10" >

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-2 h-10 mb-8">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    مقاصد پربازدید
                </span>
            </h2>

            <div className="-mx-2" dir="rtl">
                <Slider
                    {...settings}
                >    
                    {categories.map(category => {
                            let url = category.url;

                            if (process.env.LocaleInUrl === "off") {
                                url = url.replace("fa/", "");
                            }

                            return (
                                <div key={category.title} className='px-2 rtl:rtl'>
                                    <Link
                                        href={url}
                                        className='rounded-2xl group relative block overflow-hidden'
                                        target='_blank'
                                        title={category.title}
                                    >
                                        <Image
                                            onContextMenu={e => { e.preventDefault() }}
                                            src={category.imageUrl}
                                            alt={category.title}
                                            width={282}
                                            height={384}
                                            className='col-span-5 h-40 w-full object-cover group-hover:scale-105 transition-all duration-300'
                                        />
                                        <div className="absolute  bottom-0 left-0 right-0 text-white p-3 text-center leading-5 bg-gradient-to-t from-black/90 to-trabsparent">
                                            <b className='font-semibold mb-1 block text-lg'> {category.title} </b>
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

export default AccomodationTopCities;