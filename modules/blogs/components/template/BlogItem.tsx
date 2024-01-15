import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogItemType } from "../../types/blog";

interface Props {
    data? : BlogItemType[]
}

const BlogItem: NextPage<any> = ({data}) => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1 mt-6 scale-95 max-sm:scale-100 w-full">
            <div>
                <Link href='/blog'>
                    <Image src={data?.images.medium}
                        alt="pic" height={400} width={600} className="object-fit rounded-md max-sm:mr-3" />
                </Link>
            </div>

            <div className="w-full col-span-2 rounded-md p-4" style={{ border: 'solid 1px rgba(0,0,0,0.1)' }}>
                <Link href={`/blog/category/${data.categories[0]}`} className="text-red-600 block hover:text-red-400 translation-all duration-300">
                {data?.categories_names[0]}
                </Link>
                <Link href='/blog' className="font-semibold text-xl p-2 hover:text-blue-900 block translation-all duration-300">
                {data?.title.rendered}
                </Link>
                <div className="flex justify-between text-xs mt-10 max-lg:mt-10 ">
                    <div className="flex w-52 justify-between text-gray-400">
                        <p>{data?.date}</p>
                        <p className="scale-150">.</p>
                        <p>{data?.acf.time_read}</p>
                    </div>
                    <Link href='/blog' className="ml-5 text-sm font-semibold">ادامه مطلب</Link>
                </div>
            </div>
        </div >
        </div>       
    )
}

export default BlogItem;