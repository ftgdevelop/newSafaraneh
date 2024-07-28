import { GetAirportsByCode, GetAvailabilityKey, GetFlightList } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/SidebarFilters";
import { FlightType, FlightSearchDefaultValues, FlightSortFactorType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/shared/store";
import { SidebarFilterChange } from "@/modules/flights/templates/SidebarFilterChange";
import { SortHightestPrice, SortCapacity, SortTime } from "@/modules/flights/templates/SortFlightItem";
import { addSomeDays, checkDateIsAfterDate, dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";
import ProgressBarWithLabel from "@/modules/shared/components/ui/ProgressBarWithLabel";
import { useTranslation } from "next-i18next";
import Pagination from "@/modules/shared/components/ui/Pagination";
import Head from "next/head";
import { setCabinClassFilter } from "@/modules/flights/store/flightsSlice";

import { CalendarError, Close } from "@/modules/shared/components/ui/icons";
import SearchForm from "@/modules/flights/components/shared/searchForm";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";

import NoItemFilter from "@/modules/flights/components/flightList/NoItemFilter";
import NoItemDate from "@/modules/flights/components/flightList/NoItemDate";
import ChangeDay from "@/modules/flights/components/flightList/ChangeDay";
import FlightItem from "@/modules/flights/components/flightItem/FlightItem";
import SearchData from "@/modules/flights/components/flightList/SearchData";
import SortFlights from "@/modules/flights/components/flightList/SortFlights";
import { WebSiteDataType } from "@/modules/shared/types/common";
import NotFound from "@/modules/shared/components/ui/NotFound";
import AvailabilityTimeout from "@/modules/shared/components/AvailabilityTimeout";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import LoginLinkBanner from "@/modules/shared/components/theme2/LoginLinkBanner";


type Airport = {
    name?: string;
    city: {
        name: string;
        code: string;
    };
    country: {
        name: string;
        code: string;
    };
    code?: string;
    latitude?: string;
    longitude?: string;
    airportType: "Main" | "Subsidiary" | "City";
}

const Flights: NextPage = ({ airports, routeCodes, portalData, moduleDisabled }: { airports?: Airport[], routeCodes?: string, portalData?: WebSiteDataType; moduleDisabled?: boolean; }) => {

    const dispatch = useDispatch()
    const { t } = useTranslation("common");
    const { t: tFlight } = useTranslation("flight");

    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    let [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>()
    let [sortFlights, setSortFlights] = useState<FlightSortFactorType>('LowestPrice')
    let [fetchDataCompelete, setFetchDataCompelte] = useState(false)
    let [showSkeleton, setShowSkeleton] = useState(false);

    let [showSearchForm, setShowSearchForm] = useState<boolean>(false)

    const [page, setPage] = useState(1)
    const firstItemIndex = (page - 1) * 10;
    const lastItem = page * 10;
    const [key, setKey] = useState<string>("");

    const [departureList, setDepartureList] = useState<any>([]);

    const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

    const [showChangeDateModal, setShowChangeDateModal] = useState<boolean>(false);

    const router = useRouter();

    const { query, locale } = router;

    const passengers = {
        adults: +(query.adult || 0),
        children: +(query.child || 0),
        infants: +(query.infant || 0)
    }


    useEffect(() => {

        let departureDate;
        let returnDate;

        if (query.departing) {
            departureDate = new Date(query.departing as string);
        }
        if (query.returning) {
            returnDate = new Date(query.returning as string);
        }

        const today = dateFormat(new Date());
        const tomorrow = dateFormat(addSomeDays(new Date()));

        if (!departureDate) {
            return;
        }

        //setShowOnlyForm(false);

        let validDates: boolean;

        if (returnDate) {
            validDates = checkDateIsAfterDate(new Date(departureDate), new Date(today)) && checkDateIsAfterDate(new Date(returnDate), new Date(tomorrow));
        } else {
            validDates = checkDateIsAfterDate(new Date(departureDate), new Date(today));
        }


        if (!validDates) {
            setShowChangeDateModal(true);
        }
    }, [query.departing, query.returning]);

    useEffect(() => {
        SidebarFilterChange(departureList, SidebarFilter, setFlightsInFilter)
    }, [SidebarFilter])

    useEffect(() => {
        setFlightsInFilter(departureList)
    }, [departureList])

    useEffect(() => {
        setPage(1)
    }, [SidebarFilter])

    const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";

    const fetchKey = async (codes?: string) => {

        if (!codes) return;

        setShowSkeleton(true);
        setShowSearchForm(false);
        setKey("");

        let departureDate = dateFormat(new Date());
        let returnDate: string = "";
        if (query.departing) {
            departureDate = dateFormat(new Date(query.departing as string));
        }
        if (query.returning) {
            returnDate = dateFormat(new Date(query.returning as string));
        }

        const parameters: {
            adult: number;
            child: number;
            infant: number;
            departureCode: string;
            returnCode: string;
            departureTime: string;
            retrunTime?: string;
        } = {
            adult: query.adult ? +query.adult : 1,
            child: query.child ? +query.child : 0,
            infant: query.infant ? +query.infant : 0,
            departureCode: codes.split("-")[0],
            returnCode: codes.split("-")[1],
            departureTime: departureDate
        };

        if (returnDate) {
            parameters.retrunTime = returnDate;
        }
        const token = localStorage.getItem('Token') || "";
        const response: any = await GetAvailabilityKey(parameters, token, acceptLanguage);

        if (response?.data?.result) {
            setKey(response.data.result);

            setLoadingPercentage(40);
        }
    }

    useEffect(() => {

        setLoadingPercentage(0);

        setTimeout(() => {
            setLoadingPercentage(10);
        }, 100);

        if (routeCodes) {
            fetchKey(routeCodes);
        }
        if (query.flightType && !SidebarFilter.cabinClassOption.includes((query.flightType as string))) {
            dispatch(setCabinClassFilter(SidebarFilter.cabinClassOption.concat(query.flightType)))
        }
    }, [router.asPath]);


    useEffect(() => {

        let fetchInterval: any = null;

        if (key) {

            const fetchData = async () => {

                const token = localStorage.getItem('Token') || "";

                const response: any = await GetFlightList({ key: key, currency: "IRR", token: token }, acceptLanguage);

                setShowSkeleton(false);

                if (response?.data?.result?.isCompleted) {

                    const result = response?.data?.result;
                    setFetchDataCompelte(result.isCompleted)

                    setDepartureList(result.departureFlights);

                    clearInterval(fetchInterval);

                    setLoadingPercentage(99);

                    setTimeout(() => {
                        setLoadingPercentage(100);
                    }, 1500);

                } else {
                    setLoadingPercentage(prevValue => {
                        if (prevValue < 80) {
                            return (prevValue + 20);
                        }
                        return (prevValue + 3);
                    });
                }
            }

            fetchData();

            fetchInterval = setInterval(() => {

                fetchData();

            }, 3000);
        }

        return () => {
            clearInterval(fetchInterval);
        };

    }, [key]);


    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }


    let origin: string = "";
    let destination: string = "";

    let defaultValues: FlightSearchDefaultValues | undefined = undefined;
    if (airports && routeCodes) {
        const originCode = routeCodes.split("-")[0];
        const destinationCode = routeCodes.split("-")[1];

        const originObject = airports.find(item => item.code === originCode);
        const destinationObject = airports.find(item => item.code === destinationCode);

        origin = originObject?.city.name || "";
        destination = destinationObject?.city.name || "";

        if (originObject && destinationObject) {

            defaultValues = {
                originCode: originCode,
                destinationCode: destinationCode,
                airTripType: query.returning ? "RoundTrip" : "OneWay",
                adult: +(query.adult || 0),
                child: +(query.child || 0),
                infant: +(query.infant || 0),
                cabinClassCode: (query.flightType as string) || "All",
                departureDate: query.departing as string || "",
                returnDate: query.returning as string || undefined,
                originObject: {
                    airportType: originObject.airportType,
                    city: {
                        code: originObject.city.code,
                        name: originObject.city.name
                    },
                    code: originObject.code || "",
                    name: originObject.name || ""
                },
                destinationObject: {
                    airportType: destinationObject.airportType,
                    city: {
                        code: destinationObject.city.code,
                        name: destinationObject.city.name
                    },
                    code: destinationObject.code || "",
                    name: destinationObject.name || ""
                }
            }
        }


    }

    const siteName = portalData?.billing.name || "";

    const research = () => {
        fetchKey(routeCodes);
    }

    const theme2 = process.env.THEME === "THEME2";

    return (
        <>
            <Head>
                {!!(destination && origin) && (
                    <>
                        <title>{tFlight("flight-list-title", { origin: origin, destination: destination, siteName: siteName })}</title>
                        <meta name="description" content={tFlight("flight-list-description", { origin: origin, destination: destination, siteName: siteName })} />
                    </>
                )}
            </Head>

            <ModalPortal
                show={showChangeDateModal}
                selector='modal_portal'
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">

                    <div className="bg-white max-sm:mx-3 rounded-xl px-5 pt-10 pb-12 w-full max-w-md text-center">

                        <CalendarError className="w-6 h-6 sm:w-10 sm:h-10 fill-neutral-400 mb-3 md:mb-4 inline-block" />

                        <h5 className="text-md sm:text-xl font-semibold mb-4">
                            {t("DatesAreExpired")}
                        </h5>

                        <div className="text-neutral-500 mb-4 md:mb-7 leading-7 text-sm text-center">
                            {t("SorryTheDatesYouEnteredAreExpiredChooseDifferentDatesToViewHotelOptions")}.
                        </div>


                        <button
                            type="button"
                            className="max-w-full w-32 cursor-pointer bg-primary-700 hover:bg-primary-600 text-white h-10 px-5 rounded-md"
                            onClick={() => {
                                setShowChangeDateModal(false);
                                setShowSearchForm(true);
                            }}
                        >
                            {t('ChangeDates')}
                        </button>

                        <br />

                        <button
                            type='button'
                            className='text-blue-500 mt-3'
                            onClick={() => { setShowChangeDateModal(false) }}
                        >
                            {t("ContinueAnyway")}
                        </button>


                    </div>

                </div>

            </ModalPortal>

            <div className="max-w-container m-auto p-5 max-md:p-3 gap-5 relative grid grid-cols-1 lg:grid-cols-4">

                {theme2 && (
                    <SearchForm
                        wrapperClassName="lg:col-span-4"
                        defaultValues={defaultValues}
                        research={research}
                    />
                )}

                <FlightSidebarFilters FlightsData={departureList} flightsInFilterLengths={flightsInFilter?.length} />

                <div className="lg:col-span-3">

                    {!theme2 && <SearchData
                        showSearchForm={() => { setShowSearchForm(true) }}
                        airports={airports}
                    />}

                    <div className={theme2?"md:flex md:justify-between":""}>

                        <ChangeDay />

                        {!!flightsInFilter?.length && <SortFlights sortFactor={sortFlights}  setSortFactor={setSortFlights} /> }
                        
                    </div>


                    {!!query.returning && <p className="text-sm mt-5" > ابتدا از لیست زیر، بلیط رفت خود را انتخاب نمایید</p>}


                    {(!theme2 && departureList.length) && (
                        <Pagination
                            totalItems={flightsInFilter?.length || 0}
                            itemsPerPage={10}
                            onChange={setPage}
                            currentPage={page}
                            wrapperClassName="mt-5"
                        />
                    )}

                    {
                        !(loadingPercentage === 100) && <ProgressBarWithLabel
                            percentage={loadingPercentage}
                            label={tFlight('getting-best-suggestion')}
                            className="mt-5"
                        />
                    }

                    {!!showSkeleton && (
                        <>
                            {[1,2,3,4,5].map(skeletonItem => (
                                <div className="bg-white border my-5 grid grid-cols-4" key={skeletonItem}>
                                    <div className="col-span-3 p-5 rtl:border-l border-dotted border-neutral-300">
                                        <Skeleton className="w-1/2" />
                                        <Skeleton className="my-3 w-3/4" />
                                        <Skeleton className="w-12" />
                                    </div>
                                    
                                    <div className="rtl:ltr p-5">
                                        <Skeleton className="w-2/3" />
                                        <Skeleton className="my-3 w-full" />
                                        <Skeleton className="w-1/3" />
                                    </div>

                                </div>
                            ) )}
                        </>
                    ) }

                    {!!theme2 && <LoginLinkBanner wrapperClassName="mt-3" message='وقتی وارد سیستم شوید همیشه بهترین قیمت‌های ما را دریافت خواهید کرد!' />}

                    {
                        flightsInFilter?.sort((a, b) => SortCapacity(a, b))
                            .sort((a: FlightType, b: FlightType): any => {
                                if (sortFlights == "HighestPrice") return SortHightestPrice(a, b)
                                else if (sortFlights == "Time") return SortTime(a, b)
                                else {
                                    return a.capacity && a.adultPrice - b.adultPrice
                                }
                            }).slice(firstItemIndex, lastItem).map((flight: FlightType) =>
                                <FlightItem passengers={passengers} flightData={flight} key={flight.flightKey} />
                            )
                    }
                    {
                        departureList.length ? <Pagination
                            totalItems={flightsInFilter?.length || 0}
                            itemsPerPage={10}
                            onChange={setPage}
                            currentPage={page}
                            wrapperClassName="mt-5"
                        /> : null
                    }




                    {
                        fetchDataCompelete && !departureList.length &&
                        <NoItemDate />
                    }
                    {
                        !flightsInFilter?.length && departureList.length && loadingPercentage == 100 ?
                            <NoItemFilter /> : null
                    }



                    <ModalPortal
                        selector="modal_portal"
                        show={showSearchForm}
                    >
                        <div className='fixed top-0 left-0 h-screen w-screen'>
                            <div className='absolute left-0 right-0 top-0 bottom-0 bg-black/50 backdrop-blur'
                                onClick={() => { setShowSearchForm(false) }}
                            />

                            <div className="max-w-container mx-auto relative sm:p-5 sm:pt-20">

                                <div className="sm:rounded-md p-3 max-sm:h-screen max-sm:overflow-auto sm:p-5 w-full bg-black/75 relative text-white" >
                                    <div className="font-semibold mb-3 sm:text-lg">
                                        تغییر جستجو
                                    </div>

                                    <button
                                        type='button'
                                        className='absolute top-3 left-3'
                                        onClick={() => { setShowSearchForm(false) }}
                                    >
                                        <Close className='w-8 h-8 fill-neutral-400' />
                                    </button>

                                    <SearchForm
                                        defaultValues={defaultValues}
                                        research={research}
                                    />

                                </div>
                            </div>

                        </div>
                    </ModalPortal>
                </div>
            </div>

            {!!key && (
                <AvailabilityTimeout
                    minutes={10}
                    onRefresh={() => { window.location.reload() }}
                    type='flight'
                    description={tFlight("flightTimeoutMessage")}
                />
            )}
        </>
    )
}

export default Flights;

export async function getServerSideProps(context: any) {

    if (!process.env.PROJECT_MODULES?.includes("DomesticFlight")) {
        return (
            {
                props: {
                    ...await serverSideTranslations(context.locale, ['common']),
                    moduleDisabled: true
                },
            }
        )
    }

    const { locale, query } = context;

    const acceptLanguage = locale === "en" ? "en-US" : locale === "ar" ? "ar-AE" : "fa-IR";

    const codesArray = query.flights?.split("-");

    let airports;

    if (codesArray.length) {
        const response: any = await GetAirportsByCode(codesArray, acceptLanguage);
        if (response?.data?.result?.items) {
            airports = response.data.result.items;
        }
    }

    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'flight'])),
            airports: airports || null,
            routeCodes: query.flights || null
        },
    });
}