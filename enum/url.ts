// export const SSRHeader: HeadersInit = new Headers();
// SSRHeader.set('Content-Type', 'application/json');
// SSRHeader.set("Accept-Language", "en-US");
// SSRHeader.set("currency", "IRR");
// SSRHeader.set("apikey", process.env.PROJECT_SERVER_APIKEY!);
// SSRHeader.set("tenantid", '6');


export const Header = {
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "apikey": process.env.PROJECT_SERVER_APIKEY,
    // "tenantid": process.env.PROJECT_SERVER_TENANTID,
  };
  //to do: static header parameters!

  export const ServerAddress = {
    Type: process.env.PROJECT_SERVER_TYPE,
    Identity: process.env.PROJECT_SERVER_IDENTITY,
    Hotel_WP: process.env.PROJECT_SERVER_HOTEL_WP,
    Hotel_Main: process.env.PROJECT_SERVER_HOTEL_MAIN,
    Hotel_Data: process.env.PROJECT_SERVER_HOTEL_DATA,
    Hotel_Availability: process.env.PROJECT_SERVER_HOTEL_AVAILABILITY,
    Coordinator: process.env.PROJECT_SERVER_COORDINATOR,
    Blog: process.env.PROJECT_SERVER_BLOG,
    Payment: process.env.PROJECT_SERVER_PAYMENT,
    Flight: process.env.PROJECT_SERVER_FLIGHT,
    Crm:process.env.PROJECT_SERVER_CRM
  };

  export const Identity = {
    SendOTP: "/api/services/app/OTP/SendOTP",
    RegisterOrLogin: "/api/services/app/OTP/RegisterOrLogin",
    GetCurrentUserProfileForEdit: "/api/services/app/Profile/GetCurrentUserProfileForEdit"
  };

  export const Flight = {
  };

  export const Blog = {
    getPosts: "//wp-json/wp/v2/posts",
    getCategories: '/wp-json/wp/v2/best_category?categories=',
    getCategoeyName: '/wp-json/wp/v2/categories',
    getCities: "//wp-json/wp/v2/cities/",
    getTagName: '/wp-json/wp/v2/tags/',
  }

  export const Hotel = {
    GetLocation: "/api/services/app/BookingHotel/GetLocation",
    GetEntity:"/api/services/app/Entity/Search",
    GetHotelById: "/v2/Hotel/GetHotelById",
    GetHotelSummaryDetailById: "/api/services/app/Accommodation/Get",
    GetDomesticHotelDetails:"/api/services/app/Accommodation/Get",
    GetScore: "/v2/Comment/GetScore",
    GetPageByUrl: "/v2/Page/GetPageByUrl",
    GetPortal: "/v2/Portal/GetPortal",
    InsertComment : '/v2/Comment/InsertComment',
    AvailabilityByHotelId:"/api/services/app/Booking/AvailabilityByHotelId",
    GetRooms:"/api/services/app/Booking/GetRoom",
    ValidateRoom:"/api/services/app/Booking/Validate",
    SearchHotels:"/v2/Hotel/SearchHotels",
    getRates:"/v2/Comment/Rates",
    getCityFaqById:"/api/services/app/Faq/GetAll",
    GetEntityNameByLocation: "/api/services/app/Entity/Get",
    GetValidate:"/api/services/app/Booking/GetValidate",
    PreReserve: "/api/services/app/Booking/PreReserve",
    GetReserveById: "/api/services/app/Reserve/Get",
    Confirm:"/api/services/app/Booking/Confirm"
  };

  export const Reserve = {
     GetReserveFromCoordinator : "/api/services/app/Order/Get"
  };

  export const Payment = {
    ValidateDiscountCode:"/api/services/app/Discount/Validate",
    RegisterDiscountCode: "/api/services/app/Discount/Register",
    GetBankGateway:"/api/services/app/ReserveBankGateway/GetAll",
    MakeToken:"/api/services/app/ReserveBankGateway/MakeToken",
    GetBalance:"/api/services/app/Deposit/GetBalance"
  };
  
  export const ServerStatus = {
    Success: 1,
    Error: 2,
    SummaryError: 3,
  };

  
