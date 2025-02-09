import Link from "next/link";
import { Apartment, Bed4, Suitcase, Suitcase2, Travel, Travel2 } from "../../shared/components/ui/icons";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setProgressLoading } from "@/modules/shared/store/stylesSlice";

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

    const dispatch = useAppDispatch();

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    const [clicked, setClicked] = useState<boolean>(false);

    let icon = null;

    const iconClassName = theme3 ? "w-6 h-6 fill-neutral-400" : "w-6 h-6 fill-current";

    switch (props.type) {
        case "cip":
            icon = theme3 ? <Suitcase2 className={iconClassName} /> : <Suitcase className={iconClassName} />;
            break;
        case "flight":
            icon = theme3 ? <Travel2 className={iconClassName} /> : <Travel className={iconClassName} />;
            break;
        case "hotel":
            icon = theme3 ? <Bed4 className={iconClassName} /> : <Apartment className={iconClassName} />;
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

        details = <div>  {hasReturn ? "رفت و برگشت" : " یک طرفه"}  <span className="inline-block p-0.5 bg-current rounded-full mx-1" /> {travelers} {t("passenger")}</div>;
    }

    const removeLoading = () => { dispatch(setProgressLoading(false)) };

    let linkClassName = "";

    
    if (theme3) {
        linkClassName = `cursor-pointer flex items-center gap-3 leading-4 p-2 text-2xs border-2 border-white rounded-xl bg-white group transition-all 
        relative text-neutral-800 hover:border-[#fdab05]
        ${props.className || ""}`
    }

    if (theme1) {
        linkClassName = `cursor-pointer flex items-center gap-3 leading-4 p-3 text-2xs rounded-lg border border-neutral-300 group transition-all 
        relative
        ${clicked ? "bg-neutral-900 text-white overflow-hidden before:block before:absolute before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:w-full before:h-full before:right-0 before:top-0 before:animate-skeleton" : "text-neutral-800 hover:bg-neutral-900 hover:text-white"}
        ${props.className || ""}`
    }

    if (theme2) {
        linkClassName = `cursor-pointer flex items-center gap-4 leading-5 p-5 text-xs rounded-2xl border border-neutral-300 group transition-all 
        relative
        ${clicked ? "bg-neutral-100 overflow-hidden before:block before:absolute before:bg-gradient-to-r before:from-transparent before:via-white/85 before:to-transparent before:w-full before:h-full before:right-0 before:top-0 before:animate-skeleton" : "text-neutral-800"}
        ${props.className || ""}`
    }

    return (
        <Link
            onClick={() => {
                setClicked(true);
                dispatch(setProgressLoading(true));
                setTimeout(removeLoading, 4000);
            }}
            href={props.model.url}
            className={linkClassName}
            target="_blank"
        >
            {icon}

            <div className="flex flex-col gap-2">
                <div className={`${theme3?"":"font-bold"} ${theme2?"text-sm":"text-xs"}`}>
                    {props.model.title}
                </div>

                {!!props.model.subtitle && <div className={theme3?"text-neutral-400":""}>
                    {props.model.subtitle}
                </div>}

                {details}
            </div>

        </Link>
    )
}

export default RecentSearchItem;