import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import LoginLinkBanner from "./LoginLinkBanner";

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
        </>
    )
}

export default HomeTheme2;