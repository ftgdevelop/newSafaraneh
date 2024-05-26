
import { TabItem } from '@/modules/shared/types/common';
import React, { Fragment, useState } from 'react';
import { Tik } from './icons';
import { useRouter } from 'next/router';

type Props = {
    items: TabItem[];
    style2?: boolean;
    style3?: boolean;
    wrapperClassName?: string;
}

const Tab: React.FC<Props> = props => {

    const { items, style2, style3 } = props;

    const router = useRouter();

    const [activetabKey, setActiveTabKey] = useState(items[0].key);

    let tabClassName = (active: boolean) => {
        if (style2) {
            return `shadow-normal basis-20 relative grow text-blue-700 border border-2 rounded py-3 transition-all ${active ? "bg-blue-50 font-semibold text-primary-700 border-primary-700" : "border-transparent text-neutral-600"}`
        } else if (style3) {
            return `text-2xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2 border-b-2 transition-all text-neutral-600 block grow ${active ? "border-red-600" : "border-transparent"}`;
        } else {
            return `text-2xs sm:text-sm px-2 sm:px-5 py-1 sm:py-2 border-b-2 transition-all ${active ? "text-primary-700 border-primary-700" : "border-transparent text-neutral-600"}`;
        }
    }

    return (
        <>
            <div className={props.wrapperClassName || ""}>
                <div className={`${style2 ? "flex gap-4" : style3 ? "flex border-b border-neutral-200" : "border-b border-neutral-200 sm:px-5"}`}>
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
                        {!!(style2 && activetabKey === item.key) && (
                            <Tik className='w-5 h-5 fill-white bg-blue-700 rounded-full absolute -top-2 rtl:-left-2 ltr:-right-2 border border-2 border-blue-700' />
                        )}

                        {item.label}

                    </button>)}
                </div>

                {items.map(item => <Fragment key={item.key}>
                    {activetabKey === item.key ? item.children : null}
                </Fragment>)}
            </div>

            {!!items.some(item => item.children2) && <br />}

            {items.map(item => <Fragment key={item.key}>
                {activetabKey === item.key ? item.children2 : null}
            </Fragment>)}
        </>
    )
}

export default Tab;