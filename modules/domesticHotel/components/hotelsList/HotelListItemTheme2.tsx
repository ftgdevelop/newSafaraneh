import { PricedHotelItem } from "../../types/hotel";
import Image from "next/image";
import { DefaultRoom, InfoCircle, Location } from "@/modules/shared/components/ui/icons";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Rating from "@/modules/shared/components/ui/Rating";
import HotelScore from "../shared/HotelScore";
import { useRouter } from 'next/router';
import { addSomeDays, dateFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import Tooltip from "@/modules/shared/components/ui/Tooltip";
import Skeleton from "@/modules/shared/components/ui/Skeleton";

type Props = {
    hotel: PricedHotelItem;
    index: number;
}

const HotelListItemTheme2: React.FC<Props> = props => {

    const { t } = useTranslation("common");
    const { t: tHotel } = useTranslation("hotel");
    const { hotel } = props;

    const router = useRouter();
    const { asPath } = router;

    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;
    let searchInfo = '';
    let nights = 1;

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0];
        searchInfo = `/checkin-${checkin}/checkout-${checkout}`;
        nights = getDatesDiff(new Date(checkout), new Date(checkin));
    }

    let rate: React.ReactNode = null;
    if (!hotel.ratesInfo) {
        rate = null;
    } else if (hotel.ratesInfo === "loading") {
        rate = <Skeleton />
    } else {
        rate = <HotelScore
            reviews={hotel.ratesInfo.TotalRowCount}
            score={hotel.ratesInfo.Satisfaction}
            small
            className="text-md"
        />
    }

    let priceBlock: React.ReactNode = null;

    if (hotel.priceInfo === "notPriced" || hotel.priceInfo === 'loading') {

        priceBlock = null;

    } else if (hotel.priceInfo === "need-to-inquire") {

        priceBlock = <div className="whitespace-nowrap text-red-500 text-xs"> قیمت نیازمند استعلام است </div>

    } else {

        const { boardPrice, salePrice } = hotel.priceInfo;

        let discount: number = 0;

        const discountPercentage = ((boardPrice - salePrice) * 100 / boardPrice);

        if (discountPercentage > 0 && discountPercentage < 1) {
            discount = 1;
        } else {
            discount = +discountPercentage.toFixed(0);
        }

        priceBlock = (
            <>

                {!!discount && <div><span className="bg-green-700 text-white rounded-xl leading-7 text-2xs px-2 select-none"> {discount}% {t('discount')} </span></div>}

                {(boardPrice > salePrice) && <span className="text-xs inline-block text-neutral-500 line-through whitespace-nowrap">
                    {numberWithCommas(boardPrice)} {t('rial')}
                </span>}

                <Tooltip
                    className="inline-block text-sm rtl:mr-2 ltr:ml-2"
                    position="end"
                    title={
                        <div className="whitespace-nowrap">

                            {numberWithCommas(+(salePrice / nights).toFixed(0))} {t('rial')}

                            <br />

                            <small> {tHotel("Avg-per-night")} </small>

                        </div>
                    }
                >

                    <div className="font-semibold whitespace-nowrap">
                        {numberWithCommas(salePrice)} {t('rial')}
                    </div>

                </Tooltip>

                <div className="text-xs text-neutral-500 leading-4">
                    {tHotel("price-for-nights", { nights: nights })}
                </div>
            </>
        )
    }

    return (
        <Link
            target="_blank"
            href={hotel.Url! + searchInfo}
            key={hotel.CityId}
            className="grid md:grid-cols-4 mb-4 border border-neutral-200 bg-white rounded-2xl overflow-hidden relative"
        >
            <div className="bg-travel-pattern">
                {hotel.ImageUrl ? (
                    <Image
                        src={hotel.ImageUrl}
                        alt={hotel.ImageAlt || hotel.HotelName!}
                        width={288}
                        height={200}
                        onContextMenu={(e) => e.preventDefault()}
                        priority={!props.index}
                        className="object-cover h-full w-full max-lg:rounded-t-lg lg:rtl:rounded-r-lg lg:ltr:rounded-l-lg"
                    />
                ) : (
                    <div
                        className="bg-neutral-100 flex items-center justify-center h-full max-lg:rounded-t-lg lg:rtl:rounded-r-lg lg:ltr:rounded-l-lg"
                    >
                        <DefaultRoom className="fill-neutral-300 w-32 h-32" />
                    </div>
                )}
            </div>

            {!!hotel.IsPromotion && <span className="absolute bg-green-600 text-white right-3 top-3 rounded-xl leading-4 text-2xs py-1 px-2 select-none pointer-events-none"> پیشنهاد ویژه </span>}


            <div className="md:col-span-3 p-3 max-md:pb-0">

                <div className="font-bold text-neutral-700 rtl:ml-2 ltr:mr-2" > {hotel.HotelCategoryName} {hotel.HotelName} {hotel.CityName} </div>

                {!!hotel.HotelRating && <Rating number={hotel.HotelRating} inline className="align-middle rtl:ml-2 ltr:mr-2" />}

                <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">
                    {hotel.HotelTypeName}
                </span>

                {!!hotel.Address && <p className="text-xs leading-4 my-2 text-neutral-400"><Location className="w-4 h-4 fill-neutral-400 inline-block" /> {hotel.Address} </p>}

                {!!hotel.IsCovid && (
                    <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">اطلاعات ایمنی کووید-۱۹</span>
                )}

                {hotel.priceInfo === "notPriced" && <div className="bg-red-100 px-4 py-1 my-1">
                    <h5 className="text-red-600 text-sm font-semibold"> <InfoCircle className="w-4 h-4 fill-current inline-block" /> {tHotel("you-missed-this-deal")}</h5>
                    <p className="text-xs">{tHotel("we-dont-have-any-available-rooms-for-these-dates")}</p>
                </div>}


                <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                    <div>
                        {rate}
                    </div>
                    <div className="rtl:text-left ltr:text-right">
                        {priceBlock}
                    </div>

                </div>

            </div>

        </Link>
    )
}

export default HotelListItemTheme2;