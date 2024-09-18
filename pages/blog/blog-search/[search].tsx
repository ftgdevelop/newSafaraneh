import {  GetCategories, getBlogs } from "@/modules/blogs/actions";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import Head from "next/head";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";
import ArchiveTheme2 from "@/modules/blogs/components/theme2/Archive";
import Archive from "@/modules/blogs/components/shared/Archive";

const Search: NextPage<any> = ({ SearchBlog, LastBlogs, allCategories, pages, portalData, moduleDisabled }:
    {SearchBlog: BlogItemType[], LastBlogs:BlogItemType[], allCategories:CategoriesNameType[],pages:string, portalData: WebSiteDataType , moduleDisabled?: boolean}) => {

    const SearchValue = useRouter().query.search
    const siteName = portalData?.billing.name || "";
    
    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }
    
    const theme2 = process.env.THEME === "THEME2";

    const categories : undefined | {
        label: string;
        link: string;
    }[] = allCategories?.map(item => ({
        label: item.name,
        link: `/blog/category/${item.id}`
    }));

    if (theme2){       

        return (
            <>
                <Head>
                    <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
                </Head>
                <ArchiveTheme2
                    categories={categories || []}
                    posts={SearchBlog}
                    recentPosts={LastBlogs?.map(item => ({
                        link: `/blog/${item.slug}`,
                        title: item.title.rendered
                    }))}
                    pages={pages}
                    breadcrumptItems={[{ label: "بلاگ", link: "/blog" }, { label: `جستجوی"${SearchValue}"` }]}
                    pageTitle="جستجوی"
                    pageSubtitle={`"${SearchValue}"`}
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
                posts={SearchBlog}
                recentPosts={LastBlogs?.map(item => ({
                    link: `/blog/${item.slug}`,
                    title: item.title?.rendered,
                    imageUrl: item.images?.medium
                }))}
                pages={pages}
                breadcrumptItems={[{ label: "بلاگ", link: "/blog" }, { label: `جستجوی"${SearchValue}"` }]}
                pageTitle="جستجوی"
                pageSubtitle={`"${SearchValue}"`}
                hideExcerpt
            />

        </div>
    )
}

export default Search;


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

    const searchQuery = context.query.search;
    const pageQuery = context.query.page || 1

    const [SearchBlog, categories, recentBlogs] = await Promise.all<any>([
        getBlogs({page:pageQuery , search: searchQuery}),
        GetCategories(),
        getBlogs({page:1})
    ])
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
            allCategories: categories?.data || null,
            LastBlogs: recentBlogs?.data || null,
            pages: SearchBlog?.headers?.['x-wp-totalpages'],
            SearchBlog : SearchBlog?.data || null
        }
    })
    
}