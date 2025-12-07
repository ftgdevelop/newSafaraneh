import { Location } from "@/modules/shared/components/ui/icons";
import Image from "next/image";

type AsideProps = {
  house: {
    title: string;
    pictures: { records: { path: string }[] };
    location: { address: string; province?: string; city?: string; village?: string };
    salePrice: number;
  } | null;
};

function Aside({ house }: AsideProps) {
  if (!house) return null;

  const title = house.title || "عنوان نامشخص";
  const image = house.pictures?.records?.[0]?.path || "/default-image.jpg";
  const address = house.location || { address: "آدرس نامشخص" };

  return (
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
        <hr className="pt-4" />
        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">شروع قیمت از</span>
            <span className="text-md font-bold">
                {house.salePrice.toLocaleString()} تومان / هر شب
            </span>
        </div>
        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">کارمزد خدمات پلتفرم</span>
            <span className="text-md font-bold">
                ۲۹.۰۰۰ تومان
            </span>
        </div>

        <hr className="pt-4 border-dashed" />

        <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500 font-bold">جمع مبلغ قابل پرداخت</span>
            <span className="text-lg font-bold">
                2,990,000 تومان
            </span>
        </div>
    </div>
  );
}

export default Aside;