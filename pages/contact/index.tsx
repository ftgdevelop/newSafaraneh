import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Map from '../../modules/shared/components/SitePage/Contact/ContactMap';
import instagram from '../../public/images/footer/Instagram.svg';
import twitter from '../../public/images/footer/Twitter.svg';
import linkden from '../../public/images/footer/Linkedin.svg';
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPortal } from "@/modules/shared/actions/portalActions";
import { PortalDataType } from "@/modules/shared/types/common";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";

const Contact: NextPage = () => {
    const [portalData, setPortalData] = useState<PortalDataType>()

    useEffect(() => {
        const getData = async () => {
            const data = await getPortal()
            setPortalData(data.data)
            console.log(data);
            
        }
        getData()
    }, [])

    return (
        <>
            <BreadCrumpt items={[{ label: 'تماس ما' }]} />
            <div className="max-w-container m-auto p-5 max-sm:p-2 mt-5">
            <h2 className="text-3xl font-bold">تماس با ما</h2>
                <div className="pl-5 pr-5 pt-10 pb-10 border-2 border-gray mt-7 rounded-md bg-white grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                    <div className="space-y-3">
                        <h5 className="text-xl font-semibold">با ما در ارتباط باشید</h5>
                        <address className="not-italic">
                            <p className="text-sm space-x-1 whitespace-nowrap max-xl:whitespace-normal">
                                <b className="text-base">آدرس</b>
                                <span className="font-semibold text-base">:</span> 
                                {portalData?.Phrases?.find(item => item.Keyword == "Address")?.Value}
                            </p>
                        </address>
                        <div className="flex gap-1">
                            <b>تلفن</b>:
                            <Link href={`tel:${portalData?.Phrases?.find(item => item.Keyword == "PhoneNumber")?.Value}`} className="font-semibold text-lg">
                            {portalData?.Phrases?.find(item => item.Keyword == "PhoneNumber")?.Value}
                            </Link>
                        </div>
                        <div className="flex gap-1">
                            <b>فکس</b>:
                            <Link href={`tel:+982126150054`} className="font-semibold text-lg">2126150054 98+</Link>
                        </div>
                        <div className="flex gap-1">
                            <b>ایمیل</b>:
                            <Link href={`mailto:${portalData?.Phrases?.find(item => item.Keyword == "Email")?.Value}`} className="font-semibold">
                                {portalData?.Phrases?.find(item => item.Keyword == "Email")?.Value}
                            </Link>
                        </div>
                        <div className="flex gap-1">
                            <b>کد پستی</b>:
                            <b className="font-semibold text-lg">1957644595</b>
                        </div>

                        <h5 className="text-2xl pt-5 font-semibold">ما را در شبکه اجتماعی دنبال کنید</h5>
                        <div className="flex pt-2 max-lg:pb-10 gap-4">
                            <Link href={portalData?.Phrases?.find(item => item.Keyword == "Instagram")?.Value || ''}>
                                <Image src={instagram} alt='instagram' width={30} height={30} />
                            </Link> 
                            <Link href={portalData?.Phrases?.find(item => item.Keyword == "Twitter")?.Value || ''}>
                                <Image src={twitter} alt='twitter' width={30} height={30} />
                            </Link>
                            <Link href={portalData?.Phrases?.find(item => item.Keyword == "Linkedin")?.Value || ''}>
                                <Image src={linkden} alt='instagram' width={30} height={30} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-xl font-semibold">آدرس ما بر روی نقشه</h5>
                        <Map />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;


export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
            },

        }
    )

}