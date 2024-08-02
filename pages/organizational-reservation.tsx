import Section1 from "@/modules/shared/components/SitePage/organizational-reservation/Section1";
import Section2 from "@/modules/shared/components/SitePage/organizational-reservation/Section2";
import Section3 from "@/modules/shared/components/SitePage/organizational-reservation/Section3";
import Section4 from "@/modules/shared/components/SitePage/organizational-reservation/Section4";
import Section5 from "@/modules/shared/components/SitePage/organizational-reservation/Section5";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import { WebSiteDataType } from "@/modules/shared/types/common";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Organizational: NextPage<any> = ({portalData}: {portalData: WebSiteDataType}) => {

    const logo = portalData?.billing.logo?.value || "";
    const siteName = portalData?.billing.name || "";

    return (
        <div className="bg-white">
            <div className="max-w-container m-auto p-5 relative max-sm:p-3">
            <BreadCrumpt items={[{ label: 'رزرو های سازمانی' }]} />
                <Section1 />
                <Section2 logo={logo} sitename={siteName} />
                <Section3 />
                <Section4 />
                <Section5 />
            </div>
        </div>
    )
}

export default Organizational;

export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}