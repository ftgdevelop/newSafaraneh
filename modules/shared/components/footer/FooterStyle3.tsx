import Link from "next/link";

import Image from "next/image";
import dynamic from "next/dynamic";
import { FooterStrapi } from "../../types/common";
import { toPersianDigits } from "../../helpers";
import { Email2, Phone2 } from "../ui/icons";

const GoToTop = dynamic(() => import('./GoToTop'), {
    ssr: false
});

type Props = {
    logo: string;
    email?: string;
    supportNumber?: string;
    siteName: string;
    enamad?: any;
    samandehi?: string;
    footerStrapi?: FooterStrapi;
}

const FooterStyle3: React.FC<Props> = props => {

    const hotels: {
        title: string;
        url: string;
    }[] = [
            { title: "هتل پارک وی تهران", url: "/hotel/هتل-پارک-وی-تهران" },
            { title: "هتل پارسیان استقلال تهران", url: "/hotel/هتل-پارسیان-استقلال-تهران" },
            { title: "هتل پارسیان آزادی", url: "/hotel/هتل-پارسیان-آزادی-تهران" },
            { title: "هتل اطلس مشهد", url: "/hotel/هتل-اطلس-مشهد" },
            { title: "هتل تارا مشهد", url: "/hotel/هتل-تارا-مشهد" },
            { title: "هتل اسپیناس بلوار تهران", url: "/hotel/هتل-اسپیناس-بلوار-تهران" }
        ];

    const cities: {
        title: string;
        url: string;
    }[] = [
            { title: "هتل های تهران", url: "/hotels/هتل-های-تهران" },
            { title: "هتل های اصفهان", url: "/hotels/هتل-های-اصفهان" },
            { title: "هتل های مشهد", url: "/hotels/هتل-های-مشهد" },
            { title: "هتل های شیراز", url: "/hotels/هتل-های-شیراز" },
            { title: "هتل های کیش", url: "/hotels/هتل-های-جزیره-کیش" },
            { title: "هتل های تبریز", url: "/hotels/هتل-های-تبریز" },
            { title: "هتل های قشم", url: "/hotels/هتل-های-جزیره-قشم" }
        ];

    const links: {
        title: string;
        url: string;
    }[] = [
            { title: "تماس با ما", url: "/contact" },
            { title: "درباره ما", url: "/about" },
            { title: "سوالات متداول", url: "/faq" },
            { title: "قوانین و مقررات", url: "/terms" },
            { title: "حفظ حریم خصوصی", url: "/privacy" }
        ];

    return (
        <>
            <footer className="border-t-2">

                <div className="max-w-container mx-auto p-3 text-neutral-700 pt-8 pb-14">

                    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-6">

                        <div className="sm:col-span-3 lg:col-span-2 lg:pl-10 mb-5">

                            {props.logo && <Link href="/"><Image
                                src={props.logo}
                                alt="هتل بان"
                                width={157}
                                height={48}
                                className="w-auto h-12 mb-6"
                            /></Link>}

                            {props.supportNumber && (
                                <div className="flex justify-between mb-2 max-w-64">
                                    <label className="text-sm" > <Phone2 className="w-5 h-5 fill-none stroke-black inline-block ml-1" /> شماره پشتیبانی </label>
                                    <span dir="ltr" className="text-sm">
                                        {toPersianDigits(props.supportNumber)}
                                    </span>
                                </div>
                            )}

                            {props.email && (
                                <div className="flex justify-between max-w-64">
                                    <label className="text-sm" > <Email2 className="w-5 h-5 fill-none stroke-black inline-block ml-1" /> ایمیل </label>
                                    <span dir="ltr" className="text-sm font-sans">
                                        {props.email}
                                    </span>
                                </div>
                            )}

                        </div>

                        <div>
                            <h5 className="text-sm mb-3 font-semibold flex items-center gap-2"> <span className="inline-block bg-[#ff684b] w-3 h-3 rounded-full" /> هتل های پیشنهادی</h5>
                            {hotels.map(item => (
                                <Link
                                    href={item.url}
                                    key={item.title}
                                    className="block mb-1 text-xs mr-5"
                                    target="_blank"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        <div>
                            <h5 className="text-sm mb-3 font-semibold flex items-center gap-2"> <span className="inline-block bg-[#ff684b] w-3 h-3 rounded-full" /> شهرهای محبوب</h5>
                            {cities.map(item => (
                                <Link
                                    href={item.url}
                                    key={item.title}
                                    className="block mb-1 text-xs  mr-5"
                                    target="_blank"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        <div>
                            <h5 className="text-sm mb-3 font-semibold flex items-center gap-2"> <span className="inline-block bg-[#ff684b] w-3 h-3 rounded-full" /> لینک های مهم </h5>
                            {links.map(item => (
                                <Link
                                    href={item.url}
                                    key={item.title}
                                    className="block mb-1 text-xs  mr-5"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        {/* <div className="sm:col-span-3 lg:col-span-1">
                            <h5 className="hidden lg:flex items-center gap-2 text-sm mb-3 font-semibold"> <span className="inline-block bg-[#ff684b] w-3 h-3 rounded-full" /> نمادها </h5>

                            <div className="flex justify-center gap-4">

                                {!!props.enamad && (
                                    <a className="footer-enamad" referrerPolicy="origin" target="_blank" href={props.enamad}>
                                        <Image
                                            referrerPolicy="origin"
                                            src={"/images/enamad.png"}
                                            alt="enamad"
                                            width={75}
                                            height={75}
                                            className="object-contain"
                                        />
                                    </a>
                                )}

                                <img
                                    referrerPolicy='origin'
                                    id='rgvjjzpefukzapfuesgtsizp'
                                    onClick={() => {
                                        window.open("https://logo.samandehi.ir/Verify.aspx?id=376509&p=xlaojyoegvkadshwobpdpfvl", "Popup", "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")
                                    }}
                                    alt='logo-samandehi'
                                    //src='https://logo.samandehi.ir/logo.aspx?id=376509&p=qftiyndtwlbqujynlymabsiy'
                                    src="/images/footer/resaneh.png"
                                />

                            </div>
                        </div> */}

                    </div>

                </div>

                <p className="text-center text-2xs border-t p-7">
                    {/* © 1403 - تمام حقوق مربوط به وب سایت {props.siteName || "هتل بان"} می باشد. */}
                    © 1404 - تمام حقوق مربوط به وب سایت جستجو گشت رامان می باشد.
                </p>

            </footer>

            <GoToTop />
        </>
    )
}

export default FooterStyle3