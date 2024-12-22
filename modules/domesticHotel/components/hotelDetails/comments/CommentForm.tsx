import { Formik, Form, Field } from 'formik';
import { i18n, useTranslation } from 'next-i18next';

import Button from '@/modules/shared/components/ui/Button';
import { validateRequied } from '@/modules/shared/helpers/validation';
import { createComment} from '@/modules/domesticHotel/actions';
import RateInput from './RateInput';
import RadioInputField from '@/modules/shared/components/ui/RadioInputField';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { openLoginForm } from '@/modules/authentication/store/authenticationSlice';
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import { Business, Couple, Family, Group3, Individual } from '@/modules/shared/components/ui/icons';
import { setReduxNotification } from '@/modules/shared/store/notificationSlice';
import { dateFormat } from '@/modules/shared/helpers';

type Props = {
    pageId: number;
    closeHandle: () => void;
}

const CommentForm: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const userAuthentication = useAppSelector(state => state.authentication);
    const { user, isAuthenticated } = userAuthentication;
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            setOpen(true);
        } else {
            dispatch(openLoginForm());
        }
    }, [isAuthenticated]);

    type FormValues = {
        travelType: "Individual" | "Family" | "Couple" | "Group" | "Business";
        comment: string;
        positivePoints: string;
        negativePoints: string;
        userDisplayName: string;
        overallRating: number;
        recommendToOthers: boolean;
        isAnonymous: boolean;
    }

    let initialDisplayName = "";
    if (user?.firstName) {
        initialDisplayName = user.firstName;
    }
    if (user?.lastName) {
        if (initialDisplayName) initialDisplayName += " ";
        initialDisplayName += user.lastName;
    }

    const initialValues: FormValues = {
        travelType: 'Individual',
        comment: '',
        overallRating: 9,
        recommendToOthers: false,
        isAnonymous: false,
        positivePoints: '',
        negativePoints: '',
        userDisplayName: initialDisplayName
    };

    const submitHandle = async (values: FormValues, actions: any) => {

        const params = {            
            comment: values.comment,
            overallRating: values.overallRating,
            travelType: values.travelType,
            isVerifiedReviewer: false,
            userDisplayName: values.userDisplayName,
            positivePoints: values.positivePoints,
            negativePoints: values.negativePoints,
            recommendToOthers: values.recommendToOthers,            
            userId: user?.id,
            language: "fa-IR",
            pageId: props.pageId,
            creationTime: dateFormat(new Date),
            isActive: user?.isActive,
            isAnonymous: values.isAnonymous,
            tenantId: process.env.PROJECT_SERVER_TENANTID,
            id: 0
        };

        setSubmitLoading(true);
        setTimeout(()=>{
            actions.resetForm();

            console.log(values);
            console.log(params);
    
            setOpen(false);
            props.closeHandle();
            setSubmitLoading(false);

            // dispatch(setReduxNotification({
            //     status: 'success',
            //     message:'دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.' ,
            //     isVisible: true
            // }));
            
            dispatch(setReduxNotification({
                status: 'error',
                message:'متاسفانه ثبت دیدگاه شما با خطا روبرو شد. لطفا دوباره تلاش کنید.' ,
                isVisible: true
            }));
            
        },2000);

        const response: any = await createComment(params);

        if (response?.data?.result) {
            console.log("response-data-result", response.data.result)
            debugger;
            //toDo
        }else{
            console.log("response-data", response.data);
            debugger;
        }
    }

    const travelTypeOptions: { value: string, label: string, icon: React.ReactNode }[] = [
        { label: "انفرادی", value: "Individual", icon: <Individual className='fill-current w-6 h-6' /> },
        { label: "خانواده", value: "Family", icon: <Family className='fill-current w-6 h-6' /> },
        { label: "زوج", value: "Couple", icon: <Couple className='fill-current w-6 h-6' /> },
        { label: "گروهی", value: "Group", icon: <Group3 className='fill-current w-6 h-6' /> },
        { label: "کاری", value: "Business", icon: <Business className='fill-current w-5 h-5' /> }
    ];

    if (!isAuthenticated) return "null";

    return (
        <ModalPortal
            show={open}
            selector='modal_portal_2'
        >
            <div className="fixed w-screen h-screen ovelflow-auto bg-black/75 backdrop-blur top-0 left-0 flex items-center justify-center">

                <div
                    className="absolute left-0 right-0 bottom-0 top-0"
                    onClick={() => { props.closeHandle() }}
                />

                <div className={`bg-white max-h-screen md:modalMaxHeight overflow-auto sm:rounded-md relative w-full sm:w-570 p-4 md:p-6`}>
                    <div>
                        <h5 className='text-sm md:text-base font-semibold mb-4'>{tHotel("submit-suggestion")}</h5>
                    </div>

                    <div className='md:col-span-2'>
                        <Formik
                            validate={() => { return {} }}
                            initialValues={initialValues}
                            onSubmit={submitHandle}
                        >
                            {({ errors, touched, isValid, isSubmitting, values, setFieldValue }) => {
                                if (isSubmitting && !isValid) {

                                    setTimeout(() => {
                                        const formFirstError = document.querySelector(".has-validation-error");
                                        if (formFirstError) {
                                            formFirstError.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }, 100)

                                }
                                return (
                                    <Form className='leading-6 text-xs sm:text-sm'>
                                        <p className='mb-3'>
                                            با انتخاب يکی از گزینه‌های امتياز خود را به اين اقامتگاه ثبت کنید
                                            <br />
                                            ( 1 کمترین امتیاز و 10 بیشترین امتیاز)
                                        </p>

                                        <RateInput
                                            onChanage={r => { setFieldValue('overallRating', r) }}
                                            wrapperClassName='mb-5'
                                            defaultValue={initialValues.overallRating}
                                        />

                                        <div className="mb-3">
                                            <label htmlFor="FullName" className='block mb-1' > نوع سفر </label>

                                            {travelTypeOptions.map(option => (
                                                <label
                                                    key={option.label}
                                                    className='flex mb-2 md:inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4 cursor-pointer'
                                                >
                                                    <RadioInputField
                                                        onChange={(e: any) => {
                                                            const val = e.target.checked;
                                                            if (val) {
                                                                setFieldValue('travelType', option.value);
                                                            }
                                                        }}
                                                        checked={values.travelType === option.value}
                                                    />
                                                    {option.icon}{option.label}
                                                </label>
                                            ))}

                                        </div>


                                        <div>
                                            <label htmlFor="positivePoints" className='block mb-1' > نکات مثبت </label>
                                            <Field
                                                id="positivePoints"
                                                name="positivePoints"
                                                className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full mb-4"
                                            />

                                        </div>

                                        <div>

                                            <label htmlFor="negativePoints" className='block mb-1' > نکات منفی </label>
                                            <Field
                                                id="negativePoints"
                                                name="negativePoints"
                                                className="h-10 px-5 border border-neutral-300 outline-none rounded-md w-full mb-4"
                                            />

                                        </div>

                                        <div className='relative'>

                                            <label htmlFor="comment" className='block mb-1' > <span className='text-red-500'>*</span> {tHotel('suggestion-text')} </label>

                                            <Field
                                                validate={(value: string) => validateRequied(value, "لطفا دیدگاه خود را وارد کنید!")}
                                                as="textarea"
                                                id="comment"
                                                value={values.comment.substring(0, 400)}
                                                name="comment"
                                                className={`h-24 px-5 py-2 border ${errors.comment && touched.comment ? "border-red-500" : "border-neutral-300"} outline-none rounded-md w-full`}
                                            />
                                            <div className='flex justify-between mb-1'>
                                                {errors.comment && touched.comment ? <div className='text-red-500 text-xs'>{errors.comment as string}</div> : <span />}
                                                <span className='block'>
                                                    {(400 - values.comment.length) > 0 ? (400 - values.comment.length) : 0} کاراکتر
                                                </span>
                                            </div>

                                        </div>

                                        <label className='mb-4 block'>
                                            <Field type="checkbox" name="recommendToOthers" className="inline-block align-middle" /> {tHotel('suggest-to-other')}
                                        </label>

                                        <div className={`mb-1 ${errors.userDisplayName ? "has-validation-error" : ""}`}>
                                            <label htmlFor="userDisplayName" className='block mb-1' > <span className='text-red-500'>*</span> {t('full-name')}</label>
                                            <Field
                                                validate={(value: string) => validateRequied(value, t('please-enter-name'))}
                                                id="userDisplayName"
                                                name="userDisplayName"
                                                className={`h-10 px-5 border ${errors.userDisplayName && touched.userDisplayName ? "border-red-500" : "border-neutral-300"} outline-none rounded-md w-full`}
                                            />
                                            {errors.userDisplayName && touched.userDisplayName && <div className='text-red-500 text-xs'>{errors.userDisplayName as string}</div>}

                                        </div>

                                        <label className='mb-5 block'>
                                            <Field type="checkbox" name="isAnonymous" className="inline-block align-middle" /> نظر شما به صورت ناشناس ثبت شود
                                        </label>

                                        <Button
                                            type='submit'
                                            loading={submitLoading}
                                            className='h-10 px-5 rounded-md max-w-full w-full sm:w-32'
                                        >
                                            {t('send')}
                                        </Button>

                                    </Form>
                                )
                            }}
                        </Formik>

                    </div>

                </div>
            </div>
        </ModalPortal>
    )
}

export default CommentForm;