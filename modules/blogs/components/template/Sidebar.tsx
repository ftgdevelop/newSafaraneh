import SidebarSearchBlog from "./SidebarSearchBlog";
import Link from "next/link";
import BestHotels from "./SidebarBestHotels";
import Image from "next/image";

type Props = {
    recentBlogs:{
        link: string;
        title: string;
        imageUrl?:string;
    }[]
    categories: {
        label: string;
    link: string;
    }[];
    showSearch?: boolean;
    NotSticky?: boolean
}
const Sidebar: React.FC<Props> = props => {

    const {categories, recentBlogs, NotSticky, showSearch} = props;
    
    return (
        <div className={`${!NotSticky && 'sticky top-5 bottom-5'} w-full max-lg:mt-10`}>
            <div className="border-b-4 border-blue-800">
                <h2 className="text-white p-2 rounded-md bg-blue-800 inline text-xs">دسته بندی</h2>
            </div>
                <ul className="divide-y p-1">
                    {
                        categories?.map(item => 
                            <li key={item.label} className="p-2 text-sm hover:text-blue-800"><Link href={item.link}>{item.label}</Link></li>
                        )
                    }
                </ul>
   
            {
                !!showSearch && <SidebarSearchBlog />
            }

            <div className="mt-5">
                <div className=" border-b-4 border-blue-800">
                    <h2 className="p-2 text-white rounded-md bg-blue-800 inline text-xs">جدیدترین مطالب</h2>
                </div>
            <div className="divide-y">
                    {
                        recentBlogs?.slice(0,3)?.map(blog  => (
                            <div className="mt-3 p-1" key={blog.title}>
                            <Link href={blog.link} className="flex justify-between">
                                <p className="text-xs ml-2 hover:text-blue-800">{blog.title}</p>
                                <Image src={blog.imageUrl || ""} onContextMenu={e => e.preventDefault()}
                                width={120} height={70} alt='pic' className="rounded-md object-cover w-20 h-20"/>
                            </Link>
                        </div>
                        ) )
                    }
            </div>
            </div>
            

            <div className="p-1 mt-4 ">
                <div className="border-b-4 border-blue-800">
                    <h2 className="text-xs bg-blue-800 rounded-md inline text-white p-2">پرطرفدارترین هتل های ایران</h2>
                </div>
                <div className="w-full mt-7">
                <BestHotels />
                </div>    
            </div>
        </div>
    )
}

export default Sidebar;