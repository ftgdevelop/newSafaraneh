import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { DomesticAccomodationFacilityType } from "@/modules/domesticHotel/types/hotel";
import { DownCaret, Verified } from "@/modules/shared/components/ui/icons";
import AccommodationFacilityItem from './AccommodationFacilitiyItem';

type Props = {
    facilities?: DomesticAccomodationFacilityType[];
}

const AccommodationFacilities: React.FC<Props> = props => {

    const { facilities } = props;

    const [open, setOpen] = useState<boolean>(false);

    const { t: tHotel } = useTranslation('hotel');

    if (!facilities) {
        return null;
    }

    return (
        <div id='amenities_section' className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10" >

            <h3 className='text-lg lg:text-3xl font-semibold mb-3 md:mb-7'> {tHotel("hotel-facilities")}   </h3>

            <div className='p-5 lg:p-7 bg-white rounded-xl leading-5'>

                <div className='mb-7'>
                    {facilities.filter(item => item.items.some(s => s.isImportant)).map(facilityItem => (
                        <div key={facilityItem.keyword} className='text-sm inline-block gap-2 py-0.5 rtl:ml-5 border-2 border-green-600 font-semibold text-green-600 px-1 rounded' >
                            {facilityItem.items.filter(i => i.isImportant).map(a => <span key={a.name}> <Verified className='w-6 h-6 fill-current inline-block' /> {a.name} </span>)}
                        </div>
                    ))}
                </div>

                <div className={`sm:columnCount2 md:columnCount3 xl:columnCount4`}>

                    {facilities.slice(0, 4).map(facility => <AccommodationFacilityItem facility={facility} key={facility.keyword} />)}

                    {!!open && facilities.slice(4).map(facility => <AccommodationFacilityItem facility={facility} key={facility.keyword} />)}

                </div>

                <div className={`hidden md:block relative text-center before:absolute before:left-0 before:right-0 before:bottom-full ${open ? "before-h-0" : "before:h-18"} before:bg-gradient-to-b before:from-transparent before:to-white`}>
                    <button type='button' className='text-xs inline-block mt-2' onClick={() => { setOpen(prevState => !prevState) }}>
                        {open ? " بستن " : " امکانات بیشتر "} <DownCaret className={`w-5 h-5 fill-current inline-block align-middle transition-all ${open ? "rotate-180" : ""}`} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AccommodationFacilities;