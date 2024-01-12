import { NextPage } from "next";
import Image from "next/image";
import RecentBlogSidebar from "./RecentBlogSidebar";
import { useContext } from "react";
import { AllBlogs } from "@/pages/blog/category/[categoriItem]";
import { CategoriesNameType } from "../../types/blog";


const Sidebar: NextPage<any> = () => {
    const recentBlogs: [] = useContext(AllBlogs)[1]
    const category_name : CategoriesNameType[] = useContext(AllBlogs)[2]

    

    return (
        <div>
            <div>
                <p className="text-white p-2 rounded-md bg-blue-900 inline text-xs">دسته بندی</p>
            </div>
            <div>
                <ul className="divide-y p-4">
                    {
                        category_name && 
                        category_name.map(item => 
                            <li key={item.name} className="p-2">{item.name}</li>
                        )
                    }
                </ul>
            </div>


            <div className="p-3">
                <div>
                    <p className="p-2 text-white rounded-md bg-blue-900 inline text-xs">جدیدترین مطالب</p>
                </div>
            <div >
                    {
                        recentBlogs &&
                        recentBlogs.map(blog => <RecentBlogSidebar data={blog} /> )
                    }
            </div>
            </div>
            

            <div className="p-3 mt-10">
                <div>
                    <p className="text-xs bg-blue-900 rounded-md inline text-white p-2">پرطرفدارترین هتل های ایران</p>
                </div>
                <div className="mt-10">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
                <div className="mt-10">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
                <div className="mt-10">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;