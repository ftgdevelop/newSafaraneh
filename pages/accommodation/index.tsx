import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getBlogs } from '@/modules/blogs/actions';
import { BlogItemType } from '@/modules/blogs/types/blog';
import { WebSiteDataType } from '@/modules/shared/types/common';
import Head from 'next/head';
import HomeTheme3 from '@/modules/home/components/theme3/HomeTheme3';
import { getStrapiPages } from '@/modules/shared/actions/strapiActions';
import HomeTheme3Accomodation from '@/modules/home/components/theme3/HomeTheme3Accomodation';

const HomeAccommodation: NextPage<{ blogs?: BlogItemType[], portalData?: WebSiteDataType, homeSections: any }> = ({ blogs, portalData, homeSections }) => {

  const logo = portalData?.billing.logo?.value || "";
  const siteName = portalData?.billing.name || "";
  const portalEmailAddress = portalData?.billing.email || "";
  const portalPhoneNumber = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
  const portalAddress = portalData?.billing.address || "";

  const configWebsiteUrl = process.env.SITE_NAME || "";

  const theme3 = process.env.THEME === "THEME3";

  type ModuleItem = "domesticHotel"| "domesticFlight"| "cip" | "accommodation";
  const modules :  ModuleItem[] = [];

  if (process.env.PROJECT_MODULES?.includes("DomesticHotel")){
    modules.push("domesticHotel");
  }
  if (process.env.PROJECT_MODULES?.includes("DomesticFlight")){
    modules.push("domesticFlight");
  }
  if (process.env.PROJECT_MODULES?.includes("CIP")){
    modules.push("cip");
  }
  if (process.env.PROJECT_MODULES?.includes("Accommodation")){
    modules.push("accommodation");
  }


  return (
    <>
      <Head>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:image"
          itemProp="image"
          content="https://cdn2.safaraneh.com/images/home/balon.jpg"
          key="image"
        ></meta>

        <script
          id="script_1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "image": "${logo}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "ایران، تهران",
          "postalCode": "1957644595",
          "streetAddress": "${portalAddress}"
        },
        "email": "${portalEmailAddress?.replace('@', '(at)')}",
        "faxNumber": "(+98) 21 26150054",
        "name": "${siteName}",
        "telephone": "${portalPhoneNumber?.replace('+98', '(+98) ')}(+98) 21 26150051"
      }`,
          }}
        ></script>

        <script
          id="script_2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "${configWebsiteUrl}",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "${configWebsiteUrl}${process.env.LocaleInUrl === "off" ? "" : "/fa"}/accommodations/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }`,
          }}
        ></script>

        <script
          id="script_3"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
        {"@context":"https://schema.org",
          "@type":"FAQPage",
          "mainEntity":[
            {
              "@type":"Question",
              "name":"چگونه با تخفیف‌های همیشگی اقامتگاه رزرو کنیم؟",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"<b> رزرو آنلاین اقامتگاه </b>
                              در سال‌های اخیر جایگزین روش‌های سنتی شده است. سایت هتل بان به عنوان یکی از مهم‌ترین ارائه‌دهندگان خدمات آنلاین گردشگری، امکان رزرو <b> بهترین اقامتگاه‌های ایران </b> را با مناسب‌ترین قیمت و بیشترین تخفیف فراهم کرده است.
                          <br/>
                              در هتل بان می‌توانید به انواع اقامتگاه‌ها از جمله ویلا، سوئیت، خانه روستایی، بوم‌گردی و آپارتمان مبله دسترسی داشته باشید. همچنین اطلاعاتی مانند امکانات، موقعیت مکانی، قوانین اقامتگاه و نظرات کاربران را مشاهده کنید."
              }
            },
            {
              "@type":"Question",
              "name":"مزایای رزرو آنلاین اقامتگاه از هتل بان چیست؟",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"<ul>
                            <li>رزرو اقامتگاه از هتل بان ارزان‌تر از رزرو مستقیم است.</li>
                            <li>
                                <b> رزرو اقامتگاه </b>
                                در هتل بان سریع و آسان است.
                            </li>
                            <li>
                                <b> فرایند رزرو آنلاین </b>
                                بدون صرف وقت و هزینه اضافی انجام می‌شود.
                            </li>
                            <li>
                                امکان رزرو <b> اقامتگاه در سراسر ایران </b> وجود دارد.
                            </li>
                            <li>امکان جستجو بر اساس موقعیت مکانی و امکانات اقامتگاه.</li>
                            <li>دسته‌بندی اقامتگاه‌ها بر اساس قیمت، امتیاز کاربران و تخفیف.</li>
                            <li>نمایش موقعیت اقامتگاه روی نقشه و مشاهده جاذبه‌های اطراف.</li>
                            <li>تصاویر اختصاصی و باکیفیت از اقامتگاه‌ها.</li>
                            <li>بررسی نظرات و تجربیات مهمانان قبلی.</li>
                        </ul>"
              }
            },
            {
              "@type":"Question",
              "name":"رزرو اقامتگاه با بیشترین تخفیف در هتل بان",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"
                          هدف هتل بان ارائه تخفیف‌های ویژه و سهولت رزرو اقامتگاه برای مسافران است. ما تلاش می‌کنیم هزینه‌های سفر شما را کاهش دهیم و بهترین کیفیت خدمات را ارائه کنیم. برخی اقامتگاه‌ها با تضمین بهترین قیمت و تخفیف ویژه قابل رزرو هستند.
                          <br/>
                          برای رزرو هر اقامتگاه می‌توانید قیمت‌ها را مقایسه کنید، تخفیف‌ها را ببینید و با کارشناسان ما در تماس باشید."
              }
            },
            {
              "@type":"Question",
              "name":"مراحل رزرو اقامتگاه در هتل بان چگونه است؟",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"
                          برای <b> رزرو آنلاین اقامتگاه </b> در هتل بان کافیست شهر مقصد و تاریخ ورود و خروج را وارد کنید و با جستجو، لیست اقامتگاه‌های موجود را مشاهده نمایید. سپس با توجه به بودجه و نیاز خود، اقامتگاه مناسب را انتخاب و رزرو کنید. پس از ثبت رزرو، کارشناسان هتل بان با شما تماس می‌گیرند و پس از تایید و پرداخت، رزرو نهایی می‌شود."
              }
            },
            {
              "@type":"Question",
              "name":"رزرو بهترین اقامتگاه‌های ایران",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"
                          هدف هتل بان فراهم کردن امکان <b> رزرو آنلاین بهترین اقامتگاه‌های ایران </b> است. در هتل بان فقط اقامتگاه‌های باکیفیت و دارای خدمات مناسب نمایش داده می‌شوند.
                          <br/>
                          اگر به دنبال رزرو ویلا، سوئیت، خانه روستایی، بوم‌گردی یا آپارتمان مبله هستید، هتل بان همراه مطمئن شماست."
              }
            },
            {
              "@type":"Question",
              "name":"پیگیری رزرو آنلاین اقامتگاه در هتل بان",
              "acceptedAnswer":{
                  "@type":"Answer",
                  "text":"
                          پس از ثبت <b> رزرو اقامتگاه </b> در سایت هتل بان، یک کد پیگیری برای شما ارسال می‌شود. در بخش پیگیری رزرو می‌توانید با وارد کردن شماره موبایل و کد پیگیری، وضعیت رزرو خود را مشاهده کنید. همچنین تمامی مراحل رزرو از طریق پیامک اطلاع‌رسانی می‌شود.
                          <br/>
                          این رسید را به اقامتگاه ارائه دهید و در صورت نیاز، فاکتور را دریافت و چاپ کنید. پشتیبانی هتل بان از ساعت 9 صبح تا 23 شب آماده پاسخگویی به سوالات شماست."
              }
            }
          ]
        }`,
          }}
        />
      </Head>
      
      {!!theme3 && <HomeTheme3Accomodation
        sections={homeSections}
        modules={modules}
        logo={logo}
        siteName={siteName}
        blogs={blogs}
      />}

    </>
  )
}

export const getStaticProps = async (context: any) => {

  const modules = process.env.PROJECT_MODULES?.split(" ") || [];
  if (!modules.includes("Accommodation")) {
    return {
      notFound: true,
    };
  }

  const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
  const strapiTenant = process.env.PROJECT_SERVER_STRAPI_TENANTID;

  const isSafarlife = process.env.PROJECT === "SAFARLIFE";
  const isHotelban = process.env.PROJECT === "HOTELBAN";

  let StrapiQueri1: string = "";
  let StrapiQueri2: string = "";

  if(hasStrapi){
    if(isSafarlife){
      StrapiQueri1 = 'filters[Page][$eq]=home&populate[Sections][populate][Items][populate]=*';
      StrapiQueri2 = 'filters[Page][$eq]=home&populate[Sections][populate]=*';
    }
    if(isHotelban){
      StrapiQueri1 = `filters[Slug][$eq]=home&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate][Items][populate]=*`;
      StrapiQueri2 = `filters[Slug][$eq]=home&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate][Item][populate]=*`;
    }
  }

  const [recentBlogPost, strapiResponse, strapiResponse2] = await Promise.all<any>([
    process.env.PROJECT_MODULES?.includes("Blog") ? await getBlogs({ page: 1, per_page: 4 }) : null,
    StrapiQueri1 ? await getStrapiPages(StrapiQueri1) : undefined,
    StrapiQueri2 ? await getStrapiPages(StrapiQueri2) : undefined
  ]);

  let homeSections : any;

  if(hasStrapi && isSafarlife){
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

  if(hasStrapi && isHotelban){
    
    homeSections = strapiResponse?.data?.data[0]?.attributes?.Sections?.filter((section:any) => section.Keyword !== "top-banners");
    const topBannerSection = strapiResponse2?.data?.data[0]?.attributes?.Sections?.find((section:any) => section.Keyword === "top-banners");
    if(topBannerSection){
      homeSections.push(topBannerSection);
    }

  }

  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'home', 'hotel']),
      context: context,
      blogs: recentBlogPost?.data || null,
      homeSections: homeSections || null
    },
    revalidate: 3600
  })
};

export default HomeAccommodation;