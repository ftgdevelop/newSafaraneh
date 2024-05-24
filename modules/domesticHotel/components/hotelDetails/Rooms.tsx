import { i18n, useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { DomesticHotelAvailability } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import RoomItem from './RoomItem';
import { addSomeDays, dateFormat, getDatesDiff } from '@/modules/shared/helpers';
import { GetRooms, domesticHotelValidateRoom } from '../../actions';
import { InfoCircle } from '@/modules/shared/components/ui/icons';
import Skeleton from '@/modules/shared/components/ui/Skeleton';

type Props = {
    hotelId: number;
}

const Rooms: React.FC<Props> = props => {

    const { hotelId } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t: tHotel } = useTranslation('hotel');

    const [availabilites, setAvailabilities] = useState<DomesticHotelAvailability[] | undefined>();

    const [selectedRoomToken, setSelectedRoomToken] = useState<string>();

    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0].split("?")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0].split("?")[0];
    }


    useEffect(() => {
        if (hotelId) {

            const fetchRooms = async () => {
                setAvailabilities(undefined);

                const response: any = await GetRooms({ id: hotelId, checkin: checkin, checkout: checkout }, i18n?.language === "en" ? "en-US" : i18n?.language === "ar" ? "ar-AE" : "fa-IR");

                if (response?.data?.result) {
                    setAvailabilities(response.data.result.availabilities);
                } else if (response.data?.success) {
                    console.error("oops, no available room!")
                }
            };

            fetchRooms();
        }

    }, [hotelId, checkin, checkout, i18n?.language]);

    const selectRoomHandle = async (token: string, count: number) => {
        setSelectedRoomToken(token);

        let utm: undefined | { utmSource: string; utmKey: string };
        if (router.query && router.query.utm_source && router.query.utm_key) {
            utm = {
                utmSource: router.query.utm_source! as string,
                utmKey: router.query.utm_key! as string
            }
        }

        const preReserveResponse: any = await domesticHotelValidateRoom({
            bookingToken: token,
            checkin: checkin,
            checkout: checkout,
            count: count,
            MetaSearchName: utm?.utmSource || null,
            MetaSearchKey: utm?.utmKey || null
        });

        if (preReserveResponse.data?.result?.preReserveKey) {
            const key = preReserveResponse.data.result.preReserveKey;
            router.push(`/hotel/checkout/key=${key}`);
        }

    }
    const roomsHasImage = availabilites?.some(availabilityItem => (availabilityItem.rooms && availabilityItem.rooms[0]?.image));

    const nights = getDatesDiff(new Date(checkout), new Date(checkin));

    return (

        <div id="rooms_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">

            {(availabilites && availabilites.length === 0) ? (
                <div className='bg-white rounded-xl p-3 sm:p-7'>
                    <div className='bg-red-100 p-2 sm:p-4 flex gap-3 rounded'>
                        <InfoCircle className='fill-red-600 w-5 h-5' />
                        <div className='grow'>
                            <h4 className='font-semibold text-red-600 mb-2 leading-6'> اتاقی موجود نیست! </h4>
                            <p className='text-sm'>
                                متاسفانه اتاقی در دسترس نیست ، لطفاً تاریخ دیگری را انتخاب کنید یا هتل دیگری جستجو نمایید.
                            </p>
                        </div>
                    </div>
                </div>
            ) : availabilites ? (
                <>
                    <h2 className="text-lg lg:text-3xl font-semibold mb-3 md:mb-7"> {tHotel('choose-room')}  </h2>
                    {availabilites.map(availability => {
                        return availability.rates?.map(rateItem => (
                            <RoomItem
                                key={rateItem.bookingToken}
                                rate={rateItem}
                                room={availability.rooms![0]}
                                onSelectRoom={selectRoomHandle}
                                selectedRoomToken={selectedRoomToken}
                                roomsHasImage={roomsHasImage || false}
                                nights={nights}
                            />
                        ))
                    })}
                </>
            ) : (
                <>
                    <h2 className="text-lg lg:text-3xl font-semibold mb-3 md:mb-7" > {tHotel('choose-room')} </h2>
                    {[1, 2, 3, 4, 5].map(item => (
                        <div key={item} className='bg-white border border-neutral-300 rounded-xl mb-4 overflow-hidden grid grid-cols-4'>
                            <Skeleton type='image' />
                            <div className='col-span-3 p-4'>
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-40' />
                                    <Skeleton className='w-20' />
                                </div>
                                <div className='flex justify-between mb-4'>
                                    <Skeleton className='w-24' />
                                    <Skeleton className='w-48' />
                                </div>
                                <div className='flex justify-between'>
                                    <Skeleton className='w-20' />
                                    <Skeleton className='w-60' />
                                </div>

                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>

    )
}

export default Rooms;

