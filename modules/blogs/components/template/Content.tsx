import { NextPage } from "next";
import BlogItem from "../template/BlogItem";
import Sidebar from "../template/Sidebar";
import { BlogItemType, CategoriesNameType } from "../../types/blog";
import { useRouter } from "next/router";
import Pagination from "./Pagination";

interface Props {
    Blogs?: any,
    LastBlogs?: BlogItemType[],
    CategoriesName?: CategoriesNameType[],
    blogPages:any
}


const Content: NextPage<Props> = ({Blogs,LastBlogs,CategoriesName,blogPages}) => {   

    return (
        <div className="grid grid-cols-8 gap-5 max-w-container m-auto p-5 max-sm:p-2 max-sm: max-lg:grid-cols-1">
            <div className="col-span-6">
                {
                    Blogs && blogPages ?
                    Blogs?.map((blog : any , index : number ) => <BlogItem data={blog} key={blog.id} index={index} /> ): <p>loading</p>
                }
                <Pagination perPage={blogPages} blogs={Blogs} />
            </div>
            <div className="col-span-2 max-lg:col-span-6" >
                <Sidebar recentBlogs={LastBlogs} CategoriesNames={CategoriesName}
                    SearchItem={useRouter().pathname == "/blog-list" || useRouter().query.search ? true : false} />
            </div>

        </div>
    )
}

export default Content;
