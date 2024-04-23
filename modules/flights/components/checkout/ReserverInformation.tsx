import FormikField from "@/modules/shared/components/ui/FormikField";
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import { validateEmail, validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { Field, FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "next-i18next";

type Props = {
    errors: FormikErrors<{
        reserver: {
            gender: boolean;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
        };
    }>;
    touched: FormikTouched<{
        reserver: {
            gender: boolean;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
        };
    }>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        reserver: {
            gender: boolean;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            extraBed:number;
        };
    }>>;
    values: {
        reserver: {
            gender: boolean;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
        };
    }
    reserverIsPassenger?: boolean;
}

const ReserverInformation: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { errors, touched, setFieldValue, values } = props;

    return (
        <div className="bg-white border border-neutral-300 p-5 rounded-lg">
            <h4 className='font-semibold mb-4 text-lg'>
                {t('reserver-information')}
            </h4>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">
                <div role="group" className="md:col-span-2 md:row-span-2 lg:col-span-1 leading-4" >
                    <label className='block text-xs mb-1' > جنسیت </label>
                    <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                        <Field 
                            type="radio" 
                            className="text-xs" 
                            onChange={(e:any) => {
                                const val = e.target.checked; 
                                setFieldValue('reserver.gender', val);
                            }} 
                            checked={values.reserver.gender} 
                        />
                        مرد
                    </label>
                    <label className='inline-flex items-center gap-1'>
                        <Field 
                            type="radio" 
                            className="text-xs" 
                            onChange={(e:any) => {
                                const val = !e.target.checked; 
                                setFieldValue('reserver.gender', val);
                            }} 
                            checked={!values.reserver.gender} 
                        />
                        زن
                    </label>
                </div>

                <FormikField
                    setFieldValue={setFieldValue}
                    errorText={errors.reserver?.firstName as string}
                    id='firstName'
                    name='reserver.firstName'
                    isTouched={touched.reserver?.firstName}
                    label={t('first-name')}
                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
                    onChange={(value: string) => {
                    }}
                    value={values.reserver.firstName}
                />

                <FormikField
                    setFieldValue={setFieldValue}
                    errorText={errors.reserver?.lastName as string}
                    id='lastName'
                    name='reserver.lastName'
                    isTouched={touched.reserver?.lastName}
                    label={t('last-name')}
                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-last-name'), t('just-english-persian-letter-and-space'))}
                    value={values.reserver.lastName}
                />


                <PhoneInput
                    defaultCountry={
                        {
                            countryCode: "ir",
                            dialCode: "98",
                            format: "... ... ...."
                        }
                    }
                    onChange={(v: string) => {
                        setFieldValue('reserver.phoneNumber', v)
                    }}
                    name='reserver.phoneNumber'
                    isTouched={touched.reserver?.phoneNumber}
                    label={t("phone-number") + " (بدون صفر)"}
                    errorText={errors.reserver?.phoneNumber}
                //initialValue='+989374755674'
                />

                <FormikField
                    setFieldValue={setFieldValue}
                    errorText={errors.reserver?.email as string}
                    id='email'
                    name='reserver.email'
                    isTouched={touched.reserver?.email}
                    label={t('email')}
                    validateFunction={(value: string) => validateEmail({ value: value,reqiredMessage:t('enter-email-address'), invalidMessage: t('invalid-email') })}
                    value={values.reserver.email}
                />
            </div>

        </div>
    )
}

export default ReserverInformation;