import { DomesticHotelReviewCommentItem } from '@/modules/domesticHotel/types/hotel';
import { Business, Couple, Group3, Individual, Sad, Smile, TikCircle } from '@/modules/shared/components/ui/icons';
import { dateDiplayFormat } from '@/modules/shared/helpers';
import parse from 'html-react-parser';

type Props = {
    comment: DomesticHotelReviewCommentItem;
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;

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

        </div>
    )
}

export default CommentItem;

