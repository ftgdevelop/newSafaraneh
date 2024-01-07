import { NextPage } from "next";

const SearchBox: NextPage<any> = () => {
    return (
        <div className="p-16 max-w-screen-xl m-auto flex">
                <input type="text" placeholder="...جستوجوی مطلب" className="p-2 w-full rounded" style={{border:'solid 1px rgba(0,0,0,0.1)'}}/>
                <button type="submit" className="bg-blue-400 p-2 rounded-md mr-2">Search</button>
        </div>
    )
}

export default SearchBox;