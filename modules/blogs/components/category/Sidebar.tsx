import { NextPage } from "next";
import Image from "next/image";

const Sidebar: NextPage<any> = () => {
    return (
        <div>
            <div>
                <p className="text-white p-2 rounded-xl bg-blue-900 inline text-xs">دسته بندی</p>
            </div>
            <div>
                <ul className="divide-y p-4">
                    <li className="p-2">ایرانگردی</li>
                    <li className="p-2">پرواز</li>
                    <li className="p-2">جهانگردی</li>
                    <li className="p-2">سفرگونه</li>
                    <li className="p-2">معرفی هتل</li>
                </ul>
            </div>


            <div className="p-3">
                <div>
                    <p className="p-2 text-white rounded-xl bg-blue-900 inline text-xs">جدیدترین مطالب</p>
                </div>
            <div >
            <div className="flex mt-10 justify-between">
                <p className="text-xs">رزرو هتل در اصفهان برای همایش |رزرو همراه با تخفیف</p>
                <Image src='https://panel.safaraneh.com/wp-content/uploads/2024/01/%D8%B1%D8%B2%D8%B1%D9%88-%D8%B3%D8%A7%D9%84%D9%86-%D9%87%D8%AA%D9%84-%D8%AF%D8%B1-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%87%D9%85%D8%A7%DB%8C%D8%B4.jpg'
                width={100} height={70} alt='pic' className="rounded-md mr-1"/>
            </div>
            <div className="flex mt-10 justify-between">
                <p className="text-xs">رزرو هتل در اصفهان برای همایش |رزرو همراه با تخفیف</p>
                <Image src='https://panel.safaraneh.com/wp-content/uploads/2024/01/%D8%B1%D8%B2%D8%B1%D9%88-%D8%B3%D8%A7%D9%84%D9%86-%D9%87%D8%AA%D9%84-%D8%AF%D8%B1-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%87%D9%85%D8%A7%DB%8C%D8%B4.jpg'
                width={100} height={70} alt='pic' className="rounded-md mr-1"/>
            </div>
            </div>    
            </div>
            

            <div className="p-3 mt-10">
                <div>
                    <p className="text-xs bg-blue-900 rounded-xl inline text-white p-2">پرطرفدارترین هتل های ایران</p>
                </div>
                <div className="mt-10">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={100} width={300} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;