import { BlogItemType } from "@/modules/blogs/types/blog";
import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type Props = {
    posts?: BlogItemType[]
}

const BlogCarousel: React.FC<Props> = props => {

    const settings = {
        speed: 500,
        slidesToShow: 5,
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
                    slidesToScroll: 3,
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

    if (!props.posts?.length) {
        return null;
    }

    if (props.posts?.length < 5) {
        return (
            <section className="px-5 lg:px-12 mb-5 sm:mb-12" >
                <div className="grid sm:flex gap-5">
                    {props.posts?.map(post => {
                        return (
                            <div key={post.id} className='sm:px-2 rtl:rtl'>
                                <Link
                                    href={`blog/${post.slug}`}
                                    className='block mb-3'
                                    target='_blank'
                                    title={post.title?.rendered}
                                >
                                    <Image
                                        onContextMenu={e => { e.preventDefault() }}
                                        src={post.images?.medium || "/images/no-image.jpg"}
                                        alt={post.title?.rendered || ""}
                                        title={post.title?.rendered || ""}
                                        width={500}
                                        height={500}
                                        className='col-span-5 object-cover h-80 w-full'
                                    />
                                </Link>
                                <Link
                                    href={`blog/${post.slug}`}
                                    className='block font-thin xl:text-lg mb-2'
                                    target='_blank'
                                    title={post.title?.rendered}
                                >
                                    {post.title?.rendered}
                                </Link>
                                <div className="text-2xs text-neutral-400">
                                    {post.date}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }

    return (
        <section className="px-5 lg:px-12 mb-5 sm:mb-12" >
            <Slider
                {...settings}
            >

                {props.posts?.map(post =>
                    <div key={post.id} className='sm:px-2 rtl:rtl'>
                        <Link
                            href={`blog/${post.slug}`}
                            className='block mb-3'
                            target='_blank'
                            title={post.title?.rendered}
                        >
                            <Image
                                onContextMenu={e => { e.preventDefault() }}
                                src={post.images?.medium || "/images/no-image.jpg" }
                                alt={post.title?.rendered || ""}
                                title={post.title?.rendered || ""}
                                width={500}
                                height={500}
                                className='col-span-5 object-cover h-80 w-full'
                            />
                        </Link>
                        <Link
                            href={`blog/${post.slug}`}
                            className='block font-thin xl:text-lg mb-2'
                            target='_blank'
                            title={post.title?.rendered}
                        >
                            {post.title?.rendered}
                        </Link>
                        <div className="text-2xs text-neutral-400">
                            {post.date}
                        </div>
                    </div>
                )}

            </Slider>
        </section>
    )
}

export default BlogCarousel;