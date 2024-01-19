import NavbarBlog from "@/modules/blogs/components/template/NavbarBlog";
import Title from "@/modules/blogs/components/BlogCategory/Title";
import { NextPage } from "next";
import { GetBlogPostCategory, GetCategories, getBlogs } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { createContext } from "react";
import { useRouter } from "next/router";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export const AllBlogs = createContext<any | null>(null)
const Category: NextPage<any> = ({ LastBlogs, BlogCategory, categories_name }:
    { LastBlogs?: BlogItemType[], BlogCategory?: BlogItemType[], categories_name : CategoriesNameType[] }) => {
    
    
    const query: any = useRouter().query.categoriItem;
    const NavData = categories_name?.find(item => item.id == +query)?.name || null

    return (
        <div className="bg-white">
            <AllBlogs.Provider value={[BlogCategory,LastBlogs, categories_name]} >
            <NavbarBlog data={NavData} />
            <Title />
            <Content Blogs={BlogCategory} LastBlogs={LastBlogs} CategoriesName={categories_name} />
            </AllBlogs.Provider>
        </div>
    )
}

export default Category;


export async function getServerSideProps(context: any) {
    const categoryItem : any = context.query.categoriItem
    let data: any = await getBlogs(3)
    let BlogCategory: any = await GetBlogPostCategory(+categoryItem)
    let categories_name : any = await GetCategories()
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                LastBlogs: data?.data || null,
                BlogCategory: BlogCategory?.data || null,
                categories_name: categories_name?.data || null
            }
        }
    )
}