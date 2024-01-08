import { useTranslation } from "next-i18next";

type Props = {
    className?: string;
    reviews?: number;
    score?: number;
}

const HotelScore: React.FC<Props> = props => {
    
    const { t: tHotel } = useTranslation('hotel');

    const { score, reviews } = props;

    if (!(score && reviews && reviews > 0)) {
        return null;
    }

    let pointTitle: string = "";
    let pointColor: string = "";

    if (score >= 90) {
        pointTitle = tHotel("excellent");
        pointColor = "rgb(20, 148, 15)";
    } else if (score >= 80) {
        pointTitle = tHotel("very-good");
        pointColor = "rgb(108, 191, 74)";
    } else if (score >= 70) {
        pointTitle = tHotel("good");
        pointColor = "rgb(163, 205, 77)";
    } else if (score >= 50) {
        pointTitle = tHotel("fair");
        pointColor = "rgb(243, 163, 36)";
    } else {
        pointTitle = tHotel("bad");
        pointColor = "#FF5722";
    }

    return (
        <div className={` ${props.className || ""}`}>
            <span className="text-3xl font-bold"> {score} از 100  </span> {pointTitle} ({props.reviews} {tHotel("guest-reviews")}) 
        </div>
    )
};

export default HotelScore;