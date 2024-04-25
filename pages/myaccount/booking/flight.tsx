import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PortalDataType } from '@/modules/shared/types/common';

const DomesticFlightReserveDetail: NextPage = ({ portalData }: { portalData?: PortalDataType }) => {

    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>
                under construction...
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'flight', 'payment']))
        },
    })
}

export default DomesticFlightReserveDetail;