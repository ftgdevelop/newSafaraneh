import Link from "next/link";
import { useTranslation } from "next-i18next";

import TravelServices from "./travelServices";
import Image from "next/image";
import TrackOrder from "./TrackOrder";
import HeaderAuthentication from "@/modules/authentication/components/HeaderAuthentication";
import { useAppSelector } from "../../hooks/use-store";
import HeaderStyle3 from "./HeaderStyle3";

type Props = {
    logo: string;
    siteName: string;
    withoutContainer?: boolean;
}

const Header: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const { logo, siteName } = props;

    const theme2 = process.env.THEME === "THEME2";

    const theme1 = process.env.THEME === "THEME1";
    
    const theme3 = process.env.THEME === "THEME3";

    if (theme3){
        return <HeaderStyle3 logo={logo} siteName={siteName} withoutContainer={props.withoutContainer} />
    }
    
    return (
        <header className={`bg-white z-30 relative ${theme2 ? "border-b border-neutral-300 shadow-normal" : ""}`}>

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

            <div className={`max-w-container mx-auto relative ${theme2 ? "flex gap-2 justify-between items-center md:px-3" : theme1 ? "clearfix py-3 px-3 md:px-5" : ""}`}>

                <Link href="/" className={`block ${theme1 ? "md:rtl:float-right md:ltr:float-left md:rtl:ml-5 md:ltr:mr-5" : theme2 ?"py-3":""}`}>
                    {logo ? (
                        <Image src={logo} alt={siteName} width={115} height={48} onContextMenu={e => { e.preventDefault() }} className="h-12 mx-auto object-contain" />
                    ) : (
                        <div className="text-center text-xl w-28 mx-auto font-bold text-white bg-neutral-500 px-3 py-1.5 leading-5 rounded-xl"> NO <br /> LOGO </div>
                    )}
                </Link>

                {theme2 ? (
                    null
                    // <Navigation />
                ) : (
                    <TravelServices logo={logo} siteName={siteName} className="rtl:float-right ltr:float-left" />
                )}

                <HeaderAuthentication
                    logo={logo}
                    siteName={siteName}
                />

                {!userIsAuthenticated && !theme2 && <TrackOrder />}

                {/* <Language className="ltr:float-right rtl:float-left rtl:ml-5 ltr:mr-5 hidden md:block" buttonClassName="h-12" /> */}
            </div>

        </header>
    )
}

export default Header;