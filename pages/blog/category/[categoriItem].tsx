import { NextPage } from "next";
import { GetCategories, getBlogs } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";
import ArchiveTheme2 from "@/modules/blogs/components/theme2/Archive";
import Archive from "@/modules/blogs/components/shared/Archive";


const Category: NextPage<any> = ({ LastBlogs, BlogCategory, allCategories, pages, portalData, moduleDisabled }:
    { LastBlogs?: BlogItemType[], BlogCategory?: BlogItemType[], allCategories: CategoriesNameType[], pages: string, portalData: WebSiteDataType , moduleDisabled?:boolean}) => {

    const query: any = useRouter().query.categoriItem;
    const CategoryName : string = allCategories?.find(item => item.id == +query)?.name || ""
    const TitleData = BlogCategory?.find((item : any) => item.categories[0] == +query)?.categories_names?.[0]
    const siteName = portalData?.billing.name || "";

    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }

    const theme2 = process.env.THEME === "THEME2";

    const categories: undefined | {
        label: string;
        link: string;
    }[] = allCategories?.map(item => ({
        label: item.name,
        link: `/blog/category/${item.id}`
    }));

    if (theme2) {

        return (
            <>
                <Head>
                    <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
                </Head>
                <ArchiveTheme2
                    categories={categories || []}
                    posts={BlogCategory}
                    recentPosts={LastBlogs?.map(item => ({
                        link: `/blog/${item.slug}`,
                        title: item.title.rendered
                    }))}
                    pages={pages}
                    breadcrumptItems={[{label: "بلاگ" , link : "/blog"}, {label: CategoryName}]}
                    pageTitle={TitleData || ""}
                />
            </>
        )
    }


    
    return (
        <div className="bg-white">
            <Head>
                <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
            </Head>
            <Archive
                categories={categories || []}
                posts={BlogCategory}
                recentPosts={LastBlogs?.map(item => ({
                    link: `/blog/${item.slug}`,
                    title: item.title?.rendered,
                    imageUrl: item.images?.medium
                }))}
                pages={pages}
                breadcrumptItems={[{label: "بلاگ" , link : "/blog"}, {label: CategoryName}]}
                pageTitle={TitleData || ""}
                hideExcerpt
            />
        </div>
    )
}

export default Category;


export async function getServerSideProps(context: any) {

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
    
    const categoryItemQuery: any = context.query.categoriItem
    const pageQuery : any = context.query.page || 1

    const [LastBlog, BlogCategory, categories] = await Promise.all<any>([
        getBlogs({page:1}),
        getBlogs({page:pageQuery,category:categoryItemQuery}),
        GetCategories()
    ])
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                LastBlogs: LastBlog?.data || null,
                pages: BlogCategory?.headers?.['x-wp-totalpages'],
                BlogCategory: BlogCategory?.data || null,
                allCategories: categories?.data || null,
            }
        }
    )
}
