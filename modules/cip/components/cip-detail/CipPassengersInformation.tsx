import {SetStateAction, Dispatch} from 'react';
import {FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "next-i18next";

import { CipAvailabilityItemType, CipFormPassengerItemType } from "../../types/cip";
import { Loading, Minus, Plus } from "@/modules/shared/components/ui/icons";
import CipPassengerItem from "./CipPassengerItem";

type Props = {
    passengers: CipFormPassengerItemType[];
    setPassengers: Dispatch<SetStateAction<CipFormPassengerItemType[]>>;
    setReserverIsNotPassenger: () => void;
    passengerServicesArray: CipAvailabilityItemType['passengerTypeServices'];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>>;
    errors: FormikErrors<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>;
    touched: FormikTouched<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>;
    values: {
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    };
}

const CipPassengersInformation: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { passengers, setReserverIsNotPassenger, setFieldValue, values, touched, errors, setPassengers } = props;

    const increasePassengers = () => {
        if (passengers.length < 10) {
            setPassengers(prevPassengers => {
                setFieldValue(`passengers.${prevPassengers.length}.firstName`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.lastName`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.email`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.phoneNumber`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.userName`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.gender`,true );
                setFieldValue(`passengers.${prevPassengers.length}.passengerType`,"Adult" );
                setFieldValue(`passengers.${prevPassengers.length}.passportNumber`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.nationalId`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.nationality`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.birthday`,"" );
                setFieldValue(`passengers.${prevPassengers.length}.services`,[] );
                return [
                    ...prevPassengers,
                    {
                        id: Date.now().toString(),
                        gender: true,
                        type: "Adult",
                        services: []
                    }
                ]
            });
        }
    }

    const decreasePassengers = () => {
        if (passengers.length > 1) {
            setPassengers(prevPassengers => {
                
                setFieldValue(`passengers.${prevPassengers.length -1}`,null );

                const updatedPassengers = [...prevPassengers];
                updatedPassengers.splice(-1);
                return (updatedPassengers);

            });
        }
    }

    const updatePassenger = (id: string, property: any, value: any) => {
        setPassengers((prevPassengers: any) => {
            const updatingPassenger = prevPassengers.find((item: any) => item.id === id);
            const otherPassengers = prevPassengers.filter((item: any) => item.id !== id);
            const updatedPassenger = { ...updatingPassenger, [property]: value };
            return ([...otherPassengers, updatedPassenger]);
        });
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <strong className="font-semibold text-base block sm:col-span-2 md:col-span-5 "> مشخصات مسافران </strong>
                <div>
                    <button
                        type="button"
                        onClick={decreasePassengers}
                        className="bg-blue-700 h-9 w-9 inline-flex items-center justify-center rounded outline-none align-middle"
                    >
                        <Minus className="w-6 h-6 fill-white" />
                    </button>
                    <span className="w-20 inline-block text-center align-middle">
                        <b> {passengers ? passengers.length : <Loading className="w-5 h-5 fill-current animate-spin" />}</b> مسافر
                    </span>
                    <button
                        type="button"
                        onClick={increasePassengers}
                        className="bg-blue-700 h-9 w-9 inline-flex items-center justify-center rounded outline-none align-middle"
                    >
                        <Plus className="w-6 h-6 fill-white" />
                    </button>
                </div>
            </div>
            {passengers && passengers.sort((a, b) => +a.id - +b.id).map((passengerItem, passengerIndex) => <CipPassengerItem
                passengerServicesArray={props.passengerServicesArray}
                errors={errors}
                touched={touched}
                values={values}
                key={passengerItem.id}
                passengerItem={passengerItem}
                passengerIndex={passengerIndex}
                setReserverIsNotPassenger={setReserverIsNotPassenger}
                setFieldValue={setFieldValue}
                updatePassenger={(property: any, value: any) => { updatePassenger(passengerItem.id, property, value) }}
                decreasePassengers={decreasePassengers}
                isLastItem ={!!passengerIndex && passengerIndex === passengers.length-1} 
            />)}
        </div>
    )
}

export default CipPassengersInformation;