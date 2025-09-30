import { useTranslation } from 'next-i18next';
import { useEffect, useState, useMemo, useRef } from 'react';

import { DomesticHotelSimilarHotel, ExtendedDomesticHotelSimilarHotel } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import { InfoCircle, LeftCaret, RightCaret } from '@/modules/shared/components/ui/icons';
import { addSomeDays, dateFormat, getDatesDiff } from '@/modules/shared/helpers';
import { AvailabilityByHotelId, getRates } from '../../actions';
import SimilarHotelItemTheme2 from './SimilarHotelItemTheme2';
import Slider from 'react-slick';

type Props = {
    similarHotels?: DomesticHotelSimilarHotel[];
}

type RatesResponseItem = {
    HotelId: number;
    Satisfaction: number;
    PositiveRowCount: number;
    TotalRowCount: number;
}

type PricesResponseItem = {
    id: number;
    salePrice: number;
    boardPrice: number;
    availablityType?: "Online"| "Offline"| "Request"| "Completion";
    promotions?: {
        name?: string;
        description?: string;
    }[];
}

const SimilarHotelsNew: React.FC<Props> = props => {

    const { similarHotels } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const [isInView, setIsInView] = useState<boolean>(false);

    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;
    let searchInfo = '';

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0];
        searchInfo = `/checkin-${checkin}/checkout-${checkout}`;
    }

    const nights = getDatesDiff(new Date(checkin), new Date(checkout));

    const isSafaraneh = process.env.PROJECT === "SAFARANEH";
    const isSafarlife = process.env.PROJECT === "SAFARLIFE";

    const [ratesData, setRatesData] = useState<RatesResponseItem[] | undefined>();
    const [ratesLoading, setRatesLoading] = useState<boolean>(false);

    const [pricesData, setPricesData] = useState<PricesResponseItem[] | undefined>();
    const [pricesLoading, setPricesLoading] = useState<boolean>(false);
    
    const wrapperRef = useRef<HTMLDivElement>(null);

    const checkIsInView = () => {
        const targetTop = wrapperRef.current?.getBoundingClientRect().top;
        if (targetTop && targetTop < 62) {

            setIsInView(true);

            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);

        }
    }

    const hotelIds = useMemo(() => similarHotels?.map(item => item.id!)
        , [similarHotels]);

    const fetchRates = async (ids: number[]) => {

        setRatesLoading(true);
        setRatesData(undefined);

        const ratesResponse: { data?: RatesResponseItem[] } = await getRates(ids, "fa-IR");

        if (ratesResponse?.data) {
            setRatesData(ratesResponse.data);
        }

        setRatesLoading(false);
    }

    const fetchPrices = async (ids: number[]) => {
        setPricesLoading(true);
        setPricesData(undefined);

        const token = localStorage.getItem('Token') || "";
        
        const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: ids, userToken: token });

        if (pricesResponse.data?.result?.hotels) {
            setPricesData(pricesResponse.data.result.hotels);
        }
        setPricesLoading(false);
    }

    useEffect(() => {
        if (isInView && hotelIds?.length) {
            fetchPrices(hotelIds);
            fetchRates(hotelIds);
        }
    }, [hotelIds, isInView]);


    useEffect(() => {
        document.addEventListener('scroll', checkIsInView);
        window.addEventListener("resize", checkIsInView);

        return (() => {
            document.removeEventListener('scroll', checkIsInView);
            window.removeEventListener("resize", checkIsInView);
        });
    }, []);

    if (!similarHotels?.length) {
        return null;
    }

    const hotels: ExtendedDomesticHotelSimilarHotel[] = similarHotels?.map(hotel => {

        const HotelRateData = ratesData?.find(item => item.HotelId === hotel.id);
        const ratesInfo = !isSafaraneh ? undefined : HotelRateData ? { Satisfaction: HotelRateData.Satisfaction, TotalRowCount: HotelRateData.TotalRowCount } : (ratesLoading || !ratesData) ? "loading" : undefined;

        const hotelPriceData = pricesData?.find(item => item.id === hotel.id);

        let priceInfo: "loading" | "notPriced" | { boardPrice: number, salePrice: number; availablityType?: "Online"| "Offline"| "Request"| "Completion" };

        if (!pricesData || pricesLoading) {
            priceInfo = "loading";
        } else if (!hotelPriceData) {
            priceInfo = "notPriced";
        } else {
            priceInfo = { boardPrice: hotelPriceData.boardPrice, salePrice: hotelPriceData.salePrice, availablityType:hotelPriceData.availablityType  }
        }

        return ({
            ...hotel,
            ratesInfo: ratesInfo,
            priceInfo: priceInfo,
            promotions: hotelPriceData?.promotions
        })
    }) || [];




    //for slider style:
    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <RightCaret />,
        prevArrow: <LeftCaret />,
        customPaging: function () {
            return (
                <a className='w-3.5 h-3.5 border-2 border-neutral-500 inline-block rounded-full' />
            );
        },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    return (

        <div id='similarhotels_section' className="max-w-container mx-auto px-3 sm:px-5 py-7 md:py-10" ref={wrapperRef}>

            {!isSafarlife && <h2 className='text-center text-lg lg:text-3xl font-semibold mb-3' > {tHotel('similar-hotels')} </h2>}
            
            <p className={`mb-3 md:mb-7 ${isSafarlife?"font-semibold":"text-center text-neutral-700"}`} > {tHotel('you-might-be-interested-this-hotels')} </p>

            {(hotels?.length) ? (
                <div className='-mx-2'>
                    <Slider
                        {...settings}
                    >
                        {hotels.filter(hotel => hotel.priceInfo !== 'notPriced').map(hotel => (
                            <div className='px-2' key={hotel.id} dir="rtl">
                                <SimilarHotelItemTheme2 
                                    searchInfo={searchInfo} 
                                    nights={nights} 
                                    loadingPrice={pricesLoading || !isInView} 
                                    hotel={hotel}  
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className='bg-white p-5 rounded-xl flex gap-2 items-center'>
                    <InfoCircle className='w-5 h-5 fill-current' />
                    {tHotel('no-similar-hotels')}
                </div>
            )}

        </div>
    )
}

export default SimilarHotelsNew;

