import BreadCrumpt from "@/modules/blogs/components/template/BreadCrumpt";
import Accordion from "@/modules/shared/components/ui/Accordion";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const faq: NextPage = () => {

    const faqs = [
        {
            q: 'رزرو آنلاین هتل چیست؟',
            a: (<div className="text-sm space-y-6 p-2">
                <p>
                این روزها که عصر اینترنت و تبادل آنلاین اطلاعات است، بسیاری از صنایع دچار تغییرات و تحول فراوان شده‌اند. یکی از حوزه‌هایی که به نظر می‌رسید هرگز به صورت مجازی امکان ارائه خدمات را نداشته باشد، حوزه گردشگری و سفر است؛ چراکه سفر چیزی جز حضور فیزیکی در مقصد مورد نظر نبوده. در گذشته، افراد کافی بود تصمیم به سفر به مقصد مدنظر خود بگیرند و به هر طریقی خود را به آنجا می‌رساندند. این روش سنتی مشکلات بسیاری را برای مسافران دربرداشت. مثلاً در صورتی که نیاز به اقامت در هتل داشتند باید شخصاً و در همان روز به هتل مدنظر خود مراجعه می‌نمودند و همین موضوع به تنهایی موجب بروز مشکلات بسیاری می‌شد؛ ازجمله عدم ظرفیت هتل، عدم رضایت مسافر از فضای هتل، عدم وجود امکانات موردنیاز مسافر در آن هتل مشخص و بسیاری مسائل دیگر.
                </p>
                <p>
                دنیای اینترنت اما این روزها حتی سفرها و برنامه‌ریزی برای آن را دچار دگرگونی‌های بسیار کرده. مثلاً افراد پیش از سفر می‌توانند کلیه اطلاعات لازم را درباره هتل موردنظر خود به دست بیاورند، یا از موجودی ظرفیت هتل مطلع شوند و یا حتی به لطف آژانس‌های مسافرتی رزرو آنلاین هتل مانند سفرانه اتاق مورد نظر خود را از قبل رزرو نموده، آن هم با حداکثر تخفیف!
                </p>
                <p>
                ما در سایت سفرانه تلاش نموده‌ایم با جمع‌آوری نظرات کاربران در صفحات هتل‌ها، به افرادی که قصد اقامت در هتل دارند حداکثر اطلاعات لازم را داده تا با استفاده از نظرات واقعی مسافران پیشین آن هتل درست‌ترین تصمیم را در مسیر سفرشان بگیرند.
                </p>
            </div>)
        },
        {
            q: 'آیا امکان رزرو ساعتی هتل یا اقامتگاه‌ها وجود دارد؟',
            a: (<div className="text-sm p-2">
                <p>
                در بعضی هتل‌ها بله. این مورد بستگی به ارائه این نوع اتاق‌ها از سوی هتل به آژانس دارد. اگر هتل یا اقامتگاهی قابلیت اقامت ساعتی را فراهم کرده باشد، در نوع اتاق کلمه Day use یا «اقامت ساعتی» را خواهید دید که در این صورت با توجه به توضیحات هر اتاق که با رنگ نارنجی مشخص شده است می‌توانید از جزئیات امکانات آن نوع اتاق آگاه شوید.
                </p>
            </div>)
        },
        {
            q: 'آیا هتل‌ها صبحانه رایگان نیز ارائه می‌کنند؟',
            a: (<div className="text-sm p-2 space-x-6">
                <p>
                می‌توان گفت بیشتر هتل‌ها صبحانه رایگان (چه به صورت بوفه و چه به صورت منوی انتخابی) به مسافران ارائه می‌نمایند. در صورتی که هتلی اتاق بدون صبحانه نیز به مسافران ارائه نماید در توضیحات اتاق‌های آن هتل با رنگ نارنجی عبارت «فاقد صبحانه» را خواهید دید. در صورتی که همچنان در صحت اطلاعات ارائه صبحانه هتل تردید داشته یا ارائه آن برایتان اولویت دارد با کارشناسان سفرانه تماس گرفته و اطلاعات دقیق را از ما دریافت نمایید.
                </p>
            </div>)
        },
        {
            q: 'چطور می‌توانم هتل مورد نظر خود را در سایت پیدا کنم؟',
            a: (<div className="text-sm p-2 space-y-6">
                <p>
                    در صورتی که نام هتل موردنظر خود را می‌دانید، آن را در فیلتر جستجوی صفحه اصلی سفرانه تایپ نموده و گزینه موردنظر خود را انتخاب نموده و پس از ثبت تاریخ ورود و خروج خود دکمه جستجو را بزنید تا به صفحه هتل هدایت شوید.
                </p>
                <p>
                اما در صورتی که هتل مشخصی در نظر ندارید می‌توانید در همان صفحه اصلی نام شهر مقصد خود را وارد نموده و با کلیک بر روی گزینه جستجو به فهرست کلیه هتل‌های موجود در آن شهر هدایت خواهید شد.
                </p>
                <p>
                این گزینه را هم در نظر داشته باشید که در صورت عدم مشخص بودن برنامه سفر، می‌توانید با کارشناسان ما تماس گرفته تا با توجه به تاریخ سفر و بودجه و جزئیاتی که در اختیار دارید شما را راهنمایی نمایند تا نهایتاً به بهترین گزینه مطابق با درخواستتان برسید.
                </p>
            </div>)
        },
        {
            q: 'چطور می‌توانم مطابق با بودجه خودم هتل‌های مناسب را پیدا کنم؟',
            a: (<div className="text-sm p-2 space-y-6">
                <p>
                در این شرایط ابتدا در صفحه اصلی سفرانه در بخش جستجو نام شهر مورد نظر خودتان را تایپ نموده و تاریخ سفر خود را ثبت نمایید. سپس با انتخاب گزینه «جستجو» به صفحه فهرست هتل‌های آن شهر هدایت خواهید شد. در این مرحله در میان فیلترهای جستجوی سمت راست صفحه می‌توانید فیلتر قیمت را طبق بودجه خود نمایید. در این صورت کلیه هتل‌هایی که در مقصد موردنظر شما با بودجه شما همخوانی دارند نمایش داده می‌شوند.
                </p>
                <p>
                در نظر داشته باشید که هر زمان در طی فرایند رزرو و یا پیدا کردن هتل موردنظر خود به مشکلی برخوردید یا پرسشی داشتید می‌توانید با کارشناسان سفرانه تماس بگیرید.
                </p>
            </div>)
        },
        {
            q: 'چه مواردی شامل رزرو اتاق من می‌شود؟',
            a: (<div className="text-sm p-2">
                <p>
                کلیه مواردی که در صفحه اصلی هتل و یا در توضیحات نارنجی رنگ زیر نوع اتاق ذکر شده است شامل خدمات اتاق خواهد شد. در نظر داشته باشید که مبلغی که روبروی هر اتاق در صفحه هتل مشاهده می‌فرمایید مبلغ نهایی بوده و کلیه عوارض و مالیات‌های قانونی شامل آن شده است و وجه مازادی به آن اضافه نخواهد گشت.
                </p>
            </div>)
        },
        {
            q: 'آیا مالیات و عوارض مشمول قیمت اتاق شده است؟',
            a: (<div className="p-2 text-sm">
                <p>
                بله. مبلغی که روبروی هر اتاق در صفحه هتل مشاهده می‌فرمایید مبلغ نهایی بوده و کلیه عوارض و مالیات‌های قانونی شامل آن شده است و وجه مازادی به آن اضافه نخواهد گشت.
                </p>
            </div>)
        },
        {
            q: 'آیا برای کودکان مبلغ به صورت کامل پرداخت می‌شود؟',
            a: (<div className="p-2 text-sm">
                <p>
                مسئله هزینه اقامت کودکان در هر هتلی متفاوت بوده و در صورتی که هتل قوانین خاص خود را اعلام نماید، کارشناسان ما آن را در صفحه هتل ثبت خواهند نمود. برخی هتل‌ها با توجه به بازه سنی مشخص و شرایط استفاد از سرویس اضافه، مبلغ اقامت کودک را نیم‌بها یا رایگان محاسبه می‌نمایند. پیشنهاد ما این است که در صورت همراه داشتن کودک در طول سفر پیش از ثبت رزرو با کارشناسان ما تماس گرفته و جزئیات هزینه اقامت کودک را در هتل موردنظر خود جویا شوید.
                </p>
            </div>)
        },
        {
            q: 'تفاوت اتاق دبل با اتاق تویین چیست؟',
            a: (<div className="text-sm p-2">
                <p>
                در اتاق تویین دو تخت یک نفره به صورت جدا از هم وجو داشته، در حالی که تخت دبل یک تخت دونفره بزرگ است. زوج‌ها در اتاق دبل اقامت خواهند داشت در حالی که اگر دو دوست با هم سفر می‌کنند اتاق تویین را رزرو می‌نمایند.
                </p>
            </div>)
        },
        {
            q: 'آیا می‌توانم برای اتاق موردنظرم یک تخت اضافه رزرو کنم؟',
            a: (<div className="text-sm p-2 space-y-6">
                <p>
                در صورتی که هتل موردنظر شما یا اتاقی که قصد رزرو آن را دارید امکان افزودن سرویس اضافه را داشته باشد، روبروی تعداد نفرات اتاق زیر نوع اتاق گزینه «1 تخت اضافه» را به همراه مبلغی که بابت هر تخت اضافه در هر شب به صورتحساب شما افزوده خواهد شد را ملاحظه می‌فرمایید. در صورتی که هتل امکان ارائه سرویس اضافه را نداشته باشد، عبارت «بدون تخت اضافه» نمایان خواهد شد.
                </p>
                <p>
                در نظر داشته باشید که هر زمان در طی فرایند رزرو خود پرسشی داشتید می‌توانید با کارشناسان سفرانه تماس گرفته و اطلاعات مورد نظر خود را با جزئیات دریافت نمایید.
                </p>
            </div>)
        },
        {
            q: 'چگونه بفهمم در هر واحد اقامتی چند اتاق خواب قرار دارد؟',
            a: (<div className="text-sm p-2 space-y-6">
                <p>
                کلیه امکانات اتاق باید به صورت واضح در توضیحات اتاق که با رنگ نارنجی مشخص شده‌اند، یا در نام اتاق یا در توضیحات پایین صفحه درباره اتاق‌های هتل درج شده باشد.
                </p>
                <p>
                در صورتی که این اطلاعات برای شما نامفهوم یا غیر واضح است یا از صحت اطلاعات درج شده اطمینان ندارید می‌توانید با کارشناسان سفرانه تماس گرفته و جویای آخرین و به‌روزترین اطلاعات درباره هتل موردنظر خود شوید.
                </p>
            </div>)            
        },
        {
            q: 'چطور بدانم هتل موردنظرم چه امکاناتی دارد؟',
            a: (<div className="p-2 text-sm">
                <p>
                در صفحه هتل موردنظرتان، دقیقاً پس از نوع اتاق‌ها، امکانات هتل را ملاحظه می‌فرمایید. در این قسمت کلیه امکانات موجود در هتل درج شده است. در صورتی که گزینه مدنظر خود را در بخش امکانات پیدا نکردید، کمی پایین‌تر در بخش توضیحات هتل مطالبی که درباره هتل نوشته شده است را بخوانید. اگر باز هم این اطلاعات برای شما نامفهوم یا غیر واضح است یا از صحت اطلاعات درج شده اطمینان ندارید می‌توانید با کارشناسان سفرانه تماس گرفته و جویای آخرین و به‌روزترین اطلاعات درباره امکانات هتل موردنظر خود شوید.
                </p>
            </div>)
        },
        {
            q: 'آیا ارائه امکاناتی که در هر هتل مشخص شده است، تضمین شده و قطعی است؟',
            a: (<div className="text-sm p-2 space-x-6">
                <p>
                بله. کلیه اطلاعاتی که در صفحه هتل‌ها درج شده مورد تایید مسئولان آن هتل بوده و ملزم به ارائه آنها هستند. با اینکه آژانس بابت عدم ارائه امکانات قید شده از سوی هتل تعهدی نداشته و تنها انتقال‌دهنده اطلاعات است، چنانچه امکانات خاصی را در سایت سفرانه ملاحظه می‌نمایید ولی هنگام حضور در هتل امکان ارائه آن وجود ندرارد با کارشناسان ما تماس گرفته تا ما پیگیری‌های لازم را بابت عدم هماهنگی به وجود آمده بجا آورده و در صورت امکان مشکل به وجود آمده را رفع نماییم. 
                </p>
                <p>
                لازم به ذکر است در صورتی که اطلاعات درج شده در صفحه هتل برای شما نامفهوم یا غیر واضح است یا از صحت اطلاعات درج شده اطمینان ندارید می‌توانید با کارشناسان سفرانه تماس گرفته و جویای آخرین و به‌روزترین اطلاعات درباره امکانات هتل موردنظر خود شوید.
                </p>
            </div>)
        },
        {
            q: 'چطور می‌توانم نشانی دقیق هتل مورد نظرم را ببینم؟',
            a: (<div className="p-2 text-sm">
                <p>
                پس از جستجو در صفحه اصلی سایت سفرانه که وارد صفحه هتل شدید، همان ابتدای صفحه زیر نام هتل نشانی دقیق درج شده است. در صورتی که نیاز به نقشه دارید، می‌توانید در قسمت بالای صفحه در محل قرارگیری تصاویر هتل، سمت راست صفحه گزینه «نمایش هتل در نقشه» را انتخاب نموده و محل دقیق قرارگیری آن را مشاهده بفرمایید.
                </p>
            </div>)
        },
        {
            q: 'چطور می‌توانم چشم‌انداز یا طبقه اتاق موردنظرم را انتخاب نمایم؟',
            a: (<div className="p-2 text-sm">
                <p>
                در صورتی که اتاق‌های یک هتل دارای چشم‌اندازهای مختلف (مثلاً دریا و خیابان) باشد، چشم‌انداز هر اتاق در نام آن دقیقاً ذکر شده است. شما می‌توانید اتاقی را رزرو نمایید که چشم‌انداز آن طبق خواسته‌تان است. در مورد طبقه نیز برخی هتل‌ها اتاق‌های خود را به طبقات مختلف تقسیم‌بندی نموده و قیمت‌های مختلف برای هر کدام درج نموده‌اند که شما می‌توانید در بین آنها بازه طبقاتی مدنظرتان را انتخاب نمایید.
                </p>
            </div>)
        },
        {
            q: 'رزرو آنلاین هتل از سایت سفرانه چه مزایایی دارد؟',
            a: (<div className="p-2 text-sm">
                <p>
                ما در سفرانه این تضمین را به شما می‌دهیم که با کمترین قیمت می‌توانید هتل‌های ایران را رزرو نمایید. تضمین کمترین قیمت به این معناست که در صورت مشاهده قیمتی پایین‌تر از آنچه در سایت سفرانه ثبت شده، می‌توانید با کارشناسان ما تماس گرفته و به ما اطلاع دهید.
                </p>
            </div>)
        }
    ]

    return (
        <>
        <BreadCrumpt page="سوالات متداول"/>
        <div className="max-w-container m-auto p-5 mt-5">
        <h2 className="font-bold text-3xl">سوالات متداول</h2>
        <div className="pl-5 pr-5 pt-5 pb-10 mt-5 border-2 border-gray rounded-md space-y-3 bg-white">
            <h2 className="mt-6 mb-6 fnt-bold text-lg">هتل داخلی</h2>
            {
                faqs.map(item => <Accordion content={item.a} title={item.q} />)
            }
        </div>
        </div> 
        </>    
    )
}

export default faq;


export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
            },

        }
    )

}