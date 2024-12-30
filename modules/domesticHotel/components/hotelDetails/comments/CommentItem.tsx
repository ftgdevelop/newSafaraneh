import { DomesticHotelReviewCommentItem } from '@/modules/domesticHotel/types/hotel';
import { Business, Couple, DisLike, Group3, Individual, Like, Sad, Smile, TikCircle } from '@/modules/shared/components/ui/icons';
import { dateDiplayFormat } from '@/modules/shared/helpers';
import parse from 'html-react-parser';

type Props = {
    comment: DomesticHotelReviewCommentItem;
    siteName?: string;
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;



    const likeHandler = () => {

        let cookieLikedComment: string[] = [];
        const cookies = decodeURIComponent(document?.cookie).split(';');
        for (const item of cookies) {
            if (item.includes("likedComments=")) {
                cookieLikedComment = item.split("=")[1]?.split("_");
            }
        }

        if (cookieLikedComment.includes(comment.id.toString())) {
            return;
        }

        //call request
        const expDate = new Date();
        expDate.setTime(expDate.getTime() + (400 * 24 * 60 * 60 * 1000));
        const updatedLikedComments = [...cookieLikedComment, comment.id].join("_");
        
        document.cookie = `likedComments=${updatedLikedComments}; expires=${expDate.toUTCString()};path=/`;
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

            {/* <div className='flex gap-10'>
                آیا این نظر مفید بود؟
                <div className='flex gap-3'>
                    {comment.likeCount}
                    <button
                        type='button'
                        onClick={likeHandler}
                        className='border-none outline-none hover:text-green-700'
                        aria-label='like'
                    >
                        <Like className='w-5 h-5 fill-current' />
                    </button>
                    {comment.dislikeCount}
                    <button
                        type='button'
                        onClick={() => { }}
                        className='border-none outline-none hover:text-green-700'
                        aria-label='dislike'
                    >
                        <DisLike className='w-5 h-5 fill-current' />
                    </button>
                </div>
            </div> */}

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

