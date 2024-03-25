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
import CipDiscountForm from '@/modules/cip/components/cip-detail/CipDiscountForm';
import { validateDiscountCode } from '@/modules/payment/actions';
import CipAvailibilityItem from '@/modules/cip/components/cip-detail/CipAvailibilityItem';

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

    const availabilities2 = [
        {
          "adults": 1,
          "children": 0,
          "accompanying": 0,
          "name": "خدمات کامل Cip برای پرواز داخلی",
          "remark": null,
          "description": null,
          "boardPrice": 3900000,
          "netPrice": 3315000,
          "salePrice": 3745950,
          "passengers": [
            {
              "passengerType": "Adult",
              "boardPrice": 3900000,
              "netPrice": 3315000,
              "salePrice": 3745950,
              "currencyType": "IRR",
              "id": 2366
            },
            {
              "passengerType": "Accompanying",
              "boardPrice": 1280000,
              "netPrice": 1088000,
              "salePrice": 1229440,
              "currencyType": "IRR",
              "id": 2367
            },
            {
              "passengerType": "Child",
              "boardPrice": 1950000,
              "netPrice": 1657500,
              "salePrice": 1872975,
              "currencyType": "IRR",
              "id": 2368
            }
          ],
          "services": [
            {
              "name": "خدمات ویژه",
              "description": null,
              "hourDescription": null,
              "extraDescription": null,
              "title": "خدمات ویژه ",
              "type": "SpecialService",
              "priceType": "AllService",
              "boardPrice": 1500000,
              "netPrice": 1275000,
              "salePrice": 1384013,
              "currencyType": "IRR",
              "passengerType": null,
              "extraSalePrice": null,
              "extraNetPrice": null,
              "extraBoardPrice": null,
              "rateId": 0,
              "hourSalePrice": null,
              "hourNetPrice": null,
              "hourBoardPrice": null,
              "picture": {
                "path": "https://cdn2.safaraneh.com/images/cip/services/default.jpg",
                "altAttribute": "default",
                "titleAttribute": "default service"
              },
              "count": 0,
              "extraCount": null,
              "hourCount": null,
              "id": 1049
            },
            {
              "name": "FAST TRACK",
              "description": null,
              "hourDescription": null,
              "extraDescription": null,
              "title": "FAST TRACK برای پروازهای داخلی",
              "type": "FastTrack",
              "priceType": "AllService",
              "boardPrice": 1450000,
              "netPrice": 1232500,
              "salePrice": 1392725,
              "currencyType": "IRR",
              "passengerType": null,
              "extraSalePrice": null,
              "extraNetPrice": null,
              "extraBoardPrice": null,
              "rateId": 0,
              "hourSalePrice": null,
              "hourNetPrice": null,
              "hourBoardPrice": null,
              "picture": {
                "path": "https://cdn2.safaraneh.com/images/cip/services/default.jpg",
                "altAttribute": "default",
                "titleAttribute": "default service"
              },
              "count": 0,
              "extraCount": null,
              "hourCount": null,
              "id": 1045
            }
          ],
          "transport": [],
          "passengerTypeServices": [
            {
              "passengerType": "Adult",
              "services": []
            },
            {
              "passengerType": "Child",
              "services": []
            },
            {
              "passengerType": "Infant",
              "services": []
            },
            {
              "passengerType": "Accompanying",
              "services": []
            }
          ],
          "id": 10
        },
        {
          "adults": 1,
          "children": 0,
          "accompanying": 0,
          "name": "خدمات کامل Cip برای پرواز خارجی",
          "remark": null,
          "description": null,
          "boardPrice": 4900000,
          "netPrice": 4165000,
          "salePrice": 4643975,
          "passengers": [
            {
              "passengerType": "Adult",
              "boardPrice": 4900000,
              "netPrice": 4165000,
              "salePrice": 4643975,
              "currencyType": "IRR",
              "id": 2363
            },
            {
              "passengerType": "Accompanying",
              "boardPrice": 1280000,
              "netPrice": 1088000,
              "salePrice": 1229440,
              "currencyType": "IRR",
              "id": 2364
            },
            {
              "passengerType": "Child",
              "boardPrice": 2450000,
              "netPrice": 2082500,
              "salePrice": 2321988,
              "currencyType": "IRR",
              "id": 2365
            }
          ],
          "services": [
            {
              "name": "خدمات ویژه",
              "description": null,
              "hourDescription": null,
              "extraDescription": null,
              "title": "خدمات ویژه ",
              "type": "SpecialService",
              "priceType": "AllService",
              "boardPrice": 1500000,
              "netPrice": 1275000,
              "salePrice": 1384013,
              "currencyType": "IRR",
              "passengerType": null,
              "extraSalePrice": null,
              "extraNetPrice": null,
              "extraBoardPrice": null,
              "rateId": 0,
              "hourSalePrice": null,
              "hourNetPrice": null,
              "hourBoardPrice": null,
              "picture": {
                "path": "https://cdn2.safaraneh.com/images/cip/services/default.jpg",
                "altAttribute": "default",
                "titleAttribute": "default service"
              },
              "count": 0,
              "extraCount": null,
              "hourCount": null,
              "id": 1049
            },
            {
              "name": "FAST TRACK",
              "description": null,
              "hourDescription": null,
              "extraDescription": null,
              "title": "FAST TRACK برای پروازهای خارجی",
              "type": "FastTrack",
              "priceType": "AllService",
              "boardPrice": 2450000,
              "netPrice": 2082500,
              "salePrice": 2277214,
              "currencyType": "IRR",
              "passengerType": null,
              "extraSalePrice": null,
              "extraNetPrice": null,
              "extraBoardPrice": null,
              "rateId": 0,
              "hourSalePrice": null,
              "hourNetPrice": null,
              "hourBoardPrice": null,
              "picture": {
                "path": "https://cdn2.safaraneh.com/images/cip/services/default.jpg",
                "altAttribute": "default",
                "titleAttribute": "default service"
              },
              "count": 0,
              "extraCount": null,
              "hourCount": null,
              "id": 1048
            }
          ],
          "transport": [],
          "passengerTypeServices": [
            {
              "passengerType": "Adult",
              "services": []
            },
            {
              "passengerType": "Child",
              "services": []
            },
            {
              "passengerType": "Infant",
              "services": []
            },
            {
              "passengerType": "Accompanying",
              "services": []
            }
          ],
          "id": 11
        }
      ];


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

    const [discountData, setDiscountData] = useState<any>();
    const [discountLoading, setDiscountLoading] = useState<boolean>(false);
  
    const [promoCode,setPromoCode] = useState<string>("");


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

    const discountSubmitHandler = async (value: string) => {

        setDiscountLoading(true);
        setDiscountData(undefined);

        const key = validateResponse?.preReserveKey;
        
        if (!key) return;
    
        const response = await validateDiscountCode({ prereserveKey: key, type: 'Cip', discountPromoCode: value });
    
        setDiscountLoading(false);
    
        if (response?.data?.result) {
          setDiscountData(response.data.result);
          setPromoCode(value);
        } else if (response?.data?.error) {
          setDiscountData(response.data?.error);
        }
    
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

                    {!!selectedAvailability && <Steps
                        className="mt-6 md:mt-10 mb-5 max-sm:hidden"
                        items={[
                            { label: "تکمیل اطلاعات", status: "active" },
                            { label: "صفحه درگاه بانک", status: "up-comming" },
                            { label: "تایید و پرداخت", status: "up-comming" },
                            { label: "تکمیل خرید", status: "up-comming" }
                        ]}
                    />}

                    {availabilities && availabilities.availability.length > 1 && !selectedAvailability && (
                        <>
                            {availabilities.availability.map(item =>(
                                <CipAvailibilityItem 
                                    key={item.id}
                                    item={item}
                                    setSelectedAvailability={setSelectedAvailability}
                                />
                            ))}
                        </>
                    )}

                </div>


                {!!selectedAvailability && (               
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

                                    <br />

                                    <CipDiscountForm 
                                        onSubmit={discountSubmitHandler}
                                        data={discountData}
                                        loading={discountLoading}
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
                )}



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
