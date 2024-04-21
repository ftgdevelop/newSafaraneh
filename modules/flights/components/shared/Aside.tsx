import Button from "@/modules/shared/components/ui/Button";
import Rating from "@/modules/shared/components/ui/Rating";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { ArrowLeft, Tik, Bed, User, Calendar, DefaultRoom, TakeOff, Airpalne2 } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FlightGetValidateDataType } from "../../types/flights";


type Props = {
    className?: string;
    passengers: {
        type:"CHD"|"ADT"|"INF";
        label:string;
        count:number;
        departurePrice: number;
        returnPrice?: number;
    }[];
    loading:boolean;
    departureFlight?: FlightGetValidateDataType['departureFlight'];
    returnFlight?: FlightGetValidateDataType['returnFlight'];
}
const Aside: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { departureFlight, returnFlight } = props;



    const departureTotalPrice = props.passengers.reduce((sum, item)=> sum + (item.count * item.departurePrice) ,0);
    

    if (props.loading) {
        return (
            <div className='border border-neutral-300 bg-white rounded-md mb-4'>
                <Skeleton className='mx-4 my-3.5 w-28' />
                <div className='border-t border-neutral-300 p-4'>
                    <div className='grid gap-3 grid-cols-4'>
                        <Skeleton type='image' />
                        <div className='col-span-3'>
                            <Skeleton className='mb-3 w-2/3' />
                            <Skeleton className='mb-3 w-1/3' />
                            <Skeleton className='w-full' />
                        </div>
                    </div>

                    <div className='border-t border-neutral-300 my-5' />

                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-2/3' />
                    <Skeleton className='mb-3 w-1/3' />
                    <Skeleton className='mb-3 w-2/3' />

                    <div className='border-t border-neutral-300 my-5' />

                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-full' />
                    <Skeleton className='mb-3 w-full' />

                    <Skeleton className='mb-3 w-full mt-6' type='button' />

                </div>
            </div>
        )
    }

    if(!departureFlight){
        return null;
    }


    return (
        <div className={`bg-white rounded-lg border border-neutral-300 mb-4 ${props.className}`} >

            <div>
                <div className="p-3 px-4">
                    جزئیات پرواز
                </div>

                <div className="px-4 flex gap-2 items-center text-xs mb-2">

                    <TakeOff className="w-5 h-5 fill-current rtl:mirror" />

                    {dateDiplayFormat({ date: departureFlight.departureTime, format: "ddd dd mm", locale: "fa" })}

                    <span className="text-neutal-500 font-sans" dir="ltr">
                        ({dateDiplayFormat({ date: departureFlight.departureTime, format: "dd mm", locale: "en" })})
                    </span>

                </div>

                <div className="px-4 gap-3 flex justify-between items-center leading-6 mb-4">

                    {departureFlight.airline?.picture?.path ? (
                        <Image
                            src={departureFlight.airline.picture.path}
                            alt={departureFlight.airline.picture.altAttribute || ""}
                            className="w-11 h-11 object-contain"
                            width={44}
                            height={44}
                        />
                    ) : (
                        ""
                    )}

                    <div className="text-sm">
                        <b className="font-semibold block">
                            {departureFlight.departureAirport.city.name}
                        </b>
                        {dateDiplayFormat({ date: departureFlight.departureTime, format: "HH:mm", locale: 'fa' })}
                    </div>



                    <div className="grow font-sans text-xs text-center text-neutral-500">
                        <strong className="font-semibold">
                            {departureFlight.flightNumber}
                        </strong>

                        <div className="flex gap-2 items-center -my-2.5">
                            <div className="border-t border-dashed border-neutral-300 grow" />
                            <Airpalne2 className="w-5 h-5 rtl:mirror fill-neutral-300" />
                        </div>

                        <div className="text-2xs">
                            {departureFlight.cabinClass.name} {departureFlight.cabinClass.code}
                        </div>
                    </div>

                    <div className="text-sm">
                        <b className="font-semibold block">
                            {departureFlight.arrivalAirport.city.name}
                        </b>
                        {departureFlight.arrivalTime ? dateDiplayFormat({ date: departureFlight.arrivalTime, format: "HH:mm", locale: 'fa' }) : "--"}
                    </div>



                </div>

                <div dir="ltr" className="border-t border-dashed border-neutral-300 relative before:clip-ticket-circle-right after:clip-ticket-circle-left" />

                <div className="p-3 px-4">
                    <h5 className="font-semibold text-sm mb-3">
                    جزئیات مبلغ
                    </h5>

                    {props.passengers.map(item=>(
                    <div key={item.type} className="flex justify-between items-center text-xs">
                        <span>
                            {item.label} ({item.count})
                        </span>
                        {item.departurePrice ? (
                        <span>
                            {numberWithCommas(item.departurePrice * item.count)} ریال
                        </span>
                        ):(
                            0
                        )}
                    </div>
                    ))}

                    <br />
                    <hr  />

                    <div className="flex justify-between items-center text-semibold py-3">
                        <span>
                            مجموع
                        </span>

                        <span>
                            {numberWithCommas(departureTotalPrice)} ریال
                        </span>

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
