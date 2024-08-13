import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import BeyondTypicalStays from "./BeyondTypicalStays";
import RecommendedHotels from "./RecommendedHotels";
import LargeBanner from "./LargeBanner";
import TrendingDestinations from "./TrendingDestinations";
import WeekendDeals from "./WeekendDeals";
import RecentBlogs from "./RecentBlogs";
import LoginLinkBanner from "@/modules/shared/components/theme2/LoginLinkBanner";

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
                //innerElement = {<LoginLinkBanner message="10٪ یا بیشتر در بیش از 100000 هتل با قیمت اعضا صرفه جویی کنید. همچنین، با اضافه کردن هتل به پرواز، اعضا تا 30٪ صرفه جویی می کنند" />}
            />

            <BeyondTypicalStays />

            <RecommendedHotels />

            <LargeBanner />

            {/* <TrendingDestinations />

            <WeekendDeals /> */}

            <RecentBlogs blogs={props.blogs} />
            
        </>
    )
}

export default HomeTheme2;