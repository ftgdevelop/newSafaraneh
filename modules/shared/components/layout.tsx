import Header from "./header";
import Footer from "./footer";
import Error from './Error';
import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import PageLoadingBar from "./ui/PageLoadingBar";
import { setReduxUser } from "@/modules/authentication/store/authenticationSlice";
import { getCurrentUserProfile } from "@/modules/authentication/actions";
import Notification from "./Notification";
import { setProgressLoading } from "../store/stylesSlice";

type Props = {
  logo: string;
  siteName: string;
  contactInfo: {
    tel?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  }
  enamadElement?: any;
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
  const removeLoading = () => { dispatch(setProgressLoading(false))}


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
        }

      }

      getUserData();
    }
  }, []);

  let showHeaderAndFooter = true;
  if (router.pathname === "/404") {
    showHeaderAndFooter = false;
  }

  const theme1 = process.env.THEME === "THEME1";

  return (

    <div className={`wrapper leading-7 ${process.env.THEME || ""} lang-${locale} ${locale !== "en" ? "rtl" : ""} ${isBodyScrollable ? "" : "overflow-hidden h-screen"}`} >

      <PageLoadingBar active={loading} />

      <Error />
      <Notification />
      {showHeaderAndFooter ? (
        <>
          <Header logo={props.logo} siteName={props.siteName} />
          <main id="main" className={`min-h-desktop-main relative ${isHeaderUnderMain ? "z-50" : "z-10"}`}>
            {props.children}
          </main>
          {!!theme1 && <Footer logo={props.logo} siteName={props.siteName} contactInfo={props.contactInfo} enamadElement={props.enamadElement || undefined} />}
        </>
      ) : (
        <main id="main" >
          {props.children}
        </main>
      )}

    </div>

  )
}
export default Layout;