import { GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import Head from "next/head";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";
import ArchiveTheme2 from "@/modules/blogs/components/theme2/Archive";
import Archive from "@/modules/blogs/components/shared/Archive";


const Tag: NextPage<any> = ({ TagBlogs, TagName, allCategories, recentBlogs, pages, portalData, moduleDisabled } :
    {TagBlogs : BlogItemType[] , TagName:any , allCategories:CategoriesNameType[], recentBlogs: BlogItemType[],pages:string , portalData: WebSiteDataType, moduleDisabled?: boolean;}) => {
    
        if (moduleDisabled) {
            return (
                <NotFound />
            )
        }

    const tagname: string = TagName?.name || ''
    const siteName = portalData?.billing.name || "";
    

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
                    posts={TagBlogs}
                    recentPosts={recentBlogs?.map(item => ({
                        link: `/blog/${item.slug}`,
                        title: item.title.rendered
                    }))}
                    pages={pages}
                    breadcrumptItems={[{ label: "بلاگ", link: "/blog" }, { label: tagname }]}
                    pageTitle={TagName?.name}
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
                posts={TagBlogs}
                recentPosts={recentBlogs?.map(item => ({
                    link: `/blog/${item.slug}`,
                    title: item.title?.rendered,
                    imageUrl: item.images?.medium
                }))}
                pages={pages}
                breadcrumptItems={[{ label: "بلاگ", link: "/blog" }, { label: tagname }]}
                pageTitle={TagName?.name}
                hideExcerpt
            />
        </div>
    )
}


export default Tag;


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

    let tag = context.query.tag;
    const pageQuery = context.query.page || 1

    const [TagName, TagBlogs, categories, recentBlogs] = await Promise.all<any>([
        GetTagName(+tag),
        getBlogs({page:pageQuery ,tags:tag}),
        GetCategories(),
        getBlogs({page:1})
    ])
    
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
            TagName: TagName?.data || null,
            TagBlogs: TagBlogs?.data || null,
            pages: TagBlogs?.headers?.['x-wp-totalpages'],
            recentBlogs: recentBlogs?.data || null,
            allCategories: categories?.data || null
        }
    })
}