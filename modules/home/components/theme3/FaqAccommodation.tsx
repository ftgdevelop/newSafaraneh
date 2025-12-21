import Accordion from "@/modules/shared/components/ui/Accordion";
import { replaceBrandNames } from "@/modules/shared/helpers";
import Markdown from "react-markdown";
type Props = {
    logo?: string;
    items: {
        title?: string;
        content?: string;
        key: number;
    }[];
}
const FaqAccommodation: React.FC<Props> = props => {
    return (
        <section className="max-w-container m-auto mt-6 md:mt-8 md:mr-48">
            {props.items?.slice(0, 4).map((item, index) => {
                const renderedMarkdown = replaceBrandNames(item.content || "")
                return (
                    <Accordion
                        key={item.key}
                        title={replaceBrandNames(item.title || "")}
                        content={<div className="text-sm"><Markdown>{renderedMarkdown}</Markdown></div>}
                        type={3}
                        WrapperClassName={index ? "!bg-neutral-100 rounded-lg mt-1" : "!bg-neutral-100 rounded-lg"}
                    />
                )
            })}

        </section>
    )
}

export default FaqAccommodation;