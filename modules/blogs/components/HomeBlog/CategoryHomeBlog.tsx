import { NextPage } from "next";
import Image from "next/image";
import safargone from '../../utils/safargone.jpg'
import irangard from '../../utils/irangard.jpg';
import hotel from '../../utils/hotel-1.jpg';
import wordgard from '../../utils/wordgard.jpg';
import fly from '../../utils/fly.jpg';
import Link from "next/link";
import { CategoriesNameType, HomeCategoryItemType } from "../../types/blog";

interface Props  {
    data?: HomeCategoryItemType[],
    data2?: HomeCategoryItemType[],
    CategoriesData?: CategoriesNameType[]
}

const CategoryBlog: NextPage<Props> = ({ data, data2, CategoriesData }) => {
    console.log(CategoriesData);
    
    return (
        <div className="max-w-screen-xl m-auto p-10 max-lg:p-5 mt-10" >
            <p className="text-3xl">دسته بندی های محبوب</p>

            <div className="grid gap-5 grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:grid-rows-5 mt-14 text-xl text-white text-center">

                <section className="grid gap-2 grid-cols-2 col-span-2 max-sm:grid-cols-1">
                {
                    data && CategoriesData &&
                        data.map(category =>
                    <div className="w-full h-fit rounded-md overflow-hidden">
                    <Link href={`/blog/category/${CategoriesData.find(item => item.name == category.title.rendered)?.id}`}>
                        <Image src={category.images.large} alt={category.title.rendered} width={600} height={590} />
                        <p className="relative bottom-10 h-0">{category.title.rendered}</p>
                    </Link>
                    </div>
                        )    
                }
                </section>
                
                <section className="col-span-2">
                {
                    data2 && CategoriesData &&
                    <div className="w-full h-fit rounded-md overflow-hidden">
                    <Link href={`/blog/category/${CategoriesData?.find(item => item.name == data2[0].title.rendered)?.id}`}>
                        <Image src={data2[0].images.large} alt={data2[0].title.rendered} width={600} height={590} />
                        <p className="relative bottom-10 h-0">{data2[0].title.rendered}</p>
                    </Link>
                    </div>
                }
                </section>    
        </div>
        </div>
    )
}

export default CategoryBlog;