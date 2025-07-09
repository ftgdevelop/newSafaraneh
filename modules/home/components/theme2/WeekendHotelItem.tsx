import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { numberWithCommas } from "@/modules/shared/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";

type Props = {
    hotel: {
        hotelId: number;
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
        alt: string;
        reviewRating: number;
        reviewCount: number;
        city: string;
        boardPrice?: number;
        salePrice?: number;
    },
    priceLoading: boolean;
    checkin: string;
    checkout: string;
}

const WeekendHotelItem: React.FC<Props> = props => {

    const { t } = useTranslation("common");

    const { hotel} = props;

    let tag = "معمولی";

    if (hotel.reviewRating > 60) {
        tag = "خوب";
    }
    if (hotel.reviewRating > 80) {
        tag = "خیلی خوب";
    }
    if (hotel.reviewRating > 90) {
        tag = "عالی";
    }


    let priceBlock: React.ReactNode = null;

    if (props.priceLoading) {

        priceBlock =
            <div>
                <Skeleton className="w-40" />
                <Skeleton className="w-28 my-2" />
                <Skeleton className="w-52" />
            </div>;

    } else if (hotel.salePrice && hotel.salePrice < 10000) {

        priceBlock = <div className="whitespace-nowrap text-red-500 text-xs"> قیمت نیازمند استعلام است </div>

    } else if (hotel.salePrice && hotel.boardPrice) {

        const { boardPrice, salePrice } = hotel;

        let discount: number = 0;

        const discountPercentage = ((boardPrice - salePrice) * 100 / boardPrice as number);

        if (discountPercentage > 0 && discountPercentage < 1) {
            discount = 1;
        } else {
            discount = +discountPercentage.toFixed(0);
        }

        priceBlock = (
            <>
                <div className="leading-4 text-2xs">
                    {(boardPrice > salePrice) && <span className="inline-block text-neutral-500 line-through whitespace-nowrap ml-2">
                        {numberWithCommas(boardPrice / 2)} {t('rial')}
                    </span>}

                    <div className="inline-block text-md font-semibold whitespace-nowrap">
                        {numberWithCommas(salePrice / 2)} {t('rial')}
                    </div>

                    <div className="block mt-1 mb-2"> برای هر شب </div>

                    <div className="text-neutral-500 leading-4">
                        {numberWithCommas(salePrice)} {t('rial')} برای 2 شب
                    </div>
                </div>

                {!!(discount>0) && <span className="bg-green-700 text-white rounded leading-7 inline-block mt-4 text-2xs px-2 select-none"> {discount}% {t('discount')} </span>}

            </>
        )

    } else if (hotel.salePrice) {
        priceBlock = (
            <div className="font-semibold whitespace-nowrap">
                {numberWithCommas(hotel.salePrice)} {t('rial')}
            </div>
        )
    }


    return (
        <div className='sm:px-2 rtl:rtl'>
            <a
                href={`${hotel.url}/checkin-${props.checkin}/checkout-${props.checkout}`}
                className='block outline-none'
                target='_blank'
                title={hotel.name}
            >
                <Image
                    onContextMenu={e => { e.preventDefault() }}
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    width={299}
                    height={128}
                    className='col-span-5 object-cover h-54 w-full rounded-2xl mb-2'
                />

                <div className="flex text-sm mb-1">
                    <b className="font-bold"> {hotel.reviewRating} از 100  </b>
                    <span className="mx-2">
                        {tag}
                    </span>
                    ({hotel.reviewCount} نظر)
                </div>

                <b className='block font-semibold leading-5 text-md'> {hotel.name} </b>
                <p className="mb-2 text-xs"> {hotel.city} </p>

                {priceBlock}

            </a>
        </div>
    )
}

export default WeekendHotelItem;