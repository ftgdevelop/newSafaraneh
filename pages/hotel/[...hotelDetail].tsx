import { getDomesticHotelDetailsByUrl } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { HotelPageDataType, WebSiteDataType } from '@/modules/shared/types/common';
import { DomesticAccomodationType, DomesticHotelDetailType, DomesticHotelReviewsType, DomesticHotelRichSheet, DomesticHotelRichSnippets, EntitySearchResultItemType } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/modules/domesticHotel/components/hotelDetails/BackToList';
import { CalendarError } from '@/modules/shared/components/ui/icons';
import Gallery from '@/modules/domesticHotel/components/hotelDetails/Gallery';
import HotelName from '@/modules/domesticHotel/components/hotelDetails/HotelName';
import HotelFacilities from '@/modules/domesticHotel/components/hotelDetails/HotelFacilities';
import HotelTerms from '@/modules/domesticHotel/components/hotelDetails/HotelTerms';
import HotelAbout from '@/modules/domesticHotel/components/hotelDetails/HotelAbout';
import Attractions from '@/modules/domesticHotel/components/hotelDetails/Attractions';
import FAQ from '@/modules/domesticHotel/components/hotelDetails/FAQ';
import SimilarHotels from '@/modules/domesticHotel/components/hotelDetails/SimilarHotels';
import Comments from '@/modules/domesticHotel/components/hotelDetails/comments';
import Rooms from '@/modules/domesticHotel/components/hotelDetails/Rooms';
import { addSomeDays, checkDateIsAfterDate, dateDiplayFormat, dateFormat } from '@/modules/shared/helpers';
import AnchorTabs from '@/modules/shared/components/ui/AnchorTabs';
import NotFound from '@/modules/shared/components/ui/NotFound';
import { useEffect, useRef, useState } from 'react';
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import AvailabilityTimeout from '@/modules/shared/components/AvailabilityTimeout';
import LoginLinkBanner from '@/modules/shared/components/theme2/LoginLinkBanner';
import AccommodationFacilities from '@/modules/domesticHotel/components/hotelDetails/AccommodationFacilities';
import AccomodationPolicy from '@/modules/domesticHotel/components/hotelDetails/AccomodationPolicy';
import dynamic from 'next/dynamic';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { emptyReduxSafarmarket, setReduxSafarmarketPixel } from '@/modules/shared/store/safarmarketSlice';
import BreadCrumpt from '@/modules/shared/components/ui/BreadCrumpt';

const SearchForm = dynamic(() => import('@/modules/domesticHotel/components/shared/SearchForm'), {
  ssr: false
});

type Props = {
  allData: {
    reviews?: DomesticHotelReviewsType;
    accommodation?: { result: DomesticAccomodationType };
    richSnippets?: DomesticHotelRichSnippets;
    sheet:DomesticHotelRichSheet;
    page?: HotelPageDataType;
    hotel?: DomesticHotelDetailType;
  };
  portalData: WebSiteDataType;
  error410?: "true";
  deleteParameters:string;
}

