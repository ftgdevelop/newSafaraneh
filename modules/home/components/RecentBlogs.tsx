import Image from 'next/image';
import Link from 'next/link';

import { BlogItemType } from '@/modules/blogs/types/blog';

type Props = {
    blogs?: BlogItemType[];
}

const RecentBlogs: React.FC<Props> = props => {

    return (
        <>

            <h2 className='text-xl font-semibold my-4 md:mt-10'> آخرین مطالب وبلاگ </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10'>

                {props.blogs?.map(blog => (

                    <Link key={blog.id} href={`/blog/${blog.slug}`} title={blog.title?.rendered}>
                        <Image
                            onContextMenu={e => {e.preventDefault()}}
                            src={blog.images?.medium}
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

        </>
    )
}

export default RecentBlogs;