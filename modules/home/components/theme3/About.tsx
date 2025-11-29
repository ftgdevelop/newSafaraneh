import { replaceBrandNames } from "@/modules/shared/helpers";
import Image from "next/image";
import Markdown from "react-markdown";
type Props = {
    logo?: string;
    strapiContent?: string;
    siteName?: string;
}
const About: React.FC<Props> = props => {

    const renderedMarkdown = replaceBrandNames(props.strapiContent || "");

    return (
        <section className="max-w-container m-auto px-5 max-xl:p-5 mb-5 sm:mb-10" >
            {props.logo && <Image
                src={props.logo}
                alt="هتل بان"
                width={157}
                height={48}
                className="w-auto h-12 mb-3 lg:mb-6"
            />}

            {props.strapiContent && <div className="inserted-content hotelban-strapi-about">
                <Markdown>{renderedMarkdown}</Markdown>
            </div>}
        </section>
    )
}

export default About;