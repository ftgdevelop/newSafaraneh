import Image from "next/image";
import parse from 'html-react-parser';
import Link from "next/link";
import { LeftCaret } from "@/modules/shared/components/ui/icons";

type Props = {
    imageAlt: string;
    imageUrl: string;
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: {
        label: string;
        link: string;
    }[];
}

const Intro: React.FC<Props> = props => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 mb-6 lg:mb-14">
            <Image
                src={props.imageUrl}
                alt="بلاگ"
                width={750}
                height={750}
                className="w-full h-550 block object-cover"
                onContextMenu={e => e.preventDefault()}
            />

            <div className="md:max-w-half-container p-8 lg:p-14 gap-2 flex flex-col justify-between">

                <div className="flex gap-2">
                    {props.tags.map(tag => (
                        <Link
                            href={tag.link}
                            key={tag.label}
                            className="bg-gray-800 text-white text-2xs block px-3 py-1 leading-4 rounded-full"
                        >
                            {tag.label}
                        </Link>
                    ))}
                </div>

                <div>
                    <h2 className="text-xl md:text-4xl xl:text-6xl leading-tight mb-1" >
                        {props.title}
                    </h2>

                    <div className="text-2xs">
                        {props.date}
                    </div>
                </div>

                <div className="text-sm text-justify">
                    {parse(props.description)}
                </div>

                <Link
                    prefetch={false}
                    href={`blog/${props.slug}`}
                    className="text-2xs"
                >
                    مشاهده ادامه
                    <LeftCaret className="w-5 h-5 inline-block" />
                </Link>

            </div>
        </div>
    )
}

export default Intro;