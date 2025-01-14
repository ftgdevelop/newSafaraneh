
import { TabItem } from '@/modules/shared/types/common';
import React, { Fragment, useState } from 'react';
import { Tik } from './icons';
import { useRouter } from 'next/router';
import RadioInputField from './RadioInputField';

type Props = {
    items: TabItem[];
    style?: "1" | "2" | "3" | "radioStyle" | "almosafer-home" | "expedia-home";
    radioStyle?: boolean;
    wrapperClassName?: string;
    tabLinksBold?: boolean;
    innerElement?: React.ReactNode;
    showTabsWhenThereIsOnlyOneItem?: boolean;
}

const Tab: React.FC<Props> = props => {

    const { items, style, innerElement } = props;

    const router = useRouter();

    const [activetabKey, setActiveTabKey] = useState(items[0]?.key);

    let tabClassName = (active: boolean) => {
        if(style === 'almosafer-home'){
            return `outline-none select-none basis-20 rounded-t py-2 px-4 rtl:ml-1 ltr:mr-1 text-sm font-semibold transition-all text-neutral-800 ${active ? "theme3-transparent-bg text-white b-g-white/90" : "bg-white/50"}`
        }else if (style === '2') {
            return `shadow-normal outline-none select-none basis-20 relative grow text-blue-700 border border-2 rounded py-3 transition-all ${active ? "bg-blue-50 font-semibold text-primary-700 border-primary-700" : "border-transparent text-neutral-600"}`
        } else if (style === '3') {
            return `outline-none select-none text-2xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2 border-b-2 transition-all text-neutral-600 block grow ${active ? "border-red-600" : "border-transparent"}`;
        } else {
            return `outline-none select-none text-2xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2 border-b-2 transition-all ${active ? "text-primary-700 border-primary-700" : "border-transparent text-neutral-600"}`;
        }
    }

    if (style === 'expedia-home' && items.length === 1 && !props.showTabsWhenThereIsOnlyOneItem){
        return(
            <>
            <div className={props.wrapperClassName || ""}>
                {items[0].children}
            </div>

            {innerElement || null}

            {items[0].children2 || null}
        </>
        )
    }

    return (
        <>
            <div className={props.wrapperClassName || ""}>
                {style === 'almosafer-home' ? (
                    <div className='max-w-container mx-auto px-3 sm:px-5'>
                        {items.map(item => <button
                            type="button"
                            key={item.key}
                            onClick={() => {
                                if (item.href) {
                                    router.push(item.href);
                                } else {
                                    setActiveTabKey(item.key);
                                }
                            }}
                            className={tabClassName(activetabKey === item.key)}
                        >

                            {item.label}

                        </button>)}
                    </div>
                ) : style === 'radioStyle' ? (
                    <>
                        {items.map(item => (
                            <label className='flex items-center mb-2 gap-1 rtl:ml-4 ltr:mr-4 cursor-pointer' key={item.key}>
                                <RadioInputField
                                    checked={activetabKey === item.key}
                                    onChange={(e: any) => {
                                        if (e.target.checked) {
                                            setActiveTabKey(item.key);
                                        }
                                    }}
                                />
                                {item.label}
                            </label>))}
                    </>
                ) : (
                    <div className={`${style === '2' ? "flex gap-4" : style === '3' ? "flex border-b border-neutral-200" : "border-b border-neutral-200 sm:px-5"} ${props.tabLinksBold ? "font-bold" : ""}`}>
                        {items.map(item => <button
                            type="button"
                            key={item.key}
                            onClick={() => {
                                if (item.href) {
                                    router.push(item.href);
                                } else {
                                    setActiveTabKey(item.key);
                                }
                            }}
                            className={tabClassName(activetabKey === item.key)}
                        >
                            {!!(style === '2' && activetabKey === item.key) && (
                                <Tik className='w-5 h-5 fill-white bg-blue-700 rounded-full absolute -top-2 rtl:-left-2 ltr:-right-2 border border-2 border-blue-700' />
                            )}

                            {item.label}

                        </button>)}
                    </div>
                )}

                {style === 'almosafer-home' ? (
                    <div className='theme3-transparent-bg b-g-white/90'>
                        <div className='max-w-container mx-auto px-3 sm:px-5'>
                            {items.map(item => <Fragment key={item.key}>
                                {activetabKey === item.key ? item.children : null}
                            </Fragment>)}
                        </div>
                    </div>
                ) : (
                    items.map(item => <Fragment key={item.key}>
                        {activetabKey === item.key ? item.children : null}
                    </Fragment>)
                )}


            </div>

            {innerElement || null}

            {items.map(item => <Fragment key={item.key}>
                {activetabKey === item.key ? item.children2 : null}
            </Fragment>)}
        </>
    )
}

export default Tab;