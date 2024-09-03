import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import EditProfileForm from '@/modules/authentication/components/profile/EditProfileForm';
import ProfileContentTheme2 from '@/modules/authentication/components/profile/ProfileContentTheme2';
import { User2 } from '@/modules/shared/components/ui/icons';
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

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";

    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className={`grid ${theme1?"gap-4 md:grid-cols-3":"py-3 gap-6 md:grid-cols-4"}`}>
                    <div>
                        <AccountSidebar logoUrl={portalData?.billing?.logo?.value} />
                    </div>
                    <div className={theme1?"md:col-span-2":"md:col-span-3"}>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                            {!!theme1 && <div className='flex items-center gap-5 whitespace-nowrap p-5 border-b border-neutral-300'>
                                <User2 className='w-12 h-12' />
                                <div className='text-lg'>
                                    پروفایل
                                    <p className='text-xs mt-1'>
                                        {t('visit-edit-account-informaion')}
                                    </p>
                                </div>
                            </div>}

                            <div className='p-5'>

                                {theme2? 
                                    <ProfileContentTheme2
                                        portalName={portalName}
                                    />
                                :                                
                                    <EditProfileForm
                                        portalName={portalName}
                                    />
                                }

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