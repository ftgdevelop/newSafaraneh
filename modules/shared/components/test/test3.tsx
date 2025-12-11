import { useCallback, useState } from 'react';
import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Field, Form, Formik } from 'formik';
import Button from '@/modules/shared/components/ui/Button';
import AutoComplete from '@/modules/shared/components/ui/AutoComplete';
import { Location, Search } from '@/modules/shared/components/ui/icons';
import { Cip, ServerAddress } from '@/enum/url';
import { validateRequied } from '@/modules/shared/helpers/validation';
import { DateObject } from 'react-multi-date-picker';
import { CipAutoCompleteType } from '@/modules/cip/types/cip';
import { cipDefaultAirportOptions } from '@/modules/cip/components/searchForm/defaultList';
import RangePicker2 from '../ui/RangePicker2';

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CustomRangeInput, { OuterProps } from '../ui/CustomRangeInput';
import { dateDisplayFormat, persianNumbersToEnglish } from '../../helpers';

type SearchFormValues = {
    airportUrl: string;
    flightDate: [DateObject | null, DateObject | null];
}

type Props = {
    defaultValues?: SearchFormValues;
    research?: () => void;
    wrapperClassName?: string;
}


const TestThree: React.FC<Props> = props => {

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
       
        
    }
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
    const formInitialValue: {
        airportUrl: string;
        flightDate: [DateObject | null, DateObject | null];
    } = defaultValues || {
            airportUrl: "",
            flightDate: [null, null],
        }

    const defaultList = cipDefaultAirportOptions;

    const theme2 = process.env.THEME === "THEME2";

    const theme1 = process.env.THEME === "THEME1";

    const theme3 = true ;
    

    return (
        <div className={`text-sm ${props.wrapperClassName || ""}`}>

            <Formik
                validate={() => { return {} }}
                initialValues={formInitialValue}
                onSubmit={submitHandle}
            >
                {({ errors, touched, setFieldValue, values, isValid, isSubmitting, initialValues }) => {

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

                                {theme3 && (
                                    <div className='lg:col-span-2 relative '>
                                        <label htmlFor="destination" className="font-semibold z-[2] leading-5 pointer-events-none">
                                            جستجوی هتل / مقصد
                                        </label>
                                        <AutoComplete
                                            defaultList={defaultList}
                                            noResultMessage={t('NoResultsFound')}
                                            placeholder='جستجوی هتل / مقصد'
                                            acceptLanguage={i18n?.language === "ar" ? "ar-AE" : i18n?.language === "en" ? "en-US" : "fa-IR"}
                                            inputClassName={`w-full outline-none rounded-lg bg-neutral-200 py-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
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
                                            validate={(value: string) => validateRequied(value, "مقصد را انتخاب کنید.")}
                                            type='hidden'
                                            name="airportUrl"
                                            value={values.airportUrl}
                                        />
                                        {touched.airportUrl && errors.airportUrl && <div className='text-xs text-red-500'> {errors.airportUrl as string}</div>}
                                    </div>
                                )}
                                <div className='col-span-2 flex items-center'>
                                    <RangePicker2<OuterProps>
                                        onChange={(v) => setFieldValue('flightDate', v)}
                                        defaultValue={initialValues.flightDate}
                                        Input={CustomRangeInput}
                                        inputProps={{
                                            theme3,
                                            isTouched: touched.flightDate,
                                            validateFunction:(value: string) => validateRequied(value, "تاریخ  را وارد کنید")
                                        }}
                                    />
                                </div>
                                <div className={`relative flex justify-center items-center col-span-1`}>
                                    <Button
                                        color='blue'
                                        type='submit'
                                        className='h-12 w-full sm:max-w-64 mx-auto !bg-[#fdab05] hover:!bg-[#fdba37]'
                                        loading={submitPending}
                                    >
                                       <Search className='w-8 h-8 fill-white'/>
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

export default TestThree;