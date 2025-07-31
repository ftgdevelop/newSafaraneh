import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { DomesticHotelRateItem, DomesticHotelRoomItem } from '@/modules/domesticHotel/types/hotel';
import { Calendar, CheckTag, InfoCircle, Tik } from '@/modules/shared/components/ui/icons';
import { numberWithCommas } from '@/modules/shared/helpers';
import Tooltip from '@/modules/shared/components/ui/Tooltip';
import Quantity from '@/modules/shared/components/ui/Quantity';
import Button from '@/modules/shared/components/ui/Button';

type Props = {
    room?: DomesticHotelRoomItem;
    onSelectRoom: (bookingToken: string, count: number) => void;
    selectedRoomToken?: string;
    roomsHasImage?: boolean;
    nights: number;
    onOpenRoom: () => void;
    rate: DomesticHotelRateItem;
    priceType: "total" | "average";
    goToSearchForm : () => void;
}

const RoomItemRateItemTheme1: React.FC<Props> = props => {

    const { rate, room, selectedRoomToken } = props;

    const isHotelban = process.env.PROJECT === "HOTELBAN";

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const [count, setCount] = useState(1);

    if (!rate || !room) {
        return null;
    }

    let cancellation = null;
    if (rate.cancellationPolicy?.status) {
        switch (rate.cancellationPolicy.status) {
            case "NonRefundable":
                cancellation = (
                    <div className="text-red-500 text-xs">{tHotel("non-refundable")}</div>
                );
                break;
            case "Refundable":
                cancellation = (
                    <div className="text-green-600 flex text-xs items-center gap-1">
                        <Tik className='w-5 h-5 fill-current' />
                        {tHotel("refundable")}
                    </div>
                );
                break;
            default:
                <div className='text-xs'>{rate.cancellationPolicy.status}</div>;
        }
    }
    if (isHotelban) cancellation = null;

    const prices = {
        roomPrice: rate.pricing?.find(
            (item) => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount,
        boardPrice: rate.pricing?.find(
            (item) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount,
        extraBedPrice: rate.pricing?.find(
            (item) => item.type === "ExtraBed" && item.ageCategoryType === "ADL"
        )?.amount,
        childPrice: rate.pricing?.find(
            (item) => item.type === "Room" && item.ageCategoryType === "CHD"
        )?.amount,
    };

    const calulateDiscount = (sale: number, board: number) => {
        let discountPercentage, fixedDiscountPercentage;
        discountPercentage = ((board - sale) * 100 / board);
        if (discountPercentage > 0 && discountPercentage < 1) {
            fixedDiscountPercentage = 1;
        } else {
            fixedDiscountPercentage = discountPercentage.toFixed(0);
        }
        return (fixedDiscountPercentage);
    }

    let price: React.ReactNode;
    let bookBtn: React.ReactNode;
    let calendar: React.ReactNode = null;
    let discountBadge: React.ReactNode;

    if (rate.calendar || room.facilities?.length || room.promotions?.length) {
        calendar = <button
            type='button'
            onClick={props.onOpenRoom}
            className='text-xs text-blue-600 flex items-center gap-1 mb-2 cursor-pointer'
        >
            <Calendar className='w-4 h-4 fill-current' />
            تقویم قیمت و ظرفیت
        </button>
    }
    
    if (rate.availablityType === "Completion") {
        price = "";
    } else if (prices?.roomPrice && prices.roomPrice > 1000) {

        if (prices.boardPrice && (prices.boardPrice > prices.roomPrice)) {
            discountBadge = <span className="text-2xs whitespace-nowrap bg-green-700 self-center text-white px-2 py-0.5 leading-4 rounded-xl lg:text-xs inline-block">
                {calulateDiscount(prices.roomPrice, prices.boardPrice)}% {tHotel('discount')}
            </span>
        }
        price = <>
            {prices.roomPrice && (
                <>
                    {(props.nights && props.nights > 1) ?(
                        <Tooltip
                            position='start'
                            title={rate.availablityType === 'Offline' ? (
                                <div className='w-60'>
                                    قیمت نهایی پس از پردازش و تایید از طرف رزرواسیون مشخص می شود
                                </div>
                            ) : (
                                <>
                                    {numberWithCommas(prices.roomPrice * count / (props.nights || 1))} {t("rial")}
                                    <small className='block'> {tHotel("Avg-per-night")} </small>
                                </>
                            )}
                        >

                            {prices.boardPrice && (prices.roomPrice < prices.boardPrice) && (
                                <div className="whitespace-nowrap leading-5 line-through font-semibold text-2xs text-neutral-500">
                                    {numberWithCommas(prices.boardPrice * count/((props.priceType === 'average' && props.nights) ? props.nights : 1) )} {t("rial")}
                                </div>
                            )}
                            <span className='my-0.5 leading-5 text-md whitespace-nowrap'>
                                {numberWithCommas(prices.roomPrice * count/((props.priceType === 'average' && props.nights) ? props.nights : 1))} {t("rial")}
                                <InfoCircle className='fill-amber-500 w-5 h-5 inline-block rtl:mr-0.5 ltr:ml-0.5' />
                            </span>

                        </Tooltip>
                    ):(
                        <>
                            {prices.boardPrice && (prices.roomPrice < prices.boardPrice) && (
                                <div className="whitespace-nowrap leading-5 line-through font-semibold text-2xs text-neutral-500">
                                    {numberWithCommas(prices.boardPrice * count/((props.priceType === 'average' && props.nights) ? props.nights : 1) )} {t("rial")}
                                </div>
                            )}
                            <span className='my-0.5 leading-5 text-md whitespace-nowrap'>
                                {numberWithCommas(prices.roomPrice * count/((props.priceType === 'average' && props.nights) ? props.nights : 1))} {t("rial")}
                            </span>
                        </>
                    )}


                </>
            )}
        </>

    } else {
        price = <div className="text-red-500 rtl:text-left ltr:text-right">قیمت نیازمند استعلام است</div>;
    }

    const minStayFailed = rate.minStay && rate.minStay > props.nights; 
    const maxStayFailed = rate.maxStay && rate.maxStay < props.nights; 
    const { closeToArrival, closeToDeparture } = rate;

    if (minStayFailed || maxStayFailed){
        bookBtn= (
            <Button
                type='button'
                className='block whitespace-nowrap h-10 w-full px-8'
                onClick={props.goToSearchForm}
            >
                تغییر مدت اقامت
            </Button>
        )
    } else if (closeToArrival || closeToDeparture) {
        bookBtn = (
            <Button
                type='button'
                className='block whitespace-nowrap h-10 w-full px-8'
                onClick={props.goToSearchForm}
            >
                تغییر تاریخ اقامت
            </Button>
        )
    }
    else if (rate.availablityType === "Completion") {
        bookBtn = <div className="text-red-500"> ظرفیت تکمیل است  </div>;
    } else {
        bookBtn = (
            <Button
                onClick={() => {
                    (rate.bookingToken && !props.selectedRoomToken) ? props.onSelectRoom(rate.bookingToken, count) : undefined;
                }}
                loading={!!selectedRoomToken && selectedRoomToken === rate.bookingToken}
                disabled={!!selectedRoomToken && selectedRoomToken !== rate.bookingToken}
                className='block whitespace-nowrap h-10 w-full px-8'
            >
                {prices?.roomPrice && prices.roomPrice < 1000 ? "درخواست رزرو"
                    : rate.availablityType === "Online" ? tHotel("online-reserve")
                    : tHotel("room-reserve")
                }
            </Button>
        )
    }

    return (
        <>
            <div className="text-sm mb-5 grid grid-cols-1 md:grid-cols-5 border rounded-xl max-md:p-3">
                <div className='md:border-l md:p-4 md:col-span-2'>
                    {rate.description && <div className='text-amber-600 clearfix'>
                        <InfoCircle className='w-4 h-4 fill-current ml-1 inline-block' />
                        {rate.description}
                        
                        <div className='float-left text-left'>
                            {!!rate.isTheCheapest && (
                                <span className='text-sm bg-amber-500 text-white px-3 pt-0.5 pb-1 leading-6 mb-1 rounded-full block'> <CheckTag className='w-5 h-5 fill-current inline-block ml-1' /> پایین ترین قیمت </span>
                            )}
                            {discountBadge}
                        </div>

                    </div>}

                    <div className='flex gap-x-3 gap-y-1 items-center flex-wrap'>
                        {!!rate.board?.name && <span className="text-sm text-green-600"> {rate.board.name} </span>}
                        {cancellation}
                    </div>

                    {rate.view && (
                        <div>
                            {rate.view.name}
                        </div>
                    )}

                    {calendar}

                </div>

                <div className='md:border-l md:p-4'>
                    {rate.availablityType === "Completion" || <div className='flex flex-wrap justify-between'>
                        <label className="block" htmlFor={`counter-${rate.bookingToken}`} > تعداد </label>
                        <div dir='ltr'>
                            <Quantity small disabled={!!selectedRoomToken} inputId={`counter-${rate.bookingToken}`} min={1} max={rate.available} onChange={setCount} />
                        </div>
                    </div>}
                </div>

                <div className='md:border-l md:p-4'>
                    {price}
                </div>

                <div className='md:p-4'>
                    {bookBtn}
                </div>

                {minStayFailed && (
                    <div className='md:col-span-5 p-3 border-t text-red-600'>
                        <InfoCircle className='inline-block fill-current w-5 h-5 ml-2' />
                        این اتاق برای رزرو های بیشتر از {rate.minStay} روز در دسترس است
                    </div>
                )}

                {maxStayFailed && (
                    <div className='md:col-span-5 p-3 border-t text-red-600'>
                        این اتاق برای رزرو های کمتر از {rate.maxStay} روز در دسترس است
                    </div>
                )}

                {closeToArrival ? (
                    <div className='md:col-span-5 p-3 border-t text-red-600'>
                        این اتاق در تاریخ ورود شما پذیرش ورودی ندارد، برای رزرو این اتاق تاریخ ورود خود را تغییر دهید
                    </div>
                ) : closeToDeparture ? (
                    <div className='md:col-span-5 p-3 border-t text-red-600'>
                        این اتاق در تاریخ خروج شما پذیرش خروجی ندارد، برای رزرو این اتاق تاریخ خروج خود را تغییر دهید
                    </div>
                ) : null}

            </div>
        </>
    )
}

export default RoomItemRateItemTheme1;
