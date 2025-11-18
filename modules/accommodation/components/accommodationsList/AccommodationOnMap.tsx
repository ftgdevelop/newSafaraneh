import dynamic from "next/dynamic";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";
import { useEffect, useState } from "react";
import { Close, Filter, List } from "@/modules/shared/components/ui/icons";
import Button from "@/modules/shared/components/ui/Button";
import Select from "@/modules/shared/components/ui/Select";
import AccommodationFilters from "./sidebar/AccommodationFilters";

const LeafletNoSsr = dynamic(() => import('../../../shared/components/ui/LeafletMap'), {
    ssr: false
});

type Props = {
    fallbackLocation?: [number, number];
    closeMapModal: () => void;
}

const AccommodationOnMap: React.FC<Props> = props => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => { setShow(true) }, 100);
        return () => {
            setShow(false);
        };
    }, []);

    const { closeMapModal, fallbackLocation = [35.6892, 51.3890] } = props; // Default location: Tehran, Iran

    return (
        <ModalPortal
            show={show}
            selector='modal_portal'
        >
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
                <div
                    className='bg-black/75 absolute top-0 left-0 w-full h-full z-10'
                    onClick={closeMapModal}
                >
                    <button type='button' onClick={closeMapModal} className='absolute top-2 left-2 z-30 lg:hidden' aria-label='close map'>
                        <Close className='w-10 h-10 fill-neutral-400' />
                    </button>

                    <div className='bg-white p-2 pt-14 sm:p-5 sm:rounded-lg w-full h-full sm:h-5/6 sm:w-5/6 lg:w-full lg:h-full lg:rounded-none relative z-20 lg:grid grid-cols-3 xl:grid-cols-4'>
                        <div className='h-full w-full lg:col-span-2 xl:col-span-3 bg-neutral-300'>
                            <LeafletNoSsr
                                className='h-full w-full rounded-xl hotelListMap'
                                zoom={15}
                                center={fallbackLocation}
                            />
                        </div>

                        <div className='max-lg:hidden'>
                            <div className='mb-5'>
                                <Button color='green' type='button' onClick={closeMapModal} className='mx-auto px-5 h-10' aria-label='close map'>
                                    بستن نقشه <small> (Esc) </small> <Close className='w-5 h-5 fill-current' />
                                </Button>
                            </div>

                            <div className='grid grid-cols-2 gap-4 p-4'>
                                <Select
                                    items={[
                                        { value: "priority", label: "priority" },
                                        { value: "price", label: "lowest-price" },
                                        { value: "starRate", label: "highest-star-rating" },
                                        { value: "name", label: "hotel-name" },
                                        { value: "gueatRate", label: "highest-guest-rating" }
                                    ]}
                                    onChange={type => { }}
                                    label={'sortBy'}
                                    wrapperClassName='max-sm:grow sm:full'
                                />

                                <button
                                    type='button'
                                    className='flex justify-center items-center gap-3 border border-neutral-400 rounded'
                                >
                                    لیست هتل ها <List className='w-5 h-5 fill-current' />
                                </button>

                                <button
                                    type='button'
                                    className='flex justify-center items-center gap-3 border border-neutral-400 rounded'
                                >
                                    filter <Filter className='w-5 h-5 fill-current' />
                                </button>
                            </div>

                            <div className='hotels-map-sidebar-height overflow-auto'>
                                <AccommodationFilters />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

export default AccommodationOnMap;