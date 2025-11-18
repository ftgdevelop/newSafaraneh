import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import Head from 'next/head';

import { domesticHotelGetValidate, domesticHotelPreReserve, getDomesticHotelSummaryDetailById } from '@/modules/domesticHotel/actions';
import Aside from '@/modules/domesticHotel/components/shared/Aside';
import { getDatesDiff, numberWithCommas, toPersianDigits } from '@/modules/shared/helpers';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelGetValidateResponse, DomesticHotelSummaryDetail } from '@/modules/domesticHotel/types/hotel';
import SpecialReauests from '@/modules/domesticHotel/components/checkout/SpecialRequests';
import ReserverInformation from '@/modules/domesticHotel/components/checkout/ReserverInformation';
import RoomItemInformation from '@/modules/domesticHotel/components/checkout/RoomItemInformation';
import DiscountForm from '@/modules/domesticHotel/components/checkout/DiscountForm';
import { registerDiscountCode, validateDiscountCode } from '@/modules/payment/actions';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { setReduxError } from '@/modules/shared/store/errorSlice';
import { dateFormat } from '@/modules/shared/helpers';
import Steps from '@/modules/shared/components/ui/Steps';
import Link from 'next/link';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { ArrowRight, Bed } from '@/modules/shared/components/ui/icons';
import { UserInformation } from '@/modules/authentication/types/authentication';
import { getTravelers } from '@/modules/shared/actions';
import { TravelerItem } from '@/modules/shared/types/common';
import AsideTheme2 from '@/modules/domesticHotel/components/shared/AsideTheme2';
import PassengerItemInformation from '@/modules/domesticHotel/components/checkout/PassengerItemInformation';
import Quantity from '@/modules/shared/components/ui/Quantity';
import { shabReserve } from '@/modules/shab/actions';

