import Image from "next/image";
import Link from "next/link";
import { BlogItemType } from "@/modules/blogs/types/blog";

type Props = {
    blogs?: BlogItemType[];
}

const RecentPostsTheme3: React.FC<Props> = props => {

    return (
        <section className="max-w-container m-auto px-5 max-xl:p-5 mb-5 sm:mb-16" >

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-6 h-10">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    آخرین مطالب وبلاگ
                </span>
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10'>

                {props.blogs?.slice(0,4)?.map(blog => (

                    <Link key={blog.id} href={`/blog/${blog.slug}`} title={blog.title?.rendered}>
                        <Image
                            onContextMenu={e => {e.preventDefault()}}
                            src={blog.images?.medium || "/images/no-image.jpg"}
                            alt={blog.title?.rendered}
                            title={blog.title?.rendered}
                            width={278}
                            height={176}
                            className='w-full'
                        />
                        <div className="bg-white relative rounded-lg p-4 pb-2 mx-3 -mt-8 text-sm text-neutral-600">
                            <h2 className='font-semibold mb-3 leading-6'>{blog.title.rendered}</h2>
                            <small className='text-xs'>{blog.date}</small>
                        </div>
                    </Link>
                ))}

            </div>

        </section>
    )
}

export default RecentPostsTheme3;



