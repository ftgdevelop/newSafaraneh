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
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/village.gif",
            },
            {
                title: "رزرو بومگردی",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/bomigardi.gif",
            },
            {
                title: "اجاره کلبه",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/kolbeh.gif",
            },
            {
                title: "اجاره آپارتمان مبله",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/apartment.gif",
            },
            {
                title: "دل جنگل",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/foresthouse.gif",
            },
            {
                title: "لب آب",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/beachhouse.gif",
            },
            {
                title: "منظره رویایی",
                url: "/#",
                imageUrl: "/images/home/theme3/accomodation/categories/luxuryhouse.gif",
            },
        ]

    return (
        <section className="max-w-container m-auto px-5 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
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
                                className="flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 group bg-[#ece9f2]/30 rounded-lg hover:bg-[#ece9f2] transition-all duration-300"
                            >
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={category.imageUrl}
                                    alt={category.title}
                                    width={72}
                                    height={72}
                                    className="size-[64px] md:size-[72px] rounded-full"
                                />
                                <b className='font-bold mt-2 mb-1 block text-sm md:text-md'> {category.title} </b>
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