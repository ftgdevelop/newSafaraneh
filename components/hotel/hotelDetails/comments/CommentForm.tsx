import { AxiosResponse } from 'axios';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'next-i18next';

import { ServerAddress, Hotel, Header } from '@/enum/url';
import useHttp from '@/hooks/use-http';

type Props = {
    pageId: number
}

const CommentForm: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { sendRequest, loading } = useHttp();

    type FormValues = {
        FullName: string;
        CityName: string;
        Email: string;
        Comment: string;
        Satisfaction: string;
        RoomService: string;
        ResturantQuality: string;
        DealWithPassanger: string;
        IsRecommended: boolean;
    }
    const initialValues: FormValues = {
        FullName: '',
        CityName: '',
        Email: '',
        Comment: '',
        Satisfaction: '',
        RoomService: '',
        ResturantQuality: '',
        DealWithPassanger: '',
        IsRecommended: false
    };

    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const validateRequied = (value: string, message: string) => {
        let error;
        if (!value) {
            error = message;
        }
        return error;
    }
    
    const validateRequiedEmail = (value: string, reqiredMessage: string, invalidMessage: string) => {
        let error;
        if (!value) {
            error = reqiredMessage;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = invalidMessage;
        }

        return error;
    }

    const submitHandle = async (values: FormValues, actions: any) => {

        const params = {
            PageId: props.pageId,
            FullName: values.FullName,
            CityName: values.CityName,
            Email: values.Email,
            Comment: values.Comment,
            IsRecommended: values.IsRecommended || false,
            Satisfaction: +values.Satisfaction,
            RoomService: +values.RoomService,
            ResturantQuality: +values.ResturantQuality,
            DealWithPassanger: +values.DealWithPassanger
        };

        actions.resetForm();

        sendRequest({
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.InsertComment}`,
            header: {
                ...Header,
                "Accept-Language": 'fa-IR',
                apikey: "68703d73-c92c-4105-9f71-9f718aaad2cc"
            },
            method: 'post',
            data: params,
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                debugger;
                //toDo
            }
        });

    }

    return (
        <div className='p-3 sm:p-5 lg:p-7 bg-white rounded-xl grid grid-cols-1 md:grid-cols-3 md:gap-6 mb-8'>
            <div>
                <h5 className='text-sm md:text-base font-semibold mb-5'>{t("submit-suggestion")}</h5>
            </div>

            <div className='md:col-span-2'>
                <Formik
                    validate={() => { return {} }}
                    initialValues={initialValues}
                    onSubmit={submitHandle}
                >
                    {({ errors, touched, isValid, isSubmitting }) => {
                        if (isSubmitting && !isValid) {

                            setTimeout(() => {
                                const formFirstError = document.querySelector(".has-validation-error");
                                if (formFirstError) {
                                    formFirstError.scrollIntoView({ behavior: "smooth" });
                                }
                            }, 100)

                        }
                        return (
                            <Form className='leading-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 text-xs sm:text-sm'>

                                <div className={`sm:col-span-2 lg:col-span-4 ${errors.FullName ? "has-validation-error" : ""}`}>
                                    <label htmlFor="FullName" className='block mb-1' > <span className='text-red-500'>*</span> {t('name-family')}</label>
                                    <Field
                                        validate={(value: string) => validateRequied(value, t('please-enter-name'))}
                                        id="FullName"
                                        name="FullName"
                                        className={`h-10 px-5 border ${errors.FullName && touched.FullName ? "border-red-500" : "border-neutral-300"} outline-none rounded-md w-full`}
                                    />
                                    {errors.FullName && touched.FullName && <div className='text-red-500 text-xs'>{errors.FullName as string}</div>}

                                </div>

                                <div className='lg:col-span-4'>
                                    <label htmlFor="CityName" className='block mb-1' > {t('from-city')} </label>
                                    <Field
                                        id="CityName"
                                        name="CityName"
                                        className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    />
                                </div>

                                <div className={`lg:col-span-4 ${errors.Email ? "has-validation-error" : ""}`}>
                                    <label htmlFor="Email" className='block mb-1' > <span className='text-red-500'>*</span> {t('email')} </label>
                                    <Field
                                        validate={(value: string) => validateRequiedEmail(value, t('enter-email-address'), t('invalid-email'))}
                                        id="Email"
                                        name="Email"
                                        className={`h-10 px-5 border ${errors.Email && touched.Email ? "border-red-500" : "border-neutral-300"} outline-none rounded-md w-full`}
                                    />
                                    {errors.Email && touched.Email && <div className='text-red-500 text-xs'>{errors.Email as string}</div>}
                                </div>

                                <div className='sm:col-span-2 lg:col-span-12'>

                                    <label htmlFor="Comment" className='block mb-1' > {t('suggestion-text')} </label>
                                    <Field
                                        as="textarea"
                                        id="Comment"
                                        name="Comment"
                                        className="h-20 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    />

                                </div>

                                <div className='lg:col-span-3'>
                                    <label htmlFor="Satisfaction" className='md:text-xs block mb-1' > {t('satisfaction-percentage')} </label>
                                    <Field
                                        as="select"
                                        id="Satisfaction"
                                        name="Satisfaction"
                                        className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    >
                                        {numbersArray.map(item => <option key={item} value={item * 10}>{item * 10}</option>)}
                                    </Field>
                                </div>

                                <div className='lg:col-span-3'>
                                    <label htmlFor="RoomService" className='md:text-xs block mb-1' > {t('room-status')} </label>
                                    <Field
                                        as="select"
                                        id="RoomService"
                                        name="RoomService"
                                        className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    >
                                        {numbersArray.map(item => <option key={item} value={item}>{item}</option>)}
                                    </Field>
                                </div>

                                <div className='lg:col-span-3'>
                                    <label htmlFor="ResturantQuality" className='md:text-xs block mb-1' > {t('restaurant-quality')} </label>
                                    <Field
                                        as="select"
                                        id="ResturantQuality"
                                        name="ResturantQuality"
                                        className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    >
                                        {numbersArray.map(item => <option key={item} value={item}>{item}</option>)}
                                    </Field>
                                </div>

                                <div className='lg:col-span-3'>
                                    <label htmlFor="DealWithPassanger" className='md:text-xs block mb-1' > {t('employees-treatment')} </label>
                                    <Field
                                        as="select"
                                        id="DealWithPassanger"
                                        name="DealWithPassanger"
                                        className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full"
                                    >
                                        {numbersArray.map(item => <option key={item} value={item}>{item}</option>)}
                                    </Field>
                                </div>

                                <div className='sm:col-span-2 lg:col-span-12'>
                                    <label>
                                        <Field type="checkbox" name="IsRecommended" className="inline-block align-middle" /> {t('suggest-to-other')}
                                    </label>

                                </div>

                                <div className='sm:col-span-2 lg:col-span-12'>
                                    <button
                                        type="submit"
                                        className='bg-primary-700 h-10 px-5 rounded-md text-white flex gap-3 items-center justify-center max-w-full sm:w-32'
                                    >
                                        {t('send')}
                                        {loading ? <span className="animate-spin block border-2 border-white rounded-full border-r-transparent border-t-transparent w-5 h-5" /> : null}
                                    </button>
                                </div>

                            </Form>
                        )
                    }}
                </Formik>

            </div>


        </div>
    )
}

export default CommentForm;