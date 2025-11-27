import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Quantity from '@/modules/shared/components/ui/Quantity';
import { DownCaretThick, User } from '@/modules/shared/components/ui/icons';
import Button from '@/modules/shared/components/ui/Button';

type Props = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any;
    values: {
        adult: number;
    }
    wrapperClassNames?: string;
    simple?: boolean;
}

const SelectPassengers: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { setFieldValue, values, wrapperClassNames, simple } = props;

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

    const text = values.adult + " نفر"

    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";

    const buttonClassNames: string[] = ['flex rounded items-center', 'rounded-md', 'border', 'px-3', `${theme3?"justify-between h-12 w-full bg-[#e5e5e5]":theme2 ? "bg-white gap-1.5 w-full h-12 border-neutral-400" : "bg-white justify-between h-10 w-28"}`, 'ltr:text-left', 'rtl:text-right'];

    const boxClassNames = `bg-white absolute w-60 z-[1] top-full left-0 right-0 shadow border mt-1 rounded ${theme2 ? "p-2 scale-20" : ""} invisible opacity-0`
    const openBoxClassNames = `bg-white absolute w-60 z-[1] top-full left-0 right-0 shadow border mt-1 rounded transition-all visible opacity-100 ${theme2 ? "p-2 rtl:origin-top-right ltr:origin-top-left scale-100" : " "}`

    if (simple) {
        return (
            <div className="flex justify-between items-center p-2">
                <div className={theme2 ? "text-gray-500 leading-5" : "flex gap-1"}>
                    <div className={theme2 ? "font-semibold" : ""}> تعداد نفرات  </div>
                </div>
                <div className='whitespace-nowrap flex items-center'>
                    <Quantity
                        style={theme2 ? "BTheme2" : "B"}
                        min={1}
                        max={9}
                        onChange={value => {
                            setFieldValue("adult", value);
                        }}
                        initialValue={values.adult}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${wrapperClassNames || ""}`} ref={wrapperRef}>

            <button
                type="button"
                className={buttonClassNames.join(" ")}
                onClick={() => { setShow(prevState => !prevState) }}
            >
                {!!theme2 && <User className='w-6 h-6 fill-current' /> }

                
                <div className='leading-4'>
                    {!!theme2 && <label className='block text-2xs mb-0.5'> نفر </label> }
                    {text}
                </div>
                {!theme2 && <DownCaretThick className={`w-3.5 h-3.5 fill-current transition-all ${show ? "rotate-180" : ""}`} />}
            </button>

            <div className={show ? openBoxClassNames : boxClassNames}>
                <div className="flex justify-between items-center p-2">
                    <div className={theme2 ? "text-gray-500 leading-5" : "flex gap-1"}>
                        <div className={theme2 ? "font-semibold" : ""}> تعداد نفرات  </div>
                    </div>
                    <div className='whitespace-nowrap flex items-center'>
                        <Quantity
                            style={theme2?"BTheme2":"B"}
                            min={1}
                            max={9}
                            onChange={value => {
                                setFieldValue("adult", value);
                            }}
                            initialValue={values.adult}
                        />
                    </div>
                </div>

                {!!theme2 && <div className='p-2 flex justify-end'>
                    <Button
                        type='button'
                        className='h-10 px-5 font-semibold'
                        onClick={() => { setShow(false) }}
                    >
                        تایید
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default SelectPassengers;