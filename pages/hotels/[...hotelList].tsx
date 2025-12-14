import { useEffect, useRef, useState } from 'react';
import { AvailabilityByHotelId, SearchAccomodation, getEntityNameByLocation, getRates } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EntitySearchResultItemType, PricedHotelItem, SearchAccomodationItem, SortTypes } from '@/modules/domesticHotel/types/hotel';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
import HotelsList from '@/modules/domesticHotel/components/hotelsList';
import { addSomeDays, checkDateIsAfterDate, dateDisplayFormat, dateFormat, replaceBrandNames, toPersianDigits } from '@/modules/shared/helpers';
import ProgressBarWithLabel from '@/modules/shared/components/ui/ProgressBarWithLabel';
import { useTranslation } from 'next-i18next';
import Select from '@/modules/shared/components/ui/Select';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import parse from 'html-react-parser';
import Accordion from '@/modules/shared/components/ui/Accordion';
import { CalendarError, ErrorIcon, QuestionCircle } from '@/modules/shared/components/ui/icons';
import DomesticHotelListSideBar from '@/modules/domesticHotel/components/hotelsList/sidebar';
import { setGuestPointFilterOptions, setTypeFilterOptions, setPriceFilterRange, setPromotionsFilterOptions } from '@/modules/domesticHotel/store/domesticHotelSlice';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { useRouter } from 'next/router';
import HotelsOnMap from '@/modules/domesticHotel/components/hotelsList/HotelsOnMap';
import Image from 'next/image';
import { getPageByUrl } from '@/modules/shared/actions';
import Head from 'next/head';
import { GetPageByUrlDataType, WebSiteDataType } from '@/modules/shared/types/common';
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import AvailabilityTimeout from '@/modules/shared/components/AvailabilityTimeout';
import LoginLinkBanner from '@/modules/shared/components/theme2/LoginLinkBanner';
import { getStrapiPages } from '@/modules/shared/actions/strapiActions';
import Link from 'next/link';
import { ServerAddress } from '@/enum/url';

type Props = {
  pageData:GetPageByUrlDataType;
  portalData: WebSiteDataType;
  accomodations?: SearchAccomodationItem[];
  strapiData?: any;
  url?: string;
}

