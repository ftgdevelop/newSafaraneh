export interface EntitySearchResultItemType {
    name: string;
    title?: string;
    displayName?: string;
    type: "City" | "Village" | "Province";
    id?: number;
    slug?: string;
}

export interface AccommodationRecentSearchItem {
    url: string;
    title: string;
    dates: string[];
}