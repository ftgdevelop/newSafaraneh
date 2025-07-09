import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import TopCities from "./TopCities";
import Services from "./Services";
import Promotions from "./Promotions";
import Cip from "./Cip";
import About from "./About";
import Faq from "./Faq";
import RecentPostsTheme3 from "./RecentPostsTheme3";

type SectionItem = {
    Keyword: "about-section" | "faq-section";
    Body?: string;
    Title?: string;
    Items?: {
        Answer?: string;
        Question?: string;
        id: number;
    }[]
}

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
    sections?: SectionItem[];
}

const HomeTheme3: React.FC<Props> = props => {

    const strapiAboutContent = props.sections?.find(item => item.Keyword === "about-section")?.Body;
    const strapiFAQ = props.sections?.find(item => item.Keyword === "faq-section")?.Items;


    return (
        <>
            <Banner
                modules={props.modules}
                bannerImage="/images/hotelban/hero.jpg"
                siteName={props.siteName}
                logo={props.logo}
            />

            <TopCities />

            <Services />

            <Promotions />

            {props.modules.includes("cip") && <Cip />}

            <About logo={props.logo} strapiContent={strapiAboutContent} />

            {props.blogs ? <RecentPostsTheme3 blogs={props.blogs} /> : <br />}

            {strapiFAQ && <Faq items={strapiFAQ.map(item => ({
                key: item.id,
                content: item.Answer,
                title: item.Question
            }))} />}

        </>
    )
}

export default HomeTheme3;