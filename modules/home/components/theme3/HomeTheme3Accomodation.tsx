import { BlogItemType } from "@/modules/blogs/types/blog";
import Banner from "../banner";
import Services from "./Services";
import Faq from "./Faq";
import AccomodationCategories from "./AccomodationCategories";
import AccomodationTopCities from "./AccomodationTopCities";
import AccommodationCategoryList from "./AccomodationVillage";
import About from "./About";

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

const northVillas = [
    {
        title: "اجاره آپارتمان دوخوابه مهر واحد 1 شهران",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/villa-rental.avif",
    },
    {
        title: "اجاره آپارتمان یک خوابه انوشیروان 1 پونک",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/cottage-rental.avif",
    },
    {
        title: "اجاره آپارتمان دوخوابه مدرس سعادت آباد",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/villa-rental.avif",
    },
    {
        title: "اجاره آپارتمان دوخوابه مهر واحد 2 شهران",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/cottage-rental.avif",
    },
    {
        title: "اجاره آپارتمان دوخوابه مهر واحد 1 شهران",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/villa-rental.avif",
    },
    {
        title: "اجاره آپارتمان یک خوابه انوشیروان 1 پونک",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/cottage-rental.avif",
    },
    {
        title: "اجاره آپارتمان دوخوابه مدرس سعادت آباد",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/villa-rental.avif",
    },
    {
        title: "اجاره آپارتمان دوخوابه مهر واحد 2 شهران",
        url: "/#",
        imageUrl: "/images/home/theme3/accomodation-categories/cottage-rental.avif",
    },
];

const HomeTheme3Accomodation: React.FC<Props> = props => {

    const strapiAboutContent = props.sections?.find(item => item.Keyword === "about-section")?.Body;
    const strapiFAQ = props.sections?.find(item => item.Keyword === "faq-section")?.Items;

    return (
        <>
            <Banner
                modules={props.modules}
                bannerImage="/images/hotelban/hero.jpg"
                siteName={props.siteName}
                logo={props.logo}
            />

            <AccomodationTopCities />

            <AccomodationCategories />

            <AccommodationCategoryList title="ویلاهای شمال" categories={northVillas} />
            <AccommodationCategoryList title="ویلاهای اطراف تهران" categories={northVillas} />
            <AccommodationCategoryList title="اقامتگاه های تهران" categories={northVillas} />

            <div className="bg-[#ece9f2] pb-8 my-16">
                <AccommodationCategoryList title="اقامتگاه‌های خوش‌قیمت" categories={northVillas} />
            </div>
            <Services />
            <AccommodationCategoryList title="اقامتگاه های جنوب" categories={northVillas} />
            <AccommodationCategoryList title="اقامتگاه های بوم گردی" categories={northVillas} />

            <About logo={props.logo} strapiContent={strapiAboutContent} />

            {strapiFAQ && <Faq items={strapiFAQ.map(item => ({
                key: item.id,
                content: item.Answer,
                title: item.Question
            }))} />}
        </>
    )
}

export default HomeTheme3Accomodation;