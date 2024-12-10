import { DomesticHotelReviewCommentItem } from '@/modules/domesticHotel/types/hotel';
import { dateDiplayFormat } from '@/modules/shared/helpers';
import parse from 'html-react-parser';

type Props = {
    comment: DomesticHotelReviewCommentItem;
}

const CommentItem: React.FC<Props> = props => {

    const { comment } = props;

    return (
        <div className='mb-5 pb-5 border-b border-neutral-300 text-sm'>

            <div className='font-bold text-lg'>{(comment.overallRating || 0)} از 10</div>

            <div className='font-semibold'> {comment.userDisplayName} </div>

            <div className='text-neutral-500 text-xs'>
                {dateDiplayFormat({ date: comment.creationTime || "", format: "dd mm yyyy", locale: "fa" })}
            </div>

            {!!comment.comment && parse(comment.comment)}

        </div>
    )
}

export default CommentItem;

