import { useCallback, useState } from 'react';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Field, Form, Formik } from 'formik';
import Button from '@/modules/shared/components/ui/Button';
import AutoComplete from '@/modules/shared/components/ui/AutoComplete';
import { Location } from '@/modules/shared/components/ui/icons';
import { Cip, ServerAddress } from '@/enum/url';
import { validateRequied } from '@/modules/shared/helpers/validation';
import AutoCompleteZoom from '@/modules/shared/components/ui/AutoCompleteZoom';
import { DateObject } from 'react-multi-date-picker';
import { CipAutoCompleteType } from '@/modules/cip/types/cip';
import { cipDefaultAirportOptions } from '@/modules/cip/components/searchForm/defaultList';
import RangePicker2 from '../ui/RangePicker2';

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { dateDisplayFormat, persianNumbersToEnglish } from '../../helpers';
import CustomRangeInput, { OuterProps } from '../ui/CustomRangeInput';

type SearchFormValues = {
    airportUrl: string;
    rangeDate: [DateObject | null, DateObject | null];
}

type Props = {
    defaultValues?: SearchFormValues;
    research?: () => void;
    wrapperClassName?: string;
}
export type CipRecentSearchItem = {
    url: string;
    airportName:string;
    rangeDate: string[] | null[];
}

