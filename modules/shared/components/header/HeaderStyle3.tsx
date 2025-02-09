import Link from "next/link";
import { useTranslation } from "next-i18next";

import Image from "next/image";
import TrackOrder from "./TrackOrder";
import HeaderAuthentication from "@/modules/authentication/components/HeaderAuthentication";
import { useAppSelector } from "../../hooks/use-store";

type Props = {
    logo: string;
    siteName: string;
    withoutContainer?: boolean;
}

const HeaderStyle3: React.FC<Props> = props => {
    const { t } = useTranslation('common');

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const { logo, siteName } = props;


    if (props.withoutContainer) {
        return (
            <header className="flex justify-between gap-3 sm:gap-5 border-b sm:border-0 bg-white sm:rounded-2xl p-3 sm:p-4">

                <Link href="/" className="block self-center">
                    {logo ? (
                        <Image src={logo} alt={siteName} width={144} height={44} onContextMenu={e => { e.preventDefault(); }} className="h-8 sm:h-11 w-auto mx-auto object-contain" />
                    ) : (
                        <div className="text-center text-xl w-28 mx-auto font-bold text-white bg-neutral-500 px-3 py-1.5 leading-5 rounded-xl"> NO <br /> LOGO </div>
                    )}
                </Link>

                <div className="flex gap-2 sm:gap-4 items-center">

                    {/* <Language className="hidden md:block" buttonClassName="h-12" /> */}

                    <HeaderAuthentication
                        logo={logo}
                        siteName={siteName}
                    />

                    {!userIsAuthenticated && <TrackOrder />}

                </div>

            </header>
        )
    }

    return (
        <header className="bg-white">
            <div className="max-w-container mx-auto">
                <div className="flex justify-between gap-3 sm:gap-5 p-3 sm:p-5">
                    <Link href="/" className="block self-center">
                        {logo ? (
                            <Image src={logo} alt={siteName} width={144} height={44} onContextMenu={e => { e.preventDefault(); }} className="h-8 sm:h-11 w-auto mx-auto object-contain" />
                        ) : (
                            <div className="text-center text-xl w-28 mx-auto font-bold text-white bg-neutral-500 px-3 py-1.5 leading-5 rounded-xl"> NO <br /> LOGO </div>
                        )}
                    </Link>

                    <div className="flex gap-2 sm:gap-4 items-center">

                        {/* <Language className="hidden md:block" buttonClassName="h-12" /> */}

                        <HeaderAuthentication
                            logo={logo}
                            siteName={siteName}
                        />

                        {!userIsAuthenticated && <TrackOrder />}

                    </div>
                </div>

            </div>
        </header>
    )
}

export default HeaderStyle3;