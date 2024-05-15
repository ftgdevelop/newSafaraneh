import axios from 'axios';

import { Header,ServerAddress, Hotel , Reserve, Traveler} from "../../../enum/url";
import { ReserveType } from '../types/common';

export const getPageByUrl = async (url: string, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetPageByUrl}?url=${url}&isNewVisitor=true`,
            {
                headers: {
                    ...Header,
                    "Accept-Language": acceptLanguage,
                    "Apikey": process.env.PROJECT_SERVER_APIKEY
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getReserveFromCoordinator = async (params:{reserveId:string, username:string}, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Coordinator}${Reserve.GetReserveFromCoordinator}?Id=${params.reserveId}&Username=${params.username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'text/plain',
                    "Accept-Language": acceptLanguage,                   
                    "TenantId": process.env.PROJECT_SERVER_TENANTID
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getUserAllReserves = async (params:{
    SkipCount?:number;
    MaxResultCount?:number;
    Statue?:string;
    Types?:ReserveType;
    FromReturnTime?: string;
    ToReturnTime?: string;
    Ids?: number;
}, token: string, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Coordinator}${Reserve.GetUserAllReserves}`,
            {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'text/plain',
                    "Accept-Language": acceptLanguage,                   
                    "TenantId": process.env.PROJECT_SERVER_TENANTID,
                    Authorization: `Bearer ${token}`
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}












export const getTravelers = async (token:string, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Traveler}${Traveler.GetAll}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Authorization: `Bearer ${token}`,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}
  
//   export const deleteTraveller = async (id) => {
//     let token = localStorage.getItem("userToken");
//     try {
//       let response = await axios.delete(`${ServerAddress.Type}${ServerAddress.Traveller}${Traveller.Delete}?Id=${id}`,
//         { headers: { Authorization: `Bearer ${token}`, ...Header } }
//       );
//       return response;
//     } catch (error) {
//       return error.response?.data || "Internal Error,Please try again";
//     }
//   };
  
  
  // export const addTravelllller = () => {
  
  //   let token = localStorage.getItem("userToken");
  //   let HeaderAthu = null;
  //   if (token) {
  //     HeaderAthu = { Authorization: `Bearer ${token}`, ...Header };
  //   } else {
  //     HeaderAthu = { ...Header };
  //   }
  
  //   const params = {
  //     "tenantId": 6,
  //     "userId": 20139,
  //     "firstname": "Zahra",
  //     "firstnamePersian": "زهرا",
  //     "lastname": "Mohammadi",
  //     "lastnamePersian": "محمدی",
  //     "gender": false,
  //     "nationalId": "2640006100",
  //     "birthDate": "1982-02-02",
  //     "nationality": "IR",
  //     "email": "zahra1@mohamadi.com",
  //     "passportCountry": "IR",
  //     "passportExpirationDate": "2029-07-17",
  //     "passportNumber": "00500171011",
  //     "phoneNumber": "",
  //     "id": 0
  //   }
  
  //   axios({
  //     method: "post",
  //     url: `https://traveller.itours.ir/api/services/app/Passenger/Create`,
  //     data: { ...params },
  //     headers: HeaderAthu,
  //   })
  //     .then((responsive) => {
  //       debugger;
  //     })
  //     .catch((error) => {
  //     });
  
  // };

