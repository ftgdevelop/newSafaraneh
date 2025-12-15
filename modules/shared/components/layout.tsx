import Header from "./header";
import Footer from "./footer";
import Error from './Error';
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import PageLoadingBar from "./ui/PageLoadingBar";
import { setReduxUser } from "@/modules/authentication/store/authenticationSlice";
import { getCurrentUserProfile } from "@/modules/authentication/actions";
import Notification from "./Notification";
import { setProgressLoading } from "../store/stylesSlice";
import { FooterStrapi } from "../types/common";
import Script from "next/script";
//import { GTM_ID } from "../helpers";

type Props = {
  logo: string;
  siteName: string;
  contactInfo: {
    emergencyNumber?: string;
    tel?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    emailAddress?: string;
  }
  enamad?: any;
  samandehi?: string;
  scripts?: string;
  footerStrapi?: FooterStrapi;
}

const Layout: React.FC<PropsWithChildren<Props>> = props => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.styles.progressLoading)

  const { locale } = router;

  const isHeaderUnderMain = useAppSelector(state => state.styles.headerUnderMain);
  const isBodyScrollable = useAppSelector(state => state?.styles?.bodyScrollable);

  const addLoading = () => {
    dispatch(setProgressLoading(true));
    setTimeout(removeLoading, 4000);
  }
  const removeLoading = () => { dispatch(setProgressLoading(false)) }

  const safarmarketHotelPixel = useAppSelector(state => state.safarmarket.hotel);

  useEffect(() => {

    removeLoading();

    document.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', addLoading)
    });

    return (() => {
      document.querySelectorAll('a').forEach(item => {
        item.removeEventListener('click', addLoading)
      });
    })
  }, [router.asPath]);

  useEffect(() => {
    const token = localStorage?.getItem('Token');
    if (token) {
      const getUserData = async () => {
        dispatch(setReduxUser({
          isAuthenticated: false,
          user: {},
          getUserLoading: true
        }));

        const response: any = await getCurrentUserProfile(token);

        if (response && response.status === 200) {
          dispatch(setReduxUser({
            isAuthenticated: true,
            user: response.data?.result,
            getUserLoading: false
          }));
        } else {
          dispatch(setReduxUser({
            isAuthenticated: false,
            user: {},
            getUserLoading: false
          }));
          localStorage.removeItem('Token');
        }

      }

      getUserData();
    }
  }, []);



  let showHeader = true;
  let showFooter = true;
  
  if (router.pathname === "/404") {
    showFooter = false;
    showHeader = false;
  }
  const theme3 = process.env.THEME === "THEME3";

  if( theme3 && (router.pathname === "/" || router.pathname === "/hotels-home" || router.pathname === "/flights-home" || router.pathname === "/accommodation")){
    showHeader = false;
  }

  const isHotelban = process.env.PROJECT === "HOTELBAN";
  
  return (

    <div className={`${theme3?"bg-white":""} wrapper leading-7 ${process.env.THEME || ""} lang-${locale} ${locale !== "en" ? "rtl" : ""} ${isBodyScrollable ? "" : "overflow-hidden h-screen"}`} >
      
      {!!safarmarketHotelPixel && <img src={safarmarketHotelPixel} className="h-px w-px opacity-0 absolute pointer-events-none" />}

      <PageLoadingBar active={loading} />

      <Error />
      <Notification />
          
      {showHeader && <Header logo={props.logo} siteName={props.siteName} />}

      <main id="main" className={`${showHeader && showFooter ? "min-h-desktop-main" : ""} relative ${isHeaderUnderMain ? "z-50" : "z-10"}`}>
        {props.children}
      </main>

      {showFooter && <Footer 
        logo={props.logo} 
        siteName={props.siteName} 
        contactInfo={props.contactInfo} 
        enamad={props.enamad || undefined} 
        samandehi={props.samandehi}
        footerStrapi={props.footerStrapi}
      />}

      {props.scripts && <Script id="footer_api_scripts" strategy="afterInteractive">
        {props.scripts}
      </Script>}

      {/* {isHotelban && GTM_ID ? <script
          id="google_tag_manager_2"
          dangerouslySetInnerHTML={{
              __html:`window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', ${GTM_ID});`
          }}
      /> : null} */}


    </div>

  )
}
export default Layout;