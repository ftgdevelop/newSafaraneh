import { GetAirportsByCode, GetAvailabilityKey, GetFlightList } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/FlightSidebarFilters";
import { FlightSearchDefaultValues, FlightType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import FlightSearchData from "@/modules/flights/components/FlightSearchData";
import FlightSortFlights from "@/modules/flights/components/FlightSortFlights";
import FlightsFlightItem from "@/modules/flights/components/flightItem/FlightFlightItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/shared/store";
import { SidebarFilterChange } from "@/modules/flights/templates/SidebarFilterChange";
import { SortHightestPrice, SortCapacity, SortTime } from "@/modules/flights/templates/SortFlightItem";
import { dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";
import ProgressBarWithLabel from "@/modules/shared/components/ui/ProgressBarWithLabel";
import { useTranslation } from "next-i18next";
import Pagination from "@/modules/shared/components/ui/Pagination";
import Head from "next/head";
import { PortalDataType } from "@/modules/shared/types/common";
import FlightNoItemFilter from "@/modules/flights/components/FlightNoItemFilter";
import FlightMainFilters from "@/modules/flights/components/FlightMainFilter";
import FlightNoItemDate from "@/modules/flights/components/FlightNoItemDate";
import { setCabinClassFilter } from "@/modules/flights/store/flightsSlice";
import { Close } from "@/modules/shared/components/ui/icons";
import SearchForm from "@/modules/flights/components/shared/searchForm";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";


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

const Flights: NextPage<any> = ({ airports, routeCodes, portalData }: { airports: Airport[], routeCodes: string, portalData?: PortalDataType }) => {
    const dispatch = useDispatch()
    const { t: tFlight } = useTranslation("flight");

    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    let [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>()
    let [sortFlights, setSortFlights] = useState('LowestPrice')
    let [fetchDataCompelete, setFetchDataCompelte] = useState(false)

    let [showSearchForm, setShowSearchForm] = useState<boolean>(false)

    const [page, setPage] = useState(1)
    const firstItemIndex = (page - 1) * 10;
    const lastItem = page * 10;
    const [key, setKey] = useState<string>("");

    const [departureList, setDepartureList] = useState<any>([]);

    const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

    const router = useRouter();

    const { query, locale } = router;

    const passengers = {
        adults: +(query.adult || 0),
        children: +(query.child || 0),
        infants: +(query.infant || 0)
    }

    useEffect(() => {
        SidebarFilterChange(departureList, SidebarFilter, setFlightsInFilter)
    }, [SidebarFilter])

    useEffect(() => {
        setFlightsInFilter(departureList)
    }, [departureList])

    useEffect(() => {
        setPage(1)
    }, [SidebarFilter])

    const acceptLanguage = locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-AE" : "en-US";

    const fetchKey = async (codes: string) => {

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
        if (query.flightType) {
            dispatch(setCabinClassFilter(SidebarFilter.cabinClassOption.concat(query.flightType)))
        }
    }, [router.asPath]);


    useEffect(() => {

        let fetchInterval: any = null;

        if (key) {

            const fetchData = async () => {

                const token = localStorage.getItem('Token') || "";

                const response: any = await GetFlightList({ key: key, currency: "IRR", token: token }, acceptLanguage);

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
                cabinClassCode: (query.flightType as string) || "all",
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

    const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";


    const research = () => {
        fetchKey(routeCodes);
    }

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

            <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5 relative">
                
                <FlightSidebarFilters FlightsData={departureList} flightsInFilterLengths={flightsInFilter?.length} />

                <div className="w-3/4 max-lg:w-full">

                    <FlightSearchData airports={airports} showSearchForm={()=>{setShowSearchForm(true)}} />
                    
                    <FlightMainFilters />
                    {
                        flightsInFilter?.length ?
                            <FlightSortFlights sortFlights={sortFlights} changeSortFlights={(e: string) => setSortFlights(e)} /> : null
                    }

                    {!!query.returning && <p className="text-sm mt-5" > ابتدا از لیست زیر، بلیط رفت خود را انتخاب نمایید</p>}

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
                        !(loadingPercentage === 100) && <ProgressBarWithLabel
                            percentage={loadingPercentage}
                            label={tFlight('getting-best-suggestion')}
                            className="mt-5"
                        />
                    }
                    {
                        flightsInFilter?.sort((a, b) => SortCapacity(a, b))
                            .sort((a: FlightType, b: FlightType): any => {
                                if (sortFlights == "HighestPrice") return SortHightestPrice(a, b)
                                else if (sortFlights == "Time") return SortTime(a, b)
                                else {
                                    return a.capacity && a.adultPrice - b.adultPrice
                                }
                            }).slice(firstItemIndex, lastItem).map((flight: FlightType) =>
                                <FlightsFlightItem passengers={passengers} flightData={flight} key={flight.flightKey} />
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
                        <FlightNoItemDate />
                    }
                    {
                        !flightsInFilter?.length && departureList.length && loadingPercentage == 100 ?
                            <FlightNoItemFilter /> : null
                    }


                    {/* <FlightsSearchChange airports={airports} /> */}

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
        </>
    )
}

export default Flights;

export async function getServerSideProps(context: any) {

    const { locale, query } = context;

    const acceptLanguage = locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-AE" : "en-US";

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