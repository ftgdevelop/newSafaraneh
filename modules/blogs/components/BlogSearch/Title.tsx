import { NextPage } from "next";
import { useRouter } from "next/router";

const Title: NextPage = () => {
    return (
        <div>
        <div className="text-center p-16">
            <h2 className="text-4xl p-4 font-bold">جستجوی</h2>
            <p>{useRouter().query.search}</p>
        </div>
        </div>
    )
}

export default Title;