import { ArrowRight } from "@/modules/shared/components/ui/icons";
import Link from "next/link"

type Props = {
    cityName?: string;
    url: string;
}

const BackToList: React.FC<Props> = props => {

    const { url, cityName} = props;

    return (
        <Link prefetch={false} href={url} className={`text-blue-700 text-sm flex gap-2 items-center`}>
            <ArrowRight className="ltr:rotate-180 w-5 h-5 fill-current" /> مشاهده اقامتگاه های تهران
        </Link>
    )
}

export default BackToList;