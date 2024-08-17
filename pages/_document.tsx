import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {


  return (
    <Html lang={i18n?.language} dir={(i18n?.language === "fa" || i18n?.language === "ar")  ? "rtl" : "ltr"}>
      <Head>
      </Head>
      <body className={`font-iranyekan ${process.env.THEME === "THEME2" ?"theme-2 text-stone-900":process.env.THEME === "THEME3"? "theme-3 text-neutral-800" : "theme-1 text-neutral-700" } bg-body-background`} >

        <Main />


          {!!process.env.GOOGLE_TAG_MANAGER_ID && (
              <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
                height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
          )}
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
