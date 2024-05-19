import BusItem from "@/modules/bus/components/BusItem/BusItem";
import ChangeDay from "@/modules/bus/components/BusList/ChangeDay";
import SearchData from "@/modules/bus/components/BusList/SearchData";
import SortBuses from "@/modules/bus/components/BusList/SortBuses";
import SidebarFilters from "@/modules/bus/components/sidebar/SidebarFilters";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Buses: NextPage = () => {
    return (
        <div className="max-w-container m-auto p-5 flex gap-5 max-md:p-3">
        <Head>
            <title>لیست اتوبوس</title>
        </Head>
            <SidebarFilters />
            <div className="w-3/4 max-lg:w-full">
                <SearchData />
                <ChangeDay />
                <SortBuses />

                <BusItem />
            </div>
        </div>
    )
}

export default Buses;


export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}