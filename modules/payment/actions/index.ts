import axios from 'axios';
import { Header, ServerAddress, Payment } from "../../../enum/url";

type DiscountType = "Undefined"| "HotelDomestic"| "FlightDomestic"| "Bus"| "Package"| "Flight"| "Hotel"| "PnrOutside"| "Cip"| "Activity";

export const validateDiscountCode = async (params:{prereserveKey:string, type:DiscountType, discountPromoCode:string}, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "post",
            data: {
                preReserve: params.prereserveKey,
                type: params.type,
                promoCode: params.discountPromoCode,
            },
            url: `${ServerAddress.Type}${ServerAddress.Crm}${Payment.ValidateDiscountCode}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                //Currency: "IRR",
                TenantId: process.env.PROJECT_SERVER_TENANTID,
            }
        });
        return (response)
    } catch (error: any) {
        return error.response
    }
}

export const registerDiscountCode = async (params:{reserveId:string, username:unknown, discountPromoCode:string}, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "post",
            data: {
           reserveId: params.reserveId,
           username: params.username,
           promoCode: params.discountPromoCode,
            },
            url: `${ServerAddress.Type}${ServerAddress.Crm}${Payment.RegisterDiscountCode}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                //Currency: "IRR",
                TenantId: process.env.PROJECT_SERVER_TENANTID,
            }
        });
        return (response)
    } catch (error: any) {
        return error.response
    }
}

export const getReserveBankGateway = async (id:string, acceptLanguage: string = 'fa-IR') => {
    try {
      const res = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetBankGateway}?ReserveId=${id}`,
        {
          headers: {
            ...Header,
            "Accept-Language": acceptLanguage,
            //TenantId: process.env.ABP_TENANT_ID,
          },
        },
      )
      return res
    } catch (error:any) {
      return error.response
    }
  }

  export const makeToken = async (params:{gatewayId: number, callBackUrl: string, reserveId: string}) => {
    try {
      const res = await axios.post(
        `${ServerAddress.Type}${ServerAddress.Payment}${Payment.MakeToken}`,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'text/plain',
            'Accept-Language': 'fa-IR',
            TenantId: process.env.PROJECT_SERVER_TENANTID,
          },
        },
      )
      return res
    } catch (error:any) {
      console.log('error', error)
      return error.response
    }
  }


  export const getUserBalance = async (token:string, currency:string) => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Payment}${Payment.GetBalance}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID,
                    Currency: currency
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
