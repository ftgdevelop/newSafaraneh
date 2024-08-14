import Button from "@/modules/shared/components/ui/Button"
import Image from "next/image"

const LargeBanner = () => {
    return (
        <section
            className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-10"
        >
            <div className="relative">
                <Image
                    src="/images/home/theme2/home-banner.jpg"
                    alt=""
                    width={1300}
                    height={500}
                    className="w-full min-h-72 object-cover rounded-2xl block"
                />

                <div className="bg-white/75 h-full sm:h-auto sm:bg-white flex flex-col gap-5 p-8 sm:p-3 sm:p-8 rounded-2xl absolute top-0 sm:top-1/2 sm:-translate-y-1/2 rtl:right-0 ltr:left-0 sm:rtl:right-10 sm:ltr:left-10 w-full sm:w-96 items-start">
                    <strong className="font-bold text-xl lg:text-3xl">
                        برنامه ریزی آنلاین تور
                    </strong>
                    <p className="text-sm">
                        برای اولین بار در ایران
                        <br/>
                        فقط مسیرت رو بچین، بقیه ش با ما
                    </p>
                    <Button
                        href="/"
                        className="h-12 px-5"
                    >
                        برنامه ریزی کنید
                    </Button>
                </div>
            </div>

        </section>
    )
}

export default LargeBanner;