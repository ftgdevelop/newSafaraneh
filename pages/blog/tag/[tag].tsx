import { GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/template/Title";
import { NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Head from "next/head";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";


const Tag: NextPage<any> = ({ TagBlogs, TagName, categories_name, recentBlogs, pages, portalData, moduleDisabled } :
    {TagBlogs : BlogItemType[] , TagName:any , categories_name:CategoriesNameType[], recentBlogs: BlogItemType[],pages:string , portalData: WebSiteDataType, moduleDisabled?: boolean;}) => {
    
        if (moduleDisabled) {
            return (
                <NotFound />
            )
        }

    const tagname: string = TagName?.name || ''
    const siteName = portalData?.billing.name || "";
    
    return (
        <div className="bg-white">
            <Head>
            <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
            </Head>
            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4">
                <BreadCrumpt items={[{ label: "بلاگ", link: "/blog" }, { label: tagname }]} />
            </div>
                <Title data={TagName?.name} />
                <Content Blogs={TagBlogs} blogPages={pages}  LastBlogs={recentBlogs?.slice(0,3)} CategoriesName={categories_name}  />
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

    const [TagName, TagBlogs, categories_name, recentBlogs] = await Promise.all<any>([
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
            categories_name: categories_name?.data || null
        }
    })
}