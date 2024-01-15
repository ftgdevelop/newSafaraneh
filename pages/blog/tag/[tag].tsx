import { GetTags, GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/BlogTag/Title";
import NavbarBlog from "@/modules/blogs/components/BlogHome/NavbarBlog";
import Main from "@/modules/blogs/components/BlogTag/Main";
import { NextPage } from "next";
import { createContext } from "react";


export const TagData = createContext<any | null>(null)
const Tag: NextPage<any> = ({ TagBlogs, TagName, categories_name, recentBlogs }) => {
  
    
    return (
        <div className="bg-white">
            <TagData.Provider value={[TagBlogs,recentBlogs,categories_name]}>
                <NavbarBlog />
                <Title title={TagName?.name} />
                <Main />
            </TagData.Provider>
        </div>
    )
}


export default Tag;


export async function getServerSideProps(contex: any) {
    let tag = contex.query.tag;

    let TagName : any = await GetTagName(+tag)
    let TagBlogs: any = await GetTags(+tag)
    let categories_name: any = await GetCategories()
    let recentBlogs: any = await getBlogs(3)
    
    return ({
        props: {
            TagName: TagName?.data || null,
            TagBlogs: TagBlogs?.data || null,
            recentBlogs: recentBlogs?.data || null,
            categories_name: categories_name?.data || null
        }
    })
}