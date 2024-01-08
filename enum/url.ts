// export const SSRHeader: HeadersInit = new Headers();
// SSRHeader.set('Content-Type', 'application/json');
// SSRHeader.set("Accept-Language", "en-US");
// SSRHeader.set("currency", "IRR");
// SSRHeader.set("apikey", process.env.PROJECT_SERVER_APIKEY!);
// SSRHeader.set("tenantid", '6');


export const Header = {
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "currency": "USD",
    "apikey": process.env.PROJECT_SERVER_APIKEY,
    "tenantid": process.env.PROJECT_SERVER_TENANTID,
  };
  //to do: static header parameters!

  export const ServerAddress = {
    Type: process.env.PROJECT_SERVER_TYPE,
    // User: process.env.PROJECT_SERVER_USER,
    Hotel_WP: process.env.PROJECT_SERVER_HOTEL_WP,
    Hotel_Main: process.env.PROJECT_SERVER_HOTEL_MAIN,
    Hotel_Data: process.env.PROJECT_SERVER_HOTEL_DATA,
    Hotel_Availability: process.env.PROJECT_SERVER_HOTEL_AVAILABILITY,
    Blog: process.env.PROJECT_SERVER_BLOG,
    // Package: process.env.PROJECT_SERVER_PACKAGE,
    // Payment: process.env.PROJECT_SERVER_PAYMENT,
    // localServer: process.env.PROJECT_SERVER_LOCALSERVER,
    Flight: process.env.PROJECT_SERVER_FLIGHT
  };
  export const User = {
    // Register: "/api/services/app/Account/Register", //for register new user
    // RegisterByInfo: "/api/services/app/Account/RegisterByInfo", //register new user for namin travel
    // Login: "/api/TokenAuth/Login", //for login user
    // VarficationUser: "/api/services/app/Account/GetUser",
    // Forgot: "/api/services/app/Account/ForgotPassword",
    // Confrim: "/api/services/app/Account/ConfirmEmail",
    // ResetPassword: "/api/services/app/Account/ResetPassword",
    // Update: "/api/services/app/Account/Update",
    // ChangePassword: "/api/services/app/Account/ChangePassword",
    // CreateNewsLetter:"/api/services/app/NewsLetter/Create",
    // CreateContactUs:"/api/services/app/ContactUs/Create",
    // SendEmailActivation:"​/api/services/app/Account/SendEmailActivation",
    // ActivateEmail:"/api/services/app/Account/ActivateEmail",
    
    //for itours ir only:
    // IsUsernameExist:"/api/services/app/Account/IsUsernameExist",
    // SendOTP:"/api/services/app/OTP/SendOTP",
    // RegisterOrLogin:"/api/services/app/OTP/RegisterOrLogin",
    // ChangePasswordByAuthorizedUser:"/api/services/app/Account/ChangePasswordByAuthorizedUser",
    // ForgotPasswordByPhoneNumber:"/api/services/app/Account/ForgotPasswordByPhoneNumber",
    //ResetPasswordByPhoneNumber:"/api/services/app/Account/ResetPasswordByPhoneNumber"
  };
  export const Flight = {
    //GetLocation: "/api/services/app/BookingFlight/GetAirport",
    // GetDomesticLocation:"/api/services/app/BookingFlight/GetDomesticAirport",
    // GetAirline: "/api/services/app/BookingFlight/GetAirline",
    //LowFareSearch: "/api/services/app/BookingFlight/LowFareSearch",
    //ValidateFlight: "/api/services/app/BookingFlight/Validate",
    // GetPNR: "/api/services/app/BookingFlight/ReservePNR",
    //GetRules: "/api/services/app/BookingFlight/GetFlightRules",
    // GetReserveByID: "/api/services/app/BookingFlight/GetFlightReserveById",
    // GetDirectTicketByID: "/api/services/app/BookingFlight/GetDirectTicketById",
    // BankStatus:"/api/services/app/BookingFlight/BankStatus",
    // GetTime:"/api/services/app/BookingFlight/GetTime",
    // GetDomesticRefundRules:"/api/services/app/DomesticFlightRefundRule/GetDomesticRefundRules",
    // GetDomesticRefundRuleDetail:"/api/services/app/DomesticFlightRefundRule/GetDomesticRefundRuleDetail",
    //GetAlternatives: "/api/services/app/BookingFlight/GetAlternatives"
  };

  export const Blog = {
    getPosts: "//wp-json/wp/v2/posts"
  }

  export const Hotel = {
    GetLocation: "/api/services/app/BookingHotel/GetLocation",
    GetEntity:"/api/services/app/Entity/Search",
    GetHotelById: "/v2/Hotel/GetHotelById",
    GetHotelByUrl: "/v2/Hotel/GetHotelByUrl",
    GetScore: "/v2/Comment/GetScore",
    GetAccommodationData :"/api/services/app/Accommodation/Get",
    GetPageByUrl: "/v2/Page/GetPageByUrl",
    GetPortal: "/v2/Portal/GetPortal",
    InsertComment : '/v2/Comment/InsertComment',
    AvailabilityByHotelId:"/api/services/app/Booking/AvailabilityByHotelId",
    GetRooms:"/api/services/app/Booking/GetRoom",
    GetDomesticHotelDetails:"/api/services/app/Accommodation/Get",

    SearchHotels:"/v2/Hotel/SearchHotels",
    getRates:"/v2/Comment/Rates"
    
    
    // GetAccomadtion: "/api/services/app/BookingHotel/GetSearch",
    // PreReserve: "/api/services/app/BookingHotel/PreReserve",
    // GetPreReserveID: "/api/services/app/BookingHotel/GetPreReserveByKey",
    // GetReserveByID: "/api/services/app/BookingHotel/GetReserveById",
    // PostReserver: "/api/services/app/BookingHotel/Reserve",
    // GetVoucherDetails: "/api/services/app/BookingHotel/GetReserveById",
    // BookHotel: "/api/services/app/BookingHotel/Book",
    // GetRoom: "/api/services/app/BookingHotel/GetRoom",
    // GETType: "/api/services/app/Reserve/GetReserveById",
    // GetCancellationPolicy: "/api/services/app/BookingHotel/GetCancellationPolicy",
  };
  export const Package = {
    // PackageAvailibility: "/api/services/app/Booking/Availability",
    // PackageGetAvailability: "/api/services/app/Booking/GetAvailability",
    // GetPackageHotelDetailById: "/api/services/app/Booking/GetHotelDetailById",
    // PreReserveFlight:"/api/services/app/Booking/PreReserveFlight",
    // PreReserveRoom:"/api/services/app/Booking/PreReserveRoom",
    // reserve:"/api/services/app/Booking/Reserve",
    // Confirm:'/api/services/app/Booking/Confirm',
    // PackageValidateFlight:"/api/services/app/Booking/ValidateFlight",
    // GetByPrereserveKey:"/api/services/app/PreReserve/Get",
    // GetReserveById:"/api/services/app/Reserve/Get",
    // GetLocation:"/api/services/app/Booking/GetAirports"
  };
  export const Reserve = {
    // hotel: "/api/services/app/Reserve/GetReserves",
    // naminTravelFlight : "/api/services/app/Reserve/GetAll",
    // getReserveFromCoordinator : "/api/services/app/Order/Get"
  };
  export const Payment = {
    // GetBanksInformation: "/api/services/app/ReserveBankGateway/GetAll",
    // MakeToken: "/api/services/app/ReserveBankGateway/MakeToken",
    // GatewayReport: "/api/services/app/BankGatewayLog/GetAll",
    // DomesticFlightRefund:"/api/services/app/RefundRequest/Refund",
    // GetBalance :"/api/services/app/Deposit/GetBalance",
    // GetDepositBanksList:"/api/services/app/UserDepositBankGateway/GetAll",
    // MakeTokenDeposit:"/api/services/app/UserDepositBankGateway/MakeToken",
    // ConfirmByDeposit:"/api/services/app/DepositReserve/ConfirmByDeposit",
    // GetTransactionByReserveId:"/api/services/app/Transaction/GetByReserveId"
  };
  
  export const ServerStatus = {
    Success: 1,
    Error: 2,
    SummaryError: 3,
  };

  
