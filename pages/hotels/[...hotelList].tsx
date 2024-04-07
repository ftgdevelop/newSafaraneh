import { useEffect, useState } from 'react';
import { AvailabilityByHotelId, GetCityFaqById, SearchHotels, getEntityNameByLocation, getRates } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EntitySearchResultItemType, PricedHotelItem, SearchHotelItem, SortTypes } from '@/modules/domesticHotel/types/hotel';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
import HotelsList from '@/modules/domesticHotel/components/hotelsList';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import ProgressBarWithLabel from '@/modules/shared/components/ui/ProgressBarWithLabel';
import { useTranslation } from 'next-i18next';
import Select from '@/modules/shared/components/ui/Select';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import parse from 'html-react-parser';
import Accordion from '@/modules/shared/components/ui/Accordion';
import { QuestionCircle } from '@/modules/shared/components/ui/icons';
import DomesticHotelListSideBar from '@/modules/domesticHotel/components/hotelsList/sidebar';
import { setFacilityFilterOptions, setGuestPointFilterOptions, setTypeFilterOptions, setPriceFilterRange } from '@/modules/domesticHotel/store/domesticHotelSlice';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { useRouter } from 'next/router';
import HotelsOnMap from '@/modules/domesticHotel/components/hotelsList/HotelsOnMap';
import Image from 'next/image';
import { getPageByUrl } from '@/modules/shared/actions';
import Head from 'next/head';
import { PortalDataType } from '@/modules/shared/types/common';

type Props = {
  searchHotelsData?: {
    Hotels: SearchHotelItem[];
    Content?: string;
  };
  faq?: {
    items: {
      title: string;
      isActive: boolean;
      priority: number;
      question: string;
      answer: string;
      id: number;
    }[];
    totalCount: number;
  },
  pageData: {
    PageTitle?: string;
    MetaTags?: {
      Content?: string;
      Name?: string;
    }[];
    Url?: string;
  };
  portalData: PortalDataType;
}

