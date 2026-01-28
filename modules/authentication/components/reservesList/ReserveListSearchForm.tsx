import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Field, Form, Formik, useFormikContext } from 'formik';
import FormikField from '@/modules/shared/components/ui/FormikField';
// import DatePickerModern from '@/modules/shared/components/ui/DatePickerModern';
import Button from '@/modules/shared/components/ui/Button';
import MultiDatePicker from '@/modules/shared/components/ui/MultiDatePicker';
import DomesticFlightDatePickerInput, { DomesticFlightInputProps } from '@/modules/shared/components/ui/DomesticFlightDatePickerInput';
import { DateObject } from 'react-multi-date-picker';
import { useFormikDateRange } from '@/modules/shared/hooks/use-formik-date-range';
import BookingInput, { BookingInputProps } from '@/modules/shared/components/ui/BookingInput';

interface ReserveListSearchSchema {
    FromReturnTime?: string;
    ToReturnTime?: string;
    reserveId: string;
    type: string;
}

type Props = {
    submitHandle: (values: ReserveListSearchSchema) => void;
}


const DateInputs: React.FC<{
    theme3?: boolean;
    isFa: boolean;
    setIsFa: (isFa: boolean) => void;
}> = ({
    theme3,
    isFa,
    setIsFa,
}) => {
        const {
            values,
            setFieldValue,
            errors,
            touched,
            isValid,
            isSubmitting,
        } = useFormikContext<ReserveListSearchSchema>();
        const { minEndDate } = useFormikDateRange({
            values,
            setFieldValue,
            startField: 'FromReturnTime',
            endField: 'ToReturnTime',
            isFa,
        });
    return (
        <>
            <div className="relative modernDatePicker-checkin">

                <MultiDatePicker<BookingInputProps>
                minDate={new DateObject({ date: new Date() })}
                isFa={isFa}
                setIsFa={setIsFa}
                onChange={(v)=>setFieldValue('FromReturnTime', v)}
                Input={BookingInput}
                value={values.FromReturnTime ?? ""}
                inputProps={{
                    isTouched:touched.FromReturnTime,
                    errors: errors.FromReturnTime,
                    label:'از تاریخ',
                }}
                
                /> 
            </div>

            <div className="relative modernDatePicker-checkin">
                <MultiDatePicker<BookingInputProps>
                Input={BookingInput}
                isFa={isFa}
                setIsFa={setIsFa}
                inputProps={
                    {
                        isTouched:touched.ToReturnTime,
                        errors: errors.ToReturnTime,
                        label: 'تاریخ برگشت',
                        isEnd: true
                    }
                }
                onChange={(v)=>setFieldValue('ToReturnTime', v)}
                value={values.ToReturnTime ?? ''}
                minDate={minEndDate}
                
            />
            </div>
        </>
    )
}


const ReserveListSearchForm: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const [isFa, setIsFa] = useState<boolean>(true);
    
    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    const initialValues = {
        FromReturnTime: "",
        ToReturnTime: "",
        reserveId: "",
        type: ""
    }

    return (

        <Formik
            validate={() => { return {} }}
            initialValues={initialValues}
            onSubmit={props.submitHandle}
        >
            {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
                if (isSubmitting && !isValid) {
                    setTimeout(() => {
                        const formFirstError = document.querySelector(".has-validation-error");
                        if (formFirstError) {
                            formFirstError.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 100)
                }
                return (

                    <Form className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6' autoComplete='off' >

                        <div className='sm:col-span-2 lg:col-span-5 text-sm'> جستجوی سفارش </div>

                        <FormikField
                            labelIsSmall
                            labelIsSimple
                            setFieldValue={setFieldValue}
                            errorText={errors.reserveId}
                            id='reserveId'
                            name='reserveId'
                            isTouched={touched.reserveId}
                            label={t('شماره سفارش')}
                            value={values.reserveId}
                        />

                        <div className="relative">
                            <label className="block leading-4 mb-2 text-sm">
                                نوع سفارش
                            </label>
                            <Field
                                name="type"
                                as="select"
                                className={`block w-full focus:border-blue-500 ${theme2 ? "h-13 border-neutral-400": theme3? "h-12 border-neutral-300": "h-10 border-neutral-300"} px-1 text-sm bg-white border outline-none rounded-lg focus:border-blue-500`}
                            >
                                <option value="">همه</option>
                                <option value="HotelDomestic"> هتل داخلی </option>
                                <option value="Cip"> تشریفات فرودگاهی </option>
                                <option value="FlightDomestic"> پرواز داخلی </option>
                            </Field>
                        </div>

                        <DateInputs
                            isFa={isFa}
                            setIsFa={setIsFa}
                        />

                        <div className='flex flex-col justify-end'>
                            <Button
                                type='submit'
                                className={`px-5 ${theme2?"h-13": theme3 ? "h-12" : "h-10"}`}
                            >
                                جستجو
                            </Button>
                        </div>

                    </Form>
                )
            }}
        </Formik>
    )
}

export default ReserveListSearchForm;