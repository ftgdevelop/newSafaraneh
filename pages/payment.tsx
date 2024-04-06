import Steps from '@/modules/shared/components/ui/Steps';
import { useState, useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { getReserveFromCoordinator } from '@/modules/shared/actions';
import { useRouter } from 'next/router';
import DomesticHotelAside from '@/modules/domesticHotel/components/shared/Aside';
import { domesticHotelGetReserveById, getDomesticHotelSummaryDetailById } from '@/modules/domesticHotel/actions';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelGetReserveByIdData, DomesticHotelSummaryDetail } from '@/modules/domesticHotel/types/hotel';
import { getDatesDiff } from '@/modules/shared/helpers';
import { TabItem } from '@/modules/shared/types/common';
import Tab from '@/modules/shared/components/ui/Tab';
import OnlinePayment from '@/modules/payment/components/OnlinePayment';
import CardToCard from '@/modules/payment/components/CardToCard';
import CreditPayment from '@/modules/payment/components/CreditPayment';
import { getReserveBankGateway, makeToken } from '@/modules/payment/actions';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setReduxError } from '@/modules/shared/store/errorSlice';
import CipAside from '@/modules/cip/components/shared/CipAside';
import { CipGetReserveByIdResponse } from '@/modules/cip/types/cip';
import { CipGetReserveById } from '@/modules/cip/actions';


