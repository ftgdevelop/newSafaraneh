import { GetCategories, GetSearchBlogPosts, getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/BlogHome/NavbarBlog";
import Main from "@/modules/blogs/components/BlogSearch/Main";
import Title from "@/modules/blogs/components/BlogSearch/Title";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext } from "react";

export const SearchData = createContext<any | null>(null)
const Search: NextPage<any> = ({ SearchBlog, LastBlogs, categories_name }) => {
    
    return (
        <div className="bg-white">
            <SearchData.Provider value={[SearchBlog, LastBlogs,categories_name]}>
                <NavbarBlog />
                <Title />
                <Main />
            </SearchData.Provider>
        </div>
    )
}

export default Search;


export async function getServerSideProps(contex: any) { 
    const search = contex.query.search;

    let SearchBlog: any = await GetSearchBlogPosts(search);
    let categories_name: any = await GetCategories();
    let recentBlogs: any = await getBlogs(3)

    return ({
        props: {
            categories_name: categories_name?.data || null,
            LastBlogs: recentBlogs?.data || null,
            SearchBlog : SearchBlog?.data || null
        }
    })
    
}