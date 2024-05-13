import RecentSearchItem from "@/modules/shared/components/RecentSearchItem";
import { HotelRecentSearchItem } from "../../types/hotel";
import { useEffect, useState } from "react";
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { i18n, useTranslation } from "next-i18next";

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

    const slicedItems: {
        title: string;
        subtitle: string;
        url: string;
    }[] = items.slice(0, 6).map(item => {

        const checkinDay = dateDiplayFormat({ date: item.dates[0], format: "d", locale: i18n?.language });
        const checkoutMonth = dateDiplayFormat({ date: item.dates[1], format: "m", locale: i18n?.language });
        const checkoutDay = dateDiplayFormat({ date: item.dates[1], format: "d", locale: i18n?.language });
        const checkinMonth = dateDiplayFormat({ date: item.dates[0], format: "m", locale: i18n?.language });

        let subtitle: string;

        if (checkinMonth === checkoutMonth) {
            subtitle = t("checkinTillCheckout", { checkinDay: checkinDay, checkoutDay: checkoutDay, month: checkinMonth });
        } else {
            subtitle = `${checkinDay} ${checkinMonth} تا ${checkoutDay} ${checkoutMonth}`;
        }

        return ({
            title: item.title,
            subtitle: subtitle,
            url: item.url
        })
    })

    return (
        <>
            <div className="flex gap-2 mb-4 my-3">

                <strong className="font-semibold text-md"> جستجوهای اخیر </strong>
                {/* <span className="text-xs"> ({items.length}) </span> */}
                <button
                    type="button"
                    className="text-red-500 ountline-none text-xs"
                    onClick={() => { localStorage.removeItem("hotelRecentSearches"); setItems([]); }}
                >
                    حذف
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pb-3">
                {slicedItems.map((item, index) => <RecentSearchItem
                    key={index}
                    model={item}
                />)}
            </div>

        </>
    )
}

export default HotelRecentSearches;