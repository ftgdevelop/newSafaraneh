import { getpageByUrl } from '@/actions';
import { getAccommodationById, getDomesticHotelDetailByUrl, getScore } from '@/actions/hotelActions';
import type { GetServerSideProps, NextPage } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import {useEffect} from 'react';
import { PageDataType, PortalDataType } from '@/types/common';
import { DomesticAccomodationType, DomesticHotelDetailType, EntitySearchResultItemType, HotelScoreDataType } from '@/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/components/hotel/hotelDetails/BackToList';
import { Phone } from '@/components/shared/ui/icons';
import Gallery from '@/components/hotel/hotelDetails/Gallery';
import HotelName from '@/components/hotel/hotelDetails/HotelName';
import SearchForm from '@/components/hotel/SearchForm';
import HotelFacilities from '@/components/hotel/hotelDetails/HotelFacilities';
import HotelTerms from '@/components/hotel/hotelDetails/HotelTerms';
import HotelAbout from '@/components/hotel/hotelDetails/HotelAbout';
import { getPortal } from '@/actions/portalActions';
import Attractions from '@/components/hotel/hotelDetails/Attractions';
import { useAppDispatch,useAppSelector } from '@/hooks/use-store';
import { setReduxPortal } from '@/store/portalSlice';

type Props = {
  pageData: PageDataType;
  hotelData: DomesticHotelDetailType;
  hotelScoreData: HotelScoreDataType;
  accommodationData: DomesticAccomodationType;
  portalData: PortalDataType;
}

const HotelDetail: NextPage<Props> = props => {

  const { accommodationData, hotelData, hotelScoreData, pageData, portalData } = props;


  const dispatch = useAppDispatch();
  const portalInformation = useAppSelector(state => state.portal);

  useEffect(()=>{
   if(portalData && !portalInformation.MetaTags?.length){
     dispatch(setReduxPortal({
         MetaTags: portalData.MetaTags,
         Phrases: portalData.Phrases
     }));
   }
  },[portalData]);


  const { t } = useTranslation('common');

  const router = useRouter();
  const searchInfo = router.asPath;

  let checkin: string = "";
  let checkout: string = "";

  if (searchInfo.includes("checkin-")) {
    checkin = searchInfo.split("checkin-")[1].split("/")[0];
  }
  if (searchInfo.includes("checkout-")) {
    checkout = searchInfo.split("checkout-")[1].split("/")[0];
  }

  let defaultDestination: EntitySearchResultItemType | undefined = undefined;

  if (hotelData && hotelData.HotelId) {
    defaultDestination = {
      name: hotelData.HotelName,
      displayName: hotelData.HotelCategoryName + " " + hotelData.HotelName + " " + hotelData.CityName,
      type: 'Hotel',
      id: hotelData.HotelId
    }
  }

  let defaultDates: [string, string] | undefined = undefined;

  if (checkin && checkout) {
    defaultDates = [checkin, checkout];
  }

  const portalName = portalData.Phrases.find(item => item.Keyword === 'Name')?.Value;
  const portalURL = portalData.PortalName || portalName;

  return (
    <>
      <Head>
        {pageData && <>
          <title>{pageData.PageTitle}</title>
          {pageData.MetaTags?.map((item) => (
            <meta name={item.Name} content={item.Content} key={item.Name} />
          ))
            || null}
        </>}


        {hotelData && (
          <>
            <meta property="og:site_name" content="سفرانه" key="site_name" />
            <meta
              property="og:title"
              content={hotelData.PageTitle}
              key="title"
            ></meta>
            <meta
              name="description"
              content={hotelData.MetaDescription}
            ></meta>
            <meta
              property="og:description"
              content={hotelData.MetaDescription}
              key="description"
            ></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={hotelData.Url}></meta>
            <meta
              property="og:image"
              itemProp="image"
              content={hotelData.ImageUrl}
              key="image"
            ></meta>
            <meta name="og:locale" content="fa-IR" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@safaraneh" />
            <meta name="twitter:title" content={hotelData.PageTitle} />
            <meta
              name="twitter:description"
              content={hotelData.MetaDescription}
            />
          </>
        )}

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
        />

      </Head>


      <div className="max-w-container mx-auto p-3 sm:p-5">

        <div className='bg-white p-3'>
          {!!hotelData.IsCovid && <div className='bg-emerald-700 leading-4 p-3 sm:p-4 text-white text-xs sm:text-sm rounded-md flex flex-wrap gap-2 items-center m-1 mb-3'>
            <Phone className='w-5 h-5 sm:w-6 sm:h-6 fill-current block' />
            جهت رزرو با شماره <a href="tel:+982126150051" className='underline text-sm sm:text-base'> 02126150051 </a> تماس بگیرید.
          </div>}
          <BackToList checkin={checkin} checkout={checkout} cityId={hotelData.CityId} cityName={hotelData.CityName} />
        </div>

        <Gallery images={hotelData.Gallery} />

        <HotelName hotelData={hotelData} scoreData={hotelScoreData} />


        <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'>{t('change-search')}</h4>
        <SearchForm
          defaultDestination={defaultDestination}
          defaultDates={defaultDates}
        />


        <HotelFacilities facilities={hotelData.Facilities} />

        <HotelTerms
          instruction={accommodationData.instruction}
          mendatoryFee={accommodationData.mendatoryFee}
          policies={hotelData.Policies}
        />

        {!!portalName && <HotelAbout portalName={portalName} portalAddress={portalURL!} description={accommodationData.description} />}


        <h4 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'>{t('attraction')}</h4>
        <div className='p-5 lg:p-7 bg-white rounded-xl'>
          <Attractions attractions={hotelData.DistancePoints} />
        </div>


      </div>

    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ locale, query, req }) => {

  const url = encodeURI(`/${locale}/hotel/${query.hotelDetail![0]}`);

  const [pageDetails, hotelData, portalData] = await Promise.all<any>([
    getpageByUrl(url, "fa-IR"),
    getDomesticHotelDetailByUrl(url, "fa-IR"),
    getPortal("fa-IR")
  ]);
  const [hotelScoreData, accommodationData] = await Promise.all<any>([
    getScore(pageDetails.data.Id, "fa-IR"),
    getAccommodationById(hotelData.data.HotelId, "fa-IR")
  ]);

  return ({
    props: {
      ...await (serverSideTranslations(locale as string, ['common'])),
      pageData: pageDetails.data,
      hotelData: hotelData.data,
      hotelScoreData: hotelScoreData.data,
      accommodationData: accommodationData.data.result,
      portalData: portalData.data
    },
  })
}


export default HotelDetail;
