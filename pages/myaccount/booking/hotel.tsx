import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Image from 'next/image';

import { domesticHotelGetReserveById, getDomesticHotelSummaryDetailById } from '@/modules/domesticHotel/actions';
import { WebSiteDataType } from '@/modules/shared/types/common';
import { DomesticHotelGetReserveByIdData, DomesticHotelSummaryDetail } from '@/modules/domesticHotel/types/hotel';
import { dateDisplayFormat, getDatesDiff, numberWithCommas } from '@/modules/shared/helpers';

import { Bed, DefaultRoom, DefaultRoomTheme2, Directions, Email, EmailGrayIcon, Location, Lock, Phone, PhoneGrayIcon, RightCaret, Tik, User, WhatsappGrayIcon } from '@/modules/shared/components/ui/icons';

import Skeleton from '@/modules/shared/components/ui/Skeleton';
import Tag from '@/modules/shared/components/ui/Tag';
import DownloadPdfVoucher from '@/modules/domesticHotel/components/booking/DownloadPdfVoucher';
import Rating from '@/modules/shared/components/ui/Rating';
import HotelMap from '@/modules/domesticHotel/components/hotelDetails/HotelMap';
import AccountSidebar from '@/modules/authentication/components/AccountSidebar';
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import LoginSidebar from '@/modules/authentication/components/LoginSidebar';

