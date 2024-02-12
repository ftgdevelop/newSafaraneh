import BreadCrumpt from "@/modules/blogs/components/template/BreadCrumpt";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Terms: NextPage = () => {
    return (
        <>
        <BreadCrumpt page="قوانین و مقررات" />
        <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-2">
            <h2 className="mt-10 font-bold text-2xl">قوانین و مقررات</h2>
            <div className="bg-white p-5 mt-4 rounded-lg border-2 border-gray space-y-5">
                <h5 className="mt-5 text-lg">به‌روز بودن اطلاعات سایت</h5>
                <p className="text-sm leading-9">
                تلاش همکاران سفرانه در بخش تولید محتوا و زنجیره تأمین قیمت‌گذاری همیشه بر این بوده که آخرین و به‌روزترین اطلاعات مجموعه‌های همکار خود را در سایت ثبت نمایند. اما از آنجا که بیش از 1000 هتل داخلی و صدها هزار هتل خارجی و همینطور پرواز در سایت سفرانه ثبت شده و آماده خدمات‌رسانی به مسافران گرامی هستند احتمال آنکه برای دقایق یا حتی مدتی اطلاعات مجموعه بدون اطلاع‌رسانی به همکاران سفرانه به‌روزرسانی شوند وجود دارد. لذا امکان اصلاح اطلاعات، قیمت‌ها، تصاویر و یا کلیه اطلاعات درج‌شده روی سایت پس از ثبت رزرو وجود دارد. در صورتی که پس از ثبت رزرو، اطلاعات مربوط به قیمت از سوی هتل تغییر داشته باشد، کارشناسان سفرانه با مسافر تماس گرفته و نسبت به اصلاح مقادیر در اولین فرصت اقدام می‌نمایند.
                مسافر متعهد می‌شود در صورتی که ویژگی خاصی از هتل موردنظر برای وی اهمیت و اولویت دارد (مانند اتاق غیرسیگاری، استخر یا جکوزی، اتاق مخصوص معلولین یا...) پیش از ثبت رزرو با کارشناسان سفرانه تماس گرفته و نسبت به صحت اطلاعات اطمینان حاصل نمایند.
                </p>

                <h5 className='text-lg'>تعهدات عمومی و کلی استفاده از وبسایت</h5>
                <p className="text-sm">هنگام استفاده از سایت سفرانه کاربر متعهد می‌شود:</p>
                <ul className="text-sm list-disc rtl:pr-10 ltr:pl-10 space-y-4">
                    <li>
                    از کلیه اطلاعات سایت سفرانه تنها استفاده شخصی نموده و از آن برای دریافت آخرین اطلاعات سفر شخصی یا گروهی خود بهره می‌برد. هیچگونه استفاده تبلیغاتی و یا تجاری از منابع سایت سفرانه بدون ذکر منبع مجاز نبوده و پیگرد قانونی خواهد داشت.
                    </li>
                    <li>
                    از وبسایت فقط برای ثبت رزروهای قانونی و واقعی استفاده می‌شود.
                    </li>
                    <li>
                    کاربر به سن قانونی رسیده و امکان رزرو اینترنتی، پرداخت وجه و صلاحیت رسیدگی به هرگونه دعوی قانونی در صورت بروز مشکلات احتمالی پس از ثبت رزرو خود را به صورت کامل دارد.
                    </li>
                    <li>
                    در صورتی که در رزرو برای شخص ثالث صورت می‌گیرد، کاربر رزروکننده موظف است مسافر را از کلیه قوانین و مقررات و اطلاعات آگاه سازد. در صورتی که هنگام انتقال اطلاعات از سوی کاربر به شخص مسافر کوتاهی صورت پذیرد، سایت سفرانه مسئولیتی نخواهد پذیرفت.
                    </li>
                    <li>
                    در صورت ثبت رزروهای غیرواقعی با تعداد بالا یا اسامی غیرواضح یا شماره تماس غیر قابل دسترس، سایت سفرانه اختیار کامل بابت حذف رزرو و عدم انتقال آن به مجموعه موردنظر را داراست.
                    </li>
                    <li>
                    کاربر متعهد می‌شود رزروهای متعدد و بدون پشتوانه روی سایت سفرانه ثبت ننموده و با تماس‌های پی‌درپی باعث اخلال در کار تیم رزرواسیون سفرانه نشود.
                    </li>
                    <li>
                    کلیه رزروهایی که روی سایت سفرانه ثبت می‌شوند پس از تایید باید طی مدت زمان مشخص‌شده تمام و کمال پرداخت شوند. در صورت عدم پرداخت رزرو در مدت زمان مشخص‌شده توسط کارشناسان رزرواسیون، سفرانه اختیار کامل در حذف رزرو ثبت شده توسط کاربر را دارد. رزروهایی که در سایت ثبت شده اما پرداخت نشده‌اند قطعی نبوده و سفرانه هیچ مسئولیتی بابت ثبت آنها در مجموعه موردنظر نخواهد داشت.
                    </li>
                    <li>
                    کاربر تحت هیچ شرایطی اقدام به ورود غیرمجاز به سایت سفرانه و دسترسی به اطلاعات مسافران نخواهد داشت. در صورتی که چنین اقدامی صورت پذیرد، کلیه اقدامات قانونی جهت پیگیری از طریق پلیس فتا صورت خواهد گرفت.
                    </li>
                </ul>

                <h5 className='text-lg'>کپی رایت سایت سفرانه</h5>
                <p className="text-sm">
                کلیه اطلاعات مندرج در سایت سفرانه منحصراً توسط تیم تولید محتوا و زنجیره تأمین و قیمت‌گذاری شرکت سفرانه مشرق زمین ثبت شده و فقط برای استفاده شخصی طراحی و ارائه شده و مشمول قانون کپی رایت و حق مؤلف می‌شوند. هرگونه استفاده بدون ذکر منبع از محتویات و اطلاعات سایت پیگیرد قانونی خواهد داشت.
                </p>
                <p className="text-sm">
                کلیه شرکت‌های خواهر، طرف قرارداد و همکار سفرانه که با شرکت سفرانه مشرق زمین قرارداد همکاری دارند نیز مشمول این بند شده و در صورتی که اطلاعات مندرج در هر کدام از این سایت‌ها نیز مورد سوءاستفاده قرار بگیرند پیگرد قانونی خواهد داشت.
                </p>
                <p className="text-sm">
                در صورتی که در هر زمینه‌ای نیاز به استفاده از اطلاعات سایت سفرانه و یا سایت‌ها و شرکت‌های خواهر و طرف قرارداد با سفرانه وجود دارد، روابط عمومی سازمان به شماره 02126150051 در ساعات اداری پاسخگو و آماده مذاکره خواهد بود.
                </p>

                <h5 className='text-lg'>قوانین کنسلی و اصلاح رزرو</h5>
                <p className="text-sm">
                در صورتی که بنا به هر دلیلی کاربر پس از ثبت رزرو و پرداخت و دریافت تاییده رزرو، تمایل به لغو رزرو خود یا اعمال هر گونه اصلاحیه (اعم از اصلاح نام مسافر، اصلاح تاریخ و یا نوع اتاق، هتل، کلاس پروازی و...) داشته باشد، کلیه قوانین مربوطه طبق قوانین مجموعه موردنظر بوده، و سفرانه هیچگونه دخالتی در اعمال یا اجرای آن ندارد.
                </p>
                <p className="text-sm">
                در شرایطی که کاربر تمایل به لغو یا اصلاح رزرو خود داشته باشد، با کارشناسان سفرانه تماس گرفته و مراتب را به اطلاع کارشناسان خواهد رساند و تبعاً کارشناسان سایت پس از بررسی مورد و ارجاع به مجموعه موردنظر مراتب را به اطلاع کاربر خواهند رساند. هرگونه اعلام کنسلی صرفاً با نام رزروکننده و دریافت اطلاعات ثبت‌شده با نام کاربر رزروکننده انجام خواهد شد. سفرانه هیچگونه مسئولیتی بابت لغو رزرو از طریق اشخاص دیگر (حتی مسافران) نخواهد داشت. سایت سفرانه بابت تایید لغو یا اصلاح رزرو هیچگونه مسئولیتی به عهده نداشته و کلیه عملیات این بخش به عهده مجموعه موردنظر خواهد بود.
                </p>
                <p className="text-sm">
                در صورتی که کاربر جهت اعمال تغییرات در رزرو خود بدون اطلاع کارشناسان سفرانه مستقیماً با مجموعه موردنظر هماهنگ نمایند، سفرانه هیچ مسئولیتی بابت عدم اجرا، عدم اعمال تغییرات، عدم استرداد وجه و یا عدم رضایت طرفین نخواهد داشت.
                </p>
                <p className="text-sm">
                در ایام پیک هیچگونه امکان لغو رزروها یا اعمال اصلاحات وجود نخواهد داشت و کلیه مبلغ پرداختی سوخت خواهد شد.
                </p>
                <p className="text-sm">
                در صورتی که قوانین کنسلی و اصلاح رزرو هر هتل برای کاربر اهمیت ویژه‌ای دارد، پیش از ثبت رزرو با کارشناسان سفرانه تماس گرفته و کلیه اطلاعات به‌روز و منحصر به رزرو قابل دریافت خواهد بود.
                </p>

                <h5 className='text-lg'>درخواست‌های ویژه</h5>
                <p className="text-sm">
                در صورتی که کاربر درخواست ویژه‌ای خارج از آنچه در امکانات هتل یا نوع اتاق ثبت شده دارد می‌تواند در آخرین مرحله رزرو خود در بخش «درخواست‌های ویژه» آن را ثبت نماید. در صورتی که اعمال این درخواست نیاز به پرداخت وجه مضاعف باشد، کارشناسان سفرانه با کاربر تماس گرفته و جزئیات را در اختیار ایشان خواهد گذاشت.
                </p>
                <p className="text-sm">
                سایت سفرانه بابت درخواست‌های ثبت شده هنگام رزرو بدون هماهنگی با کارشناسان رزرواسیون و یا عدم پرداخت وجوه مربوطه و یا درخواست‌های امکانات خارج از آنچه در صفحه هتل درج شده و ارائه آنها نخواهد داشت.
                </p>

                <h5 className='text-lg'>قوانین کودکان</h5>
                <p className="text-sm">
                کلیه قوانین مربوط به اقامت کودکان و بهای اقامت ایشان در صفحه مربوط به مجموعه موردنظر درج شده است. هر مجموعه‌ای (اعم از هتل یا پرواز) قوانین مختص خود را جهت پذیرش کودکان در سنین مختلف و هزینه اقامت ایشان دارند.
                </p>
                <p className="text-sm">
                در صورتی که در صفحه مجموعه اطلاعاتی درباره هزینه‌های رزرو برای کودکان مشاهده نمی‌شود، کارشناسان سفرانه جهت ارائه اطلاعات به‌روز و جامع در این زمینه در خدمات مسافران و کاربران گرامی خواهند بود.
                </p>
                <p className="text-sm">
                در صورت ارائه اطلاعات ناقص و یا اشتباه درباره سن کودک توسط کاربر، سفرانه هیچگونه مسئولیتی بابت عدم پذیرش مسافران و یا الزام به پرداخت وجه مازاد هنگام استفاده از خدمات توسط مسافران نخواهد داشت.
                </p>

                <h5 className='text-lg'>عدم حضور یا نوشو No-show</h5>
                <p className="text-sm">
                در صورتی که تصمیم به عدم حضور در هتل یا هواپیما در تاریخ رزرو وجود داشته باشد، مسافر یا رزروکننده موظف هستند به کارشناسان سفرانه اطلاع دهند. اما در شرایط ضروری که امکان اطلاع‌رسانی و حضور در مجموعه موردنظر در روز رزرو و موعد مقرر وجود نداشته باشد، قوانین نوشو طبق قوانین مجموعه موردنظر محاسبه گردیده و سفرانه در این زمینه هیچ مسئولیتی ندارد.
                </p>

                <h5 className='text-lg'>خطا در پرداخت</h5>
                <p className="text-sm">
                مسئولیت سفرانه در مراحل رزرو از انتخاب هتل تا دریافت تاییدیه خواهد بود به جز زمانی که کاربر در درگاه بانک قرار دارد. سفرانه هیچگونه مسئولیتی بابت عدم انجام تراکنش‌های بانکی نداشته و پرداخت‌هایی که با خطا مواجه می‌شوند باید از طریق بانک موردنظر (مقصد یا مبداً) پیگیری شوند.
                </p>
                <p className="text-sm">
                    در صورتی که پرداخت کاربر با موفقیت انجام شود به صفحه دریافت تاییدیه رزرو هدایت خواهد شد. دریافت تاییدیه رزرو به معنای تکمیل مراحل ثبت رزرو می‌باشد.
                </p>
                
                <h5 className='text-lg'>کیفیت خدمات مجموعه رزروشده</h5>
                <p className="text-sm">
                در صورتی که کیفیت خدمات مجموعه رزروشده از طریق سفرانه مطابق با استانداردهای مورد انتظار نباشد، سفرانه مسئولیتی بابت تامین و اصلاح خدمات مجموعه نداشته چراکه کلیه اطلاعات درج‌شده در صفحه هتل یا ایرلاین منحصراً از طرف خود مجموعه ارسال شده و مورد تایید ایشان قرار گرفته است.
                </p>
                <p className="text-sm">
                عدم کیفیت اتاق‌ها، امکانات غیراستاندارد، عدم ارائه امکانات ذکرشده، کیفیت پایین غذا، برخورد ناشایست پرسنل هتل و موارد دیگر در حیطه مسئولیت آژانس نبوده و مسئولیت حقوقی بابت رفع آن نخواهد داشت.
                </p>

                <h5 className="text-lg">استرداد وجه</h5>
                <p className="text-sm">
                از آنجا که سفرانه پس از دریافت وجه از جانب کاربر بلافاصله و به صورت نقدی مبلغ رزرو را برای مجموعه موردنظر واریز خواهد کرد، در صورتی که به هر دلیلی اعم از لغو رزرو، سفرانه ملزم به استرداد وجه به کاربر شود، استرداد وجه زمانی صورت خواهد گرفت که مجموعه موردنظر مبلغ را پس از کسر جریمه یا به صورت کامل برای سفرانه واریز کرده باشد. در صورت عدم واریز وجه از سوی هتل یا مجموعه موردنظر برای سفرانه، هیچ تعهدی بابت استرداد وجه برای کاربر رزروکننده وجود نخواهد داشت.
                </p>
                <p className="text-sm">
                ضمناً هر گونه استرداد وجه صرفاً به شماره کارتی که از طریق آن رزرو در سایت سفرانه ثبت شده باشد و به نام رزروکننده باشد انجام خواهد شد. سفرانه هیچگونه مسئولیتی بابت استرداد وجه به اشخاص دیگری (حتی مسافران) نخواهد داشت.
                </p>

                <h5 className="text-lg">اطلاع‌رسانی‌ها</h5>
                <p className="text-sm">
                کاربر ثبت‌کننده رزرو موظف است نسبت به درج شماره تماس و ایمیل و اطلاعات تماس درست و واضح اقدام نماید. چراکه هرگونه تغییرات یا اطلاع‌رسانی بابت رزروها از طریق تماس تلفنی، پیامک و یا از طریق ایمیل انجام خواهد شد. در صورتی که اطلاعات درج‌شده در سایت توسط کاربر رزروکننده غیرقابل دسترس و نادرست باشد، سفرانه هیچ مسئولیتی بابت عدم آگاهی از تغییرات رزرو کاربر نخواهد داشت.
                </p>
            </div>
        </div>
        </>    
    )
}


export default Terms;

export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
            },

        }
    )

}