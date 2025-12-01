import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Field, Form, Formik } from 'formik';
import FormikField from '@/modules/shared/components/ui/FormikField';
import Button from '@/modules/shared/components/ui/Button';
import DatePicker2 from '@/modules/shared/components/ui/DatePicker2';
import DomesticFlightDatePickerInput from '@/modules/shared/components/ui/DomesticFlightDatePickerInput';

type SearchValues = {
    FromReturnTime?: string;
    ToReturnTime?: string;
    reserveId: string;
    type: string;
};

type Props = {
    submitHandle: (values: SearchValues) => void;
};

const ReserveListSearchForm: React.FC<Props> = ({ submitHandle }) => {
    const { t } = useTranslation('common');

    const [isFa, setIsFa] = useState(true);

    const theme2 = process.env.THEME === "THEME2";

    const initialValues: SearchValues = {
        FromReturnTime: "",
        ToReturnTime: "",
        reserveId: "",
        type: ""
    };

    return (
        <Formik
            validate={() => ({})}
            initialValues={initialValues}
            onSubmit={submitHandle}
        >
            {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
                if (isSubmitting && !isValid) {
                    setTimeout(() => {
                        const firstError = document.querySelector(".has-validation-error");
                        if (firstError) {
                            firstError.scrollIntoView({ behavior: "smooth" });
                        }
                    }, 100);
                }

                return (
                    <Form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6" autoComplete="off">
                        
                        <div className="sm:col-span-2 lg:col-span-5 text-sm">
                            جستجوی سفارش
                        </div>

                        <FormikField
                            labelIsSmall
                            labelIsSimple
                            setFieldValue={setFieldValue}
                            errorText={errors.reserveId}
                            id="reserveId"
                            name="reserveId"
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
                                className={`block w-full px-1 text-sm bg-white border outline-none rounded-lg focus:border-blue-500
                                    ${theme2 ? "h-13 border-neutral-400" : "border-neutral-300 h-10"}`}
                            >
                                <option value="">همه</option>
                                <option value="HotelDomestic">هتل داخلی</option>
                                <option value="Cip">تشریفات فرودگاهی</option>
                                <option value="FlightDomestic">پرواز داخلی</option>
                            </Field>
                        </div>


                        <DatePicker2
                            name="FromReturnTime"
                            value={values.FromReturnTime}
                            values={values}
                            setFieldValue={setFieldValue}
                            isFa={isFa}
                            setIsFa={setIsFa}
                            Input={DomesticFlightDatePickerInput}
                        />

                        <DatePicker2
                            name="ToReturnTime"
                            value={values.ToReturnTime}
                            values={values}
                            setFieldValue={setFieldValue}
                            isFa={isFa}
                            setIsFa={setIsFa}
                            Input={DomesticFlightDatePickerInput}
                        />

                        {/* Submit Button */}
                        <div className="flex flex-col justify-end">
                            <Button
                                type="submit"
                                className={`px-5 ${theme2 ? "h-13" : "h-10"}`}
                            >
                                جستجو
                            </Button>
                        </div>

                    </Form>
                );
            }}
        </Formik>
    );
};

export default ReserveListSearchForm;