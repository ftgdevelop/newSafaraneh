import { GetBlogPostDetails, GetCategories, getBlogs } from "@/modules/blogs/actions";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContentPost from "@/modules/blogs/components/BlogPostDetail/PostContent";
import TitlePost from "@/modules/blogs/components/BlogPostDetail/PostTitle";
import RelatedPost from "@/modules/blogs/components/BlogPostDetail/PostRelatedPost";
import DetailBlogAcordion from "@/modules/blogs/components/BlogPostDetail/PostFaq";
import GetComment from "@/modules/blogs/components/BlogPostDetail/PostGetComment";
import PostComment from "@/modules/blogs/components/BlogPostDetail/PostCommentAdd";
import { useEffect, useState } from "react";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Head from "next/head";


const DetailBlog: NextPage<any> = ({ BlogPost, CategoriesName, recentBlogs }:
    {BlogPost: BlogItemType[], CategoriesName: CategoriesNameType[], recentBlogs:BlogItemType[]}) => {

    const [Related, setRelatedPost] = useState<any>('');
    useEffect(() => {
        const getRelatedPost = async () => {
            let getRelatedPost : any = await getBlogs({ page: 1, category: BlogPost?.[0]?.categories?.[0],per_page:4 })
            setRelatedPost(getRelatedPost.data)
            
        }
        getRelatedPost()
    }, [])
    //data={BlogPost?.[0].title?.rendered} page="بلاگ" category={[BlogPost?.[0].categories_names[0], BlogPost?.[0].categories[0]]} />
    const category: string = BlogPost?.[0]?.categories_names[0] || ""
<<<<<<< HEAD
    const CategoryId : string = BlogPost?.[0].categories[0].toString() || ""
    const PostTitle : string = BlogPost?.[0].title?.rendered || ""
=======
    const CategoryId : string = BlogPost?.[0]?.categories[0].toString() || ""
    const PostTitle : string = BlogPost?.[0]?.title?.rendered || ""
>>>>>>> 686dce2d92a2086d3461e617c1b50701d74ed22e
    return (
        <div className="bg-white">
            <Head>
                <title>{PostTitle}</title>
            </Head>
            <div className="max-w-container m-auto">
                <div className="pr-5 pl-5 max-sm:p-4">
                    <BreadCrumpt items={[{ label: "بلاگ", link: "/blog" }, { label: category, link: `category/${CategoryId}` }, { label: PostTitle }]} /> 
                </div>
                <TitlePost BlogPost={BlogPost} />
                    <ContentPost content={BlogPost?.[0]} recentBlogs={recentBlogs?.slice(0,3)} CategoriesNames={CategoriesName} />
                <hr className="m-3 mt-10"/>
                <div className="p-5 max-sm:p-3 mt-10"> 
                    <RelatedPost Posts={Related} Blog={BlogPost} />
                    <DetailBlogAcordion blog={BlogPost?.[0]} />
                    <GetComment />
                    <PostComment postId={BlogPost?.[0]?.id} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {

    const [BlogPost, recentBlogs, CategoriesName] = await Promise.all<any>([
        GetBlogPostDetails(context.query.DetailBlog),
        getBlogs({page:1, per_page:10}),
        GetCategories()
    ]) 
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                BlogPost: BlogPost?.data || null,
                recentBlogs: recentBlogs?.data || null,
                CategoriesName: CategoriesName?.data || null,
            }
        }
    )
}


export default DetailBlog;