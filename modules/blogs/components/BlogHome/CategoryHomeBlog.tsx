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
    
    return (
        <div className="max-w-screen-xl m-auto p-10 max-lg:p-5 mt-10" >
            <p className="text-3xl">دسته بندی های محبوب</p>

            <div className="grid gap-5 grid-cols-2 max-md:grid-cols-1 mt-14 text-2xl text-white text-center">

                <section className="grid gap-4 grid-cols-2 max-sm:grid-cols-1">
                {
                    data && CategoriesData &&
                        data.map((category , index) =>
                    <div key={category.title.rendered} className=" rounded-md overflow-hidden relative">
                    <Link href={`/blog/category/${CategoriesData.find(item => item.name == category.title.rendered)?.id}`}>
                        <Image src={category.images.large} alt={category.title.rendered} width={600} height={590} priority={!index} />
                        <div className="absolute bottom-0 bg-gradient-to-t from-black w-full h-1/2">
                            <p className="absolute bottom-5 w-full">{category.title.rendered}</p>
                        </div>
                    </Link>
                    </div>
                        )    
                }
                </section>
                
                <section>
                {
                    data2 && CategoriesData &&
                    <div className="max-md:pr-5 max-sm:p-0 rounded-md overflow-hidden relative">
                    <Link href={`/blog/category/${CategoriesData?.find(item => item.name == data2[0].title.rendered)?.id}`}>
                        <Image src={data2[0].images.large} alt={data2[0].title.rendered} width={600} height={590} />
                            <div className="absolute bottom-0 bg-gradient-to-t from-black w-full h-1/2 text-4xl ">
                                <p className="absolute bottom-5 w-full">{data2[0].title.rendered}</p>
                            </div>
                    </Link>
                    </div>
                }
                </section>
        </div>
        </div>
    )
}

export default CategoryBlog;