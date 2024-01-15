import { NextPage } from "next";
import Image from "next/image";
import RecentBlogSidebar from "./RecentBlogSidebar";
import SidebarSearchBlog from "./SidebarSearchBlog";
import Link from "next/link";

const Sidebar: NextPage<any> = ({ recentBlogs, CategoriesNames , SearchItem }) => {
    console.log(CategoriesNames);
    
    return (
        <div>
            <div className=" border-b-4 border-blue-800">
                <p className="text-white p-2 rounded-md bg-blue-800 inline text-xs">دسته بندی</p>
            </div>
            <div>
                <ul className="divide-y p-1">
                    {
                        CategoriesNames && 
                        CategoriesNames.map((item : any) => 
                            <li key={item.name} className="p-2"><Link href={`/blog/category/${item.id}`}>{item.name}</Link></li>
                        )
                    }
                </ul>
            </div>

            {
                SearchItem && <SidebarSearchBlog />
            }

            <div className="mt-5">
                <div className=" border-b-4 border-blue-800">
                    <p className="p-2 text-white rounded-md bg-blue-800 inline text-xs">جدیدترین مطالب</p>
                </div>
            <div className="divide-y">
                    {
                        recentBlogs &&
                        recentBlogs.map((blog : any) => <RecentBlogSidebar data={blog} /> )
                    }
            </div>
            </div>
            

            <div className="p-1 mt-7">
                <div className=" border-b-4 border-blue-800">
                    <p className="text-xs bg-blue-800 rounded-md inline text-white p-2">پرطرفدارترین هتل های ایران</p>
                </div>
                <div className="mt-6">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
                <div className="mt-2">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
                <div className="mt-2">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;