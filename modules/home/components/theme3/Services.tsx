import Image from "next/image";

const Services: React.FC = () => {

    const isShab = process.env.PROJECT === "SHAB";

    const items: {
        imageUrl: string;
        title: string;
        description: string;
    }[] = [
            {
                imageUrl: "/images/home/theme3/gifs/hotel.gif",
                title: "تنوع گسترده هتل‌ها",
                description: "با تنوع گسترده هتل‌ها، می‌توانید متناسب با سلیقه و بودجه خود، از اقامتگاه‌های لوکس و مجلل تا هتل‌های اقتصادی و مقرون‌به‌صرفه را انتخاب کنید."
            },
            {
                imageUrl: "/images/home/theme3/gifs/voucher.gif",
                title: "دریافت وچر آنی",
                description: "دریافت وچر آنی، تجربه‌ای سریع و بدون معطلی برای خرید و خدمات شما. تنها با چند کلیک، وچر خود را بلافاصله دریافت کنید و از خدمات مورد نظر بهره‌مند شوید."
            },
            {
                imageUrl: "/images/home/theme3/gifs/sale.gif",
                title: "پیشنهادهای لحظه‌ای",
                description: "پیشنهادهای لحظه‌ای، تخفیف‌ها و فرصت‌های ویژه که تنها برای مدت محدود در دسترس هستند. فرصت‌های استثنائی برای خرید بهتر و صرفه‌جویی بیشتر!"
            }

        ];

    if (!isShab) {
        items.unshift({
            imageUrl: "/images/home/theme3/gifs/wallet.gif",
            title: "امکان پرداخت قسطی",
            description: "با امکان پرداخت قسطی، می‌توانید بدون نگرانی از هزینه‌های سنگین، خرید کنید و هزینه را به صورت منعطف و در چند قسط بپردازید."
        })
    }

    return (
        <section className="max-w-container m-auto px-5 max-xl:p-5 mb-5 sm:mb-10" >

            <div className={`grid grid-cols-1 ${isShab?"gap-6 sm:grid-cols-3":"sm:grid-cols-2 lg:grid-cols-4 gap-4"}`}>
                {items.map(item => (
                    <div key={item.title}>
                        <Image src={item.imageUrl} alt={item.title} width={100} height={100} className="w-14 h-14 mb-5" />
                        <h3 className="font-semibold text-lg mb-3"> {item.title} </h3>
                        <p className="text-xs"> {item.description} </p>
                    </div>
                ))}

            </div>

        </section>
    )
}

export default Services;