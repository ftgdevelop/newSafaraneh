import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';
import { BlogItemType } from "@/modules/blogs/types/blog";
import { toPersianDigits } from "@/modules/shared/helpers";

type Props ={
    blog: BlogItemType;
}

const BlogListItem : React.FC<Props> = props => {

    const {blog} = props;

    if (!blog){
        return "nothing"
    }

    return(
        <Link
            href={"/blog/"+ blog.slug}
            prefetch={false}
            className="block bg-stone-100 mb-5 grid sm:grid-cols-3 border border-neutral-200 hover:border-neutral-400"
        >
            {blog.images?.large ? <Image
                src={blog.images.large}
                alt={blog.title.rendered}
                width={400}
                height={232}
                className="w-full h-full object-cover"
            />
            : <span />
            }

            <div className="sm:col-span-2 p-4">

                {!!blog.categories_names[0] && (
                    <span 
                        className="bg-gray-800 text-white text-2xs inline-block px-3 py-1 leading-4 rounded-full mb-1"
                    >
                        {blog.categories_names[0]} 
                    </span> 
                )}
                
                <h3 className="text-lg md:text-2xl font-semibold mb-3" > {blog.title.rendered} </h3>

                <div className="text-sm mb-4 text-neutral-400">
                    {!!blog.excerpt.rendered && parse(blog.excerpt.rendered)}
                </div>

                {!!blog.date && <div className="text-xs"> {toPersianDigits(blog.date)} </div>}
            </div>
            
        </Link>
    )
}

export default BlogListItem;