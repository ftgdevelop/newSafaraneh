import { useState } from 'react';
import { useTranslation } from "next-i18next"
import { Form, Formik } from 'formik';

import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setReduxUser } from '../store/authenticationSlice';
import PhoneInput from '@/modules/shared/components/ui/PhoneInput';
import FormikField from '@/modules/shared/components/ui/FormikField';
import { validateEmail, validateRequied } from '@/modules/shared/helpers/validation';
import Button from '@/modules/shared/components/ui/Button';
import { setReduxError } from '@/modules/shared/store/errorSlice';
import { loginWithPassword, register } from '../actions';
import Link from 'next/link';

const RegisterForm: React.FC = () => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();

    const [type, setType] = useState<"email" | "mobile">('email');
    const [loading, setLoding] = useState<boolean>(false);

    const onSuccessLogin = (response: any) => {
        const token = response.data?.result?.accessToken
        localStorage.setItem('Token', token);

        dispatch(setReduxUser({
            isAuthenticated: true,
            user: response.data?.result?.user,
            getUserLoading: false
        }));

    }

    const submitHandler = async (values: {
        phoneNumber?: string;
        password: string;
        email?: string;
    }) => {

        if (!values.email && !values.phoneNumber) return;

        setLoding(true);

        dispatch(setReduxUser({
            isAuthenticated: false,
            user: {},
            getUserLoading: true
        }));

        const response: any = await register({
            password: values.password,
            emailOrPhoneNumber: (type === 'email' ? values.email : values.phoneNumber) as string
        });

        if (response.status == 200) {

            const loginResponse: any = await loginWithPassword({
                password: values.password,
                emailOrPhoneNumber: (type === 'email' ? values.email : values.phoneNumber) as string
            });

            if (loginResponse.status == 200) {
                onSuccessLogin(loginResponse);
            } else {
                if (response?.response?.data?.error?.message) {
                    dispatch(setReduxError({
                        title: t('error'),
                        message: response.response.data.error.message,
                        isVisible: true
                    }))
                }
            }

        } else {
            setLoding(false);

            dispatch(setReduxUser({
                isAuthenticated: false,
                user: {},
                getUserLoading: false
            }));


            if (response?.response?.data?.error?.message) {
                dispatch(setReduxError({
                    title: t('error'),
                    message: response.response.data.error.message,
                    isVisible: true
                }))
            }
        }

    }

    return (
        <>
            <div className='grid grid-cols-2 px-5 py-2'>
                <button
                    type='button'
                    className={`text-sm pb-2 border-b border-b-2 ${type === 'mobile' ? "border-neutral-200" : "border-red-600"}`}
                    onClick={() => { setType('email') }}
                >
                    آدرس ایمیل
                </button>
                <button
                    type='button'
                    className={`text-sm pb-2 border-b border-b-2 ${type === 'email' ? "border-neutral-200" : "border-red-600"}`}
                    onClick={() => { setType('mobile') }}
                >
                    شماره موبایل
                </button>

            </div>
            <Formik
                validate={() => { return {} }}
                initialValues={type === "email" ? { password: "", email: "" } : { password: "", phoneNumber: "" }}
                onSubmit={submitHandler}
            >
                {({ errors, touched, setFieldValue, values }) => {
                    return (

                        <Form className='p-5' autoComplete='off' >

                            {(type === "mobile" &&
                                <PhoneInput
                                    labelIsSimple
                                    showRequiredStar
                                    defaultCountry={
                                        {
                                            countryCode: "ir",
                                            dialCode: "98",
                                            format: "... ... ...."
                                        }
                                    }
                                    onChange={(v: string) => {
                                        //setError(false);
                                        setFieldValue('phoneNumber', v)
                                    }}
                                    name='phoneNumber'
                                    isTouched={touched.phoneNumber}
                                    label={"شماره موبایل"}
                                    errorText={errors.phoneNumber}
                                    className="mb-5"
                                />
                            )}

                            {(type === "email" &&

                                <FormikField
                                    labelIsSimple
                                    showRequiredStar
                                    fieldClassName="rtl:text-right ltr"
                                    className="mb-5 font-sans"
                                    //onChange={() => { setError(false); }}
                                    setFieldValue={setFieldValue}
                                    errorText={errors.email as string}
                                    id='email'
                                    name='email'
                                    isTouched={touched.email}
                                    label={t('email')}
                                    validateFunction={(value: string) => validateEmail({ value: value, reqiredMessage: "ایمیل خود را وارد نمایید!", invalidMessage: t('invalid-email') })}
                                    value={values.email!}
                                />
                            )}

                            <FormikField
                                isPassword
                                className="mb-8"
                                fieldClassName="rtl:text-right ltr"
                                labelIsSimple
                                showRequiredStar
                                setFieldValue={setFieldValue}
                                //onChange={()=>{setError(false);}}
                                errorText={errors.password}
                                id='password'
                                name='password'
                                isTouched={touched.password}
                                label="کلمه عبور"
                                maxLength={10}
                                validateFunction={(value: string) => validateRequied(value, 'کلمه عبور را وارد نمایید!')}
                                value={values.password}
                            />

                            <Button
                                type="submit"
                                className="h-12 w-full"
                                loading={loading}
                            >
                                {t('create-account')}
                            </Button>

                            <p className='text-neutral-400 text-2xs mt-6'>
                                با ثبت نام شما در وب سایت ما قوانین و مقررات و همچنین شرایط مربوط به حفظ حریم خصوصی توسط شما تایید می شود.
                            </p>


                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default RegisterForm;