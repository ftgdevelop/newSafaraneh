import { useTranslation } from "next-i18next";
import HotelNameFilter from "./AccommodationNameFilter";
import HotelRatingFilter from "./HotelRatingFilter";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import HotelPriceFilter from "./HotelPriceFilter";
import HotelAvailabilityFilter from "./HotelAvailabilityFilter";
import HotelFacilityFilter from "./HotelFacilityFilter";
import HotelGuestPointFilter from "./HotelGuestPointFilter";
import HotelTypeFilter from "./HotelTypeFilter";
import HotelPromotionFilter from "./HotelPromotionFilter";
import { toPersianDigits } from "@/modules/shared/helpers";
import AccommodationNameFilter from "./AccommodationNameFilter";
import AccommodationPriceFilter from "./AccommodationPriceFilter";
import AccommodationTypeFilter from "./AccommodationTypeFilter";

type Props = {
    allHotels: number;
    filteredHotels: number;
    priceIsFetched?: boolean;
    scoreIsFetched?: boolean;
}

const AccommodationFilters: React.FC<Props> = props => {

    const { t } = useTranslation("common");
    const { t: tHotel } = useTranslation("hotel");

    const { allHotels, filteredHotels } = props;


    return (
        <>

            <div className="p-3 pb-0">
                <AccommodationNameFilter />
                <h5 className="mt-4 font-bold text-lg mb-2 border-t border-neutral-300 pt-5"> {t('filter')} </h5>
                <AccommodationPriceFilter />
            </div>
            <div className="p-3 pt-0">
                <AccommodationTypeFilter />
            </div>

        </>
    )
}

export default AccommodationFilters;