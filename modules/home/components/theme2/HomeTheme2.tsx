import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import BeyondTypicalStays from "./BeyondTypicalStays";
import RecommendedHotels from "./RecommendedHotels";
import LargeBanner from "./LargeBanner";
import RecentBlogs from "./RecentBlogs";
import { ServerAddress } from "@/enum/url";
import LoginLinkBanner from "@/modules/shared/components/theme2/LoginLinkBanner";
import parse from 'html-react-parser';
import Image from "next/image";

type SectionItem = {
    Keyword: "login_banner" | "link_banner" | "last_seen_hotels" | "cities" | "content" | "main_banner";
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
    modules: ("domesticHotel" | "domesticFlight" | "cip" | "accommodation")[];
    sections?: SectionItem[]
}

const HomeTheme2: React.FC<Props> = props => {

    const strapiCities = props.sections?.find(section => section.Keyword === "cities");
    const strapiLastSeenHotels = props.sections?.find(section => section.Keyword === "last_seen_hotels");
    const strapiLinkBanner = props.sections?.find(section => section.Keyword === "link_banner");
    const strapiMainBanner = props.sections?.find(section => section.Keyword === "main_banner");
    const strapiLoginBanner = props.sections?.find(section => section.Keyword === "login_banner");
    const strapiContent : any = props.sections?.find(section => section.Keyword === "content");

    const strapiImagesMainUrl = ServerAddress.Strapi ? ((ServerAddress.Type || "https://") + ServerAddress.Strapi) : "";

    return (
        <>

            {strapiMainBanner?.Image?.data?.attributes?.url ? <Image
                src={strapiImagesMainUrl + strapiMainBanner.Image.data.attributes.url}
                alt={strapiMainBanner?.ImageAlternative || "home banner"}
                width={1080}
                height={216}
                className="w-full h-auto min-h-44 object-cover"
                priority
            /> : null}

            <Banner
                modules={props.modules}
                //bannerImage={strapiMainBanner?.Image?.data?.attributes?.url ? (strapiImagesMainUrl + strapiMainBanner.Image.data.attributes.url) : ""}
                innerElement = {<LoginLinkBanner message={strapiLoginBanner?.Description || ""} btnText = {strapiLoginBanner?.LinkTitle || ""} />}
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


            {!!strapiContent?.Body && (
                <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12 my-8 text-justify inserted-content" >
                    {!!strapiContent?.Title && (<h2 className='font-semibold text-md md:text-2xl mb-6'> {strapiContent.Title} </h2>) }
                    {parse(strapiContent.Body)}
                </section>
            )}  

        </>
    )
}

export default HomeTheme2;