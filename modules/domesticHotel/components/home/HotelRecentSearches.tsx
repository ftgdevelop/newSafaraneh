import { HotelRecentSearchItem } from "../../types/hotel";
import { useEffect, useState } from "react";
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { i18n, useTranslation } from "next-i18next";
import RecentSearches from "@/modules/home/components/RecentSearches";

const HotelRecentSearches: React.FC = () => {

    const { t } = useTranslation('common');

    const [items, setItems] = useState<HotelRecentSearchItem[]>([]);
    useEffect(() => {
        const localStorageRecentSearches = localStorage?.getItem("hotelRecentSearches");

        if (localStorageRecentSearches) {
            setItems(JSON.parse(localStorageRecentSearches))
        }

    }, []);

    if (!items.length) {
        return null
    }

    const theme1 = process.env.THEME === "THEME1";
    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    const transformedItems: {
        title: string;
        subtitle: string;
        url: string;
    }[] = items.map(item => {
        
        let subtitle = "";

        if(theme1 || theme3){
            const checkinDay = dateDiplayFormat({ date: item.dates[0], format: "d", locale: i18n?.language });
            const checkoutMonth = dateDiplayFormat({ date: item.dates[1], format: "m", locale: i18n?.language });
            const checkoutDay = dateDiplayFormat({ date: item.dates[1], format: "d", locale: i18n?.language });
            const checkinMonth = dateDiplayFormat({ date: item.dates[0], format: "m", locale: i18n?.language });

            if (checkinMonth === checkoutMonth) {
                subtitle = t("checkinTillCheckout", { checkinDay: checkinDay, checkoutDay: checkoutDay, month: checkinMonth });
            } else {
                subtitle = `${checkinDay} ${checkinMonth} تا ${checkoutDay} ${checkoutMonth}`;
            }
        }
        
        if(theme2){
            const checkin = dateDiplayFormat({ date: item.dates[0], format: "ddd dd mm", locale: i18n?.language });
            const checkout = dateDiplayFormat({ date: item.dates[1], format: "ddd dd mm", locale: i18n?.language });

            subtitle = checkin + " - " + checkout;
        }

        return ({
            title: item.title,
            subtitle: subtitle,
            url: item.url
        })
    })

    return (
        <RecentSearches
            items={transformedItems}
            type="hotel"
            clearItems={() => { localStorage.removeItem("hotelRecentSearches"); setItems([]); }}
        />
    )

}

export default HotelRecentSearches;