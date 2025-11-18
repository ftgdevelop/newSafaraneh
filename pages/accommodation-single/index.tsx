import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPageByUrl } from '@/modules/shared/actions';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import BackToList from '@/modules/accommodation/components/accommodationDetails/BackToList';
import GalleryLevel1 from '@/modules/accommodation/components/accommodationDetails/GalleryLevel1';
import Gallery from '@/modules/accommodation/components/accommodationDetails/Gallery';
import AnchorTabs from '@/modules/shared/components/ui/AnchorTabs';
import AccommodationName from '@/modules/accommodation/components/accommodationDetails/AccommodationName';

const AccommodationList: NextPage = () => {
    
    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;

    const domesticAccommodationDefaultDates: [string, string] = [checkin, checkout];

    let BreadCrumptListUrl = "";

    const anchorTabsItems: { id: string, title: string }[] = [];

    return (
        <>
            <div className="max-w-container mx-auto px-3 sm:px-5 pt-5">
                <div className='bg-[#ed6527] text-white px-5 py-3 text-lg md:text-2xl lg:text-4xl xl:text-5xl mb-5 text-center font-semibold'>
                    شما از موتور جستجوی <span className='text-[#ed6527] inline-block mx-2 font-bold p-1 lg:p-3 bg-white rounded-xl'> سفرمارکت </span> به این سایت هدایت شده اید
                </div>

                <div className="mb-4">
                    <BackToList url={BreadCrumptListUrl} cityName={"تهران"} />

                    {/* <GalleryLevel1 images={hotelImages} hotelName={accommodationData.displayName} /> */}

                    {/* <Gallery images={hotelImages} hotelName={accommodationData.displayName} /> */}
                    
                </div>
            </div>

            <AnchorTabs
                items={anchorTabsItems}
            />

            <div className="max-w-container mx-auto px-3 sm:px-5" id="accommodation_intro">
              AccommodationName
                {/* <AccommodationName 
                    hotelData={ isSafaraneh ? hotelData : undefined} 
                    reviewData={reviewData}
                    accomodationData={accommodationData} 
                    /> */}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  let url = `/${locale}/accommodation/`;

  if (process.env.LocaleInUrl === "off"){
    url = `/accommodation/${query.hotelList![0]}`;
  }
  
  const searchParameters : { url: string; EntityId?:string;} = {
    url:url
  }
  
  const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";
  
  const pageResponse : any = await getPageByUrl(url, acceptLanguage);

  if(pageResponse?.data?.result?.entityId){
    searchParameters.EntityId = pageResponse.data.result.entityId;
  }

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'home', 'accommodation'])),
      url: url || null
    },
  })
};

export default AccommodationList;