import { getDomesticHotelDetailsByUrl } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { PageDataType, PortalDataType } from '@/modules/shared/types/common';
import { DomesticAccomodationType, DomesticHotelDetailType, EntitySearchResultItemType, HotelScoreDataType } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/modules/domesticHotel/components/hotelDetails/BackToList';
import { Phone } from '@/modules/shared/components/ui/icons';
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
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import AnchorTabs from '@/modules/shared/components/ui/AnchorTabs';

type Props = {
  allData: {
    accommodation?: { result: DomesticAccomodationType };
    score?: HotelScoreDataType;
    page?: PageDataType;
    hotel?: DomesticHotelDetailType;
  };
  portalData: PortalDataType;
}

const HotelDetail: NextPage<Props> = props => {

  const { portalData, allData } = props;

  const { accommodation, hotel: hotelData, page: pageData, score: hotelScoreData } = allData;

  const accommodationData = accommodation?.result;

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const router = useRouter();
  const searchInfo = router.asPath?.split("?")[0]?.split("#")[0];

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

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let defaultDates: [string, string] = [today, tomorrow];

  if (checkin && checkout) {
    defaultDates = [checkin, checkout];
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

  return (
    <>
      <Head>

        {hotelData && (
          <>          
            <title>{hotelData.PageTitle?.replace("{0}",siteName)}</title>
            
            <meta name="description" content={hotelData.MetaDescription?.replaceAll("{0}", siteName)} />
            <meta name="keywords" content={hotelData.MetaKeyword?.replaceAll("{0}", siteName)} />

            <meta property="og:site_name" content={siteName} key="site_name" />
            <meta
              property="og:title"
              content={hotelData.PageTitle?.replace("{0}",siteName)}
              key="title"
            ></meta>
            <meta
              property="og:description"
              content={hotelData.MetaDescription?.replace("{0}",siteName)}
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
                "@id": "${configWebsiteUrl}/fa/hotels/${hotelData && hotelData.CityName
              }/location-${hotelData && hotelData.CityId}",
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

        <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'>{t('change-search')}</h2>

        <SearchForm
          defaultDestination={defaultDestination}
          defaultDates={defaultDates}
        />

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

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = encodeURI(`/${locale}/hotel/${query.hotelDetail![0]}`);

  const allData: any = await getDomesticHotelDetailsByUrl(url, locale === "en" ? "en-US" : "fa-IR");

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      allData: allData.data?.result || null

    },
  })
}


export default HotelDetail;
