import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { DomesticHotelAvailability, DomesticHotelRateItem } from "../../types/hotel";
import RoomItem from "./RoomItem";

type Props = {
    availabilites?: DomesticHotelAvailability[];
    selectRoomHandle:(key:string, count:number)=>void;
    selectedRoomToken?: string;
    roomsHasImage?: boolean;
    nights?: number;
    onShowPriceCalendar?: (name:string, rate:DomesticHotelRateItem) => void;

}

const RoomsListTheme1 : React.FC<Props> = props => {

    if (!props.availabilites){
        return(
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
    return(
        <>
        {props.availabilites.map(availability => {
            return availability.rates?.map(rateItem => (
                <RoomItem
                    key={rateItem.bookingToken}
                    rate={rateItem}
                    room={availability.rooms![0]}
                    onSelectRoom={props.selectRoomHandle}
                    selectedRoomToken={props.selectedRoomToken}
                    roomsHasImage={props.roomsHasImage || false}
                    nights={props.nights}
                    onShowPriceCalendar={() =>{
                        if(props.onShowPriceCalendar){
                            props.onShowPriceCalendar(availability.rooms?.[0].name || "" ,rateItem)
                        }
                    }}
                />
            ))
        })}
    </>
    )
}

export default RoomsListTheme1;