export type TabItem = {
    key: string | number;
    label: React.ReactNode;
    children: React.ReactNode;
    href?:string;
};

export interface PageDataType {
    Id?: number;
    PageName?: string;
    Url?: string;
    PageTitle?: string;
    MetaTags?: {
        Name: string;
        Content: string
    }[];
}

export interface PortalDataType {
    PortalName?: string;
    JavaScript?: string;
    Style?: string;
    CDNPath?: string;
    IsSecureConnection?: boolean;
    Modules: any[],
    Apikeys: {
        IdPortalApi: number;
        PortalId: number;
        ApiName: string;
        ApiKey: string;
        BaseUrl: string;
    }[];
    Phrases:{
        Keyword?: string;
        Value?: string;
        CssClass?: string;
        Url?: string;
        ImageUrl?: string;
        ImageAlt?: string;
        ImageTitle?: string;
    }[];
    MetaTags: {
        Name?: string;
        Content?: string;
    }[],
    EmailServer: unknown
}

export interface UserReserveListItem {
    id: number;
    status: "Undefined" | "Registered" | "Pending" | "Issued" | "Canceled" | "WebServiceCancel" | "PaymentSuccessful" | "WebServiceUnsuccessful" | "PriceChange" | "Unavailable" | "Refunded" | "Voided" | "InProgress" | "PaidBack" | "RefundInProgress" | "Changed" | "OnCredit" | "ContactProvider" | "UnConfirmed" | "ReceivedAdvance" | "ExtraReceiving";
    username?: string;
    type: "Undefined" | "HotelDomestic" | "FlightDomestic" | "Bus" | "Package" | "Flight" | "Hotel" | "PnrOutside" | "Cip" | "Activity";
    creationTime: string;
    salePrice: number;

    // "phoneNumber": "string",
    // "email": "string",
    // "telNumber": "string",
    // "faxNumber": "string",
    // "firstName": "string",
    // "lastName": "string",
    // "gender": true,
    // "userId": 0,
    // "specialRequest": "string",
    // "expireDate": "2024-02-21T07:03:43.802Z",
    // "isChangeStatus": true,
    // "departureDate": "2024-02-21T07:03:43.802Z",
    // "returnDate": "2024-02-21T07:03:43.802Z",
    // "tenantId": 0,
    // "currency": {
    //   "type": "USD",
    //   "name": "string"
    // },
    // "terminal": {
    //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   "name": "string"
    // },
    // "netPrice": 0,
    // "boardPrice": 0,
    // "reference": "string",
    // "promoCodeId": 0,
    // "extensionData": "string",
    // "history": [
    //   {
    //     "status": "Undefined",
    //     "userId": 0,
    //     "creationTime": "2024-02-21T07:03:43.802Z",
    //     "orderId": 0,
    //     "description": "string"
    //   }
    // ]
}

export type ReserveType = "Undefined"| "HotelDomestic"| "FlightDomestic"| "Bus"| "Package"| "Flight"| "Hotel"| "PnrOutside"| "Cip"| "Activity";

export interface TravelerItem {
    userId:number;
    firstname?:string;
    firstnamePersian?:string;
    lastname?:string;
    lastnamePersian?:string;
    gender:boolean;
    nationalId?:string;
    birthDate?:string;
    nationality?:string;
    email?:string;
    passportCountry?:string;
    passportExpirationDate?:string;
    passportNumber?:string;
    phoneNumber?:string;
    id:number;
}