const TestTow: React.FC<Props> = props => {

    const router = useRouter();

    const { t } = useTranslation('common');

    const { defaultValues } = props;

    const [submitPending, setSubmitPending] = useState<boolean>(false);

    const [selectedAirportName, setSelectedAirportName] = useState<string>("");
    
    
    const renderOption = useCallback((option: CipAutoCompleteType, direction: "ltr" | "rtl" | undefined) => (
        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
            <Location className="w-5 h-5 fill-current" />
            <div className='text-xs'>{option.name}</div>
        </div>
    ), []);

    const submitHandle = (values: SearchFormValues) => {

        if (!values.airportUrl) return;

        setSubmitPending(true);

        let url = "/" + values.airportUrl;

        const localStorageRecentSearches = localStorage?.getItem("cipRecentSearches");
        const recentSearches: CipRecentSearchItem[] = localStorageRecentSearches ? JSON.parse(localStorageRecentSearches) : [];

        const searchObject: CipRecentSearchItem = {
            url: url,
            airportName: selectedAirportName,
            rangeDate: []
        };

        if (!(recentSearches.find(item => item.url === searchObject.url))) {
            recentSearches.unshift(searchObject);

            const slicedArray = recentSearches.slice(0, 10);

            const updatedRecentSearches = JSON.stringify(slicedArray);
            localStorage?.setItem("cipRecentSearches", updatedRecentSearches)
        }
        const finalValues: Record<string, any> = {};

        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof Array) {
                let formattedStart = null;
                let formattedEnd = null;

                if (value[0] instanceof DateObject) {
                    formattedStart = dateDisplayFormat({
                        date: value[0],
                        locale: "en",
                    });    
                }
                if (value[1] instanceof DateObject) {
                    formattedEnd = dateDisplayFormat({
                        date: value[1],
                        locale: "en",
                    });   
                }
                
                let formatted = [formattedStart ? persianNumbersToEnglish(formattedStart) : formattedStart, formattedEnd ?  persianNumbersToEnglish(formattedEnd) : null];

                finalValues[key] = formatted;
            } else {
                finalValues[key] = value;
            }
        });

        console.log({finalValues});
        // router.push(url);

    }

    const formInitialValue: {
        airportUrl: string;
        rangeDate: [DateObject | null, DateObject | null];
    } = defaultValues || {
        rangeDate:[null,null],
        airportUrl: ""
    }

    const defaultList = cipDefaultAirportOptions;

    const theme2 = process.env.THEME === "THEME2";

    const theme1 = process.env.THEME === "THEME1";

    const today = new DateObject({
    date: new Date(),
    format: "YYYY/MM/DD",
    calendar: persian,
    locale: persian_fa,
    });

    const tomorrow = new DateObject({
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    format: "YYYY/MM/DD",
    calendar: persian,
    locale: persian_fa,
    });

    return (
        <div className={`text-sm ${props.wrapperClassName || ""}`}>

            <Formik
                validate={() => { return {} }}
                initialValues={formInitialValue}
                onSubmit={submitHandle}
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

                        <Form autoComplete='off' >

                            <div className={`grid grid-cols-1 md:grid-cols-4 ${theme1 ? "lg:grid-cols-5" : "lg:grid-cols-6"} gap-3 gap-y-5 relative`}>

                                {theme2 ? (
                                    <div className="lg:col-span-2 relative ">
                                        <AutoCompleteZoom
                                            //defaultListLabel="محبوب ترین ها"
                                            label="جستجوی نام فرودگاه یا شهر"
                                            type="hotel"
                                            defaultList={defaultList}
                                            inputId="destination"
                                            //checkTypingLanguage
                                            noResultMessage={t('NoResultsFound')}
                                            createTextFromOptionsObject={(item: CipAutoCompleteType) => item.name || ""}
                                            renderOption={renderOption}
                                            acceptLanguage="fa-IR"
                                            icon="location"
                                            inputClassName={`w-full bg-white truncate leading-4 border rounded-lg border-neutral-400 py-0.5 text-md h-12 flex flex-col justify-center`}
                                            placeholder="جستجوی نام فرودگاه یا شهر"
                                            min={3}
                                            url={`${ServerAddress.Type}${ServerAddress.Cip}${Cip.SearchAirport}`}
                                            onChangeHandle={
                                                (v: CipAutoCompleteType | undefined) => {
                                                    setFieldValue("airportUrl", v?.url || "", true);
                                                    setSelectedAirportName(v?.name || "")
                                                }
                                            }
                                        />

                                        <Field
                                            validate={(value: string) => validateRequied(value, "فرودگاه را انتخاب کنید.")}
                                            type='hidden'
                                            name="airportUrl"
                                            value={values.airportUrl}
                                        />
                                        
                                        {touched.airportUrl && errors.airportUrl && <div className='text-xs text-red-500'> {errors.airportUrl as string}</div>}

                                    </div>
                                ) : (

                                    <div className='lg:col-span-2 relative'>
                                        <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-[2] leading-5 pointer-events-none">
                                            جستجوی نام فرودگاه یا شهر
                                        </label>
                                        <AutoComplete
                                            defaultList={defaultList}
                                            noResultMessage={t('NoResultsFound')}
                                            placeholder='جستجوی نام فرودگاه یا شهر'
                                            acceptLanguage={i18n?.language === "ar" ? "ar-AE" : i18n?.language === "en" ? "en-US" : "fa-IR"}
                                            inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                                            type="cip"
                                            icon='location'
                                            createTextFromOptionsObject={(item: CipAutoCompleteType) => item.name || ""}
                                            renderOption={renderOption}
                                            min={3}
                                            url={`${ServerAddress.Type}${ServerAddress.Cip}${Cip.SearchAirport}`}
                                            onChangeHandle={
                                                (v: CipAutoCompleteType | undefined) => {
                                                    setFieldValue("airportUrl", v?.url || "", true);
                                                    setSelectedAirportName(v?.name || "")
                                                }
                                            }
                                        />
                                        <Field
                                            validate={(value: string) => validateRequied(value, "فرودگاه را انتخاب کنید.")}
                                            type='hidden'
                                            name="airportUrl"
                                            value={values.airportUrl}
                                        />
                                        {touched.airportUrl && errors.airportUrl && <div className='text-xs text-red-500'> {errors.airportUrl as string}</div>}
                                    </div>
                                )}
                                <div className='col-span-2'>
                                    <RangePicker2<OuterProps>
                                        defaultValue={[today, tomorrow]}
                                        onChange={(v) => setFieldValue("rangeData", v)}
                                        value={values.rangeDate}
                                        Input={CustomRangeInput}
                                    />
                                </div>
 
                                <div className={`relative lg:col-span-1`}>
                                    <Button
                                        color='blue'
                                        type='submit'
                                        className='h-12 w-full sm:max-w-64 mx-auto'
                                        loading={submitPending}
                                    >
                                        {t('search')}
                                    </Button>
                                </div>
                            </div>


                        </Form>
                    )
                }
                }
            </Formik>
        </div>

    )
}

export default TestTow;