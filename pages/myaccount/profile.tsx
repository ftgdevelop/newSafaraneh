import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import EditProfileForm from '@/modules/authentication/components/profile/EditProfileForm';
import { User2 } from '@/modules/shared/components/ui/icons';
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import { WebSiteDataType } from '@/modules/shared/types/common';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    const { t } = useTranslation('common');
    const router = useRouter();

    let portalName = portalData?.billing.name || "";
    
    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            router.push("/")
        }
    }, []);

    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className='grid gap-4 md:grid-cols-3'>
                    <div>
                        <AccountSidebar />
                    </div>
                    <div className='md:col-span-2'>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                            <div className='flex items-center gap-5 whitespace-nowrap p-5 border-b border-neutral-300'>
                                <User2 className='w-12 h-12' />
                                <div className='text-lg'>
                                    پروفایل
                                    <p className='text-xs mt-1'>
                                        {t('visit-edit-account-informaion')}
                                    </p>
                                </div>
                            </div>

                            <div className='p-5'>

                                <EditProfileForm
                                    portalName={portalName}
                                />

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

export default Profile;