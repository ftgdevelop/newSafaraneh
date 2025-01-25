import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';

type Props = {
    logo: string;
    siteName: string;
    strapiContent?: string;
}

const AboutSummary: React.FC<Props> = props => {

    return (
        <div className="bg-white p-5 lg:p-7 rounded-lg text-sm text-center mb-10">
            {!!props.logo && <Link href={"/"} className='inline-block'>
                <Image
                    onContextMenu={e => { e.preventDefault() }}
                    src={props.logo}
                    alt={props.siteName}
                    width={115}
                    height={48}
                    className="mb-2"
                />
            </Link>}

            {props.strapiContent ? (
                <div className='inserted-content text-center mb-4'>
                    <Markdown>{props.strapiContent}</Markdown>
                </div>
            ) : (
                <>
                    <p className='mb-4'>
                        مدت زمان زیادی نیست که رزرو خدمات گردشگری نیز مانند صدها خدمات
                        دیگر به دنیای دیجیتال قدم گذاشته و خیلی سریع روش‌های سنتی سفر کردن
                        را پایان بخشیده. در دوران شروع دیجیتالی شدن رزرو خدمات گردشگری
                        شرکت‌های کمی در این عرصه فعالیت داشتند.
                    </p>
                    <p className='mb-4'>
                        هلدینگ فرهیختگان تجارت قرن با بیش از 13 سال تجربه در زمینه ارائه
                        خدمات گردشگری یکی از اولین بازیگران این عرصه بوده، و امروز بخش
                        خدمات گردشگری خود را تحت عنوان آژانس مسافرتی سفرانه مشرق زمین با
                        نام تجاری سفرانه انجام می‌دهد. سایت سفرانه با استفاده از تجربۀ
                        سالیانی که توسط هلدینگ فرهیختگان به دست آورده، تحت به‌روزترین
                        زیرساخت‌ها و با شناخت کامل نیازهای مسافران طی سال‌های متمادی،
                        امروز با قوی‌ترین تیم پشتیبانی و با تاییدیه به عنوان نماینده رسمی
                        وزارت گردشگری جهت رزرو آنلاین و آفلاین کلیه خدمات گردشگری در خدمت
                        مسافران است.
                    </p>
                </>
            )}

            <Link href="/about" className='text-blue-700 mb-2 inline-block' >
                اطلاعات بیشتر درباره {props.siteName}
            </Link>
        </div>
    )
}

export default AboutSummary;