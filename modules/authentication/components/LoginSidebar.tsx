import { SetStateAction } from 'react';
import Link from "next/link";
import { useTranslation } from "next-i18next"

import { Close } from "@/modules/shared/components/ui/icons";
import LognWithPassword from "./LognWithPassword";
import OTPLogin from "./OTPLogin";

type Props = {
    setDelayedOpen: (value: SetStateAction<boolean>) => void;
    loginWithPassword: boolean;
    setLoginWithPassword: (value: SetStateAction<boolean>) => void;
    toggleLoginType: () => void;
}

const LoginSidebar: React.FC<Props> = props => {

    const { setDelayedOpen, loginWithPassword, setLoginWithPassword, toggleLoginType } = props;

    const { t } = useTranslation('common');

    return (
        <>
            <div className='flex justify-between mb-2'>
                <button
                    className='p-3'
                    type='button'
                    aria-label={t('close')}
                    onClick={() => { setDelayedOpen(false) }}
                >
                    <Close className='w-6 h-6 fill-neutral-400' />
                </button>
                <Link
                    href="/signin"
                    className='text-sm hover:text-blue-600 p-3 px-5'
                >
                    {t('sign-in-up')}
                </Link>
            </div>

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

            {loginWithPassword ? (
                <LognWithPassword />
            ) : (
                <OTPLogin
                    onCloseLogin={() => { setDelayedOpen(false) }}
                    onBackToLoginWithPassword={() => { setLoginWithPassword(true) }}
                />
            )}

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