const Checkout: NextPage = () => {

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const theme3 = process.env.THEME === "THEME3";
  const theme2 = process.env.THEME === "THEME2";

  const theme1 = process.env.THEME === "THEME1";

  const isShab = process.env.PROJECT === "SHAB";

  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathSegments = router.asPath.split("?")[0].split("#")[0].split("/");
  const keySegment = pathSegments.find(item => item.includes('key='));
  const urlKey = keySegment?.split("key=")[1];

  const user: UserInformation | undefined = useAppSelector(state => state.authentication.isAuthenticated ? state.authentication.user : undefined);

  const [reserveInfo, setReserveInfo] = useState<DomesticHotelGetValidateResponse>();
  const [hotelInfo, setHotelInfo] = useState<DomesticHotelSummaryDetail>();
  const [reserverIsPassenger, setReserverIsPassenger] = useState<boolean>(true);

  const [roomsExtraBed, setRoomsExtraBed] = useState<number[]>([]);

  const [discountData, setDiscountData] = useState<any>();
  const [discountLoading, setDiscountLoading] = useState<boolean>(false);

  const [promoCode, setPromoCode] = useState<string>("");

  const [travelers, setTravelers] = useState<TravelerItem[] | undefined>(undefined);
  const [fetchingTravelersLoading, setFetchingTravelersLoading] = useState<boolean>(false);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [metaSearchName, setMetaSearchName] = useState<string>("");
  const [metaSearchKey, setMetaSearchKey] = useState<string>("");

  useEffect(()=>{
    if(process.env.SAFAR_MARKET_SITE_NAME){  
      let cookies = decodeURIComponent(document?.cookie).split(';');
      for (const item of cookies){
        if (item.includes("safarMarketHotelSmId=")){

          setMetaSearchKey(item.split("=")[1]);

          let sourceName = 'safarmarket';
          if (item.includes("safarMarketHotelUtmSource=")) {
            sourceName = item.split("=")[1];
          }
          setMetaSearchName(sourceName);
        }
      }
    }
  },[]);
  

  let backUrl: string = "";
  const checkinDate = reserveInfo?.checkin && new Date(reserveInfo.checkin);
  const checkoutDate = reserveInfo?.checkout && new Date(reserveInfo.checkout);

  if (hotelInfo && checkinDate && checkoutDate && hotelInfo.url) {

    const checkin = dateFormat(checkinDate);
    const checkout = dateFormat(checkoutDate);

    backUrl = `${hotelInfo.url}/checkin-${checkin}/checkout-${checkout}`;
  }

  useEffect(() => {

    const fetchData = async (key: string) => {

      const token = localStorage.getItem('Token') || "";

      const response: any = await domesticHotelGetValidate({key:key, acceptLanguage:'fa-IR', userToken :token});

      if (response?.data?.result) {
        setReserveInfo(response.data.result);

        setRoomsExtraBed(response.data.result.rooms.map((item: any) => (0)));

        const hotelId = response.data.result.accommodationId;

        if (!hotelId) return;

        const hotelDataResponse: { data?: { result?: DomesticHotelSummaryDetail } } = await getDomesticHotelSummaryDetailById(hotelId);
        if (hotelDataResponse.data?.result) {
          setHotelInfo(hotelDataResponse.data.result);
        }

      }

    }

    if (urlKey) {
      fetchData(urlKey);
    }

  }, [urlKey]);

  let hotelInformation: AsideHotelInfoType;
  let reserveInformation: AsideReserveInfoType;

  if (hotelInfo) {
    hotelInformation = {
      image: {
        url: hotelInfo.picture?.path,
        alt: hotelInfo.picture?.altAttribute || hotelInfo.displayName || "",
        title: hotelInfo.picture?.titleAttribute || hotelInfo.displayName || "",
      },
      name: hotelInfo.displayName || hotelInfo.name || "",
      rating: hotelInfo.rating,
      address: hotelInfo.address,
      Url: hotelInfo.url,
      CityId: hotelInfo.cityId || hotelInfo.city?.id
    }
  }

  let needToInquire = false;

  if (reserveInfo) {
    reserveInformation = {
      checkin: reserveInfo.checkin,
      checkout: reserveInfo.checkout,

      duration: getDatesDiff(new Date(reserveInfo.checkout), new Date(reserveInfo.checkin)),

      rooms: reserveInfo.rooms.map((roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => ({
        name: roomItem.name,
        boardName:roomItem.boardName,
        boardExtra: roomItem.boardExtra,
        cancellationPolicyStatus: roomItem.cancellationPolicyStatus,
        bed: roomItem.bed,
        extraBed: roomItem.extraBed,
        pricing: roomItem.pricing,
        nightly : roomItem.nightly
      })),

      salePrice: reserveInfo.rooms.reduce((totalPrice: number, roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          needToInquire = true;
          return totalPrice;
        }
      }, 0 as number),
      boardPrice: reserveInfo.rooms.reduce((totalPrice: number, roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          needToInquire = true;
          return totalPrice;
        }
      }, 0 as number)

    }
  }

  const submitHandler = async (params: any) => {

    if(metaSearchKey){
      params.metaSearchName = metaSearchName;
      params.metaSearchKey = metaSearchKey;
    }

    setSubmitLoading(true);

    const token = localStorage.getItem('Token');
    if (token){
     params.userToken = token;
    }

    delete params.agreeToRules;

    const reserveResponse: any = await domesticHotelPreReserve(params);

    if (reserveResponse.data && reserveResponse.data.result) {
      const id = reserveResponse.data.result.id;
      const username = reserveResponse.data.result.username;

      if (discountData?.isValid && promoCode) {
        await registerDiscountCode({
          discountPromoCode: promoCode,
          reserveId: id.toString(),
          username: username ,
          MetaSearchKey : metaSearchKey,
          MetaSearchName : metaSearchName
        });
      
      }

      //only in Shab
      let shabTracerId = "";
      if (isShab) {
        const cookies = decodeURIComponent(document?.cookie).split(';');
        for (const item of cookies) {
          if (item.includes("shabTrackerId=")) {
            shabTracerId = item.split("=")[1];
          }
        }
      }

      if (shabTracerId) {
        const reserveShabRes: any = await shabReserve({
          id: id,
          reserveType: "HotelDomestic",
          trackerId: shabTracerId,
          username: username
        });

        if (reserveShabRes?.message) {
          dispatch(setReduxError({
            title: tHotel('error-in-reserve-room'),
            message: reserveShabRes.message,
            isVisible: true,
            closeErrorLink: backUrl || "/",
            closeButtonText: backUrl ? tHotel('choose-room') : t("home")
          }))
        }
        if (reserveResponse?.data?.success) {
          if (reserveResponse.data.result.status === "Pending") {
            router.push(`/payment?reserveId=${id}&username=${username}`);
          } else {
            router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
          }
        }

      } else {
        if (reserveResponse.data.result.status === "Pending") {
          router.push(`/payment?reserveId=${id}&username=${username}`);
        } else {
          router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
        }
      }

    } else {

      dispatch(setReduxError({
        title: tHotel('error-in-reserve-room'),
        message: tHotel('sorry-room-is-full'),
        isVisible: true,
        closeErrorLink: backUrl || "/",
        closeButtonText: backUrl ? tHotel('choose-room') : t("home")
      }));

    }
  }

  const disableSyncedPassenger = () => {
    setReserverIsPassenger(false);
  }

  const getAllPassengers = (process.env.GET_ALL_PASSENFERS_DATA_IN_SAFAR_MARKET === "true") && metaSearchKey;

  let initialPassengers: {
    gender: true,
    firstName: '',
    lastName: '',
    roomNumber: number,
    extraBed: 0
  }[] = [];

  if (reserveInfo) {

    if (getAllPassengers) {
      initialPassengers = reserveInfo.rooms.flatMap((roomItem, index) => Array(roomItem.bed || 1).fill("P").map(_ => ({
        gender: true,
        firstName: '',
        lastName: '',
        roomNumber: index + 1,
        extraBed: 0
      }))
      );
    } else {
      initialPassengers = reserveInfo?.rooms.map((_, index) => ({
        gender: true,
        firstName: '',
        lastName: '',
        roomNumber: index + 1,
        extraBed: 0
      }))
    }
  }


  const initialValues = {
    reserver: {
      gender: user?.gender || true,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.emailAddress || "",
      nationalId: user?.nationalId || "",
      phoneNumber: user?.phoneNumber || "",
      passportNumber: ""
    },
    passengers: initialPassengers,
    specialRequest: "",
    preReserveKey: urlKey || "",
    agreeToRules: false
  }

  const discountSubmitHandler = async (value: string) => {

    setDiscountLoading(true);
    setDiscountData(undefined);

    const response = await validateDiscountCode({ 
      prereserveKey: urlKey!,
      type: 'HotelDomestic',
      discountPromoCode: value,
      MetaSearchKey:metaSearchKey,
      MetaSearchName: metaSearchName
    });

    setDiscountLoading(false);

    if (response?.data?.result) {
      setDiscountData(response.data.result);
      setPromoCode(value);
    } else if (response?.data?.error) {
      setDiscountData(response.data?.error);
    }

  }

  const fetchTravelers = async () => {
    setFetchingTravelersLoading(true);
    const token = localStorage.getItem('Token') || "";
    const response: any = await getTravelers(token, "fa-IR");
    if (response.data?.result?.items) {
      setTravelers(response.data?.result?.items);
    }
    setFetchingTravelersLoading(false);
  }


  return (
    <>
      <Head>
        <title>{t('completing-information')}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>

        {theme1 && <Steps
          className='py-3 mb-2'
          items={[
            { label: t('completing-information'), status: 'active' },
            //{ label: tHotel('checking-capacity'), status: 'up-comming' },
            { label: t('confirm-pay'), status: 'up-comming' },
            { label: t('complete-purchase'), status: 'up-comming' }
          ]}
        />}

        {backUrl ? (
          <Link href={backUrl} className={`text-sm text-blue-500 mb-4 inline-block  ${theme2 ? "mt-1 shadow-normal rounded-full hover:bg-blue-100 w-8 h-8 flex items-center justify-center" : ""}`}>
            <ArrowRight className='inline-block align-middle w-5 h-5 fill-current ltr:rotate-180' /> {!!(theme1 || theme3) && "برگشت به انتخاب اتاق"}
          </Link>
        ) : (
          <Skeleton className='mt-2 mb-3 w-60' />
        )}

        {reserveInfo ? (
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
          >
            {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
              if (isSubmitting && !isValid) {
                setTimeout(() => {
                  const formFirstError = document.querySelector(".has-validation-error");
                  if (formFirstError) {
                    formFirstError.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100)
              }
              return (

                <Form className={`md:grid ${(theme1 || theme3) ? "md:grid-cols-12 lg:grid-cols-3 gap-4" : "md:grid-cols-12 md:gap-5 lg:gap-20"}`} autoComplete='off' >

                  <div className={`${(theme1 || theme3) ? "md:col-span-7 lg:col-span-2" : "md:col-span-7"}`}>

                    <div className={`${(theme1 || theme3) ? "bg-white border border-neutral-300 p-5 rounded-lg" : ""}`}>

                      <ReserverInformation
                        errors={errors}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        values={values}
                        reserverIsPassenger={reserverIsPassenger}
                      />

                      <SpecialReauests />

                    </div>

                    <h5 className='font-semibold my-6'>
                      {t('fill-passengers-information')}
                    </h5>

                    {!!getAllPassengers && reserveInfo?.rooms?.map(
                      (roomItem, roomIndex, roomsArray) => {
                        
                        const extraBedPrice = roomItem.pricing?.find((item) => item.type === 'ExtraBed' && item.ageCategoryType === 'ADL')?.amount || 0;
                        
                        const roomFirstPassengerIndex = roomsArray.slice(0, roomIndex).reduce(
                          (count, currentItem) => (count + currentItem.bed) ,
                          0,
                        );

                        return (
                          <div className="bg-white border border-neutral-300 p-5 rounded-lg mb-5" key={roomIndex}>

                            <h5 className='font-semibold text-xl mb-4'>
                              <Bed className='w-5 h-5 fill-current inline-block align-middle rtl:ml-2 ltr:mr-2' /> {tHotel('room')} {toPersianDigits((roomIndex + 1).toString())} - {toPersianDigits(roomItem.name || "")}
                            </h5>

                            {Array(roomItem.bed || 1).fill("P").map((_, index) => {
                              let addedPassengers: number = 0;
                              if (roomIndex) {
                                for (let i = 0; i < roomIndex; i++) {
                                  addedPassengers += roomsArray[i].bed;
                                }
                              }
                              return (
                                <PassengerItemInformation
                                  multiPassenger={roomItem.bed > 1}
                                  fetchingTravelersLoading={fetchingTravelersLoading}
                                  travelers={travelers}
                                  fetchTravelers={fetchTravelers}
                                  clearTravelers={() => { setTravelers(undefined) }}
                                  values={values}
                                  errors={errors}
                                  touched={touched}
                                  roomIndex={roomIndex}
                                  passengerIndex={addedPassengers + index}
                                  roomPassengerIndex={index}
                                  roomItem={roomItem}
                                  setFieldValue={setFieldValue}
                                  key={roomIndex + "-" + index}
                                  disableSyncedPassenger={(roomIndex === 0 && index === 0) ? disableSyncedPassenger : undefined}
                                />
                              )
                            })}

                            {!!roomItem.extraBed && (
                              <div className={`border-t border-neutral-300 pt-4 mt-4 flex gap-4 justify-between items-center ${theme1 ? "md:col-span-3" : ""}`}>

                                <strong className="flex flex-wrap gap-1 md:gap-2 items-center font-semibold text-sm">
                                  تخت اضافه
                                  <span className="text-xs">
                                    ({numberWithCommas(extraBedPrice || 0)} {t('rial')} برای هر شب)
                                  </span>
                                </strong>

                                <div dir="ltr" className="whitespace-nowrap">
                                  <Quantity
                                    min={0}
                                    max={roomItem.extraBed}
                                    onChange={value => {
                                      setRoomsExtraBed(prevState => {
                                        const updatedValue = [...prevState];
                                        updatedValue[roomIndex] = value
                                        return (updatedValue)
                                      })
                                      setFieldValue(`passengers.${roomFirstPassengerIndex}.extraBed`, value)
                                    }}
                                  />
                                </div>

                              </div>
                            )}

                          </div>
                        )
                      }
                    )}

                    {!getAllPassengers && reserveInfo?.rooms?.map((roomItem, roomIndex) => (
                      <RoomItemInformation

                        fetchingTravelersLoading={fetchingTravelersLoading}
                        travelers={travelers}
                        fetchTravelers={fetchTravelers}
                        clearTravelers={() => { setTravelers(undefined) }}

                        values={values}
                        errors={errors}
                        touched={touched}
                        roomIndex={roomIndex}
                        roomItem={roomItem}
                        setFieldValue={setFieldValue}
                        key={roomIndex}
                        disableSyncedPassenger={roomIndex === 0 ? disableSyncedPassenger : undefined}
                        onChangeExtraBed={extraBedValue => {
                          setRoomsExtraBed(prevState => {
                            const updatedValue = [...prevState];
                            updatedValue[roomIndex] = extraBedValue
                            return (updatedValue)
                          })
                        }}
                      />
                    ))}

                    <DiscountForm
                      data={discountData}
                      loading={discountLoading}
                      onSubmit={discountSubmitHandler}
                    />

                  </div>

                  <div className={`${(theme1 || theme3) ? "md:col-span-5 lg:col-span-1" : "md:col-span-5"}`}>

                    {(theme1 || theme3) ? (
                      <Aside
                        hotelInformation={hotelInformation}
                        reserveInformation={reserveInformation}
                        hasSubmit
                        submitLoading={submitLoading}
                        roomExtraBed={roomsExtraBed}
                        discountLoading={discountLoading}
                        discountResponse={discountData?.isValid ? discountData : undefined}
                        rules={reserveInfo?.rules || undefined}
                      />
                    ) : (
                      <AsideTheme2
                        hotelInformation={hotelInformation}
                        reserveInformation={reserveInformation}
                        hasSubmit
                        submitLoading={submitLoading}
                        roomExtraBed={roomsExtraBed}
                        discountLoading={discountLoading}
                        discountResponse={discountData?.isValid ? discountData : undefined}
                        checkinTime={hotelInfo?.checkinTime}
                        checkoutTime={hotelInfo?.checkoutTime}
                      />
                    )}

                    {/* 
                    <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-orange-400'>
                      {hotelInfo ? (
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
                      {hotelInfo ? (
                        <>
                          <h5 className='font-semibold text-blue-500 mb-2 leading-6'>
                            {tHotel('recent-reserve-number')}
                          </h5>
                          <p className='text-2xs'>
                            {tHotel('theNumberOfRecentReservationsOfThisHotelIs', { number: hotelInfo?.TopSelling })}
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
                </Form>
              )
            }}
          </Formik>
        ) : (
          <div className='md:grid md:grid-cols-12 lg:grid-cols-3 gap-4'>
            <div className='md:col-span-7 lg:col-span-2'>
              <div className='bg-white border border-neutral-300 p-5 rounded-lg mb-6'>
                <Skeleton className='mb-6 w-40' />
                <Skeleton className='mb-5' />
                <Skeleton className='mb-5' />
                <Skeleton className='mb-5' />
                <Skeleton className='w-1/3' />
              </div>
              <h5 className='font-semibold my-6'>
                <Skeleton className='w-52' />
              </h5>
              <div className='bg-white border border-neutral-300 p-5 rounded-lg mb-6'>
                <Skeleton className='mb-6 w-40' />
                <Skeleton className='mb-5' />
                <Skeleton className='mb-5' />
                <Skeleton className='mb-5' />
                <Skeleton className='w-1/3 mb-5' />
                <Skeleton />
              </div>
              <div className='bg-white border border-neutral-300 p-5 rounded-lg'>
                <Skeleton className='mb-6 w-40' />
                <Skeleton className='w-1/3' />
              </div>
            </div>

            <div className='md:col-span-5 lg:col-span-1'>
              {
                theme2 ? <AsideTheme2 />
                  :
                  <Aside />
              }
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale as string, ['common', 'hotel']),
  },
})

export default Checkout;
