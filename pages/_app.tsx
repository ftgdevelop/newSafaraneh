import { i18n } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';

import '../styles/carousel.scss';
import '../styles/mobiscroll.scss';
import '../styles/globals.scss';
import '../styles/leaflet.css';
// import '../styles/modernDatePicker.scss';

import { store } from '../modules/shared/store';
import { FooterStrapi, GetPageByUrlDataType, WebSiteDataType } from '@/modules/shared/types/common';
import { getPortal } from '@/modules/shared/actions/portalActions';
import Layout from '@/modules/shared/components/layout';
import { GTM_ID } from '@/modules/shared/helpers';
import { getPageByUrl } from '@/modules/shared/actions';
import { getStrapiFooter } from '@/modules/shared/actions/strapiActions';

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  portalData?: WebSiteDataType;
  pageData?: GetPageByUrlDataType;
  footerStrapiData?: FooterStrapi;
};

function MyApp({ Component, pageProps, portalData, pageData, footerStrapiData }: TProps) {
  const router = useRouter();

  const { locale } = router;
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    i18n?.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  useEffect(() => {
    const locale = localStorage.getItem("publicLocale");
    if (locale) {
      router.push(router.asPath, router.asPath, { locale: locale });
    }
  }, []);

  useEffect(()=>{
    const fetchh = async () => {
      const res = await  getPortal("fa-IR");
      if (res){
      }
    }
    fetchh();

  },[]);

  const tel = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
  const emergencyNumber = portalData?.billing.emergencyNumber || "";
  const email = portalData?.billing?.email;
  const instagram = portalData?.social?.instagram || "";
  const facebook = portalData?.social?.facebook || "";
  const linkedin = portalData?.social?.linkedin || "";
  const twitter = portalData?.social?.x || "";

  const logo = portalData?.billing.logo?.value ||"";
  const siteName = portalData?.billing.name || "";
  const favIconLink = portalData?.billing.favIcon?.value || "";

  const portalTitle = portalData?.website?.title || "";
  const portalKeywords = portalData?.metaTags?.keyword || "";
  const portalDescription = portalData?.metaTags?.description || "";

  const portalAuthor = portalData?.metaTags.author || "";
  const portalCreator = portalData?.metaTags.creator || "";

  const pageTitle = pageData?.pageTitle?.replaceAll("{0}", siteName) || "";
  const pageDescription = pageData?.metaDescription?.replaceAll("{0}", siteName) || "";
  const pageKeywords = pageData?.metaKeyword?.replaceAll("{0}", siteName) || "";

  const title = pageTitle || portalTitle;
  const description = pageDescription || portalDescription;
  const keywords = pageKeywords || portalKeywords; 
  
  const portalEnamadMetaTag = portalData?.metaTags?.enamad || "";
  const enamad = portalData?.website?.enamad || "";
  const samandehi = portalData?.website?.samandehi || "";
  const scripts = portalData?.website?.scripts || "";

  let canonicalUrl = "";
  let envSiteName = process.env.SITE_NAME;
  let urlLocalePart = i18n?.language ? `/${i18n?.language}` : "";

  if(process.env.LocaleInUrl === "off"){
    urlLocalePart = "";
  }

  if (process.env.SITE_NAME?.includes("iranhotel")){
    envSiteName = "https://www.iranhotel.app"
  }

  if(typeof router !== 'undefined'){
    if (router.route === '/hotels/[...hotelList]'){
      canonicalUrl = "";
    }else if (router.route === '/hotel/[...hotelDetail]'){
      canonicalUrl = envSiteName + urlLocalePart + (router.query.hotelDetail ? "/hotel/"+router.query.hotelDetail[0] : "");
    }else if (router.route === '/flights/[flights]'){
      canonicalUrl = envSiteName + urlLocalePart + (router.query.flights ? "/flights/"+router.query.flights : "");
    }else{

      let path = router.asPath;
      if (path[path.length-1] === "/"){
        path = path.substring(0, path.length - 1);
      }
      canonicalUrl = envSiteName + urlLocalePart + path
    }
  }
  return (
    <Provider store={store}>
      <Head>

        {/* _-_-_S_T_A_R_T_-_-_ delete when mobiscroll is activated */}
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
        /> */}
        {/* _-_-_E_N_D_-_-_ delete when mobiscroll is activated */}

        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0a438b" />
        <meta charSet="utf-8" />

        {!!portalAuthor && <meta name="author" content={portalAuthor} />}
        {!!portalCreator && <meta name="creator" content={portalCreator} />}

        <meta name="copyright" content="safaraneh.com" />
        <meta name="cache-control" content="cache" />
        <meta name="content-language" content="fa" />
        <meta name="content-type" content="text/html;UTF-8" />
        <meta name="DC.Language" content="fa" />
        <meta name="DC.Type" content="Text,Image" />
        <meta name="DC.Creator" content="safaraneh.com" />
        <meta name="rating" content="General" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#0a438b"
        />
        <meta
          httpEquiv="content-type"
          content="text/html; charset=UTF-8"
        />

        {canonicalUrl && <link rel="canonical" href={canonicalUrl } /> }

        <meta
          name="google-site-verification"
          content="dL12BD7zy5YUBkz4xPLy-hKkz1PPUyStFEiXgJks_h0"
        />

        <link rel="shortcut icon" href={favIconLink} />

        {!!title && <title>{title}</title>}
        {!!keywords && <meta name="keywords" content={keywords} />}
        {!!description && <meta name="description" content={description} />}

        {!!portalEnamadMetaTag && <meta name='enamad' content={portalEnamadMetaTag} />}

      </Head>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <Layout
        contactInfo={
          {
            tel: tel,
            emergencyNumber:emergencyNumber,
            instagram: instagram,
            linkedin: linkedin,
            twitter: twitter,
            facebook: facebook,
            emailAddress: email
          }
        }
        logo={logo}
        siteName={siteName}
        enamad={enamad}
        samandehi={samandehi}
        scripts={scripts}
        footerStrapi={footerStrapiData}
      >

        <Component {...pageProps} portalData={portalData} />

      </Layout>

    </Provider>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<any> => {
  const ctx = await App.getInitialProps(context);

  let url = context.router?.asPath || "/";
  
  const locale = context.router?.locale || "";
  
  if(locale && process.env.LocaleInUrl !== "off"){
    url = "/" + locale + url;
  }

  const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";

  const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
  const strapiTenant = process.env.PROJECT_SERVER_STRAPI_TENANTID;
  
  const isSafarlife = process.env.PROJECT === "SAFARLIFE";
  const isHotelban = process.env.PROJECT === "HOTELBAN";

  let footerStrapiQueri ="";
  if(hasStrapi){
    if(isSafarlife){
      footerStrapiQueri = "populate[LinkRows][populate]=*";
    }
    if(isHotelban){
      footerStrapiQueri = `filters[Tenant][$eq]=${strapiTenant}&populate[LinkRows][populate]=*`;
    }
  }

  const [portalData, pageResponse,footerStrapi] = await Promise.all<any>([
    getPortal("fa-IR"),
    getPageByUrl(url, acceptLanguage),
    footerStrapiQueri ? await getStrapiFooter(footerStrapiQueri) : undefined
  ]);
  
  const footerStrapiData = hasStrapi ? {
    title: footerStrapi?.data?.data?.[0]?.attributes?.Title,
    description: footerStrapi?.data?.data?.[0]?.attributes?.Description,
    linkRows: footerStrapi?.data?.data?.[0]?.attributes?.LinkRows
  } : null

  return {
    ...ctx,
    portalData: portalData?.data?.result || null,
    pageData: pageResponse?.data?.result || null,
    footerStrapiData: footerStrapiData
  };
};

export default appWithTranslation(MyApp);
