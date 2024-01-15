import { NextPage } from "next";
import { GetBestCategory, GetBestCategory2, GetCategories, GetCities, getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/BlogHome/NavbarBlog";
import CategoryBlog from "@/modules/blogs/components/BlogHome/CategoryHomeBlog";
import SearchBox from "@/modules/blogs/components/BlogHome/SearchBox";
import NewBlog from "@/modules/blogs/components/BlogHome/NewBlogItem";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType, CityItemType, HomeCategoryItemType } from "@/modules/blogs/types/blog";
import { createContext, useState } from "react";
import BlogCities from "@/modules/blogs/components/BlogHome/BlogCities";



const Blog: NextPage<any> = ({ NewBlogs, Cities, Categories , Categories2 ,Categories3}:
    { NewBlogs?: BlogItemType[], Cities?: CityItemType[], Categories?: HomeCategoryItemType[] , Categories2?: HomeCategoryItemType[] ,Categories3:CategoriesNameType[]}) => {
    
    return (
        <div className="bg-white">
            <NavbarBlog />
            <BlogCities data={Cities} />
            <div className="bg-slate-100">
                <CategoryBlog data={Categories} data2={Categories2} CategoriesData={Categories3} />
            </div>
            <SearchBox />
            <NewBlog blogs={NewBlogs} />
        </div>
    )
}



export async function getServerSideProps(context : any) {
    let Blogdata: any = await getBlogs(10)
    let Cities: any = await GetCities()
    let Categories: any = await GetBestCategory()
    let Categories2: any = await GetBestCategory2()
    let Categories3 : any = await GetCategories()
    
    return (
        {
            props: {
                NewBlogs: Blogdata?.data || null,
                Cities: Cities?.data || null,
                Categories: Categories?.data || null,
                Categories2: Categories2?.data || null,
                Categories3 : Categories3?.data || null
            }
        }
    )
}

export default Blog;