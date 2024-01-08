import { useCallback, useEffect, useState, useRef, ReactNode, PropsWithChildren, memo, ReactElement } from 'react';
import { AxiosResponse } from 'axios';

import useHttp from '../../hooks/use-http';
import { Header } from '../../../../enum/url';
import { Close, Location } from '../ui/icons';
import Skeleton from './Skeleton';

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
    textPropertyName: string;
    noResultMessage?: string;
    checkTypingLanguage?: boolean;
}

function AutoComplete<T>(props: PropsWithChildren<Props<T>>) {

    const { checkTypingLanguage, url, noResultMessage, onChangeHandle, acceptLanguage, min, icon } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { loading, errorMessage: fetchErrorMessage, sendRequest } = useHttp();

    const [typingValue, setTypingValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [items, setItems] = useState<T[]>([]);
    const [showList, setShowList] = useState<boolean>(false);

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

    const fetchData = useCallback((value: string, acceptLanguage?: "fa-IR" | "en-US") => {
        sendRequest({
            url: `${url}?input=${value}`,
            header: {
                ...Header,
                "Accept-Language": acceptLanguage || "en-US",
            },
            method: 'post'
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                setItems(response.data.result);
            } else if (response.data.success) {
                setErrorText(noResultMessage || 'No result found!');
            }
        })
    }, [noResultMessage, url]);

    useEffect(() => {
        if (fetchErrorMessage) {
            setErrorText(fetchErrorMessage)
        }
    }, [fetchErrorMessage]);

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

    }, [typingValue, fetchData, min, direction, errorText, acceptLanguage, onChangeHandle]);

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
        let data = props.defaultList;
        if (items?.length) {
            data = items;
        }
        listElement = data!.map((item, index) => <div
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

    const val: string = props.value && (props.value as any)[props.textPropertyName] || '';
    useEffect(() => {
        if (val) {
            inputRef.current!.value = val;
            setSelectedItem(val);
            if (items.length) {
                setItems([]);
            }
        }
    }, [val, items.length]);

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

    if (icon && icon === "location"){
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