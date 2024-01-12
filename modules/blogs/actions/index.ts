import axios from 'axios';

import { ServerAddress, Blog } from "../../../enum/url";

export const getBlogs = async (perPage : number) => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getPosts}?per_page=${perPage}`,
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


export const GetBestCategory = async () => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCategories2}`,
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

export const GetBestCategory2 = async () => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCategories1}`,
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

export const GetBlogPostCategory = async (id: number) => {
    try {
        const res = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getCategoriesBlog}${id}&per_page=100`,
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
    } catch (error: any) {
        console.log("error", error);
        return error.response
    }
};

export const GetCategories = async () => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Blog}/wp-json/wp/v2/categories`,
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