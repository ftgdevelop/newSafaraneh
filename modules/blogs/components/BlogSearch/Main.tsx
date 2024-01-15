import { NextPage } from "next";
import BlogItem from "../template/BlogItem";
import Sidebar from "../template/Sidebar";
import { useContext, useEffect, useState } from "react";
import { SearchData } from "@/pages/blog/blog-search/[search]";
import { BlogItemType, CategoriesNameType } from "../../types/blog";


const Main: NextPage<any> = () => {
    const Blogs: BlogItemType[] = useContext(SearchData)[0]
    const LastBlogs: BlogItemType[] = useContext(SearchData)[1]
    const CategoriesName: CategoriesNameType[] = useContext(SearchData)[2]
    console.log(Blogs);
    
    let BlogsLength = Blogs?.length


    let listPage :any = []
    useEffect(() => {
        //This is for: how many page we need
            const pages = Math.ceil(BlogsLength / 10)
            for (let i = 1; i <= pages; i++) {
                listPage.push(i)
                setpageNumber(listPage)
            }

    }, [])
    
    const pageclick = (item: number) => {
        if(item == 1) setlist([item - 1 , item + 9])
        else setlist([item * 10 - 10 , item * 10 ])
    }

    const [pageNumber, setpageNumber] = useState<any>([])
    const [list, setlist] = useState<[number , number]>([0 , 10])
    return (
        <div className="grid grid-cols-8 gap-1 max-w-screen-xl m-auto pl-8 pr-8 max-lg:grid-cols-1 max-lg:p-2">
            <div className="col-span-6">
                {
                    Blogs?.slice(list[0] , list[1]).map(blog => <BlogItem data={blog} key={blog.id} />)
                }
                <div className="w-full rounded mt-5 mb-5 " style={{border:'solid 1px rgba(0,0,0,.2)'}}>
                    <ul className="flex justify-center">
                    {
                        pageNumber.map((item: any) => <li key={item} onClick={e => pageclick(item)}
                            className={`p-2 w-10 text-center rounded-3xl m-3 cursor-pointer translation-all duration-300
                            ${item == list[1] / 10 ? 'bg-blue-700 text-white hover:bg-blue-400' : 'hover:bg-gray-200'}`}>
                        {item}
                        </li>)
                    }
                    </ul>
                </div>
            </div>
            <div className="col-span-2 w-full">
                <Sidebar recentBlogs={LastBlogs} CategoriesNames={CategoriesName} SearchItem={true} />
            </div>
        </div>
    )
}

export default Main;
