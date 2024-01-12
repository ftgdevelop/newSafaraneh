import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogItemType } from "../../types/blog";
import { ArrowLeft } from "@/modules/shared/components/ui/icons";

type Props = {
    blogs?: BlogItemType[];
}

const NewBlog: NextPage<Props> = (props) => {
    console.log(props);
    
    return (
        <div className="p-16 max-xl:p-4 max-w-screen-xl m-auto">
            <p className="text-2xl">جدیدترین مطالب</p>
            {
                props.blogs?.map(blog =>
                    <div key={blog.title.rendered}>
                    <div className="grid grid-cols-3 gap-4 mt-10 max-sm:grid-cols-1">
                    <div>
                        <Link href='/blog'>
                            <Image src={blog.images.medium}
                            alt={blog.title.rendered} height={200} width={600} className="object-fit rounded-md max-sm:mr-1" />
                        </Link>
                    </div>
    
                    <div className="w-full h-58 col-span-2 rounded p-5" style={{border:'solid 1px rgba(0,0,0,0.2)'}}>
                        <Link href={`/blog/category/${blog.categories[0]}`} className="text-red-600 block hover:text-red-400 translation-all duration-300">
                                {blog.categories_names[0]}
                        </Link>
                        <Link href='/blog' className="font-bold text-lg p-2 hover:text-blue-900 block translation-all duration-300">
                            {blog.title.rendered}
                        </Link>
                        <p className="text-xs text-gray-400">{blog.excerpt.rendered}</p>
                        <div className="flex justify-between text-xs mt-4">
                            <div className="flex w-52 justify-between">
                                <p>{blog.date}</p>
                                <p className="font-bold text-3xl">.</p>
                                <p>{blog.acf.time_read}</p>
                            </div>
                            <Link href='/blog' className="flex ml-4 font-bold text-sm hover:text-blue-700 translation-all duraction-300">        
                                <p>ادامه مطلب</p><ArrowLeft className="w-7 mr-2 bg-gray-200 rounded-2xl p-1" />
                            </Link>
                        </div>
                    </div>
                </div>
                    </div>
                )
            }
            {!props.blogs && <p className="text-center">خطا در اتصال به شبکه</p>}
                <div className="w-full rounded text-center p-4 mt-10 hover:bg-gray-100 translation-all duration-300" style={{border:'solid 1px rgba(0,0,0,0.1)'}}>
                    <p>مطالب بیشتر</p>
                </div>
            
        </div>
    )
}


export default NewBlog;