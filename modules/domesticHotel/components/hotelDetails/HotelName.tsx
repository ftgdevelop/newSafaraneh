import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { DomesticHotelDetailType } from "@/modules/domesticHotel/types/hotel";
import { Location } from "@/modules/shared/components/ui/icons";
import HotelScore from "../shared/HotelScore";
import Rating from "@/modules/shared/components/ui/Rating";
import Image from 'next/image';
import Attractions from './Attractions';
import HotelMap from './HotelMap';

type Props = {
    hotelData?: DomesticHotelDetailType;
    scoreData?: {
        CommentCount?: number;
        Satisfaction?: number;
    }
}

const HotelName: React.FC<Props> = props => {

    const { hotelData } = props;

    const { t: tHotel } = useTranslation('hotel');

    const [showMap, setShowMap] = useState<boolean>(false);

    if (!hotelData) {
        return null
    }

    const closeMapModal = () => { setShowMap(false) };

    return (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-3 sm:p-5 lg:p-7 bg-white rounded-b-xl">
            <div className="lg:col-span-2 pt-3">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-3 sm:mb-4 lg:mb-5"> {hotelData.HotelCategoryName + " " + hotelData.HotelName + " " +hotelData.CityName} </h1>
                {!!hotelData.HotelRating && <Rating number={hotelData.HotelRating} className="mb-3" />}
                <p className="text-neutral-500 text-sm mb-3 sm:mb-6"><Location className="w-4 h-4 fill-current inline-block align-middle" /> {hotelData.Address}</p>
                <HotelScore
                    reviews={props.scoreData?.CommentCount}
                    score={props.scoreData?.Satisfaction}
                    className="text-md lg:text-lg font-semibold"
                />
            </div>

            {(hotelData.Latitude && hotelData.Longitude) ? (
                <button type='button' className='lg:col-span-1 relative' onClick={() => { setShowMap(true) }}>
                    <Image src="/images/map-cover.svg" alt="showMap" className='block w-full h-full object-cover' width={354} height={173} />
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-1 border-2 border-blue-600 rounded font-semibold select-none leading-5 text-sm'>
                        {tHotel('viewOnMap')}
                    </span>
                </button>
            ) : (
                <div className="lg:col-span-1" />
            )}

            <div className='hidden lg:block lg:col-span-2'>
                <strong className='block font-semibold text-md lg:text-lg mb-3'>امکانات محبوب هتل</strong>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                    {hotelData.Facilities?.slice(0, 6).map(item => <div key={item.Keyword} className='text-sm text-neutral-500'>
                        {item.Image && <Image src={item.Image} alt={item.ImageAlt || item.Title || ""} width={20} height={20} className='h-5 w-5 inline-block rtl:ml-2 ltr:mr-2' />}
                        {item.Title}
                    </div>)}
                </div>
            </div>
            <div className='hidden lg:block lg:col-span-1'>
                {!!hotelData.DistancePoints?.length && <Attractions isSmall attractions={hotelData.DistancePoints} />}
            </div>

            {!!(showMap && hotelData.Latitude && hotelData.Longitude) && <HotelMap
                closeMapModal={closeMapModal}
                latLong={[hotelData.Latitude, hotelData.Longitude]}
            />}

        </div>
    )
}

export default HotelName;