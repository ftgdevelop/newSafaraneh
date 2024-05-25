import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Banner from '@/modules/home/components/banner'
import ModulesBanner from '@/modules/home/components/modules-banner';
import SuggestedHotels from '@/modules/home/components/SuggestedHotels';
import PopularCities from '@/modules/home/components/PopularCities';
import BeachHotels from '@/modules/home/components/BeachHotels';
import Unknowns from '@/modules/home/components/Unknowns';
import { getBlogs } from '@/modules/blogs/actions';
import RecentBlogs from '@/modules/home/components/RecentBlogs';
import { BlogItemType } from '@/modules/blogs/types/blog';
import AboutSummary from '@/modules/home/components/AboutSummary';
import HomeFAQ from '@/modules/home/components/HomeFAQ';
import Newsletter from '@/modules/home/components/Newsletter';
import Services from '@/modules/home/components/Services';
import { WebSiteDataType } from '@/modules/shared/types/common';
import Head from 'next/head';

const HotelsHomePage: NextPage = ({ blogs, portalData }: { blogs?: BlogItemType[], portalData?: WebSiteDataType }) => {

  const logo = portalData?.billing.logo?.value || "";
  const siteName = portalData?.billing.name || "";
  const portalEmailAddress = portalData?.billing.email || "";
  const portalPhoneNumber = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
  const portalAddress = portalData?.billing.address || "";

  const configWebsiteUrl = process.env.SITE_NAME || "";

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
            "target": "${configWebsiteUrl}/fa/hotels/?q={search_term_string}",
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
      <Banner
        modules={['domesticHotel']}
      />

      <div className='max-w-container mx-auto px-5'>
        <ModulesBanner />
        <SuggestedHotels />
        <PopularCities />
        <BeachHotels />
        <Unknowns />
      </div>

      <div className='max-w-container mx-auto px-5'>
        {blogs ? <RecentBlogs blogs={blogs} /> : <br/>}
        <Services siteName={siteName} />
        <AboutSummary
          logo={logo}
          siteName={siteName}
        />
        <HomeFAQ />
        <Newsletter />
      </div>

    </>
  )
}

export const getStaticProps = async (context: any) => {

  const recentBlogPost: any = process.env.PROJECT_MODULES?.includes("Blog") ? await getBlogs({ page: 1, per_page: 4 }) : null;

  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'home']),
      context: context,
      blogs: recentBlogPost?.data || null
    }
  })
};

export default HotelsHomePage;
