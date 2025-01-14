import Link from "next/link";
import { useRouter } from "next/router";

import SearchTheme2 from "./shared/SearchTheme2";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import BlogList from "./shared/BlogList";
import { BlogItemType } from "../../types/blog";
import Pagination from "@/modules/shared/components/ui/Pagination";

type Props = {
    posts?: BlogItemType[];
    categories: {
        label: string;
        link: string;
    }[];
    recentPosts?: {
        link: string;
        title: string;
    }[];
    pages?: any;
    pageTitle: string;
    pageSubtitle?: string;
    breadcrumptItems? : {
        label: string;
        link?: string;
    }[];
}

const Archive: React.FC<Props> = props => {

    const { categories, recentPosts, posts } = props;

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    return (
        <>
            <SearchTheme2 />

            <div className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12" >
                <div className="my-6 md:my-14 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2"> {props.pageTitle} </h2>
                    <p className="text-xs"> {props.pageSubtitle || "حرفه ای ترین شبکه معرفی هتل های ایران"} </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="hidden lg:block">
                        <div className="sticky top-5 pl-5 max-h-screen overflow-auto">

                            {!!categories?.length && <>

                                <h3 className="text-xl mb-4"> دسته بندی مطالب</h3>

                                <div className="mb-8">
                                    {categories?.map(item =>
                                        <div key={item.label} className="border-b border-neutral-200">
                                            <Link
                                                href={item.link}
                                                className="text-xs hover:text-blue-800 py-2 inline-block"
                                            >
                                                {item.label}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>}

                            <h3 className="text-xl mb-4">  جدیدترین مطالب</h3>

                            {recentPosts?.slice(0, 3)?.map(item =>
                                <div key={item.title} className="border-b border-neutral-200">
                                    <Link
                                        href={item.link}
                                        className="text-xs hover:text-blue-800 py-2 inline-block leading-5"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )}

                            <br />

                        </div>
                    </div>

                    <div className="lg:col-span-3 text-sm">
                        {!!props.breadcrumptItems?.length && <BreadCrumpt items={props.breadcrumptItems} />}
                        <br />

                        {posts?.length ? (
                            <>
                                <BlogList
                                    items={posts}
                                />

                                <Pagination 
                                    totalItems={props.pages * 10}
                                    onChange={p => {
                                        router.push({ query: { ...routerQuery, page: p } })
                                    }}
                                    wrapperClassName="my-14"
                                />

                            </>
                        ):(
                            <div>
                                مطلبی یافت نشد
                            </div>
                        )}

                    </div>

                </div>



            </div>

        </>
    )
}

export default Archive;