import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Blog: NextPage<any> = () => {
    return (
        <>
            <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
                <div>
                    <Link href='/blog'>
                        <Image src='https://panel.safaraneh.com/wp-content/uploads/2024/01/%D8%B1%D8%B2%D8%B1%D9%88-%D8%B3%D8%A7%D9%84%D9%86-%D9%87%D8%AA%D9%84-%D8%AF%D8%B1-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%87%D9%85%D8%A7%DB%8C%D8%B4.jpg'
                        alt="pic" height={200} width={600} className="object-fit rounded-md max-sm:mr-1" />
                    </Link>
                </div>

                <div className="w-full col-span-2 rounded-md p-5" style={{border:'solid 1px rgba(0,0,0,0.1)'}}>
                    <Link href='/blog' className="text-red-600 block hover:text-red-400 translation-all duration-300">معرفی هتل</Link>
                    <Link href='/blog' className="font-bold text-lg p-2 hover:text-blue-900 block translation-all duration-300">رزرو سالن هتل اصفهان برای همایش |رزرو همراه با تخفیف</Link>
                    <div className="flex justify-between text-xs mt-12 max-lg:mt-2">
                        <div className="flex w-52 justify-between">
                            <p>17 دی 1402</p>
                            <p>.</p>
                            <p>زمان خواندن 4دقیقه</p>
                        </div>
                        <Link href='/blog'>ادامه مطلب</Link>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Blog;