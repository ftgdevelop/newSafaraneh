import { useEffect, useState } from "react";
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { i18n } from "next-i18next";
import { FlightRecentSearchItem } from "../../types/flights";
import { ArrowRight, Swap } from "@/modules/shared/components/ui/icons";
import RecentSearches from "@/modules/home/components/RecentSearches";

const FlightRecentSearches: React.FC = () => {

    const [items, setItems] = useState<FlightRecentSearchItem[]>([]);
    useEffect(() => {
        const localStorageRecentSearches = localStorage?.getItem("flightRecentSearches");

        if (localStorageRecentSearches) {
            setItems(JSON.parse(localStorageRecentSearches))
        }

    }, []);

    return <RecentSearches
        items={items.map(item => (
            {
                url: item.url,
                subtitle: item.returnDate ?
                    dateDiplayFormat({ date: item.departureDate, format: "dd mm", locale: i18n?.language }) + " - " + dateDiplayFormat({ date: item.returnDate, format: "dd mm", locale: i18n?.language })
                    :
                    dateDiplayFormat({ date: item.departureDate, format: "ddd dd mm", locale: i18n?.language }),
                title: (<div>
                    {item.origin}
                    {item.returnDate ? (
                        <Swap className='w-4 h-4 fill-current mx-1.5 inline-block rtl:mirror' />
                    ) : (
                        <ArrowRight className='w-3.5 h-3.5 fill-current mx-1.5 inline-block rtl:mirror' />
                    )}
                    {item.destination}
                </div>)
            }
        ))}
        clearItems={() => { localStorage.removeItem("flightRecentSearches"); setItems([]); }}
        type="flight"
    />

}

export default FlightRecentSearches;