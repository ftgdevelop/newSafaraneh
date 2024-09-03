import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import { Loading, RightCaret, WalletBeautiful } from '@/modules/shared/components/ui/icons';
import { TabItem, WebSiteDataType } from '@/modules/shared/types/common';
import Head from 'next/head';
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import { numberWithCommas } from '@/modules/shared/helpers';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { useTranslation } from 'next-i18next';
import Button from '@/modules/shared/components/ui/Button';
import Tab from '@/modules/shared/components/ui/Tab';
import Link from 'next/link';
import WalletFaq from '@/modules/authentication/components/wallet/WalletFaq';
import Transactions from '@/modules/authentication/components/wallet/Transactions';
import ChargeWallet from '@/modules/authentication/components/wallet/ChargeWallet';

const Wallet: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    const router = useRouter();

    const { t } = useTranslation('common');

    const theme1 = process.env.THEME === "THEME1";
    
    const depositBalance = useAppSelector(state => state.authentication.balance);
    const depositBalanceLoading = useAppSelector(state => state.authentication.balanceLoading);

    const userLoading = useAppSelector(state => state.authentication.getUserLoading);
    const user = useAppSelector(state => state.authentication.user);
    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            router.push("/")
        }
    }, []);

    const tabItems: TabItem[] = [
        {label:"افزایش اعتبار", children:(<ChargeWallet />), key:"charge"},
        {label:"تراکنش ها", children:(<Transactions />), key:"transactions"}
    ];

    if (theme1){
        tabItems.push({label:"سوالات متداول", children: (< WalletFaq />), key:"faq"});
    }

    return (
        <>
            <Head>
                <title> کیف پول </title>
            </Head>

            <div className='max-w-container mx-auto px-5 py-4'>

                <Link href="/myaccount/profile" className='text-xs mb-2 inline-block sm:hidden'>
                    <RightCaret className='w-4 h-4 inline-block' />
                    بازگشت
                </Link> 

                <div className={`grid ${theme1?"gap-4 md:grid-cols-3":"py-3 gap-6 md:grid-cols-4"}`}>
                    <div className='max-md:hidden'>
                        <AccountSidebar 
                            logoUrl={portalData?.billing?.logo?.value}
                        />
                    </div>
                    <div className={theme1?"md:col-span-2":"md:col-span-3"}>
                        <div className={`border border-neutral-300 bg-white mb-4 ${theme1?"rounded-md":"rounded-xl"}`}>

                            <div className='flex items-center gap-3 sm:gap-5 p-3 sm:p-5 border-b border-neutral-300'>
                                {!!theme1 && <WalletBeautiful className='w-8 h-8 sm:w-12 sm:h-12' />}
                                <div className='leading-5 sm:text-lg'>
                                    کیف پول
                                    <p className='text-2xs sm:text-xs mt-1'>
                                        تاریخچه پرداختی های خود را مشاهده کنید
                                    </p>
                                </div>
                            </div>
                            <div className={`text-xs ${theme1?"p-3 sm:p-5 leading-4 bg-[#6598e6] text-white bg-[url(/images/bg-3.png)]":"p-10"}`} >

                                موجودی کیف پول:

                                {depositBalanceLoading ? (
                                    <Loading className='fill-white w-9 h-9 animate-spin mt-1.5' />
                                ) : (
                                    <b className={`font-semibold text-xl block mt-2 ${theme1?"md:text-5xl":"md:text-3xl"}`}>
                                        <span className='font-sans'> {numberWithCommas(depositBalance || 0)}  </span> {t('rial')}
                                    </b>
                                )}

                            </div>

                            <div className='p-2 sm:p-3 md:p-5'>

                                {userLoading ? (
                                    <div>
                                        <Skeleton className='w-60 mb-4' />
                                        <Skeleton className='w-40' />
                                    </div>
                                ) : !userIsAuthenticated ? (
                                    null
                                ) : (user?.isEmailConfirmed || user?.isPhoneNumberConfirmed) ? (
                                    <Tab style = {theme1?"3":"expedia-home"} items={tabItems} />
                                ) : (
                                    <div className='text-sm bg-amber-50 rounded border border-amber-500 p-5'>
                                        <p className='mb-3'> برای دسترسی به کیف پول خود باید حساب خود را تأیید کنید. </p>
                                        <Button
                                            href='/myaccount/profile'
                                            color='red'
                                            className='h-12 w-40 text-base font-semibold'
                                        >
                                            تایید حساب کاربری
                                        </Button>
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common','payment']))
        },
    })
}

export default Wallet;
