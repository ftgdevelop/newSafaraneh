import { ArrowLeft, Location } from "@/modules/shared/components/ui/icons";
import { dateDisplayFormat } from "@/modules/shared/helpers";
import Image from "next/image";
import Link from "next/link";

type AsideProps = {
  house: {
    id: number;
    title: string;
    pictures: { records: { path: string }[] };
    location: { address: string; province?: string; city?: string; village?: string };
  } | null;
  reserveInfo: {
    checkin: string;
    checkout: string;
    guestsCount: number;
    stayNights: number;
    totalPrice: number;
  }
};

function Aside({ house, reserveInfo }: AsideProps) {

    if (!house) {
        return (
            <div className="p-4 bg-white border rounded-lg">
                <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="w-full h-24 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                    <div className="col-span-2 flex flex-col justify-center">
                        <div className="w-32 h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
                <hr className="pt-4" />
                <div className="mb-2 flex justify-between">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="mb-2 flex justify-between">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
                </div>
                <hr className="pt-4 border-dashed" />
                <div className="mb-2 flex justify-between">
                    <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    const title = house.title;
    const id = house.id;
    const image = house.pictures?.records?.[0]?.path || "/default-image.jpg";
    const address = house.location;
    const checkin = reserveInfo.checkin;
    const checkout = reserveInfo.checkout;
    const guestsCount = reserveInfo.guestsCount;
    const stayNights = reserveInfo.stayNights;
    const totalPrice = reserveInfo.totalPrice;

  return (
    <>
        <div className="p-4 bg-white border rounded-lg">
            <div className="grid grid-cols-3 gap-4 items-start">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-24 object-cover rounded-lg mb-4"
                    width={200}
                    height={160}
                />
                <div className="col-span-2 flex flex-col justify-center">
                    <h4 className="text-md font-bold mb-1 mb-2">{title}</h4>
                    {address && (
                        <div className="text-sm text-gray-500">
                            <Location className="w-4 h-4 fill-current inline-block align-middle" /> {address.province || "نامشخص"}، {address.city || "نامشخص"}، {address.village || "نامشخص"}
                        </div>
                    )}
                </div>
            </div>
            <Link
                href={`/accommodation/${id}/checkin-${checkin.replace(/T.*$/, "")}/checkout-${checkout.replace(/T.*$/, "")}/capacity-${guestsCount}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#ece9f2]/50 hover:bg-[#ece9f2] transition mb-4 text-sm rounded-full text-blue-500 text-xs"
            >
                مشاهده جزئیات اقامتگاه
                <ArrowLeft className="w-4 h-4 fill-current" />
            </Link>
            <hr className="pt-4" />
            <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500">تاریخ ورود</span>
                <span className="text-md font-bold">
                    {dateDisplayFormat({ date: checkin, format: "ddd dd mm yyyy", locale: "fa" })}
                </span>
            </div>
            <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500">تاریخ خروج</span>
                <span className="text-md font-bold">
                    {dateDisplayFormat({ date: checkout, format: "ddd dd mm yyyy", locale: "fa" })}
                </span>
            </div>
            <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500">مدت اقامت</span>
                <span className="text-md font-bold">
                    {stayNights} شب
                </span>
            </div>
            <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500">تعداد مسافران</span>
                <span className="text-md font-bold">
                    {guestsCount} نفر
                </span>
            </div>
            <hr className="pt-4 border-dashed" />
            <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500 font-bold">مبلغ قابل پرداخت</span>
                <span className="text-lg font-bold">
                    {totalPrice.toLocaleString()} تومان
                </span>
            </div>
        </div>
    </>
  );
}

export default Aside;