import { Bus, ServerAddress } from "@/enum/url";
import { GetAvailabilityKey, GetBusList } from "@/modules/bus/actions/indext";
import BusItem from "@/modules/bus/components/BusItem/BusItem";
import ChangeDay from "@/modules/bus/components/BusList/ChangeDay";
import SearchData from "@/modules/bus/components/BusList/SearchData";
import SortBuses from "@/modules/bus/components/BusList/SortBuses";
import SidebarFilters from "@/modules/bus/components/sidebar/SidebarFilters";
import SearchBus from "@/modules/bus/shared/searchForm/SearchBus";
import { SidebarFilterChange } from "@/modules/bus/templates/SidebarFilterChange";
import { SortCapacity, SortHightestPrice, SortTime } from "@/modules/bus/templates/SortBus";
import { BusItemType } from "@/modules/bus/types";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";
import Pagination from "@/modules/shared/components/ui/Pagination";
import { Close } from "@/modules/shared/components/ui/icons";
import { RootState } from "@/modules/shared/store";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Buses: NextPage<any> = ({ data }) => {
    const [page, setPage] = useState(1)
    const firstItemIndex = (page - 1) * 10;
    const lastItem = page * 10;
    const router = useRouter()

    const [key, setKey] = useState()
    const [busList, setBusList] = useState<any>()
    const [busInFilter, setBusInFilter] = useState<BusItemType[]>()
    const [sortBus, setSortBus] = useState<'Time' | 'LowestPrice' | 'HighestPrice'>('LowestPrice')
    const [showSearchForm, setShowSearchForm] = useState(false)

    const SidebarFilter = useSelector((state: RootState) => state.busFilters.filterOption)
    
    const fetchKey = async (searchData: any) => {
        console.log(`${ServerAddress.Type}${Bus.AvailabilityKey}`)
        const response: any = await GetAvailabilityKey(searchData)
        if (response?.data?.success) {
            setKey(response?.data?.result)
        }
    } 
    
    useEffect(() => {
        fetchKey(router.query)
    }, [])

    useEffect(() => {
        fetchKey(router.query)
    },[router.query])

    useEffect(() => {
        setBusInFilter(busList)
    } ,[busList])

    useEffect(() => {
        SidebarFilterChange(busList, SidebarFilter, setBusInFilter)
    },[SidebarFilter])
    
    useEffect(() => {
        let fetchInterval:NodeJS.Timeout | undefined;

        const fetchData = async () => {
            let response: any;
            if (key) response = await GetBusList(key)
            const result = response?.data?.result
            //setFetchDataCompelete(result?.isCompleted)

            if (result?.isCompleted) {
                setBusList(result.availabilities)
                clearInterval(fetchInterval)
            }

        }
        fetchData()

        fetchInterval = setInterval(() => {

            fetchData();

        }, 3000);

        
        return () => {
            clearInterval(fetchInterval);
        };
    }, [key])
    return (
        <div className="max-w-container m-auto p-5 flex gap-5 max-md:p-3">
            <Head>
                <title>لیست اتوبوس</title>
            </Head>
            
                <ModalPortal
                    selector="modal_portal"
                    show={showSearchForm}>
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
                            <SearchBus className="pt-5" setShowSearchForm={(e: boolean) => setShowSearchForm(e)}/>
                        </div>
                    </div>
                    </div>
                </ModalPortal>
            
            <SidebarFilters busData={busList} />
            <div className="w-3/4 max-lg:w-full">
                <SearchData setShowSearch={(e: any) => setShowSearchForm(e)} />
                <ChangeDay />
                <SortBuses sortBus={sortBus} changeSortBus={(e: any) => setSortBus(e)} />

                {
                    busInFilter?.length ?
                        <Pagination
                        totalItems={busInFilter?.length || 0}
                        itemsPerPage={10}
                        onChange={setPage}
                        currentPage={page}
                        wrapperClassName="mt-5"
                        /> : null
                }

                {
                    busInFilter?.sort((a, b) => SortCapacity(a, b))
                        .sort((a: BusItemType, b: BusItemType): any => {
                            if (sortBus == "HighestPrice") return SortHightestPrice(a, b)
                            else if (sortBus == "Time") return SortTime(a, b)
                            else {
                                return a.capacity && a.boardPrice - b.boardPrice
                            }
                        }).slice(firstItemIndex, lastItem)
                    ?.map((item, index) => <BusItem busData={item} key={item.token} />)
                }
                
                {
                    busInFilter?.length ?
                        <Pagination
                        totalItems={busInFilter?.length || 0}
                        itemsPerPage={10}
                        onChange={setPage}
                        currentPage={page}
                        wrapperClassName="mt-5"
                        /> : null
                }
            </div>
        </div>
    )
}

export default Buses;


export async function getServerSideProps(context: any) {
    
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}