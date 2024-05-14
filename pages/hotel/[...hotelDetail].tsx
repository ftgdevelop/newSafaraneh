import { getDomesticHotelDetailsByUrl } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { PageDataType, PortalDataType } from '@/modules/shared/types/common';
import { DomesticAccomodationType, DomesticHotelDetailType, EntitySearchResultItemType, HotelScoreDataType } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/modules/domesticHotel/components/hotelDetails/BackToList';
import { CalendarError, Phone } from '@/modules/shared/components/ui/icons';
import Gallery from '@/modules/domesticHotel/components/hotelDetails/Gallery';
import HotelName from '@/modules/domesticHotel/components/hotelDetails/HotelName';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
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

type Props = {
  allData: {
    accommodation?: { result: DomesticAccomodationType };
    score?: HotelScoreDataType;
    page?: PageDataType;
    hotel?: DomesticHotelDetailType;
  };
  portalData: PortalDataType;
  error410?: "true";
}

const HotelDetail: NextPage<Props> = props => {

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

  useEffect(() => {
    setShowOnlyForm(false);
    const validDates = checkDateIsAfterDate(new Date(checkin), new Date(today)) && checkDateIsAfterDate(new Date(checkout), new Date(tomorrow));
    if (!validDates) {
      setShowChangeDateModal(true);
    }
  }, [checkin, checkout]);


  if (props.error410) {
    return (
      <NotFound code={410} />
    )
  }

  if (!allData) {
    return null;
  }

  const { accommodation, hotel: hotelData, page: pageData, score: hotelScoreData } = allData;

  const accommodationData = accommodation?.result;

  let defaultDestination: EntitySearchResultItemType | undefined = undefined;

  if (hotelData && hotelData.HotelId) {
    defaultDestination = {
      name: hotelData.HotelName,
      displayName: hotelData.HotelCategoryName + " " + hotelData.HotelName + " " + hotelData.CityName,
      type: 'Hotel',
      id: hotelData.HotelId
    }
  }

  let siteName = "";
  let tel = "";
  let twitter = "";
  let siteURL = "";

  if (portalData) {
    siteName = portalData.Phrases.find(item => item.Keyword === "Name")?.Value || "";

    tel = portalData.Phrases.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    twitter = portalData.Phrases.find(item => item.Keyword === "Twitter")?.Value || "";
    siteURL = portalData.PortalName || "";
  }

  if (!hotelData) {
    return null;
  }

  const configWebsiteUrl = process.env.SITE_NAME || "";


  let script_detail_2_Url;
  if (hotelData.CityName) {
    if (i18n && i18n.language === "fa") {
      script_detail_2_Url = `${configWebsiteUrl}/fa/hotels/هتل-های-${hotelData.CityName.replace(/ /g, "-")}`;
    } else if (i18n && i18n.language === "ar") {
      script_detail_2_Url = `${configWebsiteUrl}/ar/hotels/فنادق-${hotelData.CityName.replace(/ /g, "-")}`;
    } else {
      script_detail_2_Url = `${configWebsiteUrl}/en/hotels/${hotelData.CityName.replace(/ /g, "-")}`;
    }
  }


  return (
    <>
      <Head>

        {hotelData && (
          <>
            <title>{hotelData.PageTitle?.replace("{0}", siteName)}</title>

            <meta name="description" content={hotelData.MetaDescription?.replaceAll("{0}", siteName)} />
            <meta name="keywords" content={hotelData.MetaKeyword?.replaceAll("{0}", siteName)} />

            <meta property="og:site_name" content={siteName} key="site_name" />
            <meta
              property="og:title"
              content={hotelData.PageTitle?.replace("{0}", siteName)}
              key="title"
            ></meta>
            <meta
              property="og:description"
              content={hotelData.MetaDescription?.replace("{0}", siteName)}
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
            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:title" content={hotelData.PageTitle?.replaceAll("{0}", siteName)} />
            <meta
              name="twitter:description"
              content={hotelData.MetaDescription?.replaceAll("{0}", siteName)}
            />
          </>
        )}

        {!!hotelScoreData && <script
          id="script_detail_1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": "${hotelData?.PageTitle?.replaceAll("{0}", siteName)}",
            "description": "${hotelData?.BriefDescription}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${hotelData?.Address}"
            },
            "checkinTime": "14:00",
            "checkoutTime": "14:00",
            "telephone": "021-26150051",
            "image": "${hotelData?.ImageUrl}",
            "starRating": {
              "@type": "Rating",
              "ratingValue": "${hotelData?.HotelRating}"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${hotelScoreData.Satisfaction !== 0 ? hotelScoreData.Satisfaction : '100'
              }",
              "reviewCount": "${hotelScoreData.CommentCount !== 0 ? hotelScoreData.CommentCount : '1'
              }",
              "worstRating": "0",
              "bestRating": "100"
            }
          }`,
          }}
        />}

        <script
          id="script_detail_2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":
            [
              {
              "@type": "ListItem",
              "position": 1,
              "item":
              {
                "@id": "${configWebsiteUrl}",
                "name": "صفحه اصلی"
                }
              },
              {
              "@type": "ListItem",
              "position": 2,
              "item":
              {
                "@id": "${script_detail_2_Url}/location-${hotelData && hotelData.CityId}",
                "name": "هتل های ${hotelData && hotelData.CityName}"
              }
              }
            ]
          }`,
          }}
        />

        {accommodationData && accommodationData.faqs.length !== 0 ? (
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
        <div className='bg-white p-3'>
          {!!hotelData.IsCovid && <div className='bg-emerald-700 leading-4 p-3 sm:p-4 text-white text-xs sm:text-sm rounded-md flex flex-wrap gap-2 items-center m-1 mb-3'>
            <Phone className='w-5 h-5 sm:w-6 sm:h-6 fill-current block' />
            جهت رزرو با شماره <a dir="ltr" href={`tel:${tel?.replace("021", "+9821") || "+982126150051"}`} className='underline text-sm sm:text-base'> {tel || "02126150051"} </a> تماس بگیرید.
          </div>}

          <BackToList checkin={checkin} checkout={checkout} cityId={hotelData.CityId} cityName={hotelData.CityName} />
        </div>

        {!!hotelData.Gallery?.length && <Gallery images={hotelData.Gallery} />}
      </div>

      <AnchorTabs
        items={[
          { id: "pictures_section", title: tHotel('pictures') },
          { id: "hotel_intro", title: tHotel('hotel-intro') },
          { id: "rooms_section", title: tHotel('choose-room') },
          { id: "amenities_section", title: tHotel('hotel-facilities') },
          { id: "terms_section", title: t('terms') },
          { id: "about_section", title: tHotel('about-hotel') },
          { id: "attractions_section", title: tHotel('attraction') },
          { id: "reviews_section", title: tHotel('suggestion') },
          { id: "similarhotels_section", title: tHotel('similar-hotels') }
        ]}
      />

      <div className="max-w-container mx-auto px-3 sm:px-5" id="hotel_intro">

        <HotelName hotelData={hotelData} scoreData={hotelScoreData} />


        <div ref={searchFormWrapperRef} className='pt-5'>
          {!!showOnlyForm && (
            <div
              className='fixed bg-black/75 backdrop-blur-sm top-0 bottom-0 right-0 left-0 z-[1]'
              onClick={() => { setShowOnlyForm(false) }}
            />
          )}
          <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7 relative z-[2]'>{t('change-search')}</h2>

          <SearchForm
            defaultDestination={defaultDestination}
            defaultDates={defaultDates}
            wrapperClassName='relative z-[2]'
          />
        </div>

      </div>

      {!!hotelData.HotelId && <Rooms hotelId={hotelData.HotelId} />}

      {!!hotelData.Facilities?.length && <HotelFacilities facilities={hotelData.Facilities} />}

      {!!(hotelData.Policies?.length || accommodationData?.instruction?.length || accommodationData?.mendatoryFee?.length) && <HotelTerms
        instruction={accommodationData?.instruction}
        mendatoryFee={accommodationData?.mendatoryFee}
        policies={hotelData.Policies}
      />}

      {!!siteName && <HotelAbout siteName={siteName} siteUrl={siteURL} description={accommodationData?.description} />}

      {!!hotelData.DistancePoints?.length && (
        <div id="attractions_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">
          <h2 className='text-lg lg:text-3xl font-semibold mb-3 md:mb-7'>{tHotel('attraction')}</h2>
          <div className='p-5 lg:p-7 bg-white rounded-xl'>
            <Attractions attractions={hotelData.DistancePoints} />
          </div>
        </div>
      )}

      {!!pageData?.Id && <Comments hotelScoreData={hotelScoreData} pageId={pageData.Id} />}

      {!!hotelData.Similars && <SimilarHotels similarHotels={hotelData.Similars} />}

      {!!accommodationData?.faqs?.length && <FAQ faqs={accommodationData.faqs} />}

      <AvailabilityTimeout
        minutes={10}
        onRefresh={() => { window.location.reload() }}
        type='hotel'
        description={t("GetTheLatestPriceAndAvailabilityForYourSearchTo", { destination: hotelData.CityName, dates: `${dateDiplayFormat({ date: checkin || today, locale: locale, format: "dd mm" })} - ${dateDiplayFormat({ date: checkout || tomorrow, locale: locale, format: "dd mm" })}` })}
      />

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = encodeURI(`/hotel/${query.hotelDetail![0]}`);

  const allData: any = await getDomesticHotelDetailsByUrl("/" + locale + url, locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR");


  if (!allData?.data?.result?.hotel) {


    if (locale === "fa") {

      const allData_Ar: any = await getDomesticHotelDetailsByUrl("/ar" + url, "ar-AE");

      if (allData_Ar?.data?.result?.hotel) {

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

        if (allData_En?.data?.result?.hotel) {

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

      if (allData_Fa?.data?.result?.hotel) {

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

        if (allData_Ar?.data?.result?.hotel) {

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

      if (allData_Fa?.data?.result?.hotel) {

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

        if (allData_En?.data?.result?.hotel) {

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

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      allData: allData.data?.result || null
    },
  })
}


export default HotelDetail;
