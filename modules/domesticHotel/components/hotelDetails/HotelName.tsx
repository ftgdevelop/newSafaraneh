import { Fragment, useState } from 'react';

import { DomesticAccomodationFacilityType, DomesticHotelDetailType } from "@/modules/domesticHotel/types/hotel";
import { Location, Verified } from "@/modules/shared/components/ui/icons";
import HotelScore from "../shared/HotelScore";
import Rating from "@/modules/shared/components/ui/Rating";
import Image from 'next/image';
import Attractions from './Attractions';
import HotelMap from './HotelMap';
import GuestRating from '@/modules/shared/components/ui/GuestRating';
import HotelMapButton from './HotelMapButton';
import AccommodationFacilityIcon from './AccommodationFacilityIcon';

type Props = {
    hotelData?: DomesticHotelDetailType;
    scoreData?: {
        CommentCount?: number;
        Satisfaction?: number;
    };
    accomodationFacilities?: DomesticAccomodationFacilityType[];
}

const HotelName: React.FC<Props> = props => {

    const { hotelData } = props;

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";

    const [showMap, setShowMap] = useState<boolean>(false);

    if (!hotelData) {
        return null
    }

    const closeMapModal = () => { setShowMap(false) };

    return (

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl ${theme1?" p-3 sm:p-5 xl:p-7":"pt-14 pb-5"}`}>
            <div className="lg:col-span-2 pt-3">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-3 sm:mb-4 lg:mb-5"> {hotelData.HotelCategoryName + " " + hotelData.HotelName + " " + hotelData.CityName} </h1>
                {!!hotelData.HotelRating && <Rating number={hotelData.HotelRating} className="mb-3" />}
                <p className="text-neutral-500 text-sm mb-3 sm:mb-6"><Location className="w-4 h-4 fill-current inline-block align-middle" /> {hotelData.Address}</p>
                {theme1 ? (
                    <HotelScore
                        reviews={props.scoreData?.CommentCount}
                        score={props.scoreData?.Satisfaction}
                        className="text-md lg:text-lg font-semibold"
                    />
                ) : (theme2 && props.scoreData?.CommentCount && props.scoreData.Satisfaction) ? (
                    <GuestRating
                        rating={props.scoreData?.Satisfaction}
                        reviewCount={props.scoreData?.CommentCount}
                        large
                    />
                ) : (
                    null
                )}

            </div>

            <HotelMapButton 
                onClick={() => { setShowMap(true) }}
                Latitude={hotelData.Latitude}
                Longitude={hotelData.Longitude}
            />

            <div className='hidden lg:block lg:col-span-2'>
                <strong className='block font-semibold text-md lg:text-lg mb-3'>امکانات محبوب هتل</strong>
                
                {props.accomodationFacilities?.length || process.env.PROJECT === "1STSAFAR" ? (

                    <div className='mb-5 flex flex-wrap gap-3'>
                        {props.accomodationFacilities?.filter(item => item.items.some(s => s.isImportant)).map(facilityItem => (
                            <Fragment key={facilityItem.keyword} >
                                {facilityItem.items.filter(i => i.isImportant).map(a => (
                                    <span key={a.name} className='text-sm block border border-neutral-200 font-semibold text-neutral-500 p-1 sm:p-2 rounded whitespace-nowrap'>
                                        <AccommodationFacilityIcon keyword={a.keyword} />
                                        {a.name}
                                    </span>
                                ))}
                            </Fragment>
                        ))}
                    </div>
                    
                ):(
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                        {hotelData.Facilities?.slice(0, 6).map(item => <div key={item.Keyword} className='text-sm text-neutral-500'>
                            {item.Image && <Image src={item.Image} alt={item.ImageAlt || item.Title || ""} width={20} height={20} className='h-5 w-5 inline-block rtl:ml-2 ltr:mr-2' />}
                            {item.Title}
                        </div>)}
                    </div>
                )}
                
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