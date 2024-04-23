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
import '../styles/modernDatePicker.scss';

import { store } from '../modules/shared/store';
import { PortalDataType } from '@/modules/shared/types/common';
import { getPortal } from '@/modules/shared/actions/portalActions';
import Layout from '@/modules/shared/components/layout';
import { GTM_ID } from '@/modules/shared/helpers';

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  portalData?: PortalDataType;
};

function MyApp({ Component, pageProps, portalData }: TProps) {
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
    console.log("_app mounted!")
  }, []);


  const tel = portalData?.Phrases?.find(item => item.Keyword === "PhoneNumber")?.Value || "";
  const instagram = portalData?.Phrases?.find(item => item.Keyword === "Instagram")?.Value || "";
  const facebook = portalData?.Phrases?.find(item => item.Keyword === "Facebook")?.Value || "";
  const linkedin = portalData?.Phrases?.find(item => item.Keyword === "Linkedin")?.Value || "";
  const twitter = portalData?.Phrases?.find(item => item.Keyword === "Twitter")?.Value || "";

  const logo = portalData?.Phrases?.find(item => item.Keyword === "Logo")?.ImageUrl || "";
  const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";
  const favIconLink = portalData?.Phrases?.find(item => item.Keyword === "Favicon")?.Value || "";

  const portalTitle = portalData?.MetaTags?.find(item => item.Name === "title")?.Content || "";
  const portalKeywords = portalData?.MetaTags?.find(item => item.Name === "keywords")?.Content || "";
  const portalDescription = portalData?.MetaTags?.find(item => item.Name === "description")?.Content || "";
  
  const portalEnamadMetaTag = portalData?.MetaTags?.find(item => item.Name === "enamad")?.Content || "";
  const enamadElement = portalData?.Phrases.find(item => item.Keyword === "Enamad")?.Value;

  let canonicalUrl = "";
  if(typeof router !== 'undefined'){
    if (router.route === '/hotels/[...hotelList]'){
      canonicalUrl = "";
    }else if (router.route === '/hotel/[...hotelDetail]'){
      canonicalUrl = process.env.SITE_NAME + (i18n?.language ? `/${i18n?.language}` : "") + (router.query.hotelDetail ? "/hotel/"+router.query.hotelDetail[0] : "");
    }else if (router.route === '/flights/[flights]'){
      canonicalUrl = process.env.SITE_NAME + (i18n?.language ? `/${i18n?.language}` : "") + (router.query.flights ? "/flights/"+router.query.flights : "");
    }else{

      let path = router.asPath;
      if (path[path.length-1] === "/"){
        path = path.substring(0, path.length - 1);
      }
      canonicalUrl = process.env.SITE_NAME + (i18n?.language ? `/${i18n?.language}` : "") + path
    }
  }
  
  return (
    <Provider store={store}>
      <Head>






        {/* TODO: _-_-_S_T_A_R_T_-_-_ delete when mobiscroll is activated */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
        />
        {/* TODO: _-_-_E_N_D_-_-_ delete when mobiscroll is activated */}




        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0a438b" />
        <meta charSet="utf-8" />

        <meta name="author" content="safaraneh.com" />
        <meta name="copyright" content="safaraneh.com" />
        <meta name="cache-control" content="cache" />
        <meta name="content-language" content="fa" />
        <meta name="content-type" content="text/html;UTF-8" />
        <meta name="creator" content="safaraneh.com" />
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

        {!!portalTitle && <title>{portalTitle}</title>}
        {!!portalKeywords && <meta name="keywords" content={portalKeywords} />}
        {!!portalDescription && <meta name="description" content={portalDescription} />}

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
            instagram: instagram,
            linkedin: linkedin,
            twitter: twitter,
            facebook: facebook
          }
        }
        logo={logo}
        siteName={siteName}
        enamadElement={enamadElement}
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

  //const portalData = await getPortal(context?.router?.locale === "ar" ? "ar-AE" : context?.router?.locale=== "en" ? "en-US" : "fa-IR");
  const portalData = await getPortal("fa-IR");

  return { ...ctx, portalData: portalData?.data || null };
};

export default appWithTranslation(MyApp);
