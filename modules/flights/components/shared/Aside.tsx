import Button from "@/modules/shared/components/ui/Button";
import Rating from "@/modules/shared/components/ui/Rating";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { ArrowLeft, Tik, Bed, User, Calendar, DefaultRoom, TakeOff } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FlightGetValidateDataType } from "../../types/flights";


type Props = {
    // reserveInformation?: AsideReserveInfoType;
    // roomExtraBed?: number[];
    // hasSubmit?: boolean;
    // submitLoading?: boolean;
    className?: string;
    // discountResponse?: {
    //     reserveId: number;
    //     promoCodeId: number;
    //     discountPrice: number;
    //     orderSubTotalDiscount: number;
    //     orderSubTotal: number;
    //     isValid: true;
    // };
    // discountLoading?: boolean;
    departureFlight: FlightGetValidateDataType['departureFlight'];
    returnFlight?:FlightGetValidateDataType['returnFlight'];
}
const Aside: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const { departureFlight, returnFlight} = props;



    // if (!reserveInformation) {
    //     return (
    //         <div className='border border-neutral-300 bg-white rounded-md mb-4'>
    //             <Skeleton className='mx-4 my-3.5 w-28' />
    //             <div className='border-t border-neutral-300 p-4'>
    //                 <div className='grid gap-3 grid-cols-4'>
    //                     <Skeleton type='image' />
    //                     <div className='col-span-3'>
    //                         <Skeleton className='mb-3 w-2/3' />
    //                         <Skeleton className='mb-3 w-1/3' />
    //                         <Skeleton className='w-full' />
    //                     </div>
    //                 </div>

    //                 <div className='border-t border-neutral-300 my-5' />

    //                 <Skeleton className='mb-3 w-full' />
    //                 <Skeleton className='mb-3 w-2/3' />
    //                 <Skeleton className='mb-3 w-1/3' />
    //                 <Skeleton className='mb-3 w-2/3' />

    //                 <div className='border-t border-neutral-300 my-5' />

    //                 <Skeleton className='mb-3 w-full' />
    //                 <Skeleton className='mb-3 w-full' />
    //                 <Skeleton className='mb-3 w-full' />

    //                 <Skeleton className='mb-3 w-full mt-6' type='button' />

    //             </div>
    //         </div>
    //     )
    // }


    return (
        <div className={`bg-white rounded-lg border border-neutral-300 mb-4 ${props.className}`} >

            <div>
                <div>
                    <span>جزییات پرواز</span>
                </div>

                <div>
                    <div className="flex gap-2 items-center text-xs">

                        <TakeOff className="w-5 h-5 fill-current rtl:mirror" />

                        {dateDiplayFormat({date:departureFlight.departureTime, format:"ddd dd mm", locale:"fa"})} 
                        
                        <span className="text-neutal-500 font-sans" dir="ltr">
                            ({dateDiplayFormat({date:departureFlight.departureTime, format:"dd mm", locale:"en"})})
                        </span>

                    </div>

                    <div>
                                    {departureFlight.airline.picture ? (
                                        <img
                                            src={departureFlight.airline.picture.path}
                                            alt={departureFlight.airline.picture.altAttribute}
                                        />
                                    ) : (
                                        ""
                                    )}
                                
                                
                                
                                <div>
                                    <div>
                                        {departureFlight.departureAirport.city.name}
                                    </div>
                                    <div >
                                        {/* <Time date={flight.departureTime} /> */}
                                    </div>
                                </div>



                                <div>
                                    <div>
                                        {departureFlight.flightNumber}
                                    </div>
                                    <svg
                                        focusable="false"
                                        color="inherit"
                                        fill="currentcolor"
                                        aria-hidden="true"
                                        role="presentation"
                                        viewBox="0 0 16 16"
                                        preserveAspectRatio="xMidYMid meet"
                                        width="24px"
                                        height="24px"
                                        className="sc-gbOuXE gZUTkG sc-chPdSV ctQrKd"
                                    >
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                                fill="currentcolor"
                                                d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                        </g>
                                    </svg>
                                    <div></div>
                                    <div>
                                        <span>{departureFlight.cabinClass.name} {departureFlight.cabinClass.code}</span>
                                    </div>
                                </div>



                                <div>
                                    <div>
                                        {departureFlight.arrivalAirport.city.name}
                                    </div>
                                    <div>
                                        {/* <Time date={flight.arrivalTime} /> */}
                                    </div>
                                </div>



                    </div>
                </div>
            </div>

            {/* <div className={styles.detailsAside}>
                <div className={styles.subject}>
                    <span>{t("price-details")}</span>
                </div>
                <div className={styles.contentDetailsAside}>
                    {flight.persons && flight.persons.length
                        ? flight.persons.map((person, index) => (
                            <div key={index} className={styles.passengerDetails}>
                                <span>
                                    {person.type} ({person.count})
                                </span>
                                <b>{numberWithCommas(person.price)}</b>
                            </div>
                        ))
                        : ""}
                    <div className={styles.pricePay}>
                        <span>{t("total")}</span>
                        <b>{numberWithCommas(flight.sumPrice)}</b>
                    </div>
                </div>
            </div> */}

        </div>

    )

}

export default Aside;
