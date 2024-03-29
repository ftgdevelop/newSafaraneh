import { NextPage } from "next";

const Title: NextPage<any> = ({data , searchValue}) => {
    return (
        <div>
        <div className="text-center p-16 max-sm:pb-1">
            <h2 className="text-4xl p-4 font-bold">{data}</h2>
            <p>{searchValue ? searchValue : 'حرفه ای ترین شبکه معرفی هتل های ایران' }</p>
        </div>
        </div>
    )
}

export default Title;