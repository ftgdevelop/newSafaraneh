import React, { useState } from 'react';
// import AccommodationSearchForm from '@/modules/accommodation/components/shared/AccommodationSearchForm';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPageByUrl } from '@/modules/shared/actions';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import ProgressBarWithLabel from '@/modules/shared/components/ui/ProgressBarWithLabel';
import Image from 'next/image';
import AccommodationListSideBar from '@/modules/accommodation/components/accommodationsList/sidebar';
import Select from '@/modules/shared/components/ui/Select';
import { SortTypes } from '@/modules/domesticHotel/types/hotel';
import AccommodationsList from '@/modules/accommodation/components/accommodationsList';
import AccommodationOnMap from '@/modules/accommodation/components/accommodationsList/AccommodationOnMap';

const AccommodationList: NextPage = () => {
    
    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;

    const domesticAccommodationDefaultDates: [string, string] = [checkin, checkout];

    const [showMap, setShowMap] = useState<boolean>(false);
    const [sortFactor, setSortFactor] = useState<SortTypes>("priority");

    let fallbackLocation: [number, number] | undefined;

    return (
      <>
        <div className="max-w-container mx-auto px-5 py-4">
            <div>
                {/* <AccommodationSearchForm wrapperClassName="relative z-[2] mb-4" defaultDates={domesticAccommodationDefaultDates} /> */}

                <ProgressBarWithLabel
                    className="mt-4 mb-4"
                    label="جستجوی بهترین قیمت اقامت گاه های در دسترس"
                    percentage={50}
                />
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
                <div>
                    <button type='button' className='relative block w-full lg:mb-5' onClick={() => { setShowMap(true) }}>
                        <Image src="/images/map-cover.svg" alt="showMap" className='block border w-full h-24 rounded-xl object-cover' width={354} height={100} />
                        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-1 border-blue-600 rounded font-semibold select-none leading-5 text-xs whitespace-nowrap'>
                            مشاهده اقامت گاه‌ها روی نقشه
                        </span>
                    </button>

                    <AccommodationListSideBar />
                </div>
                <div className="lg:col-span-3" >

                  <>
                    <div className='flex justify-between mb-4 items-center'>
                      <div className='text-sm max-sm:hidden'>
                        <b> ۱۲ </b> اقامتگاه در <b> تهران </b> پیدا کردیم 
                      </div>


                      <Select
                        items={[
                          { value: "priority", label: "priority" },
                          { value: "price", label: "lowest-price" },
                          { value: "starRate", label: "highest-star-rating" },
                          { value: "name", label: "hotel-name" },
                          { value: "gueatRate", label: "highest-guest-rating" }
                        ]}
                        value={sortFactor}
                        onChange={type => { setSortFactor(type as SortTypes) }}
                        label="مرتب سازی براساس"
                        wrapperClassName='max-sm:grow sm:w-52'
        
                      />
                    </div>
                    

                    <AccommodationsList />

                  </>

                </div>
            </div>
        </div>

        {!!showMap && <AccommodationOnMap 
          fallbackLocation={fallbackLocation}
          closeMapModal={() => { setShowMap(false) }}
        />}

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