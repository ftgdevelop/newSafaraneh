import { GetStaticProps, NextPage } from "next";
import { GetBestCategoryById, GetCategories, GetCities, getBlogs } from "@/modules/blogs/actions";
import SearchBox from "@/modules/blogs/components/BlogHome/SearchBox";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType, CityItemType, HomeCategoryItemType } from "@/modules/blogs/types/blog";
import BlogCities from "@/modules/blogs/components/BlogHome/BlogCities";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Head from "next/head";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";
import SearchTheme2 from "@/modules/blogs/components/theme2/shared/SearchTheme2";
import CategoriesTheme2 from "@/modules/blogs/components/theme2/blogHome/Categories";
import Categories from "@/modules/blogs/components/BlogHome/Categories";
import Intro from "@/modules/blogs/components/theme2/blogHome/Intro";
import BlogListTheme2 from "@/modules/blogs/components/theme2/shared/BlogList";
import Button from "@/modules/shared/components/ui/Button";
import BlogList from "@/modules/blogs/components/shared/BlogList";
import Link from "next/link";

type Props = {
    recentPosts?: BlogItemType[];
    cities?: CityItemType[];
    category3?: HomeCategoryItemType[];
    category2?: HomeCategoryItemType[];
    allCategories: CategoriesNameType[];
    portalData: WebSiteDataType;
    moduleDisabled?: boolean;
}

const Blog: NextPage<Props> = (props) => {

    const { allCategories, portalData, category2, category3, cities, moduleDisabled, recentPosts } = props;

    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }

    const siteName = portalData?.billing?.name || "";

    const theme2 = process.env.THEME === "THEME2";

    const categoriesDetail: HomeCategoryItemType[] = [];
    if (category2?.length) {
        categoriesDetail.push(...category2);
    }
    if (category3?.length) {
        categoriesDetail.push(...category3);
    }

    const categories: {
        title: string;
        imageUrl: string;
        id: number
    }[] = allCategories?.map(c => {
        const categoryImage = categoriesDetail.find(item => item.title.rendered && item.title.rendered === c.name)?.images?.large;
        return ({
            id: c.id,
            title: c.name,
            imageUrl: categoryImage || ""
        })
    });


    if (theme2) {
        return (
            <>
                <Head>
                    <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
                </Head>

                <SearchTheme2 />

                <Intro />

                <CategoriesTheme2 categories={categories} />

                {!!recentPosts?.length &&
                    <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12">
                        <BlogListTheme2 items={recentPosts} title="مطالب جدید" />
                    </section>
                }

                <div className="text-center my-14">
                    <Button
                        prefetch={false}
                        href='/blog-list'
                        className="w-60 h-10 mx-auto"
                    >
                        مشاهده مطالب بیشتر
                    </Button>
                </div>

            </>
        )
    }

    return (
        <div className="bg-white">

            <Head>
                <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName} </title>
            </Head>
            
            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4">
                <BreadCrumpt items={[{ label: "بلاگ" }]} />
            </div>
            
            <BlogCities cities={cities} />
        
            <Categories data3={category3} data2={category2} CategoriesData={allCategories} />

            <SearchBox />

            {!!recentPosts?.length && (
                <>
                    <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12">
                        <BlogList items={recentPosts} title="جدیدترین مطالب" />
                        <Link href='/blog-list'>
                            <div  className="w-full rounded text-center mt-14 relative bottom-5 p-4 hover:bg-gray-100 duration-300 border-gray-200 border-2">
                                مشاهده مطالب بیشتر
                            </div>
                        </Link>
                    </section>
                </>
            )}

        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context: any) => {

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

    const [recentPosts, cities, category3, category2, Categories] = await Promise.all<any>([
        getBlogs({ page: 1 }),
        GetCities(),
        GetBestCategoryById(3),
        GetBestCategoryById(2),
        GetCategories(),
    ])

    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
            recentPosts: recentPosts?.data || null,
            cities: cities?.data?.code ? [] : cities?.data || null,
            category3: category3?.data?.code ? [] : category3?.data || null,
            category2: category2?.data?.code ? [] : category2?.data || null,
            allCategories: Categories?.data?.code ? [] : Categories?.data || null
        },
        revalidate: 12 * 60 * 60 //12 Hours
    })
}


export default Blog;