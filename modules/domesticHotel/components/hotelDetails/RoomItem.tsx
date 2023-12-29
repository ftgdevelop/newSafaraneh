import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Image from 'next/image';

import {DomesticHotelRateItem, DomesticHotelRoomItem } from '@/modules/domesticHotel/types/hotel';
import { Bed, DefaultRoom, InfoCircle, Restaurant, Tik, User } from '@/modules/shared/components/ui/icons';
import { numberWithCommas } from '@/modules/shared/helpers';
import Tooltip from '@/modules/shared/components/ui/Tooltip';
import Quantity from '@/modules/shared/components/ui/Quantity';
import Button from '@/modules/shared/components/ui/Button';

type Props = {
    room?: DomesticHotelRoomItem;
    rate: DomesticHotelRateItem;
    onSelectRoom: (bookingToken: string, count: number) => void;
    selectedRoomToken?: string;
}

const RoomItem: React.FC<Props> = props => {

    const { rate, room, selectedRoomToken } = props;

    const { t } = useTranslation('common');
    const { t : tHotel } = useTranslation('hotelDetail');

    const [count, setCount] = useState(1);


    if (!rate || !room) {
        return null;
    }

    let image = <div className='md:w-1/4 shrink-0 flex items-center justify-center bg-neutral-100 p-5 rtl:rounded-r-xl'><DefaultRoom className='fill-neutral-300 w-20 h-20' /></div>

    if (room.image) {
        image = <Image className='w-full md:w-1/4 object-cover object-center' src={room.image} alt={room.name || "room name"} width="300" height="200" />
    }


    const board = (code: string) => {
        switch (code) {
            case "BB":
                return "به همراه صبحانه";
            case "HB":
                return "صبحانه + ناهار یا شام";
            case "FB":
                return "تمام وعده های غذایی شامل می شود";
            case "RO":
                return "بدون صبحانه";
            case "Hour6":
                return "اقامت به مدت ۶ ساعت";
            case "Hour10":
                return "اقامت به مدت ۱۰ ساعت";

            default:
                return code;
        }
    }


    let cancellation = null;
    if (rate.cancellationPolicy?.status) {
        switch (rate.cancellationPolicy.status) {
            case "NonRefundable":
                cancellation = (
                    <div className="mb-4 text-red-500">{tHotel("non-refundable")}</div>
                );
                break;
            case "Refundable":
                cancellation = (
                    <div className="text-green-600 mb-4 flex items-center gap-1">
                        <Tik className='w-5 h-5 fill-current' />
                        {tHotel("refundable")}
                    </div>
                );
                break;
            default:
                <div className="mb-4">{rate.cancellationPolicy.status}</div>;
        }
    }

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

    const nightly = [];
    if (rate.nightly.items) {
        for (const [key, value] of Object.entries(rate.nightly.items)) {
            nightly.push({
                date: key,
                amount: count * value.amount,
                board: count * value.board,
            });
        }
    }

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

    if (rate.availablityType === "Completion") {
        price = "";
    } else if (prices?.roomPrice && prices.roomPrice > 1000) {
        price = <>
            {(prices.boardPrice && (prices.boardPrice !== prices.roomPrice)) && <div>
                <span className="bg-green-700 text-white px-2 py-1 mb-2 leading-4 rounded-xl text-xs inline-block">{calulateDiscount(prices.roomPrice, prices.boardPrice)}% {tHotel('discount')}</span>
            </div>}
            {prices.roomPrice && (
                <>
                    {prices.boardPrice && (prices.roomPrice < prices.boardPrice) && (
                        <div className="line-through font-semibold text-neutral-500">
                            {numberWithCommas(prices.boardPrice * count)} {t("rial")}
                        </div>
                    )}

                    <Tooltip
                        className='whitespace-nowrap'
                        position='end'
                        title={<>
                            <div>
                                {numberWithCommas(prices.roomPrice * count)} {t("rial")}
                            </div>
                            <small> {tHotel("Avg-per-night")} </small>
                        </>}
                    >
                        <div className="text-lg font-semibold">
                            {numberWithCommas(prices.roomPrice * count)} {t("rial")}
                        </div>
                    </Tooltip>
                </>
            )}
        </>
    } else {
        price = <div className="text-red-500 rtl:text-left ltr:text-right">قیمت نیازمند استعلام است</div>;
    }

    if (rate.availablityType === "Completion") {
        bookBtn = <div className="text-red-500"> ظرفیت تکمیل است  </div>;
    } else {
        bookBtn = (
            <Button
                onClick={() => {
                    rate.bookingToken ? props.onSelectRoom(rate.bookingToken, count) : undefined;
                }}
                loading={!!selectedRoomToken && selectedRoomToken === rate.bookingToken}
                disabled={!!selectedRoomToken && selectedRoomToken !== rate.bookingToken}
                className='block w-full lg:w-44 h-8 px-5 rounded-md'
            >
                {prices?.roomPrice && prices.roomPrice < 1000 ?
                    "درخواست رزرو"
                    : rate.availablityType === "Online" ?
                    tHotel("online-reserve")
                        : tHotel("room-reserve")}
            </Button>

        )
    }




    return (
        <div className='bg-white border border-neutral-300 rounded-xl mt-4 md:flex'>
            {image}
            <div className='p-4 grid grid-cols-1 sm:grid-cols-2 leading-5 text-sm grow gap-5'>
                <h3 className='sm:col-span-2 text-lg md:text-xl font-semibold'> {room.name}</h3>
                <div className='sm:flex flex-col gap-2'>


                    {rate.view && (
                        <div>
                            {rate.view.name}
                        </div>
                    )}

                    <Tooltip
                        title={<> <b> {rate.board.code} </b> ({board(rate.board.code)}) </>}
                        position='start'
                        className='flex gap-2 items-center font-semibold'
                    >
                        <Restaurant className='w-5 h-5 fill-emerald-700' />
                        {board(rate.board.code)}
                    </Tooltip>

                    {room.capacity.count && (
                        <div className="flex gap-2 items-center">
                            <User className='w-5 h-5 fill-neutral-400' />
                            {room.capacity.count} نفر
                        </div>
                    )}

                    {cancellation}

                    {room.capacity?.extraBed ? (
                        <div className="flex gap-2 items-center">
                            <Bed className='w-5 h-5 fill-neutral-400' />
                            {tHotel('extra-bed')}
                        </div>
                    ) : (
                        <div className="line-through text-neutral-500"> {tHotel('extra-bed')} </div>
                    )}

                    {rate.description && <div className='text-amber-600 flex gap-2'>
                        <InfoCircle className='w-4 h-4 fill-current relative top-0.5' />
                        {rate.description}
                    </div>}

                </div>
                <footer className='self-stretch md:self-end flex justify-between sm:justify-end items-end gap-5 xl:gap-10'>

                    {rate.availablityType === "Completion" || <div>
                        <label className="mb-1 block" htmlFor={`counter-${rate.bookingToken}`} > تعداد </label>
                        <Quantity disabled={!!selectedRoomToken} inputId={`counter-${rate.bookingToken}`} min={1} max={rate.available} onChange={setCount} />
                    </div>}


                    <div className='rtl:text-left ltr:text-right'>

                        {price}

                        {bookBtn}

                    </div>


                </footer>

            </div>


        </div>
    )
}

export default RoomItem;
