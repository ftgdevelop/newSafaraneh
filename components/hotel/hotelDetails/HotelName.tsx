import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import { DomesticHotelDetailType } from "@/types/hotel";
import { Location } from "@/components/shared/ui/icons";
import HotelScore from "../shared/HotelScore";
import Rating from "@/components/shared/ui/Rating";
import Image from 'next/image';
import Attractions from './Attractions';

const LeafletNoSsr = dynamic(() => import('../../shared/ui/LeafletMap'), {
    ssr: false
});


type Props = {
    hotelData?: DomesticHotelDetailType;
    scoreData?: {
        CommentCount?: number;
        Satisfaction?: number;
    }
}

const HotelName: React.FC<Props> = props => {

    const { hotelData } = props;

    const { t } = useTranslation('common');

    if (!hotelData) {
        return "loading..."
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-3 sm:p-5 lg:p-7 bg-white rounded-b-xl">
            <div className="lg:col-span-2 pt-3">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-3 sm:mb-4 lg:mb-5">
                    {hotelData.HotelCategoryName} {hotelData.HotelName} {hotelData.CityName}
                </h1>
                {!!hotelData.HotelRating && <Rating number={hotelData.HotelRating} className="mb-3" />}
                <p className="text-neutral-500 text-sm mb-3 sm:mb-6"><Location className="w-4 h-4 fill-current inline-block align-middle" /> {hotelData.Address}</p>
                <HotelScore
                    reviews={props.scoreData?.CommentCount}
                    score={props.scoreData?.Satisfaction}
                    className="text-md lg:text-xl font-semibold"
                />
            </div>

            {(hotelData.Latitude && hotelData.Longitude) ? (
                <LeafletNoSsr
                    className='lg:col-span-1 h-48 rounded-xl'
                    location={[hotelData.Latitude, hotelData.Longitude]}
                />
            ) : (
                <div className="lg:col-span-1" />
            )}

            <div className='hidden lg:block lg:col-span-2'>
                <h3 className='font-semibold text-md lg:text-lg mb-3'>امکانات محبوب هتل</h3>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                    {hotelData.Facilities?.slice(0, 6).map(item => <div key={item.Keyword} className='text-sm text-neutral-500'>
                        {item.Image && <Image src={item.Image} alt={item.ImageAlt || item.Title || ""} width={20} height={20} className='h-5 w-5 inline-block rtl:ml-2 ltr:mr-2' />}
                        {item.Title}
                    </div>)}
                </div>
            </div>
            <div className='hidden lg:block lg:col-span-1'>
                <Attractions isSmall attractions={hotelData.DistancePoints} />
            </div>

        </div>
    )
}

export default HotelName;