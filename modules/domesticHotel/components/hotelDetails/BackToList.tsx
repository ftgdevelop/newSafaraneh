import { ArrowRight } from "@/modules/shared/components/ui/icons";
import { i18n } from "next-i18next";
import { useTranslation } from 'next-i18next';
import Link from "next/link"

type Props = {
    checkin?: string;
    checkout?: string;
    cityName?: string;
    cityId?: number;
}

const BackToList: React.FC<Props> = props => {

    const theme2 = process.env.THEME === "THEME2";

    const { checkin, checkout, cityName } = props;

    const { t : tHotel } = useTranslation('hotel');

    let listUrl;

    if (i18n?.language === "fa" && process.env.LocaleInUrl !== "off") {
        listUrl = `/fa/hotels/هتل-های-${cityName}`;
    } else if (i18n?.language === "ar") {
        listUrl = `/hotels/فنادق-${props.cityName}`;
    } else {
        listUrl = `/hotels/هتل-های-${props.cityName}`;
    }

    if (checkin && checkout) {
        listUrl += `/checkin-${checkin}/checkout-${checkout}`;
    }

    return (
        <Link href={listUrl} className={`text-blue-700 text-sm flex gap-2 items-center ${theme2?"shadow-normal rounded-full hover:bg-blue-100 w-8 h-8 items-center justify-center":""}`}>
            <ArrowRight className="ltr:rotate-180 w-5 h-5 fill-current" /> {!theme2 && tHotel('seeHotelsIn', { city: cityName })}
        </Link>
    )
}

export default BackToList;