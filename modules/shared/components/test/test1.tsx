import {  useState } from 'react';
import {  useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import {  Form, Formik } from 'formik';
import FormikField from '@/modules/shared/components/ui/FormikField';
import DatePicker2 from '@/modules/shared/components/ui/DatePicker2';
import CipDatePickerInput, { CipInputProps } from '@/modules/shared/components/ui/CipDatePickerInput';
import { DateObject } from 'react-multi-date-picker';
import { validateRequied } from '../../helpers/validation';
import { dateDisplayFormat, persianNumbersToEnglish } from '../../helpers';

type SearchFormValues = {
    airlineName : string;
    flightDate: DateObject | null;
}

type Props = {
    defaultValues?: SearchFormValues;
    research?: () => void;
    wrapperClassName?: string;
}

const TestOne: React.FC<Props> = props => {


    const { t } = useTranslation('common');

    const { defaultValues } = props;

    const [submitPending, setSubmitPending] = useState<boolean>(false);

    
    const [isFa, setIsFa] = useState(true);
    


    const submitHandle = (values: SearchFormValues) => {
        const finalValues: Record<string, any> = {};

        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof DateObject) {
                let formatted = dateDisplayFormat({
                    date: value,
                    locale: "en",
                });

                formatted = persianNumbersToEnglish(formatted);

                finalValues[key] = formatted;
            } else {
                finalValues[key] = value;
            }
        });

        console.log({finalValues});
        
    };

    const formInitialValue: {
        airlineName: string;
        flightDate: DateObject | null;
    } = defaultValues || {
        airlineName: "",
        flightDate: null,
    }


    const theme2 = process.env.THEME === "THEME2";

    const theme1 = process.env.THEME === "THEME1";


    return (
        <div className={`text-sm ${props.wrapperClassName || ""}`}>
            <div className='pb-6 font-semibold text-lg'>
                اطلاعات سفر
                (Press Enter)
            </div>

            <Formik
                validate={() => { return {} }}
                initialValues={formInitialValue}
                onSubmit={submitHandle}
                
            >
                {({ errors, touched, setFieldValue, values, isValid, isSubmitting, submitForm }) => {
                    
                    if (isSubmitting && !isValid) {
                        setTimeout(() => {
                            const formFirstError = document.querySelector(".has-validation-error");
                            if (formFirstError) {
                                formFirstError.scrollIntoView({ behavior: "smooth" });
                            }
                        }, 100)
                    }
                    
                    return (

                        <Form autoComplete='off'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    submitForm();  
                                }
                            }}
                        >

                            <div className={`grid grid-cols-1 md:grid-cols-4  gap-3 gap-y-5 z-[2] relative`}>


                                <FormikField
                                    heightClassName="h-10"
                                    name='airlineName'
                                    value={values.airlineName}
                                    setFieldValue={setFieldValue}
                                    className={theme2 ? "relative z-[1]" : ""}
                                    fieldClassName='w-full border border-neutral-400 h-12 rounded-lg focus:border-neutral-900 outline-none'
                                    label='نام ایرلاین'
                                    errorText={errors.airlineName}
                                    validateFunction={(value: string) => validateRequied(value, 'نام ایرلاین اجباری است.')}
                                    isTouched={touched.airlineName}
                                />


                                <div className='modernCalendar-dates-wrapper'>

                                    <div className="relative modernDatePicker-checkin">

                                        <DatePicker2<CipInputProps>
                                            value={values.flightDate}
                                            onChange={(value: DateObject) => {
                                                           
                                                setFieldValue("flightDate", value)
                                            }}
                                            isFa={isFa}
                                            setIsFa={setIsFa}
                                            Input={CipDatePickerInput}
                                            minDate={new Date()}
                                            inputProps={
                                                {
                                                    id: "flightDate",
                                                    name: "flightDate",
                                                    fieldClassName: "",
                                                    isTouched: touched.flightDate,
                                                    label: "تاریخ پرواز",
                                                    validateFunction:(value: string) => validateRequied(value, "تاریخ پرواز را وارد کنید")
                                                    

                                                }}
                                            />   
                                    </div>

                                </div>

                                {/* <div className={`relative md:col-span-4 ${theme1 ? "lg:col-span-5" : "lg:col-span-1"}`}>

                                    <Button
                                        color='blue'
                                        type='submit'
                                        className='h-12 w-full sm:max-w-64 mx-auto'
                                        loading={submitPending}
                                    >
                                        {t('search')}
                                    </Button>
                                </div> */}
                            </div>


                        </Form>
                    )
                }
                }
            </Formik>
        </div>

    )
}

export default TestOne;