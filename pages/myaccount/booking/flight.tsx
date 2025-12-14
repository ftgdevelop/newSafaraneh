import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Image from 'next/image';
import { WebSiteDataType } from '@/modules/shared/types/common';
import { dateDisplayFormat, numberWithCommas } from '@/modules/shared/helpers';
import { Airpalne2, ArrowRight, EmailGrayIcon, Lock, PhoneGrayIcon, RightCaret, TakeOff, Tik, WhatsappGrayIcon } from '@/modules/shared/components/ui/icons';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import Tag from '@/modules/shared/components/ui/Tag';
import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import LoginSidebar from '@/modules/authentication/components/LoginSidebar';
import { flightGetReserveById } from '@/modules/flights/actions';
import { DomesticFlightGetReserveByIdType } from '@/modules/flights/types/flights';
import DownloadPdfVoucher from '@/modules/flights/components/booking/DownloadPdfVoucher';


const DomesticFlightReserveDetail: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    const { t } = useTranslation('common');
    const { t: tPayment } = useTranslation('payment');

    const router = useRouter();

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
    const username: string | undefined = pathArray.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId: string | undefined = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    const [reserveNotFound, setReserveNotFound] = useState<boolean>(false);
    const [reserveData, setReserveData] = useState<DomesticFlightGetReserveByIdType>();

    let departureFlight: DomesticFlightGetReserveByIdType['departureFlight'] | undefined = undefined;
    let returnFlight: DomesticFlightGetReserveByIdType['returnFlight'] | undefined = undefined;

    if (reserveData) {
        departureFlight = reserveData.departureFlight;
        returnFlight = reserveData.returnFlight;
    }

    const [copied, setCopied] = useState<boolean>(false);

    const phoneLink = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
    const phoneNumber = phoneLink?.replace("+98", "0");
    const email = portalData?.billing?.email || "";
    const whatsApp = portalData?.social?.whatsapp || "";

    useEffect(() => {

        if (username && reserveId) {

            const token = localStorage.getItem('Token') || "";

            const fetchDomesticFlightReserve = async () => {
                const response: any = await flightGetReserveById({ reserveId: reserveId, userName: username, token: token });
                if (response.data.result) {
                    setReserveData(response.data.result)
                } else {
                    setReserveNotFound(true);
                }
            }

            fetchDomesticFlightReserve();

        }

    }, [username, reserveId]);


    let status = null;

    let paymentLink = null;

    const price = (reserveData?.adultTotalPrice || 0) + (reserveData?.childTotalPrice || 0) + (reserveData?.infantTotalPrice || 0);

    if (reserveData) {

        let StatusColor = null;
        switch (reserveData.status) {

            case "Pending":
            case "Registered":
            case "OnCredit":
            case "InProgress":
                StatusColor = "bg-[#52c41a] text-white";
                break;
            case "Unavailable":
                StatusColor = "bg-[#e7412a] text-white";
                break;

            case "Canceled":
            case "PaymentSuccessful":
            case "WebServiceUnsuccessful":
                StatusColor = "bg-[#ffb6ab] text-red-800";
                break;

            case "Issued":
                StatusColor = "bg-[#1dac08] text-white";
                break;

            default:
                StatusColor = "bg-[#dddddd]";

            //what about these status?
            // "Undefined, Issued, WebServiceCancel, PriceChange, Refunded, Voided, InProgress, PaidBack, RefundInProgress, Changed"
        };

        status = <div className='text-center my-4'> <Tag className={`${StatusColor} leading-6`} > {tPayment(`${reserveData.status}`)} </Tag> </div>

        if (reserveData.status === "Pending") {
            paymentLink = (
                <Link
                    href={`/payment?username=${reserveData.username}&reserveId=${reserveData.id}`}
                    className='bg-[#1dac08] text-white flex items-center gap-2 justify-center rounded-sm h-12 sm:w-96 mx-auto mb-4 mt-6'
                >
                    <Lock className='w-5 h-5 fill-current' />
                    <span>{tPayment("pay-rial", { number: numberWithCommas(price) })}</span>
                </Link>
            );
        }

    }


    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className='grid gap-4 md:grid-cols-3'>
                    <div className='max-md:hidden'>
                        {userIsAuthenticated ? (
                            <AccountSidebar />
                        ) : (
                            <div className='border border-neutral-300 bg-white rounded-md mb-4 py-6'>
                                <LoginSidebar
                                    isNotModal
                                />
                            </div>
                        )}
                    </div>
                    <div className='md:col-span-2'>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                            {reserveNotFound ? (
                                <div className='p-5'>
                                    <p className='text-justify mb-4 text-sm'>
                                        متاسفانه دریافت اطلاعات این رزرو با خطا روبرو شد. لطفا برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.
                                    </p>

                                    <div className='border border-neutral-300 px-4 py-2 mb-4 flex items-center justify-between sm:w-96 mx-auto text-sm'>
                                        <div>
                                            کد پیگیری
                                            <div className='font-semibold'>
                                                {reserveId}
                                            </div>
                                            <p className='text-2xs text-neutral-500'>
                                                هنگام صحبت با پشتیبانی از این کد استفاده کنید
                                            </p>

                                        </div>

                                        <button
                                            type='button'
                                            className={`text-xs outline-none border-none ${copied ? "text-green-600" : "text-blue-600"}`}
                                            onClick={() => {
                                                if (reserveId) {
                                                    navigator.clipboard.writeText(reserveId);
                                                    setCopied(true);
                                                }
                                            }}
                                        >
                                            {copied ? (
                                                <>
                                                    <Tik className='w-4 h-4 fill-current inline-block align-middle' /> کپی شد
                                                </>
                                            ) : "کپی کن"}

                                        </button>
                                    </div>

                                </div>
                            ) : reserveData ? (
                                <>

                                    <div className='relative text-white'>
                                        <Image
                                            src="/images/flight-cabin.jpg"
                                            alt="flight"
                                            className='w-full h-44 object-cover'
                                            width={766}
                                            height={176}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />

                                        <div
                                            className='absolute top-0 bottom-0 right-0 left-0 bg-[#00314380]'
                                        />
                                        <Link
                                            href={userIsAuthenticated ? "/myaccount/booking" : "/signin"}
                                            className='absolute top-5 rtl:right-5 ltr:left-5 text-sm outline-none'
                                        >
                                            <RightCaret className='w-5 h-5 fill-current inline-block' />
                                            بازگشت به لیست رزروها

                                        </Link>

                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3' >

                                            <h4 className='flex gap-5 justify-center items-center text-4xl font-semibold'>

                                                {departureFlight?.departureAirport?.city?.name}

                                                <div className="flex items-center gap-2 text-3xs tracking-wider" >
                                                    ....... <Airpalne2 className='w-5 h-5 fill-current rtl:mirror block' /> .......
                                                </div>

                                                {departureFlight?.arrivalAirport?.city?.name}
                                            </h4>

                                            <span className='text-sm'>
                                                {reserveData.tripType === 'Return' ? "رفت و برگشت" : "یک طرفه"}
                                            </span>

                                        </div>

                                        {!!departureFlight?.airline?.picture?.path && <img
                                            className='w-14 h-14 bg-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-1.5 bg-white border border-neutral-300'
                                            src={departureFlight?.airline.picture.path}
                                            alt={departureFlight?.airline.picture.altAttribute || departureFlight?.airline.name || ""}
                                        />}

                                    </div>

                                    <div className='p-4 pt-10'>
                                        <h1 className='text-center font-semibold text-2xl mb-3'>
                                            {departureFlight?.departureAirport?.city?.name} به {departureFlight?.arrivalAirport?.city?.name}
                                        </h1>

                                        <div className='text-sm text-center' >
                                            {dateDisplayFormat({ date: reserveData.departureTime, format: 'dd mm yyyy', locale: "fa" })}
                                        </div>

                                        {status}

                                        {paymentLink}

                                        {!!(reserveData.status === 'Issued' && reserveId && username) && (
                                            <DownloadPdfVoucher
                                                reserveId={reserveId}
                                                username={username}
                                                className="bg-primary-700 hover:bg-primary-800 text-white px-5 flex gap-2 items-center justify-center rounded-sm transition-all mb-4 w-full h-12 disabled:bg-neutral-500 disabled:cursor-not-allowed sm:w-96 mx-auto mb-4 mt-6"
                                            />
                                        )}

                                        <div className='border border-neutral-300 px-4 py-2 mb-4 flex items-center justify-between sm:w-96 mx-auto text-sm'>
                                            <div>
                                                کد پیگیری
                                                <div className='font-semibold'>
                                                    {reserveId}
                                                </div>
                                                <p className='text-2xs text-neutral-500'>
                                                    هنگام صحبت با پشتیبانی از این کد استفاده کنید
                                                </p>

                                            </div>

                                            <button
                                                type='button'
                                                className={`text-xs outline-none border-none ${copied ? "text-green-600" : "text-blue-600"}`}
                                                onClick={() => {
                                                    if (reserveId) {
                                                        navigator.clipboard.writeText(reserveId);
                                                        setCopied(true);
                                                    }
                                                }}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Tik className='w-4 h-4 fill-current inline-block align-middle' /> کپی شد
                                                    </>
                                                ) : "کپی کن"}

                                            </button>

                                        </div>

                                    </div>

                                </>
                            ) : (
                                <>
                                    <div className='py-14 bg-gray-300 mb-5'>
                                        <Skeleton className='w-32 mx-auto' />
                                    </div>
                                    <Skeleton className='w-40 mx-auto mb-4' />
                                    <Skeleton className='w-44 mx-auto mb-5' />
                                    <Skeleton type='button' className='w-24 mx-auto mb-5' />
                                    <div className='border border-neutral-300 px-4 py-4 mb-4 sm:w-96 mx-auto text-sm'>
                                        <Skeleton className='w-24 mb-4' />
                                        <Skeleton className='w-1/3 mb-4' />
                                        <Skeleton className='w-2/3' />
                                    </div>
                                </>
                            )}

                        </div>


                        {departureFlight ? (
                            <div className='border border-neutral-300 bg-white rounded-md mb-4 p-3 sm:p-5'>
                                <h2 className='font-semibold text-lg mb-5'> جزئیات پرواز </h2>

                                <div className="flex items-center gap-3 mb-3">
                                    <TakeOff className="w-6 h-6 fill-current rtl:mirror" />
                                    {!!returnFlight && <span> پرواز رفت: </span>}
                                    <b className="font-semibold block">{departureFlight.departureAirport?.city?.name}</b>
                                    <ArrowRight className="w-5 h-5 full-current rtl:mirror" />
                                    <b className="font-semibold block"> {departureFlight.arrivalAirport?.city?.name} </b>
                                </div>

                                <div className="text-xs text-neutral-500 flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                                    <span> شماره پرواز: <span className="font-sans"> {departureFlight.flightNumber} </span> </span>

                                    {!!departureFlight.departureAirport?.terminalId && (
                                        <span> پرواز از ترمینال شماره: {departureFlight.departureAirport?.terminalId} </span>
                                    )}

                                    <span> مقدار بار مجاز: {departureFlight.maxAllowedBaggage} کیلوگرم </span>

                                    <span> کلاس نرخی: {departureFlight.cabinClass?.name} ({departureFlight.cabinClass?.code}) </span>
                                </div>

                                <div className="p-3 bg-neutral-100 flex justify-between items-center gap-4 text-xs sm:text-sm mb-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        {departureFlight.airline?.picture?.path ? (
                                            <Image
                                                src={departureFlight.airline.picture.path}
                                                alt={departureFlight.airline.picture.altAttribute || departureFlight.airline.name || ""}
                                                title={departureFlight.airline.picture.titleAttribute || departureFlight.airline.name || ""}
                                                className="w-11 h-11 object-contain"
                                                width={44}
                                                height={44}
                                            />
                                        ) : (
                                            ""
                                        )}

                                        <div>
                                            {!!departureFlight.airline?.name && <div> {departureFlight.airline?.name} </div>}

                                            {!!departureFlight.airCraft?.manufacturer && <div className="font-sans"> {departureFlight.airCraft?.manufacturer} </div>}

                                            <div> {departureFlight.flightType === "System" ? "سیستمی" : "چارتر"} </div>

                                        </div>
                                    </div>

                                    <div>
                                        <b className="text-base font-semibold rtl:ml-2 ltr:mr-2">
                                            {departureFlight.departureAirport?.city?.name}
                                        </b>
                                        <span className="text-base font-semibold">
                                            {dateDisplayFormat({ date: departureFlight.departureTime, format: "HH:mm", locale: 'fa' })}
                                        </span>

                                        <div className="text-xs sm:text-sm">
                                            {dateDisplayFormat({ date: departureFlight.departureTime, format: "ddd dd mm", locale: "fa" })}
                                        </div>
                                    </div>

                                    {!!departureFlight.arrivalTime && <div>
                                        <b className="text-base font-semibold rtl:ml-2 ltr:mr-2">
                                            {departureFlight.arrivalAirport.city.name}
                                        </b>
                                        <span className="text-base font-semibold">
                                            {dateDisplayFormat({ date: departureFlight.arrivalTime, format: "HH:mm", locale: 'fa' })}
                                        </span>

                                        <div className="text-xs sm:text-sm">
                                            {dateDisplayFormat({ date: departureFlight.arrivalTime, format: "ddd dd mm", locale: "fa" })}
                                        </div>
                                    </div>}

                                </div>

                                {!!returnFlight && (
                                    <>
                                        <div className="flex items-center gap-3 mb-3">
                                            <TakeOff className="w-6 h-6 fill-current rtl:mirror" />
                                            <span> پرواز برگشت: </span>
                                            <b className="font-semibold block">{returnFlight.departureAirport?.city?.name}</b>
                                            <ArrowRight className="w-5 h-5 full-current rtl:mirror" />
                                            <b className="font-semibold block"> {returnFlight.arrivalAirport?.city?.name} </b>
                                        </div>

                                        <div className="text-xs text-neutral-500 flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                                            <span> شماره پرواز: <span className="font-sans"> {returnFlight.flightNumber} </span> </span>

                                            {!!returnFlight.departureAirport?.terminalId && (
                                                <span> پرواز از ترمینال شماره: {returnFlight.departureAirport.terminalId} </span>
                                            )}

                                            <span> مقدار بار مجاز: {returnFlight.maxAllowedBaggage} کیلوگرم </span>

                                            <span> کلاس نرخی: {returnFlight.cabinClass.name} ({returnFlight.cabinClass.code}) </span>
                                        </div>

                                        <div className="p-3 bg-neutral-100 flex justify-between items-center gap-4 text-xs sm:text-sm">

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                                {returnFlight.airline?.picture?.path ? (
                                                    <Image
                                                        src={returnFlight.airline.picture.path}
                                                        alt={returnFlight.airline.picture.altAttribute || returnFlight.airline.name || ""}
                                                        title={returnFlight.airline.picture.titleAttribute || returnFlight.airline.name || ""}
                                                        className="w-11 h-11 object-contain"
                                                        width={44}
                                                        height={44}
                                                    />
                                                ) : (
                                                    ""
                                                )}

                                                <div>
                                                    {!!returnFlight.airline?.name && <div> {returnFlight.airline.name} </div>}

                                                    {!!returnFlight.airCraft?.manufacturer && <div className="font-sans"> {returnFlight.airCraft.manufacturer} </div>}

                                                    <div> {returnFlight.flightType === "System" ? "سیستمی" : "چارتر"} </div>

                                                </div>
                                            </div>

                                            <div>
                                                <b className="text-base font-semibold rtl:ml-2 ltr:mr-2">
                                                    {returnFlight.departureAirport.city.name}
                                                </b>
                                                <span className="text-base font-semibold">
                                                    {dateDisplayFormat({ date: returnFlight.departureTime, format: "HH:mm", locale: 'fa' })}
                                                </span>

                                                <div className="text-xs sm:text-sm">
                                                    {dateDisplayFormat({ date: returnFlight.departureTime, format: "ddd dd mm", locale: "fa" })}
                                                </div>
                                            </div>

                                            {!!returnFlight.arrivalTime && <div>
                                                <b className="text-base font-semibold rtl:ml-2 ltr:mr-2">
                                                    {returnFlight.arrivalAirport.city.name}
                                                </b>
                                                <span className="text-base font-semibold">
                                                    {dateDisplayFormat({ date: returnFlight.arrivalTime, format: "HH:mm", locale: 'fa' })}
                                                </span>

                                                <div className="text-xs sm:text-sm">
                                                    {dateDisplayFormat({ date: returnFlight.arrivalTime, format: "ddd dd mm", locale: "fa" })}
                                                </div>
                                            </div>}

                                        </div>
                                    </>
                                )}

                            </div>
                        ) : (
                            <div className='border border-neutral-300 bg-white rounded-md p-5 mb-4'>
                                <Skeleton className='w-24 mb-4' />
                                <Skeleton className='w-1/3 mb-4' />
                                <Skeleton className='w-2/3 mb-4' />
                                <Skeleton className='w-3/4' />
                            </div>
                        )}


                        {!!(reserveData?.passengers?.length) && <div className='border border-neutral-300 bg-white rounded-md mb-4 p-3 sm:p-5'>

                            <h2 className='font-semibold text-lg mb-5'> اطلاعات مسافران </h2>

                            <label className='text-neutral-400 text-xs mb-2 block'> نام و نام خانوادگی </label>

                            {reserveData.passengers.map(passenger => (
                                <div key={passenger.id} className='mb-1 text-sm'>
                                    {passenger.persianFirstName ? `${passenger.persianFirstName} ${passenger.persianLastName}` : `${passenger.firstName} ${passenger.lastName}`}
                                </div>
                            ))}

                        </div>}


                        {!!reserveData && <div className='border border-neutral-300 bg-white rounded-md mb-4 p-3 sm:p-5'>

                            <h2 className='font-semibold text-lg mb-5'>  جزئیات قیمت </h2>

                            <div className='border border-neutral-300 p-3 md:p-5'>

                                {!!reserveData?.adultCount && (
                                    <div className='flex items-center justify-between border-b border-neutral-300 text-sm pb-3 mb-3'>
                                        <div>
                                            {t('adult')}  {reserveData?.adultCount} نفر
                                        </div>

                                        <span>{numberWithCommas(reserveData.adultTotalPrice)} {t('rial')}</span>
                                    </div>
                                )}

                                {!!reserveData?.childCount && (
                                    <div className='flex items-center justify-between border-b border-neutral-300 text-sm pb-3 mb-3'>
                                        <div>
                                            {t('child')}  {reserveData?.childCount} نفر
                                        </div>

                                        <span>{numberWithCommas(reserveData.childTotalPrice)} {t('rial')}</span>
                                    </div>
                                )}


                                {!!reserveData?.infantCount && (
                                    <div className='flex items-center justify-between border-b border-neutral-300 text-sm pb-3 mb-3'>
                                        <div>
                                            {t('infant')}  {reserveData?.infantCount} نفر
                                        </div>

                                        <span>{numberWithCommas(reserveData.infantTotalPrice)} {t('rial')}</span>
                                    </div>
                                )}


                                <div className='flex items-center justify-between font-semibold'>
                                    <div>
                                        مجموع
                                    </div>

                                    <span>{numberWithCommas(price)} {t('rial')}</span>
                                </div>

                            </div>

                        </div>}


                        {!!departureFlight && (
                            <div className='border border-neutral-300 bg-white rounded-md mb-4 p-3 sm:p-5 flex gap-3 flex-col sm:flex-row sm:justify-between sm:items-center'>
                                <div className='flex items-center gap-5'>
                                    <Image
                                        src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im05Ni4xODUgMzMuMDM0aDIxLjY1MnY4OC40MzJoLTIxLjY1MnoiIGZpbGw9IiNjMWNkZDMiLz48cGF0aCBkPSJtMTE3LjgzNyAxMjIuNDY1aC0yMS42NTFhMSAxIDAgMCAxIC0xLTF2LTg4LjQzMWExIDEgMCAwIDEgMS0xaDIxLjY1MWExIDEgMCAwIDEgMSAxdjg4LjQzMmExIDEgMCAwIDEgLTEgLjk5OXptLTIwLjY1MS0yaDE5LjY1MXYtODYuNDMxaC0xOS42NTF6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTEwLjE2MyAzMy4wMzRoMjEuNjUydjg4LjQzMmgtMjEuNjUyeiIgZmlsbD0iI2MxY2RkMyIvPjxwYXRoIGQ9Im0zMS44MTQgMTIyLjQ2NWgtMjEuNjUxYTEgMSAwIDAgMSAtMS0xdi04OC40MzFhMSAxIDAgMCAxIDEtMWgyMS42NTFhMSAxIDAgMCAxIDEgMXY4OC40MzJhMSAxIDAgMCAxIC0xIC45OTl6bS0yMC42NTEtMmgxOS42NTF2LTg2LjQzMWgtMTkuNjUxeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0yOC40OTMgNi41MzVoNzEuMDE0djExNC45MzFoLTcxLjAxNHoiIGZpbGw9IiNkOWUyZTkiLz48cGF0aCBkPSJtOTkuNTA3IDEyMi40NjVoLTcxLjAxNGExIDEgMCAwIDEgLTEtMXYtMTE0LjkzYTEgMSAwIDAgMSAxLTFoNzEuMDE0YTEgMSAwIDAgMSAxIDF2MTE0LjkzYTEgMSAwIDAgMSAtMSAxem0tNzAuMDE0LTJoNjkuMDE0di0xMTIuOTNoLTY5LjAxNHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDE1LjU2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgMjcuNjA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTM4LjY1NCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgNDUuODc0aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTY5LjUyMiA0NS44NzRoLTExLjA0NGExIDEgMCAwIDEgLTEtMXYtMTEuMDQ0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDQ0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ1LTJoOS4wNDV2LTkuMDQ0aC05LjA0NHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNzguMzAyIDMzLjgzaDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtODkuMzQ2IDQ1Ljg3NGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDQtMmg5LjA0NHYtOS4wNDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0zOC42NTQgNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNDkuNyA2NC4xNGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ0LTJoOS4wNDR2LTkuMDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im01OC40NzggNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNjkuNTIyIDY0LjE0aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDUtMmg5LjA0NXYtOS4wNGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA1Mi4wOTZoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgNjQuMTRoLTExLjA0NmExIDEgMCAwIDEgLTEtMXYtMTEuMDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0aC05LjA0NnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDcwLjM2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgODIuNDA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTUzLjEgOTYuMDdoMjEuOHYyNS4zOTVoLTIxLjh6IiBmaWxsPSIjOTI5N2FiIi8+PHBhdGggZD0ibTc0LjkgMTIyLjQ2NWgtMjEuOGExIDEgMCAwIDEgLTEtMXYtMjUuMzk1YTEgMSAwIDAgMSAxLTFoMjEuOGExIDEgMCAwIDEgMSAxdjI1LjRhMSAxIDAgMCAxIC0xIC45OTV6bS0yMC44LTJoMTkuOHYtMjMuMzk1aC0xOS44eiIgZmlsbD0iIzJmM2E1YSIvPjxnIGZpbGw9IiM4NDg3OWMiPjxwYXRoIGQ9Im0xMDUuNzA0IDQzLjE0Nmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgNTUuODk1aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTA1LjcwNCA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDgxLjM5Mmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgOTQuMTRoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgNDMuMTQ2aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDU1Ljg5NWg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTE2LjUyNSA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgODEuMzkyaDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDk0LjE0aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjwvZz48cGF0aCBkPSJtMTI3IDEyMi40NjVoLTEyNmExIDEgMCAwIDEgMC0yaDEyNmExIDEgMCAwIDEgMCAyeiIgZmlsbD0iIzJmM2E1YSIvPjwvc3ZnPg=="
                                        className='w-14 h-14 object-contain'
                                        width={56}
                                        height={56}
                                        alt='hotel'
                                    />

                                    <div>
                                        <h4 className='mb-2 text-lg font-semibold'>
                                            جستجوی هتل در {departureFlight.arrivalAirport?.city?.name}
                                        </h4>
                                        <p className='text-sm'>
                                            پیدا کردن بهترین هتل ها برای اقامت شما
                                        </p>

                                    </div>

                                </div>

                                <Link
                                    href='/'
                                    className='text-sm px-3 py-2 leading-5 bg-green-600 text-white'
                                >
                                    جستجوی هتل
                                </Link>
                            </div>
                        )}

                        {!!reserveData ? (
                            <div className="border border-neutral-300 bg-white rounded-md mb-4 p-5">

                                <h5 className="font-semibold mb-2 text-lg">{tPayment("need-help")}</h5>

                                <p className="text-neutral-500 mb-4 text-sm">{tPayment("24hours-backup")}</p>

                                <div className='flex flex-col gap-4 md:flex-row md:justify-between text-xs'>

                                    <div className="flex gap-2 items-center">
                                        <PhoneGrayIcon />
                                        <div>
                                            <div>{t("contact-us")}</div>
                                            <a href={`tel:${phoneLink}`}>{phoneNumber}</a>
                                        </div>
                                    </div>

                                    {!!whatsApp &&
                                        <div className="flex gap-2 items-center">
                                            <WhatsappGrayIcon />
                                            <div>
                                                <div>{t("whatsapp")}</div>
                                                <a href={`https://api.whatsapp.com/send?phone=${whatsApp}`}>
                                                    <span dir="ltr">{whatsApp}</span>
                                                </a>
                                            </div>
                                        </div>
                                    }

                                    <div className="flex gap-2 items-center">
                                        <EmailGrayIcon />
                                        <div>
                                            <div>{t('email')}</div>
                                            <a href={`mailto:${email}`}>{email}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='border border-neutral-300 bg-white rounded-md p-5 mb-4'>
                                <Skeleton className='w-24 mb-4' />
                                <Skeleton className='w-1/3 mb-4' />
                                <Skeleton className='w-2/3 mb-4' />
                                <Skeleton className='w-3/4' />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'flight', 'payment']))
        },
    })
}

export default DomesticFlightReserveDetail;