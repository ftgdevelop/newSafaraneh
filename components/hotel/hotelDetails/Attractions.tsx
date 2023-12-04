import { useTranslation } from 'next-i18next';

import { DomesticHotelDetailType } from '@/types/hotel';
import { LocationCircle } from '@/components/shared/ui/icons';

type Props = {
    attractions: DomesticHotelDetailType['DistancePoints'];
    isSmall?: boolean;
}

const Attractions: React.FC<Props> = props => {

    const { attractions } = props;

    const { t } = useTranslation('common');

    const distanceDurationByMode = (mode?: string) => {
        switch (mode) {
            case "Walking":
                return t('walking');
            case "Driving":
                return t('with-car');
            default:
                return mode || "";
        }
    }

    if (!attractions) {
        return null;
    }

    return (
        <>
            <h3 className='font-semibold text-md lg:text-lg mb-3'> فاصله هتل تا اماکن مهم</h3>
            {attractions.map(item => (
                <div key={item.AttractionName} className={`flex justify-between text-sm ${props.isSmall?"text-neutral-500":"md:text-base md:mb-2"}`}>
                    <h6><LocationCircle className='w-4 h-4 fill-current inline-block align-middle rtl:ml-1 ltr:mr-1' /> {t('distance-to')} {item.AttractionName} </h6>
                    <span>
                        {item.DurationText} {distanceDurationByMode(item.Mode)}
                    </span>
                </div>
            ))}

        </>
    )
}

export default Attractions;