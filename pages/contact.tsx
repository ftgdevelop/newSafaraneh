import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import instagram from '../public/images/footer/Instagram.svg';
import twitter from '../public/images/footer/Twitter.svg';
import linkden from '../public/images/footer/Linkedin.svg';
import Image from "next/image";
import { WebSiteDataType } from "@/modules/shared/types/common";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";

import dynamic from "next/dynamic";

const LeafletNoSsr = dynamic(() => import('../modules/shared/components/ui/LeafletMap'), {
    ssr: false
});


const Contact: NextPage = ({ portalData }: { portalData?: WebSiteDataType }) => {

    let longitude, latitude;

    if (portalData) {
        latitude = portalData.billing?.latitude || "";
        longitude = portalData.billing?.longitude || "";
    }

    const tel = portalData?.billing?.telNumber || portalData?.billing?.phoneNumber || "";

    const email = portalData?.billing?.email || "";

    const instagramLink = portalData?.social?.instagram || "";
    const linkedinLink = portalData?.social?.linkedin || "";
    const twitterLink = portalData?.social?.x || "";

    return (
        <div className="max-w-container m-auto p-5 max-sm:p-3">
            <BreadCrumpt items={[{ label: 'تماس ما' }]} />
            <h2 className="text-3xl font-bold">تماس با ما</h2>
            <div className="pl-5 pr-5 pt-10 pb-10 border-2 border-gray mt-7 rounded-md bg-white grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                <div className="space-y-3">
                    <h5 className="text-xl font-semibold">با ما در ارتباط باشید</h5>
                    {!!portalData?.billing?.address && <address className="not-italic">
                        <p className="text-sm space-x-1 whitespace-nowrap max-xl:whitespace-normal">
                            <b className="text-base">آدرس</b>
                            <span className="font-semibold text-base">:</span>
                            {portalData.billing.address}
                        </p>
                    </address>}

                    {!!tel && <div className="flex gap-1">
                        <b>تلفن</b>:
                        <span className="font-semibold text-lg">
                            {tel}
                        </span>
                    </div>}

                    <div className="flex gap-1">
                        <b>فکس</b>:
                        <span className="font-semibold text-lg">2126150054 98+</span>
                    </div>

                    {!!email && <div className="flex gap-1">
                        <b>ایمیل</b>:
                        <Link href={`mailto:${email}`} className="font-semibold">
                            {email}
                        </Link>
                    </div>}

                    {!!portalData?.billing?.zipCode && <div className="flex gap-1">
                        <b>کد پستی</b>:
                        <b className="font-semibold text-lg">{portalData.billing.zipCode}</b>
                    </div>}

                    {
                        !!(instagramLink || twitterLink || linkedinLink) && (
                            <>
                                <h5 className="text-2xl pt-5 font-semibold">ما را در شبکه اجتماعی دنبال کنید</h5>
                                <div className="flex pt-2 max-lg:pb-10 gap-4">
                                    {instagramLink && <Link href={instagramLink}>
                                        <Image src={instagram} alt='instagram' width={30} height={30} />
                                    </Link>}
                                    {twitterLink && <Link href={twitterLink}>
                                        <Image src={twitter} alt='twitter' width={30} height={30} />
                                    </Link>}
                                    {linkedinLink && <Link href={linkedinLink}>
                                        <Image src={linkden} alt='linkedin' width={30} height={30} />
                                    </Link>}
                                </div>
                            </>
                        )
                    }

                </div>
                {!!(longitude && latitude) && (
                    <>
                        <div>
                            <h5 className="text-xl font-semibold mb-5">آدرس ما بر روی نقشه</h5>
                            <LeafletNoSsr
                                className='h-80 w-full rounded-xl'
                                location={[+latitude, +longitude]}
                                zoom={15}
                            />

                        </div>
                    </>
                )

                }
            </div>
        </div>
    )
}

export default Contact;


export async function getStaticProps(context: any) {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}