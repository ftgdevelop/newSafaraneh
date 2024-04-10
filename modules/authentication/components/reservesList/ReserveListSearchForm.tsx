import { useState } from 'react';
import { dateDiplayFormat } from "@/modules/shared/helpers";
import { useTranslation } from 'next-i18next';
import { Field, Form, Formik } from 'formik';
import FormikField from '@/modules/shared/components/ui/FormikField';
import DatePickerModern from '@/modules/shared/components/ui/DatePickerModern';
import Button from '@/modules/shared/components/ui/Button';

type Props = {
    submitHandle: (values: { FromReturnTime?: string, ToReturnTime?: string, reserveId: string, type: string }) => void;
}

const ReserveListSearchForm: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const [locale, setLocale] = useState<"fa" | "en">("fa");

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
                                className='block w-full focus:border-blue-500 h-10 px-1 text-sm bg-white border outline-none rounded-lg border-neutral-300 focus:border-blue-500'
                            >
                                <option value="">همه</option>
                                <option value="HotelDomestic"> هتل داخلی </option>
                                <option value="Cip"> تشریفات فرودگاهی </option>
                            </Field>
                        </div>

                        <div className="relative modernDatePicker-checkin">
                            <label className="block leading-4 mb-2 text-sm">
                                از تاریخ
                            </label>
                            <DatePickerModern
                                wrapperClassName="block"
                                maximumDate={dateDiplayFormat({ date: new Date().toISOString(), locale: 'en', format: "YYYY-MM-DD" })}
                                inputPlaceholder="از تاریخ"
                                inputClassName="border border-neutral-300 rounded-lg h-10 focus:border-blue-500 outline-none text-base w-full"
                                inputName="FromReturnTime"
                                toggleLocale={() => { setLocale(prevState => prevState === 'fa' ? "en" : "fa") }}
                                locale={locale}
                                onChange={d => { setFieldValue("FromReturnTime", d) }}
                            />
                        </div>

                        <div className="relative modernDatePicker-checkin">
                            <label className="block leading-4 mb-2 text-sm">
                                تا تاریخ
                            </label>
                            <DatePickerModern
                                wrapperClassName="block"
                                maximumDate={dateDiplayFormat({ date: new Date().toISOString(), locale: 'en', format: "YYYY-MM-DD" })}
                                inputPlaceholder="تا تاریخ"
                                inputClassName="border border-neutral-300 rounded-lg h-10 focus:border-blue-500 outline-none text-base w-full"
                                inputName="ToReturnTime"
                                toggleLocale={() => { setLocale(prevState => prevState === 'fa' ? "en" : "fa") }}
                                locale={locale}
                                onChange={d => { setFieldValue("ToReturnTime", d) }}
                            />
                        </div>

                        <div className='flex flex-col justify-end'>
                            <Button
                                type='submit'
                                className='px-5 h-10'
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