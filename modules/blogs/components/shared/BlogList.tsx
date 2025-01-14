import BlogListItem from './BlogListItem';
import { BlogItemType } from '@/modules/blogs/types/blog';

type Props = {
    items: BlogItemType[];
    title?: string;
    hideExcerpt?: boolean;
}

const BlogList: React.FC<Props> = props => {

    if (!props.items?.length) {
        return null
    }

    return (
        <>

            {!!props.title && <h2 className='text-xl md:text-2xl font-semibold my-6 md:my-14'> {props.title} </h2>}

            {props.items?.map(blog => (
                <BlogListItem
                    key={blog.id}
                    blog={blog}
                    hideExcerpt={props.hideExcerpt}
                />
            ))}

        </>
    )
}

export default BlogList;