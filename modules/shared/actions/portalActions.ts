import axios from 'axios';

import { Header,ServerAddress, Hotel } from "../../../enum/url";

export const getPortal = async (acceptLanguage: "fa-IR"|"en-US"|"ar-AE" = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetPortal}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                "Apikey": process.env.PROJECT_PORTAL_APIKEY
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
