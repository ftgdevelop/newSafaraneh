import Accordion from "@/modules/shared/components/ui/Accordion";

const CipFaq = () => {
    const faqs = [
        {
            title: 'رزرو خدمات CIP سفرانه چگونه است؟',
            content: (<div className="bg-gray text-sm p-3 max-sm:p-2 ">
                <p>رزرو خدمات CIP سفرانه به دو روش قابل انجام است.</p>
                <br/>
                <p> <b>روش اول: </b>با پرکردن فیلد جزئیات پرواز، فیلد مشخصات رزروکننده و مشخصات مسافران وارد صفحه پرداخت می‌شوید و بعد از پرداخت، واچر مخصوص را دریافت می‌کنید. با ارائه این واچر در فرودگاه از خدمات CIP بهره‌مند خواهید بود. </p>
                <br/>
                <p><b>روش دوم: </b> مسافران خواهان دریافت خدمات CIP می‌توانند از طریق ارسال بلیط به شماره واتسپ سفرانه (09129590542)، برای دریافت خدمات CIP اقدام کنند</p>
            </div>)
        },
        {
            title: 'خدمات CIP شامل ترنسفر فرودگاهی می‌شود؟',
            content: (<div className="text-sm p-3 max-sm:p-2 ">
                <p>خیر! CIP سفرانه شامل ترنسفر فرودگاهی از مبدا فردوگاه نمی‌شود و در صورت درخواست این خدمات باید هزینۀ ترانسفر به صورت جداگانه پرداخت شود.</p>
            </div>)
        },
        {
            title: 'خدمات CIP به چه ایرلاین‌هایی تعلق می‌گیرد؟',
            content: (<div className="text-sm p-3 max-sm:p-2 ">
                <p>به طور کلی خدمات CIP برای پروازهای ورودی کلیه ایرلاین‌ها ارائه می‌شود. اما برای پروازهای خروجی امکان ارائه خدمات به ایرلاین‌های لوفت‌هانزا، زاگرس، کویت و آسترین و وارش وجود ندارد.</p>
            </div>)
        },
        {
            title: 'آیا امکان رزرو خدمات CIP به تاریخ امروز وجود دارد؟',
            content: (<div className="p-3 max-sm:p-2  text-sm">
                <p>به طور کلی برای رزرو آنلاین خدمات CIP حداقل از 12 ساعت قبل بایستی اقدام شود؛ اما اگر به هر دلیلی موفق به انجام این امر نشدید و نیاز به رزرو خدمات CIP فوری داشتید با شماره 02126150051 تماس حاصل فرمایید.</p>
            </div>)
        },
        {
            title: 'مدارک لازم برای رزرو خدمات CIP سفرانه چیست؟',
            content: (<div className="text-sm p-3 max-sm:p-2 ">
                <p>برای رزرو و استفاده از خدمات CIP فرودگاه امام، به مدارک و اطلاعات زیر نیاز دارید.</p>
                <ul className="list-disc pr-7 pl-7 pt-8">
                    <li>نام ایرلاین</li>
                    <li>شماره پرواز</li>
                    <li>تاریخ پرواز</li>
                    <li>ساعت پرواز (پرواز خروجی)</li>
                    <li>ساعت ورود (پرواز ورودی)</li>
                    <li>مشخصات رزروگیرنده</li>
                    <li>مشخصات مسافران</li>
                </ul>
            </div>)
        },
        {
            title: 'خدمات CIP برای پروازهای ورودی به چه صورت است؟',
            content: (<div className="p-3 max-sm:p-2  text-sm space-y-5">
                <p>بعد از رزرو خدمات CIP سفرانه، پرسنل سی‌آی‌پی براساس نام مسافر، ساعت ورود هواپیما (بر اساس اطلاعات اعلامی) با بورد مخصوص نام مسافر و یا مسافرین حضور دارند. مسافرانی که خدمات CIP سفرانه را خریداری نموده‌اند خود را به خودرویی که کنار هواپیما منتظر است و نام مسافر را در دست دارد معرفی می‌کنند و از طریق خودروی مخصوص CIP از پای پرواز تا سالن تشریفات همراهی می‌شوند. درصورتی که مسافر در قسمت بار، چمدان داشته باشد به پرسنل اعلام کرده تا آنها برای دریافت بار مسافر وارد عمل شوند.</p>
                <p>در سالن تشریفات مسافر از بخش گذرنامه عبور و در سالن تشریفات تا زمان دریافت پاسپورت و چمدان از رستوران سلف سرویس با غذاهای متنوع و کافی‌شاپ پذیرایی می‌شوند. بعد از دریافت چمدان و پاسپورت پروسه بهره‌مندی مسافر از خدمات CIP نیز به پایان خواهد رسید.</p>
            </div>)
        },
        {
            title: 'خدمات CIP برای پروازهای خروجی چگونه است؟',
            content: (<div className="text-sm p-3 max-sm:p-2  space-y-5">
                <p>خدمات CIP در پروازهای خروجی از درب منزل شروع نمی‌شوند. ترنسفر فرودگاهی بایستی به طور مجزا رزرو بشود. خدمات تشریفات ویژه برای پروازهای خروجی از زمان رسیدن مسافر تا درب اصلی فرودگاه آغاز می‌شود. در این بخش پرسنل سی آی پی سفرانه به استقبال مسافر آمده و خدمات حمل بار و چمدان او را به عهده می‌گیرند. سپس مسافر از گیت‌های مخصوص پلیس گذر می‌کند و مدراک شامل پاسپورت، بلیط و ویزا (یا مدارک اقامتی کشور مقصد) را در اختیار پرسنل CIP قرار می‌دهد و بدون معطلی وارد فضای دلپذیر سالن تشریفات می‌شود.</p>
                <p>زمانی که مسافر در حال استرحت و برخورداری از امکانات بی‌نظیر کافی‌شاپ، رستوران، غرفه خرید صنایع دستی و سوغاتی است، همکاران سی‌آی‌پی ما، کارت پرواز به همراه تگ بار و مدارک اقامتی را دریافت کرده و به مسافر تحویل می‌دهند.</p>
                <p>در این مرحله گذرنامۀ مسافرِ دارای خدمات سی‌آی پی برای مهر به پلیس فرودگاه ارسال می‌شود. زمانی که ساعت دقیق پرواز فرامی‌رسد، پرسنل CIP برای عبور از بخش گذرنامه به مسفر اطلاع می‌دهند. مسافر از گیت پرواز عبور می‌کند و بعد از بازرسی پلیس، پرسنل CIP با خودروی مخصوص مسافر را تا پای پلکان هواپیما همراهی خواهند کرد.</p>
            </div>)
        },
        {
            title: 'آیا همراه مسافر CIP باید هزینه جداگانه بپردازد؟',
            content: (<div className="text-sm p-3 max-sm:p-2 ">
                <p>مشایعت کنندۀ مسافران CIP چه در پروازهای خروجی و چه ورودی برای ورود به سالن تشریفات ویژه بایستی هزینه جداگانه بپردازند.</p>
            </div>)
        },
        {
            title: 'خدمات CIP فرودگاه امام برای چه افرادی مناسب است؟',
            content: (<div className="text-sm p-3 max-sm:p-2">
                <p>همانطور که در موارد بالا نیز گفته شد تمامی مسافران به شرط پرداخت هزینۀ خدمات قادر به استفاده از خدمات CIP خواهند بود. اما استفاده از این خدمات برای یکسری از افراد مناسب‌تر است.</p>
                <ul className="list-disc pt-8 pr-6 pl-6">
                    <li>تاجران، رؤسا و مدیران رده بالای شرکت‌های مهم خصوصی و دولتی</li>
                    <li>افراد مشهور جامعه مانند ورزشکاران و هنرمندان</li>
                    <li>سالمندان و افراد دارای معلولیت</li>
                    <li>افرادی که به واسطۀ شغلشان ناگریز به سفرهای زیاد هستند</li>
                    <li>افراد غیر ایرانی به خصوص هنگام ورود و دریافت ویزا</li>
                </ul>
            </div>)
        }
    ]
    return (
        <>
        <h2 className="text-3xl mt-20 mb-5">سوالات متدوال</h2>
        <div className="space-y-5">
            {
                    faqs.map((faq, index) =>
                        <div className="bg-white rounded-lg" key={index}>
                        <Accordion content={faq.content} title={faq.title} />
                        </div>
                    )
            }
            </div>
        </>
    )
}

export default CipFaq;