const HotelDetail: NextPage<Props> = props => {


  ////TODO: delete this useEffect
  useEffect(()=>{
    const fetchHotelAllData = async () => {
      const allData: any = await getDomesticHotelDetailsByUrl( props.deleteParameters , "fa-IR");
    }
    fetchHotelAllData();
  },[]);

  const dispatch = useAppDispatch();

  const theme2 = process.env.THEME === "THEME2";

  const theme1 = process.env.THEME === "THEME1";

  const isSafaraneh = process.env.PROJECT === "SAFARANEH" || process.env.PROJECT === "IRANHOTEL";

  const isSafarlife = process.env.PROJECT === "SAFARLIFE";

  const { portalData, allData } = props;

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const router = useRouter();
  const locale = router.locale;

  const searchFormWrapperRef = useRef<HTMLDivElement>(null);
  const [showChangeDateModal, setShowChangeDateModal] = useState<boolean>(false);
  const [showOnlyForm, setShowOnlyForm] = useState<boolean>(false);


  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let defaultDates: [string, string] = [today, tomorrow];

  const searchInfo = router.asPath?.split("?")[0]?.split("#")[0];

  let checkin: string = "";
  let checkout: string = "";

  if (searchInfo.includes("checkin-")) {
    checkin = searchInfo.split("checkin-")[1].split("/")[0];
  }
  if (searchInfo.includes("checkout-")) {
    checkout = searchInfo.split("checkout-")[1].split("/")[0];
  }

  if (checkin && checkout) {
    defaultDates = [checkin, checkout];
  }

  const [formIsInView,setFormIsInView] = useState<boolean>(false);
  const checkFormIsInView = () => {
    const targetTop = searchFormWrapperRef.current?.getBoundingClientRect().top;
    const windowHeight = window.innerHeight || 0;

    if (targetTop && targetTop < windowHeight) {
        setFormIsInView(true);

        document.removeEventListener('scroll', checkFormIsInView);
        window.removeEventListener("resize", checkFormIsInView);

    }
}

const querySafarmarketId = router.query?.safarmarketId; 
// "sm-test001"
const utm_medium = router.query?.utm_medium; 
// "redirection"
const utm_source = router.query?.utm_source; 
// "safarmarket"
const utm_term = router.query?.utm_term; 
// "hotel"

useEffect(()=>{

  if (!process.env.SAFAR_MARKET_SITE_NAME){
    return;
  }

  let cookieSafarmarketId;
  let cookies = decodeURIComponent(document.cookie).split(';');
  for (const item of cookies){
    if (item.includes("safarMarketHotelSmId=")){
      cookieSafarmarketId =item.split("=")[1];
    }
  }

  if(querySafarmarketId && utm_source && utm_source === "safarmarket"){
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + (7*24*60*60*1000));
    if (document){
      document.cookie = `safarMarketHotelSmId=${querySafarmarketId}; expires=${expDate.toUTCString()};path=/`;
    }
  }

  const smId = querySafarmarketId || cookieSafarmarketId;

  if(smId){
    dispatch(setReduxSafarmarketPixel({
      type: "hotel",
      pixel : `https://safarmarket.com/api/hotel/v1/pixel/${process.env.SAFAR_MARKET_SITE_NAME}/2/0/?smId=${smId}`
    }));
  }
},[querySafarmarketId,utm_source]);

