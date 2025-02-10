import Rating from "@/modules/shared/components/ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Promotions: React.FC = () => {

    const largeItems: {
        imageUrl: string;
        title: string;
        subtitle: ReactNode;
        icon: string;
        url: string;
        overlayColor?: "blue" | "violet";
    }[] = [
            {
                url: "/hotel/هتل-اسپیناس-پالاس-تهران",
                imageUrl: "/images/home/theme3/promotions/espinas.jpg",
                icon: "/images/home/theme3/promotions/espinas-logo.png",
                title: " هتل اسپیناس پالاس تهران ",
                subtitle: <div className="flex gap-2 text-xs lg:text-sm items-center">
                    <Image src="/images/hotelban/off.svg" alt="offer" width={32} height={32} className="w-6 h-6 lg:w-8 lg:h-8" />
                    تخفیف ویژه
                </div>,
                overlayColor: "blue"
            },
            {
                url: "/hotel/هتل-اطلس-مشهد",
                imageUrl: "/images/home/theme3/promotions/atlas.png",
                icon: "/images/home/theme3/promotions/atlas-logo.png",
                title: "هتل اطلس مشهد",
                subtitle: <div className="flex gap-2 text-xs lg:text-sm items-center">
                    <Rating number={3} />
                    ۳ ستاره
                </div>,
                overlayColor: "violet"
            },
        ];

    const smallItems: {
        imageUrl: string;
        title: string;
        subtitle: ReactNode;
        url: string;
    }[] = [
            {
                url: "/hotel/هتل-پارک-وی-تهران",
                title: "هتل پارک وی تهران",
                imageUrl: "/images/home/theme3/promotions/parkwey.jpg",
                subtitle: <div className="flex gap-2 text-xs lg:text-sm items-center">
                    <Rating number={3} />
                    ۳ ستاره
                </div>
            },
            {
                url: "/hotel/هتل-داد-یزد",
                title: "هتل داد یزد",
                imageUrl: "/images/home/theme3/promotions/dad.jpg",
                subtitle: <div className="flex gap-2 text-xs lg:text-sm items-center">
                    <Rating number={4} />
                    ۴ ستاره
                </div>
            },
            {
                url: "/hotel/هتل-پارسیان-کوثر-اصفهان",
                title: "هتل پارسیان کوثر اصفهان",
                imageUrl: "/images/home/theme3/promotions/parsian-kosar.jpg",
                subtitle: <div className="flex gap-2 text-xs lg:text-sm items-center">
                    <Rating number={4} />
                    ۴ ستاره
                </div>
            }
        ]

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-16" >

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-2 h-10">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    پیشنهادات ویژه
                </span>
            </h2>
            <p className="mb-8 pr-6"> فرصتی عالی برای دسترسی به تخفیف‌ها و خدمات منحصر به فرد </p>


            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">

                {largeItems.map(item => {

                    let overlayColorClass = "";
                    if (item.overlayColor) {
                        if (item.overlayColor === "blue") {
                            overlayColorClass = "from-[#002e69] bg-gradient-to-l to-transparent";
                        }
                        if (item.overlayColor === "violet") {
                            overlayColorClass = "from-[#625783] bg-gradient-to-l to-transparent";
                        }
                    }
                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            target="_blank"
                            className="block sm:col-span-3 relative rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={580}
                                height={300}
                                className="w-full h-48 lg:h-72 object-cover"
                            />
                            <div className={`absolute top-0 right-0 bottom-0 w-2/3 flex flex-col justify-between text-white p-3 lg:p-5 lg:pt-10 ${overlayColorClass}`} >
                                <div>
                                    <h2 className="lg:text-lg mb-2"> {item.title} </h2>
                                    {item.subtitle}
                                </div>

                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={100}
                                    height={64}
                                    className="bg-white rounded-lg w-16 h-auto"
                                />
                            </div>
                        </Link>
                    )
                })}

                {smallItems.map(item => (
                    <Link
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        className="block sm:col-span-2 relative rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={580}
                            height={300}
                            className="w-full h-48 lg:h-72 object-cover"
                        />
                        <div className={`absolute right-0 bottom-0 w-full text-white p-3 lg:p-4 pt-10 from-black/75 bg-gradient-to-t to-transparent`} >
                            <h2 className="lg:text-lg mb-1"> {item.title} </h2>
                            {item.subtitle}

                        </div>
                    </Link>
                ))}

            </div>

        </section>
    )
}

export default Promotions;