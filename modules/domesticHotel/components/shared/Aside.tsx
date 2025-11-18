import Button from "@/modules/shared/components/ui/Button";
import Rating from "@/modules/shared/components/ui/Rating";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { ArrowLeft, Tik, Bed, User, Calendar, DefaultRoom, InfoCircle } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { AsideHotelInfoType, AsideReserveInfoRoomItemType, AsideReserveInfoType, DomesticHotelGetValidateResponse } from "../../types/hotel";
import Link from "next/link";

type Props = {
    reserveInformation?: AsideReserveInfoType;
    hotelInformation?: AsideHotelInfoType;
    roomExtraBed?: number[];
    hasSubmit?: boolean;
    submitLoading?: boolean;
    className?: string;
    discountResponse?: {
        reserveId: number;
        promoCodeId: number;
        discountPrice: number;
        orderSubTotalDiscount: number;
        orderSubTotal: number;
        isValid: true;
    };
    discountLoading?: boolean;
    rules?: DomesticHotelGetValidateResponse['rules'];
}
const Aside: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const isHotelban = process.env.PROJECT === "HOTELBAN";
    const isShab = process.env.PROJECT === "SHAB";

    const { hotelInformation, reserveInformation, roomExtraBed, discountResponse, discountLoading } = props;

    const hasDiscount = reserveInformation?.salePrice && reserveInformation.boardPrice && reserveInformation.boardPrice > reserveInformation.salePrice;

    let extraBedCount = 0;
    let extraBedPrice = 0;
    if (roomExtraBed?.length) {
        extraBedCount = roomExtraBed.reduce((total: number, item: number) => total + item, 0);
        extraBedPrice = reserveInformation?.rooms.reduce((total: number, item: AsideReserveInfoType['rooms'][0], index) => {
            const itemExtraBEdPrice: number = item.pricing.find(pricingItem => (pricingItem.ageCategoryType === "ADL" && pricingItem.type === 'ExtraBed'))?.amount || 0;
            return (total + itemExtraBEdPrice * roomExtraBed[index]);
        }, 0) || 0;
    }

    let activeExtraBedPrice;
    let activeExtraBedCount;

    if (props.reserveInformation?.selectedExtraBedPrice) {
        activeExtraBedPrice = props.reserveInformation?.selectedExtraBedPrice;
        activeExtraBedCount = props.reserveInformation?.selectedExtraBedCount;
    } else {
        activeExtraBedPrice = extraBedPrice;
        activeExtraBedCount = extraBedCount;
    }

    if (!reserveInformation) {
        return (
            <div className='border border-neutral-300 bg-white rounded-md mb-4'>
                <Skeleton className='mx-4 my-3.5 w-28' />
                <div className='border-t border-neutral-300 p-4'>
                    <div className='grid gap-3 grid-cols-4'>
                        <Skeleton type='image' />
                        <div className='col-span-3'>
                            <Skeleton className='mb-3 w-2/3' />
                            <Skeleton className='mb-3 w-1/3' />
                            <Skeleton className='w-full' />
                        </div>
                    </div>

                    <div className='border-t border-neutral-300 my-5' />

                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-2/3' />
                    <Skeleton className='mb-3 w-1/3' />
                    <Skeleton className='mb-3 w-2/3' />

                    <div className='border-t border-neutral-300 my-5' />

                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-full' />

                    <Skeleton className='mb-3 w-full mt-6' type='button' />

                </div>
            </div>
        )
    }

    let promoCodePrice: number = reserveInformation.promoCodePrice || 0;
    if (discountResponse) {
        promoCodePrice = discountResponse.discountPrice;
    }

    let cancelationElement = null;
    const cancelationData = props.rules?.find(rule => rule.keyword === "cancellation");
    if (cancelationData){

        cancelationElement = (
            <div className="bg-neutral-100 p-3 mb-4 rounded-lg">
                <h5 className="font-semibold text-sm mb-1"> {cancelationData.name} </h5>
                <div className="text-xs leading-6">
                    {cancelationData.description}
                </div>
            </div>
        )
    }


    let childrenElement = null;
    const childrenData = props.rules?.find(rule => rule.keyword === "children");
    if (childrenData){

        childrenElement = (
            <div className="bg-neutral-100 p-3 mb-4 rounded-lg">
                <h5 className="font-semibold text-sm mb-1"> {childrenData.name} </h5>
                <div className="text-xs leading-6">
                    {childrenData.description}
                </div>
            </div>
        )
    }

    const roomsTax = reserveInformation?.rooms?.reduce((total: number, item: AsideReserveInfoRoomItemType) => {
        const taxPrice = item.pricing.find(i => i.type === "Tax")?.amount
        return total + (taxPrice || 0)
    }, 0);

    const roomsBase = reserveInformation?.rooms?.reduce((total: number, item: AsideReserveInfoRoomItemType) => {
        const basePrice = item.pricing.find(i => i.type === "Base")?.amount
        return total + (basePrice || 0)
    }, 0);

    let totalPrice = 0;

    if(reserveInformation.salePrice && reserveInformation.salePrice > 500000){
        
        totalPrice = reserveInformation.salePrice + (activeExtraBedPrice || 0) - (reserveInformation.promoCodePrice || 0); 

        if(!!discountResponse && discountResponse.orderSubTotalDiscount >= 10000){
            totalPrice =  discountResponse.orderSubTotalDiscount + (activeExtraBedPrice || 0);
        }
    }


    return (
        <div className={`bg-white rounded-lg border border-neutral-300 mb-4 ${props.className}`} >


            <div>
                <h4 className="p-3 font-semibold text-sm border-b leading-5 border-neutral-300" >
                    {t('reserve-details')}
                </h4>

                <div className="p-2.5">
                    {hotelInformation ? (
                        <div className="grid grid-cols-4 gap-x-3 gap-y-2">
                            {hotelInformation.image.url ? (
                                <Image
                                    onContextMenu={(e) => e.preventDefault()}
                                    src={hotelInformation.image.url}
                                    alt={hotelInformation?.image?.alt || hotelInformation.name}
                                    title={hotelInformation?.image?.title}
                                    width={80}
                                    height={60}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div
                                    className="bg-neutral-100 flex items-center justify-center h-full "
                                >
                                    <DefaultRoom className="fill-neutral-300 w-12 h-12 p-1" />
                                </div>
                            )}
                            <div className="col-span-3">
                                <h4 className="font-semibold text-sm">{hotelInformation.name}</h4>
                                {!!hotelInformation?.rating && <Rating number={hotelInformation.rating} className="mb-2" />}
                            </div>
                            {!!hotelInformation?.address && (
                                <p className="text-xs text-neutral-500 leading-5 col-span-4 border-b border-neutral-300 pb-2">
                                    {hotelInformation?.address}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className='grid gap-3 grid-cols-4'>
                            <Skeleton type='image' />
                            <div className='col-span-3'>
                                <Skeleton className='mb-3 w-2/3' />
                                <Skeleton className='mb-3 w-1/3' />
                                <Skeleton className='w-full' />
                            </div>
                        </div>
                    )}

                    {!!reserveInformation.reserveId && (
                        <div className='border border-2 border-dashed border-blue-100 text-blue-800 text-lg font-semibold p-2 mt-4 flex items-center justify-center gap-2'>
                            {t('tracking-code')} : {reserveInformation.reserveId}
                        </div>
                    )}

                    {reserveInformation && (
                        <div className="text-xs flex flex-wrap items-center gap-2 pt-4 pb-1 leading-4 mb-2">

                            <Calendar className="w-5 h-5 fill-neutral-600" />

                            {dateDiplayFormat({ date: reserveInformation.checkin, format: "dd mm yyyy", locale: "fa" })}

                            <ArrowLeft className="w-4 h-4 fill-neutral-700" />

                            {dateDiplayFormat({ date: reserveInformation.checkout, format: "dd mm yyyy", locale: "fa" })}

                            <span>
                                {getDatesDiff(new Date(reserveInformation.checkout), new Date(reserveInformation.checkin))} {tHotel('night')}
                            </span>

                        </div>
                    )}

                    {reserveInformation.rooms.map((roomItem: AsideReserveInfoRoomItemType, roomIndex: number) => {

                        //TODO check cancelation
                        let cancellation = null;
                        switch (roomItem.cancellationPolicyStatus) {
                            case "NonRefundable":
                                cancellation = <div className="margin-bottom-5 text-sm text-red/600">{tHotel("non-refundable")}</div>;
                                break;
                            case "Refundable":
                                cancellation = <div className="text-green-600 text-sm margin-bottom-5 flex gap-1 items-center">
                                    <Tik className="w-4 h-4 fill-green-600" />
                                    {tHotel("refundable")}
                                </div>;
                                break;
                            default:
                                cancellation = <div className="margin-bottom-5">{roomItem.cancellationPolicyStatus}</div>;
                        }
                        
                        if (isHotelban || isShab) cancellation = null;

                        let childPriceBlock = null;
                        let extraBedPriceBlock = null;

                        if (roomExtraBed?.length) {
                            const selectedExtraBed = roomExtraBed[roomIndex];
                            if (selectedExtraBed) {
                                let count = null;
                                switch (selectedExtraBed) {
                                    case 1:
                                        count = "یک";
                                        break;
                                    case 2:
                                        count = "دو";
                                        break;
                                    case 3:
                                        count = "سه";
                                        break;
                                    default:
                                        count = selectedExtraBed;

                                }
                                extraBedPriceBlock = <span> + {count} تخت اضافه</span>
                            }
                        }

                        return (
                            <div key={roomIndex}>
                                {reserveInformation.rooms.length > 1 && (
                                    <div className='flex items-center text-sm gap-2 font-semibold after:block after:border-b after:grow after:border-neutral-300'>
                                        {tHotel('room')} {roomIndex + 1}
                                    </div>
                                )}

                                <div className="flex gap-2 items-center text-sm">
                                    <Bed className="w-4.5 h-4.5 fill-current" />
                                    {roomItem.name}
                                </div>

                                <div className="flex gap-2 items-center text-sm">
                                    <User className="w-4.5 h-4.5 fill-current" />
                                    {roomItem.bed} {tHotel('guest')} {extraBedPriceBlock}
                                </div>
                               
                                {roomItem.boardName && <div className="text-green-600 text-sm">{roomItem.boardName}</div> }
                                {roomItem.boardExtra && <div className="text-green-600 text-sm">{roomItem.boardExtra}</div> }

                                {cancellation}

                            </div>
                        )
                    })}

                    <div className="border-t border-neutral-300 mt-4 pt-4 text-sm">

                        {reserveInformation.rooms.map((room, roomIndex) => {

                            if (room.nightly?.length && room.nightly.length > 1) {

                                return (
                                    <div
                                        key={roomIndex}
                                        className="flex gap-3 mb-4 pb-3 overflow-x-auto styled-scrollbar select-none"
                                    >
                                        {room.nightly?.filter(n => (n.date && n.amount)).map(night => (
                                            <div
                                                key={roomIndex + (night.date || "")}
                                                className="border rounded-lg text-xs bg-white whitespace-nowrap"
                                            >
                                                <header className="bg-neutral-200 p-2 leading-4 rounded-t-lg">
                                                    {dateDiplayFormat({
                                                        date: night.date!,
                                                        format: "ddd dd mm",
                                                        locale: "fa"
                                                    })}
                                                </header>
                                                <div className="p-2">
                                                    {night.board && night.amount && (night.board > night.amount) ? <div className="text-neutral-400 text-xs line-through">
                                                        {numberWithCommas(night.board)} ریال
                                                    </div>:null}

                                                    {!!night.amount && <div className="font-semibold text-md">
                                                        {numberWithCommas(night.amount)} ریال
                                                    </div>}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )
                            } else {
                                return null
                            }

                        })}

                        {cancelationElement}

                        {childrenElement}

                        {reserveInformation.salePrice && reserveInformation.salePrice > 500000 ? (
                            <>
                                {(hasDiscount || !!activeExtraBedPrice || !!reserveInformation.promoCodePrice || !!promoCodePrice || !!roomsTax) && ( (reserveInformation.boardPrice || reserveInformation.salePrice) >= totalPrice ) && (
                                    <div className="flex items-center justify-between">
                                        قیمت پایه
                                        <span>{numberWithCommas( reserveInformation.boardPrice || reserveInformation.salePrice)} {t('rial')} </span>
                                    </div>
                                )}

                                {!!activeExtraBedPrice && (
                                    <div className="flex items-center justify-between">
                                        {tHotel("extra-bed")} (x{activeExtraBedCount})
                                        <span>{numberWithCommas(activeExtraBedPrice)} {t('rial')} </span>
                                    </div>
                                )}

                                {!!hasDiscount && (
                                    <div className="flex items-center justify-between">
                                        {t("site-discount")}
                                        <span>{numberWithCommas(reserveInformation.boardPrice - reserveInformation.salePrice)} {t('rial')}</span>

                                    </div>
                                )}
                                {!!discountLoading && (
                                    <Skeleton className="my-1" />
                                )}
                                {!!promoCodePrice && (
                                    <div className="flex items-center justify-between">
                                        کد تخفیف
                                        <span>{numberWithCommas(promoCodePrice)} {t('rial')}</span>
                                    </div>
                                )}
                                
                                {!!roomsTax && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            قیمت بدون مالیات
                                            <span>{numberWithCommas(roomsBase)} {t('rial')} </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            مالیات
                                            <span>{numberWithCommas(roomsTax)} {t('rial')} </span>
                                        </div>
                                    </>
                                )}

                                {!!reserveInformation.salePrice && (
                                    <div className="flex items-center justify-between">
                                        {t("price-paid")}
                                        <strong className="font-bold text-sm">
                                            {numberWithCommas(totalPrice) + " " + t('rial')}
                                        </strong>
                                    </div>
                                )}
                            </>
                        ) : (
                            <span className='text-xs font-semibold text-red-500'>قیمت نیازمند استعلام است </span>
                        )}


                    </div>

                    {props.hasSubmit && (
                        <div className="mt-2 max-sm:fixed max-sm:bg-white max-sm:border-t max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-50 max-sm:p-4">

                            {isHotelban && (
                               <p className="text-sm mt-6 mb-2 text-neutral-700">
                                    <InfoCircle className="w-5 h-5 inline-block ml-2 fill-current" />
                                 با کلیک روی تکمیل خرید و دریافت تاییدیه با 
                                <Link
                                    target='_blank' 
                                    href="/booking-terms" 
                                    className="text-blue-600 underline mx-1"
                                >
                                    قوانین و مقررات رزرو 
                                </Link>
                                موافقت کرده اید. 
                                </p> 
                            )}

                            <Button type="submit" loading={props.submitLoading} className="h-12 px-2 w-full mb-2" >
                                {t('complete-reserve-and-get-confirmation')}
                            </Button>
                        </div>
                    )}

                </div>

            </div>

        </div>
    )

}

export default Aside;