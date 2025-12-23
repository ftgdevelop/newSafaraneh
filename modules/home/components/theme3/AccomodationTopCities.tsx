import { ArrowLeft } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";

const AccomodationTopCities: React.FC = () => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);
    const checkin = formatDate(today);
    const checkout = formatDate(tomorrow);
    const capacity = 1;

    const categories: {
        imageUrl: string;
        title: string;
        citySlug: string;
    }[] = [
            {
                title: "تهران",
                citySlug: "tehran",
                imageUrl: "/images/home/theme3/accomodation/cities/tehran.avif",
            },
            {
                title: "کردان",
                citySlug: "kordan",
                imageUrl: "/images/home/theme3/accomodation/cities/kordan.avif",
            },
            {
                title: "رامسر",
                citySlug: "ramsar",
                imageUrl: "/images/home/theme3/accomodation/cities/ramsar.avif",
            },
            {
                title: "چالوس",
                citySlug: "chalus",
                imageUrl: "/images/home/theme3/accomodation/cities/chalous.avif",
            },
            {
                title: "ماسال",
                citySlug: "masal",
                imageUrl: "/images/home/theme3/accomodation/cities/masal.avif",
            },
            {
                title: "رشت",
                citySlug: "rasht",
                imageUrl: "/images/home/theme3/accomodation/cities/rasht.avif",
            },
            {
                title: "بندر انزلی",
                citySlug: "bandar-anzali",
                imageUrl: "/images/home/theme3/accomodation/cities/bandaranzali.avif",
            },
            {
                title: "متل قو",
                citySlug: "motel-qu(salman-shahr)",
                imageUrl: "/images/home/theme3/accomodation/cities/motelqu.avif",
            },
            {
                title: "بابلسر",
                citySlug: "babolsar",
                imageUrl: "/images/home/theme3/accomodation/cities/babolsar.avif",
            },
            {
                title: "سوادکوه",
                citySlug: "savadkuh",
                imageUrl: "/images/home/theme3/accomodation/cities/savadkuh.avif",
            },
            {
                title: "تالش",
                citySlug: "talesh",
                imageUrl: "/images/home/theme3/accomodation/cities/talesh.avif",
            },
            {
                title: "کرج",
                citySlug: "karaj",
                imageUrl: "/images/home/theme3/accomodation/cities/karaj.avif",
            },
            {
                title: "شهریار",
                citySlug: "shahriyar",
                imageUrl: "/images/home/theme3/accomodation/cities/shahriyar.avif",
            },
            {
                title: "مشهد",
                citySlug: "mashhad",
                imageUrl: "/images/home/theme3/accomodation/cities/mashhad.avif",
            },
            {
                title: "اصفهان",
                citySlug: "isfahan",
                imageUrl: "/images/home/theme3/accomodation/cities/isfahan.avif",
            },
            {
                title: "شیراز",
                citySlug: "shiraz",
                imageUrl: "/images/home/theme3/accomodation/cities/shiraz.avif",
            },
            {
                title: "کاشان",
                citySlug: "kashan",
                imageUrl: "/images/home/theme3/accomodation/cities/kashan.avif",
            },
            {
                title: "کیش",
                citySlug: "kish",
                imageUrl: "/images/home/theme3/accomodation/cities/kish.avif",
            },
            {
                title: "قشم",
                citySlug: "qeshm",
                imageUrl: "/images/home/theme3/accomodation/cities/qeshm.avif",
            },
        ]

    const firstRow = categories.slice(0, 5);
    const secondRow = categories.slice(5, 12);
    const mobileItems = categories.slice(0, 12);

    return (
        <section className="max-w-container m-auto px-5 lg:pt-14 max-xl:p-5 mb-5 sm:mb-10">

            <h2 className="text-xl md:text-2xl mb-2 mb-8 text-center text-[#1d274b] font-bold">
                مقاصد پربازدید
            </h2>

            <div className="grid max-xl:hidden xl:grid-cols-7 gap-4 mb-4" dir="rtl">
                <div className="max-xl:hidden" />
                
                {firstRow.map(category => (
                    <div key={category.title}>
                        <Link
                            href={`/fa/accommodations/${category.citySlug}/checkin-${checkin}/checkout-${checkout}/capacity-${capacity}`}
                            className='rounded-lg group relative block overflow-hidden'
                            target='_blank'
                            title={category.title}
                        >
                            <Image
                                onContextMenu={e => { e.preventDefault() }}
                                src={category.imageUrl}
                                alt={category.title}
                                width={282}
                                height={384}
                                className='col-span-5 h-40 w-full object-cover group-hover:scale-110 transition-all duration-300'
                            />
                            <div className="absolute bottom-0 left-0 right-0 text-center leading-5 bg-white/80 m-1 rounded-lg group-hover:bg-white p-2">
                                <b className='font-semibold block text-md text-black text-right'> {category.title} </b>
                                <ArrowLeft className="absolute top-2.5 left-2 size-4 text-black rotate-45" />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="grid max-xl:hidden xl:grid-cols-7 gap-4 mb-4" dir="rtl">
                {secondRow.map(category => (
                    <div key={category.title}>
                        <Link
                            href={`/fa/accommodations/${category.citySlug}/checkin-${checkin}/checkout-${checkout}`}
                            className='rounded-lg group relative block overflow-hidden'
                            target='_blank'
                            title={category.title}
                        >
                            <Image
                                onContextMenu={e => { e.preventDefault() }}
                                src={category.imageUrl}
                                alt={category.title}
                                width={282}
                                height={384}
                                className='col-span-5 h-40 w-full object-cover group-hover:scale-110 transition-all duration-300'
                            />
                            <div className="absolute bottom-0 left-0 right-0 text-center leading-5 bg-white/80 m-1 rounded-lg group-hover:bg-white p-2">
                                <b className='font-semibold block text-md text-black text-right'> {category.title} </b>
                                <ArrowLeft className="absolute top-2.5 left-2 size-4 text-black rotate-45" />
                            </div>
                        </Link>
                    </div>
                ))}
                {Array.from({ length: 7 - secondRow.length }).map((_, i) => <div key={i} />)}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:hidden gap-4 mb-4" dir="rtl">
                {mobileItems.map(category => (
                    <div key={category.title}>
                        <Link
                            href={`/fa/accommodations/${category.citySlug}/checkin-${checkin}/checkout-${checkout}`}
                            className='rounded-lg group relative block overflow-hidden'
                            target='_blank'
                            title={category.title}
                        >
                            <Image
                                onContextMenu={e => { e.preventDefault() }}
                                src={category.imageUrl}
                                alt={category.title}
                                width={282}
                                height={384}
                                className='col-span-5 h-32 sm:h-40 w-full object-cover group-hover:scale-110 transition-all duration-300'
                            />
                            <div className="absolute bottom-0 left-0 right-0 text-center leading-5 bg-white m-1 rounded-lg group-hover:bg-white p-1 sm:p-2">
                                <b className='font-semibold block text-xs sm:text-md text-black text-right'> {category.title} </b>
                                <ArrowLeft className="absolute top-1.5 sm:top-2.5 left-2 size-4 text-black rotate-45" />
                            </div>
                        </Link>
                    </div>
                ))}
                {Array.from({ length: 7 - secondRow.length }).map((_, i) => <div key={i} />)}
            </div>

            

        </section>
    )
}

export default AccomodationTopCities;