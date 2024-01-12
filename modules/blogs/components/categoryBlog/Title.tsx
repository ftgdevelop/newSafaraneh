import { NextPage } from "next";
import { useRouter } from "next/router";
import { BlogItemType } from "../../types/blog";
import { useContext } from "react";
import { AllBlogs } from "@/pages/blog/category/[categoriItem]";


    
const Title: NextPage = () => {
    const data : BlogItemType[] = useContext(AllBlogs)[0]

    //same categoryname & query
    const PageCategory : any = useRouter().query.categoriItem
    let s = data?.find(item => item.categories[0] == +PageCategory)
    
    return (
        <div className="text-center p-16">
            <h2 className="text-4xl p-4 font-bold">{s?.categories_names[0]}</h2>
            <p>حرفه ای ترین شبکه معرفی هتل های ایران</p>
        </div>
    )
}

export default Title;