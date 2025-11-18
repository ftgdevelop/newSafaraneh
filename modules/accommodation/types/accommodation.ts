export interface EntitySearchResultItemType {
    id: string;
    name: string;
    title?: string;
    type: "Village";
}

export interface AccommodationRecentSearchItem {
    url: string;
    title: string;
    dates: [string, string];
}