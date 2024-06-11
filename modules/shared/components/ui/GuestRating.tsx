type Props = {
    wrapperClassName?: string;
    reviewCount: number;
    rating: number;
    large?:boolean;
}

const GuestRating : React.FC<Props> = props => {

    let tag = "معمولی";

    if (props.rating > 70) {
        tag = "خوب";
    }
    if (props.rating > 80) {
        tag = "خیلی خوب";
    }
    if (props.rating > 90) {
        tag = "عالی";
    }

    return(
        <div
            className={`${props.wrapperClassName || ""} flex items-center gap-2`}
        >
            <span className={`block flex items-center justify-center w-8 h-8 rounded text-md font-bold ${props.rating > 70 ? "bg-green-700 text-white" : "bg-neutral-300"}`}>
                {props.rating}
            </span>
            <div className={`leading-5 ${props.large?"text-sm":"text-2xs"}`}>
                <div className={`${props.large?"text-xl":"text-sm"} font-semibold`}> {tag} </div>
                ({props.reviewCount} نظر)
            </div>

        </div>
    )
}

export default GuestRating;