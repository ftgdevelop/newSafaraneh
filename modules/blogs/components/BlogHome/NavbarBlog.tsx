import { NextPage } from "next";
import Link from "next/link";

const NavbarBlog: NextPage<any> = () => {
    
    return (
        <div className="w-full max-w-screen-xl ml-auto mr-auto text-xs">
            <Link href='/' className="text-black mr-14 ltr:ml-14">
                Home
            </Link>/
            <Link href='/blog' className="text-black mr-1 ltr:ml-14">
                بلاگ
            </Link>
        </div>
    )
}

export default NavbarBlog;