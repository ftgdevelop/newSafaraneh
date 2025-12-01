import { useEffect, useState } from "react";
import { i18n } from "next-i18next";
import { CipRecentSearchItem } from "../../types/cip";
import RecentSearches from "@/modules/home/components/RecentSearches";
import { dateDisplayFormat } from "@/modules/shared/helpers";

const toSupportedLocale = (lang?: string): "fa" | "en" | undefined =>
  lang === "fa" || lang === "en" ? lang : undefined;

const CipRecentSearches: React.FC = () => {
  const [items, setItems] = useState<CipRecentSearchItem[]>([]);

  useEffect(() => {
    const localStorageRecentSearches = localStorage?.getItem("cipRecentSearches");
    if (localStorageRecentSearches) {
      setItems(JSON.parse(localStorageRecentSearches));
    }
  }, []);

  if (!items.length) {
    return null;
  }

  const theme1 = process.env.THEME === "THEME1";
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";

  const locale = toSupportedLocale(i18n?.language);

  const slicedItems = items.map(item => ({
    title: item.airportName,
    subtitle:
      theme1
        ? dateDisplayFormat({
            date: item.flightDate,
            format: "dd mm",
            locale,
          })
        : (theme2 || theme3)
        ? dateDisplayFormat({
            date: item.flightDate,
            format: "ddd dd mm",
            locale,
          })
        : "",
    url: item.url,
  }));

  return (
    <RecentSearches
      items={slicedItems}
      clearItems={() => {
        localStorage.removeItem("cipRecentSearches");
        setItems([]);
      }}
      type="cip"
    />
  );
};

export default CipRecentSearches;