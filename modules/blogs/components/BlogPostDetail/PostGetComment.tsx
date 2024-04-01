import { NextPage } from "next";

const GetComment: NextPage = () => {
    return (
        <div>
            <h2 className="text-3xl mt-20">نظرات شما</h2>
            <div className="border-1 border-gray-200 rounded-md text-center p-20 mt-5">
                <p>برای این پست نظری ثبت نشده</p>
            </div>
        </div>
    )
}


export default GetComment;