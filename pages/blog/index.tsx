import { NextPage } from "next";
import { getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/NavbarBlog";
import MainBlog from "@/modules/blogs/components/MainBlog";
import CategoryBlog from "@/modules/blogs/components/CategoryBlog";
import SearchBox from "@/modules/blogs/components/SearchBox";
import NewBlog from "@/modules/blogs/components/NewBlog";

const Blog: NextPage<null> = () => {
    return (
        <div className="bg-white">
            <NavbarBlog />
            <MainBlog />
            <div className="bg-slate-100">
            <CategoryBlog />
            </div>
            <SearchBox />
            <NewBlog />
        </div>
    )
}

export default Blog;