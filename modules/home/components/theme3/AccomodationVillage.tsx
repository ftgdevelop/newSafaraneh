import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type Category = {
    imageUrl: string;
    title: string;
    url: string;
};

type Props = {
    title: string;
    categories: Category[];
};

const AccommodationCategoryList: React.FC<Props> = ({ title, categories }) => {

    const settings = {
        speed: 500,
        slidesToShow: 4,
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
        <section className="max-w-container m-auto px-5 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10" >

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-2 h-10 mb-8">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    {title}
                </span>
            </h2>

            <div className="-mx-2" dir="ltr">
                <Slider
                    {...settings}
                >    
                    {categories.map(category => {
                            let url = category.url;

                            if (process.env.LocaleInUrl === "off") {
                                url = url.replace("fa/", "");
                            }

                            return (
                                <div key={category.title} className='sm:px-2 rtl:rtl'>
                                    <Link
                                        href={url}
                                        className='bg-white rounded-2xl group relative block overflow-hidden  border border-neutral-200'
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
                                        <div className="p-3">
                                            <b className='font-bold mb-1 block text-md'> {category.title} </b>
                                            <span className='text-xs leading-4 mb-2 text-neutral-500'> تهران، تهران </span>
                                            <div className="flex flex-col items-end justify-end mt-4">
                                                <div className="flex flex-row items-center gap-3 mb-1">
                                                    <div className="text-xs inline-block text-neutral-500 line-through whitespace-nowrap">
                                                        ۱۲۰,۰۰۰,۰۰۰ ریال
                                                    </div>
                                                    <div className="text-xs font-semibold whitespace-nowrap">
                                                        ۸۷,۸۸۰,۰۰۰ ریال
                                                    </div>
                                                </div>
                                                <div className="text-xs text-neutral-500 leading-4">
                                                    شروع قیمت برای 1 شب
                                                </div>
                                            </div>
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

export default AccommodationCategoryList;