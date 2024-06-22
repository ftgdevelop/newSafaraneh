import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';
import Script from 'next/script';

export default function Document() {


  let ga_script_url = "";

  const portalGoogleAnalytic = process.env.GOOGLE_TAG_MANAGER_ID;

  if (portalGoogleAnalytic) {
    switch (process.env.SITE_NAME) {
      case "https://www.safaraneh.com":
        ga_script_url = "/ga-script.js";
        break;
      case "https://www.samita.com":
        ga_script_url = "/ga-script-samita.js";
        break;
      default:
        ga_script_url = "";
    }
  }



  return (
    <Html lang={i18n?.language} dir={(i18n?.language === "fa" || i18n?.language === "ar")  ? "rtl" : "ltr"}>
      <Head>
        {!!ga_script_url && <Script
          src={ga_script_url}
          strategy="beforeInteractive"
        />}

      </Head>
      <body className={`${process.env.THEME === "THEME2" ?"theme-2 text-stone-900 rtl:font-vazir":process.env.THEME === "THEME3"? "theme-3 text-neutral-800 rtl:font-vazir" : "theme-1 text-neutral-700 rtl:font-samim" } bg-body-background`} >

        {!!portalGoogleAnalytic && (
          <>
            {/* Google Tag Manager (noscript) */}
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${portalGoogleAnalytic}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
            {/* End Google Tag Manager (noscript) */}
          </>
        )}

        <Main />
        <div id="modal_portal_0" className='relative z-50'></div>
        <div id="modal_portal" className='relative z-50'></div>
        <div id="modal_portal_2" className='relative z-50'></div>
        <div id="error_modal_portal" className='relative z-50'></div>
        <div id="notification_modal_portal" className='relative z-50'></div>
        <NextScript />
      </body>
    </Html>
  )
}
