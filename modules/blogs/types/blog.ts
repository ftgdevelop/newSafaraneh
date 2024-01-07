export interface BlogItemType {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    images: {
        medium: string;
        large: string;
    }
}