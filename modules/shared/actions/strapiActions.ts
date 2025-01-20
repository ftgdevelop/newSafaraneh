import axios from 'axios';

import { ServerAddress, Strapi } from "../../../enum/url";

const strapiToken = process.env.PROJECT_SERVER_STRAPI_TOKEN;

export const getStrapiPages = async (query: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
               url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Pages}?${query}`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}



export const getStrapiFooter = async (query: string , acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Footer}?${query}`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getStrapiMagazine = async (acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Strapi}${Strapi.Magazine}?populate[Items][populate][Items][populate]=*`,
            headers: {
                "Accept-Language": acceptLanguage,
                Authorization: `bearer ${strapiToken}`
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}