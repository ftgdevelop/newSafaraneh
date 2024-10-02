import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';

import SearchTheme2 from "./shared/SearchTheme2";
import { toPersianDigits } from "@/modules/shared/helpers";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Slider from "react-slick";
import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";

type Props = {
    imageUrl?: string;
    imageAlt?: string;
    title: string;
    tags: {
        label: string;
        link: string;
    }[];
    date?: string;
    content?: string;
    excerpt?: string;
    category?: {
        label: string;
        link: string;
    };
    time_read?: string;
    relatedPosts?: {
        imageUrl?: string;
        link: string;
        title: string;
        date?: string;
        tags: {
            label: string;
            link: string;
        }[]
    }[];
    categories: {
        label: string;
        link: string;
    }[];
    recentPosts?: {
        link: string;
        title: string;
    }[];
}

const PostDetail: React.FC<Props> = props => {

    const { title, date, imageUrl, imageAlt, tags, content, excerpt, category, relatedPosts, categories, time_read, recentPosts } = props;

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
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
            <SearchTheme2 />

            <div className="grid grid-cols-1 md:grid-cols-2">
                {!!imageUrl && <Image
                    src={imageUrl}
                    alt={imageAlt || title}
                    width={750}
                    height={750}
                    className="w-full h-full block object-cover"
                    onContextMenu={e => e.preventDefault()}
                />}

                <div className="bg-gray-50" >
                    <div className="max-w-half-container p-10 flex flex-col justify-between md:min-h-65vh">

                        <div className="flex gap-2 mb-5">
                            {category && <Link
                                href={category.link}
                                className="bg-gray-800 text-white text-2xs block px-3 py-1 leading-4 rounded-full"
                            >
                                {category.label}
                            </Link>}
                            {tags.map(tag => (
                                <Link
                                    href={tag.link}
                                    key={tag.label}
                                    className="bg-gray-800 text-white text-2xs block px-3 py-1 leading-4 rounded-full"
                                >
                                    {tag.label}
                                </Link>
                            ))}
                        </div>

                        <h2 className="text-xl md:text-6xl leading-normal mb-5" >
                            {title}
                        </h2>

                        {!!excerpt && <div className="text-sm text-justify mb-5">
                            {parse(excerpt)}
                        </div>}

                        {!!date && <div className="text-3xs mb-5">
                            {toPersianDigits(date)}
                        </div>}

                        {!!time_read && <div className="text-3xs">
                            {time_read}
                        </div>}

                    </div>
                </div>
            </div>
            <div className="max-w-container mx-auto px-3 py-5 sm:py-14 inserted-content relative" >
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="hidden lg:block">
                        <div className="sticky top-5 pl-5 max-h-screen overflow-auto">

                            {!!categories?.length && <>
                                <h3 className="text-xl mb-4"> دسته بندی مطالب</h3>
                                <div className="mb-8">
                                    {categories?.map(item =>
                                        <div key={item.label} className="border-b border-neutral-200">
                                            <Link
                                                href={item.link}
                                                className="text-xs hover:text-blue-800 py-2 inline-block"
                                            >
                                                {item.label}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>}


                            {!!recentPosts?.length && <h3 className="text-xl mb-4">  جدیدترین مطالب</h3>}

                            {recentPosts?.slice(0, 3)?.map(item =>
                                <div key={item.title} className="border-b border-neutral-200">
                                    <Link
                                        href={item.link}
                                        className="text-xs hover:text-blue-800 py-2 inline-block leading-5"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )}

                            <br />

                        </div>
                    </div>

                    <div className="lg:col-span-3 text-sm">
                        <BreadCrumpt items={[{ label: "بلاگ", link: "/blog" }, { label: category?.label || "", link: category?.link }, { label: title }]} />
                        <br />

                        {content && parse(content)}

                        <br />

                        {!!tags.length && (
                            <>
                                تگ ها:
                                {tags.map(tag => (
                                    <Link
                                        href={tag.link}
                                        key={tag.label}
                                        className="text-sm text-blue-600 mx-4"
                                    >
                                        # {tag.label}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                </div>
            </div>

            <div className="px-3 lg:px-10 bg-stone-100 py-10 md:py-16">
                <h3 className="text-lg md:text-xl font-semibold mb-5 md:mb-8" > مطالب مرتبط </h3>
                <Slider
                    {...settings}
                >

                    {relatedPosts?.map(item => (
                        <Link
                            href={item.link}
                            prefetch={false}
                            key={item.title}
                            className="p-2"
                        >
                            {!!item.imageUrl && <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={450}
                                height={450}
                                className="block mb-5 w-full h-60 object-cover"
                            />}
                            <div dir="rtl">
                                <div className="flex gap-2 mb-5">
                                    {tags.map(tag => (
                                        <span
                                            key={tag.label}
                                            className="outline-none border-0 bg-gray-800 text-white text-2xs block px-3 py-1 leading-4 rounded-full"
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>

                                <h3
                                    className="text-sm block my-5 font-semibold leading-4"
                                >
                                    {item.title}
                                </h3>


                                {item.date ? <span className="text-2xs block text-neutral-400" > {toPersianDigits(item.date)}</span> : null}


                            </div>


                        </Link>
                    ))}

                </Slider>
            </div>

        </>
    )
}

export default PostDetail;