import { useEffect, useState } from "react";
import AccommodationListLazyLoad from "./accommodationListLazyLoad";
import Pagination from "@/modules/shared/components/ui/Pagination";
import AccommodationListItem from "./AccommodationListItem";

const AccommodationsList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
            setCurrentPage(1);
    }, []);

    // if (process.env.HOTEL_LIST_LAZY_LOAD === "lazy"){
    //     return(
    //         <AccommodationListLazyLoad />
    //     ) 
    // }

    return (
        <>
            <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={10}
                totalItems={2 || 0}
                currentPage={currentPage}
                wrapperClassName="mb-4"
            />

            <AccommodationListItem />
            <AccommodationListItem />
            <AccommodationListItem />
            <AccommodationListItem />
            <AccommodationListItem />
            <AccommodationListItem />

            <Pagination
                onChange={(page: number) => { setCurrentPage(page) }}
                itemsPerPage={10}
                totalItems={2 || 0}
                currentPage={currentPage}
                wrapperClassName="mb-4"
            />
        </>
    );
};

export default AccommodationsList;