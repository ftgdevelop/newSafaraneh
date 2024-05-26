import RecentSearchItem from "@/modules/home/components/RecentSearchItem";
import { useEffect, useState } from "react";
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { i18n } from "next-i18next";
import { CipRecentSearchItem } from "../../types/cip";

const CipRecentSearches: React.FC = () => {

    const [items, setItems] = useState<CipRecentSearchItem[]>([]);
    useEffect(() => {
        const localStorageRecentSearches = localStorage?.getItem("cipRecentSearches");

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
    }[] = items.slice(0, 5).map(item => {

        return ({
            title: item.airportName,
            subtitle: dateDiplayFormat({ date: item.flightDate, format: "dd mm", locale: i18n?.language }),
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
                    onClick={() => { localStorage.removeItem("cipRecentSearches"); setItems([]); }}
                >
                    حذف
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pb-3">
                {slicedItems.map((item, index) => <RecentSearchItem
                    key={index}
                    model={item}
                    type="cip"
                />)}
            </div>

        </>
    )
}

export default CipRecentSearches;