import Title from "@/modules/blogs/components/template/Title";
import { NextPage } from "next";
import { GetCategories, getBlogs } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { useRouter } from "next/router";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Head from "next/head";
import { PortalDataType } from "@/modules/shared/types/common";


const Category: NextPage<any> = ({ LastBlogs, BlogCategory, categories_name, pages, portalData }:
    { LastBlogs?: BlogItemType[], BlogCategory?: BlogItemType[], categories_name: CategoriesNameType[], pages: string, portalData: PortalDataType }) => {
    
    
    const query: any = useRouter().query.categoriItem;
    const CategoryName : string = categories_name?.find(item => item.id == +query)?.name || ""
    const TitleData = BlogCategory?.find((item : any) => item.categories[0] == +query)?.categories_names?.[0]
    const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";

    return (
        <div className="bg-white">
            <Head>
            <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
            </Head>
            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4">
            <BreadCrumpt items={[{label: "بلاگ" , link : "/blog"}, {label: CategoryName}]} />
            </div>
            <Title data={TitleData} />
            <Content Blogs={BlogCategory} blogPages={pages}  LastBlogs={LastBlogs?.slice(0,3)} CategoriesName={categories_name} />
        </div>
    )
}

export default Category;


export async function getServerSideProps(context: any) {
    const categoryItemQuery: any = context.query.categoriItem
    const pageQuery : any = context.query.page || 1

    const [LastBlog, BlogCategory, categories_name] = await Promise.all<any>([
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
                categories_name: categories_name?.data || null,
            }
        }
    )
}
