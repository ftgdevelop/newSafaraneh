import Pagination from "@/modules/shared/components/ui/Pagination";
import { PricedHotelItem } from "../../types/hotel";
import HotelListItem from "./HotelListItem";
import { useEffect, useState } from "react";

type Props = {
    hotels: PricedHotelItem[];
}

const HotelsList: React.FC<Props> = props => {

    const { hotels } = props;

    const [currentPage, setCurrentPage] = useState<number>(1);

    const firstItemIndex = (currentPage - 1) * 10;
    const lastItem = currentPage * 10;

    useEffect(()=>{
        setCurrentPage(1);
    },[hotels.length]);

    hotels?.sort((b: PricedHotelItem, a: PricedHotelItem) => {

        if (a.priceInfo === "loading" || b.priceInfo === 'loading') {
            return 1;  // or -1?
        } else if (a.priceInfo === "notPriced" && b.priceInfo !== "notPriced") {
            return -1;
        } else if (a.priceInfo !== "notPriced" && b.priceInfo === "notPriced") {
            return 1;
        } else if (a.priceInfo === "need-to-inquire") {
            return -1;
        } else {
            return 1
        }
    });

    const theme2 = process.env.THEME === "THEME2";

    return (
        <>

            {!theme2 && <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={10}
                totalItems={hotels?.length || 0}
                currentPage={currentPage}
                wrapperClassName="mb-4"
            />}
            
            <div>
                {hotels.slice(firstItemIndex, lastItem).map((hotel, index) => <HotelListItem index={index} key={hotel.HotelId} hotel={hotel} />)}
            </div>

            <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={10}
                totalItems={hotels?.length || 0}
                currentPage={currentPage}
            />

        </>
    )
}

export default HotelsList;