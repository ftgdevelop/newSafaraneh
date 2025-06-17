import Image from 'next/image';
import Link from 'next/link';

import { BlogItemType } from '@/modules/blogs/types/blog';
import { toPersianDigits } from '@/modules/shared/helpers';

type Props = {
    blogs?: BlogItemType[];
}

const RecentBlogs: React.FC<Props> = props => {

    if (!props.blogs?.length || !process.env.PROJECT_MODULES?.includes("Blog")) {
        return null
    }

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12" >

            <h2 className='text-xl font-semibold my-4 md:mt-10'> آخرین مطالب وبلاگ </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pb-10'>

                {props.blogs?.map((blog, index) => (

                    <Link key={blog.id} href={`/blog/${blog.slug}`} title={blog.title.rendered} className={`sm:col-span-${index === 2 ? "2" : "1"}  lg:col-span-${index < 2 ? "3" : "2"}`}>
                        <Image
                            onContextMenu={e => { e.preventDefault() }}
                            src={blog.images?.large || "/images/no-image.jpg"}
                            alt={blog.title?.rendered}
                            title={blog.title.rendered}
                            width={index > 1 ? 387 : 590}
                            height={index > 1 ? 245 : 374}
                            className={`w-full rounded-2xl mb-2 block object-cover h-52 ${index > 1 ? "" : "lg:h-80"}`}
                        />
                        <div className='text-sm'> {toPersianDigits(blog.date)} </div>
                        <h2 className='font-semibold text-md mb-4'>{blog.title.rendered}</h2>
                    </Link>
                ))}

            </div>

        </section>
    )
}

export default RecentBlogs;