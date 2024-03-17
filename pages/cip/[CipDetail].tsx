import { useState, useEffect } from 'react';
import { CipValidate, availabilityByIataCode, getAirportByUrl } from "@/modules/cip/actions";
import CipDetailGallery from "@/modules/cip/components/cip-detail/CipDetailGallery";
import CipName from "@/modules/cip/components/cip-detail/CipName";
import { CipAvailabilityItemType, CipFormCompanionItemType, CipFormPassengerItemType, CipGetAirportByUrlResponseType, CipValidateResponseType } from "@/modules/cip/types/cip";
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
import CipCompanionInformation from '@/modules/cip/components/cip-detail/CipCompanionInformation';
import CipExtraServices from '@/modules/cip/components/cip-detail/CipExtraServices';
import CipTransport from '@/modules/cip/components/cip-detail/CipTransport';
import Head from 'next/head';
import CipAboutAirport from '@/modules/cip/components/cip-detail/CipAboutAirport';
import { PortalDataType } from '@/modules/shared/types/common';
import CipTerms from '@/modules/cip/components/cip-detail/CipTerms';
import CipFacilities from '@/modules/cip/components/cip-detail/CipFacilities';
import { useRouter } from 'next/router';
import CipFAQ from '@/modules/cip/components/cip-detail/CipFAQ';
import CipPriceDetails from '@/modules/cip/components/cip-detail/CipPriceDetails';

