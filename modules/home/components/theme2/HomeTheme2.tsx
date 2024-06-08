import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import LoginLinkBanner from "./LoginLinkBanner";
import BeyondTypicalStays from "./BeyondTypicalStays";
import RecommendedHotels from "./RecommendedHotels";
import LargeBanner from "./LargeBanner";
import TrendingDestinations from "./TrendingDestinations";
import WeekendDeals from "./WeekendDeals";

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
}

const HomeTheme2: React.FC<Props> = props => {

    return (
        <>
            <Banner
                modules={props.modules}
                innerElement = {<LoginLinkBanner />}
            />

            <BeyondTypicalStays />

            <RecommendedHotels />

            <LargeBanner />

            <TrendingDestinations />

            <WeekendDeals />
            
        </>
    )
}

export default HomeTheme2;