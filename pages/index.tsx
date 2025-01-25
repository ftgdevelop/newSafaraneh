import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetBestCategoryById, getBlogs, GetCategories, GetCities } from '@/modules/blogs/actions';
import { BlogItemType, CategoriesNameType, CityItemType, HomeCategoryItemType } from '@/modules/blogs/types/blog';
import { WebSiteDataType } from '@/modules/shared/types/common';
import Head from 'next/head';
import HomeTheme1 from '@/modules/home/components/theme1/HomeTheme1';
import HomeTheme2 from '@/modules/home/components/theme2/HomeTheme2';
import HomeTheme3 from '@/modules/home/components/theme3/HomeTheme3';
import { getStrapiPages } from '@/modules/shared/actions/strapiActions';
import AboutSummary from '@/modules/home/components/AboutSummary';
import HomeFAQ from '@/modules/home/components/HomeFAQ';
import BlogCities from '@/modules/blogs/components/BlogHome/BlogCities';
import Categories from '@/modules/blogs/components/BlogHome/Categories';
import SearchBox from '@/modules/blogs/components/BlogHome/SearchBox';
import BlogList from '@/modules/blogs/components/shared/BlogList';
import Link from 'next/link';

type Props = {
  recentPosts?: BlogItemType[];
  cities?: CityItemType[];
  category3?: HomeCategoryItemType[];
  category2?: HomeCategoryItemType[];
  allCategories: CategoriesNameType[];
  homeSections: any

  portalData: WebSiteDataType;
}

const Home: NextPage<Props> = props => {

  const { portalData, cities, category2, category3, allCategories, recentPosts } = props;

  const logo = portalData?.billing.logo?.value || "";
  const siteName = portalData?.billing.name || "";
  const portalEmailAddress = portalData?.billing.email || "";
  const portalPhoneNumber = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
  const portalAddress = portalData?.billing.address || "";

  const configWebsiteUrl = process.env.SITE_NAME || "";


  return (
    <>
      <div className='bg-white'>
        <div className='max-w-container mx-auto px-5'>
          <BlogCities cities={cities} />
        </div>
      </div>

      <div className='bg-slate-100'>

        <div className='max-w-container mx-auto px-5'>
          <Categories data3={category3} data2={category2} CategoriesData={allCategories} />
        </div>

      </div>

      <div className='bg-white'>
      <div className='max-w-container mx-auto px-5 pt-10'>

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

          <AboutSummary
            logo={logo}
            siteName={siteName}
            strapiContent={props.homeSections?.find((item: any) => item.Keyword === "about-section")?.Body}
          />

        </div>
      </div>
    </>
  )
}

export const getStaticProps = async (context: any) => {

  const theme2 = process.env.THEME === "THEME2";

  const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
  const strapiTenant = process.env.PROJECT_SERVER_STRAPI_TENANTID;

  const isSafarlife = process.env.PROJECT === "SAFARLIFE";
  const isHotelban = process.env.PROJECT === "HOTELBAN";

  let StrapiQueri1: string = "";
  let StrapiQueri2: string = "";

  if (hasStrapi) {
    if (isSafarlife) {
      StrapiQueri1 = 'filters[Page][$eq]=home&populate[Sections][populate][Items][populate]=*';
      StrapiQueri2 = 'filters[Page][$eq]=home&populate[Sections][populate]=*';
    }
    if (isHotelban) {
      StrapiQueri1 = `filters[Slug][$eq]=home&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate][Items][populate]=*`;
      StrapiQueri2 = `filters[Slug][$eq]=home&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate][Item][populate]=*`;
    }
  }

  const [strapiResponse, strapiResponse2, recentPosts, cities, category3, category2, Categories] = await Promise.all<any>([
    StrapiQueri1 ? await getStrapiPages(StrapiQueri1) : undefined,
    StrapiQueri2 ? await getStrapiPages(StrapiQueri2) : undefined,
    getBlogs({ page: 1 }),
    GetCities(),
    GetBestCategoryById(3),
    GetBestCategoryById(2),
    GetCategories(),
  ]);

  let homeSections: any;

  if (hasStrapi && isSafarlife) {
    const link_banner_data = strapiResponse2?.data?.data[0]?.attributes?.Sections.find((section: any) => section.Keyword === "link_banner")?.Image;
    const main_banner_data = strapiResponse2?.data?.data[0]?.attributes?.Sections.find((section: any) => section.Keyword === "main_banner")?.Image;
    homeSections = strapiResponse?.data?.data[0]?.attributes?.Sections;
    const strapi_generalData_link_banner_data = homeSections?.find((section: any) => section.Keyword === "link_banner");
    const strapi_generalData_main_banner_data = homeSections?.find((section: any) => section.Keyword === "main_banner");

    if (link_banner_data && strapi_generalData_link_banner_data) {
      strapi_generalData_link_banner_data.Image = link_banner_data;
    }
    if (main_banner_data && strapi_generalData_main_banner_data) {
      strapi_generalData_main_banner_data.Image = main_banner_data;
    }
  }

  if (hasStrapi && isHotelban) {

    homeSections = strapiResponse?.data?.data[0]?.attributes?.Sections?.filter((section: any) => section.Keyword !== "top-banners");
    const topBannerSection = strapiResponse2?.data?.data[0]?.attributes?.Sections?.find((section: any) => section.Keyword === "top-banners");
    if (topBannerSection) {
      homeSections.push(topBannerSection);
    }

  }

  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'home', 'hotel']),
      context: context,
      homeSections: homeSections || null,
      recentPosts: recentPosts?.data || null,
      cities: cities?.data?.code ? [] : cities?.data || null,
      category3: category3?.data?.code ? [] : category3?.data || null,
      category2: category2?.data?.code ? [] : category2?.data || null,
      allCategories: Categories?.data?.code ? [] : Categories?.data || null,
    },
    revalidate: 3600
  })
};

export default Home;
