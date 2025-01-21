import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getBlogs } from '@/modules/blogs/actions';
import { BlogItemType } from '@/modules/blogs/types/blog';
import { WebSiteDataType } from '@/modules/shared/types/common';
import Head from 'next/head';
import HomeTheme1 from '@/modules/home/components/theme1/HomeTheme1';
import HomeTheme2 from '@/modules/home/components/theme2/HomeTheme2';
import HomeTheme3 from '@/modules/home/components/theme3/HomeTheme3';
import { getStrapiPages } from '@/modules/shared/actions/strapiActions';

const Home: NextPage<{ blogs?: BlogItemType[], portalData?: WebSiteDataType, homeSections: any }> = ({ blogs, portalData, homeSections }) => {

  const logo = portalData?.billing.logo?.value || "";
  const siteName = portalData?.billing.name || "";
  const portalEmailAddress = portalData?.billing.email || "";
  const portalPhoneNumber = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
  const portalAddress = portalData?.billing.address || "";

  const configWebsiteUrl = process.env.SITE_NAME || "";

  const theme1 = process.env.THEME === "THEME1";
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";

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
            "target": "${configWebsiteUrl}${process.env.LocaleInUrl === "off" ? "" : "/fa"}/hotels/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }}`,
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
                    "name":"چگونه با تخفیف‌های همیشگی هتل رزرو کنیم؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"<b> رزرو آنلاین هتل </b>
                                    چند سالی است که جایگزین روش‌های سنتی رزرو شده است. در همین راستا سایت سفرانه (آژانس مسافرتی سفرانه مشرق زمین) به عنوان یکی از مهم‌ترین نقش‌آفرینان عرصه خدمات آنلاین گردشگری، واسطه‌ها را حذف کرده و آماده ارائه خدمات رزرواسیون
                                    <b> بهترین هتل های تهران </b>
                                    و ایران با مناسب‌ترین قیمت و بیشترین تخفیف است.
                                <br/>
                                    در سفرانه امکان دسترسی به
                                    <b> بهترین هتل های ایران </b>
                                    از هتل 5 ستاره الی 1 ستاره؛ از هتل لوکس، هتل آپارتمان، بوتیک هتل تا اقامتگاه سنتی (هتل سنتی) را دارید. علاوه بر این موارد، در این سامانه اطلاعاتی مانند امکانات هتل، موقعیت جغرافیایی روی نقشه، ستاره‌های هتل، تجربه اقامتی، قوانین هتل و امتیاز کاربران به یک هتل خاص را یکجا می‌توانید ملاحظه بفرمایید."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"مزایای رزرو آنلاین هتل از سفرانه چیست؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"<ul>
                                  <li>رزرو هتل از سفرانه ارزان‌تر از رزرو مستقیم از خود هتل است.</li>
                                  <li>
                                      <b> رزرو هتل </b>
                                      در سفرانه راحت و سریع است.
                                  </li>
                                  <li>
                                      <b> فرایند رزرو آنلاین </b>
                                      هتل در سفرانه بدون هیچ‌گونه صرف وقت و هزینه‌های جانبی انجام می‌شود.
                                  </li>
                                  <li>
                                      در سفرانه امکان رزرو
                                      <b> هتل های تمام شهرهای ایران </b>
                                      را دارید.
                                  </li>
                                  <li>در سفرانه امکان جست و جوی هتل براساس موقعیت مکانی روی نقشه و ستاره‌های هتل را دارید.</li>
                                  <li>در قسمت جستجوی هتل می‌توانید هتل را بر اساس کمترین و یا بیشترین قیمت، امتیاز کاربران و بیشترین تخفیف دسته بندی کنید.</li>
                                  <li>در سفرانه موقعیت جغرافیایی هر هتل را بر روی نقشه گوگل با جزئیات و جاهای دیدنی اطراف مشاهده می‌کنید.</li>
                                  <li>
                                      تصاویر هتل‌ها به طور اختصاصی توسط سفرانه تهیه شده‌اند که با کیفیت‌ترین تصاویر از موقعیت بیرونی و داخلی هتل در بین تمامی وبسایت‌های
                                      <b> رزرو آنلاین هتل </b>
                                      هستند.
                                  </li>
                                  <li>در صفحه هر هتل، عکس هر واحد اقامتی به طور اختصاصی رو به روی آن نمایش داده می‌شود.</li>
                                  <li>در سفرانه امکان بررسی نظرات و تجربیات مهمانان سابق هتل ها وجود دارد.</li>
                              </ul>"
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"رزرو هتل با بیشترین تخفیف در سفرانه",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                تخفیف رزرو آنلاین هتل و سهولت رزرو از اهداف مهم سفرانه و در راستای خدمت رسانی به مشتاقان سفرهای داخلی است. ما در اینجا تمام تلاشمان را می‌کنیم تا هزینه‌های سفر شما را کاهش دهیم و از طرفی موجبات ارتقاء کیفیت خدمات رسانی را فراهم آوریم. در همین راستا برخی از هتلها از جمله
                                <b> هتل آزادی تهران و هتل استقلال تهران </b>
                                (برای شرکت‌ها و سازمان‌ها) با گارانتی سفرانه و تضمین بهترین قیمت قابل رزرو هستند.
                                <br/>
                                برای رزرو هریک از هتل‌ها می‌توانید قیمت ها را مقایسه کنید، تخفیف ها را مشاهده کنید و با کارشناسان رزرواسیون ما در تماس باشید."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"مراحل رزرو هتل در سفرانه به چه صورت است؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                برای
                                <b> رزرو آنلاین هتل </b>
                                در سفرانه از لحظه انتخاب بهترین هتل تا دریافت واچر تنها به اندازه چند کلیک ساده زمان نیاز دارید. کافیست در قسمت جست‌وجو نام شهر مورد نظر و تاریخ ورود و خروجتان را وارد کنید و با زدن دکمه جستجو وارد صفحه رزرو آنلاین هتل‌های همان شهر ‌شوید. در این قسمت قیمت‌ها و تخفیف‌ها را مشاهده کنید و متناسب با بودجه و بازه زمانی مدنظرتان رزرو هتل را انجام بدهید. البته فیلترهای جستجو مانند فیلتر قیمت، ستاره هتل‌، امکانات، امتیاز مهمانان و نوع اقامتگاه شما را برای رسیدن به هتل هدفتان یاری می‌کنند.
                                <br/>
                                بعد از ثبت رزرو، کارشناسان سفرانه با شما تماس می‌گیرند و بعد از کسب رضایت و پرداخت آنلاین هزینه اقامت از سمت شما، رزرو هتل را برای شما نهایی می‌کنند."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"رزرو بهترین هتل داخلی",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                فراهم کردن
                                <b> رزرو آنلاین بهترین </b>
                                هتل‌های ایران رسالتی است که سفرانه به خوبی آن را در راس اهداف کاری خود قرار داده است. در سفرانه خبری از هتل بی‌کیفیت و خدمات رسانی ضعیف نیست!
                                <br/>
                                پس اگر به دنبال رزرو هتل لوکس،
                                <b> بهترین هتل های تهران، بهترین هتل‌های مشهد، بهترین هتل‌های اصفهان، بهترین هتل های کیش، بهترین هتل‌های شیراز، بهترین هتل های قشم </b>
                                و غیره هستید سفرانه همراه بسیار خوبی برای شماست."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"پیگیری رزرو آنلاین هتل در سفرانه",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                بعد از ثبت
                                <b> رزرو هتل </b>
                                در سایت سفرانه یک کد پیگیری 6 رقمی به شماره موبایل و یا ایمیل شماره ارسال می‌شود. در قسمت پیگیری رزرو در قسمت بالای سایت می‌توانید با وارد کردن شماره موبایل و کدپیگیری وضعیت رزرو آنلاین را مشاهده بفرمایید. ضمن اینکه تمامی مراحل پیشروی ثبت رزرو از طریق پیامک به مسافران اطلاع‌رسانی می‌شود.
                                <br/>
                                همین قسمت را به عنوان رسید (واچر) به هتل ارائه بدهید و اگر نیاز به فاکتور داشتید آن را پرینت گرفته و به اداره و یا سازمان (دولتی/ خصوصی) مد نظرتان تحویل دهید. پشتیبانی رزرو آنلاین هتل در سفرانه از ساعت 9 صبح تا 23 شب آماده پاسخگویی به تمامی سوالات و ابهامات شما در رابطه با فرایند رزرو است."
                    }
                  }
                ]
              }`,
          }}
        />
      </Head>

      {!!theme1 && <HomeTheme1
        sections={homeSections}
        modules={["domesticHotel"]}
        logo={logo}
        siteName={siteName}
        blogs={blogs}
      />}

      {!!theme2 && <HomeTheme2
        sections={homeSections}
        modules={["domesticHotel"]}
        logo={logo}
        siteName={siteName}
        blogs={blogs}
      />}

      {!!theme3 && <HomeTheme3
        modules={["domesticHotel"]}
        logo={logo}
        siteName={siteName}
        blogs={blogs}
      />}

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
    process.env.PROJECT_MODULES?.includes("Blog") ? await getBlogs({ page: 1, per_page: theme2 ? 5 : 4 }) : null,
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

export default Home;
