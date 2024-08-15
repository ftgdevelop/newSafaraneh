import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import BeyondTypicalStays from "./BeyondTypicalStays";
import RecommendedHotels from "./RecommendedHotels";
import LargeBanner from "./LargeBanner";
import TrendingDestinations from "./TrendingDestinations";
import WeekendDeals from "./WeekendDeals";
import RecentBlogs from "./RecentBlogs";
import LoginLinkBanner from "@/modules/shared/components/theme2/LoginLinkBanner";

type SectionItem = {
    Keyword: "login_banner" | "link_banner" | "last_seen_hotels" | "cities";
    Description?: string;
    Title?: string;
    LinkTitle?: string;
    ImageTitle?: string;
    ImageAlternative?: string;
    Url?: string;
}

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
    sections: SectionItem[]
}

const HomeTheme2: React.FC<Props> = props => {

    const strapiCities = props.sections?.find(section => section.Keyword === "cities");
    const strapiLastSeenHotels = props.sections?.find(section => section.Keyword === "last_seen_hotels");
    const strapiLinkBanner = props.sections?.find(section => section.Keyword === "link_banner");
    const strapiLoginBanner = props.sections?.find(section => section.Keyword === "login_banner");

    return (
        <>
            <Banner
                modules={props.modules}
                //innerElement = {<LoginLinkBanner message={strapiLoginBanner?.Description || ""} btnText = {strapiLoginBanner?.LinkTitle || ""} />}
            />

            <BeyondTypicalStays 
                sectionTitle={strapiCities?.Title} 
            />

            <RecommendedHotels
                sectionTitle={strapiLastSeenHotels?.Title}
                sectionSubtitle={strapiLastSeenHotels?.Description}
            />

            <LargeBanner
                buttonText={strapiLinkBanner?.LinkTitle}
                linkUrl={strapiLinkBanner?.Url}
                sectionTitle={strapiLinkBanner?.Title}
                sectionDescription={strapiLinkBanner?.Description}
                imageAlt={strapiLinkBanner?.ImageAlternative}
            />

            {/* <TrendingDestinations />

            <WeekendDeals /> */}

            <RecentBlogs blogs={props.blogs} />
            
        </>
    )
}

export default HomeTheme2;