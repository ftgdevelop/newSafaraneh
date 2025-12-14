import { openLoginForm } from '@/modules/authentication/store/authenticationSlice';
import { disLikeComment, likeComment } from '@/modules/domesticHotel/actions';
import { DomesticHotelReviewCommentItem } from '@/modules/domesticHotel/types/hotel';
import { Business, Couple, DisLike, Group3, Individual, Like, Sad, Smile } from '@/modules/shared/components/ui/icons';
import { dateDisplayFormat } from '@/modules/shared/helpers';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { setReduxNotification } from '@/modules/shared/store/notificationSlice';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

type Props = {
    comment: DomesticHotelReviewCommentItem;
    siteName?: string;
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;
    const dispatch = useAppDispatch();
    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const [likesCount, setLikesCount] = useState<number>(0);
    const [dislikesCount, setDislikesCount] = useState<number>(0);

    const [likeActive, setLikeActive] = useState<boolean>(false);
    const [dislikeActive, setDislikeActive] = useState<boolean>(false);

    useEffect(()=>{
        if(userIsAuthenticated){
            setLikesCount(comment.likeCount);
            setDislikesCount(comment.dislikeCount);
            setLikeActive(!!comment.isLiked);
            setDislikeActive(comment.isLiked === false);
        }
    },[userIsAuthenticated, comment.isLiked]);


    const likeHandler = async () => {

        if (!userIsAuthenticated){
             dispatch(openLoginForm());
             dispatch(setReduxNotification({
                 status: 'error',
                 message: "برای پسندیدن نظرات باید وارد حساب کاربری شوید!",
                 isVisible: true
             }));
            return;
        }

        const localStorageToken = localStorage?.getItem('Token');

        if (comment.isWriter){
            dispatch(setReduxNotification({
                status: 'error',
                message: "شما نمی توانید نظر خودتان را بپسندید!",
                isVisible: true
            }));
            return;
        }
        
        if (likeActive) return;

        const likeRequest : any = await likeComment(comment.id, localStorageToken!);
        if(likeRequest?.data?.success){
            setLikesCount(prev => prev+1);
            setLikeActive(true);
            if(dislikeActive){
                setDislikeActive(false);
                setDislikesCount(prev => prev-1);
            }
        }

    }

    const disLikeHandler = async () => {

        if (!userIsAuthenticated){
            dispatch(openLoginForm());
            dispatch(setReduxNotification({
                status: 'error',
                message: "برای نپسندیدن نظرات باید وارد حساب کاربری شوید!",
                isVisible: true
            }));
           return;
       }

        const localStorageToken = localStorage?.getItem('Token');

        if (comment.isWriter){
            dispatch(setReduxNotification({
                status: 'error',
                message: "شما نمی توانید نظر خودتان را نپسندید!",
                isVisible: true
            }));
            return;
        }
        
        if (dislikeActive) return;

        const disLikeRequest: any = await disLikeComment(comment.id, localStorageToken!);
        if(disLikeRequest?.data?.success){
            setDislikesCount(prev => prev+1);
            setDislikeActive(true);
            if(likeActive){
                setLikeActive(false);
                setLikesCount(prev => prev-1);
            }
        }
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
                {dateDisplayFormat({ date: comment.creationTime || "", format: "dd mm yyyy", locale: "fa" })}
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
                    {likesCount}
                    <button
                        type='button'
                        onClick={likeHandler}
                        className={`border-none outline-none ${likeActive?"text-green-700":"hover:text-green-700" }`}
                        aria-label='like'
                    >
                        <Like className='w-5 h-5 fill-current' />
                    </button>
                    {dislikesCount}
                    <button
                        type='button'
                        onClick={disLikeHandler}
                        className={`border-none outline-none ${dislikeActive?"text-red-700":"hover:text-red-700" }`}
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