useEffect(() => {
  document.addEventListener('scroll', checkFormIsInView);
  window.addEventListener("resize", checkFormIsInView);

  return (() => {
    dispatch(emptyReduxSafarmarket());
      document.removeEventListener('scroll', checkFormIsInView);
      window.removeEventListener("resize", checkFormIsInView);
  });
}, []);

  useEffect(() => {
    setShowOnlyForm(false);
    const validDates = checkDateIsAfterDate(new Date(checkin), new Date(today)) && checkDateIsAfterDate(new Date(checkout), new Date(tomorrow));
    if (!validDates) {
      setShowChangeDateModal(true);
    }
  }, [checkin, checkout]);

  // useEffect(()=>{
  //   //delete this useEffect
  //   const todoDelete = async () => {
  //     const allData: any = await getDomesticHotelDetailsByUrl("/" + locale + props.todoDeleteUrl, locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR");
  //   }

  //   todoDelete();
  // },[]);

  if (props.error410) {
    return (
      <NotFound code={410} />
    )
  }

  if (!allData && isSafaraneh) {
    return null;
  }

  const accommodation = allData?.accommodation;
  const hotelData = allData?.hotel;
  const pageData = allData?.page; 
  const richSnippets = allData?.richSnippets; 
  const sheet = allData?.sheet; 

  let reviewData = undefined;
  if(allData?.reviews?.averageRating && allData.reviews.reviews?.totalCount){
    reviewData = {
      averageRating: Math.floor(allData.reviews.averageRating),
      reviewCount: allData.reviews.reviews.totalCount
    }
  }

  console.log(reviewData);
 
  const accommodationData = accommodation?.result;

  let defaultDestination: EntitySearchResultItemType | undefined = undefined;

  if (accommodationData?.displayName) {
    defaultDestination = {
      name: accommodationData.name || accommodationData.displayName,
      displayName: accommodationData.displayName,
      type: 'Hotel',
      id: accommodationData.id
    }
  }

  let siteName = "";
  let tel = "";
  let twitter = "";
  let siteURL = "";
  let siteLogo = "";

  if (portalData) {

    tel = portalData.billing?.telNumber || portalData?.billing?.phoneNumber || "";
    twitter = portalData.social?.x || "";
    siteLogo = portalData.billing?.logo?.value || "";
    siteName = portalData.billing?.name || "";
    siteURL = portalData.billing?.website || "";
  }

  if (!accommodationData) {
    return null;
  }

  const configWebsiteUrl = process.env.SITE_NAME || "";


  let script_detail_2_Url;

  if (isSafarlife && accommodationData?.city?.slug){
    script_detail_2_Url = `${configWebsiteUrl}${accommodationData.city.slug}`;
  }else if (accommodationData?.city?.name) {
    if (process.env.LocaleInUrl === "off") {
      script_detail_2_Url = `${configWebsiteUrl}/hotels/${accommodationData.city.name.replace(/ /g, "-")}`;
    } else if (i18n && i18n.language === "fa") {
      script_detail_2_Url = `${configWebsiteUrl}/fa/hotels/هتل-های-${accommodationData.city.name.replace(/ /g, "-")}`;
    } else if (i18n && i18n.language === "ar") {
      script_detail_2_Url = `${configWebsiteUrl}/ar/hotels/فنادق-${accommodationData.city.name.replace(/ /g, "-")}`;
    } else {
      script_detail_2_Url = `${configWebsiteUrl}/en/hotels/${accommodationData.city.name.replace(/ /g, "-")}`;
    }
  }

  let hotelImages: {
    src: string;
    alt: string;
    width: number;
    height: number;
    description: string;
    thumbnail: string;
  }[] = [];

  if ((process.env.PROJECT === "1STSAFAR" || accommodationData?.galleries?.length)) {
    if (accommodationData?.galleries?.length) {
      hotelImages = accommodationData?.galleries?.map(item => {
        const thumbnail = item.sizes?.find(p => p.displaySize === 'mobile')?.filePath || item.filePath!;
        return ({
          alt: item.fileAltAttribute || item.fileTitleAttribute || "",
          description: item.fileTitleAttribute || item.fileAltAttribute || "",
          src: item.filePath!,
          width: 1000,
          height: 700,
          thumbnail: thumbnail
        })
      })
    }
  } else if (isSafaraneh && hotelData?.Gallery?.length) {
    hotelImages = hotelData.Gallery.filter(item => item.Image).map(item => ({
      src: item.Image! as string,
      alt: item.Title || "",
      width: 1000,
      height: 700,
      description: item.Alt || "",
      thumbnail: item.Image as string
    }))
  }

  const anchorTabsItems: { id: string, title: string }[] = [];

  if (hotelImages?.length) {
    anchorTabsItems.push({ id: "pictures_section", title: tHotel('pictures') });
  }

  anchorTabsItems.push(
    { id: "hotel_intro", title: tHotel('hotel-intro') },
    { id: "rooms_section", title: tHotel('choose-room') }
  );

  if (
    accommodationData?.facilities?.length
    ||
    (hotelData?.Facilities?.length && isSafaraneh)
  ) {
    anchorTabsItems.push(
      { id: "amenities_section", title: tHotel('hotel-facilities') }
    )
  }

  if (
    accommodationData?.policies?.length
    ||
    (isSafaraneh && (hotelData?.Policies?.length || accommodationData?.instruction?.length || accommodationData?.mendatoryFee?.length))
  ) {
    anchorTabsItems.push(
      { id: "terms_section", title: t('terms') }
    );
  }

  if(accommodationData?.description){
    anchorTabsItems.push(
      { id: "about_section", title: tHotel('about-hotel') }
    );
  }

  if(isSafaraneh && hotelData?.DistancePoints?.length){
    anchorTabsItems.push(
      { id: "attractions_section", title: tHotel('attraction') }
    );
  }

  if (reviewData?.reviewCount) {
    anchorTabsItems.push(
      { id: "reviews_section", title: tHotel('suggestion') }
    );
  }
  
  if(isSafaraneh && hotelData?.Similars){
    anchorTabsItems.push(
      { id: "similarhotels_section", title: tHotel('similar-hotels') }
    );
  }



  let BreadCrumptListUrl = "";

  if (isSafarlife && accommodationData?.city?.slug){
    BreadCrumptListUrl = accommodationData.city.slug;
  } else if(accommodationData.city?.name){
    const cityName = accommodationData.city.name.replaceAll(" ","-");

      if (i18n?.language === "fa" && process.env.LocaleInUrl !== "off") {
          BreadCrumptListUrl = `/fa/hotels/هتل-های-${cityName}`;
      } else if (i18n?.language === "ar") {
          BreadCrumptListUrl = `/hotels/فنادق-${cityName}`;
      } else {
          BreadCrumptListUrl = `/hotels/هتل-های-${cityName}`;
      }
  }

  if (checkin && checkout) {
      BreadCrumptListUrl += `/checkin-${checkin}/checkout-${checkout}`;
  }



  return (
    <>
      <Head>

        {sheet && (
          <>
            <title>{ sheet.pageTitle?.replace("{0}", siteName)}</title>

            <meta name="description" content={sheet.metaDescription?.replaceAll("{0}", siteName)} />
            <meta name="keywords" content={sheet.metaKeyword?.replaceAll("{0}", siteName)} />

            <meta property="og:site_name" content={siteName} key="site_name" />
            <meta
              property="og:title"
              content={sheet.pageTitle?.replace("{0}", siteName)}
              key="title"
            ></meta>
            <meta
              property="og:description"
              content={sheet.metaDescription?.replace("{0}", siteName)}
              key="description"
            ></meta>
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content={sheet.url}></meta>
            {/* <meta
              property="og:image"
              itemProp="image"
              content={hotelData.ImageUrl}
              key="image"
            ></meta> */}
            <meta name="og:locale" content="fa-IR" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:title" content={sheet.pageTitle?.replaceAll("{0}", siteName)} />
            <meta
              name="twitter:description"
              content={sheet.metaDescription?.replaceAll("{0}", siteName)}
            />
          </>
        )}

        <script
          id="script_detail_2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":[
              {
                "@type": "ListItem",
                "position": 1,
                "item":{
                  "@id": "${configWebsiteUrl}",
                  "name": "رزرو هتل"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item":{
                  "@id": "${script_detail_2_Url}",
                  "name": "هتل های ${accommodationData?.city?.name || ""}"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "${configWebsiteUrl}${sheet.url}",
                  "name": "${accommodationData.displayName}"
                }
              }
            ]
          }`
          }}
        />

        {accommodationData && accommodationData.faqs?.length !== 0 ? (
          <script
            id="script_detail_3"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  ${accommodationData.faqs &&
                accommodationData.faqs.map(
                  (item) => `{
                    "@type":"Question",
                    "name":"${item.question && item.question}",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"${item.answer &&
                    item.answer
                      .replace(/<\/?[^>]+(>|$)/g, '')
                      .replace(/&zwnj;/g, '')
                    }"
                    }
                  }`,
                )
                }
                ]
              }`,
            }}
          />
        ) : null}

        <script
          id="script_detail_1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org/",
            "@type": "Hotel",
            "priceRange": "${richSnippets?.priceRange || "قیمت موجود نیست"}",
            "telephone":"${accommodationData.telNumber || "تلفن ثبت نشده است."}",
            "image": "${accommodationData.galleries && accommodationData.galleries[0]?.filePath || accommodationData.picture?.path || ""}",
            "url": "${configWebsiteUrl}${sheet.url}",
            "name": "${accommodationData.displayName || accommodationData.name}",
            "description": "${sheet?.pageTitle?.replaceAll("{0}", siteName)}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${accommodationData?.city?.name || "شهر ثبت نشده است"}",
              "addressCountry":"IR",
              "postalCode":"${portalData?.billing?.zipCode || "کد پستی  وجود ندارد"}",
              "streetAddress": "${accommodationData.address || "آدرس وجود ندارد"}"
            },
            "checkinTime": "${accommodationData.policies?.find(x => x.keyword === "check-in")?.value || "14:00"}",
            "checkoutTime": "${accommodationData.policies?.find(x => x.keyword === "check-out")?.value || "12:00"}",
            "starRating": {
              "@type": "Rating",
              "ratingValue": "${accommodationData.rating || 5}"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${richSnippets?.rating?.ratingValue || '100'}",
              "reviewCount": "${richSnippets?.rating?.reviewCount || '1'}",
              "worstRating": "${richSnippets?.rating?.worstRating || '0'}",
              "bestRating": "${richSnippets?.rating?.bestRating || '100'}"
            }
          }`,
          }}
        />

      </Head>

      <ModalPortal
        show={showChangeDateModal}
        selector='modal_portal'
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">

          <div className="bg-white max-sm:mx-3 rounded-xl px-5 pt-10 pb-12 w-full max-w-md text-center">

            <CalendarError className="w-6 h-6 sm:w-10 sm:h-10 fill-neutral-400 mb-3 md:mb-4 inline-block" />

            <h5 className="text-md sm:text-xl font-semibold mb-4">
              {t("DatesAreExpired")}
            </h5>

            <div className="text-neutral-500 mb-4 md:mb-7 leading-7 text-sm text-center">
              {t("SorryTheDatesYouEnteredAreExpiredChooseDifferentDatesToViewHotelOptions")}.
            </div>


            <button
              type="button"
              className="max-w-full w-32 cursor-pointer bg-primary-700 hover:bg-primary-600 text-white h-10 px-5 rounded-md"
              onClick={() => {
                setShowChangeDateModal(false);
                setShowOnlyForm(true);
                searchFormWrapperRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('ChangeDates')}
            </button>

            <br />

            <button
              type='button'
              className='text-blue-500 mt-3'
              onClick={() => { setShowChangeDateModal(false) }}
            >
              {t("ContinueAnyway")}
            </button>


          </div>

        </div>

      </ModalPortal>

      <div className="max-w-container mx-auto px-3 sm:px-5 pt-5">
        <div className={theme1 ? "bg-white p-3" : "mb-4"}>

          {/* {!!hotelData.IsCovid && <div className='bg-emerald-700 leading-4 p-3 sm:p-4 text-white text-xs sm:text-sm rounded-md flex flex-wrap gap-2 items-center m-1 mb-3'>
            <Phone className='w-5 h-5 sm:w-6 sm:h-6 fill-current block' />
            جهت رزرو با شماره <a dir="ltr" href={`tel:${tel?.replace("021", "+9821") || "+982126150051"}`} className='underline text-sm sm:text-base'> {tel || "02126150051"} </a> تماس بگیرید.
          </div>} */}

          {theme2 ? (
            <BreadCrumpt
              hideHome
              items={[
                {
                  label:"رزرو هتل",
                  link:"/"
                },
                {
                  label:tHotel('seeHotelsIn', { city: accommodationData.city?.name || "" }),
                  link:BreadCrumptListUrl
                },
                {
                  label:accommodationData?.displayName || ""
                }
              ]}
             />
          ) : (
            <BackToList url={BreadCrumptListUrl} cityName={accommodationData.city?.name || ""} />
          )}

        </div>

        {!!hotelImages?.length && <Gallery images={hotelImages} hotelName={accommodationData.displayName} />}
      </div>

      <AnchorTabs
        items={anchorTabsItems}
      />

      <div className="max-w-container mx-auto px-3 sm:px-5" id="hotel_intro">


        <HotelName 
          hotelData={ isSafaraneh ? hotelData : undefined} 
          reviewData={reviewData}
          accomodationData={accommodationData} 
        />

        {theme2 && <LoginLinkBanner
          message='با ورود به حساب کاربری از تخفیف رزرو این هتل استفاده کنید'
        />}


        <div ref={searchFormWrapperRef} className='pt-5'>
          {!!showOnlyForm && (
            <div
              className='fixed bg-black/75 backdrop-blur-sm top-0 bottom-0 right-0 left-0 z-[1]'
              onClick={() => { setShowOnlyForm(false) }}
            />
          )}
          <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7 relative z-[2]'>{t('change-search')}</h2>

          {!!formIsInView && <SearchForm
            defaultDestination={defaultDestination}
            defaultDates={defaultDates}
            wrapperClassName='relative z-[2]'
          />}
        </div>

      </div>

      {!!accommodationData.id && <Rooms hotelId={accommodationData.id} />}

      {(!isSafaraneh || accommodationData?.facilities?.length) ? (
        <AccommodationFacilities facilities={accommodationData?.facilities} />
      ) : hotelData?.Facilities?.length ? (
        <HotelFacilities facilities={hotelData.Facilities} />
      ) :
        null
      }

      {isSafaraneh?(
        <>
        {!!(hotelData?.Policies?.length || accommodationData?.instruction?.length || accommodationData?.mendatoryFee?.length) && <HotelTerms
          instruction={accommodationData?.instruction}
          mendatoryFee={accommodationData?.mendatoryFee}
          policies={hotelData?.Policies}
        />}
      </>
      ):(
        <AccomodationPolicy
          policies={accommodationData?.policies} 
          mendatoryFee={accommodationData?.mendatoryFee}
        />
      )}

      <HotelAbout siteName={siteName || ""} siteUrl={siteURL} description={accommodationData?.description} />

      {!!(isSafaraneh && hotelData?.DistancePoints?.length) && (
        <div id="attractions_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">
          <h2 className='text-lg lg:text-3xl font-semibold mb-3 md:mb-7'>{tHotel('attraction')}</h2>
          <div className='p-5 lg:p-7 bg-white rounded-xl'>
            <Attractions attractions={hotelData.DistancePoints} />
          </div>
        </div>
      )}

      {!!reviewData && <Comments hotelScoreData={allData.reviews} />}

      {!!(isSafaraneh && hotelData?.Similars) && <SimilarHotels similarHotels={hotelData.Similars} />}

      {!!(accommodationData?.faqs?.length) && <FAQ faqs={accommodationData.faqs} />}

      <AvailabilityTimeout
        minutes={20}
        onRefresh={() => {window.location.reload()}}
        type='hotel'
        description={t("GetTheLatestPriceAndAvailabilityForYourSearchTo", { destination: `${accommodationData.displayName}`, dates: `${dateDiplayFormat({ date: checkin || today, locale: locale, format: "dd mm" })} - ${dateDiplayFormat({ date: checkout || tomorrow, locale: locale, format: "dd mm" })}` })}
      />

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const isSafaraneh = process.env.PROJECT === "SAFARANEH" || process.env.PROJECT === "IRANHOTEL";

  let checkin = dateFormat(new Date());
  let checkout = dateFormat(addSomeDays(new Date()));

  const checkinSegment = query.hotelDetail.find((s: string) => s.includes("checkin"));
  const checkoutSegment = query.hotelDetail.find((s: string) => s.includes("checkout"));

  if (checkinSegment && checkinSegment) {
    checkin = dateFormat(new Date(checkinSegment.split("checkin-")[1]));
    checkout = dateFormat(new Date(checkoutSegment.split("checkout-")[1]));
  }

  const url = encodeURI(`/hotel/${query.hotelDetail![0]}&checkin=${checkin}&checkout=${checkout}`);

  let localePart = "/" + locale;
  if (process.env.LocaleInUrl === "off"){
    localePart = "";
  }

  const allData: any = await getDomesticHotelDetailsByUrl( localePart + url, locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR");

  if (allData?.data && (!allData?.data?.result?.hotel && !allData?.data?.result?.accommodation) && process.env.LocaleInUrl !== "off") {


    if (locale === "fa") {

      const allData_Ar: any = await getDomesticHotelDetailsByUrl("/ar" + url, "ar-AE");

      if (allData_Ar?.data?.result?.hotel || allData_Ar?.data?.result?.accommodation) {

        return ({
          redirect: {
            destination: "/ar" + url,
            locale: false,
            permanent: true
          },
          props: {},
        });

      } else {

        const allData_En: any = await getDomesticHotelDetailsByUrl("/en" + url, "en-US");

        if (allData_En?.data?.result?.hotel || allData_En?.data?.result?.accommodation) {

          return ({
            redirect: {
              destination: "/en" + url,
              locale: false,
              permanent: true
            },
            props: {},
          });

        } else {

          context.res.statusCode = 410;

          return ({
            props: {
              ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
              error410: "true"
            },
          });

        }
      }
    }


    if (locale === "en") {

      const allData_Fa: any = await getDomesticHotelDetailsByUrl("/fa" + url, "fa-IR");

      if (allData_Fa?.data?.result?.hotel || allData_Fa?.data?.result?.accommodation ) {

        return ({
          redirect: {
            destination: "/fa" + url,
            locale: false,
            permanent: true
          },
          props: {},
        });

      } else {

        const allData_Ar: any = await getDomesticHotelDetailsByUrl("/ar" + url, "ar-AE");

        if (allData_Ar?.data?.result?.hotel || allData_Ar?.data?.result?.accommodation) {

          return ({
            redirect: {
              destination: "/ar" + url,
              locale: false,
              permanent: true
            },
            props: {},
          });

        } else {

          context.res.statusCode = 410;
          return ({
            props: {
              ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
              error410: "true"
            },
          });

        }
      }
    }


    if (locale === "ar") {

      const allData_Fa: any = await getDomesticHotelDetailsByUrl("/fa" + url, "fa-IR");

      if (allData_Fa?.data?.result?.hotel || allData_Fa?.data?.result?.accommodation) {

        return ({
          redirect: {
            destination: "/fa" + url,
            locale: false,
            permanent: true
          },
          props: {},
        });

      } else {

        const allData_En: any = await getDomesticHotelDetailsByUrl("/en" + url, "en_US");

        if (allData_En?.data?.result?.hotel || allData_En?.data?.result?.accommodation) {

          return ({
            redirect: {
              destination: "/en" + url,
              locale: false,
              permanent: true
            },
            props: {},
          });

        } else {

          context.res.statusCode = 410;

          return ({
            props: {
              ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
              error410: "true"
            },
          });

        }
      }
    }

  }

  let allDataObject:any = null;

  if (allData.data?.result){
    allDataObject = {
      accommodation: allData.data.result.accommodation,
      richSnippets: allData.data.result.richSnippets,
      sheet: allData.data.result.sheet
    }
  }

  if (isSafaraneh && allData.data?.result){
    allDataObject = allData.data?.result;
  }

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      allData: allDataObject,
      deleteParameters: localePart + url 
    },
  })
}


export default HotelDetail;
