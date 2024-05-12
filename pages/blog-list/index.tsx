import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/template/Title";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import NotFound from "@/modules/shared/components/ui/NotFound";


const BlogList: NextPage<any> = ({ blogsPage, categories_name, pages,recentBlogs, moduleDisabled }:
    { blogsPage?: BlogItemType[], categories_name?: CategoriesNameType[] , pages:number,recentBlogs:BlogItemType[] , moduleDisabled?:boolean}) => {

        if (moduleDisabled) {
            return (
                <NotFound />
            )
        }

        return (
            <div className="bg-white">
                <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4"> 
                    <BreadCrumpt items={[{ label: "بلاگ", link: '/blog' }, { label: "جدیدترین مقالات" }]} />
                </div>    
                <Title data={'جدیدترین مطالب'} />
                <Content Blogs={blogsPage} LastBlogs={recentBlogs?.slice(0, 3)} CategoriesName={categories_name} blogPages={pages} />
            </div>
    )
}

export default BlogList;


export async function  getServerSideProps (context: any)  {

    if (!process.env.PROJECT_MODULES?.includes("Blog")) {
        return (
            {
                props: {
                    ...await serverSideTranslations(context.locale, ['common']),
                    moduleDisabled: true
                },
            }
        )
    }


    let pageQuery = context.query.page || 1
    const [ LastBLogs, blogsPage, categories_name] = await Promise.all<any>([
        getBlogs({page: 1}),
        getBlogs({page:+pageQuery}),
        GetCategories()
    ])

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                blogsPage: blogsPage?.data || null,
                pages: LastBLogs?.headers?.['x-wp-totalpages'],
                categories_name: categories_name?.data || null,
                recentBlogs: LastBLogs.data || null
            },

        }
    )

}