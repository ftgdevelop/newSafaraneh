import { getStrapiPages } from "@/modules/shared/actions/strapiActions";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Markdown from 'react-markdown';
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { replaceBrandNames } from "@/modules/shared/helpers";

type Props = {
    strapiData?: {
        attributes?: {
            Sections?: {
                Title?: string;
                Body?: string;
            }[]
        }

    }[];
}

const privacy: NextPage<Props> = props => {

    const title = props.strapiData?.[0]?.attributes?.Sections?.[0]?.Title || "حفظ حریم خصوصی";
    const strapiContent = props.strapiData?.[0]?.attributes?.Sections?.[0]?.Body;

    const renderedMarkdown = replaceBrandNames(strapiContent || "");

    return (

        <div className="max-w-container m-auto p-5 max-sm:p-3 ">
            <BreadCrumpt items={[{ label: title }]} />
            <h2 className="font-bold text-3xl mt-10 mb-5"> {title} </h2>

            {strapiContent ? (
                <div className='inserted-content text-justify bg-white rounded-md border-2 border-gray mt-10 p-7 max-md:p-3 pt-10 pb-10 space-y-7' >
                    <Markdown>{renderedMarkdown}</Markdown>
                </div>
            ) : (
                <div className="bg-white border-2 border-gray space-y-6 p-5 max-md:p-3 max-md:pt-7 rounded-md">
                    <p className="text-sm">
                        در وهله اول حریم خصوصی کاربران سامانه سفرانه برای ما در بالاترین درجه اهمیت قرار دارد. شما به خدمات ارائه شده از سمت ما اعتماد می‌کنید و ما برای این اعتماد ارزش قائل هستیم. این بدان معنی است که متعهد به حفظ و حراست از تمامی اطلاعات شخصی هستیم که به ما ارائه می‌دهید. از داده های شما عزیزان تنها در راستای ارائه بهتر خدمات رزرو آنلاین به خود شما استفاده خواهیم کرد.
                    </p>
                    <p className="text-sm">
                        ما در سفرانه متعهد می‌شویم که هیچ بخشی از اطلاعات شما را در اختیار دیگران قرار ندهیم، هیچ بخشی از این اطلاعات را به فروش نمی‌گذاریم و توزیع نخواهیم کرد. فقط در صورت داشتن حکم قانونی، مراجع ذیصلاح، امکان دریافت اطلاعات هریک از کاربران سفرانه را خواهند داشت.
                    </p>
                    <p className="text-sm">
                        اگر خطی و مشی سازمانی به سمتی پیش برود که سفرانه با موسسه دیگری ادغام بشود، اطلاعات شما به مالکان و یا شرکای جدید که ایشان نیز متعهد به حفظ حریم شخصی کاربران هستند، نیز اعلام خواهد شد.
                    </p>
                    <p className="text-sm">
                        از هر پلتفرمی اعم از وبسایت سفرانه، صفحه اینستاگرام رسمی سفرانه و توئیتر رسمی شرکت سفرانه وارد صفحه رزرو هتل های سفرانه بشوید، در هر حال حفظ و نگهداری اطلاعات شما برای ما در بالاترین درجه اهمیت قرار دارد.
                    </p>
                    <p className="text-sm">
                        ممکن است در شرایط مختلف تغییراتی در قوانین حفظ خط و مشی حریم خصوصی ایجاد شود برای اطلاع از این تغییرات به طور دوره‌ای به صفحه حفظ حریم خصوصی سفرانه مراجعه بفرمایید.
                    </p>

                    <h5 className="text-lg">سفرانه چه اطلاعات خصوصی را از شما دریافت خواهد کرد؟</h5>
                    <p className="text-sm">
                        سفرانه بدون دریافت یک سری از اطلاعات اولیه مانند نام رزرو کننده، اطلاعات تماس، نام همراهان، کد ملی، قادر به فراهم آوردن یک سفر بی نقص که می‌تواند شامل رزرو آنلاین هتل، رزرو بلیط هواپیما و یا رزرو خدمات Cip فرودگاهی باشد، نخواهد بود.
                    </p>
                    <p className="text-sm">
                        همچنین سامانه سفرانه توسط کوکی‌های اطلاعاتی نظیر ipرایانه، تلفن همراه و یا هر دستگاهی که برای رزرو استفاده می‌کنید را جمع آوری می‌کند.
                    </p>
                    <p className="text-sm">
                        سفرانه از اطلاعات کاربرانش به جهت اطلاع آنها از تخفیف‌های حداکثری، پیشنهادات ویژه رزرو و اخبار رزرو و اجرای کمپین های تبلیغاتی استفاده می‌کند.
                    </p>
                    <h5 className="text-lg">جمع آوری اطلاعات کاربران سفرانه توسط کوکی‌ها به چه هدفی انجام می‌شود؟</h5>
                    <p className="text-sm">
                        کوکی‌ها به تسریع روند لاگین کردن کاربران سفرانه در این سامانه کمک می‌کنند. در واقع کوکی‌ها اطلاعات ورود شما، IP، سیستم عامل و زمان ورود را جمع آوری می‌کنند تا با هر بار مراجعه به سامانه سفرانه با سرعت بالاتری به صفحه‌های هدف دسترسی داشته باشید.
                    </p>
                    <p className="text-sm">
                        اگر مخالف این امر هستید، میتوانید با غیر فعال کردن تنظیمات مرورگر خود مانع ذخیره کوکی ها در سفرانه بشوید.
                    </p>
                </div>
            )}

        </div>

    )
}

export default privacy;

export async function getStaticProps(context: any) {
    const hasStrapi = process.env.PROJECT_SERVER_STRAPI;
    const strapiTenant = process.env.PROJECT_SERVER_STRAPI_TENANTID;

    let strapiData: any;

    if (hasStrapi) {
        strapiData = await getStrapiPages(`filters[Slug][$eq]=privacy&filters[Tenant][$eq]=${strapiTenant}&populate[Sections][populate]=*`)
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