import { disLikeComment, likeComment } from '@/modules/domesticHotel/actions';
import { DomesticHotelReviewCommentItem } from '@/modules/domesticHotel/types/hotel';
import { Business, Couple, DisLike, Group3, Individual, Like, Sad, Smile, TikCircle } from '@/modules/shared/components/ui/icons';
import { dateDiplayFormat } from '@/modules/shared/helpers';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { setReduxNotification } from '@/modules/shared/store/notificationSlice';
import parse from 'html-react-parser';
import { useState } from 'react';

type Props = {
    comment: DomesticHotelReviewCommentItem;
    siteName?: string;
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;
    const dispatch = useAppDispatch();
    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const [liked, setLiked ] = useState<boolean>(false);
    
    const [disLiked, setDisLiked ] = useState<boolean>(false);

    const likeHandler = async () => {

        const localStorageToken = localStorage?.getItem('Token');
        if (!localStorageToken){
            dispatch(setReduxNotification({
                status: 'error',
                message: "برای پسندیدن نظرات باید وارد حساب کاربری شوید!",
                isVisible: true
            }));
            return
        }

        if (comment.isWriter){
            dispatch(setReduxNotification({
                status: 'error',
                message: "شما نمی توانید نظر خودتان را بپسندید!",
                isVisible: true
            }));
            return;
        }
        
        if (comment.isLiked || liked) return;

        const like = await likeComment(comment.id, localStorageToken);
        //TODO: check data saved successfully;
        setLiked(true);
        setDisLiked(false);

    }

    const disLikeHandler = async () => {

        const localStorageToken = localStorage?.getItem('Token');
        if (!localStorageToken){
            dispatch(setReduxNotification({
                status: 'error',
                message: "برای نپسندیدن نظرات باید وارد حساب کاربری شوید!",
                isVisible: true
            }));
            return
        }

        if (comment.isWriter){
            dispatch(setReduxNotification({
                status: 'error',
                message: "شما نمی توانید نظر خودتان را نپسندید!",
                isVisible: true
            }));
            return;
        }
        
        if (comment.isLiked === false || disLiked) return;

        const disLike = await disLikeComment(comment.id, localStorageToken);
        //TODO: check data saved successfully;
        setLiked(false);
        setDisLiked(true);

    }

    let travelTypeElement: React.ReactNode = null;

    switch (comment.travelType) {
        case "Business":
            travelTypeElement = <>
                <Business className='fill-current w-4 h-4' /> کاری
            </>;
            break;
        case 'Couple':
            travelTypeElement = <>
                <Couple className='fill-current w-4 h-4' /> زوج
            </>;
            break;
        case 'Family':
            travelTypeElement = <>
                <Couple className='fill-current w-4 h-4' /> خانواده
            </>;
            break;
        case 'Group':
            travelTypeElement = <>
                <Group3 className='fill-current w-4 h-4' /> گروهی
            </>;
            break;
        case 'Individual':
            travelTypeElement = <>
                <Individual className='fill-current w-4 h-4' /> انفرادی
            </>;
            break;
        default:
            travelTypeElement = null;

    }

    return (
        <div className='mb-5 pb-5 border-b border-neutral-300 text-sm'>

            <div className='font-bold text-lg'>{(comment.overallRating || 0)} از 10</div>

            <div className='font-semibold'> {comment.userDisplayName || "کاربر ناشناس"}  {travelTypeElement && <div className='inline-flex gap-1 items-center border rounded px-2 py-1 align-middle mx-3 leading-5 text-neutral-500'> {travelTypeElement} </div>} </div>

            <div className='text-neutral-500 text-xs'>
                {dateDiplayFormat({ date: comment.creationTime || "", format: "dd mm yyyy", locale: "fa" })}
            </div>

            {!!comment.positivePoints && (
                <div className='text-green-600'>
                    <Smile className='w-5 h-5 fill-current inline-block' /> {parse(comment.positivePoints)}
                </div>
            )}

            {!!comment.negativePoints && (
                <div className='text-red-600'>
                    <Sad className='w-5 h-5 fill-current inline-block' /> {parse(comment.negativePoints)}
                </div>
            )}

            {!!comment.comment && parse(comment.comment)}

            <div className='flex gap-10 mt-4'>
                آیا این نظر مفید بود؟
                <div className='flex gap-3'>
                    {liked? comment.likeCount + 1 : comment.likeCount}
                    <button
                        disabled = {!userIsAuthenticated}
                        type='button'
                        onClick={likeHandler}
                        className={`border-none outline-none ${(liked || (comment.isLiked && !disLiked))?"text-green-700":"hover:text-green-700" } disabled:text-neutral-400 disabled:cursor-no-drop`}
                        aria-label='like'
                    >
                        <Like className='w-5 h-5 fill-current' />
                    </button>
                    {disLiked ? comment.dislikeCount + 1 : comment.dislikeCount}
                    <button
                        disabled = {!userIsAuthenticated}
                        type='button'
                        onClick={disLikeHandler}
                        className={`border-none outline-none ${(disLiked || (comment.isLiked === false && !liked))?"text-red-700":"hover:text-red-700" } disabled:text-neutral-400 disabled:cursor-no-drop`}
                        aria-label='dislike'
                    >
                        <DisLike className='w-5 h-5 fill-current' />
                    </button>
                </div>
            </div>

            {comment.reply?.reply && (
                <div className='border p-2 px-4 mt-3 rounded bg-slate-100'>
                    <h5 className='font-semibold mb-2'> پاسخ کارشناس {props.siteName} </h5>
                    {parse(comment.reply.reply)}
                </div>
            )}

        </div>
    )
}

export default CommentItem;

