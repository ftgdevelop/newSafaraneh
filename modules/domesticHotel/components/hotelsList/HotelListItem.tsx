import { SearchHotelsItem } from "../../types/hotel";
import Image from "next/image";
import { DefaultRoom, Location } from "@/modules/shared/components/ui/icons";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Rating from "@/modules/shared/components/ui/Rating";
import HotelScore from "../shared/HotelScore";
import Button from "@/modules/shared/components/ui/Button";

type Props = {
    hotel: SearchHotelsItem
}

const HotelListItem: React.FC<Props> = props => {

    const { t } = useTranslation("hotel");
    const { hotel } = props;

    return (
        <div
            key={hotel.CityId}
            className="grid md:grid-cols-3 mb-4 border border-neutral-200 bg-white rounded-lg overflow-hidden relative"
        >
            <Link
                href={hotel.Url!}
            >
                {hotel.ImageUrl ? (
                    <Image
                        src={hotel.ImageUrl}
                        alt={hotel.ImageAlt || hotel.HotelName!}
                        width={288}
                        height={200}
                        className="md:col-span-1 h-48 object-cover w-full"
                    />
                ) : (
                    <div
                        className="md:col-span-1"
                    >
                        <DefaultRoom />
                    </div>
                )}
            </Link>
            {!!hotel.IsPromotion && <span className="absolute bg-green-600 text-white right-3 top-3 rounded-xl leading-4 text-2xs py-1 px-2 select-none pointer-events-none"> پیشنهاد ویژه </span>}

            <div className="md:col-span-2 p-4 flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                    <Link href={hotel.Url!} className="font-bold text-neutral-700 rtl:ml-2 ltr:mr-2" >
                        {hotel.HotelCategoryName} {hotel.HotelName} {hotel.CityName}
                    </Link>

                    {hotel.HotelRating && <Rating number={hotel.HotelRating} inline className="align-middle rtl:ml-2 ltr:mr-2" />}

                    <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">
                        {hotel.HotelTypeName}
                    </span>

                    {!!hotel.Address && <p className="text-xs text-neutral-400"><Location className="w-4 h-4 fill-neutral-400 inline-block" /> {hotel.Address} </p>}

                    <HotelScore
                        reviews={50}
                        score={6}
                    />

                    {!!hotel.IsCovid && (
                        <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">اطلاعات ایمنی کووید-۱۹</span>
                    )}

                </div>

                <div className="flex flex-col justify-between sm:items-end">
                    <div>
                        <span className="bg-green-700 text-white rounded-xl leading-7 text-2xs px-2 select-none"> 10% تخفیف </span>
                        <br />
                        39000000 ریال
                        <p className="text-xs">
                            شروع قیمت برای یک شب
                        </p>
                    </div>

                    <Button
                        hasArrow
                        href={hotel.Url}
                        target="_blank"
                        className="rounded-lg h-10 px-5 text-sm w-full md:w-48"
                    >
                        {t("see-rooms")}
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default HotelListItem;