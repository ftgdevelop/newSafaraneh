import axios from 'axios';

import { Header, ServerAddress, Hotel, Cms } from "../../../enum/url";
import { DomesticHotelPrereserveParams } from '../types/hotel';

export const getDomesticHotelSummaryDetailById = async (id: number, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetHotelSummaryDetailById}?Id=${id}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getDomesticHotelDetailsByUrl = async (url: string, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_WP}${Hotel.GetDomesticHotelDetails}?url=${url}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        console.log('LOG 1 - API Response:', response.data)
        return response
    } catch (error:any) {
        console.error('LOG 2 - Error fetching data:', error.message)
        return error
    }
}

export const domesticHotelGetReviews = async (params : {pageId: number, token: string}, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.CMS}${Hotel.getReviewsByPageId}?PageId=${params.pageId}&MaxResultCount=100`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                    Authorization: `Bearer ${params.token}`,
                    TenantId: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const likeComment = async (commentId :number , token:string, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.CMS}${Hotel.likeCommentById}`,
            {id:commentId},
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const disLikeComment = async (commentId :number , token:string, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.CMS}${Hotel.dislikeCommentById}`,
            {id:commentId},
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const SearchAccomodation = async (parameters: {url: string; EntityId?: string}, acceptLanguage: string = 'fa-IR') => {
    try {
        
        const paramsArray :string[] = [];
        if(parameters.EntityId){
            paramsArray.push(`EntityId=${parameters.EntityId}`);
        }

        if(parameters.url){
            paramsArray.push(`Url=${parameters.url}`);
        }

        const requestUrl = ServerAddress.Type! + ServerAddress.Hotel_Data! + Hotel.SearchAccomodations+ "?" + paramsArray.join("&") ;

        let response = await axios.get(
            requestUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const AvailabilityByHotelId = async (params: {
    ids: number[];
    checkin: string;
    checkout: string;
    userToken?: string;

}, acceptLanguage: string = 'fa-IR') => {
    try {

        const AuthenticatedHeader: any = {
            ...Header,
            "Accept-Language": acceptLanguage,
            Currency: "IRR",
            TenantId: process.env.PROJECT_SERVER_TENANTID,
            Apikey: process.env.PROJECT_SERVER_APIKEY
        }

        if(params.userToken){
            AuthenticatedHeader.Authorization = `Bearer ${params.userToken}`;
        }


        const response = await axios({
            method: "post",
            data: {
                hotelIds: params.ids,
                checkIn: params.checkin,
                checkOut: params.checkout
            },
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.AvailabilityByHotelId}`,
            headers: AuthenticatedHeader
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const getRates = async (ids: number[], acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "post",
            data: {
                HotelIds: ids,
            },
            url: `${ServerAddress.Type}api.safaraneh.com${Hotel.getRates}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                Currency: "IRR",
                Apikey: process.env.PROJECT_SERVER_APIKEY
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}


export const getEntityNameByLocation = async (cityId: number, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetEntityNameByLocation}?id=${cityId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage
                },
            },
        )
        return response
    } catch (error) {
        return error
    }

}

export const GetRooms = async (params:{id:number,checkin:string,checkout:string, MetaSearchKey?: string; MetaSearchName?: string; userToken?: string;} , acceptLanguage: string = 'fa-IR') => {

    let fetchUrl = `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.GetRooms}?Id=${params.id}&CheckIn=${params.checkin}&CheckOut=${params.checkout}`;

    if(params.MetaSearchKey && params.MetaSearchName){
        fetchUrl += `&MetaSearchKey=${params.MetaSearchKey}&MetaSearchName=${params.MetaSearchName}`
    }

    const AuthenticatedHeader: any = {
        'Content-Type': 'application/json',
        apikey: process.env.PROJECT_SERVER_APIKEY,
        'Accept-Language': acceptLanguage,
        Currency: "IRR",                  
        TenantId: process.env.PROJECT_SERVER_TENANTID 
    }
    if(params.userToken){
        AuthenticatedHeader.Authorization = `Bearer ${params.userToken}`;
    }

    try {
        let response = await axios.get(
            fetchUrl,
            {
                headers: AuthenticatedHeader
            }
        )
        return response
    } catch (error) {
        return error
    }
}

export const createComment = async (param: any, acceptLanguage: string = 'fa-IR') => {
    
    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.CMS}${Cms.CreateComment}`,
            param,
            {
                headers: {
                    ...Header,
                    "Accept-Language": acceptLanguage,
                    // apikey: "68703d73-c92c-4105-9f71-9f718aaad2cc"
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    TenantId: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const domesticHotelValidateRoom = async (param: {
    bookingToken: string;
    userToken?: string;
    checkin: string;
    checkout: string;
    count: number;
    MetaSearchName?: string | null;
    MetaSearchKey?: string | null;
}, acceptLanguage: string = 'fa-IR') => {

    // const token = localStorage.getItem('Token');

    try {
        const AuthenticatedHeader: any = {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            TenantId: process.env.PROJECT_SERVER_TENANTID,
            // Authorization: `Bearer ${token}`,
            apikey: process.env.PROJECT_SERVER_APIKEY,
            'Accept-Language': acceptLanguage,
            Currency: 'IRR'
        }

        if(param.userToken){
            AuthenticatedHeader.Authorization = `Bearer ${param.userToken}`;
        }

        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.ValidateRoom}`,
            param,
            {
                headers: AuthenticatedHeader
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const domesticHotelGetValidate = async (params: {key: string, acceptLanguage?: string, userToken?: string}) => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.GetValidate}?Id=${params.key}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': params.acceptLanguage || "fa-IR",
                    Currency: "IRR",
                    Authorization : params.userToken ? `Bearer ${params.userToken}` :  undefined
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const domesticHotelPreReserve = async (param: DomesticHotelPrereserveParams, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.PreReserve}`,
            param,
            {
                headers: {
                    accept: 'text/plain',
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                    TenantId: process.env.PROJECT_SERVER_TENANTID,
                    Authorization: param.userToken ? `Bearer ${param.userToken}` : undefined,
                    Currency: 'IRR'
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}


export const domesticHotelGetReserveById = async (params: { reserveId: string; userName: string; token?: string; }, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.GetReserveById}?ReserveId=${params.reserveId}&Username=${params.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                    Currency: "IRR",
                    Authorization : params.token? `Bearer ${params.token}`: undefined
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const DomesticHotelConfirm = async (param: { reserveId: string, username: string, token?: string }, acceptLanguage: string = 'fa-IR') => {

    try {
        
        const AuthenticatedHeader: any = {
            ...Header,
            'Accept-Language': acceptLanguage,
            TenantId: process.env.PROJECT_SERVER_TENANTID,
            Currency: 'IRR'
        }

        if(param.token){
            AuthenticatedHeader.Authorization = `Bearer ${param.token}`;
        }

        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.Confirm}`,
            param,
            {
                headers: {
                    AuthenticatedHeader
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}
