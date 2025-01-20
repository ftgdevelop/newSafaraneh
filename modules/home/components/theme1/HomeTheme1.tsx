import { BlogItemType } from "@/modules/blogs/types/blog";
import AboutSummary from "../AboutSummary";
import BeachHotels from "../BeachHotels";
import HomeFAQ from "../HomeFAQ";
import Newsletter from "../Newsletter";
import PopularCities from "../PopularCities";
import RecentBlogs from "../RecentBlogs";
import Services from "../Services";
import SuggestedHotels from "../SuggestedHotels";
import Unknowns from "../Unknowns";
import Banner from "../banner";
import ModulesBanner from "../modules-banner";

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
    sections?:any;
}

const HomeTheme1: React.FC<Props> = props => {

    const { blogs, siteName, logo } = props;

    return (
        <>
            <Banner
                modules={props.modules}
            />

            <div className='max-w-container mx-auto px-5'>
                
                <ModulesBanner
                    strapiData={props.sections?.find((item:any) => item.Keyword === "top-banners")}
                />

                <SuggestedHotels
                    strapiData={props.sections?.find((item:any) => item.Keyword === "suggested-hotels")}
                />

                <PopularCities 
                    strapiData={props.sections?.find((item:any) => item.Keyword === "popular-cities")}
                />

                <BeachHotels 
                    strapiData={props.sections?.find((item:any) => item.Keyword === "beach-hotels")}
                />
                
                <Unknowns 
                    strapiData={props.sections?.find((item:any) => item.Keyword === "unknowns")}
                />
            </div>

            <div className='max-w-container mx-auto px-5'>
                
                {blogs ? <RecentBlogs blogs={blogs} /> : <br />}

                <Services 
                    siteName={siteName} 
                    strapiData={props.sections?.find((item:any) => item.Keyword === "services")}
                />
                
                <AboutSummary
                    logo={logo}
                    siteName={siteName}
                    strapiContent={props.sections?.find((item:any) => item.Keyword === "about-section")?.Body}
                />

                <HomeFAQ 
                    items={props.sections?.find((item:any) => item.Keyword === "faq-section")?.Items}
                />
                
                <Newsletter />
            </div>
        </>
    )
}

export default HomeTheme1;