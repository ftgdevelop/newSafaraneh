import { GetStaticProps, NextPage } from "next";
import { GetBestCategory, GetBestCategory2, GetCategories, GetCities, getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import CategoryBlog from "@/modules/blogs/components/BlogHome/CategoryHomeBlog";
import SearchBox from "@/modules/blogs/components/BlogHome/SearchBox";
import NewBlog from "@/modules/blogs/components/BlogHome/NewBlogItem";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType, CityItemType, HomeCategoryItemType } from "@/modules/blogs/types/blog";
import BlogCities from "@/modules/blogs/components/BlogHome/BlogCities";



const Blog: NextPage<any> = ({ NewBlogs, Cities, Categories , Categories2 ,Categories3}:
    { NewBlogs?: BlogItemType[], Cities?: CityItemType[], Categories?: HomeCategoryItemType[] , Categories2?: HomeCategoryItemType[] ,Categories3:CategoriesNameType[]}) => {
    
    return (
        <div className="bg-white">
            <NavbarBlog />
            <BlogCities data={Cities} />
            <CategoryBlog data={Categories} data2={Categories2} CategoriesData={Categories3} />
            <SearchBox />
            <NewBlog blogs={NewBlogs} />
        </div>
    )
}


export const getStaticProps: GetStaticProps = async (context: any) => {

    const { locale, query } = context;
    
    const [Blogdata, Cities, Categories, Categories2, Categories3] = await Promise.all<any>([
        getBlogs(10),
        GetCities(),
        GetBestCategory(),
        GetBestCategory2(),
        GetCategories(),
    ])
  
    return ({
      props: {
        ...await (serverSideTranslations(context.locale, ['common'])),
        NewBlogs: Blogdata?.data || null,
        Cities: Cities?.data || null,
        Categories: Categories?.data || null,
        Categories2: Categories2?.data || null,
        Categories3: Categories3?.data || null
        },
        revalidate: 60 * 60 * 12 //12 Hours
    })
  }

  
export default Blog;