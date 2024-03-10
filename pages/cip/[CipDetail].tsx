import { useState, useEffect } from 'react';
import { availabilityByIataCode, getAirportByUrl } from "@/modules/cip/actions";
import CipDetailGallery from "@/modules/cip/components/cip-detail/CipDetailGallery";
import CipName from "@/modules/cip/components/cip-detail/CipName";
import { CipAvailabilityItemType, CipFormPassengerItemType, CipGetAirportByUrlResponseType } from "@/modules/cip/types/cip";
import AnchorTabs from "@/modules/shared/components/ui/AnchorTabs";
import Button from "@/modules/shared/components/ui/Button";
import Steps from "@/modules/shared/components/ui/Steps";
import { RightCaret } from "@/modules/shared/components/ui/icons";
//import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { Form, Formik } from "formik";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import CipReserverInformation from "@/modules/cip/components/cip-detail/CipReserverInformation";
import CipAirportInformation from "@/modules/cip/components/cip-detail/CipAirportInformation";
import { useAppSelector } from '@/modules/shared/hooks/use-store';
import CipPassengersInformation from '@/modules/cip/components/cip-detail/CipPassengersInformation';

const CipDetails: NextPage = ({ airportData, availabilities }: { airportData?: CipGetAirportByUrlResponseType, availabilities?: {latitude:string; longitude: string; availability: CipAvailabilityItemType[] }}) => {

    const { t } = useTranslation('common');
    const { t: tCip } = useTranslation('cip');

    const user = useAppSelector(state => state.authentication.isAuthenticated ? state.authentication.user : undefined);

    const [passengers, setPassengers] = useState<CipFormPassengerItemType[]>([
        {
            id: '1',
            gender: user ? user.gender : true,
            type: "Adult",
            services: []
        }
    ]);

    const [selectedAvailability, setSelectedAvailability] = useState<CipAvailabilityItemType | undefined>();

    const [reserverIsPassenger, setReserverIsPassenger] = useState<boolean>(true);

    // useEffect(()=>{
    //     const fetch =async (code:string) => {
    //         const rrr = await availabilityByIataCode(code);
    //         debugger;

    //     }

    //     if(airportData?.code){
    //         fetch(airportData?.code);
    //     }

    // },[airportData]);


    useEffect(()=>{
        if (availabilities?.availability && availabilities.availability.length === 1 ){
            setSelectedAvailability(availabilities.availability[0]);
        }
    },[availabilities?.latitude]);


    let airportLocation: [number, number] | undefined = undefined;
    if (availabilities?.latitude && availabilities.longitude) {
        airportLocation = [+availabilities.latitude, +availabilities.longitude];
    }


    let passengerServicesArray: CipAvailabilityItemType['passengerTypeServices'];;
    if (selectedAvailability){
      passengerServicesArray = selectedAvailability.passengerTypeServices;
      debugger;
    }

    const submitHandler = async (values: any) => {
        debugger;
    }

    const formInitialValue = {
        reserver: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            userName: "",
            gender: true
        },
        passengers: [{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            userName: "",
            gender: true,
            passengerType: "Adult" as "Adult" | "Child",
            passportNumber: "",
            nationalId: "",
            nationality: "",
            birthday: "",
            services: []
        }],
        originName: "",
        destinationName: "",
        airline: "",
        flightNumber: "",
        flightDate: "",
        flightTime: ""

    }

    return (
        <div className="max-w-container m-auto">
            <div className="pt-5 px-5 max-md:px-3" id="pictures_section">
                <div className="p-3 bg-white flex justify-between items-center">
                    <Link
                        href="/cip-home"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        <RightCaret className="w-6 h-6 fill-current inline-block ltr:rotate-180" />
                        مشاهده فرودگاه های دیگر
                    </Link>
                    <div className="text-sm font-semibold hidden sm:block">
                        شماره تلفن رزرو :
                        <a href="tel:+982126150051" className="rtl:mr-1 ltr:ml-1"> 02126150051 </a>
                    </div>

                </div>

                {!!airportData && <CipDetailGallery items={airportData?.galleries} />}
            </div>

            <AnchorTabs
                items={[
                    { id: "pictures_section", title: tCip('pictures') },
                    { id: "about-travel-section", title: "اطلاعات سفر" },
                    { id: "reserver_passengers_section", title: "مشخصات رزروگیرنده و مسافران" },
                    { id: "extra_services_section", title: "سرویس های مازاد" },
                    { id: "about_section", title: "درباره فرودگاه" },
                    { id: "facilities_section", title: "امکانات فرودگاه" }
                ]}
            />
            <div className="px-5 max-md:px-3">

                <CipName address={airportData?.address} name={airportData?.name} location={airportLocation} />

                <Steps
                    className="my-6 md:my-10"
                    items={[
                        { label: "تکمیل اطلاعات", status: "active" },
                        { label: "صفحه درگاه بانک", status: "up-comming" },
                        { label: "تایید و پرداخت", status: "up-comming" },
                        { label: "تکمیل خرید", status: "up-comming" }
                    ]}
                />
            </div>

            <div
                id="about-travel-section"
            >
                <Formik
                    validate={() => { return {} }}
                    initialValues={formInitialValue}
                    onSubmit={submitHandler}
                >
                    {({ errors, touched, setFieldValue, values, isValid, isSubmitting }) => {

                        if (isSubmitting && !isValid) {
                            setTimeout(() => {
                                const formFirstError = document.querySelector(".has-validation-error");
                                if (formFirstError) {
                                    formFirstError.scrollIntoView({ behavior: "smooth" });
                                }
                            }, 100)
                        }

                        return (

                            <Form className='px-5' autoComplete='off' >

                                <CipAirportInformation
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    values={values}
                                />

                                <CipReserverInformation
                                    reserverIsPassenger={reserverIsPassenger}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    values={values}
                                />

                                <CipPassengersInformation
                                    passengerServicesArray={passengerServicesArray}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    setReserverIsNotPassenger={() => { setReserverIsPassenger(false) }}
                                    //updatePassenger={updatePassenger}
                                    //decreasePassengers={decreasePassengers}
                                    //increasePassengers={increasePassengers}
                                    //removePassenger={removePassenger}
                                    setPassengers={setPassengers}
                                    passengers={passengers}

                                />

                                <Button
                                    type="submit"
                                    className="h-12 px-5 dm:w-40 mt-10"
                                >
                                    ادامه فرایند خرید

                                </Button>

                            </Form>
                        )
                    }}
                </Formik>



            </div>



        </div>
    )
}

export default CipDetails;

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const { locale, params } = context;

    const url = 'fa/cip/' + params?.CipDetail;

    const airportData: any = await getAirportByUrl(url, locale === "fa" ? "fa-IR" : "en-US");

    let availibilityData: any = null;
    if (airportData?.data?.result.code) {


        const response: any = await availabilityByIataCode(airportData.data.result.code);
        if (response?.data?.result) {

            availibilityData = {
                availability: response.data.result.availability,
                latitude: response.data.result.latitude?.replace("/","."),
                longitude: response.data.result.longitude?.replace("/",".")
            }
        }
    }

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common', 'cip']),
                airportData: airportData?.data?.result || null,
                availabilities: availibilityData || null
            },

        }
    )

}
