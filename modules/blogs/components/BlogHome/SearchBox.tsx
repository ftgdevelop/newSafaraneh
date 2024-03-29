import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "@/modules/shared/components/ui/icons";

const SearchBox: NextPage<any> = () => {
    const [search, setsearch] = useState<string>('')

    return (
        <div>
            <form className="mt-18 mb-14 max-w-container m-auto flex max-xl:p-5">
                <input type="text" placeholder="جستجوی مطلب..." className="p-2 w-full rounded focus:outline-none focus:ring-1" value={search} onChange={e => setsearch(e.target.value)}
                    style={{ border: 'solid 1px rgba(0,0,0,0.1)' }}  />
                    <Link href={search.length ? `/blog/blog-search/${search}` : `${useRouter().asPath}`}  className="bg-blue-400 p-1 pr-3 pl-3  rounded-md mr-2">
                    <button type="submit">
                            <Search className="w-6 mt-2"/>
                    </button>    
                </Link>
            </form>
        </div>
    )
}

export default SearchBox;