import { useTranslation } from "next-i18next";

type Props = {
    className?: string;
    reviews?: number;
    score?: number;
    small?: boolean;
    max: 10 | 100;
}

const AccommodationScore: React.FC<Props> = props => {
    
    const { t: tHotel } = useTranslation('hotel');

    const { score, reviews , max} = props;

    if (!(score && reviews && reviews > 0)) {
        return null;
    }

    let pointTitle: string = "";
    let pointColor: string = "";

    if (score/max >= .9) {
        pointTitle = tHotel("excellent");
        pointColor = "rgb(20, 148, 15)";
    } else if (score/max >= .8) {
        pointTitle = tHotel("very-good");
        pointColor = "rgb(108, 191, 74)";
    } else if (score/max >= .7) {
        pointTitle = tHotel("good");
        pointColor = "rgb(163, 205, 77)";
    } else if (score/max >= .5) {
        pointTitle = tHotel("fair");
        pointColor = "rgb(243, 163, 36)";
    } else {
        pointTitle = tHotel("bad");
        pointColor = "#FF5722";
    }

    return (
        <div className={`${props.small?"text-sm":""} ${props.className || ""}`}>
            <span className={`${props.small?"text-base font-semibold":"text-3xl font-bold"}`}> {score} از {props.max}  </span> {pointTitle} ({props.reviews} {tHotel("guest-reviews")}) 
        </div>
    )
};

export default AccommodationScore;