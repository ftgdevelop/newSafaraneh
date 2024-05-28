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
}

const HomeTheme1: React.FC<Props> = props => {

    const { blogs, siteName, logo } = props;

    return (
        <>
            <Banner
                modules={props.modules}
            />

            <div className='max-w-container mx-auto px-5'>
                <ModulesBanner />
                <SuggestedHotels />
                <PopularCities />
                <BeachHotels />
                <Unknowns />
            </div>

            <div className='max-w-container mx-auto px-5'>
                {blogs ? <RecentBlogs blogs={blogs} /> : <br />}
                <Services siteName={siteName} />
                <AboutSummary
                    logo={logo}
                    siteName={siteName}
                />
                <HomeFAQ />
                <Newsletter />
            </div>
        </>
    )
}

export default HomeTheme1;