import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Markdown from 'react-markdown';
import Image from "next/image";
import mojavez from '../public/images/about/mojavez .jpg';
import honor1 from '../public/images/about/download.png';
import honor2 from '../public/images/about/download (1).png';
import honor3 from '../public/images/about/download (2).png';
import honor4 from '../public/images/about/download (3).png';
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import { WebSiteDataType } from "@/modules/shared/types/common";
import { getStrapiPages } from "@/modules/shared/actions/strapiActions";

type Props = {
    portalData?: WebSiteDataType;
    strapiData?: {
        attributes?: {
            Sections?: {
                Title?: string;
                Body?: string;
            }[]
        }

    }[];
}

const About: NextPage<Props> = props => {
    const list1 = [
        'برنامه‌ریزی و اجرای سفر رئیس جمهور ونزوئلا و هیئت همراه به تهران جهت اجلاس اوپک گازی',
        'برنامه‌ریزی و اجرای سفر وزیر تجارت و صنایع عمان و هیئت تجاری همراه به تهران',
        'برنامه‌ریزی و اجرای سفر وزیر تجارت بنگلادش و هیئت تجاری همراه به تهران',
        'برنامه‌ریزی و اجرای سفر وزیر صنایع لبنان و هیئت تجاری همراه به تهران',
        'برنامه‌ریزی و اجرای سفر صدراعظم سابق آلمان و هیئت همراه به تهران',
        'برنامه‌ریزی و اجرای سفر وزیر کشاورزی ویتنام و هیئت همراه به ایران',
        'برنامه‌ریزی و اجرای سفر هیئت دولت پادشاهی تایلند به تهران',
        'سی و سومین جشنواره بین‌المللی فیلم فجر',
        'سی و دومین جشنواره بین‌المللی شعر فجر',
        'برگزاری نشست دو جانبه وزیر صنعت، معدن و تجارت جمهوری اسلامی ایران و معاون صدر اعظم آلمان',
        'برگزاری نشست دوجانبه وزیر صنعت، معدن و تجارت جمهوری اسلامی ایران و جمهوری یمن',
        'برگزاری نشست دوجانبه وزرای صنعت، معدن و تجارت جمهوری اسلامی ایران و جمهوری آذربایجان، قزاقستان، پاکستان، بلاروس، ترکیه، تایلند، عراق، سلطنت عمان، دولت قطر، اسلوواکی، الجزایر، ونزوئلا، اسلوونی، اسپانیا',
        'برگزاری نشست دوجانبه وزرای فرهنگ و ارشاد اسلامی جمهوری اسلامی ایران و جمهوری عراق',
        'برگزاری نشست دوجانبه وزرای فرهنگ و ارشاد اسلامی جمهوری اسلامی ایران و سلطنت عمان',
        'برنامه‌ریزی و اجرای سفر هیئت عالی‌رتبه سیاسی اقتصادی وزارت خارجه ونزوئلا',
        'برنامه‌ریزی و اجرای سفر هیئت عالی‌رتبه سیاسی اقتصادی وزارت نفت ونزوئلا',
        'برنامه‌ریزی و اجرای سفر وزیر زمین‌شناسی گینه و هیئت همراه',
        'برنامه‌ریزی و اجرای نشست وزرای اقتصادی کشورهای اسلامی'
    ]
    const list2 = [
        'کسب لوح تقدیر از جانب وزیر محترم صنعت، معدن و تجارت به دلیل برگزاری چهارمین نشست وزرای صنعت کشورهای عضو گروه D-8',
        'کسب لوح تقدیر از وزارت محترم فرهنگ و ارشاد اسلامی به دلیل برگزاری دهمین اجلاس وزرای اطلاع‌رسانی کشورهای اسلامی در تهران',
        'کسب تقدیرنامه از طرف سفیر محترم ونزوئلا در تهران به دلیل برگزاری دیدار رسمی آقای نیکلاس مادورو موروس، رئیس جمهور محترم جمهوری ونزوئلا و هیئت همراهشان از تهران به منظور شرکت در سومین اجلاس کشورهای صادرکننده گاز',
        'کسب لوح قدیر از جانب کنگره جهانی جریان‌های افراطی و تکفیری به دلیل برگزاری بی‌نقص کنگره',
        'کسب لوح تقدیر از جانب مجمع جهانی تقریب مذاهب اسلامی به دلیل برگزاری همایش بین‌المللی تقریب مذاهب در تهران',
        'کسب لوح تقدیر از جانب گمرک جمهوری اسلامی ایران، به دلیل برگزاری هفتمین اجلاس رؤسا و سومین نشست کمیته کارشناسی کشورهای سازمان همکاری‌های اقتصادی (اکو)',
        'کسب لوح تقدیر از جانب شرکت ملی صنایع پتروشیمی، به دلیل هماهنگی اقامتی و مسافرتی شرکت‌کنندگان و بازدیدکنندگان خارجی از دهمین نمایشگاه ایران پلاست',
        'کسب تقدیرنامه از جانب سفیر محترم بلغارستان در تهران، به دلیل میزبانی و اجرای کلیه امور اقامتی سفر وزیر اقتصاد بلغارستان و هیئت همراه به تهران',
        'کسب لوح تقدیر از جانب ریاست محترم دانشگاه آزاد اسلامی واحد تهران غرب به دلیل برگزاری جشنواره گردشگری خوراک'
    ]

    const title = props.strapiData?.[0]?.attributes?.Sections?.[0]?.Title || "درباره ما";
    const strapiContent = props.strapiData?.[0]?.attributes?.Sections?.[0]?.Body;

    return (
        <>
            <div className="max-w-container m-auto p-5 max-sm:p-3">
                <BreadCrumpt items={[{ label: title }]} />
                <h2 className="text-3xl font-bold mt-10"> {title} </h2>

                {strapiContent ? (
                    <div className='inserted-content text-justify bg-white rounded-md border-2 border-gray mt-10 p-7 max-md:p-3 pt-10 pb-10 space-y-7' >                        
                        <Markdown children={strapiContent} />
                    </div>
                ) : (
                    <div className="bg-white rounded-md border-2 border-gray mt-10 p-7 max-md:p-3 pt-10 pb-10 space-y-7">
                        <h5 className="text-xl font-semibold">سفرانه مشرق زمین</h5>
                        <p className="text-sm">
                            مدت زمان زیادی نیست که رزرو خدمات گردشگری نیز مانند صدها خدمات دیگر به دنیای دیجیتال قدم گذاشته و خیلی سریع روش‌های سنتی سفر کردن را پایان بخشیده. در دوران شروع دیجیتالی شدن رزرو خدمات گردشگری شرکت‌های کمی در این عرصه فعالیت داشتند.
                        </p>
                        <p className="text-sm">
                            هلدینگ فرهیختگان تجارت قرن با بیش از 13 سال تجربه در زمینه ارائه خدمات گردشگری یکی از اولین بازیگران این عرصه بوده، و امروز بخش خدمات گردشگری خود را تحت عنوان آژانس مسافرتی سفرانه مشرق زمین با نام تجاری سفرانه انجام می‌دهد. سایت سفرانه با استفاده از تجربۀ سالیانی که توسط هلدینگ فرهیختگان به دست آورده، تحت به‌روزترین زیرساخت‌ها و با شناخت کامل نیازهای مسافران طی سال‌های متمادی، امروز با قوی‌ترین تیم پشتیبانی و با تاییدیه به عنوان نماینده رسمی وزارت گردشگری جهت رزرو آنلاین و آفلاین کلیه خدمات گردشگری در خدمت مسافران است.
                        </p>
                        <Image src={mojavez} alt="مجوز" height={200} width={400} className="w-full p-10 pr-24 pl-24 max-lg:pr-5 max-lg:pl-5 max-md:p-0" onContextMenu={e => e.preventDefault()} />

                        <h5 className="text-xl pt-5 font-semibold">برجسته ترین فعالیت های هلدینگ</h5>
                        <ul className="text-sm space-y-5 list-disc rtl:pr-5 ltr:pl-5">
                            {
                                list1.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </ul>

                        <h5 className="text-xl pt-5 font-semibold">نگاهی به برجسته‌ترین افتخارات هلدینگ</h5>
                        <ul className="text-sm space-y-5 rtl:pr-5 ltr:pl-5 list-decimal">
                            {
                                list2.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </ul>

                        <h5 className="text-xl pt-5 font-semibold">افتخارات ما</h5>
                        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
                            <div className="border-2 border-gray-300 rounded-md text-center p-3 max-sm:p-0 max-lg:border-0">
                                <Image src={honor1} alt="افتخارات" width={60} height={50} className="mt-5 pb-5 m-auto w-18 h-24" onContextMenu={e => e.preventDefault()} />
                                <p className="text-sm max-sm:text-xs font-semibold pl-1 pr-1 max-lg:pr-0 max-lg:pl-0">حضور موثر در کنفرانس صنعت توریست و بازاریایی دیجیتال</p>
                                <p className="text-xs max-sm:text-2xs text-gray-400">بهمن ماه 1394</p>
                            </div>
                            <div className="border-2 border-gray-300 rounded-md text-center p-3 max-sm:p-0 max-lg:border-0">
                                <Image src={honor2} alt="افتخارات" width={60} height={50} className="mt-5 pb-5 m-auto w-14 h-24" onContextMenu={e => e.preventDefault()} />
                                <p className="text-sm max-sm:text-xs font-semibold pl-1 pr-1 max-lg:pr-0 max-lg:pl-0">دومین همایش تجلیل از آژانس های همکار</p>
                                <p className="text-xs max-sm:text-2xs text-gray-400">بهمن ماه 1394</p>
                            </div>
                            <div className="border-2 border-gray-300 rounded-md text-center p-3 max-sm:p-0 max-lg:border-0">
                                <Image src={honor3} alt="افتخارات" width={60} height={50} className="mt-5 pb-5 m-auto w-18 h-24" onContextMenu={e => e.preventDefault()} />
                                <p className="text-sm max-sm:text-xs font-semibold pl-1 pr-1 max-lg:pr-0 max-lg:pl-0">چهارمین همایش بین المللی بازاریابی اینترنتی، اقتصاد و گردشگری شهری</p>
                                <p className="text-xs max-sm:text-2xs text-gray-400">بهمن ماه 1394</p>
                            </div>
                            <div className="border-2 border-gray-300 rounded-md text-center p-3 max-sm:p-0 max-lg:border-0">
                                <Image src={honor4} alt="افتخارات" width={60} height={50} className="mt-5 pb-5 m-auto w-10 h-24" onContextMenu={e => e.preventDefault()} />
                                <p className="text-sm max-sm:text-xs font-semibold pl-1 pr-1 max-lg:pr-0 max-lg:pl-0">تقدیر در سمینار آداب نوین میزبانی بین الملل</p>
                                <p className="text-xs max-sm:text-2xs text-gray-400 ">بهمن ماه 1394</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default About;

export async function getStaticProps(context: any) {

    const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
    const strapiTenant = process.env.PROJECT_SERVER_STRAPI_TENANTID;

    let strapiData: any;

    if (hasStrapi) {
        strapiData = await getStrapiPages(`filters[Slug][$eq]=about&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate]=*`)
    }


    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                strapiData: strapiData?.data?.data || null
            },

        }
    )

}