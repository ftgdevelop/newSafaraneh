import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { BlogItemType } from "@/modules/blogs/types/blog";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";

type Props = {
    blog: BlogItemType;
    hideExcerpt?: boolean;
}

const BlogListItem: React.FC<Props> = props => {

    const { blog } = props;

    if (!blog) {
        return "nothing"
    }

    return (

        <div key={blog.title.rendered}>
            <div className="grid grid-cols-3 gap-5 mt-6 max-sm:grid-cols-1">

                <Link href={`blog/${blog.slug}`}>
                    <Image src={blog.acf?.image_url_bp || blog.images?.large || "/images/no-image.jpg"} onContextMenu={(e) => e.preventDefault()}
                        alt={blog.title?.rendered} height={100} width={300} className="rounded-md max-sm:mr-2 w-full h-60 object-cover" />
                </Link>

                <div className="w-full col-span-2 rounded p-5 border-gray-200 border-2 max-sm:border-0 max-sm:p-2 max-sm:pt-0 max-sm:mb-6">
                    {!!blog.categories_names?.length && <Link href={`/blog/category/${blog.categories[0]}`} className="pr-2 max-sm:text-xs text-red-600 inline-block hover:text-red-400 duration-300">
                        {blog.categories_names[0]}
                    </Link>}
                    <Link href={`/blog/${blog.slug}`} className="leading-9 font-bold text-lg max-sm:text-base p-2 pt-1 hover:text-blue-900 block duration-300">
                        {blog.title.rendered}
                    </Link>
                    {!props.hideExcerpt && blog.excerpt?.rendered && <div className="text-xs max-md:text-3xs text-gray-500 pr-2 max-sm:mt-1">{parse(blog.excerpt.rendered)} </div>}
                    <div className="flex justify-between text-xs mt-4">
                        <div className="flex justify-between text-gray-400 pr-2 space-x-5 max-sm:text-2xs">
                            <p>{blog.date}</p>
                            <span></span>
                            <p>{blog.acf.time_read}</p>
                        </div>
                        <Link href={`blog/${blog.slug}`} className="flex ml-4 font-bold text-sm hover:text-blue-700 duraction-300 max-sm:hidden">
                            <p>ادامه مطلب</p>
                            <ArrowLeft
                                className="w-7 h-fit mr-2 bg-gray-200 rounded-2xl p-1 ltr:hidden hover:fill-white hover:bg-blue-600 duration-300" />
                            <ArrowRight
                                className="w-7 h-fit mr-2 bg-gray-200 rounded-2xl p-1 rtl:hidden hover:fill-white hover:bg-blue-500 duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogListItem;