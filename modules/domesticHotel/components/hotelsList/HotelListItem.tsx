import { PricedHotelItem } from "../../types/hotel";
import Image from "next/image";
import { DefaultRoom, InfoCircle, Location, Loading } from "@/modules/shared/components/ui/icons";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Rating from "@/modules/shared/components/ui/Rating";
import HotelScore from "../shared/HotelScore";
import Button from "@/modules/shared/components/ui/Button";
import { useRouter } from 'next/router';
import { addSomeDays, dateFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import Tooltip from "@/modules/shared/components/ui/Tooltip";
import Skeleton from "@/modules/shared/components/ui/Skeleton";

type Props = {
    hotel: PricedHotelItem
}

const HotelListItem: React.FC<Props> = props => {

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

    if (!hotel.priceInfo || hotel.priceInfo === 'loading') {
        priceBlock = null;
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

                {!!discount && <span className="bg-green-700 text-white rounded-xl leading-7 text-2xs px-2 select-none"> {discount}% {t('discount')} </span>}

                <div className="flex gap-3 text-sm justify-end">
                    {(boardPrice > salePrice) && <span className="text-xs text-neutral-400 line-through whitespace-nowrap">
                        {numberWithCommas(boardPrice)} {t('rial')}
                    </span>}

                    <Tooltip
                        position="end"
                        title={
                            <div className="whitespace-nowrap">
                                {boardPrice >= 10000 || salePrice >= 10000 ? <>
                                    <div>
                                        {numberWithCommas(+(salePrice / nights).toFixed(0))} {t('rial')}
                                    </div>
                                    <small>
                                        {tHotel("Avg-per-night")}
                                    </small>
                                </> : <span>قیمت نیازمند استعلام است</span>}
                            </div>
                        }
                    >

                        {boardPrice >= 10000 || salePrice >= 10000 ?
                            <div className="font-semibold whitespace-nowrap">
                                {numberWithCommas(salePrice)} {t('rial')}
                            </div> :
                            <div className="whitespace-nowrap text-red-600 text-xs">
                                قیمت نیازمند استعلام است
                            </div>}

                    </Tooltip>

                </div>
                {boardPrice >= 10000 || salePrice >= 10000 ? (
                    <div className="text-xs text-neutral-400 leading-4">
                        {tHotel("price-for-nights", { nights: nights })}
                    </div>
                ) : null}
            </>
        )
    }

    let button: React.ReactNode = null;

    if (!hotel.priceInfo) {
        button = null;
    } else if (hotel.priceInfo === 'loading') {
        button = (
            <div className=" rtl:text-left ltr:text-right">
                <Loading className="w-10 h-10 fill-blue-400 inline-block animate-spin" />
                <p className="text-sm">
                    {tHotel('updating-prices')}
                </p>
            </div>
        )
    } else {

        const { boardPrice, salePrice } = hotel.priceInfo;

        button = (
            <Button
                hasArrow
                href={hotel.Url}
                target="_blank"
                className="rounded-lg h-10 px-5 text-sm w-full md:w-48"
            >
                {boardPrice >= 10000 || salePrice >= 10000 ? tHotel("see-rooms") : "درخواست رزرو"}
            </Button>
        )
    }

    return (
        <div
            key={hotel.CityId}
            className="grid md:grid-cols-3 mb-4 border border-neutral-200 bg-white rounded-lg relative"
        >
            <Link href={hotel.Url!} >
                {hotel.ImageUrl ? (
                    <Image
                        src={hotel.ImageUrl}
                        alt={hotel.ImageAlt || hotel.HotelName!}
                        width={288}
                        height={200}
                        className="md:col-span-1 h-48 object-cover w-full rtl:rounded-r-lg ltr:rounded-l-lg"
                    />
                ) : (
                    <div
                        className="md:col-span-1 bg-neutral-100 flex items-center justify-center h-full rtl:rounded-r-lg ltr:rounded-l-lg"
                    >
                        <DefaultRoom className="fill-neutral-300 w-32 h-32" />
                    </div>
                )}
            </Link>

            {!!hotel.IsPromotion && <span className="absolute bg-green-600 text-white right-3 top-3 rounded-xl leading-4 text-2xs py-1 px-2 select-none pointer-events-none"> پیشنهاد ویژه </span>}

            <div className="md:col-span-2 p-4 flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                    <Link href={hotel.Url!} className="font-bold text-neutral-700 rtl:ml-2 ltr:mr-2" >
                        {hotel.HotelCategoryName} {hotel.HotelName} {hotel.CityName}
                    </Link>

                    {hotel.HotelRating && <Rating number={hotel.HotelRating} inline className="align-middle rtl:ml-2 ltr:mr-2" />}

                    <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">
                        {hotel.HotelTypeName}
                    </span>

                    {!!hotel.Address && <p className="text-xs leading-4 my-2 text-neutral-400"><Location className="w-4 h-4 fill-neutral-400 inline-block" /> {hotel.Address} </p>}

                    {rate}

                    {!!hotel.IsCovid && (
                        <span className="bg-blue-50 rounded-xl leading-6 text-2xs px-2 select-none">اطلاعات ایمنی کووید-۱۹</span>
                    )}

                    {!hotel.priceInfo && <div className="bg-red-100 px-4 py-1 my-1">
                        <h5 className="text-red-600 text-sm font-semibold"> <InfoCircle className="w-4 h-4 fill-current inline-block" /> {tHotel("you-missed-this-deal")}</h5>
                        <p className="text-xs">{tHotel("we-dont-have-any-available-rooms-for-these-dates")}</p>
                    </div>}

                </div>

                <div className="flex flex-col justify-between sm:items-end">

                    <div className="rtl:text-left ltr:text-right">
                        {priceBlock}
                    </div>

                    {button}

                </div>

            </div>

        </div>
    )
}

export default HotelListItem;