const HotelList: NextPage<Props> = props => {

  const { pageData, faq, searchHotelsData, portalData } = props;

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

  const [entity, setEntity] = useState<{ EntityName: string; EntityType: "City" | "Province" | "Hotel" }>();

  const [showMap, setShowMap] = useState<boolean>(false);

  let hotelIds: (undefined | number)[] = [];
  if (searchHotelsData) {
    hotelIds = searchHotelsData.Hotels?.map(hotel => hotel.HotelId) || [];
  }

  let cityId: number;
  if (searchHotelsData?.Hotels[0]?.CityId) {
    cityId = searchHotelsData.Hotels[0].CityId;
  }


  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let checkin = today;
  let checkout = tomorrow;

  const router = useRouter();
  const pathSegments = router.asPath?.split("/");

  const locationSegment = pathSegments.find(item => item.includes("location"))?.split("?")[0]?.split("#")[0];
  const checkinSegment = pathSegments.find(item => item.includes("checkin"))?.split("?")[0]?.split("#")[0];
  const checkoutSegment = pathSegments.find(item => item.includes("checkout"))?.split("?")[0]?.split("#")[0];

  let locationId: number;
  if (locationSegment) {
    locationId = +locationSegment.split("location-")[1];
  }

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

  const saveFacilityOptions = (hotelItems: SearchHotelItem[]) => {

    const options: { keyword: string, label: string, count: number }[] = [];

    for (let i = 0; i < hotelItems.length; i++) {
      const hotelItemFacilities = hotelItems[i].Facilities;

      if (!hotelItemFacilities?.length) continue;

      for (let j = 0; j < hotelItemFacilities.length; j++) {
        const facilityItem = hotelItemFacilities[j];

        const updatingOptionItem = options.find(item => item.keyword === facilityItem.Keyword);

        if (!facilityItem.Keyword) continue;

        if (updatingOptionItem) {
          updatingOptionItem.count = updatingOptionItem.count + 1;
        } else {
          options.push({ keyword: facilityItem.Keyword, label: facilityItem.Title || "", count: 1 })
        }

      }
    }

    dispatch(setFacilityFilterOptions(options));

  }

  const saveHotelType = (hotelItems: SearchHotelItem[]) => {

    const options: { id: number, label: string, count: number }[] = [];

    for (let i = 0; i < hotelItems.length; i++) {

      const hotelItem = hotelItems[i];

      if (!hotelItem.HotelTypeId) {
        continue;
      }

      const updatingOptionItem = options.find(item => item.id === hotelItem.HotelTypeId);

      if (updatingOptionItem) {
        updatingOptionItem.count = updatingOptionItem.count + 1
      } else {
        options.push({ id: hotelItem.HotelTypeId, label: hotelItem.HotelTypeName || "", count: 1 })
      }
    }

    dispatch(setTypeFilterOptions(options));

  }

  useEffect(() => {
    if (searchHotelsData?.Hotels) {

      saveHotelType(searchHotelsData.Hotels);

      saveFacilityOptions(searchHotelsData.Hotels);

    }
  }, [searchHotelsData?.Hotels]);


  const firstHotelName = searchHotelsData?.Hotels[0]?.HotelName;

  useEffect(() => {

    const fetchRates = async () => {

      setFetchPercentage(10);

      setRatesLoading(true);
      setRatesData(undefined);

      const ratesResponse: { data?: RatesResponseItem[] } = await getRates(hotelIds as number[], "fa-IR");

      if (ratesResponse?.data) {

        setRatesData(ratesResponse.data);

        saveGuestPointFilterOptions(ratesResponse.data);

      }

      setRatesLoading(false);
    }

    fetchRates();

    const fetchPrices = async () => {
      setPricesLoading(true);
      setPricesData(undefined);
      const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: hotelIds as number[] }, 'fa-IR');
      if (pricesResponse.data?.result?.hotels) {
        setPricesData(pricesResponse.data.result.hotels);

        savePriceRange(pricesResponse.data.result.hotels);

      }
      setPricesLoading(false);
    }

    fetchPrices();


    const fetchEntityDetail = async (id: number) => {
      const entityResponse: any = await getEntityNameByLocation(id, 'fa-IR');

      if (entityResponse?.data?.result) {
        setEntity({ EntityName: entityResponse.data.result.name, EntityType: entityResponse.data.result.type });
      }
    }

    fetchEntityDetail(locationId || cityId);

  }, [firstHotelName, checkin, checkout]);


  const hotels: PricedHotelItem[] = searchHotelsData?.Hotels?.map(hotel => {

    const HotelRateData = ratesData?.find(item => item.HotelId === hotel.HotelId);
    const ratesInfo = HotelRateData ? { Satisfaction: HotelRateData.Satisfaction, TotalRowCount: HotelRateData.TotalRowCount } : (ratesLoading || !ratesData) ? "loading" : undefined;


    const hotelPriceData = pricesData?.find(item => item.id === hotel.HotelId);

    let priceInfo: "loading" | "notPriced" | "need-to-inquire" | { boardPrice: number, salePrice: number };

    if (!pricesData || pricesLoading) {
      priceInfo = "loading";
    } else if (!hotelPriceData) {
      priceInfo = "notPriced";
    } else if (hotelPriceData.salePrice < 10000) {
      priceInfo = "need-to-inquire";
    } else {
      priceInfo = { boardPrice: hotelPriceData.boardPrice, salePrice: hotelPriceData.salePrice }
    }

    return ({
      ...hotel,
      ratesInfo: ratesInfo,
      priceInfo: priceInfo
    })
  }) || [];

  useEffect(() => {

    if (ratesData && pricesData) {

      setFetchPercentage(99.99);

      setTimeout(() => { setFetchPercentage(100) }, 1000);

    } else if (ratesData || pricesData) {

      setTimeout(() => { setFetchPercentage(60) }, 1000);

    }

  }, [ratesData, pricesData]);

  let progressBarLabel = "";

  if (!pricesData) {
    progressBarLabel = tHotel('getting-the-best-prices-and-availability');
  }

  if (!ratesData) {
    progressBarLabel = tHotel('getting-guest-ratings');
  }

  if (ratesData && pricesData) {
    progressBarLabel = tHotel('looking-for-cheaper-rates');
  }

  if (hotels.length > 1) {
    hotels.sort((b: PricedHotelItem, a: PricedHotelItem) => {

      switch (sortFactor) {

        case "priority":

          if (!a.Priority || !b.Priority) return 1;
          return (b.Priority - a.Priority);

        case "name":

          if (!a.HotelName || !b.HotelName) return 1;

          const farsiAlphabet = ["آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

          const x = a.HotelName.toLowerCase().trim();
          const y = b.HotelName.toLowerCase().trim();

          for (let i = 0; i < y.length; i++) {
            if (farsiAlphabet.indexOf(y[i]) < farsiAlphabet.indexOf(x[i])) {
              return -1;
            }
            if (farsiAlphabet.indexOf(y[i]) > farsiAlphabet.indexOf(x[i])) {
              return 1;
            }
          }

        case "starRate":

          if (!a.HotelRating || !b.HotelRating) return 1;
          return (a.HotelRating - b.HotelRating);

        case "price":

          if (b.priceInfo !== 'loading' && b.priceInfo !== 'need-to-inquire' && b.priceInfo !== 'notPriced' && a.priceInfo !== 'loading' && a.priceInfo !== 'need-to-inquire' && a.priceInfo !== 'notPriced') {
            return b.priceInfo.salePrice - a.priceInfo.salePrice
          } else if (b.priceInfo !== 'loading' && b.priceInfo !== 'need-to-inquire' && b.priceInfo !== 'notPriced') {
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

  const cityName = hotels && hotels[0]?.CityName || "";



  const domesticHotelDefaultDates: [string, string] = [checkin, checkout];

  const defaultDestination: EntitySearchResultItemType = {
    name: entity?.EntityName,
    displayName: entity?.EntityName,
    type: entity?.EntityType || 'City'
  }


  const urlSegments = router.asPath.split("/");

  const filteredAvailability = urlSegments.find(item => item.includes('available'));
  const filteredName = urlSegments.find(item => item.includes('name-'))?.split("name-")[1];
  const filteredRating = urlSegments.find(item => item.includes('rating'))?.split("rating-")[1]?.split(",") || [];
  const filteredGuestPoints = urlSegments.find(item => item.includes('guestrate'))?.split("guestrate-")[1]?.split(",") || [];
  const filteredHotelType = urlSegments.find(item => item.includes('type'))?.split("type-")[1]?.split(",") || [];
  const filteredFacility = urlSegments.find(item => item.includes('amenities'))?.split("amenities-")[1]?.split(",") || [];
  const filteredPrice = urlSegments.find(item => item.includes('price'))?.split("price-")[1]?.split(",") || [];

  const filteredHotels = hotels.filter(hotelItem => {

    if (filteredAvailability && hotelItem.priceInfo === "notPriced") {
      return false;
    }

    if (filteredName && (!hotelItem.HotelName || !hotelItem.HotelName.includes(decodeURI(filteredName)))) {
      return false;
    }

    if (filteredRating.length && !filteredRating.some(item => +item === hotelItem.HotelRating)) {
      return false;
    }

    if (filteredHotelType.length && !filteredHotelType.some(item => +item === hotelItem.HotelTypeId)) {
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
      const hotelsFacilities = hotelItem.Facilities?.map(facilityItem => facilityItem.Keyword);
      const decodedItem = decodeURI(item);
      return (hotelsFacilities?.includes(decodedItem));
    })) {
      return false;
    }

    if (
      filteredPrice.length &&
      hotelItem.priceInfo !== 'loading' &&
      (
        hotelItem.priceInfo === 'notPriced'
        ||
        hotelItem.priceInfo === 'need-to-inquire'
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
  const firstHotelWithLocation = hotels.find(hotel => (hotel.Latitude && hotel.Longitude));
  if (firstHotelWithLocation) {
    fallbackLocation = [firstHotelWithLocation.Latitude!, firstHotelWithLocation.Longitude!];
  }

  
  let siteName = "";

  if (portalData) {
    siteName = portalData.Phrases.find(item => item.Keyword === "Name")?.Value || "";
  }

  return (

    <>
      <Head>
        {!!pageData?.PageTitle && <title>{pageData.PageTitle?.replaceAll("{0}", siteName)}</title>}

        {!!pageData?.MetaTags && pageData.MetaTags.map(item => (
          <meta name={item.Name} content={item.Content?.replaceAll("{0}", siteName)} key={item.Name} />
        ))}



        {faq && faq.items.length !== 0 ? (
          <script
            id="script_hotel_1"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  ${faq.items.map(
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

      <div className='max-w-container mx-auto px-5 py-4'>

        <SearchForm wrapperClassName='pb-4' defaultDates={domesticHotelDefaultDates} defaultDestination={defaultDestination} />

        {(fetchPercentage === 100) || <ProgressBarWithLabel
          className='mb-4'
          label={progressBarLabel}
          percentage={fetchPercentage}
        />}

        <div className='grid lg:grid-cols-4 gap-4'>

          <div className='col-span-1'>

            <button type='button' className='relative block w-full lg:mb-5' onClick={() => { setShowMap(true) }}>
              <Image src="/images/map-cover.svg" alt="showMap" className='block border w-full h-24 rounded-xl object-cover' width={354} height={100} />
              <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border-1 border-blue-600 rounded font-semibold select-none leading-5 text-xs whitespace-nowrap'>
                {tHotel('viewHotelsOnMap', { cityName: entity?.EntityName || cityName })}
              </span>
            </button>


            <DomesticHotelListSideBar
              allHotels={hotels.length}
              filteredHotels={filteredHotels.length}
              priceIsFetched={!!pricesData}
              scoreIsFetched={!!ratesData}
            />

          </div>

          <div className='lg:col-span-3'>

            <div className='flex justify-between mb-4 items-center'>

              {hotels.length > 0 && pricesData && cityName ? (
                <div className='text-sm max-sm:hidden'>
                  <b> {hotels.length} </b> هتل در <b> {entity?.EntityName || cityName} </b> پیدا کردیم
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

            {!!props.searchHotelsData?.Hotels && <HotelsList
              hotels={filteredHotels}
            />}

            {!!props.searchHotelsData?.Content && (
              <div className='text-sm text-justify mt-6 inserted-content'>
                {parse(props.searchHotelsData.Content)}
              </div>
            )}

            {props.faq && props.faq?.items?.length > 0 && (
              <div className='bg-white p-5 rounded-lg mt-10'>
                <h5 className='font-semibold text-lg'>{t('faq')}</h5>
                {props.faq.items.map(faq => (
                  <Accordion
                    key={faq.id}
                    title={(<>
                      <QuestionCircle className='w-5 h-5 mt-.5 rtl:ml-2 ltr:mr-2 fill-current inline-block' />
                      {faq.question}
                    </>)}
                    content={parse(faq.answer)}
                    WrapperClassName='mt-5'
                  />
                ))}
              </div>
            )}
          </div>
        </div>

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
          id: hotel.HotelId,
          latitude: hotel.Latitude,
          longitude: hotel.Longitude,
          name: hotel.HotelCategoryName + " " + hotel.HotelName + " " + hotel.CityName,
          rating: hotel.HotelRating,
          url: hotel.Url + searchInfo,
          price: hotel.priceInfo,
          guestRate: hotel.ratesInfo,
          imageUrl: hotel.ImageUrl
        }))}
      />}

    </>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = `/${locale}/hotels/${query.hotelList![0]}`;

  const searchHotelsResponse: {
    data?: {
      Hotels: SearchHotelItem[];
      Content?: string;
    };
  } = await SearchHotels({ url: url, cityId: +query.hotelList.find((item: string) => item.includes("location-"))?.split("location-")[1] }, locale);


  //getPageByUrl

  const pageResponse: any = await getPageByUrl(url, "fa-IR");

  //   const [BlogPost, recentBlogs, CategoriesName] = await Promise.all<any>([
  //     GetBlogPostDetails(context.query.DetailBlog),
  //     getBlogs({page:1, per_page:10}),
  //     GetCategories()
  // ]) 




  let faqResponse: any;
  if (searchHotelsResponse?.data?.Hotels[0]?.CityId) {
    faqResponse = await GetCityFaqById(searchHotelsResponse?.data?.Hotels[0].CityId);
  }

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      faq: faqResponse?.data?.result || null,
      pageData: pageResponse?.data || null
    },
  })
}

export default HotelList;