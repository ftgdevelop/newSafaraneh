import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import TopCities from "./TopCities";
import Services from "./Services";
import Promotions from "./Promotions";
import Cip from "./Cip";
import About from "./About";
import Faq from "./Faq";

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip")[];
}

const HomeTheme3: React.FC<Props> = props => {

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

            <About logo={props.logo} />

            <Faq />

        </>
    )
}

export default HomeTheme3;