import { NextPage } from "next";

const SidebarSearchBlog: NextPage = () => {
    return (
        <div>
            <div className="mt-3 border-b-4 border-blue-900">
                <p className="inline bg-blue-900 rounded text-white p-2 text-xs">جستجو</p>
            </div>
            <div className="flex mt-5">
            <input type="text" className="p-1 rounded w-full ml-4 outline-none focus:ring-1" placeholder="جستجوی مطلب..." style={{border:'1px solid rgba(0,0,0,0.3)'}}/>
            <button type="submit" className="p-2 bg-blue-300 rounded w-14">S</button>
            </div>    
        </div>
    )
}

export default SidebarSearchBlog;