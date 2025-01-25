import Link from "next/link";
import { useTranslation } from "next-i18next";

const Navigation: React.FC = () => {

    const { t } = useTranslation('common');
    const linkClassName = 'whitespace-nowrap px-1.5 lg:px-5 pb-3 md:py-3 block font-bold transition-all duration-200 text-neutral-700 hover:text-blue-700 text-sm md:text-md';

    return (
        <div className="overflow-auto text-center md:text-left">
            <nav className="max-sm:mt-2 inline-flex">
                <Link href='/contact' className={linkClassName} > {t('contact-us')} </Link>
                <Link href='/privacy' className={linkClassName} > {t('privacy')} </Link>
                <Link href='/faq' className={linkClassName} > {t('faq')} </Link>
                <Link href='/terms' className={linkClassName} > {t('terms')} </Link>
                <Link href='/about' className={linkClassName} > {t('about-us')} </Link>

            </nav>
        </div>
    )
}

export default Navigation;