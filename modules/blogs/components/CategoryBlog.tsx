import { NextPage } from "next";
import Image from "next/image";
import safargone from '../utils/safargone.jpg';
import irangard from '../utils/irangard.jpg';
import hotel from '../utils/hotel-1.jpg';
import wordgard from '../utils/wordgard.jpg';
import fly from '../utils/fly.jpg';
import Link from "next/link";


const CategoryBlog: NextPage<any> = () => {
    return (
        <div className="max-w-screen-xl m-auto p-10 max-lg:p-5 mt-10" >
            <p className="text-3xl">دسته بندی های محبوب</p><p>ss</p>

            <div className="grid gap-5 grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 grid-rows-2 max-md:grid-rows-5 mt-14 text-xl text-white text-center">
                <div className="w-full h-fit rounded-md overflow-hidden bg-gradient-to-r from-indigo-500 z-40">
                    <Link href='/blog/category'>
                        <Image src={irangard} alt='pic' width={600} height={550} className="relative -z-10 bg-gradient-to-r from-indigo-500"/>
                        <p className="relative bottom-10 h-0">ایرانگردی</p>
                    </Link>
                </div>
                <div className="w-full h-fit rounded-md overflow-hidden" >
                    <Link href='/blog/category'>
                        <Image src={wordgard} alt='pic' width={600} height={350} className=""/>
                        <p className="relative bottom-10 h-0">ایرانگردی</p>
                    </Link>
                </div>

                <div className="w-full h-fit col-span-2 max-sm:col-span-1 row-span-2 max-sm:row-span-1 rounded-md overflow-hidden max-md:row-start-3 z-0">
                    <Link href='/blog/category'>
                        <Image src={hotel} alt='pic' width={800} height={350} />
                        <p className="relative bottom-10 h-0">ایرانگردی</p>
                    </Link>
                </div>

                <div className="w-full h-fit rounded-md  overflow-hidden" >
                    <Link href='/blog/category'>
                        <Image src={safargone} alt='pic' width={600} height={350}/>
                        <p className="relative bottom-10 h-0 ">ایرانگردی</p>
                    </Link>
                </div>

                <div className="w-full h-fit  rounded-md overflow-hidden" >
                    <Link href='/blog/category'>
                        <Image src={fly} alt='pic' width={600} height={350}/>
                        <p className="relative bottom-10 h-0 ">ایرانگردی</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryBlog;