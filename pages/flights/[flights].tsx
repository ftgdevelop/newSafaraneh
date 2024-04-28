import { GetAirportsByCode, GetAvailabilityKey, GetFlightList } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/FlightSidebarFilters";
import { FlightType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import FlightSearchData from "@/modules/flights/components/FlightSearchData";
import FlightSortFlights from "@/modules/flights/components/FlightSortFlights";
import FlightsFlightItem from "@/modules/flights/components/flightItem/FlightFlightItem";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/shared/store";
import { SidebarFilterChange } from "@/modules/flights/templates/SidebarFilterChange";
import { SortHightestPrice, SortCapacity, SortTime } from "@/modules/flights/templates/SortFlightItem";
import FlightsSearchChange from "@/modules/flights/components/FlightSearchChange";
import { dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";
import ProgressBarWithLabel from "@/modules/shared/components/ui/ProgressBarWithLabel";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { PortalDataType } from "@/modules/shared/types/common";

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

const Flights: NextPage<any> = ({ airports, routeCodes , portalData }: { airports: Airport[], routeCodes: string , portalData?:PortalDataType }) => {
    
    const {t:tFlight} = useTranslation("flight");

    const SidebarFilter = useSelector((state: RootState) => state.flightFilters.filterOption)
    let [flightsInFilter, setFlightsInFilter] = useState<FlightType[]>()
    let [sortFlights, setSortFlights] = useState('LowestPrice')
    let [fetchDataCompelete, setFetchDataCompelte] = useState(false)

    const [page, setPage] = useState(1)
    const firstItemIndex = (page - 1) * 10;
    const lastItem = page * 10;
    const [key, setKey] = useState<string>("");

    const [departureList, setDepartureList] = useState<any>([]);

    const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

    const router = useRouter();

    const { query, locale } = router;

    const passengers = {
        adults:+(query.adult || 0),
        children:+(query.child || 0),
        infants:+(query.infant || 0)
    }

    useEffect(() => {
        SidebarFilterChange(departureList, SidebarFilter, setFlightsInFilter)
    }, [SidebarFilter])

    useEffect(() => {
        setFlightsInFilter(departureList)
    }, [departureList])

    const acceptLanguage = locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-AE" : "en-US";

    useEffect(() => {

        setLoadingPercentage(0);

        setTimeout(()=>{
            setLoadingPercentage(10);
        },100);

        const fetchKey = async (codes: string) => {

            let departureDate  = dateFormat(new Date());
            let returnDate : string = "";  
            if(query.departing){
                departureDate = dateFormat(new Date(query.departing as string));
            }
            if(query.returning){
                returnDate = dateFormat(new Date(query.returning as string));
            }

            const parameters : {
                adult:number;
                child:number;
                infant:number;
                departureCode:string;
                returnCode:string;
                departureTime:string;
                retrunTime?: string;
            } = {
                adult: query.adult ? +query.adult : 1,
                child: query.child ? +query.child : 0,
                infant: query.infant ? +query.infant : 0,
                departureCode: codes.split("-")[0],
                returnCode: codes.split("-")[1],
                departureTime: departureDate
            };

            if (returnDate){
                parameters.retrunTime = returnDate;
            }
            const token = localStorage.getItem('Token') || "";
            const response: any = await GetAvailabilityKey(parameters, token , acceptLanguage);

            if (response?.data?.result) {
                setKey(response.data.result);
                
                setLoadingPercentage(40);
            }
        }

        if (routeCodes) {
            fetchKey(routeCodes);
        }

    }, [router.asPath]);



    useEffect(() => {

        let fetchInterval: any = null;

        if (key) {

            const fetchData = async () => {
                
                const token = localStorage.getItem('Token') || "";

                const response: any = await GetFlightList({key:key, currency:"IRR",token:token}, acceptLanguage);

                if (response?.data?.result?.isCompleted) {

                    const result = response?.data?.result;
                    setFetchDataCompelte(result.isCompleted)
                    
                    setDepartureList(result.departureFlights);

                    clearInterval(fetchInterval);

                    setLoadingPercentage(99);

                    setTimeout(()=>{
                        setLoadingPercentage(100);
                    }, 1500);

                }else{
                    setLoadingPercentage(prevValue => {
                        if (prevValue < 80){
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

    let origin:string ="";
    let destination:string = "";
    if(airports && routeCodes){
        const originCode = routeCodes.split("-")[0];
        const destinationCode = routeCodes.split("-")[1];
        origin = airports.find(item => item.code === originCode)?.city.name || "";
        destination = airports.find(item => item.code === destinationCode)?.city.name || "";
    }

    const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";

    return (
    <>
        <Head>            
            {!!(destination && origin) && (
            <>
                <title>{tFlight("flight-list-title",{ origin:origin, destination: destination, siteName:siteName})}</title>
                <meta name="description" content={tFlight("flight-list-description",{origin:origin, destination: destination, siteName:siteName })} />
            </>
            )}
        </Head>

        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5 relative">
            <FlightSidebarFilters FlightsData={departureList} flightsInFilterLengths={flightsInFilter?.length} />
            <div className="w-3/4 max-lg:w-full">
                
                <FlightSearchData FlightsData={departureList} airports={airports} />
                <FlightMainFilters />
                {
                    flightsInFilter?.length ?
                    <FlightSortFlight sortFlights={sortFlights} changeSortFlights={(e: string) => setSortFlights(e)} />: null
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
                />: null
                }
                {
                    fetchDataCompelete && !departureList.length && 
                    <FlightNoItemDate />
                }
                {
                     !flightsInFilter?.length && departureList.length && loadingPercentage == 100 ?
                    <FlightNoItemFilter />:null
                }
                <FlightsSearchChange airports={airports} />
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
            ...await (serverSideTranslations(context.locale, ['common','flight'])),
            airports: airports || null,
            routeCodes: query.flights || null
        },
    });
}