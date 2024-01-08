export interface EntitySearchResultItemType {
    name?: string;
    displayName?: string;
    language?: string;
    type: 'Province' | 'City' | 'Hotel';
    id: number;
}

export interface DomesticHotelFacilitieType {
    FacilityId?: number;
    Title?: string;
    Image?: string;
    ImageUrl?: string;
    Keyword?: string;
    ImageAlt?: string;
    ImageTitle?: string;
    CssClass?: string;
    Description?: string;
    IsSpecial?: boolean;
}

export interface DomesticHotelMainType {
    HotelId?: number;
    HotelName?: string;
    CityName?: string;
    HotelTypeName?: string;
    HotelRating?: number;
    BriefDescription?: string;
    Url?: string;
    ImageUrl?: string;
    ImageTitle?: string;
    ImageAlt?: string;
    Address?: string;
    Discount?: number;
    Price?: number;
    Facilities?: DomesticHotelFacilitieType[];
}

interface DomesticHotelNearBy extends DomesticHotelMainType {
    DistanceText?: string;
    DistanceValue?: number;
}

export interface DistancePointType {
    Url?: string;
    AttractionName?: string;
    DurationText?: string;
    Mode?: string;
    DurationValue?: number;
    ImageAlt?: string;
    ImageTitle?: string;
    Image?: string;
    DistanceText?: string;
    DistanceValue?: number;
}

export interface DomesticHotelDetailType {
    HotelId?: number;
    HotelName?: string;
    HotelCategoryName?: string;
    HotelCategoryId?: number;
    CityName?: string;
    CityId?: number;
    HotelRating?: number;
    IsInstant?: boolean;
    Tel?: string;
    Address?: string;
    BriefDescription?: string;
    Content?: string;
    ContentTitle?: string;
    Latitude?: number;
    Longitude?: number;
    Zoom?: number;
    Priority?: number;
    Url?: string;
    Discount?: number;
    TopSelling?: number;
    Price?: number;
    IsPromotion?: boolean;
    MostViewed?: number;
    ImageAlt?: string;
    ImageTitle?: string;
    ImageUrl?: string;
    LanguageId?: number;
    IsCovid?: boolean;
    ChangeFrequency?: string;
    PagePriority?: number;
    ModifyDateTime?: string;
    MetaDescription?: string;
    MetaKeyword?: string;
    PageTitle?: string;
    VoteNumbers?: number;
    VoteResult?: number;
    RoomCount?: number;
    NeighborhoodKeywords?: {

    }[];
    Gallery?: {
        Image?: string;
        ImageThumb?: string;
        Alt?: string;
        Title?: string;
        Priority?: number;
    }[];
    Facilities?: DomesticHotelFacilitieType[];

    Policies?: {
        FacilityId: any;
        Title?: string;
        Image?: string;
        ImageUrl?: string;
        Keyword?: string;
        ImageAlt?: string;
        ImageTitle?: string;
        CssClass?: string;
        Description?: string;
        IsSpecial: boolean;
    }[];
    DistancePoints?: DistancePointType[];
    DistancePointTemporarys?: {

    }[];
    Similars?: DomesticHotelMainType[];
    NearBys?: DomesticHotelNearBy[]
}

export interface HotelScoreDataType {
    Comments: {
        CommentId?: number;
        FullName?: string;
        CityName?: string;
        Comment?: string;
        IsRecommended?: boolean;
        Satisfaction?: number;
        RoomService?: number;
        ResturantQuality?: number;
        DealWithPassanger?: number;
        CreateDate?: string;
        ModifyDate?: string;
        PageUrl?: string;
        AccommodationName?: string;
        IsStay?: boolean;
    }[];
    TotalScore?: number;
    Satisfaction?: number;
    RoomService?: number;
    ResturantQuality?: number;
    DealWithPassanger?: number;
    CommentCount?: number;
}

export interface DomesticAccomodationType {
    type: "Hotel" | "Apartments" | "Guesthouse" | "Motel" | "TraditionalHouse" | "Ecolodge" | "TourismComplex" | "BoutiqueHotel" | "Pansion";
    rating?: number;
    cityId?: number;
    name?: string;
    displayName?: string;
    address?: string;
    instruction?: string;
    briefDescription?: string;
    description?: string;
    mendatoryFee?: string;
    alertNote?: string;
    telNumber?: string;
    city: {
        title?: string;
        type?: string;
        isActive: boolean;
        parentId?: number;
        name?: string;
        searchValue?: string;
        displayName?: string;
        id: number;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    picture: {
        path?: string;
        altAttribute?: string;
        titleAttribute?: string;
    };
    faqs: {
        title?: string;
        isActive: boolean;
        priority: number;
        entity: {
            title?: string;
            type?: string;
            isActive: boolean;
            parentId?: number;
            name?: string;
            searchValue?: string;
            displayName?: string;
            id: number;
        };
        question?: string;
        answer?: string;
        id: number;
    }[]
    id: number;
}

export interface AvailabilityByIdItem {
    id: number,
    boardPrice: number,
    salePrice: number,
}

export interface DomesticHotelRoomItem {
    image?: string;
    view?: string;
    description?: string;
    facilities?: {
        title?: string;
        keyword?: string;
        name?: string;
    }[];
    name?: string;
    capacity: {
        count: number;
        extraBed: number;
    };
    id: number;
}
export interface DomesticHotelRateItem {
    pricing?: {
        amount: number;
        ageCategoryType: "ADL" | "CHD" | "INF";
        type: "Room" | "RoomBoard" | "ExtraBed" | "HalfCharge" | "RoomNet" | "Markup" | "Commission" | "PromoCode"
    }[];

    price: number;
    bookingToken?: string;
    supplierType: "Safaraneh" | "Snapp" | "ChannelLead" | "HotelYar" | "Eghamat24";
    available: number;
    description?: string;
    cancellationPolicy?: {
        status: "Refundable" | "NonRefundable" | "Unknown" | "CallSupport";
        fees: {
            amount: number;
            fromDate: string;
        }[];
    };
    board: {
        name?: string;
        code: "Undefined" | "BB" | "FB" | "HB" | "RO" | "Hour6" | "Hour10";
        description?: string;
        extra?: string;
    },
    view?: {
        name?: string;
        keyword?: string;
    };
    availablityType: "Online" | "Ofline" | "Request" | "Completion";
    nightly: {
        totalPrice: number;
        averagePrice: number;
        items: unknown;
    }
}

export interface DomesticHotelAvailability {

    rooms?: DomesticHotelRoomItem[];
    rates?: DomesticHotelRateItem[]

}[]


export type SearchHotelsItem = {
    HotelId?: number;
    HotelName?: string;
    HotelTypeName?: string;
    HotelTypeId?: number;
    CityName?: string;
    CityId?: number;
    HotelRating?: number;
    Address?: string;
    Latitude?: number;
    Longitude?: number;
    Zoom?: number;
    Priority?: number;
    Url?: string;
    IsPromotion?: true;
    IsCovid?: true;
    ImageAlt?: string;
    ImageTitle?: string;
    ImageUrl?: string;
    HotelCategoryName?: string;
    HotelEntityName?: string;
    CityEntityName?: string;
    Facilities?: {
        FacilityId?: number;
        Title?: string;
        Image?: string;
        ImageUrl?: string;
        Keyword?: string;
        ImageAlt?: string;
        ImageTitle?: string;
        CssClass?: string;
        Description?: string;
        IsSpecial?: boolean;
    }[];
}