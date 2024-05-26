import Link from "next/link";
import { useTranslation } from "next-i18next";

const Navigation: React.FC = () => {

    const { t } = useTranslation('common');
    const linkClassName = 'whitespace-nowrap px-3 lg:px-5 pb-3 md:py-3 block font-semibold transition-all duration-200 hover:text-blue-700';

    return (
        <div className="overflow-auto text-center">
            <nav className="max-sm:mt-2 inline-flex">

                {!!(process.env.PROJECT_MODULES?.includes("DomesticHotel")) && <Link
                    href='/hotels-home'
                    className={linkClassName}
                >
                    {t('domestic-hotel')}
                </Link>}

                {!!(process.env.PROJECT_MODULES?.includes("DomesticFlight")) && <Link
                    href="/flights-home"
                    className={linkClassName}
                >
                    {t('domestic-flight')}
                </Link>}

                {!!(process.env.PROJECT_MODULES?.includes("ForeignHotel")) && <Link
                    //</nav>href='/hotels-foreign-home' 
                    href="https://tickets.safaraneh.com/fa/hotels-foreign-home"
                    className={linkClassName}
                >
                    {t('foreign-hotel')}
                </Link>}

                {!!(process.env.PROJECT_MODULES?.includes("ForeignFlight")) && <Link
                    //href='/flight-foreign-home' 
                    href="https://tickets.safaraneh.com/fa/flights-foreign-home"
                    className={linkClassName}
                >
                    {t('foreign-flight')}
                </Link>}

                {process.env.PROJECT_MODULES?.includes("CIP") && <Link
                    //href='/cip' 
                    href="/cip-home"
                    className={linkClassName}
                >
                    {t('cip')}
                </Link>}

                {!!(process.env.PROJECT_MODULES?.includes("Blog")) && <Link
                    href='/blog'
                    className={linkClassName}
                >
                    {t('blog')}
                </Link>}

                {/* <div>
                <Link href='/organizational-reservation' className={linkClassName} > {t('organizational-reservation')} </Link>
                <Link href='/contact' className={linkClassName} > {t('contact-us')} </Link>
                <Link href='/privacy' className={linkClassName} > {t('privacy')} </Link>
                <Link href='/faq' className={linkClassName} > {t('faq')} </Link>
                <Link href='/terms' className={linkClassName} > {t('terms')} </Link>
                <Link href='/about' className={linkClassName} > {t('about-us')} </Link>
            </div> */}
            </nav>
        </div>
    )
}

export default Navigation;