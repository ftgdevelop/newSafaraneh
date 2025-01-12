import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { ExtendedDomesticHotelSimilarHotel } from '@/modules/domesticHotel/types/hotel';
import { DefaultRoomTheme2 } from '@/modules/shared/components/ui/icons';
import { numberWithCommas, toPersianDigits } from '@/modules/shared/helpers';
import Button from '@/modules/shared/components/ui/Button';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import GuestRating from '@/modules/shared/components/ui/GuestRating';

type Props = {
    hotel?: ExtendedDomesticHotelSimilarHotel;
    loadingPrice?: boolean;
    nights: number;
    searchInfo: string;
}

const SimilarHotelItemTheme2: React.FC<Props> = props => {

    const { hotel, nights } = props;

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    if (!hotel) {
        return null;
    }

    const importantFacilities = hotel.facilities?.flatMap(facility => facility.items)?.filter(facility => facility?.isImportant);
    

    let rate: React.ReactNode = null;
    if (!hotel.ratesInfo) {
        rate = <div />;
    } else if (hotel.ratesInfo === "loading") {
        rate = <Skeleton className="mt-1" />
    } else if (!hotel.ratesInfo?.Satisfaction) {
        rate = <div />;
    } else {
        rate = <GuestRating
            rating={hotel.ratesInfo?.Satisfaction}
            reviewCount={hotel.ratesInfo.TotalRowCount}
            wrapperClassName="mt-1"
        />
    }

    let priceBlock: React.ReactNode = null;

    if (hotel.priceInfo === "notPriced") {

        priceBlock = null;

    } else if (hotel.priceInfo === 'loading') {

        priceBlock = <div dir="ltr">
            <Skeleton className="w-16" />
            <Skeleton className="w-28 my-2" />
            <Skeleton className="w-20" />
        </div>

    } else if (hotel.priceInfo === "need-to-inquire") {

        priceBlock = <div className="whitespace-nowrap text-red-500 text-xs leading-4"> قیمت نیازمند استعلام است </div>

    } else {

        const { boardPrice, salePrice } = hotel.priceInfo;

        priceBlock = (
            <>
                {(boardPrice > salePrice) && <span className="text-xs inline-block text-neutral-500 line-through whitespace-nowrap">
                    {numberWithCommas(boardPrice)} {t('rial')}
                </span>}

                <div className="font-semibold whitespace-nowrap">
                    {numberWithCommas(salePrice)} {t('rial')}
                </div>

                <div className="text-xs text-neutral-500 leading-4">
                    {tHotel("price-for-nights", { nights: toPersianDigits(nights.toString()) })}
                </div>
            </>
        )
    }


    let button: React.ReactNode = null;

    if (hotel.priceInfo === "notPriced") {
        button = null;
    } else if (hotel.priceInfo === 'loading') {
        button = null;
    } else {
        button = (
            <Button
                href={hotel.url + props.searchInfo}
                target="_blank"
                className="rounded-full h-10 px-5 text-sm w-full mt-2"
            >
                {hotel.priceInfo === "need-to-inquire" ? "درخواست رزرو" : "مشاهده و رزرو"}
            </Button>
        )
    }

    return (
        <div className='bg-white border border-neutral-200 rounded-xl flex flex-col'>
            {hotel.picture?.path ? (
                <Image
                    src={hotel.picture.path}
                    alt={hotel.displayName || hotel.name || ""}
                    width={310}
                    height={130}
                    className='w-full h-40 rounded-t-xl object-cover'
                />
            ) : (
                <div className='w-full h-40 flex justify-center items-center rounded-t-xl bg-neutral-100'>
                    <DefaultRoomTheme2 className="fill-neutral-300 w-28 h-28" />
                </div>
            )}


            <div className='p-3 flex flex-col justify-between grow'>
                <div>
                    <h3 className='font-semibold text-sm inline-block ml-3'> {props.hotel?.displayName} </h3>
                    {!!hotel.typeStr && <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">
                        {hotel.typeStr}
                    </span>}

                    {importantFacilities?.map(x => <div className='text-2xs' key={x?.name}>{x?.name}</div>)}

                    {rate}
                </div>

                <div className='flex flex-col items-end py-2'>
                    {priceBlock}
                    {button}
                </div>

            </div>
        </div>
    )
}

export default SimilarHotelItemTheme2;

