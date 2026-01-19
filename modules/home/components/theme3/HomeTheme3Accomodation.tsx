import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import Services from "./Services";
import AccomodationCategories from "./AccomodationCategories";
import AccomodationTopCities from "./AccomodationTopCities";
import AccommodationCategoryList from "./AccomodationVillage";
import AboutAccommodation from "./AboutAccommodation";
import FaqAccommodation from "./FaqAccommodation";
import { useEffect, useState } from "react";
import { ServerAddress, Accommodation } from "@/enum/url";
import { setCacheWithExpiry, getCacheWithExpiry } from "@/modules/accommodation/utils/cacheWithExpiry";

type SectionItem = {
    Keyword: "about-section" | "faq-section";
    Body?: string;
    Title?: string;
    Items?: {
        Answer?: string;
        Question?: string;
        id: number;
    }[]
}

type Props = {
    siteName: string;
    logo: string;
    blogs?: BlogItemType[];
    modules: ("domesticHotel" | "domesticFlight" | "cip" | "accommodation")[];
    sections?: SectionItem[];
}

const ITEMS_PER_CATEGORY = 10;

const HomeTheme3Accomodation: React.FC<Props> = props => {
    type Villa = {
        imageUrl: string;
        title: string;
        url: string;
        city: string;
        price: number | undefined;
        reviewCount: number | undefined;
        rank: number | undefined;
        id: number;
    };
    
    const [northVillas, setNorthVillas] = useState<Villa[]>([]);
    const [tehranVillas, setTehranVillas] = useState<Villa[]>([]);
    const [kordanVillas, setKordanVillas] = useState<Villa[]>([]);
    const [southVillas, setSouthVillas] = useState<Villa[]>([]);
    const [ecoVillas, setEcoVillas] = useState<Villa[]>([]);
    const [chalusVillas, setChalusVillas] = useState<Villa[]>([]);
    const [chalusLoading, setChalusLoading] = useState(false);

    const strapiAboutContent = props.sections?.find(item => item.Keyword === "about-section")?.Body;
    const strapiFAQ = props.sections?.find(item => item.Keyword === "faq-section")?.Items;

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formatDate = (date: Date) => date.toISOString().slice(0, 10);
        const checkin = formatDate(today);
        const checkout = formatDate(tomorrow);

        // شمال (مثلاً رشت)
        const cacheKeyNorth = `accommodation_nowshahr_${checkin}_${checkout}`;
        const cachedNorth = getCacheWithExpiry(cacheKeyNorth);

        if (cachedNorth) {
            setNorthVillas(cachedNorth);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["nowshahr"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || [];
                    const villas = convertItems(items, "nowshahr", checkin, checkout, 1);
                    setNorthVillas(villas);
                    setCacheWithExpiry(cacheKeyNorth, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setNorthVillas([]));
        }

        // تهران
        const cacheKeyTehran = `accommodation_tehran_${checkin}_${checkout}`;
        const cachedTehran = getCacheWithExpiry(cacheKeyTehran);

        if (cachedTehran) {
            setTehranVillas(cachedTehran);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["tehran"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || data.result || [];
                    const villas = convertItems(items, "tehran", checkin, checkout, 1);
                    setTehranVillas(villas);
                    setCacheWithExpiry(cacheKeyTehran, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setTehranVillas([]));
        }

        // کردان
        const cacheKeyKordan = `accommodation_kordan_${checkin}_${checkout}`;
        const cachedKordan = getCacheWithExpiry(cacheKeyKordan);

        if (cachedKordan) {
            setKordanVillas(cachedKordan);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IzR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["kordan"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || data.result || [];
                    const villas = convertItems(items, "kordan", checkin, checkout, 1);
                    setKordanVillas(villas);
                    setCacheWithExpiry(cacheKeyKordan, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setKordanVillas([]));
        }

        // جنوب (هرمزگان)
        const cacheKeySouth = `accommodation_hormozgan_${checkin}_${checkout}`;
        const cachedSouth = getCacheWithExpiry(cacheKeySouth);

        if (cachedSouth) {
            setSouthVillas(cachedSouth);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["hormozgan"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || data.result || [];
                    const villas = convertItems(items, "hormozgan", checkin, checkout, 1);
                    setSouthVillas(villas);
                    setCacheWithExpiry(cacheKeySouth, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setSouthVillas([]));
        }

        // بوم‌گردی (قشم)
        const cacheKeyEco = `accommodation_qeshm_${checkin}_${checkout}`;
        const cachedEco = getCacheWithExpiry(cacheKeyEco);

        if (cachedEco) {
            setEcoVillas(cachedEco);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["qeshm"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || data.result || [];
                    const villas = convertItems(items, "qeshm", checkin, checkout, 1);
                    setEcoVillas(villas);
                    setCacheWithExpiry(cacheKeyEco, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setEcoVillas([]));
        }

        // چالوس (اقامتگاه‌های خوش‌قیمت)
        setChalusLoading(true);
        const cacheKeyChalus = `accommodation_chalus_${checkin}_${checkout}`;
        const cachedChalus = getCacheWithExpiry(cacheKeyChalus);

        if (cachedChalus) {
            setChalusVillas(cachedChalus);
            setChalusLoading(false);
        } else {
            fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
                method: "POST",
                headers: Object.fromEntries(
                    Object.entries({
                        "Content-Type": "application/json",
                        apikey: process.env.PROJECT_SERVER_APIKEY,
                        tenantId: process.env.PROJECT_SERVER_TENANTID,
                        "accept-language": "fa-IR",
                    }).filter(([_, value]) => value !== undefined)
                ) as HeadersInit,
                body: JSON.stringify({
                    checkin,
                    checkout,
                    capacity: 1,
                    enitites: ["chalus"],
                    maxResultCount: ITEMS_PER_CATEGORY,
                    skipCount: 0,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const items = data.result.hotels || data.result || [];
                    const villas = convertItems(items, "chalus", checkin, checkout, 1);
                    setChalusVillas(villas);
                    setCacheWithExpiry(cacheKeyChalus, villas, 96); // 96 ساعت = 4 روز
                })
                .catch(() => setChalusVillas([]))
                .finally(() => setChalusLoading(false));
        }
    }, []);

    const convertItems = (items: any[], citySlug: string, checkin: string, checkout: string, capacity: number) =>
      items.map(item => ({
        imageUrl: item.coverPhoto?.thumbnailAbsoluteUrl || item.coverPhoto?.absoluteUrl || "/images/no-image.jpg",
        title: item.title,
        url: `/accommodations/${citySlug}/checkin-${checkin}/checkout-${checkout}/capacity-${capacity}`,
        city: item.location?.city || citySlug,
        price: item.salePrice || item.boardPrice || item.netPrice || item.discountPrice,
        reviewCount: item.reviews,
        rank: item.rank,
        id: item.id,
      }));

    return (
        <>
            <Banner
                modules={props.modules}
                bannerImage="/images/hotelban/hero.jpg"
                siteName={props.siteName}
                logo={props.logo}
            />

            <AccomodationCategories />
            
            <AccomodationTopCities />


            <AccommodationCategoryList
                title="ویلاهای شمال"
                categories={northVillas}
                citySlug="nowshahr"
            />
            <AccommodationCategoryList
                title="ویلاهای اطراف تهران"
                categories={kordanVillas}
                citySlug="kordan"
            />
            <AccommodationCategoryList
                title="اقامتگاه های تهران"
                categories={tehranVillas}
                citySlug="tehran"
            />
            
            <div className="offer-card-bg pb-8 my-16">
                <AccommodationCategoryList
                    title="اقامتگاه‌های خوش‌قیمت"
                    categories={chalusVillas}
                    citySlug="chalus"
                    titleColor="text-white"
                    loading={chalusLoading}
                />
            </div>

            <Services />
            
            <AccommodationCategoryList
                title="اقامتگاه های جنوب"
                categories={southVillas}
                citySlug="hormozgan"
            />
            
            <AccommodationCategoryList
                title="اقامتگاه های بوم گردی"
                categories={ecoVillas}
                citySlug="qeshm"
            />


            <section className="max-w-container m-auto border-4 sm:border-7 border-[#ece9f2] rounded-lg p-4 lg:p-8 mb-16 max-md:mx-4">
                <AboutAccommodation logo={props.logo} strapiContent={strapiAboutContent} />

                {strapiFAQ && <FaqAccommodation items={strapiFAQ.map(item => ({
                    key: item.id,
                    content: item.Answer,
                    title: item.Question
                }))} />}
            </section>
        </>
    )
}

export default HomeTheme3Accomodation;