import Image from "next/image";
import Button from "./Button";

type Props = {
    code?:number;
}

const NotFound : React.FC<Props> = (props) => {
    return(
        <div className="max-w-container m-auto px-5 max-sm:px-3">
        <div className="flex flex-col items-center justify-center py-10 md:pt-15 md:pb-40 h-screen">
            <Image
                src="/images/passenger.png"
                width={160}
                height={320}
                alt="passenger"
                className="mb-6 max-sm:h-40 max-sm:w-auto"
            />
            
            <div className="font-semibold mb-3 text-lg md:text-2xl" > خطای {props.code || "۴۰۴" } </div>
            <p className="text-neutral-500 mb-8 text-sm">
                ظاهراً در کوچه پس‌کوچه‌های شهر گم شده‌اید، ما شما را به نزدیک‌ترین هتل
                راهنمایی می‌کنیم :)
            </p>
            <div className="inline-flex justify-center flex-wrap gap-5">
                <Button
                className="px-5 h-8 text-sm"
                    href="/"
                    >
                    برو به صفحه اصلی
                </Button>
                
                {!!(process.env.PROJECT_MODULES?.includes("Hotel")) && <Button
                className="px-5 h-8 text-sm"
                    href="/hotel/هتل-پارسیان-آزادی-تهران"
                >
                    برو به نزدیک‌ترین هتل
                </Button>}

                {!!(process.env.PROJECT_MODULES?.includes("Blog")) &&<Button
                className="px-5 h-8 text-sm"
                    href="/blog"
                >
                    برو به یک جای هیجان انگیز
                </Button>}

            </div>
        </div>
    </div>
    )
}

export default NotFound;