const CipDetails: NextPage = ({ airportData, availabilities, portalData }: { portalData?: PortalDataType, airportData?: CipGetAirportByUrlResponseType, availabilities?: { latitude: string; longitude: string; availability: CipAvailabilityItemType[] } }) => {

    const { t } = useTranslation('common');
    const { t: tCip } = useTranslation('cip');

    const router = useRouter();

    let siteName = "";
    let tel = "";
    let twitter = "";
    let siteURL = "";

    if (portalData) {
        siteName = portalData.Phrases.find(item => item.Keyword === "Name")?.Value || "";
        siteURL = portalData.PortalName || "";
    }



    const user = useAppSelector(state => state.authentication.isAuthenticated ? state.authentication.user : undefined);

    const [passengers, setPassengers] = useState<CipFormPassengerItemType[]>([
        {
            id: '1',
            gender: user ? user.gender : true,
            type: "Adult",
            services: []
        }
    ]);

    const [companions, setCompanions] = useState<CipFormCompanionItemType[]>([]);

    const [validateResponse, setValidateResponse] = useState<CipValidateResponseType>();
    const [selectedServicesArray, setSelectedServicesArray] = useState<CipValidateResponseType['optionalServices']>();

    const [activeServices, setActiveServices] = useState<number[]>([]);

    const updateActiveService = (id: number) => {
        setActiveServices(prevArr => ([
            ...prevArr, id
        ]))
    }



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


    useEffect(() => {
        if (availabilities?.availability && availabilities.availability.length === 1) {
            setSelectedAvailability(availabilities.availability[0]);
        }
    }, [availabilities?.latitude]);


    useEffect(() => {
        if (selectedAvailability) {
            const validate = async (iataCode: string, rateId: number) => {

                const respone: any = await CipValidate({ iataCode: iataCode, rateId: rateId });

                if (respone) {
                    setValidateResponse(respone.data.result);
                    const updatedOptionalServices = respone.data.result.optionalServices.map((item: any) => {
                        if (item.type === "Pet") {
                            return ({ ...item, count: 1 })
                        } else {
                            return item;
                        }
                    })
                    setSelectedServicesArray(updatedOptionalServices);
                }
            }
            if (airportData?.code) {
                validate(airportData.code, selectedAvailability.id);
            }

            if (selectedAvailability.transport?.length) {
                setSelectedTransport(selectedAvailability.transport.map(item => ({ ...item, count: 0 })));
            }

        }
    }, [selectedAvailability, airportData?.code]);

    const updateSelectedServices = (id: number, property: string, change: "inc" | "dec") => {
        setSelectedServicesArray((prevState: any) => {
            const updatingService = { ...prevState.find((item: any) => item.id === id) };
            const otherServices = prevState.filter((item: any) => item.id !== id);
            if (updatingService[property]) {
                if (change === "inc") {
                    updatingService[property]++;
                } else {
                    updatingService[property]--;
                }
            } else {
                if (change === "inc") {
                    updatingService[property] = 1;
                }
            }
            return (
                [...otherServices, updatingService]
            );
        })
    }



    const [selectedTransport, setSelectedTransport] = useState<any[]>([]);

    const updateTransport = (id: number, fn: string) => {
        setSelectedTransport(prevState => {
            const updatingTransport = { ...prevState.find(item => item.id === id) };
            const otherTransport = prevState.filter(item => item.id !== id);

            if (fn === "inc") {
                updatingTransport.count++;
            } else {
                if (updatingTransport.count > 0) {
                    updatingTransport.count--;
                }
            }
            return (
                [...otherTransport, updatingTransport]
            );
        })
    }




    let airportLocation: [number, number] | undefined = undefined;
    if (availabilities?.latitude && availabilities.longitude) {
        airportLocation = [+availabilities.latitude, +availabilities.longitude];
    }


    let passengerServicesArray: CipAvailabilityItemType['passengerTypeServices'];
    if (selectedAvailability) {
        passengerServicesArray = selectedAvailability.passengerTypeServices;
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
        companions: [],
        originName: "",
        destinationName: "",
        airline: "",
        flightNumber: "",
        flightDate: "",
        flightTime: "",
        cip_transport_address: ""

    }

    return (
        <>
            <Head>
                {router.query.CipDetail && router.query.CipDetail === "فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات" ?
                    <>
                        <title>رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی</title>
                        <meta property="description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
                        <meta property="og:title" content="رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی" />
                        <meta property="og:description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@safaraneh" />
                        <meta name="twitter:title" content="رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی" />
                        <meta name="twitter:description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
                    </>
                    :
                    <title>تشریفات فرودگاهی cip || رزرو آنلاین هتل و بلیط هواپیما</title>
                }
            </Head>
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
                        className="mt-6 md:mt-10 mb-5 max-sm:hidden"
                        items={[
                            { label: "تکمیل اطلاعات", status: "active" },
                            { label: "صفحه درگاه بانک", status: "up-comming" },
                            { label: "تایید و پرداخت", status: "up-comming" },
                            { label: "تکمیل خرید", status: "up-comming" }
                        ]}
                    />
                </div>

                <div>
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

                                    <div id="reserver_passengers_section">

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
                                            setPassengers={setPassengers}
                                            passengers={passengers}

                                        />
                                    </div>


                                    <CipCompanionInformation
                                        companions={companions}
                                        setCompanions={setCompanions}
                                        passengerServicesArray={passengerServicesArray}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        touched={touched}
                                        values={values}

                                    />

                                    {!!selectedServicesArray && <CipExtraServices
                                        selectedServicesArray={selectedServicesArray}
                                        updateSelectedServices={updateSelectedServices}
                                        activeServices={activeServices}
                                        updateActiveService={updateActiveService}
                                    />}

                                    <CipTransport
                                        selectedTransport={selectedTransport}
                                        updateTransport={updateTransport}
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                        touched={touched}
                                        values={values}
                                    />

                                    <CipPriceDetails 
                                        activeServices={activeServices}
                                        companions={companions}
                                        passengerServicesArray={passengerServicesArray}
                                        passengers={passengers}
                                        selectedServicesArray={selectedServicesArray}
                                        selectedTransport={selectedTransport}
                                        //discountResponse={"klkl"}
                                        validateResponse={validateResponse}
                                    />
                                    
                                    <div className='flex justify-end py-4'>
                                        <Button
                                            type="submit"
                                            className="h-12 px-5 md:w-40"
                                        >
                                            ادامه فرایند خرید
                                        </Button>

                                    </div>


                                    <div id="about_section">
                                        <CipAboutAirport content={airportData?.description} siteName={siteName} siteUrl={siteURL} />
                                        <CipTerms />
                                    </div>

                                    <div id="facilities_section">
                                        <CipFacilities facilities={airportData?.facilities} />
                                        <CipFAQ />
                                    </div>

                                </Form>
                            )
                        }}
                    </Formik>



                </div>



            </div>
        </>
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
                latitude: response.data.result.latitude?.replace("/", "."),
                longitude: response.data.result.longitude?.replace("/", ".")
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