const DomesticHotelReserveDetail: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');
    const { t: tPayment } = useTranslation('payment');

    const isShab = process.env.PROJECT === "SHAB";

    const router = useRouter();

    const theme2 = process.env.THEME === "THEME2";

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
    const username: string | undefined = pathArray.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId: string | undefined = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    const [reserveNotFound, setReserveNotFound] = useState<boolean>(false);
    const [reserveData, setReserveData] = useState<DomesticHotelGetReserveByIdData>();
    const [hotelData, setHotelData] = useState<DomesticHotelSummaryDetail>();

    const [showMap, setShowMap] = useState<boolean>(false);

    const [copied, setCopied] = useState<boolean>(false);

    const phoneLink = portalData?.billing.telNumber || portalData?.billing.phoneNumber || "";
    const phoneNumber = phoneLink?.replace("+98", "0");
    const email = portalData?.billing?.email || "";
    const whatsApp = portalData?.social?.whatsapp || "";

    useEffect(() => {

        if (username && reserveId) {
            const fetchDomesticHotelReserve = async () => {
                
                const token = localStorage.getItem('Token') || "";

                const response: any = await domesticHotelGetReserveById({ reserveId: reserveId, userName: username, token:token });
                if (response.data.result) {
                    setReserveData(response.data.result)

                    const hotelDataResponse: { data?: { result?: DomesticHotelSummaryDetail } } = await getDomesticHotelSummaryDetailById(response.data.result.accommodationId || response.data.result.accommodation?.id);
                    if (hotelDataResponse.data?.result) {
                        setHotelData(hotelDataResponse.data.result);
                    }
                } else {
                    setReserveNotFound(true);
                }
            }

            fetchDomesticHotelReserve();

        }

    }, [username, reserveId]);


    let guests: number = 0;
    let price: number = 0;

    if (reserveData?.rooms) {
        guests = reserveData.rooms.reduce((sum, room) => (sum + room.bed), 0);
        price = reserveData.rooms.reduce((sum, room) => {
            const roomPrice = room.pricing?.find(x => x.ageCategoryType === "ADL" && x.type === "Room")?.amount || 0;
            return ((sum + roomPrice))
        }, 0);
    }

    let status = null;

    let paymentLink = null;

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
            case "Voided":
                StatusColor = "bg-[#e7412a] text-white";
                break;

            case "Canceled":
            case "PaymentSuccessful":
            case "WebServiceUnsuccessful":
                StatusColor = "bg-[#ffb6ab] text-red-800";
                break;

            case "Issued":
            case 'ContactProvider':
                StatusColor = "bg-[#1dac08] text-white";
                break;

            default:
                StatusColor = "bg-[#dddddd]";

            //what about these status?
            // "Undefined, Issued, WebServiceCancel, PriceChange, Refunded, Voided, InProgress, PaidBack, RefundInProgress, Changed"
        };

        status = <div className='text-center my-4'> <Tag className={`${StatusColor} leading-6`} > {tPayment(`${reserveData.status}`)} </Tag> </div>

        paymentLink = (
            <Link
                href={`/payment?username=${reserveData.username}&reserveId=${reserveData.id}`}
                className='bg-[#1dac08] text-white flex items-center gap-2 justify-center rounded-sm h-12 sm:w-96 mx-auto mb-4 mt-6'
            >
                <Lock className='w-5 h-5 fill-current' />
                <span>{tPayment("pay-rial", { number: numberWithCommas(price) })}</span>
            </Link>
        );

        if (
            reserveData.status === "Canceled"
            || reserveData.status === "Issued"
            || reserveData.status === "ContactProvider"
            || reserveData.status === "Registered"
            || reserveData.status === "Unavailable"
            || reserveData.status === "PaymentSuccessful"
            || reserveData.status === "WebServiceUnsuccessful"
            || reserveData.status === "Voided"
        ) {
            paymentLink = null;
        }

    }

    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className={`grid gap-4 ${isShab?"md:grid-cols-2":"md:grid-cols-3"}`}>
                    {!isShab && (
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
                    )}
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
                            ) : (reserveData && hotelData) ? (
                                <>

                                    <div className='relative text-white'>
                                        {hotelData.picture?.path ? (
                                            <Image
                                                src={hotelData.picture.path}
                                                alt={hotelData.picture.altAttribute || hotelData.picture.titleAttribute || hotelData.displayName || ""}
                                                className='w-full h-44 object-cover'
                                                width={766}
                                                height={176}
                                                onContextMenu={(e)=> e.preventDefault()}
                                            />
                                        ) : (
                                            <div
                                                className="p-10 bg-neutral-100 flex items-center justify-center h-full max-lg:rounded-t-lg lg:rtl:rounded-r-lg lg:ltr:rounded-l-lg"
                                            >
                                                {theme2?(
                                                    <DefaultRoomTheme2 className="fill-neutral-300 w-20 h-20" />
                                                ):(
                                                    <DefaultRoom className="fill-neutral-300 w-20 h-20" />
                                                )}
                                            </div>
                                        )}
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

                                        <h4 className='text-4xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> {hotelData.city.name || hotelData.displayName || ""} </h4>

                                        <Bed
                                            className='w-12 h-12 fill-blue-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-white border border-neutral-300'
                                        />

                                    </div>

                                    <div className='p-4 pt-10'>
                                        <h1 className='text-center font-semibold text-2xl mb-3'> {hotelData.displayName}</h1>

                                        <div className='flex gap-1 items-center justify-center'>

                                            {!!guests && <> {guests} <User className='w-5 h-5 fill-current rtl:ml-2 ltr:mr-2' /></>}

                                            {dateDisplayFormat({ date: reserveData.checkin, format: 'dd mm yyyy', locale: "fa" })} - {dateDisplayFormat({ date: reserveData.checkout, format: 'dd mm yyyy', locale: "fa" })}

                                        </div>

                                        {status}

                                        {paymentLink}

                                        {!!((reserveData.status === 'Issued' || reserveData.status === 'ContactProvider') && reserveId && username) && (
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



                        {!!hotelData ? (
                            <div className='border border-neutral-300 bg-white rounded-md mb-4 p-5'>

                                <h2 className='font-semibold text-lg mb-1'> {hotelData.displayName} </h2>

                                {hotelData.rating && <Rating number={hotelData.rating} className='mb-2' />}

                                <p className='flex gap-2 items-center mb-3 text-sm text-neutral-500'>
                                    <Location className='w-5 h-5 fill-current block' />
                                    {hotelData.address}
                                </p>

                                <div className='flex flex-col md:flex-row gap-y-1 gap-x-10 text-xs text-blue-800 font-semibold md:items-center border-b border-neutral-300 pb-5 mb-5'>
                                    {hotelData.coordinates.latitude && hotelData.coordinates.longitude &&
                                        <div className='flex gap-2 items-center'>

                                            <Directions className='w-5 h-5 fill-current block' />

                                            <button type='button'
                                                onClick={() => { setShowMap(true) }}
                                            >
                                                هتل روی نقشه
                                            </button>
                                            {!!(showMap && hotelData.coordinates?.latitude && hotelData.coordinates?.longitude) && <HotelMap
                                                closeMapModal={() => { setShowMap(false) }}
                                                latLong={[hotelData.coordinates.latitude, hotelData.coordinates.longitude]}
                                            />}
                                        </div>
                                    }

                                    <div className='flex gap-2 items-center'>
                                        <Phone className='w-5 h-5 fill-current' />
                                        <a href={`tel:${phoneLink}`}>{phoneNumber}</a>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <Email className='w-5 h-5 fill-current' />
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </div>
                                </div>

                                {reserveData && <div className='text-sm border-b border-neutral-300 pb-5 mb-5'>
                                    <div className='flex justify-between items-center mb-1' >
                                        تعداد شب
                                        <span>
                                            {getDatesDiff(new Date(reserveData.checkout), new Date(reserveData?.checkin))} {tHotel("night")}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center mb-1' >
                                        {t("checkin-date")}
                                        <span>
                                            {dateDisplayFormat({ date: reserveData.checkin, format: 'dd mm yyyy', locale: "fa" })}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center mb-1'>
                                        {t("checkout-date")}
                                        <span>
                                            {dateDisplayFormat({ date: reserveData.checkout, format: 'dd mm yyyy', locale: "fa" })}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center mb-1'>
                                        نام رزرو کننده
                                        <span>{reserveData.reserver?.firstName} {reserveData.reserver?.lastName}</span>
                                    </div>
                                </div>}

                                <div className='mb-2'> {t("reserve-details")} </div>
                                {reserveData?.rooms.map((roomItem, index) => (
                                    <div key={index} className='border border-neutral-300 p-5 mb-4 rounded-md sm:flex justify-between gap-5 text-sm'>

                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <Bed className='w-5 h-5 fill-current' />
                                                <span>{roomItem.name}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <User className='w-5 h-5 fill-current' />
                                                <span>{roomItem.bed} {t('adult')}</span>
                                            </div>
                                        </div>

                                        <div>
                                            {roomItem.passengers?.map((passengerItem, passengerIndex) => (
                                                <div key={passengerIndex}>
                                                    {passengerItem.firstName} {passengerItem.lastName}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='border border-neutral-300 bg-white rounded-md p-5 mb-4'>
                                <Skeleton className='w-24 mb-4' />
                                <Skeleton className='w-1/3 mb-4' />
                                <Skeleton className='w-2/3 mb-4' />
                                <Skeleton className='w-3/4 mb-4' />
                                <hr className='my-5' />
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-20' />
                                    <Skeleton className='w-24' />
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-20' />
                                    <Skeleton className='w-24' />
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-20' />
                                    <Skeleton className='w-24' />
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-20' />
                                    <Skeleton className='w-24' />
                                </div>
                                <hr className='my-5' />
                                <Skeleton className='w-24 mb-4' />
                                <Skeleton className='w-1/3 mb-4' />
                                <Skeleton className='w-2/3 mb-4' />
                            </div>
                        )}

                        {!!hotelData ? (
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
                        ):(
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
            ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'payment']))
        },
    })
}

export default DomesticHotelReserveDetail;