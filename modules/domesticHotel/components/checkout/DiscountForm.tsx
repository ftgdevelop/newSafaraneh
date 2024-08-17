import { useState } from 'react';

import Loading from '@/modules/shared/components/ui/Loading';
import { ErrorIcon, Tik } from '@/modules/shared/components/ui/icons';

type Props = {
    onSubmit: (value: string) => void;
    loading?: boolean;
    data: any;
}

const DiscountForm: React.FC<Props> = props => {

    const theme1 = process.env.THEME === "THEME1";

    const [text, setText] = useState<string>("");

    const submitHandler = () => {
        if (text) {
            props.onSubmit(text);
        }
    }

    let resultStatus: React.ReactNode = null;
    let isError: boolean = false;

    if (props.data?.code) {

        isError = true;

        switch (props.data.code) {
            case 6101:
                resultStatus = "این کد تخفیف وجود ندارد";
                break;
            case 6102:
                resultStatus = "این کد تخفیف برای این سرویس نیست";
                break;
            case 6103:
                resultStatus = "این کد تخفیف شروع نشده است";
                break;
            case 6104:
                resultStatus = "این کد تخفیف به اتمام رسیده است";
                break;
            case 6105:
                resultStatus = "این کد تخفیف را دیگر نمیتوانید استفاده کنید";
                break;
            default:
                resultStatus = null;
        }
    } else if (props.data?.isValid) {
        resultStatus = "کد تخفیف اضافه گردید";
    }

    return (
        <div className={`mb-5 ${theme1?"bg-white border-neutral-300 border p-5 rounded-lg":""}`}>

            <h5 className='font-semibold text-xl mb-4'> کد تخفیف </h5>

            <div className={`relative ${theme1?"sm:w-60":"sm:w-80"}`}>
                <input
                    disabled={!!props.loading}
                    dir="ltr"
                    type="text"
                    onChange={e => { setText(e.target.value) }}
                    value={text}
                    className={`rounded-md w-full border border-neutral-300 rtl:pl-20 rtl:pr-2 ltr:pr-20 ltr:pl-2 outline-none font-mono text-xl tracking-widest placeholder:font-iranyekan placeholder:text-sm placeholder:tracking-normal rtl:placeholder:text-right ${theme1?"h-10":"h-13"}`}
                    placeholder='افزودن کد تخفیف'
                    onKeyDown={e => {
                        if (e.code === "Enter") {
                            e.preventDefault();
                            submitHandler();
                        }
                    }}
                />
                <button
                    disabled={!text?.trim() || !!props.loading}
                    onClick={submitHandler}
                    type='button'
                    className={`text-white ${text?.trim() ? "bg-primary-700 hover:bg-primary-800" : "bg-neutral-400"} select-none outline-none absolute rtl:left-0 ltr:right-0 top-0 bottom-0 px-5 rtl:rounded-l-md ltr:rounded-r-md`}
                >
                    ثبت
                </button>

            </div>

            {!!resultStatus && (
                <p className={`flex gap-2 items-center mt-3 text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
                    {isError ? <ErrorIcon className='w-5 h-5 fill-current' /> : <Tik className='w-5 h-5 fill-current' />}
                    {resultStatus}
                </p>
            )}

            {!!props.loading && (
                <div className='flex gap-2 items-center mt-3 text-sm'>
                    <Loading size='small' />
                    در حال بررسی کد تخفیف
                </div>
            )}
        </div>
    )
}

export default DiscountForm;