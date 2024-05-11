import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Quantity from '@/modules/shared/components/ui/Quantity';
import { FormikErrors } from 'formik';
import { DownCaretThick } from '@/modules/shared/components/ui/icons';

type Props = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        adult: number;
        child: number;
        infant: number;
    }>>;
    values: {
        adult: number;
        child: number;
        infant: number;
    }
    wrapperClassNames?: string;
}

const SelectPassengers: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { setFieldValue, values, wrapperClassNames } = props;

    const [show, setShow] = useState(false);

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const text = values.adult + values.child + values.infant + " مسافر"

    const style2 = process.env.THEME === 'STYLE_2';

    const buttonClassNames: string[] = ['flex justify-between items-center', 'h-10', 'rounded-md', 'border', 'bg-white', 'px-3', 'w-28', 'ltr:text-left', 'rtl:text-right'];
    if (style2) {
        buttonClassNames.push("rounded-md");
    } else {
        buttonClassNames.push("rounded");
    }

    return (
        <div className={`relative ${wrapperClassNames || ""}`} ref={wrapperRef}>

            <button
                type="button"
                className={buttonClassNames.join(" ")}
                onClick={() => { setShow(prevState => !prevState) }}
            >
                <span>
                    {text}
                </span>
                <DownCaretThick className={`w-3.5 h-3.5 fill-current transition-all ${show ? "rotate-180" : ""}`} />
            </button>

            {show && (
                <div className={`bg-white absolute w-60 z-[1] top-full left-0 right-0 shadow border mt-1 ${style2 ? "rounded-xl" : "rounded"}`}>
                    <div className="flex justify-between items-center p-2">
                        <span className="">
                            {t("adult")} (12+ سال)
                        </span>
                        <div className='whitespace-nowrap flex items-center'>
                            <Quantity
                                styleB
                                min={1}
                                max={9 - values.child}
                                onChange={value => {
                                    setFieldValue("adult", value);
                                    if (values.infant > value) {
                                        setFieldValue('infant', value);
                                    }
                                }}
                                initialValue={values.adult}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-2">
                        <span className="">
                            {t("child")} (2 تا 11 سال)
                        </span>
                        <div className='whitespace-nowrap flex items-center'>
                            <Quantity
                                styleB
                                min={0}
                                max={9 - values.adult}
                                onChange={value => { setFieldValue("child", value) }}
                                initialValue={values.child}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-2">
                        <span className="">
                            {t("infant")} (زیر دو سال)
                        </span>
                        <div className='whitespace-nowrap flex items-center'>

                            <Quantity
                                styleB
                                min={0}
                                max={values.adult}
                                onChange={value => { setFieldValue("infant", value) }}
                                initialValue={values.infant}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectPassengers;