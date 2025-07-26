import { getBlogs, GetCategories, } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NotFound from "@/modules/shared/components/ui/NotFound";
import ArchiveTheme2 from "@/modules/blogs/components/theme2/Archive";
import Archive from "@/modules/blogs/components/shared/Archive";


const BlogList: NextPage<any> = ({ blogsPage, allCategories, pages, recentBlogs, moduleDisabled }:
    { blogsPage?: BlogItemType[], allCategories?: CategoriesNameType[], pages: number, recentBlogs?: BlogItemType[], moduleDisabled?: boolean }) => {

    const theme2 = process.env.THEME === "THEME2";

    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }

    const categories: undefined | {
        label: string;
        link: string;
    }[] = allCategories?.map(item => ({
        label: item.name,
        link: `/blog/category/${item.id}`
    }));

    if (theme2) {

        return (
            <ArchiveTheme2
                categories={categories || []}
                posts={blogsPage}
                recentPosts={recentBlogs?.map(item => ({
                    link: `/blog/${item.slug}`,
                    title: item.title.rendered
                }))}
                pages={pages}
                breadcrumptItems={[{ label: "بلاگ", link: '/blog' }, { label: "جدیدترین مقالات" }]}
                pageTitle="جدیدترین مطالب "
                pageSubtitle="حرفه ای ترین شبکه معرفی هتل های ایران"
            />
        )
    }

    return (
        <Archive
            categories={categories || []}
            posts={blogsPage}
            recentPosts={recentBlogs?.map(item => ({
                link: `/blog/${item.slug}`,
                title: item.title?.rendered,
                imageUrl: item.acf?.image_url_bp || item.images?.medium
            }))}
            pages={pages}
            breadcrumptItems={[{ label: "بلاگ", link: '/blog' }, { label: "جدیدترین مقالات" }]}
            pageTitle="جدیدترین مطالب "
            pageSubtitle="حرفه ای ترین شبکه معرفی هتل های ایران"
            hideExcerpt
        />
    )
}

export default BlogList;


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


    let pageQuery = context.query.page || 1
    const [LastBLogs, blogsPage, Categories] = await Promise.all<any>([
        getBlogs({ page: 1 }),
        getBlogs({ page: +pageQuery }),
        GetCategories()
    ])

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                blogsPage: blogsPage?.data || null,
                pages: LastBLogs?.headers?.['x-wp-totalpages'] || null,
                allCategories: Categories?.data || null,
                recentBlogs: LastBLogs?.data || null
            },

        }
    )

}