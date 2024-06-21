import AutoComplete from "@/modules/shared/components/ui/AutoComplete";
import { Bus, ServerAddress } from "@/enum/url";
import { useCallback, useState } from "react";
import { Calendar, Location, Swap, Travel } from "@/modules/shared/components/ui/icons";
import { BusAutocompleteType } from "../../types";
import {defaultList} from './defaultList'
import DatePickerMobiscroll from "@/modules/shared/components/ui/DatePickerMobiscroll";
import { dateFormat } from "@/modules/shared/helpers";
import { localeFa } from "@mobiscroll/react";
import { Field, Form, Formik } from "formik";
import Button from "@/modules/shared/components/ui/Button";
import { validateRequied } from "@/modules/shared/helpers/validation";
import { useRouter } from "next/router";

type Props = {
    className?: string,
    setShowSearchForm: any
}
const SearchBus: React.FC<Props> = (props) => {
    const [locations, setLocations] = useState<[BusAutocompleteType | undefined, BusAutocompleteType | undefined]>([undefined,undefined])
    const [locale, setLocale] = useState<any>(localeFa);
    const [submitPending, setSubmitPending] = useState<boolean>(false);
    const router = useRouter()

    const renderOption = useCallback((option: BusAutocompleteType, direction: "ltr" | "rtl" | undefined) => (
        <div className={`px-3 py-2 flex gap-3 text-black hover:fill-white hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
            <Location className="w-5 h-5" />
            <p className='text-xs py-2'>{option?.name || option.province.name}</p>
        </div>
    ), []);

    const formInitialValue = {
        originCode: null,
        destinationCode: null,
        departureTime: undefined
    }

    const submitHandle = async (value: any) => {
        setSubmitPending(true)
        await router.push({ query: value })
        props.setShowSearchForm(false)
    }
    return (
        <div className={props.className || ''}>
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
                        <Form
                            autoComplete="off"
                            className="grid grid-cols-6 gap-3"
                        >
                            <div className="flex col-span-4 max-lg:col-span-6 gap-3 relative">
                                <div className="w-1/2">
                                    <AutoComplete
                                        type="flight"
                                        defaultList={defaultList}
                                        //checkTypingLanguage
                                        noResultMessage={'NoResultsFound'}
                                        createTextFromOptionsObject={(item: BusAutocompleteType) => item.name}
                                        acceptLanguage="fa-IR"
                                        renderOption={renderOption}
                                        icon="location"
                                        inputClassName={`w-full bg-white text-black rtl:pl-3 truncate block leading-4 border rounded-lg border-neutral-400 py-0.5 text-md h-12 flex flex-col justify-center`}
                                        placeholder="مبدا"
                                        min={3}
                                        url={`${ServerAddress.Type}${ServerAddress.Bus}${Bus.BusSearch}`}
                                        onChangeHandle={

                                            (v: BusAutocompleteType | undefined) => {
                                                setLocations((prevState: any) => ([
                                                    v,
                                                    prevState[1]
                                                ])),
                                                setFieldValue('originCode', v?.id , true)
                                            }
                                        }

                                        value={locations[0]}
                                    />

                                    <Field
                                        validate={(value: string) => validateRequied(value, "مبدا را انتخاب کنید.")}
                                        type='hidden'
                                        name="originCode"
                                        value={values.originCode}
                                    />
                                    {touched.originCode && errors.originCode && <div className='text-xs text-red-500'> {errors.originCode as string}</div>}
                                </div>
                                <button
                                            type='button'
                                            onClick={() => {
                                                setLocations(prevLocation => {
                                                    setFieldValue("originCode", prevLocation[1]?.id || "", true);
                                                    setFieldValue("destinationCode", prevLocation[0]?.id || "", true);
                                                    return ([
                                                        prevLocation[1], prevLocation[0]
                                                    ])
                                                });
                                            }}
                                            className='rounded-full p-0.5 border border-neutral-500 bg-white absolute top-0 sm:top-2.5 left-1/2 max-sm:mt-3 z-20 -translate-x-3 cursor-pointer outline-none'
                                        >
                                            <Swap className='w-5 h-5' />
                                </button>
                                <div className="w-1/2">
                                    <AutoComplete
                                        type="flight"
                                        defaultList={defaultList}
                                        noResultMessage={'هیچ موردی یافت نشد'}
                                        createTextFromOptionsObject={(item: BusAutocompleteType) => item.name}
                                        acceptLanguage="fa-IR"
                                        renderOption={renderOption}
                                        icon="location"
                                        inputClassName={`w-full bg-white text-black rtl:pl-3 truncate block leading-4 border rounded-lg border-neutral-400 py-0.5 text-md h-12 flex flex-col justify-center`}
                                        placeholder="مقصد"
                                        min={3}
                                        url={`${ServerAddress.Type}${ServerAddress.Bus}${Bus.BusSearch}`}
                                        onChangeHandle={

                                            (v: BusAutocompleteType | undefined) => {
                                                setLocations((prevState: any) => ([
                                                    prevState[0],
                                                    v
                                                ])),
                                                setFieldValue('destinationCode', v?.id || "" , true)
                                    }
                                        }

                                        value={locations[1]}
                                    />
                                    
                                    <Field
                                        validate={(value: string) => validateRequied(value, "مقصد را انتخاب کنید.")}
                                        type='hidden'
                                        name="destinationCode"
                                        value={values.destinationCode}
                                    />
                                    {touched.destinationCode && errors.destinationCode && <div className='text-xs text-red-500'> {errors.destinationCode as string}</div>}
                                </div>
                            </div>
                            <div className='relative max-lg:col-span-3'>
                                <DatePickerMobiscroll
                                    minDate={dateFormat(new Date())}
                                    inputStyle='theme1'
                                    onChange={a => {
                                        setFieldValue("departureTime", a.value, true)
                                    }}
                                    rtl
                                    locale={locale}
                                    onChangeLocale={setLocale}
                                    value={values.departureTime}
                                />
                                <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -translate-y-1/2 right-3 absolute select-none pointer-events-none" />
                        
                                <label className={`absolute text-black leading-5 rtl:right-10 select-none pointer-events-none transition-all ${values.departureTime ? "top-1.5 text-4xs " : "top-1/2 -translate-y-1/2 text-sm "}`}>
                                    تاریخ رفت
                                </label>
                                <Field
                                    validate={(value: string) => validateRequied(value, values.departureTime === 'RoundTrip' ? "تاریخ رفت را انتخاب کنید." : "تاریخ پرواز را انتخاب کنید.")}
                                    type='hidden'
                                    name="departureTime"
                                    value={values.departureTime}
                                />
                                {touched.departureTime && errors.departureTime && <div className='text-xs text-red-500'> {errors.departureTime as string}</div>}
                            </div>

                            <Button
                                color='blue'
                                type='submit'
                                className={`h-12 mx-auto w-full font-semibold max-lg:col-span-3`}
                                loading={submitPending}
                            >
                                جستجو
                            </Button>
                        </Form>
                    )
                }}    
            </Formik>   
        </div>
    )
}

export default SearchBus;