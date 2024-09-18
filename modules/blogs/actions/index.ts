import axios from 'axios';

import { ServerAddress, Blog } from "../../../enum/url";

export const getBlogs = async (options: {per_page?:number, page?: number; tags?: number; category?: any; search?: any }) => {

  let url = `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getPosts}`;

  const queries = [];

  if (options.page) {
    queries.push(`page=${options.page}`);
  }

  if (options.category) {
    queries.push(`categories=${options.category}`);
  }

  if (options.tags) {
    queries.push(`tags=${options.tags}`)
  }

  if (options.search) {
    queries.push(`search=${options.search}`)  
  }

  if(options.per_page){
    queries.push(`per_page=${options.per_page}`)  
  }

  let q: string = '';
  if (queries.length) {
    q = queries.join("&");
    q = "?" + q;
  }

    try {
      let response = await axios.get(
          url+q
        )
        return response
    } catch (error) {
        return error
    }

}

export const GetCities = async () => {

    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCities}`,
        {
          headers: {
          },
        }
      );
      return res;
    } catch (error : any) {
      console.log("error", error);
        return error.response;
    }
};

export const GetBestCategoryById = async (id : number) => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getBestCategories}?categories=${id}`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const GetCategories = async () => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCategoeyName}`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const GetTagName = async (id : number) => {
  try {
    const res = await axios.get(
      `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getTagName}${id}`
    );
    return res;
  } catch (error : any) {
    console.log("error", error);
    return error.response
  }
};

export const GetBlogPostDetails = async (slug : any) => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}/wp-json/wp/v2/posts/?slug=${slug}`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error : any) {
      console.log("error", error);
      return error.response
    }
};

export const PostComment = async (param : any) => {
  try {
    const res = await axios.post(
      `${ServerAddress.Type}${ServerAddress.Blog}/wp-json/wp/v2/comments`,
      param,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error : any) {
    console.log("error", error);
    return error.response
  }
};