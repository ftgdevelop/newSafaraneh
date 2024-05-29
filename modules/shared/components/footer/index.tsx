import Link from "next/link";

import { useTranslation } from "next-i18next";
import parse from 'html-react-parser';

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GoftinoWrapper from "./GoftinoWrapper";

const GoToTop = dynamic(() => import('./GoToTop'), {
    ssr: false
});



type Props = {
    logo: string;
    siteName: string;
    contactInfo: {
        tel?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        facebook?: string;
    }
    enamadElement?: any;
}

const Footer: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { logo, siteName } = props;

    const linkClassNames = "block hover:text-blue-600 hover:underline";

    const [rendered, setRendered] = useState<boolean>(false);


    useEffect(() => {
        setRendered(true);
    }, []);

    return (
        <>
            <footer>

                <div className="max-w-container mx-auto p-3 text-neutral-700 pt-8 pb-14">

                    <div className="flex justify-center gap-1 sm:gap-4 mb-10" onContextMenu={e => { e.preventDefault() }}>
                        <Image src='/images/footer/tandis-01.png' className="h-11 sm:h-18 object-contain" alt='' width={62} height={72} />
                        <Image src='/images/footer/tandis-02.png' className="h-11 sm:h-18 object-contain" alt='' width={62} height={72} />
                        <Image src='/images/footer/tandis-03.png' className="h-11 sm:h-18 object-contain" alt='' width={62} height={72} />
                        <Image src='/images/footer/tandis-04.png' className="h-11 sm:h-18 object-contain" alt='' width={62} height={72} />
                        <Image src='/images/footer/tandis-05.png' className="h-11 sm:h-18 object-contain" alt='' width={62} height={72} />


                        {!!props.enamadElement && parse(props.enamadElement)}

                        {/* <a href="#" aria-label="نماد اعتماد">
                        <Image src='/images/footer/enamad.png' className="h-12 sm:h-18 object-contain" alt='' width={43} height={72} />
                    </a>

                    <a href="#" aria-label="رسانه">
                        <Image src='/images/footer/resaneh.png' className="h-12 sm:h-18 object-contain" alt='' width={60} height={72} />
                    </a> */}

                        <a
                            href="https://logo.samandehi.ir/Verify.aspx?id=238809&p=uiwkxlaomcsimcsiobpdpfvl"
                            target="_blank"
                            title="logo-samandehi"
                            aria-label="samandehi"
                        //className={`unset-img ${styles.nemads}`}
                        >
                            <img
                                id="nbqergvjoeukoeukesgtsizp"
                                alt="logo-samandehi"
                                title="logo-samandehi"
                                src="https://logo.samandehi.ir/logo.aspx?id=238809&p=odrfqftiaqgwaqgwlymabsiy"
                                // layout="fill"
                                // className={`unset-img ${styles.nemads}`}
                                width="70"
                                height="75"
                            //layout="fixed"
                            />
                        </a>

                    </div>

                    <nav className="hidden sm:flex justify-center gap-6 text-xs mb-6">
                        <Link title={t('contact-us')} href="/contact" className={linkClassNames} >
                            {t('contact-us')}
                        </Link>
                        <Link title={t('faq')} href="/faq" className={linkClassNames} >
                            {t('faq')}
                        </Link>
                        <Link title={t('terms')} href="/terms" className={linkClassNames} >
                            {t('terms')}
                        </Link>
                        <Link title={t('privacy')} href="/privacy" className={linkClassNames} >
                            {t('privacy')}
                        </Link>
                        <Link title={t("about-us")} href="/about" className={linkClassNames} >
                            {t("about-us")}
                        </Link>
                        <Link title={t('organizational-reservation')} href="/organizational-reservation" className={linkClassNames} >
                            {t('organizational-reservation')}
                        </Link>
                    </nav>

                    <Link href="/">
                        {logo ? (
                            <Image src={logo} alt={siteName} width={115} height={48} className="block mx-auto mb-4" onContextMenu={e => { e.preventDefault() }} />
                        ) : (
                            <div className="text-center text-xl font-bold text-white bg-neutral-500 px-3 w-24 mx-auto py-1.5 leading-5 rounded-xl"> NO <br /> LOGO </div>
                        )}
                    </Link>

                    {!!props.contactInfo.tel && <div className="flex gap-4 justify-center mb-4">
                        {t('support')}
                        <a href={`tel:${props.contactInfo.tel}`} className="text-lg font-semibold" dir="ltr">
                            {props.contactInfo.tel.replace("+98", "0")}
                        </a>
                    </div>}

                    <div className="flex justify-center gap-3 items-center">
                        {!!props.contactInfo.instagram && <a href={props.contactInfo.instagram || "#"} aria-label="Instagram" title="Instagram" >
                            <Image src='/images/footer/Instagram.svg' width={30} height={30} className="block" alt="Instagram" />
                        </a>}
                        {!!props.contactInfo.twitter && <a href={props.contactInfo.twitter || "#"} aria-label="Twitter" title="Twitter" >
                            <Image src='/images/footer/Twitter.svg' width={30} height={30} className="block" alt="Twitter" />
                        </a>}
                        {!!props.contactInfo.facebook && <a href={props.contactInfo.facebook || "#"} aria-label="Facebook" title="Facebook" >
                            <Image src='/images/footer/Facebook.svg' width={30} height={30} className="block" alt="Facebook" />
                        </a>}
                        {!!props.contactInfo.linkedin && <a href={props.contactInfo.linkedin || "#"} aria-label="Linkedin" title="Linkedin" >
                            <Image src='/images/footer/Linkedin.svg' width={30} height={30} className="block" alt="Linkedin" />
                        </a>}
                    </div>

                </div>

                {/* <!-- Yektanet --> */}
                <script
                    id="script_footer_15"
                    dangerouslySetInnerHTML={{
                        __html: `
          !function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-GHp3ZhOz"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "/static/scripts/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
        `,
                    }}
                />

                {rendered && <GoftinoWrapper />}


            </footer>

            <GoToTop />
        </>
    )
}

export default Footer