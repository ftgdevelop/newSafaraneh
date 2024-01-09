import { NextPage } from "next";
import { getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/NavbarBlog";
import MainBlog from "@/modules/blogs/components/MainBlog";
import CategoryBlog from "@/modules/blogs/components/CategoryBlog";
import SearchBox from "@/modules/blogs/components/SearchBox";
import NewBlog from "@/modules/blogs/components/NewBlog";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";

const Blog: NextPage<null> = () => {
    useEffect(() => {
        const a = () => {
            
        }
    } ,[])
    return (
        <div className="bg-white">
            <NavbarBlog />
            <MainBlog />
            <div className="bg-slate-100">
            <CategoryBlog />
            </div>
            <SearchBox />
            <NewBlog />
        </div>
    )
}


export const getStaticProps = async (context: any) => {

    // const recentBlogPost : any = await getBlogs(4);
  
    return ({
      props: {
        ...await serverSideTranslations(context.locale, ['common', 'home']),
        context: context,
      }
    })
};
  
export default Blog;