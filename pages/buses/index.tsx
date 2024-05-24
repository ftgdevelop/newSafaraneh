import { GetAvailabilityKey, GetBusList } from "@/modules/bus/actions/indext";
import BusItem from "@/modules/bus/components/BusItem/BusItem";
import ChangeDay from "@/modules/bus/components/BusList/ChangeDay";
import SearchData from "@/modules/bus/components/BusList/SearchData";
import SortBuses from "@/modules/bus/components/BusList/SortBuses";
import SidebarFilters from "@/modules/bus/components/sidebar/SidebarFilters";
import { BusItemType } from "@/modules/bus/types";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const Buses: NextPage<any> = ({data}) => {
    const [key, setKey] = useState()
    const [fetchDataCompelete, setFetchDataCompelete] = useState<boolean>(false)
    const [busList, setBusList] = useState<BusItemType[]>()
    
    const fetchKey = async () => {
        const busData = {
            departureTime: "2024-05-24",
            destinationCode: "34",
            originCode: "825"
        }
        const response : any = await GetAvailabilityKey(busData)
        if (response?.data?.success) {
            setKey(response?.data?.result)            
        }
    } 
    
    useEffect(() => {
        fetchKey()
    },[])
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
            <SidebarFilters busData={busList} />
            <div className="w-3/4 max-lg:w-full">
                <SearchData />
                <ChangeDay />
                <SortBuses />

                {
                    busList?.map((item ,index) => <BusItem busData={item} key={index} />)
                        
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