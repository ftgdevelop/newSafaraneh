import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import PasswordChangeForm from '@/modules/authentication/components/PasswordChangeForm';
import { Lock2 } from '@/modules/shared/components/ui/icons';
import { WebSiteDataType } from '@/modules/shared/types/common';

const Password: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    const router = useRouter();

    const theme1 = process.env.THEME === "THEME1";

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            router.push("/")
        }
    }, []);

    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className={`grid ${theme1?"gap-4 md:grid-cols-3":"py-3 gap-6 md:grid-cols-4"}`}>
                    <div className='max-md:hidden'>
                        <AccountSidebar logoUrl={portalData?.billing?.logo?.value} />
                    </div>
                    <div className={theme1?"md:col-span-2":"md:col-span-3"}>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                            <div className='flex items-center gap-5 whitespace-nowrap p-5 border-b border-neutral-300'>
                                {!!theme1 && <Lock2 className='w-12 h-12' />}
                                <div className='text-lg'>
                                    کلمه عبور
                                    <p className='text-xs mt-1'>
                                        تغییر کلمه عبور
                                    </p>
                                </div>
                            </div>

                            <div className='p-5'>

                                <PasswordChangeForm />

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
            ...await (serverSideTranslations(context.locale, ['common']))
        },
    })
}

export default Password;
