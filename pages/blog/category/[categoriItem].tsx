import NavbarBlog from "@/modules/blogs/components/HomeBlog/NavbarBlog";
import Main from "@/modules/blogs/components/categoryBlog/Main";
import Title from "@/modules/blogs/components/categoryBlog/Title";
import { NextPage } from "next";
import { GetBlogPostCategory, GetCategories, getBlogs } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { createContext } from "react";
import { useRouter } from "next/router";

export const AllBlogs = createContext<any | null>(null)
const Category: NextPage<any> = ({ LastBlogs, BlogCategory, categories_name }:
    { LastBlogs?: BlogItemType[], BlogCategory?: BlogItemType[], categories_name : CategoriesNameType }) => {
    console.log(useRouter().query.categoriItem);
    
    return (
        <div className="bg-white">
            <AllBlogs.Provider value={[BlogCategory,LastBlogs, categories_name]} >
            <NavbarBlog />
            <Title />
            <Main />
            </AllBlogs.Provider>
        </div>
    )
}

export default Category;


export async function getServerSideProps(contex : any) {
    const categoryItem : any = contex.query.categoriItem
    let data: any = await getBlogs(3)
    let BlogCategory: any = await GetBlogPostCategory(+categoryItem)
    let categories_name : any = await GetCategories()
    return (
        {
            props: {
                LastBlogs: data?.data || null,
                BlogCategory: BlogCategory?.data || null,
                categories_name: categories_name?.data || null
            }
        }
    )
}
