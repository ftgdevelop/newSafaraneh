import RecentSearchItem from "@/modules/shared/components/RecentSearchItem";
import { useEffect, useState } from "react";
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { i18n } from "next-i18next";
import { FlightRecentSearchItem } from "../../types/flights";
import { ArrowRight, Swap } from "@/modules/shared/components/ui/icons";

const FlightRecentSearches: React.FC = () => {

    const [items, setItems] = useState<FlightRecentSearchItem[]>([]);
    useEffect(() => {
        const localStorageRecentSearches = localStorage?.getItem("flightRecentSearches");

        if (localStorageRecentSearches) {
            setItems(JSON.parse(localStorageRecentSearches))
        }

    }, []);

    if (!items.length) {
        return null
    }

    const slicedItems = items.slice(0, 6);

    return (
        <>
            <div className="flex gap-2 mb-4 my-3">

                <strong className="font-semibold text-md"> جستجوهای اخیر </strong>
                {/* <span className="text-xs"> ({items.length}) </span> */}
                <button
                    type="button"
                    className="text-red-500 ountline-none text-xs"
                    onClick={() => { localStorage.removeItem("flightRecentSearches"); setItems([]); }}
                >
                    حذف
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pb-3">
                {slicedItems.map((item, index) => <RecentSearchItem
                    key={index}
                    model={{
                        url: item.url,
                        subtitle: item.returnDate ?
                            dateDiplayFormat({ date: item.departureDate, format: "dd mm", locale: i18n?.language }) + " - " + dateDiplayFormat({ date: item.returnDate, format: "dd mm", locale: i18n?.language })
                            :
                            dateDiplayFormat({ date: item.departureDate, format: "dd mm", locale: i18n?.language }),
                        title: (<div>
                            {item.origin}
                            {item.returnDate ? (
                                <Swap className='w-4 h-4 fill-current mx-1.5 inline-block rtl:mirror' />
                            ) : (
                                <ArrowRight className='w-3.5 h-3.5 fill-current mx-1.5 inline-block rtl:mirror' />
                            )}
                            {item.destination}
                        </div>)
                    }}
                />)}
            </div>

        </>
    )
}

export default FlightRecentSearches;