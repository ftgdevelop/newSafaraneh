import { useCallback, useEffect, useState, useRef, ReactNode, PropsWithChildren, memo } from 'react';
import axios from 'axios';

import { Header } from '../../../../enum/url';
import { Close, Location } from '../ui/icons';
import Skeleton from './Skeleton';
import { useAppDispatch } from '../../hooks/use-store';
import { setReduxError } from '../../store/errorSlice';
import { useTranslation } from 'next-i18next';

type Props<T> = {
    placeholder?: string;
    url: string;
    inputId?: string;
    acceptLanguage?: 'fa-IR' | 'en-US';
    min: number;
    defaultList?: T[];
    renderOption: (option: T, direction: "rtl" | "ltr" | undefined) => ReactNode;
    onChangeHandle: (value: T | undefined) => void;
    inputClassName?: string;
    wrapperClassName?: string;
    icon?: "location" | "airplane_";
    value?: T;
    createTextFromOptionsObject : (object:T) => string;
    noResultMessage?: string;
    checkTypingLanguage?: boolean;
    type: "hotel" | "flight"
}

function AutoComplete<T>(props: PropsWithChildren<Props<T>>) {

    const { checkTypingLanguage, url, noResultMessage, onChangeHandle, acceptLanguage, min, icon } = props;

    const { t } = useTranslation("common");

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const [typingValue, setTypingValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [items, setItems] = useState<T[]>([]);
    const [showList, setShowList] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    let direction: "rtl" | "ltr" | undefined;
    if (checkTypingLanguage) {
        const persianInput = /^[\u0600-\u06FF\s]+$/;
        if (selectedItem) {
            if (persianInput.test(selectedItem)) {
                direction = 'rtl';
            } else {
                direction = 'ltr';
            }
        } else if (typingValue) {
            if (persianInput.test(typingValue)) {
                direction = 'rtl';
            } else {
                direction = 'ltr';
            }
        } else {
            direction = undefined;
        }
    }

    const fetchData = async (value: string, acceptLanguage?: "fa-IR" | "en-US") => {
        setLoading(true);

        try {

            let axiosParams;
            if (props.type === 'flight') {
                axiosParams = {
                    method: "post",
                    url: url,
                    data: {
                        query: value
                    },
                    headers: {
                        ...Header,
                        apikey: process.env.PROJECT_PORTAL_APIKEY,
                        "Accept-Language": acceptLanguage || "en-US",
                    }
                }
            } else if (props.type === 'hotel') {
                axiosParams = {
                    method: "post",
                    url: `${url}?input=${value}`,
                    headers: {
                        ...Header,
                        apikey: process.env.PROJECT_PORTAL_APIKEY,
                        "Accept-Language": acceptLanguage || "en-US",
                    }
                }
            }

            if (!axiosParams) return;

            const response = await axios(axiosParams);

            if (response?.data?.result?.length) {
                setItems(response.data.result);
            } else {
                setItems([]);
                if (response.data?.success) {
                    setErrorText(noResultMessage || 'No result found!');
                }
            }

        } catch (error: any) {
            if (error.message) {
                dispatch(setReduxError({
                    title: t('error'),
                    message: error.message,
                    isVisible: true
                }))
            }

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        let fetchTimeout: ReturnType<typeof setTimeout>;

        if (selectedItem) {
            onChangeHandle(undefined);
            setSelectedItem("");
        }

        if (errorText) {
            setErrorText("");
        }

        if (typingValue.length >= min) {
            fetchTimeout = setTimeout(() => { fetchData(typingValue, acceptLanguage || direction === "rtl" ? "fa-IR" : "en-US") }, 300);
        }

        return () => {
            clearTimeout(fetchTimeout);
        }

    }, [typingValue, min, direction, acceptLanguage]);

    const selectItemHandle = (item: T) => {
        onChangeHandle(item);
        setShowList(false);
    }

    const resetInput = () => {
        onChangeHandle(undefined);
        inputRef.current!.value = "";
        setSelectedItem("");
        setItems([]);
        setErrorText("");
        setTypingValue("");
    }

    const handleClickOutside = useCallback((e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            if (errorText) {
                setErrorText("");
            }
            setShowList(false);
        }
    }, [items.length, errorText]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    let listElement: ReactNode | null = null;
    let errorElement: ReactNode | null = null;
    let loadingElement: ReactNode | null = null;

    if (items?.length || props.defaultList?.length) {
        let data;
        if (!typingValue) {
            data = props.defaultList;
        } else {
            data = undefined;
        }
        if (items?.length) {
            data = items;
        }
        listElement = data?.map((item, index) => <div
            onClick={selectItemHandle.bind(null, item)}
            key={index}
            className="border-b border-gray-200 first:rounded-t last:rounded-b last:border-none cursor-pointer transition-all"
        >
            {props.renderOption && props.renderOption(item, direction)}
        </div>)
    }

    if (errorText) {
        errorElement = (
            <div className='mt-2 py-2 px-4 text-red-500'>
                {errorText}
            </div>
        )
    }

    const val: string = props.value && props.createTextFromOptionsObject(props.value) || '';
    useEffect(() => {
        if (val) {
            inputRef.current!.value = val;
            setSelectedItem(val);
            if (items.length) {
                setItems([]);
            }
        }
    }, [val, items.length]);

    useEffect(()=>{
        if (!props.value){
            inputRef.current!.value = "";
        }
    },[props.value])

    if (loading) {
        loadingElement = [1, 2, 3, 4].map(item => <div key={item} className="py-2 px-4 border-b border-gray-200 first:rounded-t last:rounded-b last:border-none cursor-pointer text-cyan-500 hover:bg-gray-100">
            <Skeleton className='my-2' />
        </div>)
    }

    const changeTypingValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypingValue(e.target.value);
    }

    const inputClassNames: string[] = [];
    if (props.inputClassName) {
        inputClassNames.push(props.inputClassName)
    } else {
        inputClassNames.push('bg-white py-1 w-full border outline-none border-gray-300 focus:border-sky-400')
    }

    if (!direction) {
        inputClassNames.push("rtl:pl-8 ltr:pr-8 rtl:text-right ltr:text-left rtl:font-fa");
        if (icon) {
            inputClassNames.push("rtl:pr-10 ltr:pl-10");
        } else {
            inputClassNames.push("rtl:pr-3 ltr:pl-3");
        }
    } else if (direction === 'rtl') {
        inputClassNames.push("pl-8 text-right font-fa rtl");
        if (icon) {
            inputClassNames.push("pr-10");
        } else {
            inputClassNames.push("pr-3");
        }
    } else if (direction === 'ltr') {
        inputClassNames.push("pr-8 text-left font-en ltr");
        if (icon) {
            inputClassNames.push("pl-10");
        } else {
            inputClassNames.push("pl-3");
        }
    }
    const iconClassName = `h-5 w-5 fill-current absolute z-20 top-1/2 -translate-y-1/2 ${!direction ? "rtl:right-3 ltr:left-3" : direction === 'rtl' ? "right-3" : "left-3"}`;

    let iconElement = null;

    if (icon && icon === "location") {
        iconElement = <Location className={iconClassName} />;
    }

    let content = null;
    if (listElement) {
        content = listElement;
    }
    if (loadingElement) {
        content = loadingElement;
    }
    if (errorElement) {
        content = errorElement;
    }

    return (
        <div className={`relative ${props.wrapperClassName || ""}`} ref={wrapperRef}>
            <div className='relative'>
                <input
                    autoComplete="off"
                    id={props.inputId || undefined}
                    type="text"
                    onChange={changeTypingValue}
                    onFocus={() => { setShowList(true) }}
                    className={inputClassNames.join(" ")}
                    ref={inputRef}
                    placeholder={props.placeholder || ""}
                />

                {iconElement}

                {loading && <span className={`animate-spin block border-2 border-neutral-400 rounded-full border-r-transparent border-t-transparent  w-6 h-6 absolute top-1/2 -mt-3.5 ${!direction ? "ltr:right-3 rtl:left-3" : direction === 'rtl' ? "left-3" : "right-3"}`} />}
                {!!selectedItem && <span onClick={resetInput} className={`absolute bg-white top-2/4 -mt-3.5 cursor-pointer ${!direction ? "ltr:right-3 rtl:left-3" : direction === 'rtl' ? "left-3" : "right-3"}`}>
                    <Close className="w-7" />
                </span>}
            </div>
            {showList ? (<div
                className='shadow-normal absolute z-20 bg-white min-w-full sm:w-72 rtl:right-0 ltr:left-0 top-full text-sm rounded-lg max-h-64 overflow-auto'
            >
                {content}
            </div>)
                : null}
        </div>
    )
}

export default memo(AutoComplete) as typeof AutoComplete;