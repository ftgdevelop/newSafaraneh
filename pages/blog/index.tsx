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
import Categories from "@/modules/blogs/components/BlogHome/Categories";
import Intro from "@/modules/blogs/components/theme2/blogHome/Intro";
import BlogList from "@/modules/blogs/components/shared/BlogList";
import Link from "next/link";
import { getStrapiMagazine } from "@/modules/shared/actions/strapiActions";
import BlogCarousel from "@/modules/blogs/components/theme2/blogHome/BlogCarousel";
import { LeftCaret } from "@/modules/shared/components/ui/icons";
import BlogGrid from "@/modules/blogs/components/theme2/blogHome/BlogGrid";

type Props = {
    recentPosts?: BlogItemType[];
    cities?: CityItemType[];
    category3?: HomeCategoryItemType[];
    category2?: HomeCategoryItemType[];
    allCategories: CategoriesNameType[];
    portalData: WebSiteDataType;
    moduleDisabled?: boolean;
    magzStrapiData?: BlogItemType[][];
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


    if (theme2) {
        return (
            <>
                <Head>
                    <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName}</title>
                </Head>

                <SearchTheme2 />

                {props.magzStrapiData?.filter(item => item.length).map((item, index) => {
                    const tags: {
                        link: string;
                        label: string;
                    }[] = [];

                    const lastPost = item[0];

                    if (lastPost?.tags?.length && lastPost?.tags_names?.length) {
                        for (let i = 0; i < lastPost.tags.length; i++) {
                            tags.push({
                                label: lastPost.tags_names[i],
                                link: `/blog/tag/${lastPost.tags[i]}`
                            });
                        }
                    }

                    return (
                        <div key={index}>
                            <Intro
                                tags={tags}
                                description={lastPost?.excerpt?.rendered || ""}
                                title={lastPost?.title?.rendered || ""}
                                slug={lastPost?.slug || ""}
                                imageAlt={lastPost?.title?.rendered || ""}
                                imageUrl={lastPost?.images?.large || ""}
                                date={lastPost?.date}
                            />

                            <div className={`${index % 2 ? "md:px-10" : "max-w-container m-auto"} px-5 flex justify-between mb-6 lg:mb-10`} >
                                <h2 className={`text-lg lg:text-4xl font-normal ${index % 2 ? "" : "lg:px-10"}`}> {lastPost?.categories_names?.[0]} </h2>
                                <Link
                                    href={`/blog/category/${lastPost?.categories[0]}`}
                                    className="text-xs text-neutral-500 items-end"
                                >
                                    مشاهده همه مطالب دسته بندی {lastPost?.categories_names?.[0]}
                                    <LeftCaret className="w-4 h-4 fill-current inline-block" />
                                </Link>
                            </div>

                            {index % 2 ? (
                                <BlogCarousel posts={item.slice(1)} />
                            ) : (
                                <BlogGrid posts={item.slice(1)} />
                            )}

                        </div>
                    )
                }
                )}
            </>
        )
    }

    const isHotelban = process.env.PROJECT === "HOTELBAN";

    return (
        <div className="bg-white">

            <Head>
                <title>وبلاگ | حرفه ای ترین شبکه معرفی هتل های ایران | {siteName} </title>
            </Head>

            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4">
                <BreadCrumpt items={[{ label: "بلاگ" }]} />
            </div>

            {!isHotelban && <BlogCities cities={cities} />}

            {!isHotelban && <Categories data3={category3} data2={category2} CategoriesData={allCategories} />}

            <SearchBox />

            {!!recentPosts?.length && (
                <>
                    <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12">
                        <BlogList items={recentPosts} title="جدیدترین مطالب" />
                        <Link href='/blog-list'>
                            <div className="w-full rounded text-center mt-14 relative bottom-5 p-4 hover:bg-gray-100 duration-300 border-gray-200 border-2">
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

    const theme2 = process.env.THEME === "THEME2";
    const hasStrapi = process.env.PROJECT_SERVER_STRAPI;

    const strapiCategories = hasStrapi ? await getStrapiMagazine() : null;

    const categoriyIds = theme2 && hasStrapi ? strapiCategories?.data?.data?.[0]?.attributes?.Items?.map((c: any) => +c.IdCategory) : null;

    const theme2CategoriesPostRes = categoriyIds?.length ? await Promise.all<any>(categoriyIds?.map((x: any) => getBlogs({
        category: x,
        page: 1,
        per_page: 4
    }))) : null;

    const theme2CategoriesPost = theme2CategoriesPostRes?.map(item => item.data);

    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
            recentPosts: recentPosts?.data || null,
            cities: cities?.data?.code ? [] : cities?.data || null,
            category3: category3?.data?.code ? [] : category3?.data || null,
            category2: category2?.data?.code ? [] : category2?.data || null,
            allCategories: Categories?.data?.code ? [] : Categories?.data || null,
            magzStrapiData: theme2CategoriesPost || null
        },
        revalidate: 12 * 60 * 60 //12 Hours
    })
}


export default Blog;