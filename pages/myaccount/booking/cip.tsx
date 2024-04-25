import AccountSidebar from "@/modules/authentication/components/AccountSidebar"
import LoginSidebar from "@/modules/authentication/components/LoginSidebar"
import { CipGetReserveById } from "@/modules/cip/actions"
import DownloadPdfVoucher from "@/modules/cip/components/booking/DownloadPdfVoucher"
import { CipGetReserveByIdResponse } from "@/modules/cip/types/cip"
import Skeleton from "@/modules/shared/components/ui/Skeleton"
import Tag from "@/modules/shared/components/ui/Tag"
import { Child, DefaultRoom, EmailGrayIcon, Group, PhoneGrayIcon, RightCaret, Tik, Travel, User3, WhatsappGrayIcon } from "@/modules/shared/components/ui/icons"
import { dateDiplayFormat, numberWithCommas } from "@/modules/shared/helpers"
import { useAppDispatch, useAppSelector } from "@/modules/shared/hooks/use-store"
import { PortalDataType } from "@/modules/shared/types/common"
import { GetServerSideProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CipReserveDetail: NextPage = ({ portalData }: { portalData?: PortalDataType }) => {

    const router = useRouter();

    const { t } = useTranslation('common');
    const { t: tPayment } = useTranslation('payment');

    const dispatch = useAppDispatch();

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const userLoginLoading = useAppSelector(state => state.authentication.getUserLoading);

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
    const username = pathArray.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    const [cipReserveInfo, setCipReserveInfo] = useState<CipGetReserveByIdResponse>();
    const [cipReserveInfoLoading, setCipReserveInfoLoading] = useState<boolean>(true);
    const [reserveNotFound, setReserveNotFound] = useState<boolean>(false);

    const [loginWithPassword, setLoginWithPassword] = useState<boolean>(true);


    const [copied, setCopied] = useState<boolean>(false);

    const phoneLink = portalData?.Phrases?.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    const phoneNumber = phoneLink?.replace("+98", "0");
    const email = portalData?.Phrases?.find(item => item.Keyword === "Email")?.Value || "";
    const whatsApp = portalData?.Phrases?.find(item => item.Keyword === "whatsapp")?.Value || "";


    useEffect(() => {

        const fetchCipData = async (reserveId: string, userName: string) => {

            setCipReserveInfoLoading(true);
            setReserveNotFound(false);

            const respone: any = await CipGetReserveById({ reserveId: reserveId, userName: userName });

            setCipReserveInfoLoading(false);

            if (respone?.data?.result) {
                setCipReserveInfo(respone.data.result);
            } else {
                setReserveNotFound(true);
            }
        };

        if (username && reserveId) {
            fetchCipData(reserveId, username);
        }

    }, [username, reserveId]);




    return (
        <div className='max-w-container mx-auto px-5 py-4'>

            <div className='grid gap-4 md:grid-cols-3'>
                <div className='max-md:hidden'>
                    {userIsAuthenticated ? (
                        <AccountSidebar />
                    ) : (
                        <div className='border border-neutral-300 bg-white rounded-md mb-4 py-6'>
                            <LoginSidebar
                                isNotModal
                                loginWithPassword={loginWithPassword}
                                setLoginWithPassword={setLoginWithPassword}
                                toggleLoginType={() => { setLoginWithPassword(prevState => !prevState) }}
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
                        ) : (cipReserveInfo) ? (
                            <>

                                <div className='relative text-white'>
                                    {cipReserveInfo.airport?.picture?.path ? (
                                        <Image
                                            src={cipReserveInfo.airport.picture.path}
                                            alt={cipReserveInfo.airport.picture.altAttribute || cipReserveInfo.airport.picture.titleAttribute || cipReserveInfo.airport.name || ""}
                                            className='w-full h-44 object-cover'
                                            width={766}
                                            height={176}
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        <div
                                            className="p-10 bg-neutral-100 flex items-center justify-center h-full max-lg:rounded-t-lg lg:rtl:rounded-r-lg lg:ltr:rounded-l-lg"
                                        >
                                            <DefaultRoom className="fill-neutral-300 w-20 h-20" />
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

                                    <h4 className='text-4xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> {cipReserveInfo.airport.name} </h4>

                                    <Travel
                                        className='w-12 h-12 fill-blue-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-white border border-neutral-300'
                                    />

                                </div>

                                <div className='p-4 pt-10'>

                                    <h1 className='text-center font-semibold text-2xl mb-3'> {`تشریفات فرودگاهی ${cipReserveInfo.airport.name}`} </h1>

                                    <div className='text-center'>
                                        {dateDiplayFormat({ date: cipReserveInfo.flightTime, format: 'dd mm yyyy', locale: "fa" })}
                                    </div>

                                    {(cipReserveInfo.status === 'Issued' && reserveId && username) ? (
                                        <DownloadPdfVoucher
                                            reserveId={reserveId}
                                            username={username}
                                            className="bg-primary-700 hover:bg-primary-800 text-white px-5 flex gap-2 items-center justify-center rounded-sm transition-all mb-4 w-full h-12 disabled:bg-neutral-500 disabled:cursor-not-allowed sm:w-96 mx-auto mb-4 mt-6"
                                        />
                                    ) : (
                                        <br />
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



                    {!!cipReserveInfo ? (
                        <div className='border border-neutral-300 bg-white rounded-md mb-4 p-5'>
                            <div className="mb-2 text-xs"> نام فرودگاه:  </div>

                            <h4 className="font-semibold mb-3"> <Travel className="w-5 h-5 full-current inline-block rtl:ml-2 ltr:mr-2" />  {cipReserveInfo.airport.name} {cipReserveInfo.airport.city.name} </h4>

                            <hr className="my-5" />

                            <div className="font-semibold text-sm mb-2"> اطلاعات پرواز </div>

                            <div className="flex items-center justify-between text-sm">
                                <div>شماره پرواز</div>
                                <div className="font-sans">
                                    {cipReserveInfo.flightNumber}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>نام ایرلاین</div>
                                <div>
                                    {cipReserveInfo.airline && cipReserveInfo.airline}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>تاریخ پرواز</div>
                                <div>
                                    {dateDiplayFormat({ date: cipReserveInfo.flightTime, locale: "fa", format: 'yyyy/mm/dd' })}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>ساعت پرواز</div>
                                <div className="font-sans">
                                    {cipReserveInfo.flightTime.split("T")[1]}
                                </div>
                            </div>



                            <hr className="my-3" />

                            {cipReserveInfo.passengers.length > 0 && (
                                <div>
                                    <div className="font-semibold text-sm mb-2"> اطلاعات مسافران </div>

                                    {cipReserveInfo.passengers.map((item, index) => <div className="flex items-center justify-between text-xs mb-1" key={index}>

                                        <div className="flex items-center gap-1.5">

                                            <span>{index+1}. {item.firstName} {item.lastName}</span>

                                            {item.service.items.map((itemService, keyService) =>
                                                <div key={keyService} className="bg-neutral-100 rounded px-2">
                                                    {itemService.name}
                                                </div>
                                            )}

                                        </div>

                                        {item.passengerType === 'Accompanying' ? (
                                            <Tag className="bg-neutral-50 border border-neutral-300 leading-6"> مشایعت کننده </Tag>
                                        ) : item.passengerType === "Adult" ? (
                                            <Tag className="bg-neutral-50 border border-neutral-300 leading-6">  بزرگسال </Tag>
                                        ) : (
                                            <Tag className="bg-neutral-50 border border-neutral-300 leading-6"> کودک </Tag>
                                        )}


                                    </div>)}
                                </div>
                            )}


                            {/* {cipReserveInfo.service.items.length > 0 && (
                                <div>
                                    <hr className="my-3" />

                                    <div className="font-semibold text-sm mb-2"> سرویس های اضافه انتخاب شده  </div>

                                    {cipReserveInfo.service.items.map((item, index) =>
                                        <div className="flex text-xs mb-3 gap-2" key={index}>
                                            <Image
                                                src={item.picture?.path || "https://cdn2.safaraneh.com/images/cip/services/default.jpg"}
                                                alt={item.picture?.altAttribute || ""}
                                                title={item.picture?.titleAttribute || ""}
                                                width={90}
                                                height={90}
                                                className="w-24 h-20 object-contain"
                                            />
                                            <div>
                                                <b className="font-semibold block">{item.name}</b>
                                                {item.type == "Pet" && <div>{item.count} عدد</div>}
                                                {item.type == "MeetingRoom" && <div>{item.count} عدد</div>}
                                                {item.type == "Conference" && <div>{item.count} عدد</div>}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            )} */}

                            {!!cipReserveInfo.transport.items.find(i => i.count > 0) && (
                                <div>

                                    <hr className="my-3" />

                                    <div className="font-semibold text-sm mb-2"> ترانسفر فرودگاهی </div>

                                    {cipReserveInfo.transport.items.map((item, index) =>
                                        <div className="flex text-xs mb-3 gap-2" key={index}>

                                            <Image
                                                src={item.picture?.path || "https://cdn2.safaraneh.com/images/cip/services/default.jpg"}
                                                alt={item.picture?.altAttribute || ""}
                                                title={item.picture?.titleAttribute || ""}
                                                width={90}
                                                height={90}
                                                className="w-24 h-20 object-contain"
                                            />

                                            <div>
                                                <b className="font-semibold block">{item.name}</b>
                                                <div>{item.count} عدد</div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-sm"> آدرس : {cipReserveInfo.transport.items[0]?.address}</p>
                                </div>
                            )}

                            <hr className="my-3" />

                            <div className="font-semibold text-sm mb-2"> اطلاعات رزرو گیرنده </div>

                            <div className="flex items-center justify-between text-sm">
                                <div> نام و نام خانوادگی </div>
                                <div> {cipReserveInfo.reserver.firstName + ' ' + cipReserveInfo.reserver.lastName} </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div> موبایل </div>
                                <div className="font-sans" dir="ltr"> {cipReserveInfo.reserver.phoneNumber} </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div> ایمیل </div>
                                <div className="font-sans" dir="ltr"> {cipReserveInfo.reserver.email} </div>
                            </div>

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

                    {!!cipReserveInfo ? (
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
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'payment']))
        },
    })
}

export default CipReserveDetail;