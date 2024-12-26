import { useTranslation } from 'next-i18next';

import { DomesticHotelReviewsType } from "@/modules/domesticHotel/types/hotel";
import UsersComments from './UsersComments';

type Props = {
    hotelScoreData?: DomesticHotelReviewsType;
    pageId?: number;
    siteName?: string;
}

const Comments: React.FC<Props> = props => {

    const { t:tHotel } = useTranslation('hotel');

    return (
        <div id="reviews_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">
            <h4 className='text-lg lg:text-3xl font-semibold mb-3 md:mb-7'> {tHotel("suggestion")} </h4>
            {!!props.hotelScoreData && <UsersComments siteName={props.siteName} hotelScoreData={props.hotelScoreData} pageId={props.pageId} />}
        </div>
    )
}

export default Comments;