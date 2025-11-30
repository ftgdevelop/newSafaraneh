import Image from 'next/image';
import Rating from "@/modules/shared/components/ui/Rating";
import HotelScore from "../shared/AccommodationScore";
import { Location } from "@/modules/shared/components/ui/icons";

function AccommodationName(props: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white rounded-b-xl">
            <div className="lg:col-span-2 pt-3">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-3 sm:mb-4 lg:mb-5">
                    اقامتگاه نمونه
                </h1>

                <Rating number={4} className="mb-3" />

                <p className="text-neutral-500 text-sm mb-3 sm:mb-6">
                    <Location className="w-4 h-4 fill-current inline-block align-middle" />
                    تهران، خیابان نمونه، پلاک ۱۲۳
                </p>

                <HotelScore
                    reviews={120}
                    score={8.7}
                    className="text-md lg:text-lg font-semibold"
                    max={10}
                />
            </div>

            <div className="lg:col-span-2">
                <strong className="block font-semibold text-md lg:text-lg mb-3">
                    امکانات محبوب هتل
                </strong>

                <div className="mb-5 flex flex-wrap gap-1 sm:gap-3">
                    <span className="text-xs sm:text-sm block border border-neutral-200 font-semibold text-neutral-500 px-1 sm:p-2 rounded whitespace-nowrap">
                        استخر
                    </span>
                    <span className="text-xs sm:text-sm block border border-neutral-200 font-semibold text-neutral-500 px-1 sm:p-2 rounded whitespace-nowrap">
                        وای‌فای رایگان
                    </span>
                    <span className="text-xs sm:text-sm block border border-neutral-200 font-semibold text-neutral-500 px-1 sm:p-2 rounded whitespace-nowrap">
                        رستوران
                    </span>
                    <span className="text-xs sm:text-sm block border border-neutral-200 font-semibold text-neutral-500 px-1 sm:p-2 rounded whitespace-nowrap">
                        پارکینگ
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AccommodationName;