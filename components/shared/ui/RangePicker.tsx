import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker as MobiscrollDatepicker, setOptions, localeFa, localeEn, Page, CalendarToday, Input, Popup, Select, Button, formatDate, options } from '@mobiscroll/react';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment-jalaali';

import { ArrowLeft, Calendar, CalendarToggle } from './icons';

type Props = {
    onChange: (args: any, inst: any) => void;
    rtl?: boolean;
    locale?: any;
}

type RangePickerValue = {
    value: [string | null, string | null];
    valueText: string;
}

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const RangePicker: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const [locale, setLocale] = useState<any>(localeFa);

    const [values, setValues] = useState<[string | null, string | null]>([null, null]);

    const datePickerRef = useRef<any>(null);
    const endInput = useRef<any>(null);

    // const [start, setStart] = useState<any>(null);
    // const [end, setEnd] = useState<any>(null);

    const [instance, setInstance] = useState<any>(null);

    useEffect(() => {
        setLocale(props.locale);
    }, [props.locale]);


    const onChange = (args: RangePickerValue, inst: any) => {
        setValues(args.value);
        props.onChange(args, inst);
    }

    const fridays: string[] = [
        '2023-11-24',
        '2023-12-01',
        '2023-12-08',
        '2023-12-15',
        '2023-12-17',
        '2023-12-22',
        '2023-12-29',
        '2024-01-05',
        '2024-01-12',
        '2024-01-19',
        '2024-01-25',
        '2024-01-26'
    ];

    const marked = fridays.map(item => ({
        date: item,
        cellCssClass: "red"
    }));

    const goToday = () => {
        instance?.navigate(new Date(2016, 1, 1));
    }

    let start = "";
    let end = "";
    let startFormated = t('checkin-date');
    let endFormated = t('checkout-date');

    const format = locale === localeFa ? "dddd، jDD jMMMM" : "dddd، DD MMMM";
    const formatValue = locale === localeFa ? "jYYYY/jMM/jDD" : "YYYY/MM/DD";

    if (values && values[0]) {
        startFormated = moment(values[0]).format(format);
        start = moment(values[0]).format(formatValue);
    }

    if (values && values[1]) {
        endFormated = moment(values[1]).format(format);
        end = moment(values[1]).format(formatValue);
    }


    if (locale === localeFa) {
        moment.loadPersian();
    }

    return (
        <div className={`${locale === localeFa ? 'persian-datepicker-wrapper' : ''} relative`} >

            <div className='grid grid-cols-2'>

                <div className='relative'>
                    <label className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none">
                        {t('checkin-date')}
                    </label>
                    <Calendar className='w-5 h-5 fill-current absolute right-2 top-1/2 -mt-2.5 z-10 pointer-events-none' />
                    <input className='border w-full h-12 border-neutral-400 rounded-r-lg pr-10 pt-5 leading-4 border-l-0' value={start} />
                </div>
                <div className='relative'>
                    <label className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5 pointer-events-none">
                        {t('checkout-date')}
                    </label>
                    <Calendar className='w-5 h-5 fill-current absolute right-2 top-1/2 -mt-2.5 z-10 pointer-events-none' />
                    <input className='border w-full h-12 border-neutral-400 rounded-l-lg pr-10 pt-5 leading-4' value={end} />
                </div>

            </div>
            <div className='absolute top-0 left-0 right-0 h-full opacity-0'>
                <MobiscrollDatepicker
                    ref={datePickerRef}
                    onInit={(_, inst) => { setInstance(inst) }}
                    cssClass={`mobi-date-picker mobi-range-picker ${locale === localeFa ? 'persian-date-picker' : ''}`}
                    controls={['calendar']}
                    select="range"
                    returnFormat="iso8601"
                    rtl={locale === localeFa}
                    locale={locale}
                    responsive={{
                        small: {
                            pages: 1,
                            touchUi: true
                        },
                        large: {
                            pages: 2,
                            touchUi: false
                        }
                    }}
                    inputProps={{
                        inputStyle: 'box',
                        placeholder: 'انتخاب تاریخ'
                    }}
                    min={new Date()}
                    marked={marked}
                    showRangeLabels={false}
                    onChange={onChange}
                >

                    <header className='direction-root font-samim mobi-date-picker-header px-5 py-3 border-b border-neutral-300  gap-5 justify text-sm hidden md:flex h-12 '>

                        <div className={`min-w-24 bold text-sm border-b-2 border-transparent ${values && values[0] && !values[1] ? "border-blue-600" : ""}`}>
                            {startFormated}
                        </div>
                        
                        <ArrowLeft className='w-6 h-6 fill-current' />

                        <div className={`min-w-24 bold text-sm border-b-2 border-transparent ${values && values[0] && !values[1] ? "border-blue-600" : ""}`}>
                            {endFormated}
                        </div>

                    </header>

                    <footer className='direction-root font-samim mobi-date-picker-footer flex justify-center md:justify-between items-center px-5 py-4 border-t border-neutral-300'>
                        <button type='button' onClick={goToday} className='text-primary-700 text-sm'>
                            {t('goToToday')}
                        </button>


                        <button
                            type='button'
                            className='text-primary-700 text-sm flex gap-2 items-center'
                            onClick={() => { setLocale((previousLocale: any) => previousLocale === localeFa ? localeEn : localeFa) }}
                        >
                            <CalendarToggle className='w-5 h-5 fill-current' /> {locale === localeFa ? t('gregorianCalendar') : t('iranianCalendar')}
                        </button>
                    </footer>


                </MobiscrollDatepicker>
            </div>

        </div>
    )
}

export default RangePicker;