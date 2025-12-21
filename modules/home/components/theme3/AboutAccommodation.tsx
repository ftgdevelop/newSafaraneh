import { useState } from "react";
import { replaceBrandNames } from "@/modules/shared/helpers";
import Image from "next/image";
import Markdown from "react-markdown";
import { DownCaret, UpCaret } from "@/modules/shared/components/ui/icons";

type Props = {
    logo?: string;
    strapiContent?: string;
    siteName?: string;
}

const MAX_LENGTH = 400; // تعداد کاراکتر برای نمایش اولیه

const AboutAccommodation: React.FC<Props> = props => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(prev => !prev);

    const renderedMarkdown = replaceBrandNames(props.strapiContent || "");
    const isLong = renderedMarkdown.length > MAX_LENGTH;
    const shortText = renderedMarkdown.slice(0, MAX_LENGTH);

    return (
        <div className="flex gap-8 flex-col md:flex-row">
            {props.logo && <Image
                src={props.logo}
                alt="هتل بان"
                width={157}
                height={48}
                className="h-12 mb-3 lg:mb-6"
            />}

            {props.strapiContent && (
                <div className="inserted-content hotelban-strapi-about">
                    <Markdown>
                        {isExpanded || !isLong ? renderedMarkdown : shortText + "..."}
                    </Markdown>
                    {isLong && (
                        <button
                            onClick={toggleExpand}
                            className="flex items-center gap-1 text-blue-500 text-sm mt-4 focus:outline-none bg-blue-50 px-3 py-1 rounded-full"
                        >
                            {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                            {isExpanded ? (
                                <UpCaret className="w-4 h-4 fill-blue-500" />
                            ) : (
                                <DownCaret className="w-4 h-4 fill-blue-500" />
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default AboutAccommodation;