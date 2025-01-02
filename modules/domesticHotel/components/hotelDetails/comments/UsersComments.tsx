import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useState } from 'react';

import { DomesticHotelReviewsType } from "@/modules/domesticHotel/types/hotel";
import HotelScore from '../../shared/HotelScore';
import ProgressBar from '@/modules/shared/components/ui/ProgressBar';
import CommentItem from './CommentItem';
import NewComment from './NewComment';
import { domesticHotelGetReviews } from '@/modules/domesticHotel/actions';
import { useAppSelector } from '@/modules/shared/hooks/use-store';

type Props = {
    hotelScoreData: DomesticHotelReviewsType;
    pageId?: number;
    siteName?: string;
}

const UsersComments: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const [showAll, setShowAll] = useState<boolean>(false);

    const [userComments, setUserComments] = useState<DomesticHotelReviewsType | undefined>(); 
    
    const data: DomesticHotelReviewsType = userComments || props.hotelScoreData;

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    useEffect(()=>{                
        if (!userIsAuthenticated || !props.pageId) return;
        
        const localStorageToken = localStorage?.getItem('Token');

        if(!localStorageToken) return;

        const updateComments = async (token: string, pageId:number) => {
            const reviewsData : any = await domesticHotelGetReviews({
                pageId: pageId,
                token: token
            });
            if (reviewsData?.data?.result){
                setUserComments(reviewsData.data.result)
            }
        }
        updateComments(localStorageToken, props.pageId);
    },[userIsAuthenticated, props.pageId]);

    const toggleShowAll = () => {
        setShowAll(prevState => !prevState);
    }

    if (!data) {
        return null;
    }

    return (
        <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-8'>

            <div>
                <h5 className='text-sm md:text-base font-semibold mb-5'>{tHotel("hotel-score")}</h5>

                <HotelScore
                    reviews={data.reviews.totalCount}
                    score={Math.floor(data.averageRating)}
                    className="text-sm lg:text-md font-semibold"
                />

                {data.ratings.map(item => (
                    <Fragment key={item.category.keyword}>
                        <div className="mb-1 mt-5 text-sm">
                            {item.category.name}
                        </div>
                        <ProgressBar percentage={item.average || 0} />
                    </Fragment>
                ))}


            </div>

            <div className='md:col-span-2 text-justify leading-7 text-sm md:text-base md:leading-7'>

                <div className='flex justify-between'>
                    <h5 className='text-sm md:text-base font-semibold mb-5'>{tHotel("user-suggestions")}</h5>
                    {!!props.pageId && (
                        <NewComment pageId={props.pageId} />
                    )}
                </div>


                {data?.reviews?.items?.slice(0, 3).map(item => <CommentItem key={item.id} comment={item} siteName={props.siteName} />)}
                {showAll && data?.reviews?.items?.slice(3).map(item => <CommentItem key={item.id} comment={item} siteName={props.siteName} />)}

                <button
                    type='button'
                    onClick={toggleShowAll}
                    className='h-10 px-5 text-sm border rounded-lg text-primary-700 border-primary-700 hover:bg-primary-100 transition-all'
                >
                    {tHotel("view-suggestions")}{showAll ? t('less') : t('more')}
                </button>
            </div>

        </div>
    )
}

export default UsersComments;
