import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogItemType } from "../../types/blog";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";

interface Props {
    data? : BlogItemType[]
}

const BlogItem: NextPage<any> = ({data,index}) => {
    return (
            <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1 mt-6 max-sm:mt-10 w-full max-sm:-space-y-2">
                    <Link href={`/blog/${data.slug}`}>
                <Image src={data?.images?.large} onContextMenu={(e) => e.preventDefault()}
                    alt="pic" height={150} width={300} className="w-full rounded-md max-sm:mr-3" priority={!index} />
                    </Link>

                <div
                className="w-full col-span-2 rounded-md pl-5 pr-5 pt-5 pb-2 h-full relative border-gray-200 border-2 max-sm:border-0 max-sm:pt-0 ">
                    <Link href={`/blog/category/${data.categories[0]}`}
                        className="text-red-600 max-sm:text-sm block hover:text-red-400 duration-300">
                        {data?.categories_names?.[0]}
                    </Link>
                    <Link href={`/blog/${data.slug}`}
                        className="block font-semibold text-lg h-18 max-sm:h-fit max-sm:pb-2 hover:text-blue-800 mt-2 duration-300 max-sm:text-base">
                         {data?.title?.rendered}
                    </Link>
                <div className="flex justify-between text-sm pb-1">
                    <div className="flex justify-between text-gray-400 max-sm:text-xs">
                        <p>{data?.date}</p>
                        <p className="scale-150 ml-2 mr-2">.</p>
                        <p>{data?.acf.time_read}</p>
                        </div>
                        <Link href={`/blog/${data?.slug}`} className="flex ml-2 max-md:hidden">
                            <p className="text-sm font-semibold hover:text-blue-800">ادامه مطلب</p>
                            <ArrowLeft
                                className="w-7 h-fit mr-1 bg-gray-200 rounded-full p-1 ltr:hidden hover:bg-gray-300 duration-300" />
                            <ArrowRight
                                className="w-7 h-fit mr-1 bg-gray-200 rounded-full p-1 rtl:hidden hover:bg-gray-300 duration-300" />   
                        </Link>
                </div>
            </div>
        </div >     
    )
}

export default BlogItem;