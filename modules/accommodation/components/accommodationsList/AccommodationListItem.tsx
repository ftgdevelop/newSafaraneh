import { DefaultRoom, InfoCircle } from "@/modules/shared/components/ui/icons";
import Rating from "@/modules/shared/components/ui/Rating";
import Tooltip from "@/modules/shared/components/ui/Tooltip";
import Image from "next/image";
import Link from "next/link";

const AccommodationListItem: React.FC = () => {

    let priceBlock: React.ReactNode = null;

    priceBlock = (
        <>
            <div className="text-sm text-red-500 font-semibold">  تکمیل ظرفیت </div>
            
            <div className="whitespace-nowrap text-red-500 text-xs"> قیمت نیازمند استعلام است </div>

            <div><span className="bg-green-700 text-white rounded-xl leading-7 text-2xs px-2 select-none"> ۲۰% تخفیف </span></div>

            <span className="text-xs inline-block text-neutral-500 line-through whitespace-nowrap">
                ۲.۰۰۰.۰۰۰ ریال
            </span>

            <>
                <Tooltip
                    className="inline-block text-sm rtl:mr-2 ltr:ml-2"
                    position="end"
                    title={
                        <div className="whitespace-nowrap">

                            ۲.۰۰۰.۰۰۰ ریال

                            <br />

                            <small> میانگین قیمت </small>

                        </div>
                    }
                >

                    <div className="font-semibold whitespace-nowrap">
                        ۲.۰۰۰.۰۰۰ ریال
                    </div>

                </Tooltip>

                <div className="text-xs text-neutral-500 leading-4">
                    قیمت برای ۱ شب
                </div>
            </>
        </>
    );

    return (
        <>
            <Link
                target="_blank"
                href="/#"
                className="grid xs:grid-cols-4 mb-4 border border-neutral-200 bg-white rounded-lg overflow-hidden relative"
            >
                <div className="p-1">
                    {/* <Image
                        src="https://cdn.hotelban.com/images/accommodations/%D9%87%D8%AA%D9%84-%D8%A2%D8%B2%D8%A7%D8%AF%DB%8C-%D8%AA%D9%87%D8%B1%D8%A7%D9%86-1.jpg"
                        alt="آپارتمان یک خوابه نواب ترکمان رودکی ۳"
                        width={288}
                        height={100}                            
                        className="object-cover h-full w-full rounded-lg"
                    /> */}
                    <div
                        className="bg-neutral-100 flex items-center justify-center h-full max-lg:rounded-t-lg lg:rtl:rounded-r-lg lg:ltr:rounded-l-lg"
                    >
                        <DefaultRoom className="fill-neutral-300 w-32 h-32" />
                    </div>
                </div>

                <span className="absolute bg-red-600 text-white right-3 top-3 rounded-md leading-4 text-2xs py-1 px-2 select-none pointer-events-none"> پیشنهاد ویژه </span>

                <div className="xs:col-span-2 p-3 max-xs:pb-0">
                    <div className="font-bold text-neutral-700 rtl:ml-2 ltr:mr-2 inline-block" > آپارتمان یک خوابه نواب ترکمان رودکی ۳ </div>
                    
                    <span className="bg-neutral-50 text-neutral-700 rounded-xl leading-6 text-2xs px-2 select-none">
                        آپارتمان
                    </span>

                    <br />
                    <Rating number={3} inline />
                    
                    
                    <div className="flex items-center mt-2">
                        <div className="text-xs rtl:ml-2">تهران، تهران</div>
                        <div className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">آپارتمان 1 خوابه</div>
                    </div>
                </div>

                <footer className="flex flex-col gap-4 sm:justify-between sm:items-end p-3">


                    <div className="rtl:text-left ltr:text-right max-sm:pb-3">
                        {priceBlock}
                    </div>
                </footer>
            </Link>
        </>
    );
};

export default AccommodationListItem;