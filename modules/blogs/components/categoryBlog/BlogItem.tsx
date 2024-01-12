import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogItemType } from "../../types/blog";
import { useContext } from "react";
import { AllBlogs } from "@/pages/blog/category/[categoriItem]";

interface Props {
    page : [number , number]
}

const BlogItem: NextPage<Props> = ({page}) => {
    const Blogs : BlogItemType[] = useContext(AllBlogs)[0]
    
    return (
        <>
            {
                Blogs &&
                Blogs?.slice(page[0], page[1]).map(item =>
            
            <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1 mt-2 scale-95">
            <div>
                <Link href='/blog'>
                    <Image src={item?.images.medium}
                        alt="pic" height={400} width={600} className="object-fit rounded-md max-sm:mr-1 w-72 h-48" />
                </Link>
            </div>

            <div className="w-full col-span-2 rounded-md p-4" style={{ border: 'solid 1px rgba(0,0,0,0.1)' }}>
                <Link href='/blog' className="text-red-600 block hover:text-red-400 translation-all duration-300">
                    {item?.categories_names[0]}
                </Link>
                <Link href='/blog' className="font-bold text-lg p-2 hover:text-blue-900 block translation-all duration-300">
                    {item?.title.rendered}
                </Link>
                <div className="flex justify-between text-xs mt-12 max-lg:mt-2 ">
                    <div className="flex w-52 justify-between">
                        <p>{item?.date}</p>
                        <p>.</p>
                        <p>{item?.acf.time_read}</p>
                    </div>
                    <Link href='/blog'>ادامه مطلب</Link>
                </div>
            </div>
        </div >)
}
            </>
    )
}

export default BlogItem;