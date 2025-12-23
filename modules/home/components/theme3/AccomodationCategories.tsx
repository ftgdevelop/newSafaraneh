import Image from "next/image";
import Link from "next/link";

const AccomodationCategories: React.FC = () => {

    const categories: {
        imageUrl: string;
        title: string;
        url: string;
    }[] = [
            {
                title: "اجاره ویلا",
                url: "/accommodations?category=Villa",
                imageUrl: "/images/home/theme3/accomodation/categories/village.svg",
            },
            {
                title: "رزرو بومگردی",
                url: "/accommodations?category=Boomgardi",
                imageUrl: "/images/home/theme3/accomodation/categories/bomigardi.svg",
            },
            {
                title: "اجاره کلبه",
                url: "/accommodations?category=Cottage",
                imageUrl: "/images/home/theme3/accomodation/categories/kolbeh.svg",
            },
            {
                title: "اجاره آپارتمان مبله",
                url: "/accommodations?category=Apartment",
                imageUrl: "/images/home/theme3/accomodation/categories/apartment.svg",
            },
            {
                title: "دل جنگل",
                url: "/accommodations?category=Forest",
                imageUrl: "/images/home/theme3/accomodation/categories/foresthouse.svg",
            },
            {
                title: "کلبه سوئیسی",
                url: "/accommodations?category=SwissCottage",
                imageUrl: "/images/home/theme3/accomodation/categories/swiss-cottage.svg",
            },
            {
                title: "خاص و لوکس",
                url: "/accommodations?category=Omg",
                imageUrl: "/images/home/theme3/accomodation/categories/omg.svg",
            },
            {
                title: "حیوان خانگی",
                url: "/accommodations?ruleType=PetsAllowed",
                imageUrl: "/images/home/theme3/accomodation/categories/pet.svg",
            },
        ]

    return (
        <section className="max-w-container m-auto lg:pt-10 mb-5 sm:mb-10 px-3 md:px-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-0.5 sm:gap-1 xl:gap-2 bg-[#ece9f2] p-1 sm:p-2 rounded-lg">
                {categories.map(category => {
                    let url = category.url;

                    if (process.env.LocaleInUrl === "off") {
                        url = url.replace("fa/", "");
                    }
                    return (
                        <div>
                            <Link
                                href={url}
                                target='_blank'
                                title={category.title}
                                className="flex flex-col items-center justify-center px-2 xl:px-4 py-2 md:py-3 group bg-white hover:bg-[#ffffff]/70 transition-all duration-300 border border-[#ece9f2]/50 rounded-lg"
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={category.imageUrl}
                                    alt={category.title}
                                    width={42}
                                    height={42}
                                    className="size-[32px] md:size-[42px]"
                                />
                                <b className='font-bold mt-1 sm:mt-2 block text-2xs md:text-xs'> {category.title} </b>
                            </Link>
                        </div>
                    )
                }
            )}
            </div>

        </section>
    )
}

export default AccomodationCategories;