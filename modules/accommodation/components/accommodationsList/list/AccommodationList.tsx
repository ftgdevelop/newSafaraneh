import Pagination from "@/modules/shared/components/ui/Pagination";
import AccommodationItem from "./AccommodationItem";
import AccommodationItemSkeleton from "./AccommodationItemSkeleton";

type Accommodation = {
  id: string | number;
  title: string;
  salePrice: number;
  boardPrice: number;
  [key: string]: any;
};

type ItemsWrapper = {
  hotels?: Accommodation[];
};

interface AccommodationListProps {
  items?: ItemsWrapper | any[] | null;
  totalItems: number;
  currentPage: number;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  checkin?: string;
  checkout?: string;
  capacity?: string | number;
}

export default function AccommodationList({
  items,
  totalItems,
  currentPage,
  loading,
  onPageChange,
  checkin,
  checkout,
  capacity,
}: AccommodationListProps) {
  const hotels: Accommodation[] = Array.isArray(items)
    ? (items as Accommodation[])
    : items?.hotels ?? [];

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(24)].map((_, i) => <AccommodationItemSkeleton key={i} />)
          : hotels.map((item: Accommodation) => (
              <AccommodationItem
                key={item.id}
                title={item.title}
                location={item.location}
                photos={item.with?.photos} // <-- pass the gallery here!
                salePrice={item.salePrice}
                boardPrice={item.boardPrice}
                discountPercent={item.discountPercent}
                discountPrice={item.discountPrice}
                id={item.id}
                checkin={checkin}
                checkout={checkout}
                capacity={capacity}
              />
            ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={24}
          onChange={onPageChange ?? (() => {})}
        />
      </div>
    </div>
  );
}