const Payment: NextPage = () => {

  const { t } = useTranslation('common');

  const router = useRouter();

  const dispatch = useAppDispatch();

  const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
  const username = pathArray.find(item => item.includes("username="))?.split("username=")[1];
  const reserveId = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];
  const status: string | undefined = pathArray.find(item => item.includes("status="))?.split("status=")[1];

  const [type, setType] = useState<"Undefined" | "HotelDomestic" | "FlightDomestic" | "Bus" | "Package" | "Flight" | "Hotel" | "PnrOutside" | "Cip" | "Activity">();
  const [coordinatorPrice, setCoordinatorPrice] = useState<number>();
  const [domesticHotelReserveData, setDomesticHotelReserveData] = useState<DomesticHotelGetReserveByIdData>();
  const [domesticHotelData, setDomesticHotelData] = useState<DomesticHotelSummaryDetail>();
  const [bankGatewayList, setBankGatewayList] = useState([]);

  const [cipReserveInfo, setCipReserveInfo] = useState<CipGetReserveByIdResponse>();
  const [cipReserveInfoLoading, setCipReserveInfoLoading] = useState<boolean>(true);

  const [goToBankLoading, setGoToBankLoading] = useState<boolean>(false);

  const [expireDate, setExpireDate] = useState();

  useEffect(() => {

    const fetchType = async () => {

      if (username && reserveId) {
        const response: any = await getReserveFromCoordinator({ reserveId: reserveId, username: username });
        if (response?.data?.result) {
          setType(response.data.result.type);
          setCoordinatorPrice(response.data.result.salePrice);
        }
      }
    }

    fetchType();

    const getBankGatewayList = async () => {

      if (!reserveId) return;

      const response: any = await getReserveBankGateway(reserveId);
      if (response?.status == 200 && response.data.result) {
        setBankGatewayList(response.data.result[0]);
      } else {
        debugger;
        dispatch(setReduxError({
          title: t('error'),
          message: response.data.error.message,
          isVisible: true
        }));
      }
    };

    getBankGatewayList();

  }, [username, reserveId]);


  useEffect(() => {

    if (username && reserveId && type === 'HotelDomestic') {
      const fetchDomesticHotelReserve = async () => {
        const response: any = await domesticHotelGetReserveById({ reserveId: reserveId, userName: username });
        if (response.data.result) {
          setDomesticHotelReserveData(response.data.result)
          setExpireDate(response.data.result.expirTime);


          const hotelDataResponse: { data?: { result?: DomesticHotelSummaryDetail } } = await getDomesticHotelSummaryDetailById(response.data.result.accommodationId || response.data.result.accommodation?.id);
          if (hotelDataResponse.data?.result) {
            setDomesticHotelData(hotelDataResponse.data.result);
          }
        }
      }

      fetchDomesticHotelReserve();
    }

    if (username && reserveId && type === 'Cip') {
      
      const fetchCipData = async (reserveId: string, userName: string) => {
        
        setCipReserveInfoLoading(true);
        
        const respone: any = await CipGetReserveById({ reserveId: reserveId, userName: userName });
        
        setCipReserveInfoLoading(false);

        if (respone?.data?.result) {
          setCipReserveInfo(respone.data.result);
        }
      };

      fetchCipData(reserveId, username);
    }

  }, [type, username, reserveId]);


  const goTobank = async (gatewayId: number) => {

    if (!reserveId) return;

    setGoToBankLoading(true);

    const callbackUrl = window?.location?.origin + (i18n?.language === "fa" ? "/fa" : "en") + "/callback";

    const params = {
      gatewayId: gatewayId,
      callBackUrl: callbackUrl,
      reserveId: reserveId,
    };

    const response = await makeToken(params);
    if (response.status == 200) {
      window.location.replace(
        `https://payline.safaraneh.com/fa/Reserves/Payment/PaymentRequest?tokenId=${response.data.result.tokenId}`
      );
    } else {
      dispatch(setReduxError({
        title: t('error'),
        message: response.data.error.message,
        isVisible: true
      }));

      setGoToBankLoading(false);
    }
  };


  const tabItems: TabItem[] = [
    {
      key: '1',
      label: ("آنلاین"),
      children: (
        <OnlinePayment
          coordinatorPrice={coordinatorPrice}
          onSubmit={(bankId) => { goTobank(bankId) }}
          bankGatewayList={bankGatewayList}
          expireDate={expireDate}
          status={status}
          goToBankLoading={goToBankLoading}
          type={type}
        />
      ),
    },
    {
      key: '2',
      label: ("کارت به کارت"),
      children: (<CardToCard />),
    },
    {
      key: '3',
      label: ("اعتباری"),
      children: (<CreditPayment price={coordinatorPrice} />),
    }
  ];



  let domesticHotelInformation: AsideHotelInfoType | undefined = undefined;
  let domesticHotelReserveInformation: AsideReserveInfoType | undefined = undefined;

  if (domesticHotelData) {
    domesticHotelInformation = {
      image: {
        url: domesticHotelData.picture?.path,
        alt: domesticHotelData.picture?.altAttribute || domesticHotelData.displayName || "",
        title: domesticHotelData.picture?.titleAttribute || domesticHotelData.displayName || ""
      },
      name: domesticHotelData.displayName || domesticHotelData.name || "",
      rating: domesticHotelData.rating,
      address: domesticHotelData.address,
      Url: domesticHotelData.url,
      CityId: domesticHotelData.cityId || domesticHotelData.city?.id
    }
  }
  if (domesticHotelReserveData) {
    domesticHotelReserveInformation = {
      reserveId: domesticHotelReserveData.id,
      checkin: domesticHotelReserveData.checkin,
      checkout: domesticHotelReserveData.checkout,
      duration: getDatesDiff(new Date(domesticHotelReserveData.checkout), new Date(domesticHotelReserveData.checkin)),
      rooms: domesticHotelReserveData.rooms.map(roomItem => ({
        name: roomItem.name,
        board: roomItem.boardCode,
        cancellationPolicyStatus: roomItem.cancellationPolicyStatus,
        bed: roomItem.bed,
        pricing: roomItem.pricing,

      })),
      salePrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      selectedExtraBedCount: domesticHotelReserveData.rooms.reduce((totalSelectedExtraBeds: number, roomItem: any) => {
        const thisRoomHasExtraBed = roomItem.pricing.find((item: any) => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected);
        if (thisRoomHasExtraBed) {
          return totalSelectedExtraBeds + 1
        } else {
          return totalSelectedExtraBeds;
        }
      }, 0),
      selectedExtraBedPrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      boardPrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      promoCodePrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const itemPrice = roomItem.pricing.find(
          (item: any) => item.type === "PromoCode" && item.ageCategoryType === "ADL"
        )?.amount;
        if (itemPrice) {
          return totalPrice - +itemPrice
        } else {
          return totalPrice;
        }
      }, 0)
    }
  }

  return (
    <>

      <Head>
        <title>{t("bank-gateway")}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>

        <Steps
          className='py-3 mb-2'
          items={[
            { label: t('bank-gateway-page'), status: 'done' },
            { label: t('confirm-pay'), status: 'active' },
            { label: t('complete-purchase'), status: 'up-comming' }
          ]}
        />

        <div className='grid gap-4 md:grid-cols-3'>

          <div className='md:col-span-2'>
            <div className='bg-white rounded-lg border border-neutral-300 mb-4 p-4'>
              <h2 className='text-2xl mt-4 mb-8'> چگونه می خواهید پرداخت کنید؟ </h2>

              <Tab
                style2
                items={tabItems}
              />
            </div>

          </div>

          <div>

            {type === 'HotelDomestic' ? (
              <DomesticHotelAside hotelInformation={domesticHotelInformation} reserveInformation={domesticHotelReserveInformation} />
            ) : type === 'Cip' ? (
              <CipAside
                loading={cipReserveInfoLoading}
                reserveInfo={cipReserveInfo}
              />
            ) : null}


            {/* 
            <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-orange-400'>
              {domesticHotelInformation ? (
                <>
                  <h5 className='font-semibold text-orange-400 mb-2 leading-6'>
                    {t('price-will-increase')}
                  </h5>
                  <p className='text-2xs'>
                    {t('price-will-increase-desc')}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className='mb-3 w-1/3' />
                  <Skeleton className='mb- w-2/3' />
                </>
              )}

            </div> */}

            {/* <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-blue-500'>
              {domesticHotelInformation ? (
                <>
                  <h5 className='font-semibold text-blue-500 mb-2 leading-6'>
                    {tHotel('recent-reserve-number')}
                  </h5>
                  <p className='text-2xs'>
                    {tHotel('theNumberOfRecentReservationsOfThisHotelIs', { number: domesticHotelInformation?.TopSelling })}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className='mb-3 w-1/3' />
                  <Skeleton className='mb- w-2/3' />
                </>
              )}
            </div> */}

          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'payment']))

    },
  })
}

export default Payment;
