import HotelNameFilter from "./HotelNameFilter";
import { useTranslation } from "next-i18next";
import HotelAvailabilityFilter from "./HotelAvailabilityFilter";
import HotelPriceFilter from "./HotelPriceFilter";
import HotelRatingFilter from "./HotelRatingFilter";
import HotelFacilityFilter from "./HotelFacilityFilter";
import HotelTypeFilter from "./HotelTypeFilter";
import HotelGuestPointFilter from "./HotelGuestPointFilter";
import { useState, useEffect } from 'react';
import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setBodyScrollable, setHeaderUnderMain } from "@/modules/shared/store/stylesSlice";
import Skeleton from "@/modules/shared/components/ui/Skeleton";

type Props = {
    allHotels: number;
    filteredHotels: number;
    priceIsFetched?: boolean;
    scoreIsFetched?: boolean;
}
const DomesticHotelListSideBar: React.FC<Props> = props => {

    const { t } = useTranslation("common");
    const { t: tHotel } = useTranslation("hotel");

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setHeaderUnderMain(open));
        dispatch(setBodyScrollable(!open));
    }, [open]);

    useEffect(() => {
        return () => {
            dispatch(setHeaderUnderMain(false));
            dispatch(setBodyScrollable(true));
        }
    }, []);


    const { allHotels, filteredHotels } = props;

    return (
        <>
            {!open && <button type="button" className="fixed shadow bg-blue-600 z-10 text-white rounded px-5 h-10 bottom-5 left-1/2 -translate-x-1/2 lg:hidden" onClick={() => { setOpen(true) }}>
                {t('filter')}
            </button>}
            {!!open && <div className="bg-black/75 backdrop-blur fixed top-0 left-0 right-0 bottom-0 z-20 lg:hidden" onClick={() => { setOpen(false) }} />}
            <div
                className={`bg-white max-lg:fixed max-lg:max-w-full max-lg:w-72 z-20 max-lg:overflow-auto top-0 max-lg:h-screen rtl:right-0 transition-all
                ${open ? "max-lg:translate-x-0" : "max-lg:translate-x-full"}`}
            >
                <div className="p-3 pb-0">

                    <HotelNameFilter />

                    <h5 className="mt-4 font-bold text-lg mb-2 border-t border-neutral-300 pt-5"> {t('filter')} </h5>

                    {!!(filteredHotels && allHotels && allHotels > filteredHotels) && <p className="text-xs mb-3 font-semibold">
                        {tHotel("hotels-filtered-from-total", { total: props.allHotels, filtered: props.filteredHotels })}
                    </p>}

                    {props.priceIsFetched ? <HotelAvailabilityFilter /> : (
                        <>
                            <label className="font-semibold text-sm mb-2 mt-4 border-t border-neutral-300 pt-5 block">
                                {tHotel('available-hotel')}
                            </label>
                            <Skeleton className="mb-4" />
                        </>
                    )}

                    {props.priceIsFetched ? <HotelPriceFilter /> : (
                        <>
                            <label className="font-semibold text-sm mb-2 mt-4 border-t border-neutral-300 pt-5 block">
                                {tHotel('total-price-for-stay')} ({t('rial')})
                            </label>
                            <Skeleton className="mb-4" />
                            <Skeleton className="mb-4" />
                        </>
                    )}

                    <HotelRatingFilter />

                </div>

                <div className="p-3 pt-0">


                    <HotelFacilityFilter />

                    {props.scoreIsFetched ? <HotelGuestPointFilter /> : (
                        <>
                            <label className="font-semibold text-sm mb-2 mt-4 border-t border-neutral-300 pt-5 block">
                                {tHotel('guest-rating')}
                            </label>
                            <Skeleton className="mb-4" />
                            <Skeleton className="mb-4" />
                            <Skeleton className="mb-4" />
                            <Skeleton className="mb-4" />
                        </>
                    )}

                    <HotelTypeFilter />

                </div>
            </div>
        </>
    )
}

export default DomesticHotelListSideBar;