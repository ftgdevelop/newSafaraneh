import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { CategoriesNameType, HomeCategoryItemType } from "../../types/blog";

interface Props {
    data?: HomeCategoryItemType[],
    data2?: HomeCategoryItemType[],
    CategoriesData?: CategoriesNameType[]
}

const CategoryBlog: NextPage<Props> = ({ data, data2, CategoriesData }) => {

    const content = CategoriesData ? data?.map(
        (category, index) => {

            let gridClass: string;

            switch (index) {
                case 2:
                    gridClass = "md:col-start-1 md:row-start-2";
                    break;
                case 3:
                    gridClass = "md:col-start-2 md:row-start-2";
                    break;

                default:
                    gridClass = ""
            }

            return (
                <Link
                    className={`relative ${gridClass}`}
                    href={`/blog/category/${CategoriesData.find(item => item.name == category.title.rendered)?.id}`}
                    key={category.title.rendered}
                >
                    <Image className="rounded-md w-full h-full object-cover max-sm:h-64"
                        src={category.images.large} alt={category.title.rendered} width={300} height={200} priority={!index} />
                    <div
                        className="absolute bottom-0 bg-gradient-to-t from-black/80 w-full left-0 text-white
                        text-center px-2 py-8 text-lg md:text-2xl rounded-b-md">
                        {category.title.rendered}
                    </div>
                </Link>
            )
        }
    ) : null;

    return (
        <div className="max-w-container m-auto max-xl:p-5" >
            <p className="text-3xl mb-10">دسته بندی های محبوب</p>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">

                { content }



                {
                    data2 && CategoriesData &&
                    <Link
                        className="sm:col-span-2 sm:row-span-2 relative"
                        href={`/blog/category/${CategoriesData?.find(item => item.name == data2[0]?.title?.rendered)?.id}`}
                    >
                            <Image src={data2[0]?.images?.large} alt={data2[0]?.title?.rendered} width={390} height={290}
                                className="w-full h-full rounded-md object-cover max-sm:h-64" />
                            <div className="absolute bottom-0 bg-gradient-to-t from-black/80 w-full left-0 text-white
                            text-center px-2 py-8 text-lg md:text-2xl rounded-b-md">
                            {data2[0]?.title?.rendered}
                        </div>
                    </Link>
                }


            </div>



        </div>
    )
}

export default CategoryBlog;