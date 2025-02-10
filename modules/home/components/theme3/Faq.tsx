import Accordion from "@/modules/shared/components/ui/Accordion";
import { ReactNode } from "react";
type Props = {
    logo?: string;
}
const Faq: React.FC<Props> = () => {
    const items: {
        title: ReactNode;
        content: ReactNode;
        key: string;
    }[] = [
            {
                title: "چگونه با تخفیف‌های همیشگی هتل رزرو کنیم؟",
                content: "چگونه با تخفیف‌های همیشگی هتل رزرو کنیم؟",
                key: "a"
            },
            {
                title: "مزایای رزرو آنلاین هتل از هتل بان چیست؟",
                content: <ul className="list-disc list-inside">
                    <li>
                        رزرو هتل از سفرانه ارزان‌تر از رزرو مستقیم از خود هتل است.
                    </li>
                    <li>
                        رزرو هتل در سفرانه راحت و سریع است.
                    </li>
                    <li>
                        فرایند رزرو آنلاین هتل در سفرانه بدون هیچ‌گونه صرف وقت و هزینه‌های جانبی انجام می‌شود.
                    </li>
                    <li>
                        در سفرانه امکان رزرو هتل های تمام شهرهای ایران را دارید.
                    </li>
                    <li>
                        در سفرانه امکان جست و جوی هتل براساس موقعیت مکانی روی نقشه و ستاره‌های هتل را دارید.
                    </li>
                    <li>
                        در قسمت جستجوی هتل می‌توانید هتل را بر اساس کمترین و یا بیشترین قیمت، امتیاز کاربران و بیشترین تخفیف دسته بندی کنید.
                    </li>
                </ul>,
                key: "b"
            },
            {
                title: "مزایای رزرو آنلاین هتل از هتل بان چیست؟",
                content: "مزایای رزرو آنلاین هتل از هتل بان چیست؟",
                key: "c"
            },
            {
                title: "رزرو هتل با بیشترین تخفیف در هتل بان",
                content: "رزرو هتل با بیشترین تخفیف در هتل بان",
                key: "d"
            }
        ];

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-14" >
            {items.map((item, index) => (
                <Accordion
                    key={item.key}
                    title={item.title}
                    content={<div className="text-sm">{item.content}</div>}
                    type={3}
                    WrapperClassName={index ? "border-b border-neutral-200" : "border-t border-b border-neutral-200"}
                />
            ))}

        </section>
    )
}

export default Faq;