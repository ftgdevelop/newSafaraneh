import Link from "next/link";

const Cip: React.FC = () => {

    return (
        <section className="max-w-container m-auto px-5 max-xl:p-5 mb-5 sm:mb-10" >

            <h2 className="flex gap-2 font-semibold text-md md:text-2xl mb-2 h-10">
                <span
                    className="block w-3 h-full bg-[#402594] rounded-br-xl rounded-tl-xl"
                />
                <span className="flex items-center px-3 bg-[#ece9f2] rounded-br-xl rounded-tl-xl text-[#402594]">
                    تشریفات فرودگاهی
                </span>
            </h2>
            <p className="mb-8 pr-6"> تجربه‌ای راحت و بی‌دغدغه از ورود تا خروج </p>


            <div className="hotelban-home-cip-bg bg-cover text-shadow bg-right p-10 md:py-20 text-center text-white flex flex-col gap-4 rounded-2xl items-center">

                <h3 className="text-lg xl:text-xl" > تشریفات فرودگاهی داخلی </h3>

                <p className="text-xs lg:text-sm">
                    پذیرایی، ترانسفر ویژه، عبور سریع از گیت‌ها و استراحت در سالن VIP، سفری راحت و بی‌استرس
                </p>

                <Link
                    href={"/cip-home"}
                    className="bg-indigo-800 text-white rounded-lg px-5 py-1 "
                >
                    رزرو آنلاین
                </Link>
            </div>

        </section>
    )
}

export default Cip;