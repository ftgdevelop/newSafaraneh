import { NextPage } from "next";

const Title: NextPage<any> = ({title}) => {
    return (
        <div>
        <div className="text-center p-16">
                <h2 className="text-4xl p-4 font-bold">{title}</h2>
            <p>حرفه ای ترین شبکه معرفی هتل های ایران</p>
        </div>
        </div>
    )
}

export default Title;