import { NextPage } from "next";
import Blog from "./BlogItem";
import Sidebar from "./Sidebar";

const Main: NextPage<any> = () => {
    return (
        <div className="grid grid-cols-8 gap-3 max-w-screen-xl m-auto pl-10 pr-10 max-lg:grid-cols-1">
            <div className="col-span-6">
                <Blog/>
            </div>
            <div className="col-span-2 w-full">
                <Sidebar />
            </div>
        </div>
    )
}

export default Main;