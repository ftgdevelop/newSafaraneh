import { GetBlogPostDetails, GetCategories, GetTagName, getBlogs } from "@/modules/blogs/actions";
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
import NotFound from "@/modules/shared/components/ui/NotFound";
import PostDetail from "@/modules/blogs/components/theme2/PostDetail";


const DetailBlog: NextPage<any> = ({ post, allCategories, recentBlogs, moduleDisabled, tags }:
    {post: BlogItemType, allCategories: CategoriesNameType[], recentBlogs:BlogItemType[], moduleDisabled?: boolean, tags?:{label:string, id:number, slug: string}[]}) => {

    const theme2 = process.env.THEME === "THEME2";

    const [Related, setRelatedPost] = useState<BlogItemType[] | undefined>(undefined);

    useEffect(() => {
        const getRelatedPost = async () => {
            let getRelatedPost : any = await getBlogs({ page: 1, category: post?.categories?.[0],per_page:theme2 ? 6 : 4 })
            setRelatedPost(getRelatedPost.data)
            
        }
        getRelatedPost()
    }, [])

    if (moduleDisabled) {
        return (
            <NotFound />
        )
    }

    //data={post.title?.rendered} page="بلاگ" category={[post.categories_names[0], post?.categories[0]]} />
    const categoryId = post.categories?.[0];
    const categoryName: string = allCategories?.find(cat => cat.id === categoryId)?.name || post?.categories_names?.[0] || "دسته بندی نامشخص";

    const PostTitle : string = post?.title?.rendered || ""


    const postImage = post?.acf?.image_url_bp || post?.images?.large;

    const categories : {
        label: string;
        link: string;
    }[] = allCategories?.map(item => ({
        label: item.name,
        link: `/blog/category/${item.id}`
    }));

    const recentPosts : {
        link: string;
        title: string;
        imageUrl?:string;
    }[] = recentBlogs?.map(b => ({
        link: `/blog/${b.slug}`,
        title: b.title.rendered,
        imageUrl: b.acf?.image_url_bp || b.images?.medium
    }));
    
    if (theme2){

        const tags : {
            link: string;
            label:string;
        }[] = [];

        if (post?.tags?.length && post.tags_names?.length){
            for (let i = 0 ; i< post.tags.length ; i++){
                tags.push({
                    label: post.tags_names[i],
                    link: `/blog/tag/${post.tags[i]}`
                });
            }
        }

        const relatedPosts: undefined | {
            imageUrl?: string;
            link: string;
            title:string;
            date?: string;
            tags: {
                label: string;
                link: string;
            }[]
        }[] = Related?.map( r =>({
            link: `/blog/${r.slug}`,
            title: r.title.rendered,
            date: r.date,
            imageUrl: r.acf?.image_url_bp || r.images?.medium || "",
            tags:[]
        }));

        return(
            <>
                <Head>
                    <title>{PostTitle}</title>
                </Head>
                <PostDetail 
                    title={PostTitle}
                    imageUrl={postImage}
                    imageAlt={PostTitle}
                    tags={tags}
                    content={post.content?.rendered}
                    excerpt={post.excerpt?.rendered}
                    date={post.date}
                    category={{
                        label: post.categories_names[0],
                        link: `/blog/category/${post.categories[0]}`
                    }}
                    time_read={post.time_read}
                    relatedPosts= {relatedPosts}
                    categories={categories}
                    recentPosts={recentPosts}
                />
            </>
        )
    }

    return (
        <div className="bg-white">
            <Head>
                <title>{PostTitle}</title>
            </Head>
            
            <div className="max-w-container m-auto">
                <div className="pr-5 pl-5 max-sm:p-4">
                    <BreadCrumpt items={[{ label: "بلاگ", link: "/blog" }, { label: categoryName , link: `category/${categoryId}` }, { label: PostTitle }]} /> 
                </div>
                <TitlePost BlogPost={post} categoryId={categoryId} categoryName={categoryName} />
                
                <ContentPost tags={tags} content={post} recentBlogs={recentPosts?.slice(0,3)} CategoriesNames={categories} />
                
                <hr className="m-3 mt-10"/>
                <div className="p-5 max-sm:p-3 mt-10"> 
                    {Related && <RelatedPost Posts={Related} Blog={post} />}
                    <DetailBlogAcordion blog={post} />
                    <GetComment />
                    <PostComment postId={post?.id} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {

    if (!process.env.PROJECT_MODULES?.includes("Blog")) {
        return (
            {
                props: {
                    ...await serverSideTranslations(context.locale, ['common']),
                    moduleDisabled: true
                },
            }
        )
    }

    const [BlogPost, recentBlogs, Categories] = await Promise.all<any>([
        GetBlogPostDetails(context.query.DetailBlog),
        getBlogs({page:1, per_page:10}),
        GetCategories()
    ]);

    
    const tags : {
        label: string;
        id: number;
        slug: string;
    }[] = [];

    const tagsIds = BlogPost?.data?.[0]?.tags;

    if(tagsIds?.length){
        for(let i=0 ; i < tagsIds.length ; i++){
            const response: any = await GetTagName(tagsIds[i]);
            if(response?.data){
                tags.push({
                    id:response.data.id,
                    label: response.data.name,
                    slug: response.data.slug
                })
            }
        }
    }


    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                post: BlogPost?.data?.[0] || null,
                recentBlogs: recentBlogs?.data || null,
                allCategories: Categories?.data || null,
                tags : tags || null,
            }
        }
    )
}


export default DetailBlog;