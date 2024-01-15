import { NextPage } from "next";
import Image from "next/image";

const RecentBlogSidebar: NextPage<any> = ({data}) => {
    return (
        <div className="mt-3 p-1">
            <div className="flex justify-between">
                <p className="text-xs ml-2">{data?.title.rendered}</p>
                <Image src={data?.images.medium}
                width={100} height={40} alt='pic' className="rounded-md object-cover w-18 h-18"/>
            </div>
        </div>
    )
}

export default RecentBlogSidebar