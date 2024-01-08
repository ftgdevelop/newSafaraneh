import Pagination from "@/modules/shared/components/ui/Pagination";
import { PricedHotelItem } from "../../types/hotel";
import HotelListItem from "./HotelListItem";
import { useState } from "react";

type Props = {
    hotels: PricedHotelItem[];
}

const HotelsList: React.FC<Props> = props => {

    const { hotels } = props;

    const [currentPage, setCurrentPage] = useState<number>(1);

    const firstItemIndex = (currentPage - 1) * 20;
    const lastItem = currentPage * 20;

    return (
        <>

            <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={20}
                totalItems={hotels?.length || 0}
                currentPage={currentPage}
                wrapperClassName="mb-4"
            />

            {hotels.slice(firstItemIndex, lastItem).map(hotel => <HotelListItem key={hotel.HotelId} hotel={hotel} />)}

            <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={20}
                totalItems={hotels?.length || 0}
                currentPage={currentPage}
            />

        </>
    )
}

export default HotelsList;