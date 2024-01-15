import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBox: NextPage<any> = () => {
    const [search, setsearch] = useState<string>('')

    return (
        <div className="p-16 max-w-screen-xl m-auto flex">
            <input type="text" placeholder="...جستوجوی مطلب" className="p-2 w-full rounded focus:outline-none focus:ring-1" value={search} onChange={e => setsearch(e.target.value)}
            style={{ border: 'solid 1px rgba(0,0,0,0.1)' }} />
            <Link href={search.length ? `/blog/blog-search/${search}` : `${useRouter().asPath}`}><button type="submit" className="bg-blue-400 p-2 rounded-md mr-2">Search</button></Link>
        </div>
    )
}

export default SearchBox;