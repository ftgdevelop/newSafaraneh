import Link from "next/link";
import { useTranslation } from "next-i18next";

import Language from "./Language";
import Image from "next/image";
import TrackOrder from "./TrackOrder";
import HeaderAuthentication from "@/modules/authentication/components/HeaderAuthentication";
import { useAppSelector } from "../../hooks/use-store";
import NavigationStyle3 from "../theme3/NavigationStyle3";

type Props = {
    logo: string;
    siteName: string;
}

const HeaderStyle3: React.FC<Props> = props => {
    const { t } = useTranslation('common');

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const { logo, siteName } = props;



    return (
        <header className={`bg-white z-30 relative`}>
            {/* {process.env.PROJECT === "SAFARANEH" && <div>
                <a
                    href="https://safaranehnorooz.landin.ir/1403"
                    target="_blank"
                    className='nowrooz-link'
                >
                    <img
                        onContextMenu={(e)=> e.preventDefault()}
                        src="/images/nowrooz.jpg"
                        alt="رزرو هتل نوروز 1403"
                        title="رزرو هتل نوروز 1403"
                        className='h-9 xs:h-12 sm:h-16 w-full object-cover object-center'
                        height={67}
                    />
                </a>
            </div>} */}

            <div className="max-w-container mx-auto px-3 md:px-5" >

                <div className="flex justify-between gap-5 mb-5">

                    <Link href="/" className="block">
                        {logo ? (
                            <Image src={logo} alt={siteName} width={115} height={48} onContextMenu={e => { e.preventDefault() }} className="h-12 mx-auto object-contain" />
                        ) : (
                            <div className="text-center text-xl w-28 mx-auto font-bold text-white bg-neutral-500 px-3 py-1.5 leading-5 rounded-xl"> NO <br /> LOGO </div>
                        )}
                    </Link>

                    <div className="flex gap-3">

                        <Language className="hidden md:block" buttonClassName="h-12" />

                        {!userIsAuthenticated && <TrackOrder />}

                        <HeaderAuthentication
                            logo={logo}
                            siteName={siteName}
                        />
                    </div>

                </div>

                <NavigationStyle3 />







            </div>

        </header>
    )
}

export default HeaderStyle3;