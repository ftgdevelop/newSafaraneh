import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const NewBlog: NextPage<any> = () => {
    return (
        <div className="p-16 max-xl:p-4 max-w-screen-xl m-auto">
            <p className="text-2xl">جدیدترین مطالب</p>

            <div className="grid grid-cols-3 gap-2 mt-16 max-sm:grid-cols-1">
                <div>
                    <Link href='/blog'>
                        <Image src='https://panel.safaraneh.com/wp-content/uploads/2024/01/%D8%B1%D8%B2%D8%B1%D9%88-%D8%B3%D8%A7%D9%84%D9%86-%D9%87%D8%AA%D9%84-%D8%AF%D8%B1-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%87%D9%85%D8%A7%DB%8C%D8%B4.jpg'
                        alt="pic" height={200} width={600} className="object-fit rounded-md max-sm:mr-1" />
                    </Link>
                </div>

                <div className="w-full h-58 col-span-2 rounded-md p-5" style={{border:'solid 1px rgba(0,0,0,0.1)'}}>
                    <Link href='/blog' className="text-red-600 block hover:text-red-400 translation-all duration-300">معرفی هتل</Link>
                    <Link href='/blog' className="font-bold text-lg p-2 hover:text-blue-900 block translation-all duration-300">رزرو سالن هتل اصفهان برای همایش |رزرو همراه با تخفیف</Link>
                    <p className="text-xs text-gray-400">اصفهان با عنوان نصف جهانیکی از مهمترین شهرهای تاریخی کشور است که سومین شهر پرجمعیت و کلان‌شهر کشور به‌شمار می‌رود.این شهر با آثار تاریخی و باستانی
                        فراوانی که دارد همواره یکی از پربازدیدترین نقاط کشور محسوب می‌شود. علاوه بر بازدید و جذب گردشگر بسیار بالا در این منطقه همواره همایش‌ها و مراسم‌های بسیار ...</p>
                    
                    <div className="flex justify-between text-xs mt-4">
                        <div className="flex w-52 justify-between">
                            <p>17 دی 1402</p>
                            <p>.</p>
                            <p>زمان خواندن 4دقیقه</p>
                        </div>
                        <Link href='/blog'>ادامه مطلب</Link>
                    </div>
                </div>
            </div>

            <div className="w-full rounded text-center p-4 mt-10 hover:bg-gray-100 translation-all duration-300" style={{border:'solid 1px rgba(0,0,0,0.1)'}}>
                <p>مطالب بیشتر</p>
            </div>
        </div>
    )
}

export default NewBlog;