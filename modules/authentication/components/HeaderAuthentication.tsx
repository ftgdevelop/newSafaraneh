import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from "next-i18next";
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import UserWallet from './UserWallet';
import AccountSidebar from './AccountSidebar';
import LoginSidebar from './LoginSidebar';
import { useRouter } from 'next/router';
import { closeLoginForm, openLoginForm } from '../store/authenticationSlice';
import { DownCaretThick, User } from '@/modules/shared/components/ui/icons';
import Link from 'next/link';
import Logout from './Logout';
import Image from 'next/image';

type Props = {
    logo?: string;
    siteName?: string;
}

const HeaderAuthentication: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();

    const router = useRouter();

    const path = router.asPath;

    const style2AuthCtxRef = useRef<HTMLDivElement>(null);

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const userLoginLoading = useAppSelector(state => state.authentication.getUserLoading);
    const userData = useAppSelector(state => state.authentication.user);

    const open = useAppSelector(state => state.authentication.loginFormIsOpen);

    const [style2AuthCtxOpen, setStyle2AuthCtxOpen] = useState<boolean>(false);

    const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setTimeout(() => { setDelayedOpen(true) }, 100);
            //dispatch(setBodyScrollable(false));
        } else {
            //dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!delayedOpen) {
            setTimeout(() => { dispatch(closeLoginForm()) }, 200);
        }
    }, [delayedOpen]);

    useEffect(() => {
        setDelayedOpen(false)
    }, [path]);

    const handleClickOutside = useCallback((e: any) => {
        if (style2AuthCtxRef.current && !style2AuthCtxRef.current.contains(e.target)) {
            setStyle2AuthCtxOpen(false);
        }
    }, []);

    useEffect(() => {
        if(theme2){
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            if(theme2){
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, [handleClickOutside]);



    const theme3 = process.env.THEME === "THEME3";
    const theme2 = process.env.THEME === "THEME2";
    const theme1 = process.env.THEME === "THEME1";

    let buttonClassName = "h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left hidden md:block";

    if (theme2) {
        buttonClassName = "whitespace-nowrap rounded-lg max-md:ml-5 h-10 px-3 border border-stone-300 text-sm text-black hover:text-stone-800 ltr:float-right rtl:float-left font-semibold flex items-center gap-3";
    }
    if(theme3){
        buttonClassName = "text-xs sm:text-sm text-neutral-600 hover:text-neutral-500 flex gap-2 items-center self-center";
    }

    return (
        <>
            {userLoginLoading ? (
                <Skeleton className='w-20 ltr:float-right rtl:float-left hidden md:block mt-4' />
            ) : userIsAuthenticated ? (
                <>
                    {theme2 ? (
                        <div className='relative' ref={style2AuthCtxRef}>
                            <button
                                type="button"
                                aria-label={t('sign-in-up')}
                                className={buttonClassName}
                                onClick={() => { setStyle2AuthCtxOpen(true) }}
                            >
                                <User className='w-6 h-6 fill-white bg-neutral-600 p-0.5 rounded-full' />
                                
                                {userData?.firstName && userData?.lastName ? (
                                    <>
                                        {userData?.firstName} <span className='max-xs:hidden' > {userData?.lastName} </span>
                                    </>
                                ) : (
                                    "حساب کاربری"
                                )}

                                <DownCaretThick className='w-3 h-3 fill-current' />

                            </button>

                            <nav className={`absolute bg-white top-full rtl:left-0 w-40 min-w-full rounded-lg overflow-hidden drop-shadow-lg border border-neutral-200 ${style2AuthCtxOpen ? "transition-all opacity-100 visible mt-2" : "opacity-0 invisible mt-4"}`}>
                                <Link
                                    onClick={()=>{setStyle2AuthCtxOpen(false);}}
                                    href="/myaccount/profile"
                                    className='block py-1.5 text-sm hover:bg-neutral-100 px-3'
                                >
                                    پروفایل
                                </Link>
                                <Link
                                    onClick={()=>{setStyle2AuthCtxOpen(false);}}
                                    href="/myaccount/booking"
                                    className='block py-1.5 text-sm hover:bg-neutral-100 px-3'
                                >
                                    {t('my-reserve')}
                                </Link>

                                <Logout
                                    className='block w-full rtl:text-right ltr:text-left py-1.5 hover:bg-neutral-100 px-3 text-red-600 text-xs'
                                    closeModal={()=>{setStyle2AuthCtxOpen(false);}}
                                />

                            </nav>

                        </div>

                    ) :theme3?(
                        <>
                            <Link
                                href="/myaccount/profile"
                                className={buttonClassName}
                            >
                                <Image src="/images/hotelban/user.svg" alt={t('retrieve-my-booking')} width={24} height={24} className="w-6 h-6 hidden sm:block" />
                                حساب کاربری
                            </Link>
                            
                            <UserWallet />
                        </>
                    ): (
                        <>

                            <button
                                type="button"
                                aria-label={t('sign-in-up')}
                                className={buttonClassName}
                                onClick={() => { dispatch(openLoginForm()) }}
                            >

                                حساب کاربری

                            </button>

                            <UserWallet />
                        </>
                    )}

                </>
            ) : (
                <button
                    type="button"
                    aria-label={t('sign-in-up')}
                    className={buttonClassName}
                    onClick={() => { dispatch(openLoginForm()) }}
                >
                    {theme3 && <Image src="/images/hotelban/user.svg" alt={t('retrieve-my-booking')} width={24} height={24} className="w-6 h-6 hidden sm:block" />}

                    {theme2 ? <>ورود <span className='block h-6 border-l border-stone-300' /> ثبت نام </> : t('sign-in-up')}

                </button>
            )}

            <ModalPortal
                show={open}
                selector='modal_portal'
            >
                <div
                    className={`fixed left-0 right-0 top-0 bottom-0 bg-black/75 duration-200 transition-all ${delayedOpen ? "opacity-100 backdrop-blur" : "opacity-0"}`}
                    onClick={() => { setDelayedOpen(false) }}
                />

                <div className={`fixed h-screen top-0 w-screen pb-5 ${theme1?"sm:w-520" : theme2 ? "sm:w-400 sm:pb-20": theme3? "sm:w-480" :""}  bg-white duration-200 transition-all ${theme1 ? "overflow-auto rtl:left-0 ltr:right-0" : "sm:h-auto sm:rounded-xl sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2" } ${delayedOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>

                    {userIsAuthenticated ? (
                        <AccountSidebar
                            isInModal
                            setDelayedOpen={setDelayedOpen}
                        />
                    ) : (
                        <LoginSidebar
                            setDelayedOpen={setDelayedOpen}
                            logo={props.logo}
                            siteName= {props.siteName}
                        />
                    )}

                </div>

            </ModalPortal>
        </>
    )
}

export default HeaderAuthentication;