import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/BlogHome/NavbarBlog";
import Title from "@/modules/blogs/components/BlogList/Titile";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { NextPage } from "next";
import Main from "@/modules/blogs/components/BlogList/Main";
import { createContext } from "react";


export const AllData = createContext<any | null>(null)
const BlogList: NextPage<any> = ({ AllBlog, recentBlogs, categories_name }:
    { AllBlog?: BlogItemType[], recentBlogs?: BlogItemType[], categories_name?: CategoriesNameType[] }) => {
    
    return (
        <div className="bg-white">
            <AllData.Provider value={[ AllBlog, recentBlogs, categories_name ]}>
                <NavbarBlog />
                <Title />
                <Main />
            </AllData.Provider>
        </div>
    )
}

export default BlogList;


export async function getServerSideProps() {

    let recentBlogs : any = await getBlogs(3);
    let AllBlog: any = await getBlogs(100)
    let categories_name : any = await GetCategories()
    return (
        {
            props: {
                AllBlog: AllBlog?.data || null,
                recentBlogs: recentBlogs?.data || null,
                categories_name: categories_name?.data || null
            }
        }
    )
}