import Link from "next/link";
import { Apartment, Suitcase, Travel } from "../../shared/components/ui/icons";
import { useTranslation } from "next-i18next";

type Props = {
    model: {
        title: React.ReactNode;
        subtitle: string;
        url: string;
    };
    className?: string;
    type: "cip" | "hotel" | "flight"
}

const RecentSearchItem: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    let icon = null;

    const iconClassName = "w-6 h-6 fill-current";

    switch (props.type) {
        case "cip":
            icon = <Suitcase className={iconClassName} />;
            break;
        case "flight":
            icon = <Travel className={iconClassName} />;
            break;
        case "hotel":
            icon = <Apartment className={iconClassName} />;
            break;
        default:
            icon = null;
    }

    let details: React.ReactNode = "";
    if (props.type === "flight") {

        const hasReturn = props.model.url.includes("returning");
        const adults = +props.model.url?.split("adult=")[1]?.split("&")[0] || 0;
        const children = +props.model.url?.split("child=")[1]?.split("&")[0] || 0;
        const infants = +props.model.url?.split("infant=")[1]?.split("&")[0] || 0;
        const travelers = adults + children + infants;

        details = <div>  {hasReturn? "رفت و برگشت":" یک طرفه"}  <span className="inline-block p-0.5 bg-current rounded-full mx-1" /> {travelers} {t("passenger")}</div>;
    }

    return (
        <Link
            href={props.model.url}
            className={`cursor-pointer flex items-center gap-3 leading-4 p-3 text-2xs rounded-lg text-neutral-800 border border-neutral-300 group hover:bg-neutral-900 hover:text-white transition-all ${props.className || ""}`}
        >
            {icon}

            <div className="flex flex-col gap-2">
                <div className="font-bold text-xs">
                    {props.model.title}
                </div>

                {props.model.subtitle || ""}

                {details}
            </div>

        </Link>
    )
}

export default RecentSearchItem;