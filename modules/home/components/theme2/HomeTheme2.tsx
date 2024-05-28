import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";

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
            />
        </>
    )
}

export default HomeTheme2;