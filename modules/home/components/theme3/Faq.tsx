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
const Faq: React.FC<Props> = props => {
    return (
        <section className="max-w-container m-auto px-5 max-xl:p-5 mb-5 sm:mb-14" >
            {props.items?.map((item, index) => {
                const renderedMarkdown = replaceBrandNames(item.content || "")
                return (
                    <Accordion
                        key={item.key}
                        title={replaceBrandNames(item.title || "")}
                        content={<div className="text-sm">
                            <Markdown>{renderedMarkdown}</Markdown>
                        </div>}
                        type={3}
                        WrapperClassName={index ? "border-b border-neutral-200" : "border-t border-b border-neutral-200"}
                    />
                )
            })}

        </section>
    )
}

export default Faq;