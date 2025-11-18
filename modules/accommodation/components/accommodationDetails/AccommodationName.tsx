import { Fragment, useState } from 'react';

import { DomesticAccomodationType, DomesticHotelDetailType } from "@/modules/domesticHotel/types/hotel";
import { Directions, Location } from "@/modules/shared/components/ui/icons";
import HotelScore from "../shared/AccommodationScore";
import Rating from "@/modules/shared/components/ui/Rating";
import Image from 'next/image';
import Attractions from './Attractions';
// import HotelMap from './HotelMap';
import GuestRating from '@/modules/shared/components/ui/GuestRating';
// import HotelMapButton from './HotelMapButton';
// import AccommodationFacilityIcon from './AccommodationFacilityIcon';
import Link from 'next/link';

type Props = {
    accomodationData: DomesticAccomodationType;
    hotelData?: DomesticHotelDetailType;
    reviewData?: {
        averageRating: number;
        reviewCount: number;
    }
}

const AccommodationName: React.FC<Props> = props => {

    const { accomodationData } = props;

    const theme2 = process.env.THEME === "THEME2";

    const [showMap, setShowMap] = useState<boolean>(false);

    if (!accomodationData) {
        return null
    }

    const closeMapModal = () => { setShowMap(false) };
    
    const isSafarLife = process.env.SITE_NAME === 'https://www.safarlife.com';

    return (

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl`}>
            <div className="lg:col-span-2 pt-3">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-3 sm:mb-4 lg:mb-5"> {accomodationData.displayName || accomodationData.name} </h1>
                {!!(accomodationData.rating) && <Rating number={accomodationData.rating} className="mb-3" />}
                {!!(accomodationData.address) && (
                    <p className="text-neutral-500 text-sm mb-3 sm:mb-6"><Location className="w-4 h-4 fill-current inline-block align-middle" /> 
                        {accomodationData.address} 
                    </p>
                )}
                {!props.reviewData ?
                    null
                    : 
                        <HotelScore
                            reviews={props.reviewData.reviewCount}
                            score={props.reviewData.averageRating}
                            className="text-md lg:text-lg font-semibold"
                            max={10}
                        />
                    }
            </div>

            <HotelMapButton 
                onClick={() => { setShowMap(true) }}
                Latitude={accomodationData.coordinates?.latitude}
                Longitude={accomodationData.coordinates?.longitude}
            />

            {
                (accomodationData.facilities?.length 
                || 
                (process.env.PROJECT === "SAFARANEH" && props.hotelData?.Facilities?.length))
                && 
                !isSafarLife
            ? (
                <div className='lg:col-span-2'>
                    
                    <strong className='block font-semibold text-md lg:text-lg mb-3'>امکانات محبوب هتل</strong>

                    {process.env.PROJECT === "SAFARANEH" ? (
                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                        {props.hotelData?.Facilities?.slice(0, 6).map(item => <div key={item.Keyword} className='text-sm text-neutral-500'>
                            {item.Image && <Image src={item.Image} alt={item.ImageAlt || item.Title || ""} width={20} height={20} className='h-5 w-5 inline-block rtl:ml-2 ltr:mr-2' />}
                            {item.Title}
                        </div>)}
                    </div>
                    ):props.accomodationData.facilities?.length  ? (
                        <div className='mb-5 flex flex-wrap gap-1 sm:gap-3'>
                            {props.accomodationData.facilities?.filter(item => item.items.some(s => s.isImportant)).map(facilityItem => (
                                <Fragment key={facilityItem.keyword} >
                                    {facilityItem.items.filter(i => i.isImportant).map(a => (
                                        <span key={a.name} className='text-xs sm:text-sm block border border-neutral-200 font-semibold text-neutral-500 px-1 sm:p-2 rounded whitespace-nowrap'>
                                            <AccommodationFacilityIcon keyword={a.keyword} />
                                            {a.name}
                                        </span>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    ):
                        null
                    }
                    
                </div>
            ):(
                <div className='lg:col-span-2' />
            )}

            {!!(showMap && accomodationData.coordinates?.latitude && accomodationData.coordinates?.longitude) && <HotelMap
                closeMapModal={closeMapModal}
                latLong={[accomodationData.coordinates.latitude, accomodationData.coordinates.longitude]}
            />}

        </div>
    )
}

export default AccommodationName;