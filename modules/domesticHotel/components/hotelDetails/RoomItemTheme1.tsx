import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { DomesticHotelRateItem, DomesticHotelRoomItem } from '@/modules/domesticHotel/types/hotel';
import { Bed, User } from '@/modules/shared/components/ui/icons';
import RoomItemRateItemTheme1 from './RoomItemRateItemTheme1';

type Props = {
    room?: DomesticHotelRoomItem;
    onSelectRoom: (bookingToken: string, count: number) => void;
    selectedRoomToken?: string;
    roomsHasImage?: boolean;
    nights: number;
    onOpenRoom: (rateItem: DomesticHotelRateItem) => void;
    rates:DomesticHotelRateItem[];
    priceType: "total" | "average";
    goToSearchForm : () => void;
}

const RoomItemTheme1: React.FC<Props> = props => {

    const { rates,room } = props;

    const { t: tHotel } = useTranslation('hotel');

    if (!rates?.length || !room) {
        return null;
    }

    let image: React.ReactNode = null;

    if (room.image) {
        image = <Image
            onContextMenu={(e) => e.preventDefault()}
            className='w-24 md:w-40 object-cover object-center rounded-tr-2xl md:rounded-2xl'
            src={room.image}
            alt={room.name || "room name"}
            width="300"
            height="200"
        />
    }

    return (
        <div className={`bg-white border border-neutral-300 rounded-2xl text-sm flex flex-col justify-between mb-5`}>
            <div className='bg-slate-300 px-5 py-3 rounded-t-2xl md:text-lg font-semibold hidden md:block'>
                {room.name}
            </div>
            <div className='flex md:p-4'>
                {image}
                <div className='p-3'>

                    <div className='flex gap-x-3 gap-y-1 items-center flex-wrap'>
                        <h3 className='text-17 md:text-lg font-semibold'> {room.name}</h3>
                    </div>
    

                    {!!room.capacity.count && (
                        <div className="flex gap-2 items-center">
                            <User className='w-5 h-5 fill-neutral-400' />
                            {room.capacity.count} نفر
                        </div>
                    )}

                    {room.capacity?.extraBed ? (
                        <div className="flex gap-2 items-center">
                            <Bed className='w-5 h-5 fill-neutral-400' />
                            {tHotel('extra-bed')}
                        </div>
                    ) : (
                        <div className="line-through text-neutral-500"> {tHotel('extra-bed')} </div>
                    )}

                    {!!(room.promotions?.length) && (
                        <div>
                            {room.promotions.map(promotion => (
                                <span
                                    key={promotion.name}
                                    className='bg-white border px-1 py-1 leading-5 rtl:ml-1 ltr:mr-1 mb-1 inline-block text-xs text-neutral-500 rounded'
                                >
                                    {promotion.name} 
                                </span>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <hr className='mb-3'/>

            <div className='px-3 md:px-5'>
                <div className='md:grid md:grid-cols-5 mb-1'>
                    <p className='md:col-span-2'>
                        یکی از گزینه ها را انتخاب کنید
                    </p>
                    <div className='hidden md:block'> انتخاب تعداد اتاق</div>
                    <div className='hidden md:block'> قیمت </div>
                    <div className='hidden md:block' />
                </div>
                {rates?.map(rate=> (
                    <RoomItemRateItemTheme1
                        goToSearchForm={props.goToSearchForm}
                        priceType={props.priceType}
                        onOpenRoom={()=>{props.onOpenRoom(rate)}}
                        onSelectRoom={props.onSelectRoom}
                        rate={rate}
                        key={rate.bookingToken}
                        room={room}
                        nights={props.nights}
                        roomsHasImage={props.roomsHasImage}
                        selectedRoomToken={props.selectedRoomToken}
                    />
                 ))}

            </div>
        </div>
    )
}

export default RoomItemTheme1;
