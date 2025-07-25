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
    CMS: process.env.PROJECT_SERVER_CMS,
    Identity: process.env.PROJECT_SERVER_IDENTITY,
    Hotel_WP: process.env.PROJECT_SERVER_HOTEL_WP,
    Hotel_Data: process.env.PROJECT_SERVER_HOTEL_DATA,
    Hotel_Availability: process.env.PROJECT_SERVER_HOTEL_AVAILABILITY,
    Coordinator: process.env.PROJECT_SERVER_COORDINATOR,
    Blog: process.env.PROJECT_SERVER_BLOG,
    Payment: process.env.PROJECT_SERVER_PAYMENT,
    Flight: process.env.PROJECT_SERVER_FLIGHT,
    Crm:process.env.PROJECT_SERVER_CRM,
    Cip: process.env.PROJECT_SERVER_CIP,
    Traveler : process.env.PROJECT_SERVER_TRAVELER,
    Strapi : process.env.PROJECT_SERVER_STRAPI
  };

  export const Cms = {
    GetByUrl: "/api/services/app/Page/GetByUrl",
    CreateComment : '/api/services/app/Review/Create',
    GetAllPages:"/api/services/app/Page/GetAll"
  }

  export const Strapi = {
    Pages:"/api/pages",
    Footer:"/api/footers",
    Magazine:"/api/magazines",
  }

  export const Identity = {
    SendOTP: "/api/services/app/OTP/SendOTP",
    RegisterOrLogin: "/api/services/app/OTP/RegisterOrLogin",
    GetCurrentUserProfileForEdit: "/api/services/app/Profile/GetCurrentUserProfileForEdit",
    UpdateCurrentUserProfile:"/api/services/app/Profile/UpdateCurrentUserProfile",
    UpdateNewsletterUserProfile:"/api/services/app/Profile/UpdateNewsletterUserProfile",
    UpdateProfileEmail:"/api/services/app/Profile/UpdateProfileEmail",
    UpdateProfilePhoneNumber:"/api/services/app/Profile/UpdateProfilePhoneNumber",
    SendVerificationSms:"/api/services/app/Profile/SendVerificationSms",
    VerifySmsCode:"/api/services/app/Profile/VerifySmsCode",
    LoginWithPassword:"/api/TokenAuth/Login",
    ForgotPasswordByPhoneNumber: "/api/services/app/Account/ForgotPasswordByPhoneNumber",
    ForgotPasswordVerification:"/api/services/app/Account/ForgotPasswordVerification",
    ResetPassword : "/api/services/app/Account/ResetPassword",
    ForgotPasswordByEmail:"/api/services/app/Account/ForgotPassword",
    Register:"/api/services/app/Account/Register",
    ChangePassword:"/api/services/app/Account/ChangePassword",
    SendEmailActivation:"/api/services/app/Account/SendEmailActivation",
    ActivateEmail:"/api/services/app/Account/ActivateEmail",
    GetSiteAllSettings:"/api/services/app/TenantSettings/GetAllSettings"
  };

export const Flight = {
  GetAirportsByCode: "/api/services/app/Airport/GetAll",
  Availability: "/api/services/app/BookingFlight/Availability",
  GetAvailability: "/api/services/app/BookingFlight/GetAvailability",
  GetValidate:"/api/services/app/BookingFlight/GetValidate",
  GetAllCountries:"/api/services/app/Country/GetAll",
  PreReserve:"/api/services/app/BookingFlight/PreReserve",
  ValidateFlight:"/api/services/app/BookingFlight/Validate",
  GetReserveById:"/api/services/app/Reserve/Get",
  searchFlights: 'flightdomestic.safaraneh.com/api/services/app/Airport/Search',
  Confirm:"/api/services/app/BookingFlight/Confirm",
  GetVoucherPdf:"/api/services/app/Reserve/GetVoucherPdf",
  AirportSearch:"/api/services/app/Airport/Search"
};

  export const Blog = {
    getPosts: "//wp-json/wp/v2/posts",
    getBestCategories: '/wp-json/wp/v2/best_category',
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
    AvailabilityByHotelId:"/api/services/app/Booking/AvailabilityByHotelId",
    GetRooms:"/api/services/app/Booking/GetRoom",
    ValidateRoom:"/api/services/app/Booking/Validate",
    SearchHotels:"/v2/Hotel/SearchHotels",
    getRates:"/v2/Comment/Rates",
    getReviewsByPageId:"/api/services/app/Review/GetByPageId",
    likeCommentById : "/api/services/app/Review/Like",
    dislikeCommentById : "/api/services/app/Review/Dislike",
    GetEntityNameByLocation: "/api/services/app/Entity/Get",
    GetValidate:"/api/services/app/Booking/GetValidate",
    PreReserve: "/api/services/app/Booking/PreReserve",
    GetReserveById: "/api/services/app/Reserve/Get",
    Confirm:"/api/services/app/Booking/Confirm",
    SearchAccomodations:"/api/services/app/Accommodation/GetAll",
    GetAllForSiteMapImages:"/api/services/app/Accommodation/GetAllForSiteMap"
  };

  export const Reserve = {
     GetReserveFromCoordinator : "/api/services/app/Order/Get",
     GetUserAllReserves:"/api/services/app/Order/GetAll"
  };

  export const Payment = {
    ValidateDiscountCode:"/api/services/app/Discount/Validate",
    RegisterDiscountCode: "/api/services/app/Discount/Register",
    GetBankGateway:"/api/services/app/ReserveBankGateway/GetAll",
    MakeToken:"/api/services/app/ReserveBankGateway/MakeToken",
    GetBalance:"/api/services/app/Deposit/GetBalance",
    GetTransactionDeposit:"/api/services/app/TransactionDeposit/GetAll",
    GetDepositBankGateway:"/api/services/app/UserDepositBankGateway/GetAll",
    MakeDepositToken:"/api/services/app/UserDepositBankGateway/MakeToken",
    ConfirmByDeposit:"/api/services/app/DepositReserve/ConfirmByDeposit"
  };

  export const Cip = {
    SearchAirport: "/api/services/app/Airport/Search",
    GetAllAirports : "/api/services/app/Airport/GetAll",
    Availability:"/api/services/app/BookingCip/Availability",
    GetAirportByUrl:"/api/services/app/Airport/GetByUrl",
    AvailabilityByIataCode:"/api/services/app/BookingCip/AvailabilityByIataCode",
    Validate:"/api/services/app/BookingCip/Validate",
    PreReserve:"/api/services/app/BookingCip/PreReserve",
    GetReserveById:"/api/services/app/Reserve/Get",
    Confirm:"/api/services/app/BookingCip/Confirm",
    GetVoucherPdf:"/api/services/app/Reserve/GetVoucherPdf"
  }

  export const Traveler = {
    Create:"/api/services/app/Passenger/Create",
    GetAll:"/api/services/app/Passenger/GetAll",
    Delete:"/api/services/app/Passenger/Delete"
  }
  
  export const ServerStatus = {
    Success: 1,
    Error: 2,
    SummaryError: 3,
  };

  
