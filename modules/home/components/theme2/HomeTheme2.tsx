import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import BeyondTypicalStays from "./BeyondTypicalStays";
import RecommendedHotels from "./RecommendedHotels";
import LargeBanner from "./LargeBanner";
import RecentBlogs from "./RecentBlogs";
import { ServerAddress } from "@/enum/url";

type SectionItem = {
    Keyword: "login_banner" | "link_banner" | "last_seen_hotels" | "cities";
    Description?: string;
    Title?: string;
    LinkTitle?: string;
    ImageTitle?: string;
    ImageAlternative?: string;
    Url?: string;
    Image?: {
        data?: {
            attributes?: {
                url?: string;
            }
        }
    };
    Items?: {
        Description?: string;
        ImageAlternative?: string;
        ImageTitle?: string;
        Keyword?: string;
        Title?: string;
        Url?: string;
        id?: number;
        Image?: {
            data?: {
                attributes?: {
                    url?: string;
                }
            }
        }
    }[]
}

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
    sections?: SectionItem[]
}

const HomeTheme2: React.FC<Props> = props => {

    const strapiCities = props.sections?.find(section => section.Keyword === "cities");
    const strapiLastSeenHotels = props.sections?.find(section => section.Keyword === "last_seen_hotels");
    const strapiLinkBanner = props.sections?.find(section => section.Keyword === "link_banner");
    //const strapiLoginBanner = props.sections?.find(section => section.Keyword === "login_banner");

    const strapiImagesMainUrl = ServerAddress.Strapi ? ((ServerAddress.Type || "https://") + ServerAddress.Strapi) : "";

    return (
        <>
            <Banner
                modules={props.modules}
            //innerElement = {<LoginLinkBanner message={strapiLoginBanner?.Description || ""} btnText = {strapiLoginBanner?.LinkTitle || ""} />}
            />

            <BeyondTypicalStays
                sectionTitle={strapiCities?.Title}
                items={strapiCities?.Items?.map(item => ({
                    name: item.Title || "",
                    url: item.Url || "",
                    imageUrl: item.Image?.data?.attributes?.url ? (strapiImagesMainUrl + item.Image.data.attributes.url) : "",
                    imageAlt: item.ImageAlternative,
                    imageTitle: item.ImageTitle
                }))}
            />

            <RecommendedHotels
                sectionTitle={strapiLastSeenHotels?.Title}
                sectionSubtitle={strapiLastSeenHotels?.Description}
                hotels={strapiLastSeenHotels?.Items?.map(item => ({
                    alt: item.ImageAlternative,
                    name: item.Title,
                    description: item.Description,
                    url: item.Url,
                    imageTitle: item.ImageTitle,
                    imageUrl: item.Image?.data?.attributes?.url ? strapiImagesMainUrl + item.Image.data.attributes.url : "",
                }))}
            />

            <LargeBanner
                buttonText={strapiLinkBanner?.LinkTitle}
                linkUrl={strapiLinkBanner?.Url}
                sectionTitle={strapiLinkBanner?.Title}
                sectionDescription={strapiLinkBanner?.Description}
                imageAlt={strapiLinkBanner?.ImageAlternative}
                imageUrl={strapiLinkBanner?.Image?.data?.attributes?.url ? (strapiImagesMainUrl + strapiLinkBanner.Image.data.attributes.url) : ""}
            />

            {/* <TrendingDestinations />

            <WeekendDeals /> */}

            <RecentBlogs blogs={props.blogs} />

        </>
    )
}

export default HomeTheme2;