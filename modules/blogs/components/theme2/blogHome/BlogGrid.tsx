import { BlogItemType } from "@/modules/blogs/types/blog";
import Image from "next/image";
import Link from "next/link";

type Props = {
    sectionTitle?: string;
    sectionSubtitle?: string;
    posts?: BlogItemType[]
}

const BlogGrid: React.FC<Props> = props => {


    if (!props.posts?.length) {
        return null;
    }

    return (
        <section className="max-w-container m-auto px-5 mb-5 sm:mb-10" >
            <h2 className="font-semibold text-md md:text-2xl mb-5">
                {props.sectionTitle}
            </h2>
            <div className="grid lg:grid-cols-3 xl:grid-cols-7 gap-5">
                {props.posts.slice(0, 3)?.map((post, index) => {
                    return (
                        <div key={post.id} className={`rtl:rtl ${index === 1 ? "xl:col-span-3" : "xl:col-span-2"}`}>
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

export default BlogGrid;