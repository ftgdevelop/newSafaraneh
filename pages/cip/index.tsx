import CipImages from "@/modules/cip/components/CipImages";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetAirportList, GetAirportsDetail } from "../../modules/cip/actions/index";
import CipDescribtion from "@/modules/cip/components/CipDescription";
import CipItem from "@/modules/cip/components/CipItems";
import CipRules from "@/modules/cip/components/CipRules";
import CipFaq from "@/modules/cip/components/CipFaq";

const CipMainPage: NextPage<any> = ({  data, data2 }) => {
    
    return (
        <div className="max-w-container m-auto pr-5 pl-5 max-md:p-3">
            <CipImages  />
            <CipDescribtion content={data} />
            <CipItem AirportsDetail={data2} AirportsList={data} />
            <CipRules />
            <CipFaq />
        </div>
    )
}

export default CipMainPage;

export async function getStaticProps(context: any) {
    const AirportsDetail = await GetAirportsDetail()
    const AirportsList = await GetAirportList()
    const data = AirportsList?.data
    const data2 = AirportsDetail?.data.result.items

    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                data: data || null,
                data2: data2 || null
            },

        }
    )

}