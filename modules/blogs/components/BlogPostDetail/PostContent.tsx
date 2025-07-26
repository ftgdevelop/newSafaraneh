import parse from 'html-react-parser';
import Link from "next/link";
import Sidebar from "../template/Sidebar";
import styles from './Stylepostcontent.module.css';

type Props = {
    content:any;
    recentBlogs: {
        link: string;
        title: string;
        imageUrl?:string;
    }[]; 
    CategoriesNames: {
        label: string;
        link: string;
    }[];
    tags?:{label:string, id:number, slug: string}[];
}

const ContentPost: React.FC<Props> = props => {

    const {CategoriesNames, content, recentBlogs} = props;
    
    return (
        <div className="grid grid-cols-8 gap-8 mt-5 p-5 max-sm:p-3 max-lg:grid-cols-1">
            <div className="text-sm leading-8 col-span-6 relative">
                <div className={styles.content} onContextMenu={(e) => e.preventDefault()}>
                    {content && parse(content?.content.rendered)}
                </div>
            <div className="flex flex-wrap mt-10 gap-3">
                <p>تگ ها:</p>
                {props.tags?.map(tag => (
                    <Link 
                        href={`/blog/tag/${tag.id}`}
                        className="hover:text-blue-500 duration-200" 
                        key={tag.id}
                    >
                        #{tag.label}
                    </Link>
                ))}
            </div>
            </div>
            <div className="col-span-2 max-lg:col-span-6 w-full mt-5 ">
                <Sidebar recentBlogs={recentBlogs?.slice(0,3)} categories={CategoriesNames} NotSticky={true} />
            </div>    
        </div>
    )
}

export default ContentPost;