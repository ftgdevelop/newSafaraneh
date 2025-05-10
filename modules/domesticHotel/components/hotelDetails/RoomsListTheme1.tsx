import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { DomesticHotelAvailability, DomesticHotelRateItem, DomesticHotelRoomItem } from "../../types/hotel";
import RoomItemTheme1 from "./RoomItemTheme1";
import RoomFilters from "./RoomFilters";
import { useState } from "react";
import PriceTypeRadio from "./PriceTypeRadio";

type Props = {
    availabilites?: DomesticHotelAvailability[];
    selectRoomHandle: (key: string, count: number) => void;
    selectedRoomToken?: string;
    roomsHasImage?: boolean;
    nights: number;
    onOpenRoom: (room: {
        rate: DomesticHotelRateItem;
        room?: DomesticHotelRoomItem;
    }) => void;
    goToSearchForm : () => void;
}

type Keyword = "breakfast" | "extraBed";

const RoomsListTheme1: React.FC<Props> = props => {

    const [activeFilters, setActiveFilters] = useState<Keyword[]>([]);
    const [priceType, setPriceType] = useState<"total" | "average">('total');

    const availableFilters: {
        label: string;
        keyword: Keyword;
    }[] = [];

    if (props.availabilites?.length) {
        let refundable = false;
        let breakfast = false;
        let extraBed = false;

        for (const availibility of props.availabilites) {
            if (availibility.rooms?.[0]?.capacity?.extraBed) {
                extraBed = true;
            }

            if (availibility.rates?.find(rate => ["BB", "HB", "FB"].includes(rate.board.code))) {
                breakfast = true;
            }

            if (availibility.rates?.find(rate => rate.cancellationPolicy?.status === "Refundable")) {
                refundable = true;
            }
        }

        if (extraBed) availableFilters.push({
            label: "با تخت اضافه",
            keyword: "extraBed"
        });
        if (breakfast) availableFilters.push({
            label: "با صبحانه",
            keyword: "breakfast"
        });
    }

    if (!props.availabilites) {
        return (
            <>
                {[1, 2, 3, 4, 5].map(item => (
                    <div key={item} className='bg-white border border-neutral-300 rounded-xl mb-4 overflow-hidden grid grid-cols-4'>
                        <Skeleton type='image' />
                        <div className='col-span-3 p-4'>
                            <div className='flex justify-between mb-4'>
                                <Skeleton className='w-40' />
                                <Skeleton className='w-20' />
                            </div>
                            <div className='flex justify-between mb-4'>
                                <Skeleton className='w-24' />
                                <Skeleton className='w-48' />
                            </div>
                            <div className='flex justify-between'>
                                <Skeleton className='w-20' />
                                <Skeleton className='w-60' />
                            </div>

                        </div>
                    </div>
                ))}
            </>
        )
    }

    const clickFilterHandle = (keyword: Keyword) => {

        setActiveFilters(prevState => {
            if (prevState.includes(keyword)) {
                return prevState.filter(x => x !== keyword);
            } else {
                return ([
                    ...prevState,
                    keyword
                ])
            }
        })
    }

    const minPrice = props.availabilites?.flatMap(item => item.rates ? [...item.rates] : []).reduce(
        (min, currentItem) => {
            if (currentItem.price < min && currentItem.availablityType !== "Completion" ) {
                return currentItem.price;
            }
            return min;
        },
        10000000000
    );

    const filteredAvailability = props.availabilites.map (item => {

        const filteredRates = item.rates?.filter(rate => {
            
            let status = true;

            if(activeFilters.includes('breakfast') &&  !(["BB", "HB", "FB"].includes(rate.board.code))) status = false;

            return status;
        }).map(rate => {
            
            if (rate.price === minPrice && rate.availablityType !== "Completion"){
                return ({
                    ...rate,
                    isTheCheapest: true
                });
            }

            return ({
                ...rate,
                isTheCheapest: false
            })            

        }) || [];

        return({
            ...item,
            rates : filteredRates
        })

    }).filter(item => {
        let status = true;
        
        if (item.rates.length === 0) status = false;

        if (activeFilters.includes("extraBed") && !item.rooms?.[0]?.capacity?.extraBed) status = false;
        
        return status;
    });


    return (
        <>
            <div className="flex flex-wrap gap-5 items-center justify-between mb-4">
                <RoomFilters
                    activeItems={activeFilters}
                    onItemClick={clickFilterHandle}
                    availableFilters={availableFilters}
                />                
                <PriceTypeRadio 
                    nights={props.nights || 0}
                    priceType={priceType}
                    onChangeType={type => {setPriceType(type)}}
                />
            </div>

            {filteredAvailability.map(availability => {
                return (
                    <RoomItemTheme1
                        goToSearchForm={props.goToSearchForm}
                        priceType={priceType}
                        rates={availability.rates || []}
                        key={availability.rooms?.[0]?.name}
                        room={availability.rooms![0]}
                        onSelectRoom={props.selectRoomHandle}
                        selectedRoomToken={props.selectedRoomToken}
                        roomsHasImage={props.roomsHasImage || false}
                        nights={props.nights}
                        onOpenRoom={(rateItem: DomesticHotelRateItem) => {
                            props.onOpenRoom({
                                rate: rateItem,
                                room: availability.rooms?.[0]
                            })
                        }}
                    />
                )
            })}
        </>
    )
}

export default RoomsListTheme1;