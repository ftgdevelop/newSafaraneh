import { useEffect, useState } from 'react';
import { AvailabilityByHotelId, SearchHotels, getRates } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PricedHotelItem, SearchHotelItem } from '@/modules/domesticHotel/types/hotel';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
import HotelsList from '@/modules/domesticHotel/components/hotelsList';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import ProgressBarWithLabel from '@/modules/shared/components/ui/ProgressBarWithLabel';
import { useTranslation } from 'next-i18next';

type Props = {
  searchHotelsData?: {
    Hotels: SearchHotelItem[];
    Content?: string;
  };
  url: string;
}

const HotelList: NextPage<Props> = props => {

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

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const [fetchPercentage, setFetchPercentage] = useState<number>(0);

  const [ratesData, setRatesData] = useState<RatesResponseItem[] | undefined>();
  const [ratesLoading, setRatesLoading] = useState<boolean>(false);

  const [pricesData, setPricesData] = useState<PricesResponseItem[] | undefined>();
  const [pricesLoading, setPricesLoading] = useState<boolean>(false);

  let hotelIds: (undefined | number)[] = [];
  if (props.searchHotelsData) {
    hotelIds = props.searchHotelsData.Hotels?.map(hotel => hotel.HotelId) || [];
  }

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let checkin = today;
  let checkout = tomorrow;

  useEffect(() => {

    const fetchRates = async () => {

      setFetchPercentage(10);

      setRatesLoading(true);

      const ratesResponse = await getRates(hotelIds as number[], "fa-IR");
      if (ratesResponse?.data) {
        setRatesData(ratesResponse.data);
      }
      setRatesLoading(false);
    }

    fetchRates();

    const fetchPrices = async () => {
      setPricesLoading(true);
      const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: hotelIds as number[] }, 'fa-IR');
      if (pricesResponse.data?.result?.hotels) {
        setPricesData(pricesResponse.data.result.hotels)
      }
      setPricesLoading(false);
    }

    fetchPrices();


  }, []);


  const hotels: PricedHotelItem[] = props.searchHotelsData?.Hotels?.map(hotel => {

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

  let progressBarLabel;
  
  if(!pricesData){
    progressBarLabel = tHotel('getting-the-best-prices-and-availability');
  }
  
  if (!ratesData){
    progressBarLabel = tHotel('getting-guest-ratings');
  }
  
  if (ratesData && pricesData){
    progressBarLabel = tHotel('looking-for-cheaper-rates');
  }



  return (

    <>
      <div className='max-w-container mx-auto px-5 py-4'>
        <SearchForm wrapperClassName='pb-4' />

        {(fetchPercentage === 100) || <ProgressBarWithLabel
          className='mb-4'
          label={progressBarLabel}
          percentage={fetchPercentage}
        />}

        <div className='grid lg:grid-cols-4 gap-4'>
          <div className='col-span-1 bg-red-200'>
            filter
          </div>
          <div className='lg:col-span-3'>
            {!!props.searchHotelsData?.Hotels && <HotelsList
              hotels={hotels}
            />}
          </div>
        </div>

      </div>

    </>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = `/${locale}/hotels/${query.hotelList![0]}`;

  const searchHotelsResponse = await SearchHotels(url, locale);

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      url: url
    },
  })
}


export default HotelList;
