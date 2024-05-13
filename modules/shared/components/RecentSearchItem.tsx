import Link from "next/link";
import { Calendar } from "./ui/icons";

type Props = {
    model: {
        title: React.ReactNode;
        subtitle: string;
        url: string;
    };
    className?: string;
}

const RecentSearchItem: React.FC<Props> = props => {
    return (
        <Link
            href={props.model.url}
            className={`cursor-pointer block p-3 leading-6 rounded-lg text-xs text-neutral-800 border border-dashed border-current group hover:bg-primary-700 hover:text-white transition-all ${props.className || ""}`}
        >
            <div className="leading-5">
                {props.model.title}
            </div>

            {!!props.model.subtitle && <div className="text-neutral-500 group-hover:text-white transition-all text-2xs mt-1">
                <Calendar className="w-3.5 h-3.5 inline-block fill-current rtl:ml-1 ltr:mr-1" />
                {props.model.subtitle}
            </div>}
        </Link>
    )
}

export default RecentSearchItem;