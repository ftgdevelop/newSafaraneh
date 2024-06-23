import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Airpalne2, Bed, Blog, Suitcase } from "../ui/icons";
import { useRouter } from "next/router";

const NavigationStyle3: React.FC = () => {

    const { t } = useTranslation('common');

    const linkHoverEffectStyle = "before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0"

    const linkClassName = `whitespace-nowrap px-1.5 pb-2 block transition-all duration-200 relative text-primary-600 text-sm md:text-md before:absolute before:h-1 before:bg-primary-600 before:bottom-0 before:duration-200 before:transition-all`;

    const router = useRouter();

    const { asPath } = router;

    return (

        <nav className="hidden sm:flex gap-3">

            {!!(process.env.PROJECT_MODULES?.includes("DomesticHotel")) && <Link
                href='/hotels-home'
                className={`${linkClassName} ${asPath.includes("hotels-home") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Bed className="w-5 h-5 fill-current inline-block rtl:ml-1 ltr:mr-1" />
                {t('domestic-hotel')}
            </Link>}

            {!!(process.env.PROJECT_MODULES?.includes("DomesticFlight")) && <Link
                href="/flights-home"
                className={`${linkClassName} ${asPath.includes("flights-home") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Airpalne2 className="w-5 h-5 fill-current inline-block rtl:mirror rtl:ml-1 ltr:mr-1" />
                {t('domestic-flight')}
            </Link>}

            {!!(process.env.PROJECT_MODULES?.includes("ForeignHotel")) && <Link
                //</nav>href='/hotels-foreign-home' 
                href="https://tickets.safaraneh.com/fa/hotels-foreign-home"
                className={`${linkClassName} ${asPath.includes("hotels-foreign-home") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Bed className="w-5 h-5 fill-current inline-block rtl:ml-1 ltr:mr-1" />
                {t('foreign-hotel')}
            </Link>}

            {!!(process.env.PROJECT_MODULES?.includes("ForeignFlight")) && <Link
                //href='/flight-foreign-home' 
                href="https://tickets.safaraneh.com/fa/flights-foreign-home"
                className={`${linkClassName} ${asPath.includes("flights-foreign-home") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Airpalne2 className="w-5 h-5 fill-current inline-block rtl:mirror rtl:ml-1 ltr:mr-1" />
                {t('foreign-flight')}
            </Link>}

            {process.env.PROJECT_MODULES?.includes("CIP") && <Link
                //href='/cip' 
                href="/cip-home"
                className={`${linkClassName} ${asPath.includes("cip-home") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Suitcase className="w-5 h-5 fill-current inline-block rtl:mirror rtl:ml-1 ltr:mr-1" />
                {t('cip')}
            </Link>}

            {!!(process.env.PROJECT_MODULES?.includes("Blog")) && <Link
                href='/blog'
                className={`${linkClassName} ${asPath.includes("blog") ? "before:left-0 before:right-0" : linkHoverEffectStyle}`}
            >
                <Blog className="w-5 h-5 fill-current inline-block rtl:mirror rtl:ml-1 ltr:mr-1" />
                {t('blog')}
            </Link>}

        </nav>

    )
}

export default NavigationStyle3;

