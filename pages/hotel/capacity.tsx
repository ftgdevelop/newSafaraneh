import { domesticHotelGetReserveById } from '@/modules/domesticHotel/actions';
import CapacityAnimation from '@/modules/domesticHotel/components/capacity/CapacityAnimation';
import { DomesticHotelGetReserveByIdData } from '@/modules/domesticHotel/types/hotel';
import CountDown from '@/modules/shared/components/ui/CountDown';
import { TikCircle } from '@/modules/shared/components/ui/icons';
import Loading from '@/modules/shared/components/ui/Loading';
import Steps from '@/modules/shared/components/ui/Steps';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Capacity: NextPage = () => {

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const theme2 = process.env.THEME === "THEME2";

  const router = useRouter();

  const [reserveInfo, setReserveInfo] = useState<DomesticHotelGetReserveByIdData | undefined>(undefined);
  const [remainedSeconds, setRemainedSeconds] = useState<number>(600);
  
  let timerInterval: any = null;
  let interval: any = null;

  const fetchData = async () => {

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");

    const username = pathArray?.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId = pathArray?.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    if (reserveId && username) {
      const response: any = await domesticHotelGetReserveById({ reserveId: reserveId, userName: username });

      if (response.data) {
        if (!reserveInfo) {
          setReserveInfo(response.data.result);
        } else {
          if (response.data.result.status !== reserveInfo.status) {
            setReserveInfo(response.data.result);
          }
        }
        if (response.data.result?.status === 'Pending') {
          router.push(`/payment?reserveId=${reserveId}&username=${username}`);
        }else if(response.data.result?.status === 'UnConfirmed' || response.data.result?.status === 'Issued' || response.data.result?.status === 'Unavailable'){
          clearInterval(timerInterval);
          clearInterval(interval);
        }
      }
    }
  };


  const countDownTimer = () => {
    if (remainedSeconds > 0) {
      setRemainedSeconds((prevSeconds) => prevSeconds - 1);
    } else {
      clearInterval(timerInterval);
    }
  };

  useEffect(() => {
    timerInterval = setInterval(() => {
      countDownTimer();
    }, 1000);

    fetchData();

    interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(interval);
    };
  }, []);

  const theme1 = process.env.THEME === "THEME1";

  if(theme2){
    return(
      <>
      <Head>
        <title>{tHotel("checking-capacity")}</title>
      </Head>
      <div className='max-w-container mx-auto px-5 py-10 md:py-32 text-center'>
        <p className='text-lg mb-8'>
           کارشناسان ما در حال بررسی درخواست شما هستند.
          <br/>
          لطفا منتظر بمانید.  
        </p>

        {!!reserveInfo?.id && <div className='mb-6 md:mb-10'>
          کد پیگیری :
          {reserveInfo.id}
        </div>}
        
        <Image
          src="/images/capacity-git.gif"
          alt='check capacity'
          width={288}
          height={248}
          className='w-72 mx-auto block'
        />
      </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{tHotel("checking-capacity")}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>

        {!!theme1 && <Steps
          className='py-3 mb-2'
          items={[
            { label: t('completing-information'), status: 'done' },
            //{ label: tHotel('checking-capacity'), status: 'active' },
            { label: t('confirm-pay'), status: 'up-comming' },
            { label: t('complete-purchase'), status: 'up-comming' }
          ]}
        />}

        <div className='py-16 flex flex-col gap-5 items-center'>

          {(reserveInfo && (reserveInfo.status === "Unavailable" || reserveInfo.status === "UnConfirmed" || reserveInfo.status === "Issued")) || <CountDown seconds={remainedSeconds} />}

          <div className='mb-5 mt-2 max-w-lg text-center'>

            {remainedSeconds > 0 ? (
              (reserveInfo && (reserveInfo.status === "Unavailable" || reserveInfo.status === "UnConfirmed") ) ? (
                tHotel('capacity-full-desc')
              ) :  (reserveInfo && reserveInfo.status === "Issued") ? (
                <>
                  <TikCircle className='mb-5 w-16 h-16 fill-green-600 mx-auto' />
                  <strong className='font-semibold text-xl text-green-600'>
                    رزرو شما با موفقیت نهایی شده است.
                  </strong>
                </>
              ) :
              (
                <>
                  <p className='mt-3 mb-5'>
                    {tHotel('capacity-checking-desc1')}
                  </p>
                  <p className='mb-5'>
                    {tHotel('capacity-checking-desc2')}
                  </p>
                  <p>
                    {t("PleaseWaitAMoment")} ...
                  </p>

                </>
              )
            ) : (
              tHotel('capacity-sorry-waiting')
            )}

          </div>

          <CapacityAnimation failed={reserveInfo && (reserveInfo.status === "Unavailable" || reserveInfo.status === "UnConfirmed" )} />

          <div className='text-center'>
            <div className='mb-4'>{t('with-this-code')}</div>
            <div className='inline-flex gap-2 border border-2 border-dashed border-blue-700 px-5 py-2 mx-auto'>
              {t('tracking-code')} :{reserveInfo ? <b className='text-xl font-sans'> {reserveInfo.id} </b> : <Loading bgGray size='small' />}
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export const getStaticProps = async (context: any) => {
  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'hotel']),
      context: context
    }
  })
};

export default Capacity;