const HotelList: NextPage<Props> = props => {
      
  const router = useRouter();

  const urlShabTrackerId = router.query?.tracker_id;
  
  useEffect(() => {
    if (urlShabTrackerId && process.env.USE_SHAB_TRACKER_ID === "true") {
      const expDate = new Date();
      expDate.setTime(expDate.getTime() + (7 * 24 * 60 * 60 * 1000));
      if (document) {
        document.cookie = `shabTrackerId=${urlShabTrackerId}; expires=${expDate.toUTCString()};path=/`;
      }
    }
  }, [urlShabTrackerId]);

  useEffect(()=>{
    const fetchPageData = async (url:string) => {
      const pageResponse : any = await getPageByUrl(url, acceptLanguage);
    }
    if(props.url){
      fetchPageData(props.url);
    }
  },[props.url]);

  let advBanner:{
    imageUrl: string;
    alt:string;
    title:string;
    url: string;
  } | undefined = undefined;

  if(props.strapiData){

    const strapiImagesMainUrl = ServerAddress.Strapi ? ((ServerAddress.Type || "https://") + ServerAddress.Strapi) : "";

    const banner = props.strapiData.find((item:any) => item.Keyword === "ads");
    const bannerUrl = banner?.Image?.data?.attributes?.url;
    if (bannerUrl){
      advBanner = {
        imageUrl: strapiImagesMainUrl + bannerUrl,
        alt: banner.ImageAlternative || "",
        title: banner.ImageTitle || "",
        url: banner.Url || "#"
      }
    }
  }

  const { pageData, portalData, accomodations } = props;

  const isSafaraneh = process.env.PROJECT === "SAFARANEH";

  const searchFormWrapperRef = useRef<HTMLDivElement>(null);

  type RatesResponseItem = {
    HotelId: number;
    Satisfaction: number;
    PositiveRowCount: number;
    TotalRowCount: number;
  }

  type PricesResponseItem = {
    id: number;
    salePrice: number;
    boardPrice: number;
    promotions?:{
      name?:string;
      description?:string;
    }[];
    availablityType?: "Online"| "Offline"| "Request"| "Completion";
  }

  const dispatch = useAppDispatch();

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const [fetchPercentage, setFetchPercentage] = useState<number>(0);

  const [ratesData, setRatesData] = useState<RatesResponseItem[] | undefined>();
  const [ratesLoading, setRatesLoading] = useState<boolean>(false);

  const [pricesData, setPricesData] = useState<PricesResponseItem[] | undefined>();
  const [pricesLoading, setPricesLoading] = useState<boolean>(false);

  const [sortFactor, setSortFactor] = useState<SortTypes>("priority");

  const [entity, setEntity] = useState<{ EntityName: string; EntityType: "City" | "Province" | "Hotel"; slug?: string;  }>();

  const [showMap, setShowMap] = useState<boolean>(false);

  const [showChangeDateModal, setShowChangeDateModal] = useState<boolean>(false);
  const [showOnlyForm, setShowOnlyForm] = useState<boolean>(false);

  let hotelIds: (undefined | number)[] = [];
  if (accomodations?.length) {
    hotelIds = accomodations?.map(hotel => hotel.id) || [];
  }

  let cityId: number;
  if (accomodations && accomodations[0]?.city?.id) {
    cityId = accomodations[0]?.city?.id;
  }

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let checkin = today;
  let checkout = tomorrow;

  const locale = router.locale;
  const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";

  const pathSegments = router.asPath?.split("/");

  const checkinSegment = pathSegments.find(item => item.includes("checkin"))?.split("?")[0]?.split("#")[0];
  const checkoutSegment = pathSegments.find(item => item.includes("checkout"))?.split("?")[0]?.split("#")[0];

  const locationId = pageData?.entityId;

  let searchInfo = "";
  if (checkinSegment) {
    checkin = checkinSegment.split("checkin-")[1];
    checkout = checkoutSegment ? checkoutSegment.split("checkout-")[1] : dateFormat(addSomeDays(new Date(checkin)));

    searchInfo = `/checkin-${checkin}/checkout-${checkout}`;
  }

  const savePriceRange = (pricedItems: PricesResponseItem[]) => {

    let min = 0;
    let max = 0;

    for (let i = 0; i < pricedItems.length; i++) {
      const itemPrice = pricedItems[i].salePrice;
      if ((!min || min > itemPrice) && itemPrice > 10000) {
        min = itemPrice;
      }
      if (!max || max < itemPrice) {
        max = itemPrice;
      }
    }

    dispatch(setPriceFilterRange({ min: min, max: max }));
  }

  const saveGuestPointFilterOptions = (rates: RatesResponseItem[]) => {

    const filterOptions = {
      excellent: { label: tHotel('excellent'), count: 0, value: [90, 100] },
      veryGood: { label: tHotel('very-good'), count: 0, value: [80, 89] },
      good: { label: tHotel('good'), count: 0, value: [70, 79] },
      fair: { label: tHotel('fair'), count: 0, value: [50, 69] },
      bad: { label: tHotel('bad'), count: 0, value: [0, 49] },
    }

    for (let i = 0; i < rates.length; i++) {
      const itemSatisfaction = rates[i].Satisfaction;

      if (itemSatisfaction >= 90) {
        filterOptions.excellent.count = filterOptions.excellent.count + 1;
      } else if (itemSatisfaction >= 80) {
        filterOptions.veryGood.count = filterOptions.veryGood.count + 1;
      } else if (itemSatisfaction >= 70) {
        filterOptions.good.count = filterOptions.good.count + 1;
      } else if (itemSatisfaction >= 50) {
        filterOptions.fair.count = filterOptions.fair.count + 1;
      } else {
        filterOptions.bad.count = filterOptions.bad.count + 1;
      }
    }

    const optionsArray = Object.values(filterOptions)

    dispatch(setGuestPointFilterOptions(optionsArray));

  }
  // const saveFacilityOptions = (hotelItems: SearchHotelItem[]) => {

  //   const options: { keyword: string, label: string, count: number }[] = [];

  //   for (let i = 0; i < hotelItems.length; i++) {
  //     const hotelItemFacilities = hotelItems[i].Facilities;

  //     if (!hotelItemFacilities?.length) continue;

  //     for (let j = 0; j < hotelItemFacilities.length; j++) {
  //       const facilityItem = hotelItemFacilities[j];

  //       const updatingOptionItem = options.find(item => item.keyword === facilityItem.Keyword);

  //       if (!facilityItem.Keyword) continue;

  //       if (updatingOptionItem) {
  //         updatingOptionItem.count = updatingOptionItem.count + 1;
  //       } else {
  //         options.push({ keyword: facilityItem.Keyword, label: facilityItem.Title || "", count: 1 })
  //       }

  //     }
  //   }

  //   dispatch(setFacilityFilterOptions(options));

  // }

  const saveHotelType = (hotelItems: SearchAccomodationItem[]) => {

    const options: { id: string, label: string, count: number }[] = [];

    for (let i = 0; i < hotelItems.length; i++) {

      const hotelItem = hotelItems[i];

      if (!hotelItem?.type) {
        continue;
      }

      const updatingOptionItem = options.find(item => item.id === hotelItem.type);

      if (updatingOptionItem) {
        updatingOptionItem.count = updatingOptionItem.count + 1
      } else {
        options.push({ id: hotelItem?.type, label: hotelItem.typeStr || "", count: 1 })
      }
    }

    dispatch(setTypeFilterOptions(options));

  }



  const saveOffersOptions = (hotelItems: PricedHotelItem[]) => {

    const options: { keyword: string, label: string, count: number }[] = [];

    for (let i = 0; i < hotelItems.length; i++) {

      const hotelItemPromotions = hotelItems[i].promotions;

      if (!hotelItemPromotions?.length) continue;

      for (let j = 0; j < hotelItemPromotions.length; j++) {
        const promotionItem = hotelItemPromotions[j];

        const updatingOptionItem = options.find(item => item.keyword === promotionItem.name);

        if (!promotionItem.name) continue;

        if (updatingOptionItem) {
          updatingOptionItem.count = updatingOptionItem.count + 1;
        } else {
          options.push({ keyword: promotionItem.name, label: promotionItem.name || "", count: 1 })
        }

      }
    }

    dispatch(setPromotionsFilterOptions(options));

  }

  useEffect(() => {
    if (accomodations) {

      saveHotelType(accomodations);

    }
  }, [accomodations]);


  const firstHotelName = accomodations && accomodations[0]?.displayName;

  useEffect(() => {

    setFetchPercentage(10);

    const fetchRates = async () => {

      setRatesLoading(true);
      setRatesData(undefined);

      const ratesResponse: { data?: RatesResponseItem[] } = await getRates(hotelIds as number[], acceptLanguage);

      if (ratesResponse?.data) {

        setRatesData(ratesResponse.data);

        saveGuestPointFilterOptions(ratesResponse.data);

      }

      setRatesLoading(false);
    }

    if(isSafaraneh){
      fetchRates();
    }


    const fetchPrices = async () => {
      setPricesLoading(true);
      setPricesData(undefined);
      
      if (!hotelIds?.length) return;

      const token = localStorage.getItem('Token') || "";
      
      const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: hotelIds as number[], userToken: token }, acceptLanguage);

      if (pricesResponse.data?.result?.hotels) {

        setPricesData(pricesResponse.data.result.hotels);

        savePriceRange(pricesResponse.data.result.hotels);

        saveOffersOptions(pricesResponse.data.result.hotels);

      }
      setPricesLoading(false);
    }

    fetchPrices();

    const fetchEntityDetail = async (id: number) => {
      
      if (!id) return;

      const entityResponse: any = await getEntityNameByLocation(id, acceptLanguage);

      if (entityResponse?.data?.result) {
        setEntity({ EntityName: entityResponse.data.result.name, EntityType: entityResponse.data.result.type, slug: entityResponse.data.result.slug });
      }
    }

    fetchEntityDetail(locationId || cityId);

  }, [firstHotelName, checkin, checkout, acceptLanguage]);


  useEffect(() => {
    setShowOnlyForm(false);
    const validDates = checkDateIsAfterDate(new Date(checkin), new Date(today)) && checkDateIsAfterDate(new Date(checkout), new Date(tomorrow));
    if (!validDates) {
      setShowChangeDateModal(true);
    }
  }, [checkin, checkout]);

  const hotels: PricedHotelItem[] = accomodations?.map(hotel => {

    const HotelRateData = ratesData?.find(item => item.HotelId === hotel.id);
    const ratesInfo = !isSafaraneh ? undefined : HotelRateData ? { Satisfaction: HotelRateData.Satisfaction, TotalRowCount: HotelRateData.TotalRowCount } : (ratesLoading || !ratesData) ? "loading" : undefined;


    const hotelPriceData = pricesData?.find(item => item.id === hotel.id);

    let priceInfo: "loading" | "notPriced" | { boardPrice: number, salePrice: number , availablityType?: "Online"| "Offline"| "Request"| "Completion"  };

    if (!pricesData || pricesLoading) {
      priceInfo = "loading";
    } else if (!hotelPriceData) {
      priceInfo = "notPriced";
    } else {
      priceInfo = { 
        boardPrice: hotelPriceData.boardPrice,
        salePrice: hotelPriceData.salePrice,
        availablityType: hotelPriceData.availablityType
       }
    }

    return ({
      ...hotel,
      ratesInfo: ratesInfo,
      priceInfo: priceInfo,
      promotions: hotelPriceData?.promotions
    })
  }) || [];

  useEffect(() => {

    if (isSafaraneh){
      if ( ratesData && pricesData) {
        setFetchPercentage(99.99);
        setTimeout(() => { setFetchPercentage(100) }, 1000);  
      } else if (ratesData || pricesData) {
        setTimeout(() => { setFetchPercentage(60) }, 1000);
      }
    }else{
      if ( pricesData) {
        setFetchPercentage(99.99);
        setTimeout(() => { setFetchPercentage(100) }, 1000);  
      } else {
        setFetchPercentage(70)
      }
    }

  }, [ratesData, pricesData]);

  let progressBarLabel = "";

  if (!pricesData || !isSafaraneh) {
    progressBarLabel = tHotel('getting-the-best-prices-and-availability');
  }

  if (!ratesData && isSafaraneh) {
    progressBarLabel = tHotel('getting-guest-ratings');
  }

  if (ratesData && pricesData) {
    progressBarLabel = tHotel('looking-for-cheaper-rates');
  }

  if (hotels.length > 1) {
    hotels.sort((b: PricedHotelItem, a: PricedHotelItem) => {

      switch (sortFactor) {

        case "priority":

          if (!a.displayOrder || !b.displayOrder) return 1;
          return (b.displayOrder - a.displayOrder);

        case "name":

          if (!a.displayName || !b.displayName) return 1;

          const farsiAlphabet = ["آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

          const x = a.displayName.toLowerCase().trim();
          const y = b.displayName.toLowerCase().trim();

          for (let i = 0; i < y.length; i++) {
            if (farsiAlphabet.indexOf(y[i]) < farsiAlphabet.indexOf(x[i])) {
              return -1;
            }
            if (farsiAlphabet.indexOf(y[i]) > farsiAlphabet.indexOf(x[i])) {
              return 1;
            }
          }

        case "starRate":

          if (!a.rating || !b.rating) return 1;
          return (a.rating - b.rating);

        case "price":
          if (b.priceInfo !== 'loading' && b.priceInfo !== 'notPriced' && a.priceInfo !== 'loading' && a.priceInfo !== 'notPriced') {
            return b.priceInfo.salePrice - a.priceInfo.salePrice
          } else if (b.priceInfo !== 'loading' && b.priceInfo !== 'notPriced') {
            return -1
          }
          return 1

        case "gueatRate":

          if (a.ratesInfo === "loading" || b.ratesInfo === 'loading') return 1;
          if (a.ratesInfo && b.ratesInfo) {
            return a.ratesInfo.Satisfaction - b.ratesInfo.Satisfaction
          } else if (b.ratesInfo?.Satisfaction) {
            return -1
          }
          return 1;

        default:
          return 1
      }
    });
  }

  const cityName = hotels && hotels[0]?.city?.name || "";

  const domesticHotelDefaultDates: [string, string] = [checkin, checkout];

  const defaultDestination: EntitySearchResultItemType = {
    name: entity?.EntityName,
    displayName: entity?.EntityName,
    type: entity?.EntityType || 'City',
    slug: entity?.slug || undefined
  }

  const urlSegments = router.asPath.split("/");
  const defaultDestinationIdSegment = urlSegments.find(item => item.includes('location'));
  if(defaultDestinationIdSegment){
    const defaultDestinationId = defaultDestinationIdSegment.split("-")[1];
    defaultDestination.id = +defaultDestinationId;
  }

  const filteredAvailability = urlSegments.find(item => item.includes('available'));
  const filteredName = urlSegments.find(item => item.includes('name-'))?.split("name-")[1];
  const filteredRating = urlSegments.find(item => item.includes('rating'))?.split("rating-")[1]?.split(",") || [];
  const filteredGuestPoints = urlSegments.find(item => item.includes('guestrate'))?.split("guestrate-")[1]?.split(",") || [];
  const filteredHotelType = urlSegments.find(item => item.includes('type'))?.split("type-")[1]?.split(",") || [];
  const filteredFacility = urlSegments.find(item => item.includes('amenities'))?.split("amenities-")[1]?.split(",") || [];
  const filteredPromotion = urlSegments.find(item => item.includes('promotions'))?.split("promotions-")[1]?.split(",") || [];
  const filteredPrice = urlSegments.find(item => item.includes('price'))?.split("price-")[1]?.split(",") || [];

  const filteredHotels = hotels.filter(hotelItem => {

    if (filteredAvailability && hotelItem.priceInfo === "notPriced") {
      return false;
    }

    if (filteredName && (!hotelItem.displayName || !hotelItem.displayName.includes(decodeURI(filteredName)))) {
      return false;
    }

    if (filteredRating.length && !filteredRating.some(item => +item === hotelItem.rating)) {
      return false;
    }

    if (filteredHotelType.length && !filteredHotelType.some(item => item === hotelItem?.type)) {
      return false;
    }

    if (filteredGuestPoints.length && (!hotelItem.priceInfo || !filteredGuestPoints.some(item => {
      const min = Number(item.split("-")[0]);
      const max = Number(item.split("-")[1]);
      const hotelSatisfaction = hotelItem.ratesInfo && hotelItem.ratesInfo !== "loading" ? Number(hotelItem.ratesInfo!.Satisfaction) : 0;
      return (hotelSatisfaction >= min && hotelSatisfaction <= max)
    }))) {
      return false;
    }

    if (filteredFacility.length && !filteredFacility.some(item => {
      const hotelsFacilities = hotelItem.facilities?.map(facilityItem => facilityItem.keyword);
      const decodedItem = decodeURI(item);
      return (hotelsFacilities?.includes(decodedItem));
    })) {
      return false;
    }

    if (filteredPromotion.length && !filteredPromotion.some(item => {
      const hotelsPromotion = hotelItem.promotions?.map(promotionItem => promotionItem.name);
      const decodedItem = decodeURI(item);
      return (hotelsPromotion?.includes(decodedItem));
    })) {
      return false;
    }


    if (
      filteredPrice.length &&
      hotelItem.priceInfo !== 'loading' &&
      (
        hotelItem.priceInfo === 'notPriced'
        ||
        hotelItem.priceInfo.salePrice < +filteredPrice[0]
        ||
        hotelItem.priceInfo.salePrice > +filteredPrice[1]
      )
    ) {
      return false;
    }

    return true

  })

  let fallbackLocation: [number, number] | undefined;
  const firstHotelWithLocation = hotels.find(hotel => (hotel.coordinates?.latitude && hotel.coordinates.longitude));
  if (firstHotelWithLocation) {
    fallbackLocation = [firstHotelWithLocation.coordinates?.latitude!, firstHotelWithLocation.coordinates?.longitude!];
  }

  let siteName = portalData?.billing.name || "";

  let envSiteName = process.env.SITE_NAME;
  
  if (process.env.SITE_NAME?.includes("iranhotel")){
    envSiteName = "https://www.iranhotel.app";
  }

  let pageUrl = pageData?.url;

  if(pageUrl && process.env.LocaleInUrl === "off"){
    pageUrl = pageUrl.replace("fa/","");    
  }

  const canonicalUrl = pageUrl ? `${envSiteName}${pageUrl}` : "";

  const theme1 = process.env.THEME === "THEME1";
  const theme2 = process.env.THEME === "THEME2";

  const faqItems = pageData?.widget?.faqs || [];


  const options = {
      replace: (domNode: any) => {
          if (domNode.type === 'text') {
              domNode.data = replaceBrandNames(domNode.data);
              return domNode;
          }
      },
  };

  return (

    <>
      <Head>
        {!!pageData?.pageTitle && <title>{pageData?.pageTitle?.replaceAll("{0}", siteName)}</title>}

        <meta name="description" content={pageData?.metaDescription?.replaceAll("{0}", siteName)} />
        <meta name="keywords" content={pageData?.metaKeyword?.replaceAll("{0}", siteName)} />

        {!!canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {faqItems.length !== 0 ? (
          <script
            id="script_hotel_1"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  ${faqItems.map(
                item => `{
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

      {!!pricesData && <AvailabilityTimeout
        minutes={20}
        onRefresh={() => { window.location.reload() }}
        type='hotel'
        description={t("GetTheLatestPriceAndAvailabilityForYourSearchTo", { destination: cityName, dates: `${dateDisplayFormat({ date: checkin, locale: locale, format: "dd mm" })} - ${dateDisplayFormat({ date: checkout, locale: locale, format: "dd mm" })}` })}
      />}

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

      <div className={`max-w-container mx-auto ${theme2 ? "px-3 lg:grid lg:grid-cols-13 lg:gap-4" : "px-5"} py-4`} ref={searchFormWrapperRef}>

        <div className={theme2?"lg:col-span-11":""}>

          <SearchForm wrapperClassName="relative z-[2] mb-4" defaultDates={domesticHotelDefaultDates} defaultDestination={defaultDestination} />

          {(fetchPercentage === 100 || accomodations?.length === 0) || <ProgressBarWithLabel
            className="mt-4 mb-4"
            label={progressBarLabel}
            percentage={fetchPercentage}
          />}
          
          {!!showOnlyForm && (
            <div
              className='fixed bg-black/75 backdrop-blur-sm top-0 bottom-0 right-0 left-0 z-[1]'
              onClick={() => { setShowOnlyForm(false) }}
            />
          )}

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">

            <div>

              <button type='button' className='relative block w-full lg:mb-5' onClick={() => { setShowMap(true) }}>
                {theme2 ? (
                  <div className='border border-neutral-300 rounded-xl overflow-hidden'>
                    <Image src={theme2?"/images/staticmapTheme2.jpg":"/images/staticmap.png"} alt="showMap" className='block w-full h-28 object-cover' width={354} height={100} />
                    <div className='p-2 bg-white text-blue-600 text-sm'>
                      مشاهده روی نقشه
                    </div>
                  </div>
                ) : (
                  <>
                    <Image src="/images/map-cover.svg" alt="showMap" className='block border w-full h-24 rounded-xl object-cover' width={354} height={100} />
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-1 border-blue-600 rounded font-semibold select-none leading-5 text-xs whitespace-nowrap'>
                      {tHotel('viewHotelsOnMap', { cityName: entity?.EntityName || cityName })}
                    </span>
                  </>
                )}


              </button>

              <DomesticHotelListSideBar
                allHotels={hotels.length}
                filteredHotels={filteredHotels.length}
                priceIsFetched={!!pricesData}
                scoreIsFetched={!ratesLoading}
              />

            </div>

            <div className="lg:col-span-3" >
              {accomodations?.length ? (
                <>
                  <div className='flex justify-between mb-4 items-center'>
      
                    {hotels.length > 0 && pricesData && cityName ? (
                      <div className='text-sm max-sm:hidden'>
                        {theme2?(
                          <>
                          نتیجه جستجو در <b> {entity?.EntityName || cityName} </b>  : <b> {toPersianDigits(hotels.length.toString())} </b> هتل
                          </>
                        ):(
                          <>
                            <b> {hotels.length} </b> هتل در <b> {entity?.EntityName || cityName} </b> پیدا کردیم 
                          </>
                        )}
                      </div>
                    ) : (
                      <Skeleton className='w-52 max-sm:hidden' />
                    )}
      
                    <Select
                      items={[
                        { value: "priority", label: tHotel("priority") },
                        { value: "price", label: tHotel("lowest-price") },
                        { value: "starRate", label: tHotel("highest-star-rating") },
                        { value: "name", label: tHotel("hotel-name") },
                        { value: "gueatRate", label: tHotel("highest-guest-rating") }
                      ]}
                      value={sortFactor}
                      onChange={type => { setSortFactor(type as SortTypes) }}
                      label={t('sortBy')}
                      wrapperClassName='max-sm:grow sm:w-52'
      
                    />
                  </div>
      
                  {!!theme2 && <LoginLinkBanner message='وقتی وارد سیستم شوید همیشه بهترین قیمت‌های ما را دریافت خواهید کرد!' />}
      
                  {!!accomodations && <HotelsList
                    hotels={filteredHotels}
                    isFetching={pricesLoading}
                  />}
                </>
              ):(
                <div className='flex flex-col items-center justify-center text-red-500 font-semibold'>
                  <ErrorIcon className='block w-14 h-14 mx-auto mb-2 fill-current' />
                  متاسفانه برای این مقصد هتلی یافت نشد!
              </div>
              )}


              {pageData?.widget?.content?.description ? (
                <div className='py-10 text-justify inserted-content'>
                  {parse(pageData.widget.content.description, options)}
                </div>
              ):null}


              {faqItems.length > 0 && (
                <div className={`mt-10 ${theme1 ? "bg-white p-5 rounded-lg" : ""}`}>
                  <h5 className='font-semibold text-lg'>{t('faq')}</h5>
                  {faqItems.filter(faq => (faq.answer && faq.question)).map(faq => (
                    <Accordion
                      key={faq.question}
                      title={(<>
                        <QuestionCircle className='w-5 h-5 mt-.5 rtl:ml-2 ltr:mr-2 fill-current inline-block' />
                        {replaceBrandNames(faq.question || "")}
                      </>)}
                      content={parse(faq.answer!, options)}
                      WrapperClassName='mt-5'
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {!!theme2 && (
            <div className='hidden lg:block col-span-2'>
              <div className='sticky top-5'>
                <Link 
                  href={advBanner?.url || "#"}
                >
                  <Image
                    src={advBanner?.imageUrl || "/images/del/adv.png"}
                    alt={advBanner?.alt || 'adv'}
                    width={171}
                    height={1000}
                    className='w-full mb-5'
                  />
                </Link>
              </div>
            </div>
          )}


      </div>

      {!!showMap && <HotelsOnMap
        fallbackLocation={fallbackLocation}
        priceIsFetched={!!pricesData}
        scoreIsFetched={!!ratesData}
        allHotelsLength={hotels.length}
        setSort={setSortFactor}
        sortBy={sortFactor}
        closeMapModal={() => { setShowMap(false) }}
        hotels={filteredHotels.map(hotel => ({
          id: hotel.id,
          latitude: hotel.coordinates?.latitude,
          longitude: hotel.coordinates?.longitude,
          name: hotel.displayName || hotel.name || "",
          rating: hotel.rating,
          url: hotel.url + searchInfo,
          price: hotel.priceInfo,
          guestRate: hotel.ratesInfo,
          imageUrl: hotel.picture?.path
        }))}
      />}

    </>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
  const theme2 = process.env.THEME === "THEME2";

  let url = `/${locale}/hotels/${query.hotelList![0]}`;

  if (process.env.LocaleInUrl === "off"){
    url = `/hotels/${query.hotelList![0]}`;
  }
  
  const searchParameters : { url: string; EntityId?:string;} = {
    url:url
  }
  
  const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";
  
  const pageResponse : any = await getPageByUrl(url, acceptLanguage);

  if(pageResponse?.data?.result?.entityId){
    searchParameters.EntityId = pageResponse.data.result.entityId;
  }
  const locationId = query.hotelList!.find((item:string) => item.includes('locationId-'));
  if (locationId){
    searchParameters.EntityId = locationId.split("locationId-")[1];
  }

  const [searchAccomodationResponse, strapiResponse] = await Promise.all<any>([
    SearchAccomodation(searchParameters, acceptLanguage),
    (hasStrapi && theme2) ? await getStrapiPages('filters[Page][$eq]=hotel-list&populate[Sections][populate]=*') : undefined
  ]);

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'home'])),
      accomodations: searchAccomodationResponse?.data?.result || null,
      pageData: pageResponse?.data?.result || null,
      strapiData: strapiResponse?.data?.data[0]?.attributes?.Sections || null,
      url: url || null
    },
  })
}

export default HotelList;