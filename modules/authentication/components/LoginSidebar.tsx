import { SetStateAction } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next"

import { Close } from "@/modules/shared/components/ui/icons";
import LognWithPassword from "./LognWithPassword";
import OTPLogin from "./OTPLogin";
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import Image from 'next/image';

type Props = {
    setDelayedOpen?: (value: SetStateAction<boolean>) => void;
    loginWithPassword: boolean;
    setLoginWithPassword: (value: SetStateAction<boolean>) => void;
    toggleLoginType: () => void;
    isNotModal?: boolean;
    logo?: string;
    siteName?: string;
}

const LoginSidebar: React.FC<Props> = props => {

    const { loginWithPassword, setLoginWithPassword, toggleLoginType } = props;

    const loginToContinue = useAppSelector(state => state.authentication.loginToContinueReserve);

    const { t } = useTranslation('common');

    let setDelayedOpen: (state: boolean) => void;
    if (props.setDelayedOpen) {
        setDelayedOpen = props.setDelayedOpen;
    } else {
        setDelayedOpen = (state: boolean) => { return }
    }

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";

    return (
        <>
            {!props.isNotModal && (<>
                <div className='flex justify-between mb-2'>
                    <button
                        className='p-3'
                        type='button'
                        aria-label={t('close')}
                        onClick={() => { setDelayedOpen(false) }}
                    >
                        <Close className='w-6 h-6 fill-neutral-400' />
                    </button>

                    {!!theme1 && (
                        <div className='flex items-center px-5 gap-1 text-sm'>
                            <Link
                                href="/signin"
                                className='text-sm hover:text-blue-600 py-3'
                            >
                                ورود
                            </Link>
                            یا
                            <Link
                                href="/register"
                                className='text-sm hover:text-blue-600 py-3'
                            >
                                ثبت نام
                            </Link>

                        </div>
                    )}

                </div>

                {loginToContinue ? (
                    <>
                        <div className='px-5'>
                            <div className='bg-blue-gradient text-white p-4 rounded-md'>
                                <p className='text-center'>
                                    برای ادامه باید وارد حساب کاربری خود شوید.
                                </p>
                            </div>
                        </div>
                        <hr className='my-10' />
                    </>
                ) : theme1 ? (
                    <>
                        <div className='px-5'>
                            <div className='bg-blue-gradient text-white p-4 rounded-md'>
                                <h6 className='mb-4 font-semibold'> {t('sign-in-h6')} </h6>
                                <ul className='text-2xs list-disc rtl:pr-5 ltr:pl-5'>
                                    <li className='mb-1'> {t('sign-in-desc-list-1')} </li>
                                    <li className='mb-1'> {t('sign-in-desc-list-2')} </li>
                                    <li className='mb-1'> {t('sign-in-desc-list-3')} </li>
                                    <li className='mb-1'> {t('sign-in-desc-list-4')} </li>
                                    <li className='mb-1'> {t('sign-in-desc-list-5')} </li>
                                    <li className='mb-1'> {t('sign-in-desc-list-6')} </li>
                                </ul>
                            </div>
                        </div>
                        <hr className='my-10' />
                    </>
                ) : (theme2 && props.logo) ?
                    <Image
                        src={props.logo}
                        alt={props.siteName || ""}
                        width={120}
                        height={120}
                        className='mx-auto mb-5 sm:mb-8'
                    />
                    : null}
            </>)
            }

            {
                loginWithPassword ? (
                    <LognWithPassword
                        onCloseLogin={() => { setDelayedOpen(false) }}
                    />
                ) : (
                    <OTPLogin
                        onCloseLogin={() => { setDelayedOpen(false) }}
                        onBackToLoginWithPassword={() => { setLoginWithPassword(true) }}
                    />
                )
            }

            <div className='px-5 text-center'>
                {!!loginWithPassword && (
                    <Link
                        className='text-sm text-blue-700 hover:text-blue-600 block mx-auto mb-4'
                        href="/forget"
                    >
                        {t("forget-password")}
                    </Link>
                )}
                <button
                    type='button'
                    className='text-sm text-blue-700 hover:text-blue-600'
                    onClick={toggleLoginType}
                >
                    {loginWithPassword ? t("sign-in-up") : t("sign-in-with-password")}

                </button>
            </div>
        </>
    )
}

export default LoginSidebar;