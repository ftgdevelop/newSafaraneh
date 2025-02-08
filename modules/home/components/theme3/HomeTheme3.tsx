import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import TopHotels from "./TopHotels";

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
            
            <TopHotels />

        </>
    )
}

export default HomeTheme3;