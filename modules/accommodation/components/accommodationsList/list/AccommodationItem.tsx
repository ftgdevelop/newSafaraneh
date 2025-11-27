import Link from "next/link";
import Image from "next/image";

type AccommodationItemProps = {
  title: string;
  location?: { province?: string; city?: string } | null;
  coverPhoto?: { thumbnailAbsoluteUrl?: string } | null;
  salePrice: number;
  boardPrice: number;
  discountPercent?: number;
};

export default function AccommodationItem({ title, location, coverPhoto, salePrice, boardPrice, discountPercent }: AccommodationItemProps) {
  return (
    <Link
      href="#"
      className="bg-white rounded-2xl group relative block overflow-hidden border border-neutral-200"
      title={title}
    >
      {coverPhoto?.thumbnailAbsoluteUrl ? (
        <Image
          onContextMenu={(e) => e.preventDefault()}
          src={coverPhoto.thumbnailAbsoluteUrl}
          alt={title}
          width={600}
          height={400}
          className="h-40 w-full object-cover group-hover:scale-105 transition-all duration-300"
        />
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-gray-200 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7M3 7l9 6 9-6M3 7l9 6 9-6M3 7v10c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V7"
            />
          </svg>
        </div>
      )}

      <div className="p-3">
        <b className="font-bold mb-1 block text-md">{title}</b>

        <span className="text-xs leading-4 mb-2 text-neutral-500">
          {location?.province}، {location?.city}
        </span>

        <div className="flex flex-col items-end justify-end mt-4">
          {(discountPercent ?? 0) > 0 ? (
            <>
              <div className="flex flex-row items-center gap-3 mb-1">
                <div className="text-xs inline-block text-neutral-500 line-through whitespace-nowrap">
                  {boardPrice.toLocaleString("fa-IR")} ریال
                </div>
                <div className="text-xs font-semibold whitespace-nowrap">
                  {salePrice.toLocaleString("fa-IR")} ریال
                </div>
              </div>
            </>
          ) : (
            <div className="text-xs font-semibold whitespace-nowrap mb-1">
              {boardPrice.toLocaleString("fa-IR")} ریال
            </div>
          )}

          <div className="text-xs text-neutral-500 leading-4">شروع قیمت برای 1 شب</div>
        </div>
      </div>
    </Link>
  );
}
