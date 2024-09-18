import { useRouter } from "next/router";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import BlogList from "./BlogList";
import { BlogItemType } from "../../types/blog";
import Pagination from "@/modules/shared/components/ui/Pagination";
import Title from "../template/Title";
import Sidebar from "../template/Sidebar";

type Props = {
    hideExcerpt?: boolean;
    posts?: BlogItemType[];
    categories: {
        label: string;
        link: string;
    }[];
    recentPosts?: {
        link: string;
        title: string;
        imageUrl?: string;

    }[];
    pages?: any;
    pageTitle: string;
    pageSubtitle?: string;
    breadcrumptItems?: {
        label: string;
        link?: string;
    }[];
}

const Archive: React.FC<Props> = props => {

    const { categories, recentPosts, posts } = props;

    const router = useRouter();
    const routerQuery: any = useRouter().query;

    return (

        <div className="bg-white">

            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4" >

                {!!props.breadcrumptItems && <BreadCrumpt items={props.breadcrumptItems} />}

                <Title data={props.pageTitle} searchValue={props.pageSubtitle} />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 pb-10">

                    <div className="lg:col-span-3 text-sm">

                        {posts?.length ? (
                            <>
                                <BlogList
                                    items={posts}
                                    hideExcerpt={props.hideExcerpt}
                                />

                                <Pagination
                                    totalItems={props.pages * 10}
                                    onChange={p => {
                                        router.push({ query: { ...routerQuery, page: p } })
                                    }}
                                    wrapperClassName="my-5 justify-center"
                                />

                            </>
                        ) : (
                            <div>
                                مطلبی یافت نشد
                            </div>
                        )}

                    </div>
                    <div>
                        <Sidebar
                            recentBlogs={recentPosts || []}
                            categories={categories}
                            showSearch={useRouter().pathname == "/blog-list" || useRouter().query.search ? true : false}
                        />
                    </div>

                </div>



            </div>

        </div>
    )
}

export default Archive;