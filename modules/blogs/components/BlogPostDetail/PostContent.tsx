import { NextPage } from "next";
import parse from 'html-react-parser';
import Link from "next/link";
import Sidebar from "../template/Sidebar";
import styles from './Stylepostcontent.module.css';

const ContentPost: NextPage<any> = ({ content, recentBlogs, CategoriesNames }) => {
    
    return (
        <div className="grid grid-cols-8 gap-8 mt-5 p-5 max-sm:p-3 max-lg:grid-cols-1">
            <div className="text-sm leading-8 col-span-6">
                <div className={styles.content} onContextMenu={(e) => e.preventDefault()}>
                    {content && parse(content?.content.rendered)}
                </div>
            <div className="flex flex-wrap mt-10 gap-3">
                <p>تگ ها:</p>
                {
                    content &&
                    content.tags_names?.map((tag: any, index: any) =>
                        <Link href={`/blog/tag/${content.tags[index]}`}
                            className="hover:text-blue-500 duration-200" key={tag}> #{tag}
                        </Link>)
                }
            </div>
            </div>
            <div className="col-span-2 max-lg:col-span-6 w-full mt-5 ">
                <Sidebar recentBlogs={recentBlogs?.slice(0,3)} CategoriesNames={CategoriesNames} NotSticky={true} />
            </div>    
        </div>
    )
}

export default ContentPost;